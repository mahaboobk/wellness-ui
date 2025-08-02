// src/redis/cable.js
import { createConsumer } from '@rails/actioncable'

// ✅ Correct WebSocket URL (single wss:// prefix)
export const cableApp = createConsumer('wss://wellness-api-rotv.onrender.com/cable')
