import { Cache } from "@raycast/api";
import fetch from 'node-fetch'
import QRCode from "qrcode";

export function checkLogin() {
  const cache = new Cache();
  const today = new Date().getTime();

  return cache.has("cookie") && new Date(cache.get("expires") || today).getTime() > today;
}

export async function checkQRCode(qrcodeKey: string) {
  const res = await fetch(`http://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qrcodeKey}`);

  console.log(res.json);
  

  // return { res: JSON.parse(res.body), cookie: res.headers["set-cookie"] };
}



export async function gennerateQRCode() {
  // const res: Bilibili.gennerateQRCodeResponse = await got(API.gennerateQRCode()).json();

  // if (res.code !== 0) throw new Error(res.message);

  // const { url, qrcode_key } = res.data;
  // const qrcode = await QRCode.toDataURL(url);

  // return { qrcode, qrcode_key };
}
