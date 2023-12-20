import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/marketing/LandingPage";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Signout from "./pages/auth/Signout";
import NotFound from "./pages/error/NotFound";
import MainNavigation from "./shared/Layout/Navigation/MainNavigation/MainNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/actions/auth-actions";
import CreateSession from "./pages/sessions/CreateSession";
import OwnerSessions from "./pages/sessions/OwnerSessions";
import SessionDetail from "./pages/sessions/SessionDetail";
import Sessions from "./pages/sessions/Sessions";
import CreateTimeBlock from "./pages/sessions/CreateTimeBlock";
import EditSessionForm from "./components/Forms/SessionsForms/EditSessionForm";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser(token));
  }, [token]);
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
          {/* SESSIONS ROUTES */}
          <Route exact path="/sessions">
            <Sessions />
          </Route>
          <Route exact path="/sessions/:sessionid">
            <SessionDetail />
          </Route>
          <Route exact path="/ownersessions">
            <OwnerSessions />
          </Route>
          <Route exact path="/createsession">
            <CreateSession />
          </Route>
          <Route exact path="/editsession/:sessionid">
            <EditSessionForm />
          </Route>
          <Route exact path="/sessions/:sessionid/editsession">
            <CreateTimeBlock />
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
