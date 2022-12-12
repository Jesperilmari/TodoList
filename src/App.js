import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from "./pages/Login"
import Register from "./pages/Register"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
