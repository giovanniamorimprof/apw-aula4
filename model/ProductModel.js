class ProductModel {
    constructor() {
        this.products = JSON.parse(localStorage.getItem("products")) || [];
    }

    getProducts() {
        return this.products;
    }

    saveProduct(product) {
        this.products.push(product);
        localStorage.setItem("products", JSON.stringify(this.products));
    }

    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product => (product.id === id ? updatedProduct : product));
        localStorage.setItem("products", JSON.stringify(this.products));
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        localStorage.setItem("products", JSON.stringify(this.products));
    }
}
window.ProductModel = ProductModel;