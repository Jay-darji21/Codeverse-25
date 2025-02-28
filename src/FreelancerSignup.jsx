import React from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function FreelancerSignup(){
    return(
        <div>
            <h2>Sign up to find work you Love</h2>
            <TextField style={{marginRight:"30px"}}  label="First Name" variant="outlined" />
            <TextField  label="Last Name" variant="outlined" />
            <TextField style={{display:"flex" ,flexDirection: "column" ,marginTop:"30px"}} label="Email" variant="outlined" />
            <TextField style={{display:"flex" ,flexDirection: "column" ,marginTop:"30px",marginBottom:"30px"}} label="Password" variant="outlined" />
            <Link to="/FreelancerFeature">
            <Button variant="contained" color="success">Create My account</Button>
            </Link>

        </div>
    )
}