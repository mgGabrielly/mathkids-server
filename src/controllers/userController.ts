import { Request, Response, NextFunction } from 'express';
// import UserModel from '../models/user';
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

class UserController {
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password, passwordConfirm } = req.body;
            const userExist = await prisma.user.findUnique({ where: { email } });
    
            if (userExist) {
                res.status(405).json({
                    message: "Usuário já existe",
                });
                return
            }
    
            if (password != passwordConfirm) {
                res.status(406).json({ error: "Senhas não coincidem!" });
                return
            }
    
            const hashpassword = await hash(password, 8)
    
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: String(hashpassword),
                    userType: "common",
                    status: "active"
                },
            });

            if(user) {
                await prisma.progress.create({
                    data: {
                        referenceUser: user.id,
                        videosWatched: 0,
                        completedActivities: 0,
                        completedReviews: 0
                    },
                });
            }
            res.json(user)
          
        } catch (error) {
            res.status(500).json({ error: "Não foi possível criar o usuário." });
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await prisma.user.findMany( {
                where: { status: "active" },
                // include: { overallProgress: true },
            });
            res.json({ users });
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar os usuários." });
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
            } else {
                res.json({ user });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário por ID." });
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
            } else {
                const userUpdate = await prisma.user.update({
                    where: { email },
                    data: {
                        name,
                        email
                    },
                });
                res.json({ userUpdate });
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o usuário." });
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
            } else {
                await prisma.user.update({
                    where: { id: Number(id) },
                    data: {
                        status: "disabled",
                    },
                });
                res.json({ message: "Usuário excluído com sucesso." });
            }
        } catch (error) {
            res.status(500).json({ error: "Ocorreu um erro ao excluir o usuário." });
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { newPassword, passwordConfirm } = req.body;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
            } else {
                if (newPassword != passwordConfirm) {
                    res.status(405).json({ error: "Senhas não coincidem!" });
                } else {
                    const hashpassword = await hash(newPassword, 8)
                    const email = user.email;
                    const userUpdate = await prisma.user.update({
                        where: { email },
                        data: {
                            password: hashpassword
                        },
                    });
                    res.json({ userUpdate });
                }
            }
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o usuário." });
        }
    }
}

export default new UserController();