// src/redux/appointmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as API from '../api/appointmentAPI'

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async (_, { rejectWithValue }) => {
        try {
            return await API.fetchAppointments()
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)
export const createAppointment = createAsyncThunk(
    'appointments/createAppointment',
    async (newAppointment, { rejectWithValue }) => {
        try {
            return await API.createAppointment(newAppointment)
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const updateAppointment = createAsyncThunk(
    'appointments/updateAppointment',
    async (updatedAppointment, { rejectWithValue }) => {
        try {
            return await API.updateAppointment(updatedAppointment)
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const deleteAppointment = createAsyncThunk(
    'appointments/deleteAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            return await API.deleteAppointment(appointmentId)
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {
        createFromSocket: (state, action) => {
            const index = state.data.findIndex(app => app.id === action.payload.id)
            if (index !== -1) {
                state.data[index] = action.payload
            } else {
                state.data.push(action.payload)
            }
        },
        updateFromSocket: (state, action) => {
            const index = state.data.findIndex(app => app.id === action.payload.id)
            if (index !== -1) {
                state.data[index] = action.payload
            }
        },
        deleteFromSocket: (state, action) => {
            state.data = state.data.filter(app => app.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
                console.error("🚨 fetchAppointments failed:", action.payload)
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                const index = state.data.findIndex(app => app.id === action.payload.id)
                if (index !== -1) {
                    state.data[index] = action.payload
                } else {
                    state.data.push(action.payload)
                }
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const index = state.data.findIndex(app => app.id === action.payload.id)
                if (index !== -1) {
                    state.data[index] = action.payload
                }
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.data = state.data.filter(app => app.id !== action.payload)
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.error = action.payload
                console.error("🚨 createAppointment failed:", action.payload)
            })
            .addCase(updateAppointment.rejected, (state, action) => {
                state.error = action.payload
                console.error("🚨 updateAppointment failed:", action.payload)
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.error = action.payload
                console.error("🚨 deleteAppointment failed:", action.payload)
            })
    }
})

export const { createFromSocket, updateFromSocket, deleteFromSocket } = appointmentSlice.actions
export default appointmentSlice.reducer