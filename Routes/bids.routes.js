import express from 'express';
import isAuthenticated from '../Middlewheres/isAuthenticate.js';
import { addBid, deleteBid } from '../Controllers/bids.controller.js';

const routes = express.Router();

routes.route("/bid/:id").post(isAuthenticated,addBid);
routes.route("/bid/delete").get(isAuthenticated,deleteBid);


export default routes;