import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ActivityController {
    async createActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { description, activityType, referenceModule, numberOfQuestions } = req.body;
            const userActivity = await prisma.activity.findUnique({ where: { description } });
    
            if (userActivity) {
                res.status(405).json({
                    message: "Atividade já existe",
                });
                return
            }
    
            const activity = await prisma.activity.create({
                data: {
                    description,
                    activityType,
                    referenceModule,
                    numberOfQuestions
                },
            });
            res.json(activity)
          
        } catch (error) {
            res.status(500).json({ error: "Não foi possível criar a atividade." });
        }
    }

    async getAllActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const activity = await prisma.activity.findMany();
            res.json({ activity });
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar as atividades." });
        }
    }

    async getActivityByDescription(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { description } = req.params;
            const activity = await prisma.activity.findUnique({
                where: { description: String(description) },
            });
            if (!activity) {
                res.status(404).json({ error: "Atividade não encontrada." });
            } else {
                res.json({ activity });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar a atividade pela descrição." });
        }
    }

    async getActivityByModule(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceModule } = req.params;
            const activities = await prisma.activity.findMany({
                where: { referenceModule: String(referenceModule) },
            });
            if (!activities) {
                res.status(404).json({ error: "Atividades do módulo não encontradas." });
            } else {
                res.json({ activities });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar as atividades pelo módulo." });
        }
    }

    async getActivitById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const activity = await prisma.activity.findUnique({
                where: { id: Number(id) },
            });
            if (!activity) {
                res.status(404).json({ error: "Atividade não encontrada." });
            } else {
                res.json({ activity });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar a atividade por ID." });
        }
    }

    async updateActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { description, activityType, referenceModule, numberOfQuestions } = req.body;
            const activity = await prisma.activity.findUnique({
                where: { id: Number(id) },
            });
            if (!activity) {
                res.status(404).json({ error: "Atividade não encontrada." });
            } else {
                const activityUpdate = await prisma.activity.update({
                    where: { id: Number(id) },
                    data: {
                        description, 
                        activityType, 
                        referenceModule, 
                        numberOfQuestions
                    },
                });
                res.json({ activityUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar a atividade." });
        }
    }

    async deleteActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const activity = await prisma.activity.findUnique({
                where: { id: Number(id) },
            });
            if (!activity) {
                res.status(404).json({ error: "Atividade não encontrada." });
            } else {
                await prisma.activity.delete({
                    where: { id: Number(id) },
                });
                res.json({ message: "Atividade excluída com sucesso." });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao excluir a atividade." });
        }
    }

}

export default new ActivityController();