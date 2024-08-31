import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js"
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Use environment variable for flexibility
    credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application", applicationRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await connectDB(); // Ensure the DB connection is established before the server starts
        console.log(`Server running at port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with a failure status code
    }
});
