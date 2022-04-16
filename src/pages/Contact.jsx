import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'

function Contact() {
  const params = useParams()
  const [searchParams, setSearchParams]=useSearchParams()
  const [message, setMessage]= useState('')
  const [landlord, setLandlord]= useState(null)
  console.log(searchParams)
  useEffect(() => {
    const getLandlord= async ()=>{
      const docRef=doc(db, 'users', params.landlordId)
      const docSnap= await getDoc(docRef)
      if(docSnap.exists()){
        setLandlord(docSnap.data())
      }
      else{
        toast.error('Could not get landlord data')
      }
    }
    getLandlord()
  }, [params.landlordId])
  const onChange=(e)=>{
    setMessage(e.target.value)
  }
  return (
 <div className='pageContainer'>
   <header>
   <p className="pageHeader">
     Contact Landlord
   </p>
   </header>
   {landlord!==null&&(
<main>
  <div className="contactLandlord">
    <p className="landlordName">
      Contact {landlord?.name}
    </p>
  </div>
    <form  className="messageForm">
      <div className="messageDiv">
        <label htmlFor="message" className='messageLabel'>Message</label>
        <textarea name="message" id="message" className='textarea' value={message} onChange={onChange}></textarea>
      </div>
      <a href={`mailto:${landlord.email}?Subject=${searchParams.get('ListingName')}&body=${message}`}>
        <button type='button' className="primaryButton">Send Message</button>
      </a>
    </form>
</main>

   )}
   </div>
  )
}

export default Contact