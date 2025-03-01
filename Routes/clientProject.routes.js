import express from "express";
import { createProject, getUserProjects } from "../Controllers/clientProject.controlller.js";
import { fetchAllProjects } from "../Controllers/project.controller.js";
import isAuthenticated from "../Middlewheres/isAuthenticate.js";

const routes = express.Router();

routes.route("/postProject").post(isAuthenticated,createProject);
routes.route("/fetchProject").get(isAuthenticated,fetchAllProjects);
routes.route("/user/fetch").get(isAuthenticated,getUserProjects);

export default routes;