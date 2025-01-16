import { Titulo } from "./componentes/titulo"
import { SubTitulo } from "./componentes/subtitulo"

export default function Principal(){

    return (
       <div>
          <Titulo titulo="Nova Pagina"/>
          <SubTitulo subtitulo="Coisas novas"/>
          <MariaPrea />
          <a href="/blog">Ir para o blog</a>           
       </div>
 
    )
 
 }

 export function MariaPrea(){

    return (
 
       <h3>Morreu Maria Preá...</h3>
 
    )
 
 }