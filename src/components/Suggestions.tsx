import React, { SetStateAction, useEffect, useState } from 'react'
import { entriesApi } from '../../apis'
import { Entry, Call } from '../interfaces/index';


type suggestionsProps = {
    suggestionsProps: {
        worldZones:string[];
        inputValue:string;
        refreshEntries: Function;
        calls:Call[];
            setInputValue:React.Dispatch<SetStateAction<string>>;
    },
}

export const Suggestions = ({ suggestionsProps }: suggestionsProps) => {

    const { 
        worldZones,
        inputValue,
        refreshEntries,
        calls,
        setInputValue } = suggestionsProps

    const [showSuggestions, setShowSuggestions] = useState<string[]>([])
    
    
    //Manager of zones to show in change of inputValue
    useEffect(() => {
        const filtered = worldZones.filter(zona => zona.toLowerCase().includes(inputValue.toLowerCase()))
        setShowSuggestions(filtered)
    }, [inputValue])
    

    //Post zone selected
    const handleSelected = async (suggested: string) => {
        const zone = suggested
        if(calls.length < 10){
            await entriesApi.put<Entry>('/timezones', { zone })
            setShowSuggestions([])
            setInputValue('')
            refreshEntries()
        }
    }


  return (<div className='relative  mr-80 md:mr-96'>

    <div className=' bg-slate-600 absolute z-10'>
   
        <div className='w-80 md:w-96 text-center max-h-96 overflow-y-auto'>
            {
                inputValue === '' 
                ? ''
                : showSuggestions?.map(sugges => <p key={Math.random()} onClick={() => handleSelected(sugges)} className='hover:bg-red-500 text-white cursor-pointer py-2 px-2 transition-all duration-200'>{sugges}</p>)
            }
        </div>

    </div>
  </div>
  )
}
