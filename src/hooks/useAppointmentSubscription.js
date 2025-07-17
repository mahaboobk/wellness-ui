// src/hooks/useAppointmentSubscription.js
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cableApp } from "../redis/cable"

import {
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from "../redux/appointmentSlice"

const useAppointmentSubscription = () => {
    const dispatch = useDispatch()

    useEffect(() => {

        const subscription = cableApp.subscriptions.create("AppointmentChannel", {

            received(data) {
                console.log("🔄 Received appointment update:", data)

                switch (data.action) {
                    case "create":
                        dispatch(createAppointment.fulfilled(data.data))
                        break
                    case "update":
                        dispatch(updateAppointment.fulfilled(data.data))
                        break
                    case "destroy":
                        dispatch(deleteAppointment.fulfilled(data.data.id))
                        break
                    default:
                        console.warn("⚠️ Unknown action type:", data.action)
                }
            },
            connected() {
                console.log("✅ WebSocket connected")
            },
            disconnected() {
                console.log("❌ WebSocket disconnected")
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [dispatch])
}

export default useAppointmentSubscription
