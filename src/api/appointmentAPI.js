// src/api/appointmentAPI.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE

export const fetchAppointments = async () => {
    const res = await axios.get(BASE_URL)
    return res.data
}

export const createAppointment = async (newAppointment) => {
    const res = await axios.post(BASE_URL, { appointment: newAppointment })
    return res.data
}

export const updateAppointment = async (updatedAppointment) => {
    const res = await axios.put(`${BASE_URL}/${updatedAppointment.id}`, {
        appointment: updatedAppointment
    })
    return res.data
}

export const deleteAppointment = async (appointmentId) => {
    await axios.delete(`${BASE_URL}/${appointmentId}`)
    return appointmentId
}