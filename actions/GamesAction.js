export const GET_GAMES = 'GET_GAMES'
export const GET_RESULT = 'GET_RESULT'
export const GET_RESULT_BOARD = 'GET_RESULT_BOARD'
export const GET_USER = 'GET_USER'
export const GET_RESULT_LEADER = 'GET_RESULT_LEADER'
export const GET_PLAYER_LIST = 'GET_PLAYER_LIST'
import { db } from '../config/firebase'
import { getDocs, collection, doc, getDoc } from 'firebase/firestore'

// create action for game list component

export const get_games = () => {
    console.log("1a. masuk games");
    return (dispatch) => {
        dispatch({
            type: GET_GAMES,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            }
        })

        const dbRef = collection(db, 'games')
        getDocs(dbRef)
            .then((snapshot) => {
                console.log("1b. masuk games");
                let games = []
                snapshot.docs.forEach((doc) => {
                    games.push({ ...doc.data(), id: doc.id })
                })
                console.log(games);
                dispatch({
                    type: GET_GAMES,
                    payload: {
                        loading: false,
                        data: games,
                        errorMessage: false,
                    }
                })
            })
            .catch((error) => {
                console.log('gagal konek');
                dispatch({
                    type: GET_GAMES,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    }
                })
            })


    }
}

export const get_result = () => {
    console.log("1. masuk result");
  return (dispatch) => {

      //loading
      dispatch({
          type: GET_RESULT,
          payload: {
              loading: true,
              data: false,
              errorMessage: false
          }
      })

      const dbRef = collection(db, 'gamestats')
        getDocs(dbRef)
            .then((snapshot) => {
                console.log("2. berhasil dapat data : ", snapshot.docs);
                let gamestats = []
                snapshot.docs.forEach((doc) => {
                    gamestats.push({ ...doc.data(), id: doc.id })

                })
                console.log(gamestats);
                dispatch({
                    type: GET_RESULT,
                    payload: {  
                        loading: false,
                        data: gamestats,
                        errorMessage: false,
                    }
                })
            })
            .catch((error) => {
                console.log("3. gagal dapat data : ", error.message);
                dispatch({
                    type: GET_RESULT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    }
                })
            })
  }
}


export const get_result_board = () => {
    console.log("testing board");
    return (dispatch) => {
        DispatchLoading(dispatch, GET_RESULT_BOARD)
        const q = query(collection(db, 'gamestats'), orderBy("createAt", "desc"),limit(5))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id})
                })
                console.log(gamestats);
                dispatchSuccess(dispatch, GET_RESULT_BOARD, result)
                console.log(games);
                
            })
            .catch((error) => {
                dispatchError(dispatch, GET_RESULT_BOARD, error)
            })
    }
}

export const get_result_leader = () => {
    console.log("testing board");
    return (dispatch) => {
        DispatchLoading(dispatch, GET_RESULT_LEADER)
        const q = query(collection(db, "gamepoint"), orderBy("totalpoint", "desc"),limit(5))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id})
                })
                console.log(gamestats);
                dispatchSuccess(dispatch, GET_RESULT_LEADER, result)
                console.log(result);
                
            })
            .catch((error) => {
                dispatchError(dispatch, GET_RESULT_LEADER, error)
            })
    }
}

export const get_player_list = () => {
    console.log("testing board");
    return (dispatch) => {
        DispatchLoading(dispatch, GET_PLAYER_LIST)
        const q = query(collection(db, 'users'), orderBy("createAt", "desc"),limit(5))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id})
                })
                console.log(gamestats);
                dispatchSuccess(dispatch, GET_PLAYER_LIST, result)
                console.log(result);
                
            })
            .catch((error) => {
                dispatchError(dispatch, GET_PLAYER_LIST, error)
            })
    }
}

