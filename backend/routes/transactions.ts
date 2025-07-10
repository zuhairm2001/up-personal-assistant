import { getTransactionByTag} from "../controller/transactionsController";
import express from "express";

const transactionsRouter = express.Router();

transactionsRouter.post('/tag', getTransactionByTag);

export default transactionsRouter;
