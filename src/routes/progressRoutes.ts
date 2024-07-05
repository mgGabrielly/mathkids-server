import express, { Router } from 'express';
import ProgressController from '../controllers/progressController';

const progressRoutes: Router = express.Router();

progressRoutes.get("/progress", ProgressController.getAllProgress); 
progressRoutes.post("/create-progress", ProgressController.createProgress); 
progressRoutes.get("/progress/:id", ProgressController.getProgressById); 
progressRoutes.get("/progress-user/:referenceUser", ProgressController.getProgressByReferenceUser); 
progressRoutes.put("/update-progress/:referenceUser", ProgressController.updateProgress);
progressRoutes.delete("/delete-progress/:referenceUser", ProgressController.deleteModule);
progressRoutes.put("/update-videosWatched/:referenceUser", ProgressController.updateVideosWatched);
progressRoutes.put("/update-completedActivities/:referenceUser", ProgressController.updateCompletedActivities);
progressRoutes.put("/update-completedReviews/:referenceUser", ProgressController.updateCompletedReviews);

export default progressRoutes;