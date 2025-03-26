export const forgotPasswordTemplate = `
<div style="margin: 0 auto; font-size: 16px">
    <div>
        <div>Olá <%= name %>,</div><br />
        <div>Você solicitou uma nova senha para sua conta PPGCO - UFU. Clique no botão abaixo para definir sua nova senha.</div><br />
        <div>
            <a href="\${ link }" style="background-color: #930000; border-radius: 20px; padding: 10px 20px; text-decoration: none; outline: none; color: white; font-size: 16px; font-weight: 800">
                Criar nova senha.
            </a><br /><br />
            Ou clique no link a baixo:<br />
            <a href="\${ link }"><%= link %></a>
        </div>
        <br />
        <div>Se você não fez esta solicitação, basta ignorar este email.</div>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ufu_logo.svg/2048px-Ufu_logo.svg.png" alt="logo ufu" style="width: 300px; aspect-ratio: 1306 / 302" />
        </div>
    </div>
</div>`;
