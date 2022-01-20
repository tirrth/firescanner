import React from "react";
import Landing from "../Landing";
import { AuthUserContext } from "../../configuration/session";

const Destination = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => null;

const NavigationNonAuth = () => <Landing />;

export default Destination;
