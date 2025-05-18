"use client";
import axios from 'axios';
import React, { useRef } from 'react'
import { io, Socket } from 'socket.io-client';

function Scan() {
    const [percent, setPercent] = React.useState(0)
    const [url, setUrl] = React.useState("");
    const [result, setResult] = React.useState({});
    const socketRef = useRef<Socket | null>(null);

    React.useEffect(() => {
        socketRef.current = io(process.env.NEXT_PUBLIC_API_URL as string);
        socketRef.current.on('connect', () => {
            console.log("Connected to server")
        });
        socketRef.current.on('scan-progress', (data: any) => {
            console.log(data.progress)
            setPercent(Math.ceil(data['data'].progress))
        });
    }, []);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) {
            alert("Please enter a URL to scan")
            return
        }
        axios.post(process.env.NEXT_PUBLIC_API_URL + '/scan', { url: url })
            .then((res) => {
                if (res.status === 200) {

                    console.log(res.data)
                    setResult(res.data)
                    alert("Scan completed")
                } else {
                    alert("Error starting scan")
                }
            }
            ).catch((err) => {
                console.log(err)
                alert("Error starting scan")
            }
            )
    }

    return (
        <div className='flex flex-col items-center justify-center w-[75%] '>
            <div className='flex items-center justify-center w-full mb-10'>
                <h1 className='text-3xl font-bold text-gray-300'>Scan</h1>
            </div>
            <div
                className="flex items-center w-full border-gray-300 p-2 gap-2"
            >
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    placeholder="Type your url to scan..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:gray-400"
                />
                <button
                    onClick={handleScan}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 cursor-pointer transition"
                >
                    Send
                </button>

            </div>
            <p>{"Progress: " + percent + "%"}</p>
            {Object.entries(result).map(([statusCode, paths]) => (
                <details key={statusCode} className="w-full mt-4 border border-gray-600 rounded p-2">
                    <summary className="cursor-pointer text-lg font-semibold text-gray-200">
                        Status {statusCode} {(Array.isArray(paths) ? paths.length : 0)}
                    </summary>
                    <ul className="pl-6 mt-2 text-gray-400 list-disc">
                        {(paths as string[]).map((path, index) => (
                            <li key={index}>{path}</li>
                        ))}
                    </ul>
                </details>
            ))}
        </div>

    )
}

export default Scan