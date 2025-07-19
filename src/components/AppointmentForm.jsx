// src/components/AppointmentForm.jsx
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { createAppointment, updateAppointment } from '../redux/appointmentSlice'

const AppointmentForm = ({ editingAppointment = null, onCancelEdit }) => {
  const dispatch = useDispatch()
  const [clientId, setClientId] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const clients = useSelector(state => state.clients.data)

  const getClientName = (id) => {
    const client = clients.find(c => c.id === id)
    return client ? client.name : 'Unknown'
  }
  useEffect(() => {
    if (editingAppointment) {
      setClientId(editingAppointment.client_id)
      setTime(editingAppointment.time.slice(0, 16))
    }
  }, [editingAppointment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      client_id: clientId,
      time: new Date(time).toISOString()
    }

    try {
      if (editingAppointment) {
        await dispatch(updateAppointment({ ...editingAppointment, ...payload })).unwrap()
        setMessage('Appointment rescheduled successfully!')
        onCancelEdit()
      } else {
        await dispatch(createAppointment(payload)).unwrap()
        setMessage('Appointment created successfully!')
      }
      setClientId('')
      setTime('')
    } catch (err) {
      setError('Failed to save appointment.')
    }

    setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 3000)
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      {editingAppointment ? (
        <div>
          <label>Client:</label>
          <p><strong>{getClientName(clientId)}</strong></p>
        </div>
      ) : (
        <div>
          <label>
            Client:
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
              <option value="">Select a client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      <label>
        Time:
        <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <div className="form-buttons">
        <button type="submit">{editingAppointment ? 'Reschedule' : 'Create'}</button>
        {editingAppointment && <button type="button" onClick={onCancelEdit}>Cancel</button>}
      </div>
      <div className="form-messages">
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </form>
  )
}

export default AppointmentForm
