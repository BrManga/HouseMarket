import { getAuth, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase.config"
import {toast} from 'react-toastify'
function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const { name, email } = formData
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    const onSubmit = async (e) => {
        try {
            // Update user name
            if(auth.currentUser.displayName!==name){
                await updateProfile(auth.currentUser, {displayName:name})
            }
            // Update firestore
            const userRef=doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {name})
            
        } catch (error) {
            console.log(error)
            toast.error('Could not update')
        }
    }
    const onChange=(e)=>{
        setFormData((prevData)=>({...prevData, [e.target.id]:e.target.value}))
        
    }
    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button className="logOut" type='button' onClick={onLogout}>Logout</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsTex">
                        <span className="changePersonalDetails" onClick={() => {
                            changeDetails && onSubmit()
                            setChangeDetails((prevstate) => !prevstate)
                        }}>
                            {changeDetails ? 'done' : 'change'}
                        </span>
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'}  disabled={!changeDetails} value={name} onChange={onChange}/>
                        <input type="text" id='email' className='profileEmail'  disabled/>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Profile
