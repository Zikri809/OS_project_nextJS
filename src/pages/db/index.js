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
  //the useState is a stateful function that allows changes to this variable to cause a small rerender of the affected elements 
  // it is in the form of an array where [variable , fucntion_to_change_value_inside_the_variable ] 
  //the useState([]) allows us to provide the initial value to the specified varaible
  //in this case the [] will be initial since we hve not yet received ny data form the backend 
    const [data , Setdata] = useState([])

   //useEffect can be understood as sideeffect where code inside it will be excuted when the page completed its first render after its receive the initial html file from the server
  // the [] is called dependecies where this useffect block will be executed when the variables inside it changes its value such as [count, loading]
  //if we use [] called empty dependencies where the it is not dependent on any variables adn will only execute once per page that is on the initial render
    useEffect(()=>{

      // async or asynchornous function allows the task performed by this function not blocking the main user interface thread and allow the use of await
      //doing so by allowing the fucntion to fetch api or perform computation heavy tasks without freezing the ui
      //browser has only single thread not including the web worker
        async function apifetch(){
          //the await allows us to pause the code execution of the required line until the taksed perform is completed like calling the api
          //where it is not instantanous operation
            const result = await fetch('/api/getCollection')
            //the reponse provided by the api is in string as it is transfered over to the network
            //thus we need to turn it back into something that can be accessed by the javascript code 
            //this is where the json come from, we turn the string into json which convert any string into is code behavious
            //like "[1,2,2]" is  string that we have no way of accessing the elements by using json we turn it into a regular array
            //altough in this case it is much more complex
            const resultjson = await result.json()
            //we change the value of the variable data to the data passed from the backend
            Setdata(resultjson)
        }
        //we call the async function
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
                    {//we check for if the data var is it is undefined to prevent error if the db contains 0 entries
                      data!=undefined ? 
                      //allows us to iterate over the array insied the data var , and transform it into something based on the callback function () =>{} 
                        //if use {} wont return anything if use () everyhting in this we be return or we can say replace the original value
                        //after this is complete the data var elements are replaced with html as its elemeents and rendered on the page
                        //<tr> for table row
                        //<td> for table data 
                        // the ?? is called coellescing we is the variable on the left is null or undefined or 0 it will return  the right 
                        //the.toFixed allows us to turn it into aa 2 decimal place
                        //parseFloat(String variable ) allows us to convert a string into a double
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
 
