import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, queryEqual, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../config/firebase'
import { UserAuth } from '../../context/AuthContext'

const RPS = () => {
    const { user } = UserAuth()

    const router = useRouter()

    const [userChoice, setUserChoice] = useState(null)
    const [computerChoice, setComputerChoice] = useState(null)
    const [result, setResult] = useState('')
    const [score, setScore] = useState(0)
    const choices = ['rock', 'paper', 'scissors']
    const [counter, setCounter] = useState(0)
    const [userWin, setUserWin] = useState(0)
    const [userLoss, setUserLoss] = useState(0)
    const [userDraw, setUserDraw] = useState(0)
    const [currentPointTotal, setCurrentPointTotal] = useState(0)
    const [totalScores, setTotalScores] = useState(0)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    

    const handleClick = (value) => {
        setUserChoice(value)
        generateComputerChoice()
        setCounter(counter + 1)
    }

    // generating random computer choice 

    const generateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)]
        setComputerChoice(randomChoice)
    }

    // game result 

    const checkResult = () => {
        switch (userChoice + computerChoice) {
            case 'scissorspaper':
            case 'rockscissors':
            case 'paperrock':
                setResult('YOU WIN!')
                setUserWin(userWin + 1)
                setScore(score + 5)
                break
            case 'paperscissors':
            case 'scissorsrock':
            case 'rockpaper':
                setResult('YOU LOSE!')
                setUserLoss(userLoss + 1)
                setScore(score + 0)
                break
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
                setResult('ITS A DRAW!')
                setScore(score + 1)
                setUserDraw(userDraw + 1)
                break
        }
    }

    useEffect(() => {
        checkResult()
    }, [userChoice, computerChoice])

    // get current user data for name and avatar

    const fetchUser = ()=>{
        const userDocRef = doc(db,'users',user.uid)
        getDoc(userDocRef)
        .then((doc)=>{
            let userProfile = []
            userProfile.push(doc.data(),doc.id)
            setName(userProfile[0].name);
            setAvatar(userProfile[0].avatar);
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (user) {
            fetchUser()
        }
    }, [user])


    //get total point from current user

    const fetchPoint = () => {
        const docRef = doc(db, 'gamepoint', user?.uid)
        let totalPoint = []
         onSnapshot(docRef, (doc) => {
            totalPoint.push(doc.data(), doc.id)
            setCurrentPointTotal(totalPoint[0].totalpoint)
            // console.log(currentPointTotal);
        })
    }

    useEffect(() => {
        if (user) {
            fetchPoint()
        }
    }, [user])

    // get total score and accumulate to current play


    const getTotalScore = async () => {
        try {
            const q = query(collection(db, "gamestats"), where("playerId", "==", user?.uid || ''))
            getDocs(q)
                .then((snapshot) => {
                    let points = []
                    snapshot.docs.forEach((doc) => {
                        points.push({ ...doc.data()})
                    })
                    const total = points.reduce((acc, currItem) => {
                        return acc += currItem.point
                    }, 0)
                    setTotalScores(total)
                    // console.log(totalScores);
                })

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTotalScore()
    }, [totalScores])



    // saving game data and update total points

    const gameStatRef = collection(db, 'gamestats')

    const handleSaveClick = async () => {
        const playerCollectionRef = doc(db, 'gamepoint', user?.uid)
        await addDoc(gameStatRef, {
            playerId:user.uid,
            point: score,
            playCount: counter,
            userWin: userWin,
            userLoss: userLoss,
            userDraw: userDraw,
            name,
            avatar,
            createdAt: serverTimestamp()
        })
        await updateDoc(playerCollectionRef, { totalpoint: currentPointTotal + score ,name:name,avatar:avatar,updatedAt:serverTimestamp()})
        toast.success("games successfully saved")
        router.push('/home')
    }

    // function Account(props) {
    //     console.warn("account", props)
    // }
    return (
        <>
            <section className='dark-mode'>
                <div className="container">
                    <h1 className='text-center text-uppercase text-light mt-3'>Rock Paper Scissors</h1>
                    <div className="callout callout-danger my-1">
                        <p className='text-light'>All players at least play the game five times ,for the winner will get 5 point, if loses points will get 0 point,and if get draw condition you will 1 point. For badges players who score 0 points  will get a brown badge, 0-25 points will get a silver badge and above 25 points players will get a gold badge</p>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-sm-6 col-12 mt-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-success"><i className="fas fa-thumbs-up" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Win</span>
                                    <span className="info-box-number">{userWin}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6 col-12 mt-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-info"><i className="fas fa-handshake" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Draw</span>
                                    <span className="info-box-number">{userDraw}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6 col-12 mt-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-danger"><i className="fas fa-thumbs-down" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Loss</span>
                                    <span className="info-box-number">{userLoss}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6 col-12 mt-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-warning"><i className="fas fa-chalkboard-teacher"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Score</span>
                                    <span className="info-box-number">{score}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-12 mt-3">
                            <div className="info-box">
                                <span className="img-rounded"><img src={avatar} style={{ width: '60px' }} /></span>
                                <div className="info-box-content">
                                    <span className="info-box-number">Username :&nbsp; {name}</span>
                                    <span className="info-box-number">Current Score :&nbsp; {currentPointTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-4">
                            <h3 className='text-uppercase text-center'>Player <span className='text-danger'>choice</span> ({counter})</h3>
                            <div className="mt-4 text-center">
                                {
                                    userChoice === 'rock' && (
                                        <img src='/rock.svg' alt="" style={{ width: '150px' }} />
                                    )
                                }
                                {
                                    userChoice === 'paper' && (
                                        <img src='/paper.svg' alt="" style={{ width: '150px' }} />
                                    )
                                }
                                {
                                    userChoice === 'scissors' && (
                                        <img src='/scissors.svg' alt="" style={{ width: '150px' }} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-center">

                            {
                                result === 'YOU WIN!' && (
                                    <i className="fas fa-thumbs-up fa-6x" style={{ color: '#00C851' }}></i>
                                )
                            }
                            {
                                result === 'ITS A DRAW!' && (
                                    <i className="fas fa-handshake fa-6x" style={{ color: '#33b5e5' }}></i>
                                )
                            }
                            {
                                result === 'YOU LOSE!' && (
                                    <i className="fas fa-thumbs-down fa-6x" style={{ color: '#ff4444' }}></i>
                                )
                            }
                        </div>
                        <div className="col-md-4">
                            <h3 className='text-uppercase text-center'>computer <span className='text-danger'>choice</span></h3>
                            <div className="mt-4 text-center">
                                {
                                    computerChoice === 'rock' && (
                                        <img src='/rock.svg' alt="" style={{ width: '150px' }} />
                                    )
                                }
                                {
                                    computerChoice === 'paper' && (
                                        <img src='/paper.svg' alt="" style={{ width: '150px' }} />
                                    )
                                }
                                {
                                    computerChoice === 'scissors' && (
                                        <img src='/scissors.svg' alt="" style={{ width: '150px' }} />
                                    )
                                }
                            </div>
                        </div>
                        {choices.map((choice, index) => <button key={index} className='btn btn-secondary btn-sm mt-3 ml-4' onClick={() => handleClick(choice)}>{choice}</button>)}
                    </div>
                    <div className="row d-flex justify-content-center">
                        <button className='btn btn-danger btn-flat' type='submit' onClick={handleSaveClick}>quit and save</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RPS