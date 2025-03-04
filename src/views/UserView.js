class UserView {

    // Renderizar a lista de usuários
    renderUserList(users) {
        const userListHTML = users.map(user => `
            <tr data-id="${user.id}">
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="userView.openEditUserModal(${user.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="userView.openDeleteUserModal(${user.id})">Deletar</button>
                </td>
            </tr>
        `).join('');

        // Renderiza a tabela de usuários e o botão de adicionar usuário
        document.getElementById('app').innerHTML = `
            <h2>Lista de Usuários</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${userListHTML}
                </tbody>
            </table>
            <button class="btn btn-primary" id="addUserBtn">Adicionar Usuário</button>
        `;

        // Adiciona o ouvinte de evento para o botão "Adicionar Usuário"
        document.getElementById('addUserBtn').addEventListener('click', () => {
            this.openCreateUserModal();
        });
    }

    // Exibe o modal para criar um novo usuário
    openCreateUserModal() {
        const modalHTML = `
            <div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createUserModalLabel">Criar Novo Usuário</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="createUserForm">
                                <div class="mb-3">
                                    <label for="userName" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="userName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="userEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="userEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="userPhone" class="form-label">Telefone</label>
                                    <input type="text" class="form-control" id="userPhone" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary" id="saveUserBtn">Salvar Usuário</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Adiciona o modal ao corpo da página
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById('createUserModal'));
        modal.show();

        // Adiciona o ouvinte de evento para o botão "Salvar Usuário"
        document.getElementById('saveUserBtn').addEventListener('click', () => {
            this.saveUser();
            modal.hide(); // Fecha o modal após salvar
        });
    }

    // Coleta os dados do formulário e chama o controlador para criar o usuário
    saveUser() {
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const phone = document.getElementById('userPhone').value;

        // Dados do novo usuário
        const newUserData = {
            name,
            email,
            phone
        };

        userController.createUser(newUserData); // Chama a função de criação do usuário no controlador
    }

    // Exibe o modal de edição do usuário
    async openEditUserModal(userId) {
        try {
            // Aguarda a Promise ser resolvida e obtém o usuário
            const user = await userController.getUserById(userId);
            
            console.log("Usuário carregado:", user); // Debug
    
            // Verifica se o usuário foi encontrado
            if (!user) {
                console.error("Usuário não encontrado.");
                return;
            }
    
            const modalHTML = `
                <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editUserModalLabel">Editar Usuário</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="editUserForm">
                                    <div class="mb-3">
                                        <label for="editUserName" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="editUserName" value="${user.name}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editUserEmail" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="editUserEmail" value="${user.email}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editUserPhone" class="form-label">Telefone</label>
                                        <input type="text" class="form-control" id="editUserPhone" value="${user.phone}" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button type="button" class="btn btn-primary" id="saveEditUserBtn">Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            // Adiciona o modal ao corpo da página
            document.body.insertAdjacentHTML('beforeend', modalHTML);
    
            // Exibe o modal de edição
            const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
            modal.show();
    
            // Adiciona o ouvinte de evento para o botão "Salvar Alterações"
            document.getElementById('saveEditUserBtn').addEventListener('click', () => {
                this.saveEditedUser(userId);
                modal.hide(); // Fecha o modal após salvar
            });
    
        } catch (error) {
            console.error("Erro ao carregar usuário para edição:", error);
        }
    }
    

    // Salva as alterações feitas no usuário
    saveEditedUser = async (userId) => {
        try {
            const updatedUser = {
                id: userId,
                name: document.getElementById('editUserName').value,
                email: document.getElementById('editUserEmail').value,
                phone: document.getElementById('editUserPhone').value,
            };
    
            console.log("Enviando atualização para a API:", updatedUser);
    
            const response = await fetch(`https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
    
            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }
    
            const data = await response.json();
            console.log("Usuário atualizado com sucesso:", data);
    
            this.loadUsers(); // Recarrega os usuários após a atualização
    
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };
    

    loadUsers() {
        console.log("Recarregando usuários...");
        userController.listUsers();
    }
    
    

    // Exibe o modal de confirmação de exclusão de usuário
    openDeleteUserModal(userId) {
        const modalHTML = `
            <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteUserModalLabel">Confirmar Exclusão</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Você tem certeza de que deseja excluir este usuário?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Adiciona o modal de exclusão ao corpo da página
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Exibe o modal de confirmação
        const modal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
        modal.show();

        // Adiciona o ouvinte de evento para o botão "Excluir"
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            userController.deleteUser(userId); // Chama a função de exclusão no controlador
            modal.hide(); // Fecha o modal após confirmar a exclusão
        });
    }

    // Renderiza um novo usuário na tabela após a criação
    renderNewUser(newUser) {
        const newUserHTML = `
            <tr data-id="${newUser.id}">
                <td>${newUser.name}</td>
                <td>${newUser.email}</td>
                <td>${newUser.phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="userView.openEditUserModal(${newUser.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="userView.openDeleteUserModal(${newUser.id})">Deletar</button>
                </td>
            </tr>
        `;
        // Adiciona o novo usuário à tabela de usuários
        document.querySelector('tbody').insertAdjacentHTML('beforeend', newUserHTML);
    }

    // Atualiza um usuário na tabela após edição
    updateUserInView(updatedUser) {
        const userRow = document.querySelector(`tr[data-id='${updatedUser.id}']`);
        userRow.innerHTML = `
            <td>${updatedUser.name}</td>
            <td>${updatedUser.email}</td>
            <td>${updatedUser.phone}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="userView.openEditUserModal(${updatedUser.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="userView.openDeleteUserModal(${updatedUser.id})">Deletar</button>
            </td>
        `;
    }

    // Remove um usuário da tabela após a exclusão
    removeUserFromView(userId) {
        const userRow = document.querySelector(`tr[data-id='${userId}']`);
        if (userRow) {
            userRow.remove();
        }
    }
}
