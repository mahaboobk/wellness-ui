import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
export const getClients = async () => {
    const res = await axios.get(`${API_URL}/clients`);
    if (res.status !== 200) throw new Error('Failed to fetch clients');
    return res;
};

export const getAppointments = async () => {
    const res = await axios.get(`${API_URL}/appointments`);
    console.log('Fetched appointments:', res);
    if (res.status !== 200) throw new Error('Failed to fetch appointments');
    return res.data;
};

export const postAppointment = async (appointment) => {
    try {
        const res = await axios.post(`${API_URL}/appointments`, { appointment });
        if (res.status !== 201) throw new Error('Failed to create appointment');
        return res.data;
    } catch (error) {
        console.error('Error posting appointment:', error);
        throw error;
    }
};
export const updateAppointment = async (id, appointment) => {
    const res = await axios.put(`${API_URL}/appointments/${id}`, { appointment });
    if (res.status !== 200) throw new Error('Failed to update appointment');
    return res.data;
};

export const deleteAppointment = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/appointments/${id}`);
        if (res.status !== 204) throw new Error('Failed to delete appointment');
        return res;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};
