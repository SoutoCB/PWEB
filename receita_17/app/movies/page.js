import MovieForm from "../movieSearch/funcSearch";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const { titleSearchKey, type, year } = await searchParams;

  if (!titleSearchKey && !type && !year) {
    return (
      <div id="movies">
        <MovieForm />
      </div>
    );
  }

  const res = await fetch(`http://www.omdbapi.com/?apikey=fa74c502&s=${titleSearchKey}&type=${type}&y=${year}`);
  const data = await res.json();

  return (
    <div id="movies">

      <Link href="/movies">
        <button style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
           Nova Pesquisa
        </button>
      </Link>

      {data.Search ? (
        data.Search.map((m) => (
          <div key={m.imdbID} style={{ border: '3px solid black', padding: '10px', margin: '10px' }}>
            {m.Title} --- {m.Year}
            <br />
            <img src={m.Poster} />
          </div>
        ))
      ) : (
        <p>Nenhum encontrado</p>
      )}
    </div>
  );
}