export const get_user = (uid) => {
    console.log("tesing user");
    return (dispatch) => {
        const userDocRef = doc(db, 'users', uid)
        getDoc(userDocRef)
            .then((doc) => {
                const data = doc.data()
                // setName(userProfile[0].name);
                // setAvatar(userProfile[0].avatar);
                dispatch({
                    type: GET_USER,
                    payload: {
                        data: data,
                        id: doc.id
                    }
                })
            })
            .catch((error) => {
                console.log('failed to connect');
                dispatch({
                    type: GET_USER,
                    payload: null
                })
            })
    }
}

    // export const save_and_update_gamestats = ({
    //     uid,
    //     point,
    //     playCount,
    //     userWin,
    //     userLoss,
    //     userDraw,
    //     name,
    //     avatar,
    //     createdAt,
    //     totalpoint,
    //     qstring,
    //     toast,
    //     router,
    // }) => {
    //     console.log("save update stat test");
    //     return (dispatch) => {
    //         const gameStatRef = collection(db, 'gamestats')

    //         const playerCollectionRef = doc(db, 'gamepoint', uid)
    //         const q = query(collection(db, "games"), where("link", "==", qstring))
    //         const x = query(collection(db, "users"), where("playerId", "==", uid))

    //         getDocs(q).then(s => {
    //             const id = s.docs[0].id
    //             const data = s.docs[0].data()

    //             if (!data.users.includes(uid)) {
    //                 data.users.push(uid)
    //             }

    //             const result = data.users.filter((u) => u !== '')
    //             const gamesRps = doc(db, "games", id)

    //             updateDoc(gamesRps, { users: result })
    //             getDocs(x).then(u => {
    //                 const data = u.docs[0].data()

    //                 let gamesInUser = null

    //                 if (!data.games || data.games.length === 0) {
    //                     gamesInUser = [id]
    //                 }

    //                 if (data.games && !data.games.includes(id)) {
    //                     data.games.push(id)
    //                 }

    //                 updateDoc(doc(db, "users", uid), { games: gamesInUser })
    //             })
    //         })
    //         addDoc(gameStatRef, {
    //             playerId: uid,
    //             point,
    //             playCount,
    //             userWin,
    //             userLoss,
    //             userDraw,
    //             name,
    //             avatar,
    //             createdAt,
    //             // users: !q.users.includes(uid) ? [...users, uid] : [...users]
    //         })
    //             .then(() => {
    //                 updateDoc(playerCollectionRef, {
    //                     totalpoint,
    //                     name,
    //                     avatar,
    //                     updatedAt: createdAt
    //                 }).then(() => {
    //                     toast.success("games successfully saved")
    //                     router.push('/home')

    //                 })
    //             })

    //     }
    // }

// export const get_result_board= ({
//     uid,
//     point,
//     playCount,
//     userWin,
//     userLoss,
//     userDraw,
//     name,
//     avatar,
//     createdAt,
//     totalpoint
// }) => {
//     return () => {
//         const gameStatRef = collection(db, 'gamestats')
//         const q = query(collection(db, "games"), where("link", "==", qstring))
//         const x = query(collection(db, "users"), where("playerId", "==", uid))

//         getDocs(q).then(s => {
//             const id = s.docs[0].id
//             const data = s.docs[0].data()

//             if (!data.users.includes(uid)) {
//                 data.users.push(uid)
//             }

//             const result = data.users.filter((u) => u !== '')
//             const gamesRps = doc(db, "games", id)

//             updateDoc(gamesRps, { users: result })
//             getDocs(x).then(u => {
//                 const data = u.docs[0].data()

//                 let gamesInUser = null

//                 if (!data.games || data.games.length === 0) {
//                     gamesInUser = [id]
//                 }

//                 if (data.games && !data.games.includes(id)) {
//                     data.games.push(id)
//                 }

//                 updateDoc(doc(db, "users", uid), { games: gamesInUser })
//             })
//         })

//         addDoc(gameStatRef, {
//             playerId: uid,
//             point,
//             name
//         })
//             .then(() => {
//                 toast.success("games successfully saved")
//                 router.push('/home')
//             })
//     }

// }