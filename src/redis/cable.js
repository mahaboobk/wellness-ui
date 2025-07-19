// src/redis/cable.js
import { createConsumer } from '@rails/actioncable'

// Create a single shared ActionCable consumer instance
const host = window.location.hostname
export const cableApp = createConsumer(`ws://${host}:3000/cable`)
