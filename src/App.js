import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage';
import ProjectsHomepage from './Projects/ProjectsHomepage';

import NotFoundPage from './NotFoundPage';
import ResumeHomepage from "./Resume/ResumeHomepage";
import ExtracurricularHomepage from "./Extracurricular/ExtracurricularHomepage";
import CapstoneHomepage from "./Capstone/CapstoneHomepage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ProjectsHomepage" element={<ProjectsHomepage />} />
     
         
        <Route path="/CapstoneHomepage" element={<CapstoneHomepage />} />
        <Route path="/ResumeHomepage" element={<ResumeHomepage />} />
        <Route path="/ExtracurricularHomepage" element={<ExtracurricularHomepage />} />
    
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
