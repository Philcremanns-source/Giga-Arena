import { chatResponses, fallbackResponse } from '@/data/chatResponses'

export function getResponse(message) {
  const lower = message.toLowerCase().trim()
  for (const entry of Object.values(chatResponses)) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response
    }
  }
  return fallbackResponse
}
