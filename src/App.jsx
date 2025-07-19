// src/App.jsx
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ClientList from './components/ClientList'
import AppointmentList from './components/AppointmentList'
import AppointmentForm from './components/AppointmentForm'
import { fetchClients } from './redux/clientSlice'
import { fetchAppointments } from './redux/appointmentSlice'
import './App.css'
import useAppointmentSubscription from './hooks/useAppointmentSubscription'
import AppVersion from './components/AppVersion'

function App() {
    const dispatch = useDispatch()
    const [selectedClientId, setSelectedClientId] = useState(null)
    const [editingAppointment, setEditingAppointment] = useState(null)

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment)
    }

    const cancelEdit = () => {
        setEditingAppointment(null)
    }
    useAppointmentSubscription()
    useEffect(() => {
        dispatch(fetchClients())
        dispatch(fetchAppointments())
    }, [dispatch])

    return (
        <div className="app-container">
            <nav className="app-nav">Wellness Management</nav>
            <main className="app-main">
                <section className="left-panel">
                    <h2>Clients</h2>
                    <ClientList
                        onSelectClient={setSelectedClientId}
                        selectedClientId={selectedClientId}
                    />

                </section>
                <section className="center-panel">
                    <h2>Upcoming Appointments</h2>
                    <AppointmentList selectedClientId={selectedClientId} onEdit={handleEdit} />
                </section>

                <section className="right-panel">
                    <h2>{editingAppointment ? 'Reschedule' : 'Book'} Appointment</h2>
                    <AppointmentForm
                        editingAppointment={editingAppointment}
                        onCancelEdit={cancelEdit}
                    />
                </section>
            </main>
            <AppVersion />
            <footer className="app-footer">© 2025 Wellness Platform</footer>
        </div>
    )
}

export default App