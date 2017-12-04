import { compose, applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import createSagaMiddleware from 'redux-saga'

import { persistStore } from 'redux-persist'

import reducer from "./reducers/index"
import history from "./history"
import { routerMiddleware } from 'react-router-redux'

import { initialize, addTranslation } from 'react-localize-redux';
import rootSaga from './sagas'

const en = require("../../lang/vi.json")

const languages = ['en', 'fr', 'es'];

const routeMiddleware = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(
  sagaMiddleware,
  logger,
  routeMiddleware,
)


const store = createStore(
  reducer, undefined, compose(middleware))
sagaMiddleware.run(rootSaga)


const onMissingTranslation = (key, languageCode) => {
  // here you can do whatever you want e.g. call back end service that will 
  console.log("-------------- missing transsaction")
  console.log(key)
  console.log(languageCode)
};

store.dispatch(initialize(languages, { missingTranslationCallback: onMissingTranslation, showMissingTranslationMsg: false }));

store.dispatch(addTranslation(en));

const persistor =  persistStore(store)

export {store, persistor}
