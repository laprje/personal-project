// import { createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// import reducer from './reducer'

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     stateReconciler: autoMergeLevel2
//    };
   
//    const pReducer = persistReducer(persistConfig, reducer);

// export default createStore(pReducer, reducer)
// export const persistor = persistStore()

import { createStore } from 'redux'

import reducer from './reducer'

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
