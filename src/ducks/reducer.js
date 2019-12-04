const initialState = {
    email: '',
    user_id: '',
    savedCars: '',
    make: '',
    secondMake: '',
    model: '',
    secondModel: '',
    year: '',
    secondYear: '',
    loggedIn: false
}

//action constants
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const UPDATE_SAVED = "UPDATE_SAVED";
const UPDATE_MAKE = "UPDATE_MAKE";
const UPDATE_SECOND_MAKE = "UPDATE_SECOND_MAKE"
const UPDATE_MODEL = "UPDATE_MODEL";
const UPDATE_SECOND_MODEL = "UPDATE_SECOND_MODEL"
const UPDATE_YEAR = "UPDATE_YEAR";
const UPDATE_SECOND_YEAR = "UPDATE_SECOND_YEAR"
const UPDATE_LOGGED_IN = "UPDATE_LOGGED_IN"

//action builders
export function updateUserInfo(userObj) {
    return {
        type: UPDATE_USER_INFO,
        payload: userObj
    };
}

export function updateLoggedIn(loggedIn) {
    return {
        type: UPDATE_LOGGED_IN,
        payload: loggedIn
    }
}

export function updateMake(make) {
    return {
        type: UPDATE_MAKE,
        payload: {make}
    }
}

export function updateSecondMake(make) {
    return {
        type: UPDATE_SECOND_MAKE,
        payload: {make}
    }
}

export function updateModel(model) {
    return {
        type: UPDATE_MODEL,
        payload: {model}
    }
}

export function updateSecondModel(model) {
    return {
        type: UPDATE_SECOND_MODEL,
        payload: {model}
    }
}

export function updateYear(year) {
    return {
        type: UPDATE_YEAR,
        payload: {year}
    }
}

export function updateSecondYear(year) {
    return {
        type: UPDATE_SECOND_YEAR,
        payload: {year}
    }
}


export function updateSaved(car) {
    return {
        type: UPDATE_SAVED,
        payload: {car}
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
        case UPDATE_LOGGED_IN:
            return {...state, ...action.payload};
        case UPDATE_SAVED:
            return {...state, ...action.payload};
        case UPDATE_SECOND_MAKE:
            return {...state, ...action.payload};
        case UPDATE_SECOND_MODEL:
            return {...state, ...action.payload};
        case UPDATE_SECOND_YEAR:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
