    import getdb from "../../../utility/getdb";

    export default async function handler(req,res){
        //timestamp provided must me compliant to the ISO String
        let {
            user_id, 
            latitude, 
            longitude, 
            altitude ,
            accuracy, 
            timestamp,
            heading 
        } = req.query

        if(!user_id || !latitude || !longitude || !accuracy || !timestamp ) return res.status(400).json(
            {
                message: 'Some crucial query data is missing', success: false
            }
            
        )

        if(!(Number(latitude)>=-90 && Number(latitude)<=90)) return res.status(400).json({message: 'Latitude is not in the valid range', success: false})
        if(!(Number(longitude)>=-180 && Number(longitude)<=180)) return res.status(400).json({message: 'Longitude is not in the valid range', success: false})
        if(!(Number(accuracy)>=0)) return res.status(400).json({message: 'The accuracy cannot be negative', success: false})

        const date = new Date(timestamp)
        if(isNaN(date.getDate())) return res.status(400).json({message: 'Invalid date in the query', success: false})

        if(heading ==undefined) heading=null
        if(altitude ==undefined) altitude=null

        const db = await getdb(res)
        try{
            const results = await db.collection('users_data').insertOne({
                user_id: user_id, 
                latitude: Number(latitude), 
                longitude: Number(longitude), 
                altitude: (altitude==null ? null:Number(altitude)) ,
                accuracy: (accuracy==null ? null: Number(accuracy)), 
                timestamp: timestamp,
                heading: heading 
            })
            //const resultjson = await results.json()
            res.status(200).json({message: 'Success inserting to the db', success: true})
            //success will provide a response object if not then it will throw an error
        }
        catch(error){
            return res.status(500).json({message: 'Problem inserting to the db', success: false, error: error})
        }
        

    }


//test mock api
/*
Valid
//  http://localhost:3000/api/write_db?user_id=iPhone_14_Pro_Safari&latitude=3.1390&longitude=101.6869&altitude=21.5&accuracy=5.2&timestamp=2025-06-09T14:30:15.123Z&heading=45.6
//  http://localhost:3000/api/write_db?user_id=Samsung_Galaxy_Chrome&latitude=3.1478&longitude=101.6953&accuracy=3.1&timestamp=2025-06-09T14:31:22.456Z
http://localhost:3000/api/write_db?user_id=MacBook_Pro_Safari&latitude=3.1319&longitude=101.6841&accuracy=15.7&timestamp=2025-06-09T14:32:45.789Z
http://localhost:3000/api/write_db?user_id=Test_Device&latitude=90&longitude=180&accuracy=10&timestamp=2025-06-09T14:33:18.012Z
http://localhost:3000/api/write_db?user_id=GPS_Device&latitude=0&longitude=0&accuracy=0&timestamp=2025-06-09T14:34:52.345Z&heading=0

Invalid
http://localhost:3000/api/write_db?user_id=Test&latitude=3.1390
http://localhost:3000/api/write_db?user_id=Test&latitude=91&longitude=101.6869&accuracy=5&timestamp=2025-06-09T14:30:15.123Z
http://localhost:3000/api/write_db?user_id=Test&latitude=3.1390&longitude=181&accuracy=5&timestamp=2025-06-09T14:30:15.123Z
http://localhost:3000/api/write_db?user_id=Test&latitude=3.1390&longitude=101.6869&accuracy=-5&timestamp=2025-06-09T14:30:15.123Z
http://localhost:3000/api/write_db?user_id=Test&latitude=3.1390&longitude=101.6869&accuracy=5&timestamp=invalid-date 

*/
