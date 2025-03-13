class ProductView {
    // Renderizar a lista de produtos
    renderProductList(products) {
        const productListHTML = products.map(product => `
            <tr data-id="${product.id}">
                <td>${product.nome}</td>
                <td>${product.descricao}</td>
                <td>R$ ${parseFloat(product.preco).toFixed(2)}</td>
                <td>${product.categoria}</td>
                <td>${product.estoque}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="productView.openEditProductModal(${product.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="productView.openDeleteProductModal(${product.id})">Deletar</button>
                </td>
            </tr>
        `).join('');
        // Renderiza a tabela de produtos e o botão de adicionar produto
        document.getElementById('app').innerHTML = `
            <h2>Lista de Produtos</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${productListHTML}
                </tbody>
            </table>
            <button class="btn btn-primary" id="addProductBtn">Adicionar Produto</button>
        `;
        // Adiciona o ouvinte de evento para o botão "Adicionar Produto"
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.openCreateProductModal();
        });
    }

    // Exibe o modal para criar um novo produto
    openCreateProductModal() {
        const modalHTML = `
            <div class="modal fade" id="createProductModal" tabindex="-1" aria-labelledby="createProductModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createProductModalLabel">Criar Novo Produto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="createProductForm">
                                <div class="mb-3">
                                    <label for="productName" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="productName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="productDescription" class="form-label">Descrição</label>
                                    <textarea class="form-control" id="productDescription" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="productPrice" class="form-label">Preço</label>
                                    <input type="number" class="form-control" id="productPrice" step="0.01" required>
                                </div>
                                <div class="mb-3">
                                    <label for="productCategory" class="form-label">Categoria</label>
                                    <select class="form-select" id="productCategory" required>
                                        <option value="">Selecione uma categoria</option>
                                        <option value="Beauty">Beleza</option>
                                        <option value="Automotive">Automotivo</option>
                                        <option value="Electronics">Eletrônicos</option>
                                        <option value="Clothing">Roupas</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="productStock" class="form-label">Estoque</label>
                                    <input type="number" class="form-control" id="productStock" min="0" required>
                                </div>
                                <div class="mb-3">
                                    <label for="productImage" class="form-label">Imagem (URL)</label>
                                    <input type="url" class="form-control" id="productImage" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary" id="saveProductBtn">Salvar Produto</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Adiciona o modal ao corpo da página
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById('createProductModal'));
        modal.show();
        // Adiciona o ouvinte de evento para o botão "Salvar Produto"
        document.getElementById('saveProductBtn').addEventListener('click', () => {
            this.saveProduct();
            modal.hide(); // Fecha o modal após salvar
        });
    }

    // Coleta os dados do formulário e chama o controlador para criar o produto
    saveProduct() {
        const productData = {
            nome: document.getElementById('productName').value,
            descricao: document.getElementById('productDescription').value,
            preco: document.getElementById('productPrice').value,
            categoria: document.getElementById('productCategory').value,
            estoque: parseInt(document.getElementById('productStock').value),
            imagem: document.getElementById('productImage').value
        };
        productController.createProduct(productData); // Chama a função de criação do produto no controlador
    }

    // Exibe o modal de edição do produto
    async openEditProductModal(productId) {
        try {
            // Aguarda a Promise ser resolvida e obtém o produto
            const product = await productController.getProductById(productId);
            console.log("Produto carregado:", product); // Debug
            // Verifica se o produto foi encontrado
            if (!product) {
                console.error("Produto não encontrado.");
                return;
            }
            const modalHTML = `
                <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editProductModalLabel">Editar Produto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="editProductForm">
                                    <div class="mb-3">
                                        <label for="editProductName" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="editProductName" value="${product.nome}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editProductDescription" class="form-label">Descrição</label>
                                        <textarea class="form-control" id="editProductDescription" rows="3" required>${product.descricao}</textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editProductPrice" class="form-label">Preço</label>
                                        <input type="number" class="form-control" id="editProductPrice" step="0.01" value="${product.preco}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editProductCategory" class="form-label">Categoria</label>
                                        <select class="form-select" id="editProductCategory" required>
                                            <option value="">Selecione uma categoria</option>
                                            <option value="Beauty" ${product.categoria === 'Beauty' ? 'selected' : ''}>Beleza</option>
                                            <option value="Automotive" ${product.categoria === 'Automotive' ? 'selected' : ''}>Automotivo</option>
                                            <option value="Electronics" ${product.categoria === 'Electronics' ? 'selected' : ''}>Eletrônicos</option>
                                            <option value="Clothing" ${product.categoria === 'Clothing' ? 'selected' : ''}>Roupas</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editProductStock" class="form-label">Estoque</label>
                                        <input type="number" class="form-control" id="editProductStock" min="0" value="${product.estoque}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editProductImage" class="form-label">Imagem (URL)</label>
                                        <input type="url" class="form-control" id="editProductImage" value="${product.imagem}" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button type="button" class="btn btn-primary" id="saveEditProductBtn">Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            // Adiciona o modal ao corpo da página
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            // Exibe o modal de edição
            const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
            modal.show();
            // Adiciona o ouvinte de evento para o botão "Salvar Alterações"
            document.getElementById('saveEditProductBtn').addEventListener('click', () => {
                this.saveEditedProduct(productId);
                modal.hide(); // Fecha o modal após salvar
            });
        } catch (error) {
            console.error("Erro ao carregar produto para edição:", error);
        }
    }

    // Salva as alterações feitas no produto
    saveEditedProduct = async (productId) => {
        try {
            const updatedProduct = {
                id: productId,
                nome: document.getElementById('editProductName').value,
                descricao: document.getElementById('editProductDescription').value,
                preco: document.getElementById('editProductPrice').value,
                categoria: document.getElementById('editProductCategory').value,
                estoque: parseInt(document.getElementById('editProductStock').value),
                imagem: document.getElementById('editProductImage').value
            };
            console.log("Enviando atualização para a API:", updatedProduct);
            const response = await fetch(`https://mockapi.io/projects/67d23e6f90e0670699bcc37c/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar produto');
            }
            const data = await response.json();
            console.log("Produto atualizado com sucesso:", data);
            this.loadProducts(); // Recarrega os produtos após a atualização
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    loadProducts() {
        console.log("Recarregando produtos...");
        productController.listProducts();
    }

    // Exibe o modal de confirmação de exclusão de produto
    openDeleteProductModal(productId) {
        const modalHTML = `
            <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="deleteProductModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteProductModalLabel">Confirmar Exclusão</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Você tem certeza de que deseja excluir este produto?</p>
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
        const modal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
        modal.show();
        // Adiciona o ouvinte de evento para o botão "Excluir"
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            productController.deleteProduct(productId); // Chama a função de exclusão no controlador
            modal.hide(); // Fecha o modal após confirmar a exclusão
        });
    }

    // Renderiza um novo produto na tabela após a criação
    renderNewProduct(newProduct) {
        const newProductHTML = `
            <tr data-id="${newProduct.id}">
                <td>${newProduct.nome}</td>
                <td>${newProduct.descricao}</td>
                <td>R$ ${parseFloat(newProduct.preco).toFixed(2)}</td>
                <td>${newProduct.categoria}</td>
                <td>${newProduct.estoque}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="productView.openEditProductModal(${newProduct.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="productView.openDeleteProductModal(${newProduct.id})">Deletar</button>
                </td>
            </tr>
        `;
        // Adiciona o novo produto à tabela de produtos
        document.querySelector('tbody').insertAdjacentHTML('beforeend', newProductHTML);
    }

    // Atualiza um produto na tabela após edição
    updateProductInView(updatedProduct) {
        const productRow = document.querySelector(`tr[data-id='${updatedProduct.id}']`);
        productRow.innerHTML = `
            <td>${updatedProduct.nome}</td>
            <td>${updatedProduct.descricao}</td>
            <td>R$ ${parseFloat(updatedProduct.preco).toFixed(2)}</td>
            <td>${updatedProduct.categoria}</td>
            <td>${updatedProduct.estoque}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="productView.openEditProductModal(${updatedProduct.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="productView.openDeleteProductModal(${updatedProduct.id})">Deletar</button>
            </td>
        `;
    }

    // Remove um produto da tabela após a exclusão
    removeProductFromView(productId) {
        const productRow = document.querySelector(`tr[data-id='${productId}']`);
        if (productRow) {
            productRow.remove();
        }
    }
}