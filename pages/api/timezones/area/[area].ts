import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = {
    timezones?: string[];
    msg?: string; 
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getZone( req,res )

        default:
            return res.status(401).json({ msg: 'Method does not exist' })
    }
}


const getZone = async( req:NextApiRequest, res:NextApiResponse ) => {

    const { area } = req.query

    let called = {}
    await fetch(`http://worldtimeapi.org/api/timezone/${area}`)
    .then(res => res.json())
    .then(data => called= data)

    try {
        return res.status(200).json({timezones: called})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Something happen with the DB connection'})
    }
}