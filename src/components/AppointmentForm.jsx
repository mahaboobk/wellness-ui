// src/components/AppointmentForm.jsx
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { createAppointment, updateAppointment } from '../redux/appointmentSlice'

const AppointmentForm = ({ editingAppointment = null, onCancelEdit }) => {
  const dispatch = useDispatch()
  const [clientId, setClientId] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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
    <form onSubmit={handleSubmit}>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Client ID:
        <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} required />
      </label>
      <br />
      <label>
        Time:
        <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <br />
      <button type="submit">{editingAppointment ? 'Reschedule Appointment' : 'Create Appointment'}</button>
      {editingAppointment && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  )
}

export default AppointmentForm
