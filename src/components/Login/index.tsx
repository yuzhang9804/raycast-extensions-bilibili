import { List, Icon } from "@raycast/api";
import { useLogin } from './useLogin'

const Login = () => {
  useLogin()
  const { qrcode } = useLogin();

  const markdown = `
    ## Scan the QR code below to login to Bilibili.

    ![qrcode_login](${qrcode})
  `;

  return (
    <List.Item
      title="登陆1"
      icon={Icon.AddPerson}
      detail={
        <List.Item.Detail markdown={markdown} />
      } />
  )
}

export default Login
