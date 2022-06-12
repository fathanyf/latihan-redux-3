import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Component, useContext, useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { bindActionCreators } from 'redux'
import { db } from '../../config/firebase'
import { UserAuth } from '../../context/AuthContext'
import { get_result, get_result_leader } from '../../actions/GamesAction'
import { get_user } from '../../actions/GamesAction'




const Account = () => {
    const router = useRouter()
    let { id } = router.query
    const { user } = UserAuth()

    let currentUserId = user?.uid

    const [name, setName] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')
    const [playerList, setPlayerList] = useState([])
    const [gameData, setGameData] = useState([])
    const [gameBoard, setGameBoard] = useState([])
    const [totalPoint, setTotalPoint] = useState([])
    const [playerId, setPlayerId] = useState('')



    const fetchUser = () => {
        const docRef = doc(db, 'users', id)
        let userProfile = []
        onSnapshot(docRef, (doc) => {
            userProfile.push(doc.data(), doc.id)
            setName(userProfile[0].name);
            setCreatedAt(userProfile[0].createdAt)
            setAddress(userProfile[0].address)
            setPhone(userProfile[0].phone)
            setAvatar(userProfile[0].avatar)
            setPlayerId(userProfile[0].playerId)
        })
    }
    
    // console.log(createdAt, "<===");
    useEffect(() => {
        if (id) {
            fetchUser()
        }
    }, [id])

    //get data another player 

    const getPlayers = async () => {
        try {
            const q = query(collection(db, "users"),where("playerId","!=",user?.uid))
            const data = await getDocs(q)
            setPlayerList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user?.uid) {
            getPlayers()
        }
    }, [user?.uid])

    // get gameplay data 

    const getGameHistory = async () => {
        try {
            const q = query(collection(db, "gamestats"), orderBy("createdAt", "desc"), limit(5))
            const data = await getDocs(q)
            setGameData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // console.log(gameData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGameHistory()
    }, [])

    // get Total point  

    const fetchTotalPoint = async () => {
        const docRef = doc(db, 'gamepoint', id)
        let userPoint = []
        onSnapshot(docRef, (doc) => {
            userPoint.push(doc.data(), doc.id)
            setTotalPoint(point[0].totalpoint)
            console.log({docRef});
        })
    }

    useEffect(() => {
        if (id) {
            fetchTotalPoint()
        }
    }, [id])

    // get gamepoint data for leader board

    const getGameBoard = async () => {
        try {
            const q = query(collection(db, "gamepoint"), orderBy("totalpoint", "desc"))
            const data = await getDocs(q)
            setGameBoard(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGameBoard()
    }, [])

//redux result
        const { getResultResult, getResultLoading, getResultError } = useSelector((state) => state.gamesReducer)
        const dispatch = useDispatch()

    useEffect(() => {
        console.log("result");
        dispatch(get_result())
    }, [dispatch])

//redux leader
    //     const { getResultLeaderResult, getResultLeaderLoading, getResultLeaderError } = useSelector((state) => state.gamesReducer)
    //     const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log("leader");
    //     dispatch(get_result_leader())
    // }, [dispatch])


    return (
        <>
            <Head>
                <title>Chapter 10 | Account </title>
            </Head>
            <section className='dark-mode'>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <div className="card card-danger card-outline">
                                <div className="card-body box-profile">
                                    {
                                        (!address && !phone && !avatar) &&
                                        <div className="mb-2 text-center">
                                            <div className="badge badge-danger" role="alert">
                                                <p>Please update your profile !</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        (!avatar) ? (
                                            <div className="text-center">
                                                <img className="profile-user-img img-fluid img-circle" src="/blank-avatar.svg" alt="User profile picture" />
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <img className="profile-user-img img-fluid img-circle" src={avatar} alt="User profile picture" />
                                            </div>
                                        )
                                    }

                                    <h3 className="profile-username text-center">{name}</h3>
                                    {/* <b className='text-light'>Joint</b> <a className="float-right text-white">{moment(createdAt !== undefined ? "" : createdAt.toDate()).calendar()}</a> */}
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Address</b> <a className="float-right">{address}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Phone</b> <a className="float-right">{phone}</a>
                                        </li>
                                    </ul>
                                    {
                                        (playerId != currentUserId) && (
                                            <a href="#" className="btn btn-danger btn-block"><b>Follow</b></a>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="card card-widget widget-user-2 shadow-sm">
                                <div className="widget-user bg-danger">
                                    <h5 className="p-2 text-center">Game History</h5>
                                </div>
                                <div className="card-footer p-0">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                Points <span className="float-right badge bg-warning">{totalPoint}</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            {
                                                (totalPoint <= 0) && (
                                                    <div className="nav-link">
                                                        <b className='text-light'>Badge</b> <a className="float-right text-light"><img src='/bronze.svg' style={{ width: '25px' }} />&nbsp; (bronze)</a>
                                                    </div>
                                                )
                                            }
                                            {
                                                (totalPoint > 0 && totalPoint <= 25) && (
                                                    <div className="nav-link">
                                                        <b className='text-light'>Badge</b> <a className="float-right text-light"><img src='/silver.svg' style={{ width: '25px' }} />&nbsp; (silver)</a>
                                                    </div>
                                                )
                                            }
                                            {
                                                (totalPoint > 25) && (
                                                    <div className="nav-link">
                                                        <b className='text-light'>Badge</b> <a className="float-right text-light"><img src='/gold.svg' style={{ width: '25px' }} />&nbsp; (gold)</a>
                                                    </div>
                                                )
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
<div className="card">
    <div className="card-header p-2 bg-danger">
        <h2 className='text-center text-light'>Game Board</h2>
    </div>
    {/* <Provider store={store}> */}
    {/* <GameBoard>

    </GameBoard> */}
        <div className="card-body">
        
                {
                    getResultResult ? (
                    getResultResult.map((e, index) => {
                        <div className="direct-chat-msg" key={index}>
                        <div className="direct-chat-infos clearfix">
                            <span className="direct-chat-name float-left">{e.name}</span>
                            <span className="direct-chat-timestamp float-right">{moment(e.createdAt.toDate()).fromNow()}</span>
                        </div>
                        {
                            (!e.avatar) ? (
                                <img className="direct-chat-img" src='/blank-avatar.svg' alt="message user image" />
                            ) :
                                <img className="direct-chat-img" src={e.avatar} alt="message user image" />
                        }
                        <div className="direct-chat-text">
                            <p className='text-center'><i className="fas fa-gamepad"></i>: <span className="badge badge-secondary"> {e.playCount}</span><i className="fas fa-thumbs-up ml-4"></i> : <span className="badge badge-success">{e.userWin}</span>  <i className="fas fa-handshake ml-4"></i> : <span className="badge badge-info">{e.userDraw}</span>  <i className="fas fa-thumbs-down ml-4"></i> : <span className="badge badge-danger">{e.userLoss}</span>  <i className="fas fa-award ml-4"></i> : <span className="badge badge-primary">{e.point}</span></p>
                        </div>
                        <hr />
                    </div>
                    })
                ) : getResultLoading ? (
                    <div className="text-center">
                        <p className='text-light'>loading...</p>
                    </div>
                ) : (
                    <p>{getResultError ? getResultError : "data empty"}</p>
                )
                }
        </div>
    </div>
</div>
                                {/* </Provider> */}
                                
                        <div className="col-md-3">
                            <div className="card card-danger">
                                <div className="card-header text-center">
                                    <h3 className="card-title">Player List</h3>
                                </div>
                                {
                                    playerList.map((e, index) => {
                                        return (
                                            <div className="card-body" key={index}>
                                                <div className="user-panel  d-flex">
                                                    <div className="image">
                                                        {
                                                            !e.avatar ? (
                                                                <img src="/blank-avatar.svg" className="img-circle elevation-2" alt="User Image" />
                                                            ) : (
                                                                <img src={e.avatar} className="img-circle elevation-2" alt="User Image" />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="info">
                                                        <Link href={{ pathname: '/account', query: { id: e.id } }}>
                                                            <a className="d-block">{e.name}</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Leader Board</h3>
                                </div>
                                {
                                    gameBoard.map((e, index) => {
                                        return (

                                            <div className="card-body p-0" key={index}>
                                                <ul className="products-list product-list-in-card pl-2 pr-2" key={index}>
                                                    <li className="item">
                                                        {
                                                            (e.totalpoint === 0) ? (
                                                                <>
                                                                    {/* <div className="product-img">
                                                                        <img src='/blank-avatar.svg' alt="Product Image" className="img-size-50" />
                                                                    </div>
                                                                    <div className="product-info">
                                                                        <a href="" className="product-title">{e.name}
                                                                            <span className="badge badge-warning float-right">0</span></a>
                                                                        <span className="product-description">
                                                                            <small><span><b>Update at : </b></span>00:00:00</small>
                                                                        </span>
                                                                    </div> */}
                                                                </>

                                                            ) : (
                                                                <>
                                                                    <div className="product-img">
                                                                        <img src={e.avatar} alt="Product Image" className="img-size-50" />
                                                                    </div>
                                                                    <div className="product-info">
                                                                        <a className="product-title">{e.name}
                                                                            <span className="badge badge-warning float-right">{e.totalpoint}</span></a>
                                                                        <span className="product-description">
                                                                            <small><span><b>Update at : </b></span>{moment(e.updatedAt === undefined ? " " : e.updatedAt.toDate()).calendar()}</small>
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </li>
                                                </ul>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}



export default Account
