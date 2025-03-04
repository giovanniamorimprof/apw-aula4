class UserController {
    constructor(userView) {
        this.userService = new UserService(); // Instanciando o serviço de usuário
        this.userView = userView; // Passando a instância de UserView
    }

    // Método privado para executar operações assíncronas e tratar erros
    async #executeOperation(operation, successCallback, errorCallback) {
        try {
            const result = await operation();
            if (successCallback) successCallback(result);
            return result;
        } catch (error) {
            console.error('Erro na operação:', error.message || error);
            if (errorCallback) errorCallback(error);
        }
    }

    // Listar usuários
    async listUsers() {
        this.#executeOperation(
            () => this.userService.getAllUsers(),
            (users) => {
                console.log("Usuários recebidos no Controller:", users);
                if (!users || users.length === 0) {
                    console.warn("Nenhum usuário retornado.");
                    return;
                }
                this.userView.renderUserList(users);
            },
            (error) => console.error('Erro ao listar usuários:', error)
        );
    }

    // Criar um novo usuário
    async createUser(userData) {
        this.#executeOperation(
            () => this.userService.createUser(userData),
            (newUser) => this.userView.renderNewUser(newUser),
            (error) => console.error('Erro ao criar usuário:', error)
        );
    }

    // Atualizar um usuário
    async updateUser(userId, updatedData) {
        this.#executeOperation(
            () => this.userService.updateUser(userId, updatedData),
            (updatedUser) => this.userView.updateUserInView(updatedUser),
            (error) => console.error('Erro ao atualizar usuário:', error)
        );
    }

    // Deletar um usuário
    async deleteUser(userId) {
        this.#executeOperation(
            () => this.userService.deleteUser(userId),
            () => this.userView.removeUserFromView(userId),
            (error) => console.error('Erro ao deletar usuário:', error)
        );
    }

    // Obter um usuário pelo ID
    async getUserById(userId) {
        return this.#executeOperation(
            () => this.userService.getUserById(userId),
            null, // Não há necessidade de callback de sucesso aqui
            (error) => console.error('Erro ao obter usuário:', error)
        );
    }
}

// Criação da instância de UserView, agora passando userController para UserView
const userView = new UserView();

// Criação da instância do controlador com a instância do UserView
const userController = new UserController(userView);

// Listando os usuários na inicialização
userController.listUsers();
