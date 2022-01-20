import React, { Component } from "react";
import SignIn from "./components/Forms/SignIn";
import SignUpStu from "./components/Forms/SignUp/SignUpStu";
import SignUpFac from "./components/Forms/SignUp/SignUpFac";
import PasswordForget from "./components/Forms/PasswordForget";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Landing from "./components/Landing";
import Destination from "./components/DestinationPage";
import { withAuthentication } from "./configuration/session";

/*Font Awesome Library*/
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faMinus,
  faPlus,
  faPencilAlt,
  faTrashAlt,
  faUndo,
  faDatabase,
  faDownload,
  faSignOutAlt,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

import AuthUserContext from "./configuration/session/context";

library.add(
  faArrowRight,
  faMinus,
  faPlus,
  faPencilAlt,
  faTrashAlt,
  faUndo,
  faDownload,
  faDatabase,
  faSignOutAlt,
  faPrint
);

// const condition = (authUser) => !!authUser;
class App extends Component {
  componentDidMount() {
    fetch("https://firescan-16f8e.firebaseio.com/CollegeList.json")
      .then((response) => response.json())
      .then((data) => {
        window.store?.dispatch(window.addCollegeList(data));
      })
      .catch((err) => console.log(err));
  }

  // isJson(str) {
  //   try {
  //     JSON.parse(str);
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // }

  // isDownloadableComponent = (state = {}) => {
  //   if (
  //     !state ||
  //     !Object.keys(state).length ||
  //     !state.encoded_cipher ||
  //     !state.cipher_salt
  //   ) {
  //     return false;
  //   }

  //   const decipher_decrypted_text = decipher(state.cipher_salt)(
  //     state.encoded_cipher
  //   );
  //   if (!decipher_decrypted_text || !this.isJson(decipher_decrypted_text)) {
  //     return false;
  //   }

  //   const parsed_json_data = JSON.parse(decipher_decrypted_text);
  //   if (
  //     !parsed_json_data.subject_key ||
  //     !parsed_json_data.attendance_date ||
  //     !parsed_json_data.random_no
  //   ) {
  //     return false;
  //   }

  //   return parsed_json_data;
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <AuthUserContext.Consumer>
            {(authUser) => (
              <Switch>
                <Route
                  path={ROUTES.DESTINATION}
                  exact
                  component={Destination}
                />
                <Route path={ROUTES.LANDING} component={Landing} />
                <Route path={ROUTES.SIGN_IN} component={SignIn} />
                <Route path={ROUTES.STU_SIGN_UP} component={SignUpStu} />
                <Route path={ROUTES.FAC_SIGN_UP} component={SignUpFac} />
                <Route
                  path={ROUTES.PASSWORD_FORGET}
                  component={PasswordForget}
                />
                {/* {condition(authUser) && (
                  <Switch>
                    <Route path={ROUTES.CLASSROOM} component={Classroom} />
                    <Route path={ROUTES.ANALYTICS} component={Analytics} />
                    <Route path={ROUTES.SUBLIST} component={SubList} />
                    <Route
                      path={ROUTES.PASSWORD_UPDATE}
                      component={PasswordUpdate}
                    />
                    <Route path={ROUTES.PROFILE} component={ProfilePage} />
                    <Route path={ROUTES.IDCARD} component={IdCard} />

                    <Route
                      path={ROUTES.DOWNLOAD_ANALYTICS}
                      render={(props) => {
                        if (
                          !this.isDownloadableComponent(props.location?.state)
                        )
                          return <Redirect to="/" />;
                        const parsed_json_data = this.isDownloadableComponent(
                          props.location?.state
                        );
                        const navigation_state =
                          props.history?.location?.state || {};
                        return (
                          <AnalyticsExport
                            {...props}
                            {...parsed_json_data}
                            data_export_state={navigation_state}
                          />
                        );
                      }}
                    />
                    <Route
                      path={ROUTES.DOWNLOAD_ANALYTICS_API}
                      render={(props) => {
                        const { encoded_data } = props.match?.params;
                        const decoded_json_data = window.atob(encoded_data);
                        if (
                          !this.isJson(decoded_json_data) ||
                          !this.isDownloadableComponent(
                            JSON.parse(decoded_json_data)
                          )
                        )
                          return <Redirect to="/" />;
                        const parsed_json_data = this.isDownloadableComponent(
                          JSON.parse(decoded_json_data)
                        );
                        const data_export_state = {
                          export_present:
                            JSON.parse(decoded_json_data)?.export_present ||
                            false,
                          export_absent:
                            JSON.parse(decoded_json_data)?.export_absent ||
                            false,
                        };
                        return (
                          <AnalyticsExport
                            {...props}
                            {...parsed_json_data}
                            data_export_state={data_export_state}
                          />
                        );
                      }}
                    />

                    <Route path={ROUTES.SPINNER} component={Spinner} />

                    <Redirect to="/" />
                  </Switch>
                )} */}
                <Route path="*" component={Destination} />)
              </Switch>
            )}
          </AuthUserContext.Consumer>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
