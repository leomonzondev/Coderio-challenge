import Head from 'next/head'
import type { NextPage } from 'next'


import { useEffect, useState } from 'react'
import { Card } from '../src/components/Card'
import { Suggestions } from '../src/components/Suggestions'
import { entriesApi } from '../apis'
import { Entry } from '../src/interfaces/index';

type Props = {
  data: string[];
}

const Home :NextPage <Props>= (props) => {

  const {data} = props

  const worldZones = data

  const [calls, setCalls] = useState<Entry[]>([])
  
  const [inputValue, setInputValue] = useState<string>('')

  const refreshEntries = async() => {
    const {data} = await entriesApi.get<Entry[]>('/timezones')
    setCalls(data)
  }


  useEffect(() => {
    refreshEntries()
  },[])

  const suggestionsProps = {
    worldZones,
    inputValue,
    setCalls,
    refreshEntries,
    calls,
    setInputValue
  }

  const handleInputDelete = () => {
    setInputValue('')
  }

  const handlerEntriesTrue = calls.length >= 10


  return (
    <div className=''>
      <Head>
        <title>Coderio challenge</title>
        <meta name="description" content="Leonardo Monzón" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className='flex flex-col justify-center items-center w-full h-48 mt-20'>
        <label className='relative'>
          <input className={`w-80 md:w-96 p-2 rounded-sm ${handlerEntriesTrue && "border-2 border-red-600 active:border-red-600"}  focus:outline-none `} type="text" placeholder='Write the zone you want to add'typeof='string' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          {
            inputValue &&
            <button onClick={handleInputDelete} className='absolute right-3 top-2 text-black/60'>x</button>
          }
        </label>
        {
          handlerEntriesTrue && <p className='text-red-600 text-center'>You must delete one entry to add more. <br/> 
          Max 10 entries.</p>
        }
        
        {
          <Suggestions suggestionsProps={suggestionsProps} />
        }
    
      </div>

      <div className='flex gap-2 justify-center md:justify-start flex-wrap md:px-32 pb-10'>
        {
          calls.map(call => <Card key={Math.random()} country={call} refreshEntries={refreshEntries}/>)
        }
      </div>

    </div>
  )
}


export async function getServerSideProps() {

  const res = await fetch('https://worldtimeapi.org/api/timezones')
  const data = await res.json()

  return {
    props: { data }
  }
}

export default Home