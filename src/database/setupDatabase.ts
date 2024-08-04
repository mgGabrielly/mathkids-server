import prisma from './prisma';
import { hash } from 'bcryptjs';

async function setupDatabase() {
    try {
        const hashedPassword = await hash('Oi@12345', 8);
        const users = await prisma.user.createMany({
            data: [
                {
                    name: 'Teste 1',
                    email: 'teste1@example.com',
                    password: hashedPassword,
                    userType: 'common',
                    status: 'active',
                },
                {
                    name: 'Teste 2',
                    email: 'teste2@example.com',
                    password: hashedPassword,
                    userType: 'common',
                    status: 'active',
                },
            ],
        });

        const createdUsers = await prisma.user.findMany({
            where: { email: { in: ['teste1@example.com', 'teste2@example.com'] } },
        });

        await Promise.all(
            createdUsers.map(user =>
                prisma.progress.create({
                    data: {
                        referenceUser: user.id,
                        videosWatched: 0,
                        completedActivities: 0,
                        completedReviews: 0,
                    },
                })
            )
        );

        await prisma.module.createMany({
            data: [
                {
                    moduleTitle: 'Módulo 1',
                    videoTitle: 'O que é Matemática?',
                    videoUrl: 'zXiFaFkL9KQ',
                },
                {
                    moduleTitle: 'Módulo 2',
                    videoTitle: 'Números de 0 a 10',
                    videoUrl: '9gxndvXzC6U',
                },
                {
                    moduleTitle: 'Módulo 3',
                    videoTitle: 'Adição',
                    videoUrl: 'kq0kh0XvT9c',
                },
                {
                    moduleTitle: 'Módulo 4',
                    videoTitle: 'Antecessor e sucessor',
                    videoUrl: 'rtdknGTnePE',
                },
            ],
        });

        console.log('Dados iniciais criados com sucesso.');
    } catch (error) {
        console.error('Erro durante a criação de dados iniciais:', error);
    } finally {
        await prisma.$disconnect();
    }
}

setupDatabase().catch((error) => {
    console.error('Erro no script principal:', error);
});
