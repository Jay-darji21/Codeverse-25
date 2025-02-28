import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function FirstPage() {
    return (
        <div>
            <h1>Welcome to The Hustle Hub</h1>
            <h2>We bring people together to make ideas happen.</h2>
            <h3>A community where ideas grow through collaboration.</h3>

            <Link to="/SecondPage" >
                <Button variant="outlined">Get Started</Button>
            </Link>
        </div>
    );
}

