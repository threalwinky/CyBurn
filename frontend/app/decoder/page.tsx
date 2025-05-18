"use client";
import axios from 'axios';
import React from 'react'
import sha256 from 'crypto-js/sha256';
import md5 from 'crypto-js/md5';
// import sha512 from 'crypto-js/sha512';
import sha1 from 'crypto-js/sha1';
import base32 from 'hi-base32'

function Decoder() {

  const [ascii, setAscii] = React.useState("");
  const [base64value, setBase64] = React.useState("");
  const [base32value, setBase32] = React.useState("");
  const [md5value, setMd5] = React.useState("");
  const [sha256value, setSha256] = React.useState("");
  const [sha512value, setSha512] = React.useState("");
  const [sha1value, setSha1] = React.useState("");

  const handleChange = (data: string) => {
    console.log(data)
    let answer: Record<string, string> = {};
    answer['base64'] = btoa(data);
    // answer['base32'] = base32.stringify(data);
    answer['sha256'] = sha256(data).toString();
    answer['md5'] = md5(data).toString();
    answer['sha1'] = sha1(data).toString();
    answer['base32'] = base32.encode(data);
    console.log(answer)
    // answer['sha512'] = sha512(data);
    return answer
  }

  const handleAsciiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAscii(e.target.value)
    const handledChange = handleChange(e.target.value)
    setBase64(handledChange['base64'])
    // setBase32(handledChange['base32'])
    setSha256(handledChange['sha256'])
    setMd5(handledChange['md5'])
    setSha1(handledChange['sha1'])
    setBase32(handledChange['base32'])
    // setSha512(handledChange['sha512'])
  }

  return (
    <div className='flex flex-col items-center justify-center w-[75%] '>
      <div className='flex items-center justify-center w-full mb-16'>
        <h1 className='text-3xl font-bold text-gray-300'>Encoder/Decoder</h1>
      </div>

      <div className='flex flex-col items-center w-full'>
        <div className='flex items-start w-full border-3 border-gray-300 roundded-md p-0 mb-2'>
          <div>
            <p className='w-full p-1 px-3 bg-gray-300 text-black'>Ascii</p>
          </div>
          <input
            value={ascii}
            onChange={handleAsciiChange}
            type="text" className='w-full p-1 px-3' placeholder='Ascii' />
        </div>

        <div className='flex items-start w-full border-3 border-gray-300 roundded-md p-0 mb-2'>
          <div>
            <p className='w-full p-1 px-3 bg-gray-300 text-black'>Base64</p>
          </div>
          <input
            value={base64value}
            onChange={(e) => setBase64(e.target.value)}
            type="text" className='w-full p-1 px-3' placeholder='Base64' />
        </div>

        <div className='flex items-start w-full border-3 border-gray-300 roundded-md p-0 mb-2'>
          <div>
            <p className='w-full p-1 px-3 bg-gray-300 text-black'>Base32</p>
          </div>
          <input
            value={base32value}
            onChange={(e) => setBase32(e.target.value)}
            type="text" className='w-full p-1 px-3' placeholder='Base32' />
        </div>

        <div className='flex items-start w-full border-3 border-gray-300 roundded-md p-0 mb-2'>
          <div>
            <p className='w-full p-1 px-3 bg-gray-300 text-black'>MD5</p>
          </div>
          <input
            value={md5value}
            onChange={(e) => setMd5(e.target.value)}
            type="text" className='w-full p-1 px-3' placeholder='MD5' />

        </div>

        <div className='flex items-start w-full border-3 border-gray-300 roundded-md p-0 mb-2'>
          <div>
            <p className='w-full p-1 px-3 bg-gray-300 text-black'>SHA256</p>
          </div>
          <input
            value={sha256value}
            onChange={(e) => setSha256(e.target.value)}
            type="text" className='w-full p-1 px-3' placeholder='SHA256' />
        </div>

        <div className='flex items-start w-full border-3 border-gray-300 roundded-md p-0 mb-2'>
          <div>
            <p className='w-full p-1 px-3 bg-gray-300 text-black'>SHA1</p>
          </div>
          <input
            value={sha1value}
            onChange={(e) => setSha1(e.target.value)}
            type="text" className='w-full p-1 px-3' placeholder='SHA1' />
        </div>

      </div>

    </div>
  )
}

export default Decoder