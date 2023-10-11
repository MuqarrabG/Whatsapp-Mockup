import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import SettingPage from "./components/settingPage";
import headerLeft from ".components/headerLeft";
import headerRight from ".components/headerRight";

import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="login/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/> 
        <Route path="/setting" element={<SettingPage />}/> 

      </Routes>
    </Router>
  );
}

export default App;
