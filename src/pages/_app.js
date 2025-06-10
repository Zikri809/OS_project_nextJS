import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }) {
  const homeref = useRef('')
  const dbref = useRef('')
  const router = useRouter()
  useEffect(()=>{
    router.asPath.split('/')[1] == 'db' ? dbref.current.click() : homeref.current.click()
    
  },[])
  function  homehandler(){
    if(!homeref.current.classList.contains('text-neutral-300')){
      homeref.current.classList.replace('text-white','text-neutral-300')
      dbref.current.classList.replace('text-neutral-300','text-white')
      router.push('/')
    }
  }
  function dbhandler(){
    if(!dbref.current.classList.contains('text-neutral-300')){
      dbref.current.classList.replace('text-white','text-neutral-300')
      homeref.current.classList.replace('text-neutral-300','text-white')
      router.push('/db')
    }
  }
  return (
  <>
  <nav className="px-5 absolute z-10 left-0 m-0 top-5 w-full">
         <div className="px-5 h-8 flex flex-row items-center gap-4   rounded-lg bg-white/20 backdrop-blur-3xl text-white">
            <a ref={homeref} onClick={homehandler} className="cursor-pointer hover:text-neutral-200 text-neutral-300">Home</a>
            <a ref={dbref} onClick={dbhandler} className="cursor-pointer hover:text-neutral-400 text-white">DB data</a>
          </div>
      </nav>
    <Component {...pageProps} />
  </>
  )
  
}
