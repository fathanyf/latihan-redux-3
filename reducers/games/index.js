import { GET_GAMES } from '../../actions/GamesAction'
import { GET_RESULT } from '../../actions/GamesAction'
import { GET_RESULT_BOARD } from '../../actions/GamesAction'
// import { GET_USER } from '../../actions/GamesAction'
import { GET_RESULT_LEADER } from '../../actions/GamesAction'
import { GET_PLAYER_LIST } from '../../actions/GamesAction'

// create reducer for game list component

const initialState = {
    getGamesResult: false,
    getGamesLoading: false,
    getGamesError: false,

}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                getGamesResult: action.payload.data,
                getGamesLoading: action.payload.loading,
                getGamesError: action.payload.errorMessage
            }
            case GET_RESULT:
                console.log("4. Masuk Reducer", action);
                return {
                    ...state,
                    getResultResult: action.payload.data,
                    getResultLoading: action.payload.loading,
                    getResultError: action.payload.errorMessage
                }
            case GET_RESULT_BOARD:
                console.log("4. Masuk Reducer", action);
                    return {
                        ...state,
                        getResultBoardResult: action.payload.data,
                        getResultBoardLoading: action.payload.loading,
                        getResultBoardError: action.payload.errorMessage
                        }
            case GET_RESULT_LEADER:
              console.log("4. Masuk Reducer", action);
                    return {
                        ...state,
                        getResultLeaderResult: action.payload.data,
                        getResultLeaderLoading: action.payload.loading,
                        getResultLeaderError: action.payload.errorMessage
                        }
            case GET_PLAYER_LIST :
                console.log("4. Masuk Reducer", action);
                    return {
                        ...state,
                          getPlayerListResult: action.payload.data,
                          getPlayerListLoading: action.payload.loading,
                          getPlayerListError: action.payload.errorMessage
                          }
            // case GET_USER:
            //         return {
            //             ...state,
            //             getUser: action.payload
            //             }
            default:
                return state
            }
}

export default gamesReducer