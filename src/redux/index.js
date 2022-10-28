import createSagaMiddleware from 'redux-saga'
import {configureStore} from '@reduxjs/toolkit';
import { rootReducer, rootSaga } from './root';

export default (function createReduxStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware],
    });

    sagaMiddleware.run(rootSaga);

    return store;
})();