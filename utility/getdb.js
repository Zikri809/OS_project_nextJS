import { MongoClient, ServerApiVersion } from "mongodb"
export default async function getdb(res){
    //the res is from the api params 
    if(!process.env.atlas_db_url) return res.status(404).json({error: 'Failed to obtained connection credentials to the DB'})
    const client = new MongoClient(process.env.atlas_db_url, { 
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    try{
        await client.connect()
        const db = await client.db('os_project')
        console.log('Successfully connected to the db')
        return db
    }
    catch(error){
        res.status(404).json({message: 'Failed to connect to the db', error: error})
    }
    
}