const LOAD_RESULT = 'search/LOAD_RESULT'

const load = (results) => ({
    type: LOAD_RESULT,
    results
})

export const search = (input) => async dispatch => {

    // console.log(input, 'this is input in search thunk')
    const response = await fetch('/api/search/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({searched: input})
    });

    if (response.ok) {
        const searched = await response.json();
        // console.log(searched, 'this is searched in search thunk')
        dispatch(load(searched))
        return searched
    }
}

const initialState = {};

export default function searchReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_RESULT:
            return {...state, ...action.results}
        default:
            return state
    }
}
