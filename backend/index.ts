import express from "express";
import morgan from "morgan"
import cors from "cors"
import tagsRouter from "./routes/tags";
import utilsRouter from "./routes/utils";
import { configDotenv } from "dotenv";
configDotenv()

const app = express();
const PORT = Bun.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/tags", tagsRouter)
app.use("/api/utils", utilsRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
