import express, { Router } from 'express';
import ModulesController from '../controllers/modulesController';

const modulesRoutes: Router = express.Router();

modulesRoutes.get("/modules", ModulesController.getAllModules); 
modulesRoutes.post("/create-module", ModulesController.createModule); 
modulesRoutes.get("/module/:id", ModulesController.getModuleById); 
modulesRoutes.get("/module/:moduleTitle", ModulesController.getModuleByModuleTitle); 
modulesRoutes.put("/update-module/:id", ModulesController.updateModule);
modulesRoutes.delete("/delete-module/:id", ModulesController.deleteModule);

export default modulesRoutes;