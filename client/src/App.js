/* Importing the components from the pages and components folders. */
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

/* This is importing the react library and the react-router-dom library. */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * The function returns a Router component that contains a Navbar component and a Switch component that
 * contains two Route components
 * @returns A react router that has a navbar and a switch that has two routes.
 */
function Application() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className=''>Incorrect Page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

/* Exporting the Application function. */
export default Application;