import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import './App.css';
import WhatsApp from "./pages/WhatsApp";
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import SettingPage from "./components/settingPage"
import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/> 
        <Route path="/setting" element={<SettingPage />}/> 
        <Route path="/WhatsApp" element={<pages />}/> 

      </Routes>
    </Router>
  );
}

export default App;
