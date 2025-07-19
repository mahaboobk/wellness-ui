// src/redux/appointmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunks for API calls
export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
    const res = await fetch('http://localhost:3000/appointments/')
    if (!res.ok) throw new Error('Failed to fetch appointments')
    return res.json()
})

export const createAppointment = createAsyncThunk('appointments/createAppointment', async (newAppointment) => {
    const res = await fetch('http://localhost:3000/appointments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment: newAppointment })
    })
    if (!res.ok) throw new Error('Failed to create appointment')
    return res.json()
})

export const updateAppointment = createAsyncThunk('appointments/updateAppointment', async (updatedAppointment) => {
    const res = await fetch(`http://localhost:3000/appointments/${updatedAppointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment: updatedAppointment })
    })
    if (!res.ok) throw new Error('Failed to update appointment')
    return res.json()
})

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (appointmentId) => {
    const res = await fetch(`http://localhost:3000/appointments/${appointmentId}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete appointment')
    return appointmentId
})

// Slice
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
                state.data = [...state.data, action.payload]
                // state.data.push(action.payload)
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
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
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
                state.data = state.data.filter(app => app.id !== action.payload.id)
            })
    }
})

export const { createFromSocket, updateFromSocket, deleteFromSocket } = appointmentSlice.actions
export default appointmentSlice.reducer
