import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import axios from "axios";
import Detail from "./components/Detail";
import RecipeCreate from "./components/RecipeCreate";

axios.defaults.baseURL = "https://api-sigma-gold.vercel.app";
// axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/home/:id" component={Detail}></Route>
          <Route exact path="/create" component={RecipeCreate}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
