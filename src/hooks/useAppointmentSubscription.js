import {
    createFromSocket,
    updateFromSocket,
    deleteFromSocket
} from '../redux/appointmentSlice'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cableApp } from "../redis/cable"



const useAppointmentSubscription = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const subscription = cableApp.subscriptions.create('AppointmentChannel', {
            connected() {
                console.log('✅ WebSocket connected to AppointmentChannel')
            },
            disconnected() {
                console.log('❌ WebSocket disconnected')
            },
            received(payload) {
                console.log('🔄 Received appointment update:', payload)
                const { action, data } = payload

                switch (action) {
                    case 'create':
                        dispatch(createFromSocket(data))
                        break
                    case 'update':
                        dispatch(updateFromSocket(data))
                        break
                    case 'destroy':
                        dispatch(deleteFromSocket(data))
                        break
                    default:
                        console.warn('⚠️ Unknown action type:', action)
                }
            }
        })

        return () => {
            subscription.unsubscribe()
            console.log('🧹 Unsubscribed from AppointmentChannel')
        }
    }, [dispatch])
}

export default useAppointmentSubscription