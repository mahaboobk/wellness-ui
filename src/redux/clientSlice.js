// src/redux/clientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const res = await fetch('https://wellness-api-rotv.onrender.com/clients/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add Authorization if needed
            // 'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Sends cookies if needed
        mode: 'cors' // Ensures browser handles cross-origin properly
    });

    if (!res.ok) throw new Error('Failed to fetch clients');
    return res.json();
});

const clientSlice = createSlice({
    name: 'clients',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchClients.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default clientSlice.reducer