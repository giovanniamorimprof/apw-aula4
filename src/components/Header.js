class Header {
    render() {
        const headerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">CRUD com JavaScript</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Sobre</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contatos</a>
                            </li>
                            <!-- Link para a página de Produtos -->
                            <li class="nav-item">
                                <a class="nav-link" href="products.html">Produtos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        
        document.getElementById('header').innerHTML = headerHTML;
    }
}

// Criar uma instância de Header e renderizar na página
const header = new Header();
header.render();