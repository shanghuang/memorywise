
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import {connectMongoDB} from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        //const { email, password } = credentials;

        try {
          await connectMongoDB();

          const user = await User.findOne({email: credentials?.email});

          if (!user) {
            console.log(credentials?.email + " not foundt");
            return null;
          }

          console.log("user: " + user);
          console.log(credentials?.email + " password:" + credentials?.password);
          //const encodedPassword = encode_password(credentials?.password as string);

          const passwordsMatch = await bcrypt.compare(credentials?.password, user.password);
          //const passwordsMatch = encodedPassword === user.password;
           
          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, user, token }: any) {
      console.log("session--->");
      console.log(session);
      console.log(user);
      console.log(token);
      console.log("session<");
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.oktaId = token.oktaId;
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
            