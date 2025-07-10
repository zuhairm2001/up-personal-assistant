import { getTransactionByTag} from "../controller/tagsController.ts";
import express from "express";

const tagsRouter = express.Router();

tagsRouter.get('/', getTransactionByTag);

export default tagsRouter;
