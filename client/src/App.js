import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Announcements from "./pages/Announcements/Announcements";


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/announcements" component={Announcements} />
    </Router>
  );
}

export default App;
