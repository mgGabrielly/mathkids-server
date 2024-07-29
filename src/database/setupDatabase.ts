import prisma from './prisma'; // Importa o Prisma Client configurado

async function setupDatabase() {
    try {
        // Crie os usuários iniciais
        await prisma.user.createMany({
            data: [
                {
                    name: 'Usuário 1',
                    email: 'usuario1@example.com',
                    password: 'senha1',
                    userType: 'normal',
                    status: 'ativo',
                },
                {
                    name: 'Usuário 2',
                    email: 'usuario2@example.com',
                    password: 'senha2',
                    userType: 'admin',
                    status: 'ativo',
                },
            ],
        });

        // Crie módulos iniciais
        await prisma.module.createMany({
            data: [
                {
                    moduleTitle: 'Módulo 1',
                    videoTitle: 'Vídeo do Módulo 1',
                    videoUrl: 'zXiFaFkL9KQ&t=36s',
                },
                {
                    moduleTitle: 'Módulo 2',
                    videoTitle: 'Vídeo do Módulo 2',
                    videoUrl: '9gxndvXzC6U',
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
