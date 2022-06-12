import {createStore,applyMiddleware,compose} from 'redux'
import {createWrapper} from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import reducers from '../reducers'

// create wrapper for next/redux

const initStore = ()=>{
    return createStore(reducers,compose (applyMiddleware(thunk)))
}

export const wrapper = createWrapper(initStore)