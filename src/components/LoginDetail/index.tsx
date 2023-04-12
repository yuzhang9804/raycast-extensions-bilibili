import { List} from "@raycast/api";
import { useLogin } from '../../hooks'

const LoginDetail = () => {
  const { qrcode } = useLogin();

  const markdown = `
  ## Scan the QR code below to login to Bilibili.
  ![qrcode_login](${qrcode})`;

  return (
    <List.Item.Detail markdown={markdown} />
  )
}

export default LoginDetail
