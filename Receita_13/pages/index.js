import { Hello } from "./hello"
import { About } from "./about"

export default function Home(){

    return (
 
       <div>
 
          <h1>
            {Hello()}
          </h1>
          <h2>
            {About()}
          </h2>
 
       </div>
 
    )
 
 }

 