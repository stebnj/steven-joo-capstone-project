import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
        } catch (error) {
            setError('Failed to sign in')
        }
       setLoading(false)
    }

    

  return (
    <main>
        <section>
            <h2>
                Log In
            </h2>
            {error}
        </section>
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email
                    </label>
                    <input type="email" ref={emailRef} required />    
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type="password" ref={passwordRef} required/>    
                </div>
                <button disabled={loading} type="submit">Log In</button>
            </form>
        </section>
        <section>
            <p>Don't have an account?<Link to="/signup">Sign up</Link> </p>
        </section>
        <section>
            <Link to="/forgot-password">
                Forgot Password?
            </Link>
        </section>
    </main>
  )
}
