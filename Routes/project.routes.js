import express from 'express';
import { fetchAllProjects, postProject, updateProject } from '../Controllers/project.controller.js';
import isAuthenticated from '../Middlewheres/isAuthenticate.js';

const routes = express.Router();

routes.route("/save").post(isAuthenticated,postProject);
routes.route("/fetch").get(isAuthenticated,fetchAllProjects);
routes.route("/update").put(isAuthenticated,updateProject);

export default routes;