const colPessoas = ["Nome", "Telefone", "Aniversário", "Email"];
    const propPessoas = ["firstname", "phone", "birthday", "email"];

    let currentPage = 1; // Controla a página atual
    let loading = false; // Flag para evitar carregamentos múltiplos

    async function carregarPessoas() {
        if (loading) return; // Evita chamadas simultâneas
        loading = true;

        const quantidade = document.getElementById("quantidade").value;

        try {
            let res = await fetch(`https://fakerapi.it/api/v2/persons?_quantity=${quantidade}&_page=${currentPage}`);
            const pessoas = await res.json();

            if (pessoas.data.length > 0) {
                adicionarLinhas(pessoas.data, "tabela", propPessoas);
                currentPage++; // Incrementa a página para o próximo carregamento
            } else {
                console.log("Sem mais dados.");
            }
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }

        loading = false; // Libera para o próximo carregamento
    }

    function adicionarLinhas(dados, divId, propriedades) {
        const tabelaBody = document.querySelector(`#${divId} tbody`);
        if (!tabelaBody) {
            const div = document.getElementById(divId);
            const colunasT = colPessoas.map((col) => `<th>${col}</th>`).join("");

            div.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            ${colunasT}
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `;
        }

        const linhas = dados.map(
            (item) =>
                `<tr>
                    ${propriedades.map((prop) => `<td>${item[prop]}</td>`).join("")}
                </tr>`
        ).join("");

        document.querySelector(`#${divId} tbody`).innerHTML += linhas;
    }

    // Adiciona o evento de scroll ao contêiner
    document.getElementById("scrollContainer").addEventListener("scroll", () => {
        const container = document.getElementById("scrollContainer");
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            carregarPessoas(); // Carrega mais dados quando o scroll atinge o final
        }
    });

    function destacarDados() {
        // Remove destaque anterior
        document.querySelectorAll(".highlight").forEach(cell => {
            cell.classList.remove("highlight");
        });

        const termo = document.getElementById("destaqueFiltro").value.toLowerCase();

        // Se o campo de busca estiver vazio, não faz nada
        if (!termo) return;

        // Percorre todas as células da tabela e aplica o destaque
        const cells = document.querySelectorAll("#tabela td");
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(termo)) {
                cell.classList.add("highlight");
            }
        });
    }

    function filtrarPorNome() {
        const termo = document.getElementById("nomeFiltro").value.toLowerCase();

        // Pega todas as linhas da tabela
        const rows = document.querySelectorAll("#tabela tbody tr");

        rows.forEach(row => {
            const nome = row.cells[0].textContent.toLowerCase(); // Pega o texto da célula de nome
            if (nome.includes(termo)) {
                row.style.display = ""; // Mostra a linha se o nome coincidir
            } else {
                row.style.display = "none"; // Oculta a linha se o nome não coincidir
            }
        });
    }

    document.getElementById("botaoTabela").addEventListener("click", () => {
        currentPage = 1; // Reseta para a primeira página
        document.getElementById("tabela").innerHTML = ""; // Limpa a tabela
        carregarPessoas();
    });

    document.getElementById("destaqueFiltro").addEventListener("input", destacarDados);
    document.getElementById("nomeFiltro").addEventListener("input", filtrarPorNome);

    // Carrega a tabela automaticamente ao abrir o site
    carregarPessoas();