class UserController {
    constructor(userView) {
        this.userService = new UserService(); // Instanciando o serviço de usuário
        this.userView = userView; // Passando a instância de UserView diretamente
    }

    async listUsers() {
        try {
            const users = await this.userService.getAllUsers();
            console.log("Usuários recebidos no Controller:", users);
            if (!users || users.length === 0) {
                console.warn("Nenhum usuário retornado.");
                return;
            }
            this.userView.renderUserList(users);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
        }
    }
    
    

    async createUser(userData) {
        try {
            const newUser = await this.userService.createUser(userData); // Cria o usuário
            this.userView.renderNewUser(newUser); // Renderiza o novo usuário na tabela
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    }

    async updateUser(userId, updatedData) {
        try {
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            this.userView.updateUserInView(updatedUser); // Atualiza o usuário na visualização
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    }

    async deleteUser(userId) {
        try {
            await this.userService.deleteUser(userId);
            this.userView.removeUserFromView(userId); // Remove o usuário da visualização
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    }

    // Método para obter um usuário pelo ID
    async getUserById(userId) {
        try {
            const user = await this.userService.getUserById(userId); // Obtém o usuário do serviço
            return user; // Retorna o usuário encontrado
        } catch (error) {
            console.error('Erro ao obter usuário:', error);
        }
    }
}

// Criação da instância de UserView, agora passando userController para UserView
const userView = new UserView();

// Criação da instância do controlador com a instância do UserView
const userController = new UserController(userView);

// Listando os usuários na inicialização
userController.listUsers();

