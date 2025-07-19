// src/redis/cable.js
import { createConsumer } from '@rails/actioncable'

const API_BASE = import.meta.env.VITE_WS_URL || 'ws://localhost:3000/cable'
console.log('Connecting to ActionCable at:', API_BASE)
export const cableApp = createConsumer(API_BASE)
