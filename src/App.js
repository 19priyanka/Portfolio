import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage';
import ProjectsHomepage from './Projects/ProjectsHomepage';
import GetHomeSafe from './Projects/GetHomeSafe/GetHomeSafe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ProjectsHomepage" element={<ProjectsHomepage />} />
        <Route path="/GetHomeSafe" element={<GetHomeSafe />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
