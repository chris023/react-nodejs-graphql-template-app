import { Secret } from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ACCESS_TOKEN_SECRET: string
            DATABASE_NAME: string
            DATABASE_USER: string
            DATABASE_PASSWORD: string
            DATABASE_URL: string
            PORT?: string
        }
    }
}

export {}
