import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/homepage/homepage.component";
const DetailPage = React.lazy(() => import("./pages/detail/detail.component"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="header">New York Times</h1>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/detail' component={DetailPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
