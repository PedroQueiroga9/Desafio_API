const apiKey = "4fed4edb90804909b1d37a36b2925efc";

const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;

const container = document.getElementById("newsContainer");

function criarCard(artigo) {
    const imagem = artigo.urlToImage || "https://via.placeholder.com/300x200?text=Sem+Imagem";
    const titulo = artigo.title || "Sem Titulo";
    const descricao = artigo.description || "Sem descrição disponível";

    return `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${imagem}" class="card-img-top" alt="Imagem da notícia">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text">${descricao}</p>
          <a href="${artigo.url}" target="_blank" class="btn btn-primary mt-auto">
            Ler notícia
          </a>
        </div>
      </div>
    </div>
  `;
}

async function carregarNoticias() {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if(!dados.articles?.lenght) {
            container.innerHTML = `<p class="text-center text-muted">Nenhuma Notícia encontrada.</p>`;
        }

        container.innerHTML = dados.articles.map(criarCard).join("");

    } catch (erro) {
        console.error("Erro ao buscar notícias", erro);
        container.innerHTML = `<p class="text-danger text-center"> Erro ao carregar notícias. Tente novamente mais tarde.</p>`;
    }
}

carregarNoticias();

