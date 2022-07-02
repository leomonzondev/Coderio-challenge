import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'



type Data = {
    msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if ( process.env.NODE_ENV === 'production'){
        return res.status(401).json({msg: 'No tiene acceso a este endpoint en produccion'})
    }

    await db.connect()

    await Entry.deleteMany()
    await Entry.insertMany( seedData.entries )


    await db.disconnect()



    res.status(200).json({ msg: 'Process finished correctly' })
}