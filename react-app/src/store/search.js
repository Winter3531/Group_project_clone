const LOAD_RESULT = 'search/LOAD_RESULT'

const load = (input) => ({
    type: LOAD_RESULT,
    input
})

export const search = (input) => async dispatch => {

    console.log(input, 'this is input in search thunk')
    const response = await fetch('/api/search/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    });
    console.log(response, 'this is response in search thunk')

    if (response.ok) {
        const searched = await response.json();
        console.log(searched, 'this is searched in search thunk')
        dispatch(load(searched))
        return searched
    }
}

const initialState = {};

export default function searchReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_RESULT:
            console.log(action)
            return {...state, ...action.results}
        default:
            return state
    }
}
