import React, { useEffect } from "react";
import { get_result_board } from "../../actions/GamesAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const PlayerList = () => {
    
    const { getResultBoardResult,  getResultBoardLoading, getResultBoardError } = useSelector((state) => state.gamesReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("effect dapat");
        dispatch(get_result_board())
    }, [dispatch])

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

}

export default PlayerList