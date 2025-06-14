import { MongoClient, ServerApiVersion } from "mongodb"
//import the necessary objects of mongodb need to access the db
export default async function getdb(res){
    //the export default allows us to use this function inside other file thus reducing the length perf file and allow reusability
    //the res is from the api params which is an object from api that allows us to return http repsons over the internet
    //process.env. allow us to acces the environment variables such as secret api keys and db credentials necessary to not be exposed to the use or malicous actor
    // can try to see the env file and this file wont be int github as the repo is public for the world to see
    //the ! allows us to check is we have the necessary db connection string 
    //status(http response code) allows us to sent http reponse code to anyone that request this api
    //.json({}) allows us to return a json object containing the attribute necessary to makesure any error is communicated properly
    if(!process.env.atlas_db_url) return res.status(404).json({error: 'Failed to obtained connection credentials to the DB'})

    // created a mongclient object that allows us to connect to the specified cluster based on the connection string passed
    //a cluster in mongo can contain multiple database and in the database can contain multiple collection under it
    const client = new MongoClient(process.env.atlas_db_url, { 
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })
    

    try{
        // we try to established connection to the cluster
        await client.connect()
        // try to connect to a database under this cluster
        const db = await client.db('os_project')
        console.log('Successfully connected to the db')
        //we return the connection to the db for others to access it
        return db
    }
    catch(error){
        //this function if the code insde the try block fails or error thus we can get the necessary error message based on the http response without all of the website collapse
        res.status(404).json({message: 'Failed to connect to the db', error: error})
    }
    
}