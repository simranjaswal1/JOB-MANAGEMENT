import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, deleteJobById } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob); // Admin posts a job
router.route("/get").get(isAuthenticated, getAllJobs); // Get all jobs (students)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); // Get admin-created jobs
router.route("/get/:id").get(isAuthenticated, getJobById); // Get a job by ID (students)
router.route("/delete/:id").delete(isAuthenticated, deleteJobById); // Delete a job by ID

export default router;
