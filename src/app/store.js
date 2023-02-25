import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/Loginslice'


export default configureStore({
  reducer: {
    login: loginReducer,
  },
})