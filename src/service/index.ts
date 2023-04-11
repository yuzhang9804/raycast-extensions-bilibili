import fetch from "node-fetch";
import QRCode from 'qrcode'

export type BilibiliResponse<T> = {
  code: number

  message: string

  data: T
}

export const generateQRCode = async () => {
  const response = await fetch('https://passport.bilibili.com/x/passport-login/web/qrcode/generate', {
    method: 'GET'
  })
  
  const { code, message, data }: any = await response.json()

  if (code !== 0) throw new Error(message)
  
  const { url, qrcode_key } = data
  

  const qrcode = await QRCode.toDataURL(url)

  return { qrcode_key, qrcode }
}
