import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const ADMIN_LOGIN = process.env.ADMIN_LOGIN ?? "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        login: { label: "Login" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (
          credentials.login === ADMIN_LOGIN &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin" }
        }
        return null
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
})
