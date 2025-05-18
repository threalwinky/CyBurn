"use client";
import axios from 'axios'
import React from 'react'

function Login() {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    axios.post(process.env.NEXT_PUBLIC_API_URL + "/login", {
      username: username,
      password: password,
    }, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          alert("User logged in successfully")
          window.sessionStorage.setItem("username", username)
          window.location.href = "/dashboard"
        } else if (res.status === 201) {
          alert("Invalid username or password")
        } else {
          alert("Error logging in user")
        }
      })
      .catch((err) => {
        console.log(err)
        alert("Error logging in user")
      })
  }

  return (
    <div>
      <div className="flex flex-col items-center  min-h-screen py-2 justify-center">
        <h1>CyBurn</h1>
        <div>
          <h2>Login</h2>
          <form className="flex flex-col">
            <input type="text" placeholder="Username" className="border-2 border-gray-300 rounded-md p-2 mb-4" value={username}
              onChange={e => { setUsername(e.target.value) }} />
            <input type="password" placeholder="Password" className="border-2 border-gray-300 rounded-md p-2 mb-4" value={password}
              onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin} type="submit" className="bg-gray-300 text-black rounded-md p-2">Login</button>
            <p className="mt-4">Don't have an account? <a href="/register" className="text-gray-300">Register</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login