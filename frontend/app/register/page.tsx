"use client";
import axios from 'axios';
import React from 'react'

function Register() {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", {
            username: username,
            password: password,
        }, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    alert("User registered successfully")
                    window.sessionStorage.setItem("username", username)
                    window.location.href = "/dashboard"
                } else if (res.status === 201) {
                    alert("User already exists")
                } else {
                    alert("Error registering user")
                }
            })
            .catch((err) => {
                console.log(err)
                alert("Error registering user")
            })

    }

    return (
        <div>
            <div className="flex flex-col items-center  min-h-screen py-2 justify-center">
                <h1>CyBurn</h1>
                <div>
                    <h2>Register</h2>
                    <form className="flex flex-col">
                        <input type="text" placeholder="Username" className="border-2 border-gray-300 rounded-md p-2 mb-4" value={username} onChange={e => { setUsername(e.target.value) }} />
                        <input type="password" placeholder="Password" className="border-2 border-gray-300 rounded-md p-2 mb-4" value={password} onChange={e => setPassword(e.target.value)} />
                        <input type="password"
                            placeholder="Confirm Password" className="border-2 border-gray-300 rounded-md p-2 mb-4" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        <button onClick={handleRegister} type="submit" className="bg-gray-300 text-black rounded-md p-2">Register</button>
                        <p className="mt-4">Already have an account? <a href="/login" className="text-gray-300">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register