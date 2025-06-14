import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }) {
  // any html element in this file will persist across pages which mean it will not be rerendered on each page changes suitbale for naavigation elements
  const homeref = useRef('')
  const dbref = useRef('')
  const router = useRouter()
  // useRouter is a function that allows us to obtain access to router object that is related to the navigation from page to page 
  //changes in the url of the browser

  //useEffect can be understood as sideeffect where code inside it will be excuted when the page completed its first render after its receive the initial html file from the server
  // the [] is called dependecies where this useffect block will be executed when the variables inside it changes its value such as [count, loading]
  //if we use [] called empty dependencies where the it is not dependent on any variables adn will only execute once per page that is on the initial render
  useEffect(()=>{
    //we access the url that is on the browser by using the asPaath property from the router object, the url is in string
    //then the url which is  <our_domain>/db if we are in db page then split by / we get an array containing ["<our_domain>","db"]
    //then we access the index one to see if we are on the db page thus changing the color of the "db data" and "home" text
    router.asPath.split('/')[1] == 'db' ? dbref.current.click() : homeref.current.click()
    
  },[])

  //the fucntion below is the function called when uses click the html element that have this function attached 
  //the function access html element that we have anchored using the useRef and changes the color of the "db data" and "home" text
  //the contains() allows us to check if the html element text has the required text color if yes then it will return true if not then false
  //the replace() allows us to replace the existing text color to other one , if lets say the one we wanted to repalce is not there the function wont error 
  //instead it will not execute 
  //the  .push() of the router object allows us to move to pages based on the file directory we have provided
  // nextjs pages are handled like a file system where the pages folder is the root or "/" 
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
  //the hover: is called a pseudoclass of the css where it will perform the specified sytling based on the action
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
