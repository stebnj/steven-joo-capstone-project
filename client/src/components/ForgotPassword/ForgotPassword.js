import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setMessage('')
            setError('')
            setLoading(true)

            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch (error) {
            setError('Failed reset password')
        }
       setLoading(false)
    }

    

  return (
    <main>
        <section>
            <h2>
                Password Reset
            </h2>
            {error}
        <section>
            {message}    
        </section>
            
        </section>
        <section>
            <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Email
                        </label>
                        <input type="email" ref={emailRef} required />    
                    </div>
                    <button disabled={loading} type="submit">Reset Password</button>
                </form>
            </section>        
            <section>
                <Link to="/login">
                    Login
                </Link>
            </section>
        </section>
        <section>
            <p>Don't have an account?<Link to="/signup">Sign up</Link> </p>
        </section>

    </main>
  )
}
