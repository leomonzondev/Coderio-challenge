import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'


type Data = 
    | { msg: string }
    | IEntry[]
    | IEntry
|{
    

}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getEntries( res )
        
        case 'PUT':
            return putEntry( req, res )
    
        default:
            return res.status(400).json({ msg: 'Endpoint doesnt exist' })
    }
}

const getEntries = async( res: NextApiResponse<Data>) => {
    await db.connect()
        const entries = await Entry.find().sort({ createdAt: 'ascending'})
    await db.disconnect()

    res.status(201).json(entries)
}

const putEntry = async( req: NextApiRequest, res:NextApiResponse<Data>) => {

    const { zone = '' } = req.body

    let called = {}
    
    await fetch(`http://worldtimeapi.org/api/timezone/${zone}`)
    .then(res => res.json())
    .then(data => called= data)
    
    const { datetime, timezone } = <IEntry>called

    const newEntry = new Entry({
        datetime,
        timezone
    })

    try{
        await db.connect()
            
            await newEntry.save()

        await db.disconnect()
        return res.status(201).json(newEntry)

    } catch (err) {

        await db.disconnect()
        console.log(err)

        return res.status(500).json({ msg:'Something goes wrong, check the server console'})
    }
}