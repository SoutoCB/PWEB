

export default function MovieForm() {
    return (
      <form action="/movies" method="GET">
        <label htmlFor="idTitleSearchKey">Título</label>
        <input id="idTitleSearchKey" name="titleSearchKey" />
  
        <label htmlFor="idTypeSearchKey">Tipo</label>
        <input id="idTypeSearchKey" name="type" />
  
        <label htmlFor="idYearSearchKey">Ano</label>
        <input id="idYearSearchKey" name="year" />
  
        <button type="submit">Pesquisar</button>
      </form>
    );
  }