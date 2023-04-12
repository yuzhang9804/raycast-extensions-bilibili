import { List } from "@raycast/api";
import UploadImage from "./components/UploadImage";
import { useEffect, useState } from "react";
import { getLoginStatus } from "./utils";

const App = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(getLoginStatus())
  }, [])

  return (
    <List isShowingDetail>
      <UploadImage isLogin={isLogin} />
    </List>
  )
};

export default App;
