import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import {UserAuth} from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Profile = () => {
    const {user} = UserAuth()
    const [inputAddress, setInputAddress] = useState('')
    const [inputPhone, setInputPhone] = useState('')
    const [inputAvatar, setInputAvatar] = useState('')
    const [name,setName] = useState('')
    const [gamePlayerId,setGamePlayerId] = useState([])

    const router = useRouter()

    // fetch user data based on user uid

    const fetchUser = () => {
        const docRef = doc(db, 'users',user.uid)
        let userProfile = []
        onSnapshot(docRef, (doc) => {
            // console.log(doc.data(), doc.id);
            userProfile.push(doc.data(), doc.id)
            setInputAddress(userProfile[0].address)
            setInputPhone(userProfile[0].phone)
            setInputAvatar(userProfile[0].avatar)
            setName(userProfile[0].name)
        })
    }

    useEffect(() => {
      fetchUser()
    }, [])



    const getGamePlayerId = async () => {
        try {
            const q = query(collection(db, "gamestats"), where("playerId", "==", user.uid))
            let gamePlayer = []
            const data = await getDocs(q)
            gamePlayer.push(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setGamePlayerId(gamePlayer[0][0].id)
            console.log(gamePlayerId);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getGamePlayerId()
    }, [])
    

    // update user data

    const handleSubmit = (e)=>{
        e.preventDefault()
        const userCollectionRef = doc(db, 'users', user.uid)
        updateDoc(userCollectionRef, {address: inputAddress, phone: inputPhone, avatar: inputAvatar })
        const pointCollectionRef = doc(db, 'gamepoint', user.uid)
        updateDoc(pointCollectionRef, {name: name, avatar: inputAvatar })
        // const gameCollectionRef = doc(db, 'gamestats', gamePlayerId)
        // updateDoc(gameCollectionRef, {avatar: inputAvatar })
        toast.success('your profile successfully updated')
        router.push('/home')
    }
    

    return (
        <>
            <section className='dark-mode'>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-6 offset-3">
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Form Update Profile</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Address</label>
                                            <input type="text" className="form-control" value={inputAddress} onChange={(e)=> setInputAddress(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Phone</label>
                                            <input type="text" className="form-control"  value={inputPhone} onChange={(e)=> setInputPhone(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Avatar</label>
                                            <input type="text" className="form-control"  value={inputAvatar} onChange={(e)=> setInputAvatar(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-danger btn-block">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile