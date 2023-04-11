import { List } from "@raycast/api";
import UploadImage from "./components/UploadImage";
import Login from "./components/Login";

const App = () => {
  return (
    <List isShowingDetail>
      <UploadImage />
      <Login />
    </List>
  )
};

export default App;
