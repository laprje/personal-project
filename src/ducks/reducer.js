const initialState = {
    email: '',
    user_id: '',
    savedCars: {},
    make: '',
    model: '',
    year: ''
}

//action constants
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
// const UPDATE_LIST = "UPDATE_LIST";
const UPDATE_MAKE = "UPDATE_MAKE";
const UPDATE_MODEL = "UPDATE_MODEL";
const UPDATE_YEAR = "UPDATE_YEAR";

//action builders
export function updateUserInfo(userObj) {
    return {
        type: UPDATE_USER_INFO,
        payload: userObj
    };
}

export function updateMake(make) {
    return {
        type: UPDATE_MAKE,
        payload: {make}
    }
}

export function updateModel(model) {
    return {
        type: UPDATE_MODEL,
        payload: {model}
    }
}

export function updateYear(year) {
    return {
        type: UPDATE_YEAR,
        payload: {year}
    }
}

//add function update cars list here!!!

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return { ...state, ...action.payload };
        case UPDATE_MAKE:
            return {...state, ...action.payload };
        case UPDATE_MODEL:
            return {...state, ...action.payload};
        case UPDATE_YEAR:
            return {...state, ...action.payload};
        //add switch case for update cars
        default:
            return state;
    }
}
