import { useEffect, useState, useRef } from 'react'
import { generateQRCode, checkQRCode } from '../service'
import { Cache } from '@raycast/api';
import { getLoginStatus } from '../utils';

const useLogin = () => {
  const [qrcode, setQrcode] = useState('')
  const [isLogin, setIsLogin] = useState(false);

  const timerId = useRef<NodeJS.Timer | null>(null);

  const cache = new Cache();

  useEffect(() => {
    (async () => {
      const { qrcode, qrcode_key } = await generateQRCode()
      setQrcode(qrcode)

      const loginStatus = getLoginStatus();
      if (loginStatus) {
        setIsLogin(true)
        return
      }

      timerId.current = setInterval(async () => {
        const { code, cookie, expires, csrf } = await checkQRCode(qrcode_key)
        
        if (code === 0 && cookie) {
          setIsLogin(true)
          cache.set("expires", expires);
          cache.set('csrf', csrf)
          cache.set("cookie", cookie);

          timerId.current && clearInterval(timerId.current)
        }
      }, 1000)
    })()

    return () => {
      timerId.current && clearInterval(timerId.current)
    }
  }, [])

  return {
    qrcode,
    isLogin
  }
}

export default useLogin;
