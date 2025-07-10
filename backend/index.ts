import express from "express";
import morgan from "morgan"
import cors from "cors"
import utilsRouter from "./routes/utils";
import { configDotenv } from "dotenv";
import transactionsRouter from "./routes/transactions";
configDotenv()

const app = express();
const PORT = Bun.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000'], // Vite dev/preview server ports
  credentials: true
}));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/transactions", transactionsRouter)
app.use("/api/utils", utilsRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
