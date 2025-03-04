class UserService {
    constructor() {
        this.baseUrl = 'https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users';
    }

    // Método privado para realizar requisições HTTP
    async #makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, options);

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                const errorMessage = `Erro HTTP: ${response.status} - ${response.statusText}`;
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error("Erro na requisição:", error.message || error);
            throw error; // Propaga o erro para ser tratado pelo chamador
        }
    }

    // Função para obter todos os usuários
    async getAllUsers() {
        try {
            const users = await this.#makeRequest(this.baseUrl);
            console.log("Usuários carregados do serviço:", users);
            return users;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return []; // Retorna um array vazio em caso de falha
        }
    }

    // Função para obter um usuário por ID
    async getUserById(userId) {
        const url = `${this.baseUrl}/${userId}`;
        return this.#makeRequest(url);
    }

    // Função para criar um novo usuário
    async createUser(userData) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
        return this.#makeRequest(this.baseUrl, options);
    }

    // Função para atualizar um usuário
    async updateUser(userId, updatedData) {
        const url = `${this.baseUrl}/${userId}`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        };
        return this.#makeRequest(url, options);
    }

    // Função para deletar um usuário
    async deleteUser(userId) {
        const url = `${this.baseUrl}/${userId}`;
        const options = { method: 'DELETE' };
        return this.#makeRequest(url, options);
    }
}

const userService = new UserService();