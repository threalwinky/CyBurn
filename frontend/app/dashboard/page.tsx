"use client";
import axios from 'axios';
import React, { useEffect } from 'react'
import Decoder from '../decoder/page';
import Profile from '../profile/page';
import Chat from '../chat/page';
import Scan from '../scan/page';
import RequestCatcher from '../request/page';
import Lab from '../lab/page';
import DashboardPage from '../dboard/page';
import Topics from '../topics/page';

function Dashboard() {
    const [selectedTab, setSelectedTab] = React.useState("dashboard");

    const checkCredentials = async () => {

        axios.post(process.env.NEXT_PUBLIC_API_URL + "/check-credentials", null, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    console.log("User is logged in")
                } else {
                    console.log("User is not logged in")
                    window.location.href = "/login"
                }
            }
            )
            .catch((err) => {
                console.log(err)
                alert("Error checking credentials")
                window.location.href = "/login"
            }
            )
    }

    useEffect(() => {
        checkCredentials()
    }, [])

    const handleLogout = async () => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + "/logout", null, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    alert("User logged out successfully")
                    window.location.href = "/login"
                } else {
                    alert("Error logging out user")
                }
            }
            )
            .catch((err) => {
                console.log(err)
                alert("Error logging out user")
            }
            )
    }

    return (
        <div>

            <div className="min-h-screen grid grid-cols-12 bg-black text-white">
                {/* Sidebar / Navigation */}
                <aside className="col-span-2 border-r border-gray-700 p-4 flex flex-col items-center">
                    {/* <div className="text-xl font-bold mb-4">🌀</div> */}
                    <nav className="space-y-4 p-5 w-full h-full justify-between flex flex-col">
                        <div className='space-y-4 flex flex-col justtify-between'>
                            {/* <a href="#" className="block hover:text-blue-400">Dashboard</a>
                            <a href="#" className="block hover:text-blue-400">Scan</a>
                            <a href="#" className="block hover:text-blue-400">Encoder</a>
                            <a href="#" className="block hover:text-blue-400">Profile</a>
                            <a href="#" className="block hover:text-blue-400">Webhook</a>
                            <a href="#" className="block hover:text-blue-400">Chat</a>
                            <a href="#" className="block hover:text-blue-400">Labs</a> */}
                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("dashboard")}>Dashboard</a>
                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("topics")}>Topics</a>

                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("labs")}>Labs</a>
                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("scan")}>Scan</a>
                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("encoder")}>Encoder</a>

                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("webhook")}>Webhook</a>
                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("chat")}>Chat</a>
                            <a href="#" className="block hover:text-blue-400" onClick={() => setSelectedTab("profile")}>Profile</a>
                        </div>


                        <a href="#" className="block hover:text-blue-400" onClick={handleLogout}>Log Out</a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="col-span-10 flex flex-col items-center justify-center ">
                    {/* <Decoder /> */}
                    {/* <Profile /> */}
                    {/* <Chat /> */}
                    {/* <Scan /> */}
                    {/* <RequestCatcher /> */}
                    {/* <Lab /> */}
                    {/* <DashboardPage /> */}

                    {selectedTab === "dashboard" && <DashboardPage />}
                    {selectedTab === "topics" && <Topics />}
                    {selectedTab === "scan" && <Scan />}
                    {selectedTab === "encoder" && <Decoder />}
                    {selectedTab === "profile" && <Profile />}
                    {selectedTab === "webhook" && <RequestCatcher />}
                    {selectedTab === "chat" && <Chat />}
                    {selectedTab === "labs" && <Lab />}

                </main>
            </div>
        </div>
    )
}

export default Dashboard