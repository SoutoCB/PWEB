import Link from 'next/link'
export const metadata = {

    title: 'Next.js',
  
    description: 'Generated by Next.js',
  
  }
  
  
  
  export default function RootLayout({ children }) {
    console.log("montando layout")
    return (
  
      <html lang="en">
        
        <body>
          {children}
          <Link href="/blog">Ir para o blog </Link>
          <br></br>
        </body>
      </html>
  
    )
  
  }