'use server'



export async function searchMovies(formData) {
    const titleSearchKey = formData.get("titleSearchKey")
    const yearSearchKey = formData.get("yearSearchKey") 

    if (!titleSearchKey || titleSearchKey === '') return { Search: [] }

    try {
        let url = `http://www.omdbapi.com/?apikey=fa74c502&s=${titleSearchKey}`
        if (yearSearchKey) {
            url += `&y=${yearSearchKey}` 
        }

        const httpRes = await fetch(url)
        const jsonRes = await httpRes.json()

        return jsonRes.Search ? jsonRes : { Search: [] };
    } catch (err) {
        return { error: `Erro na requisição: ${err}` }
    }
}
