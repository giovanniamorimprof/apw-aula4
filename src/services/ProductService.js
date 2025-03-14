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

        try {
            // Faz a requisição para a API
            const response = await this.#makeRequest(this.baseUrl, options);
            // Retorna o produto criado
            return response;
        } catch (error) {
            console.error('Erro ao criar produto no serviço:', error);
            throw error; // Propaga o erro para o Controller tratar
        }
    }

    async updateProduct(productId, updatedData) {
        if (!productId || !updatedData) {
            throw new Error("ID do produto ou dados de atualização inválidos.");
        }
    
        const url = `${this.baseUrl}/${productId}`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        };
    
        try {
            console.log("Enviando requisição PUT para:", url);
            console.log("Dados enviados:", updatedData);
    
            // Faz a requisição para a API
            const response = await this.#makeRequest(url, options);
    
            console.log("Resposta recebida:", response);
    
            // Verifica se a resposta tem conteúdo
            if (response.status === 204) {
                console.warn("A API não retornou nenhum conteúdo após a atualização.");
                return null; // Retorna null se não houver conteúdo
            }
    
            // Retorna o produto atualizado
            return response;
        } catch (error) {
            console.error('Erro ao atualizar produto no serviço:', error);
            throw error; // Propaga o erro para o Controller tratar
        }
    }

    // Função para deletar um produto
    async deleteProduct(productId) {
        const url = `${this.baseUrl}/${productId}`;
        const options = { method: 'DELETE' };
        return this.#makeRequest(url, options);
    }
}

const productService = new ProductService();