import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser } = useAuth()
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
            // await signup(emailRef.current.value, passwordRef.current.value)
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
                Update Profile
            </h2>
        
            {error}
        </section>
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email
                    </label>
                    <input type="email" ref={emailRef} required defaultValue={currentUser.email} />    
                
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type="password" ref={passwordRef} placeholder='Leave blank to keep the same'/>    
                </div>
                <div>
                    <label>
                        Confirm Password
                    </label>
                    <input type="password" ref={passwordConfirmRef}  placeholder='Leave blank to keep the same'/>    
                </div>
                <button disabled={loading} type="submit">Update</button>
            </form>
        </section>
        <section>
            <p><Link to="/dashboard">Cancel</Link> </p>
        </section>
    </main>
  )
}

