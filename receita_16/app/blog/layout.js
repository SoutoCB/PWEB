import Link from 'next/link'
export const metadata = {

    title: 'Next.js',
  
    description: 'Generated by Next.js',
  
  }
  
  
  
  export default function RootLayout({ children }) {
    console.log("montando layout")
    return (
  
        <div>
          {children}
          <br></br>
          <Link href="/blog/post"> Ir a um post</Link>
        </div>
       
  
    )
  
  }