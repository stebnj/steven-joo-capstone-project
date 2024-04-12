import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            
        } catch (error) {
            setError('Failed to create an account')
        }
       setLoading(false)
    }

    

  return (
    <main>
        <section>
            <h2>
                SIGN UP
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
                <button disabled={loading} type="submit">Sign Up</button>
            </form>
        </section>
        <section>
            <p>Already have an account? Log in</p>
        </section>
    </main>
  )
}
