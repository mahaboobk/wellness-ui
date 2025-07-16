// src/redux/appointmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

export const updateAppointment = createAsyncThunk('appointments/updateAppointment', async (appointment) => {
    const res = await fetch(`http://localhost:3000/appointments/${appointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment })
    })
    if (!res.ok) throw new Error('Failed to update appointment')
    return res.json()
})

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (id) => {
    const res = await fetch(`http://localhost:3000/appointments/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete appointment')
    return id
})

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAppointments.pending, state => {
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
                state.data.push(action.payload)
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const index = state.data.findIndex(a => a.id === action.payload.id)
                if (index !== -1) state.data[index] = action.payload
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.data = state.data.filter(app => app.id !== action.payload)
            })
    }
})

export default appointmentSlice.reducer
