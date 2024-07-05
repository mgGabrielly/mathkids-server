import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProgressController {
    async createProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const { videosWatched, completedActivities, completedReviews } = req.body;
            const userProgress = await prisma.progress.findUnique({ where: { referenceUser: Number(referenceUser) } });
    
            if (userProgress) {
                res.status(405).json({
                    message: "Progresso já existe",
                });
                return
            }
    
            const progress = await prisma.progress.create({
                data: {
                    referenceUser: Number(referenceUser),
                    videosWatched,
                    completedActivities,
                    completedReviews
                },
            });
            res.json(progress)
          
        } catch (error) {
            res.status(500).json({ error: "Não foi possível criar o progresso." });
        }
    }

    async getAllProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const progress = await prisma.progress.findMany();
            res.json({ progress });
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar os progressos." });
        }
    }

    async getProgressByReferenceUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const progress = await prisma.progress.findUnique({
                where: { referenceUser: Number(referenceUser) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                res.json({ progress });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar o progresso pelo id do usuário." });
        }
    }

    async getProgressById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const progress = await prisma.progress.findUnique({
                where: { id: Number(id) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                res.json({ progress });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar o progresso por ID." });
        }
    }

    async updateProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const { videosWatched, completedActivities, completedReviews } = req.body;
            const progress = await prisma.progress.findUnique({
                where: { referenceUser: Number(referenceUser) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                const progressUpdate = await prisma.progress.update({
                    where: { referenceUser: progress.referenceUser },
                    data: {
                        videosWatched,
                        completedActivities,
                        completedReviews
                    },
                });
                res.json({ progressUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o progresso." });
        }
    }

    async updateVideosWatched(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const { videosWatched } = req.body;
            const progress = await prisma.progress.findUnique({
                where: { referenceUser: Number(referenceUser) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                const progressUpdate = await prisma.progress.update({
                    where: { referenceUser: progress.referenceUser },
                    data: {
                        videosWatched
                    },
                });
                res.json({ progressUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o videosWatched do progresso." });
        }
    }

    async updateCompletedActivities(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const { completedActivities } = req.body;
            const progress = await prisma.progress.findUnique({
                where: { referenceUser: Number(referenceUser) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                const progressUpdate = await prisma.progress.update({
                    where: { referenceUser: progress.referenceUser },
                    data: {
                        completedActivities
                    },
                });
                res.json({ progressUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o completedActivities do progresso." });
        }
    }

    async updateCompletedReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const { completedReviews } = req.body;
            const progress = await prisma.progress.findUnique({
                where: { referenceUser: Number(referenceUser) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                const progressUpdate = await prisma.progress.update({
                    where: { referenceUser: progress.referenceUser },
                    data: {
                        completedReviews
                    },
                });
                res.json({ progressUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o completedReviews do progresso." });
        }
    }

    async deleteModule(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { referenceUser } = req.params;
            const progress = await prisma.progress.findUnique({
                where: { referenceUser: Number(referenceUser) },
            });
            if (!progress) {
                res.status(404).json({ error: "Progresso não encontrado." });
            } else {
                await prisma.progress.delete({
                    where: { referenceUser: Number(referenceUser) },
                });
                res.json({ message: "Módulo excluído com sucesso." });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao excluir o progresso." });
        }
    }

}

export default new ProgressController();