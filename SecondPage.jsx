import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SecondPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
            <h2>Join as a Client or Freelancer</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                
                 <Button variant="contained" color="success">I’m a client, hiring</Button>
                 
                 <Link to="/FreelancerSignup">
                 <Button variant="contained" color="success">I’m a freelancer, looking for work</Button>
                 </Link>
            </div>
        </div>
    );
}
