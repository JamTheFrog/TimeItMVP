import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/marketing/LandingPage";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Signout from "./pages/auth/Signout";
import NotFound from "./pages/error/NotFound";
import MainNavigation from "./shared/Layout/Navigation/MainNavigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <div className="mt-[4rem] bg-white">
        <Switch>
          {/* MARKETING ROUTES */}
          <Route exact path="/">
            <LandingPage />
          </Route>
          {/* AUTH ROUTES */}
          <Route exact path="/auth/signup">
            <Signup />
          </Route>
          <Route exact path="/auth/signin">
            <Signin />
          </Route>
          <Route exact path="/auth/signout">
            <Signout />
          </Route>
          {/* ERROR ROUTES */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
