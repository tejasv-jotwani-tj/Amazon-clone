import './App.css';
import React, { useEffect } from 'react';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51HSpTPFvLsfwmwMO43ZfQDQcoL4IvbtNNQLPRwG57f3W7cDMN0IY6yUKrHXsopWefEitaHLt3dTz1Nd53LUkW5d700UedUeud4');


function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('the uses is >>> ', authUser);

      if (authUser) {
        //the user just logged in /th user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }
      else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">

        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
