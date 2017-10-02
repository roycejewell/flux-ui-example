import React from 'react';
import { Router, Route } from 'react-router';
import Root from './pages/root';
import Home from './pages/home';
import User from './pages/user';

export default (
	<Router component={ Root }>
		<Route path="/" component={Home}/>
		<Route path="/user/:id" component={User}/>
	</Router>
);
