import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== 
            passwordConfirmRef.current.value) {
                return setError('Passwords do not match')
            }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            
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
                <div>
                    <label>
                        Confirm Password
                    </label>
                    <input type="password" ref={passwordConfirmRef}  required/>    
                </div>
                <button disabled={loading} type="submit">Sign Up</button>
            </form>
        </section>
        <section>
            <p>Already have an account? <Link to="/login">Log in</Link> </p>
        </section>
    </main>
  )
}
