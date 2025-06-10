import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function db_page(){
    const [data , Setdata] = useState([])
    useEffect(()=>{
        async function apifetch(){
            const result = await fetch('/api/getCollection')
            const resultjson = await result.json()
            Setdata(resultjson)
        }
        apifetch()
    },[])
    console.log('data is ',data)
    return(
         <div
           className={`m-0  h-screen w-screen text-black  bg-gradient-to-br from-black from-5% via-pink-700 via-60% to-indigo-900 to-90% ${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)]`}
         >
            <div className="pt-4 text-white mx-5 px-4 relative bg-white/20 backdrop-blur-3xl top-20 overflow-y-auto rounded-md ">
            <table className="table-fixed overflow-visible w-fit">
                 <thead className="font-extrabold text-left">
                   <tr>
                     <th className="w-40 ">User ID</th>
                     <th className="w-30 ">Latitude</th>
                     <th className="w-30 ">Longitude</th>
                     <th className="w-30 ">Altitude</th>
                     <th className="w-30 ">Accuracy</th>
                     <th className="w-50 ">Timestamp</th>
                     <th className="w-20 ">Heading</th>
                   </tr>
                 </thead>
                 <tbody className="mt-4" >
                    {
                      data!=undefined ? 
                        data.map((element)=>(
                            <tr>
                                <td>{element.user_id ?? 'null'}</td>
                                <td>{element.latitude.toFixed(2) ?? 'null'}</td>
                                <td>{element.longitude.toFixed(2) ?? 'null'}</td>
                                <td>{element.altitude ? element.altitude.toFixed(2) : 'null'}</td>
                                <td>{element.accuracy ? element.accuracy.toFixed(2) : 'null'}</td>
                                <td>{element.timestamp ?? 'null'}</td>
                                <td>{element.heading ? parseFloat(element.heading).toFixed(2) : 'null'}</td>
            

                            </tr>
                        ))
                      :  <></>
                    }
                   
                 </tbody>
               
            </table>
               
            </div>
         </div>
    )
}
 
