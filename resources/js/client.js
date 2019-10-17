import React from "react";
import ReactDOM from "react-dom";
//import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Router, Route, Switch, BrowserRouter, HashRouter } from "react-router-dom";

import Admin from "./pages/Admin";
import BannedWordsIndex from "./pages/Admin/BannedWords/BannedWordsIndex";
import Category from "./pages/Category";
import CategoryIndex from "./pages/CategoryIndex";
import Create from "./pages/Admin/Create";
import CreateBannedWord from "./pages/Admin/BannedWords/CreateBannedWord";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreatePowerpoint from "./pages/Admin/CreatePowerpoint";
import CreateVideo from "./pages/Admin/CreateVideo";
import EditPage from "./pages/Admin/EditPage";
import ErrorCatch from "./components/ErrorCatch";
import Home from "./pages/Home";
import KioskPage from "./pages/KioskPage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import PowerpointPage from "./pages/PowerpointPage";
import Powerpoints from "./pages/Admin/Powerpoints";
import Splash from "./pages/Splash";
import VideoPage from "./pages/VideoPage";

import history from "./history";

const app = document.getElementById('app');

ReactDOM.render(
    <ErrorCatch>
        <HashRouter>
            <div>
                <Switch>
                    <Route exact path="/splash" component={Splash} />
                    {/* <Route exact path="/kiosk" component={CategoryIndex} /> */}
                    {/* <Route exact path="/kiosk/:id" component={Category} /> */}
                    <Route exact path="/kiosk/:id" component={KioskPage} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/admin/create/:id?" component={Create} />
                    {/* <Route exact path="/admin/:id/edit" component={EditPage} /> */}
                    <Route exact path="/admin/createCategory/:id?" component={CreateCategory} />
                    <Route exact path="/admin/createPowerpoint" component={CreatePowerpoint} />
                    <Route exact path="/powerpoints/:id" component={PowerpointPage} />
                    <Route exact path="/powerpoints" component={Powerpoints} />
                    <Route exact path="/videos/:id" component={VideoPage} />
                    <Route exact path="/admin/createVideo/:id?" component={CreateVideo} />
                    <Route exact path="/admin/bannedWords" component={BannedWordsIndex} />
                    <Route exact path="/admin/createBannedWord/:id?" component={CreateBannedWord} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/:category?" component={Home} />
                </Switch>
            </div>
        </HashRouter>
    </ErrorCatch>,
    app);