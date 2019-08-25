import React from "react";
import ReactDOM from "react-dom";
//import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Router, Route, HashRouter } from "react-router-dom";

import Admin from "./pages/Admin";
import Birds from "./pages/Birds";
import Category from "./pages/Category";
import CategoryIndex from "./pages/CategoryIndex";
import Create from "./pages/Admin/Create";
import CreateCategory from "./pages/Admin/CreateCategory";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Splash from "./pages/Splash";
import KioskPage from "./pages/KioskPage";

const app = document.getElementById( 'app' );

ReactDOM.render(
    <HashRouter>
        <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/splash" component={Splash} />
            <Route exact path="/kiosk" component={CategoryIndex} />
            <Route exact path="/kiosk/:id" component={Category} />
            <Route exact path="/kiosk/:c/:id" component={KioskPage} />
            <Route path="/birds/:id" component={Birds} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/create" component={Create} />
            <Route exact path="/admin/createCategory" component={CreateCategory} />
        </Layout>
    </HashRouter>,
app );