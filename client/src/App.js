// import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';

// axios.defaults.baseURL = 'https://food-api-rest.vercel.app';
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            component={LandingPage}
          ></Route>
          <Route
            exact
            path="/home"
            component={Home}
          ></Route>
          <Route
            exact
            path="/home/:id"
            component={Detail}
          ></Route>
          <Route
            exact
            path="/create"
            component={RecipeCreate}
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
