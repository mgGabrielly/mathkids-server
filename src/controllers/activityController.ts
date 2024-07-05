import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ActivityController {
    async createModule(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { moduleTitle, videoTitle, videoUrl } = req.body;
            const userModule = await prisma.module.findUnique({ where: { moduleTitle } });
    
            if (userModule) {
                res.status(405).json({
                    message: "Módulo já existe",
                });
                return
            }
    
            const module = await prisma.module.create({
                data: {
                    moduleTitle,
                    videoTitle,
                    videoUrl
                },
            });
            res.json(module)
          
        } catch (error) {
            res.status(500).json({ error: "Não foi possível criar o módulo." });
        }
    }

    async getAllModules(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const modules = await prisma.module.findMany();
            res.json({ modules });
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar os módulos." });
        }
    }

    async getModuleByModuleTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { moduleTitle } = req.params;
            const module = await prisma.module.findUnique({
                where: { moduleTitle: String(moduleTitle) },
            });
            if (!module) {
                res.status(404).json({ error: "Módulo não encontrado." });
            } else {
                res.json({ module });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar o módulo pelo nome do módulo." });
        }
    }

    async getModuleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const module = await prisma.module.findUnique({
                where: { id: Number(id) },
            });
            if (!module) {
                res.status(404).json({ error: "Módulo não encontrado." });
            } else {
                res.json({ module });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar o módulo por ID." });
        }
    }

    async updateModule(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { moduleTitle, videoTitle, videoUrl } = req.body;
            const module = await prisma.module.findUnique({
                where: { id: Number(id) },
            });
            if (!module) {
                res.status(404).json({ error: "Módulo não encontrado." });
            } else {
                const moduleUpdate = await prisma.module.update({
                    where: { moduleTitle: module.moduleTitle },
                    data: {
                        moduleTitle,
                        videoTitle,
                        videoUrl
                    },
                });
                res.json({ moduleUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o módulo." });
        }
    }

    async deleteModule(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const module = await prisma.module.findUnique({
                where: { id: Number(id) },
            });
            if (!module) {
                res.status(404).json({ error: "Módulo não encontrado." });
            } else {
                await prisma.module.delete({
                    where: { id: Number(id) },
                });
                res.json({ message: "Módulo excluído com sucesso." });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao excluir o módulo." });
        }
    }

}

export default new ActivityController();