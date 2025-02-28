import express from "express";
import { loginUser, userRegistration } from "../Controllers/user.controller.js";

const routes = express.Router();

routes.route("/register").post(userRegistration);
routes.route("/login").post(loginUser);

export default routes;