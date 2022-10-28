import { configureStore } from '@reduxjs/toolkit'
import configSlice from './config/configSlice'

const store = configureStore({
  reducer: {
    counter: configSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch