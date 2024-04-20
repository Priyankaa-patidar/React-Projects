import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
   const [length, setLength] = useState(8)
   const [numAllowed, setNumAllowed] = useState(false)
   const [charAllowed, setCharAllowed] = useState(false)
   const [password, setPassword] = useState()

   const passGenerator = useCallback(() => {
           let pass = ""
           let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

           if(numAllowed) str += "0123456789"
           if(charAllowed) str += "!@#$%&^*_-+=[]{}~`" 
           
           for (let i = 1; i <=length; i++) {
            let char = Math.floor(Math.random()*str.length+1)
           pass += str.charAt(char)
            
           }
           setPassword(pass)
   }, [length, charAllowed, numAllowed, setPassword])

   const passwordRef = useRef(null)

   const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
   }, [password])

   useEffect(() => {
    passGenerator()
   }, [length,numAllowed, charAllowed, passGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-4 my-8 text-orange-500 bg-gray-600'>

      <h1 className='text-white text-center mb-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          placeholder='Password'
          className='w-full outline-none py-1 px-3'
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button 
         onClick={copyPasswordToClipboard}
        className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label htmlFor="">Length({length})</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numAllowed}
       id='numberInput'
        onChange={() => {
          setNumAllowed((prev) => !prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
       id='charecterInput'
       onChange={() => {
        setCharAllowed((prev) => !prev);
      }}
        />
        <label htmlFor="charecterInput">Charecter</label>
        </div>
      </div>
    </div>
  )
}

export default App
