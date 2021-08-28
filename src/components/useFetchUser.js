import { useReducer, useEffect } from "react";
import axios from 'axios'
import { stat } from "fs";

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
}

const BASE_URL = 'https://api.github.com/search/users'

function reducer(state, action){
  switch(action.type){
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, users:[] }
    case ACTIONS.GET_DATA:
      return {...stat, loading: false, users: action.payload.users}
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, users: []}
    default:
      return state
  }
}

export default function useFetchUsers(username){
  const [state, dispatch] = useReducer(reducer, {users: [], loading: true})
  useEffect(() => {
    dispatch({type: ACTIONS.MAKE_REQUEST})
    axios.get(BASE_URL,{
      params: {q: username}
    }).then(res => {
      dispatch({type: ACTIONS.GET_DATA, payload: {users: res.data}})
    }).catch(e => {
      dispatch({type: ACTIONS.ERROR, payload:{error: e}})
    })

  }, [username])
  return state
}