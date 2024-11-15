

 export const carregarDiv = (dados, divId, propriedades, colunas) => {
    const div = document.getElementById(divId);

    const linhas = dados.map(
        (item) =>
            `<tr>
                ${propriedades.map((prop) =>`<td>${item[prop]}</td>`).join("")}
            </tr>`
    ).join("");

    const colunasT = colunas.map((col) => `<th>${col}</th>`).join("");
    
    div.innerHTML = `
        <table>
            <thead>
                <tr>
                    ${colunasT}
                </tr>
            </thead>
            <tbody>${linhas}</tbody>
        </table>
    `;
};