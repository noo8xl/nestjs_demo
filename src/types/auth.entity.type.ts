import { ROLE } from "@prisma/client"
import { TOKEN } from "./tokens.type"

export type AUTH_ENTITY_TYPE = {
  // token: TOKEN
  customerId: number
  role: ROLE
  isBannned: boolean
  isPremium: boolean
} 