import { useEffect, useState } from 'react'
import { generateQRCode } from '../../service'

export const useLogin = () => {
  const [qrcode, setQrcode] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { qrcode, qrcode_key} = await generateQRCode()

        setQrcode(qrcode)

      } catch (e) {
        console.log(e);
        
        // code
      }
    })()
  }, [])

  return {
    qrcode
  }
}
