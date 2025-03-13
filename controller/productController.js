class ProductController {
    constructor() {
        this.model = new ProductModel();
        this.loadProducts();
    }

    loadProducts() {
        const products = this.model.getProducts();
        const productList = document.getElementById("productList");

        if (!productList) return; // Evita erro caso a página não tenha essa lista

        productList.innerHTML = "";
        products.forEach(product => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.textContent = `${product.name} - ${product.email}`;

            const buttonGroup = document.createElement("div");

            const editButton = document.createElement("button");
            editButton.className = "btn btn-warning btn-sm me-2";
            editButton.textContent = "Editar";
            editButton.onclick = () => this.editProduct(product.id);

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.textContent = "Excluir";
            deleteButton.onclick = () => this.deleteProduct(product.id);

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);
            li.appendChild(buttonGroup);
            productList.appendChild(li);
        });
    }

    saveProduct(event) {
        event.preventDefault();
        const id = document.getElementById("productId").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (id) {
            this.model.updateProduct(id, { id, name, email });
        } else {
            this.model.saveProduct({ id: Date.now(), name, email });
        }

        this.loadProducts();
        document.getElementById("productForm").reset();
        document.getElementById("productId").value = "";
    }

    editProduct(id) {
        const product = this.model.getProducts().find(product => product.id === id);
        if (product) {
            window.location.href = `/apw-aula4/views/atualizar.html?id=${product.id}&name=${encodeURIComponent(product.name)}&email=${encodeURIComponent(product.email)}`;
        } else {
            console.error("Usuário não encontrado!");
        }
    }


    deleteProduct(id) {
        this.model.deleteProduct(id);
        this.loadProducts();
    }
}

// Torna disponível globalmente
window.ProductController = ProductController;
