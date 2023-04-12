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

interface checkQRCodeResponse {
  url: string

  refresh_token: string

  timestamp: number

  code: number

  message: string
}

export const checkQRCode = async (qrcode_key: string) => {
  const response = await fetch(`http://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qrcode_key}`, {
    method: 'GET'
  })

  const cookies = response.headers.raw()['set-cookie'];
  let cookie = '', csrf = '', expires = ''

  const res = await response.json()
  const { data: { code } } = res as BilibiliResponse<checkQRCodeResponse> 

  if (code === 0) {
    cookie = cookies.map(item => item.split(';')[0]).join(';')
    expires = cookies[0].match(/Expires=(.*?);/)![1]
    csrf = cookie.match(/bili_jct=(.*?);/)![1]
  }

  return {
    code,
    cookie,
    csrf,
    expires
  } 
}
