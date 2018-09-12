import thunk from 'redux-thunk';
import reducers from '../reducers';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer, purgeStoredState} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const middleware = [thunk];
middleware.push(createLogger());

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer,
    undefined,
    compose(
        applyMiddleware(...middleware),
    )
);

//purgeStoredState(persistConfig);

export const persistor = persistStore(store);