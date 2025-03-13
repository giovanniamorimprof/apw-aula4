class ProductService {
    constructor() {
        this.baseUrl = 'https://67c6f465c19eb8753e780d30.mockapi.io/api/v1/produtos';
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

    // Função para obter todos os produtos
    async getAllProducts() {
        try {
            const products = await this.#makeRequest(this.baseUrl);
            console.log("Produtos carregados do serviço:", products);
            return products;
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            return []; // Retorna um array vazio em caso de falha
        }
    }

    // Função para obter um produto por ID
    async getProductById(productId) {
        const url = `${this.baseUrl}/${productId}`;
        return this.#makeRequest(url);
    }

    // Função para criar um novo produto
    async createProduct(productData) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        };
        return this.#makeRequest(this.baseUrl, options);
    }

    // Função para atualizar um produto
    async updateProduct(productId, updatedData) {
        const url = `${this.baseUrl}/${productId}`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        };
        return this.#makeRequest(url, options);
    }

    // Função para deletar um produto
    async deleteProduct(productId) {
        const url = `${this.baseUrl}/${productId}`;
        const options = { method: 'DELETE' };
        return this.#makeRequest(url, options);
    }
}

const productService = new ProductService();