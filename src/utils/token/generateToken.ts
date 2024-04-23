import Crypto from 'crypto';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { base64SafeUrl } from './base64SafeUrl';

type Arg = string | number;

const concatValues = (value1: string, value2: Arg) => {
  return (value1 + value2) as string;
};

export function generateToken(passphrase: string, ...args: Arg[]) {
  const message = args.reduce(concatValues, '') as string;

  const borderStart = Crypto.randomBytes(16).toString('hex');
  const borderEnd = Crypto.randomBytes(16).toString('hex');

  return base64SafeUrl(
    Base64.stringify(hmacSHA512(borderStart + message + borderEnd, passphrase)),
  );
}
