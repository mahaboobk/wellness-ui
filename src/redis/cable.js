// src/redis/cable.js
import { createConsumer } from '@rails/actioncable'

// Create a single shared ActionCable consumer instance
export const cableApp = createConsumer('ws://localhost:3000/cable')