import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import './App.css';
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage"
import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/> 
      </Routes>
    </Router>
  );
}

export default App;
