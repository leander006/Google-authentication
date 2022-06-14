import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Component/Pages/Home"
import Login from "./Component/Pages/Login"
import Register from "./Component/Pages/Register"
function App() {
  return (
<Router>
    <Routes>  
     <Route path="/home" exact element={<Home/>}/>
     <Route path="/" exact element={<Register/>} />
     <Route path="/login" exact element={<Login/>} />
    </Routes> 
</Router>
  );
}

export default App;
