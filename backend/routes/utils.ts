import express from "express"
import { ping } from "../controller/utilsController";

const utilsRouter = express.Router();

utilsRouter.get('/ping', ping)

export default utilsRouter;

