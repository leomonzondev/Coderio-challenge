import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry } from '../../../models'


type Data = {
    msg: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query


    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ msg: 'Id no es valido'})
    }

    switch ( req.method ) {
        case 'DELETE':
            
            return updateEntry( req, res )
    
        default:
            return res.status(400).json({ msg: 'Metodo no existe'})
    }

}


const updateEntry = async( req:NextApiRequest, res:NextApiResponse) => {

    const { id } = req.query

   
    await db.connect()

    const entryToUpdate = await Entry.findById( id )

    await Entry.findByIdAndDelete(entryToUpdate)

    if ( !entryToUpdate ) {
        await db.disconnect()
        return res.status(400).json({ msg: 'No hay entrada con ese id',id})
    }
    // await db.disconnect()

    res.status(200).json({ msg:' Entrada eliminada'})


}