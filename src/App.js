import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/homepage/homepage.component";
const DetailPage = React.lazy(() => import("./pages/detail/detail.component"));

function App() {
  return (
    <BrowserRouter>
      <h1 className='header'>New York Times</h1>
      <Suspense fallback={<div style={{textAlign:"center"}}>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/detail' component={DetailPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
