import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Posts from "./(global)/Posts"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session ? (
        <Posts/>
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </>
  );
}
