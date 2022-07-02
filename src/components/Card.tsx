import React, { useEffect } from 'react'
import { entriesApi } from '../../apis'
import { Call, Entry } from '../interfaces'


import { motion, AnimatePresence } from "framer-motion";
import moment from 'moment';

type Props = {
  country: Call;
  refreshEntries: Function;
}

export const Card = ({ country, refreshEntries }:Props) => {

  const month = moment(country.datetime).format("D/M/YYYY")
  const hs = country.datetime.toString().slice(0, -1).split('T')[1].slice(0, -15)
  


  const handleDelete = async() => {

     await entriesApi.delete<Entry[]>(`/timezones/${ country._id}`)
     
     await refreshEntries()
  }

  return (
    <motion.div
        layout
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0.2 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        className='bg-gray-700 text-white p-5 rounded-sm w-72 md:w-80'>
      <div className='w-full flex justify-end'>
        <button onClick={handleDelete}>X</button>
      </div>

      <div className='flex flex-col items-center'>
        <p>{country.timezone}</p>
        <p>{month}</p>
        <p>{hs}</p>
      </div>
        
    </motion.div>
  )
}
