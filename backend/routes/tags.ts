import { ping, getTags } from "../controller/tagsController.ts";
import express from "express";

const tagsRouter = express.Router();

tagsRouter.get('/', getTags);
tagsRouter.get('/ping', ping);

export default tagsRouter;
