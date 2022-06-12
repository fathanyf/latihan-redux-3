import React, { useEffect } from "react";
import { get_result_board } from "../../actions/GamesAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const GamingBoard = () => {
    
    const { getResultBoardResult,  getResultBoardLoading, getResultBoardError } = useSelector((state) => state.gamesReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("effect dapat");
        dispatch(get_result_board())
    }, [dispatch])

    {
        getResultBoardResult ? (
            getResultBoardResult.map((e, index) => {
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
    ) : getResultBoardLoading ? (
        <div className="text-center">
            <p className='text-light'>loading...</p>
        </div>
    ) : (
        <p>{getResultBoardError ? getResultBoardError : "data empty"}</p>
    )
    }

}

export default GamingBoard