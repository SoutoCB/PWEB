


export default async function Home({searchParams}){

  const {titleSearchKey = 'bagdad', type = 'movie', year = '1953'} = await searchParams

  const res = await fetch(`http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}&type=${type}&y=${year}`)

  const data = await res.json()



  return (

      <div>

          <div>

          {data.Search.map( (m) => 

            <div key={m.imdbID} style={{ border: '3px solid black', padding: '10px', margin: '10px' }}>
              
              {m.Title} --- {m.Year}

              <br></br>

              <img src={m.Poster}/>

            </div>  )}               

          </div>

      </div>

  )

}
  

 //https://www.omdbapi.com/?apikey=fa74c502&s=bagdad