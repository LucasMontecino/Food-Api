import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import axios from "axios";

axios.defaults.baseURL = "https://food-api-server.onrender.com";
// axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
