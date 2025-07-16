// src/components/AppointmentList.jsx
import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { useSelector as useClientSelector } from 'react-redux'
const AppointmentList = ({ selectedClientId, onEdit }) => {
    const dispatch = useDispatch()
    const { data: appointments, status } = useSelector(state => state.appointments)
    const { data: clients } = useClientSelector(state => state.clients)

    const filteredAppointments = useMemo(() => {
        return appointments.filter(app => app.client_id === selectedClientId)
    }, [appointments, selectedClientId])

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId)
        return client ? client.name : 'Unknown Client'
    }

    if (status === 'loading') return <p>Loading appointments...</p>
    if (status === 'failed') return <p>Failed to load appointments</p>

    return (
        <ul>
            {filteredAppointments.map(app => (
                <li key={app.id}>
                    <strong>{getClientName(app.client_id)}</strong><br />
                    Time: {new Date(app.time).toLocaleString()}<br />
                    <button onClick={() => onEdit(app)}>Edit</button>
                    <button onClick={() => dispatch(deleteAppointment(app.id))}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default AppointmentList
