import session from "express-session";
import cookieParser from 'cookie-parser';
import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from "./Routes/user.routes.js"
import projectRoutes from "./Routes/project.routes.js"
import bidsRoutes from "./Routes/bids.routes.js"
import clientRoutes from "./Routes/clientProject.routes.js"
import connectDb from "./Utils/db.js";
dotenv.config()

const app = express();

// Middlewaress
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
const corsOption = {
    origin : "http://localhost:5173",
    credentials : true
}
app.use(cors(corsOption));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  }));



// Api's
app.use("/api/v1/user",userRoutes);  
app.use("/api/v1/project",projectRoutes);
app.use("/api/v1/bids",bidsRoutes);
app.use("/api/v1/client",clientRoutes);

// Server
const PORT = 3535;
app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
    connectDb();
})