import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointments } from '../redux/appointmentSlice'
import isEqual from 'lodash.isequal'

const POLL_INTERVAL = 2000
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/appointments`


const normalize = (arr) => [...arr].sort((a, b) => a.id - b.id)

export default function useAppointmentPolling(enabled = true) {
    const dispatch = useDispatch()
    const currentAppointments = useSelector(state => state.appointments.data)

    useEffect(() => {
        if (!enabled) return

        const poll = async () => {
            try {
                const res = await fetch(BASE_URL) // change to actual API
                const latest = await res.json()

                if (!isEqual(normalize(latest), normalize(currentAppointments))) {
                    dispatch(fetchAppointments()) // only if changed
                }
            } catch (err) {
                console.error('Polling failed:', err)
            }
        }

        poll() // run immediately
        const interval = setInterval(poll, POLL_INTERVAL)
        return () => clearInterval(interval)
    }, [dispatch, enabled, currentAppointments])
}