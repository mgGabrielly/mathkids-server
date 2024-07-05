import express, { Router } from 'express';
import ActivityController from '../controllers/activityController';

const activityRoutes: Router = express.Router();

activityRoutes.get("/activities", ActivityController.getAllModules); 
activityRoutes.post("/create-activity", ActivityController.createModule); 
activityRoutes.get("/activity/:id", ActivityController.getModuleById); 
activityRoutes.get("/activity/:moduleTitle", ActivityController.getModuleByModuleTitle); 
activityRoutes.put("/update-activity/:id", ActivityController.updateModule);
activityRoutes.delete("/delete-activity/:id", ActivityController.deleteModule);

export default activityRoutes;