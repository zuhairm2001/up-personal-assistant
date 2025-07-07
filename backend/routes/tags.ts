import { ping, getTags } from "../controller/tagsController.ts";
import express from "express";

const tagsRouter = express.Router();

tagsRouter.get('/tags', getTags);
tagsRouter.get('/ping', ping);

export default tagsRouter;
