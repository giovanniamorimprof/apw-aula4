class UserService {
    // Função para obter todos os usuários
    async getAllUsers() {
        try {
            const response = await fetch('https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users');
            const users = await response.json();
            console.log("Usuários carregados do serviço:", users); // Verificar retorno
            return users;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return []; // Retornar um array vazio para evitar erro de undefined
        }
    }
    
    // Função para obter um usuário por ID
    async getUserById(userId) {
        const response = await fetch(`https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users/${userId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter usuário');
        }
        return await response.json();
    }

    // Função para criar um novo usuário
    async createUser(userData) {
        const response = await fetch('https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }
        return await response.json();
    }

    // Função para atualizar um usuário
    async updateUser(userId, updatedData) {
        console.log("Atualizando usuário com ID:", userId);
        const response = await fetch(`https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }
        return await response.json();
    }

    // Função para deletar um usuário
    async deleteUser(userId) {
        const response = await fetch(`https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar usuário');
        }
        return await response.json();
    }
}

// Exportar a classe UserService para uso em outros arquivos
const userService = new UserService();
