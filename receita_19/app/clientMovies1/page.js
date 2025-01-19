"use client";
import "./globals.css";
import { useState } from "react";

export default function Home() {
    const [resultMovies, setResultMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleAction(event) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target);
        const titleSearchKey = formData.get("titleSearchKey");
        setSearchKey(titleSearchKey);

        try {
            const httpRes = await fetch(`http://localhost:3000/api/searchMovies?titleSearchKey=${titleSearchKey}`);
            const jsonRes = await httpRes.json();
            setResultMovies(jsonRes.Search || []);
        } catch (error) {
            console.error("Erro na busca de filmes:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-1/4 bg-white p-6 shadow-lg">
                <MovieForm
                    handleAction={handleAction}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    isLoading={isLoading}
                />
            </div>

            <div className="flex-1 p-6">
                <MovieTable movies={resultMovies} />
            </div>
        </div>
    );
}

export function MovieForm({ handleAction, searchKey, setSearchKey, isLoading }) {
    return (
        <form onSubmit={handleAction} className="space-y-4">
            <label htmlFor="idTitleSearchKey" className="block text-lg font-medium text-gray-700">
                Título
            </label>
            <input
                id="idTitleSearchKey"
                name="titleSearchKey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o título do filme..."
            />
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-2 text-white rounded-lg ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {isLoading ? "Pesquisando..." : "Pesquisar"}
            </button>
        </form>
    );
}

export function MovieTable({ movies }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            {movies.length > 0 ? (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-2 px-4 text-left">Título</th>
                            <th className="py-2 px-4 text-left">Ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((m) => (
                            <tr key={m.imdbID} className="hover:bg-gray-100 border-b">
                                <td className="py-2 px-4">{m.Title}</td>
                                <td className="py-2 px-4">{m.Year}</td>
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
