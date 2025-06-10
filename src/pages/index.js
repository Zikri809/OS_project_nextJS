import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRef } from "react";
import { Toaster, toast } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const inputref = useRef('')
  



  function checkIn(){
    //get the input value
    navigator.geolocation.getCurrentPosition((res)=>{
      const user_id = inputref.current.value
      if(!user_id){
        toast.error('Failed to get name or id. Please enter it')
        //exit this and will not execute the rest
        return
      }
      console.log('user id ', user_id)
      console.log('location is ',res)
      const {latitude, longitude,altitude,accuracy,heading} = res.coords
      const date = new Date(res.timestamp)
      const data = fetch(`/api/write_db?user_id=${user_id}&latitude=${latitude}&longitude=${longitude}&accuracy=${accuracy}&timestamp=${date.toISOString()}`)
      //.then(()=>toast.success('Location has been stored'),()=>toast.error('Failed to insert to the DB'))
      toast.promise(data, {
        loading: 'Loading...',
        success: (data) => {
          return `Location has been stored in the DB`;
        },
        error: 'Failed to insert to the DB',
      });
      
    },()=>toast.error('Failed to get location. Permisson denied'))
   

    }
 

  return (
    <div
      className={`m-0  h-screen w-full text-black  bg-gradient-to-br from-black from-5% via-pink-700 via-60% to-indigo-900 to-90% ${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)]`}
    >
      
     


      <Toaster richColors position="top-right" />
     <div className="w-screen flex flex-col justify-around items-center backdrop-blur-3xl bg-white/5  h-screen">
      <div className="border-neutral-200 bg-white/10 backdrop-blur-3xl border-0 rounded-lg p-6 flex flex-col h-fit w-fit items-center gap-4">
              <h1 className="font-bold text-white text-4xl">Check-In</h1>
              <input ref={inputref} type="text" className=" border-1 h-9 border-neutral-300 rounded-md p-3 text-neutral-100" id="username" placeholder="Enter name or ID"/>
             <button className=" hover:bg-neutral-700 bg-black text-white p-2 w-full rounded-md" onClick={checkIn}>Check In</button>
           </div>
     </div>
           
       

      
      
    </div>
  )
}
