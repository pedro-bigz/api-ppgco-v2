import XLSX from 'xlsx';
import { createTransport as nodemailerCreateTransport } from 'nodemailer';
import fs from 'fs';

interface EmailConfig {
  service: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
  subject: string;
  text: string;
  attachments: {
    filename: string;
    path: string;
  }[];
}

interface ExcelMailerParams {
  sheetTitle: string;
  filePath: string;
  data: (string | number | Date)[][];
  headers: string[];
  emailConfig: EmailConfig;
}

const sendFileViaEmail = async ({
  filePath,
  emailConfig,
}: {
  filePath: string;
  emailConfig: EmailConfig;
}) => {
  const transporter = nodemailerCreateTransport({
    service: emailConfig.service,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass,
    },
  });

  const mailOptions = {
    from: emailConfig.from,
    to: emailConfig.to,
    subject: emailConfig.subject,
    text: emailConfig.text,
    attachments: [
      {
        filename: filePath,
        path: filePath,
      },
    ],
  };
  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(filePath);
  } catch (err) {
    fs.unlinkSync(filePath);
    throw err;
  }
};

export const excelMailer = ({
  sheetTitle,
  filePath,
  data,
  headers,
  emailConfig,
}: ExcelMailerParams) => {
  const worksheet = XLSX.utils.aoa_to_sheet([
    [sheetTitle],
    [],
    headers,
    ...data,
  ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetTitle);

  XLSX.writeFile(workbook, filePath);

  try {
    sendFileViaEmail({ filePath, emailConfig });
  } catch (err) {
    throw err;
  }
};
