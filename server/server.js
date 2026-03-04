import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const db = await connectDB();

app.use(express.json());
app.use(cors());

/*app.get("/", async (req, res) => {
  try {
    const serverStatus = await db.command({ ping: 1 });

    res.json({
      message: "Server is live...",
      mongoStatus: serverStatus
    });
  } catch (error) {
    res.status(500).json({ error: "MongoDB error" });
  }
});*/

app.get('/', (req, res)=>res.send("Server is live.."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("MONGO_URI:", process.env.MONGO_URI);