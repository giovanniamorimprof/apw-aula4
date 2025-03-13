class ProductController {
    constructor(productView) {
        this.productService = new ProductService(); // Instanciando o serviço de usuário
        this.productView = productView; // Passando a instância de ProductView
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
    async listProducts() {
        this.#executeOperation(
            () => this.productService.getAllProducts(),
            (products) => {
                console.log("Usuários recebidos no Controller:", products);
                if (!products || products.length === 0) {
                    console.warn("Nenhum usuário retornado.");
                    return;
                }
                this.productView.renderProductList(products);
            },
            (error) => console.error('Erro ao listar usuários:', error)
        );
    }

    // Criar novo produto
    async createProduct(productData) {
        try {
            // Chama o serviço para criar o produto
            const newProduct = await this.productService.createProduct(productData);
            
            // Renderiza o novo produto na interface
            this.productView.renderNewProduct(newProduct);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    }

    async updateProduct(productId, updatedData) {
        try {
            // Chama o serviço para atualizar o produto
            const updatedProduct = await this.productService.updateProduct(productId, updatedData);
            
            // Atualiza o produto na interface
            this.productView.updateProductInView(updatedProduct);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    }

    // Deletar um usuário
    async deleteProduct(productId) {
        this.#executeOperation(
            () => this.productService.deleteProduct(productId),
            () => this.productView.removeProductFromView(productId),
            (error) => console.error('Erro ao deletar usuário:', error)
        );
    }

    // Obter um usuário pelo ID
    async getProductById(productId) {
        return this.#executeOperation(
            () => this.productService.getProductById(productId),
            null, // Não há necessidade de callback de sucesso aqui
            (error) => console.error('Erro ao obter usuário:', error)
        );
    }
}

// Criação da instância de ProductView, agora passando productController para ProductView
const productView = new ProductView();

// Criação da instância do controlador com a instância do ProductView
const productController = new ProductController(productView);

// Listando os usuários na inicialização
productController.listProducts();
