import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Intro from "./component/Intro";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Nav from "./component/Nav";
import MyPage from './component/MyPage';
import "./App.scss"
import Schedule from "./component/Schedule";
import Gift from './component/Gift';


function App(props:any){

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    if (window.sessionStorage.getItem("id")) {
      setIsLogin(true);
      setUserId(window.sessionStorage.getItem("id"));
      setEmail(window.sessionStorage.getItem("email"));
      setName(window.sessionStorage.getItem("name"));
    }
  })


  return (
    <div className="App">
      <Nav />
      <div className={props.location.pathname === "/intro" ? "background" : props.location.pathname === "/signin" || props.location.pathname === "/signup" ? "fullBackground" : "sideBackground"}>
        <Switch>
          <Route exact path="/intro" render={() => {
            return <Intro />
          }} />
          <Route path="/signin" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Redirect to="/" />
            } else {
              return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId}/>
            }
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup />
          }} />
          <Route exact path="/home" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Home />
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route exact path="/schedule" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Schedule userId={userId} />
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route exact path="/gift" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Gift/>
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route exact path="/mypage" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <MyPage setIsLogin={setIsLogin} email={email} setEmail={setEmail} name={name} setName={setName} />
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/" render={() => {
            if (window.sessionStorage.getItem("id")) {
              return <Redirect to="/home" />
            } else {
              return <Redirect to="/intro" />
            }
          }} />

        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);