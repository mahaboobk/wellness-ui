// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './clientSlice'
import appointmentReducer from './appointmentSlice'

const store = configureStore({
    reducer: {
        clients: clientReducer,
        appointments: appointmentReducer
    }
})

export default store