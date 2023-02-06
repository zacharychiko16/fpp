import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";


function App() {
  return (
    <Router>   
     <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path=":id" element={<Posts/>} ></Route>
      </Routes>
     
     </div>
    </Router>

  );
}

export default App;
