const colPessoas = ["Nome", "Telefone", "Aniversário", "Email"];
const propPessoas = ["firstname", "phone", "birthday", "email"];

let currentPage = 1;
let loading = false;

async function carregarPessoas() {
    if (loading) return;
    loading = true;

    const quantidade = document.getElementById("quantidade").value;

    try {
        let res = await fetch(`https://fakerapi.it/api/v2/persons?_quantity=${quantidade}&_page=${currentPage}`);
        const pessoas = await res.json();

        if (pessoas.data.length > 0) {
            adicionarLinhas(pessoas.data, "tabela", propPessoas);
            currentPage++;
        } else {
            console.log("Sem mais dados.");
        }
    } catch (err) {
        console.error("Erro ao carregar dados:", err);
    }

    loading = false;
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

document.getElementById("scrollContainer").addEventListener("scroll", () => {
    const container = document.getElementById("scrollContainer");
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        carregarPessoas();
    }
});

function destacarDados() {
    document.querySelectorAll(".highlight").forEach(cell => {
        cell.classList.remove("highlight");
    });

    const termo = document.getElementById("destaqueFiltro").value.toLowerCase();

    if (!termo) return;

    const cells = document.querySelectorAll("#tabela td");
    cells.forEach(cell => {
        if (cell.textContent.toLowerCase().includes(termo)) {
            cell.classList.add("highlight");
        }
    });
}

function filtrarPorNome() {
    const termo = document.getElementById("nomeFiltro").value.toLowerCase();

    const rows = document.querySelectorAll("#tabela tbody tr");

    rows.forEach(row => {
        const nome = row.cells[0].textContent.toLowerCase();
        if (nome.includes(termo)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

document.getElementById("botaoTabela").addEventListener("click", () => {
    currentPage = 1;
    document.getElementById("tabela").innerHTML = "";
    carregarPessoas();
});

document.getElementById("destaqueFiltro").addEventListener("input", destacarDados);
document.getElementById("nomeFiltro").addEventListener("input", filtrarPorNome);

carregarPessoas();
