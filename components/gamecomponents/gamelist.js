import React, { useEffect } from 'react'
import { get_games } from '../../actions/GamesAction'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

const GameList = () => {

    // get state from game reducers

    const { getGamesResult, getGamesLoading, getGamesError } = useSelector((state) => state.gamesReducer)
    const dispatch = useDispatch()

    // component did mount from game action

    useEffect(() => {
        dispatch(get_games())
    }, [dispatch])

    return (
        <div>
            <div className="container">
                <h5 className="text-white mb-3 mt-3" style={{ borderLeft: '5px solid' }}>&nbsp; Recommended for you</h5>
                <div className="row">
                    {
                        getGamesResult ? (
                            getGamesResult.map((e, index) => {
                                return (
                                    <div className="col-sm-4" key={e.id}>
                                        <div className="position-relative" style={{ maxHeight: '180px', opacity: '0.8' }}>
                                            <img src={e.imageUrl} alt="Photo 3" className="img-fluid img-games" />
                                        </div>
                                        <div className="text-block bg-dark p-2" style={{ opacity: '0.7' }}>
                                            <h6 className='text-uppercase'>{e.title} <small>({e.release})</small></h6>
                                            <p>{e.developer} | {e.genre} </p>
                                            <p>
                                                <small>{e.description}</small>
                                            </p>
                                            <Link href={`/games/${e.link}`}>
                                                <button type="submit" className='btn btn-danger btn-flat btn-block'>play now</button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        ) : getGamesLoading ? (
                            <div className="text-center">
                                <p className='text-light'>loading...</p>
                            </div>
                        ) : (
                            <p>{getGamesError ? getGamesError : "data empty"}</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default GameList