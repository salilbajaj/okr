import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./components/loader";
const Home = React.lazy(() => import("./routes/home"));
const NotFound = React.lazy(() => import("./routes/not-found"));

// component binded with root id
// handle lazily loaded routes
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <div className="App">          
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>         
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
