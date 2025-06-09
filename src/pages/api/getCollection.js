// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getdb from "../../../utility/getdb";
export default async function handler(req, res) {
   //get the db is present is not then it will create one automatically
   const db = await getdb(res)
   if(!db) return res.status(404).json({error: 'The DB are not found'})
      //get the whole collection
   const db_collection = await db.collection('users_data').find({}).toArray()
   res.status(200).json(db_collection)
}
//test at localhost:3000/api/getCollection