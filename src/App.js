import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import RegisterLogin from "./RegisterLogin";
function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
