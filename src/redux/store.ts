import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import taskSlice from './reducer/taskSlice';
import biometricSlice from './reducer/biometric';

export const persistKey = "root-1";

const rootReducer = combineReducers({
  biometric: biometricSlice,
  tasks: taskSlice,
})

// I added version and key for persist because we may have to change the config in the future so we'll be able to update the config. the correc method is to use the version name but it is not included in the task
const persistConfig = {
  key: persistKey,
  version: 1,
  storage:AsyncStorage ,
  // we'd better not to persist the biometric login so the user should login in each time he/she open the app
  blacklist: [
    "biometric",
  ]
}
// persist or store the task
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store;