import { JWTPayloadSpec } from "@elysiajs/jwt"

export interface PostTypes {
  body: {
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  },
  jwt?: {
    sign(payload: JWTPayloadSpec): Promise<string>,
    verify(payload: string): Promise<JWTPayloadSpec | false>
  }
}