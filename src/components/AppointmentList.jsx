// src/components/AppointmentList.jsx
import { useSelector, useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'
import { useSelector as useClientSelector } from 'react-redux'
import { deleteAppointment } from '../redux/appointmentSlice'
const AppointmentList = ({ selectedClientId, onEdit }) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState(null)
    const { data: appointments, status } = useSelector(state => state.appointments)
    const { data: clients } = useClientSelector(state => state.clients)

    const filteredAppointments = useMemo(() => {
        return appointments.filter(app => app.client_id === selectedClientId)
    }, [appointments, selectedClientId])
    const upcomingAppointments = useMemo(() => {
        return appointments.filter(app => new Date(app.time) > new Date())
    }, [appointments])

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId)
        return client ? client.name : 'Unknown Client'
    }

    if (status === 'loading') return <p>Loading appointments...</p>
    if (status === 'failed') return <p>Failed to load appointments.</p>

    return (
        <div>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            {selectedClientId && filteredAppointments.length === 0 && (
                <p style={{ color: 'red' }}>No upcoming appointments for this client.</p>
            )}
            <ul className="appointment-list">
                {filteredAppointments.map(app => (
                    <li key={app.id} className="appointment-item">
                        <strong>Name:</strong> {getClientName(app.client_id)} <br />
                        <strong>Time:</strong> {new Date(app.time).toLocaleString()} <br />
                        <div className="actions">
                            <button onClick={() => onEdit(app)} className="edit-btn">Edit</button>
                            <button onClick={() => dispatch(deleteAppointment(app.id))} className="delete-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AppointmentList
