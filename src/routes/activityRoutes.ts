import express, { Router } from 'express';
import ActivityController from '../controllers/activityController';

const activityRoutes: Router = express.Router();

activityRoutes.get("/activities", ActivityController.getAllActivity); 
activityRoutes.post("/create-activity", ActivityController.createActivity); 
activityRoutes.get("/activity/:id", ActivityController.getActivitById); 
activityRoutes.get("/activity/:description", ActivityController.getActivityByDescription); 
activityRoutes.put("/update-activity/:id", ActivityController.updateActivity);
activityRoutes.delete("/delete-activity/:id", ActivityController.deleteActivity);
activityRoutes.get("/activities-module/:referenceModule", ActivityController.getActivityByModule); 

export default activityRoutes;