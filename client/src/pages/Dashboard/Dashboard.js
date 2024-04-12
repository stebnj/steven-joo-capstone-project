import React, { useState, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, doc, getDocs } from 'firebase/firestore'


export default function Dashboard() {
const [error, setError] = useState('')
const { currentUser, logout } = useAuth()
const [savedListings, setSavedListings] = useState([]);
const navigate = useNavigate()

async function handleLogout() {
    setError('')

    try{
        await logout()
    } catch {
        setError('Failed to log out')
    }
}

  return (
    <main>
        <section>
            <section>
                <h2>Your Profile</h2>
            </section>
            <section>
                <p>
                    <strong>Email: </strong>
                    {currentUser.email} 
                </p>
                <Link to="/update-profile">
                    <button>
                        Update Profile    
                    </button>
                </Link>
            </section>
            <section>
                <button onClick={handleLogout}>
                    Log Out 
                </button>
            </section>
        </section>
    </main>
  )
}
