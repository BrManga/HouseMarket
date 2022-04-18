import { getAuth, updateProfile } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from "../firebase.config"
import {toast} from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from "../components/ListingItem"
function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [changeDetails, setChangeDetails] = useState(false)
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const { name, email } = formData
    useEffect(() => {
      const fetchUserListing = async()=>{
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
        const querySnap= await getDocs(q)
        let listings=[]
        querySnap.forEach((doc)=>{
            return listings.push({
                id:doc.id,
                data:doc.data()
            })
        })
        setListings(listings)
        setLoading(false)
      }
      fetchUserListing()

    }, [auth.currentUser.uid])
    
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
    const onDelete =async(listingId)=>{
        if(window.confirm('Are sure to delete the item?')){
            await deleteDoc(doc(db, 'listings', listingId))
            const updatedListings= listings.filter((listing)=>listing.id!==listingId)
            setListings(updatedListings)
            toast.success('Item successfully deleted')
        }
    }
    const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
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
                        <input type="text" id='email' className='profileEmail'  disabled value={email}/>
                    </form>
                </div>
                <Link to='/create-listing' className='createListing'>
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your room</p>
                    <img src={arrowRight} alt="arrow-right" />
                </Link>
                {!loading&&listings?.length>0&&(
                    <>
                    <p className="listingText">
                        Your Listings</p>
                    <ul className="listingsList">
                        {listings.map((listing)=>
                            (<ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)} onEdit={() => onEdit(listing.id)}/>)
                    )}
                    </ul>
                        </>
                )}
            </main>
        </div>
    )
}

export default Profile
