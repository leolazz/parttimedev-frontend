import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Jobs from "../components/Jobs";
import { NavBar } from "../components/NavBar";
import About from "./about";
import NotFoundPage from "./NotFoundPage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Jobs} />
            <Route path='/about' component={About} />
            <Route exact={true} component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
