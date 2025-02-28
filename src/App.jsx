import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import FreelancerSignup from "./FreelancerSignup";
import FreelancerFeature from "./FreelancerFeature";
import ProfilePage from "./ProfilePage";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/FirstPage" element={<FirstPage />} />
                <Route path="/SecondPage" element={<SecondPage />} />
                <Route path="/FreelancerSignup" element={<FreelancerSignup />} />
                <Route path="/FreelancerFeature" element={<FreelancerFeature />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;