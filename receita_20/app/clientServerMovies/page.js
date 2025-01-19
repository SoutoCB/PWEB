"use client";
import './globals.css';
import { useState } from "react";
import { searchMovies } from "../actions/movieActions";

export default function Home() {
    const [resultMovies, setResultMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [yearSearchKey, setYearSearchKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleAction(event) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target);
        const titleSearchKey = formData.get("titleSearchKey");
        const yearSearchKey = formData.get("yearSearchKey");
        setSearchKey(titleSearchKey);

        try {
            const res = await searchMovies(formData);
            setResultMovies(res.Search || []);
        } catch (error) {
            console.error("Erro na busca de filmes:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-1/3 bg-white p-6 shadow-md flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Busca de Filmes</h1>
                <MovieForm
                    handleAction={handleAction}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    yearSearchKey={yearSearchKey}
                    setYearSearchKey={setYearSearchKey}
                    isLoading={isLoading}
                />
            </div>

            <div className="w-2/3 bg-gray-50 p-6">
                <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
                <MovieTable movies={resultMovies} />
            </div>
        </div>
    );
}

export function MovieForm({ handleAction, searchKey, setSearchKey, yearSearchKey, setYearSearchKey, isLoading }) {
    return (
        <form onSubmit={handleAction} className="w-full max-w-md">
            <label htmlFor="idTitleSearchKey" className="block text-gray-700 font-semibold mb-2">
                Título
            </label>
            <input
                id="idTitleSearchKey"
                name="titleSearchKey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                placeholder="Digite o título do filme..."
            />

            <label htmlFor="idYearSearchKey" className="block text-gray-700 font-semibold mb-2">
                Ano
            </label>
            <input
                id="idYearSearchKey"
                name="yearSearchKey"
                value={yearSearchKey}
                onChange={(e) => setYearSearchKey(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                placeholder="Digite o ano do filme..."
            />

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-2 rounded-lg text-white ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {isLoading ? "Pesquisando..." : "Pesquisar"}
            </button>
        </form>
    );
}

export function MovieTable({ movies }) {
    return (
        <div className="w-full overflow-auto bg-white p-6 rounded-lg shadow-md">
            {movies.length > 0 ? (
                <table className="min-w-full bg-gray-100 rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-blue-500 text-white">Título</th>
                            <th className="py-2 px-4 bg-blue-500 text-white">Ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((m) => (
                            <tr key={m.imdbID} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4 text-center">{m.Title}</td>
                                <td className="py-2 px-4 text-center">{m.Year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 text-center">Nenhum filme encontrado.</p>
            )}
        </div>
    );
}
