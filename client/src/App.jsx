import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormItem from "./components/Forms/FormItem";
import FormEditItem from "./components/Forms/FormEditItem";
import ProfileSettings from "./components/Forms/ProfileSettings";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/item/create" component={FormItem} />
        <Route exact path="/item/edit/:id/" component={FormEditItem} />
        <Route exact path="/profile/settings" component={ProfileSettings} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
