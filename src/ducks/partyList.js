import axios from 'axios';

// initial state
const initialState = {
    partyList: [],
    luke: {}  
}

// ACTION TYPE
const ADD_GUEST = 'ADD_GUEST';
const REMOVE_GUEST = 'REMOVE_GUEST';
const GET_LUKE = 'GET_LUKE';

export function addGuest(guest) {
    return {
        type: ADD_GUEST,
        newGuest: guest
    }
}

// action creators are just functions that return an object
// I am in the habit of using 'type' and 'payload' as the properties
// for this object. redux-promise-middleware is checking the 'payload'
// property to see if it is a promise object.
export function deleteGuest(index) {
    return {
        type: REMOVE_GUEST,
        payload: index
    }
}
// Below is an example of an http request. You will follow the same pattern
// below when you are trying to hit an endpoint on your own server for 
// data that needs to be in the redux store
export function getLuke() {
    const lukeData = axios.get('https://swapi.co/api/people/1/').then( res => {
        return res.data
    })
    return {
        type: GET_LUKE,
        payload: lukeData
    }
}

// the reducer is just a function. it takes in current redux store state and an action
// object from one of the actions creators above. use a switch statement to check for 
// the action's type. 
// REMEMEBER: you need to return a new piece of state. that is why we are using Object.assign
// below to merge the key/value pairs of the other objects into the new object (first argument)
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_GUEST:
            return Object.assign({}, state, {partyList: [...state.partyList, action.newGuest]})
        case REMOVE_GUEST:
            const updatedArr = state.partyList.filter( (guest, i) => i !== action.payload)
            return Object.assign({}, {partyList: updatedArr})
        case GET_LUKE + '_FULFILLED':
        // When the data successfully comes back from the http request, redux-promise-middleware
        // will concat the string '_FULFILLED' to the action's type.
            return Object.assign({}, state, {luke: action.payload})    
        default:
            return state;
    }
}