import express from "express";
import { loginUser, logout, updateUser, userRegistration } from "../Controllers/user.controller.js";
import isAuthenticate from "../Middlewheres/isAuthenticate.js";

const routes = express.Router();

routes.route("/register").post(userRegistration);
routes.route("/login").post(loginUser);
routes.route("/update").put(isAuthenticate,updateUser);
routes.route("/logout").get(logout);

export default routes;