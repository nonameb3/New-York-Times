import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css'

import Homepage from './pages/homepage/homepage.component';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route to='/' component={Homepage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
