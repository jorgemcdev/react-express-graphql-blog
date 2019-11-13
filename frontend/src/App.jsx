import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import AuthRoute from './utils/AuthRoute';

import MenuBar from './components/menuBar/MenuBar';

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const SinglePost = lazy(() => import('./pages/singlePost/SinglePost'));

const App = () => (
  <AuthProvider>
    <Router>
      <Container>
        <MenuBar />
        <Suspense fallback={<div>Loading</div>}>
          <Route exact path="/" component={Home} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Suspense>
      </Container>
    </Router>
  </AuthProvider>
);

export default App;
