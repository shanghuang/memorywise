import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                <li><Link id="navbar-signin" href="/api/auth/signin">Sign In</Link></li>
                <li><Link id="navbar-signout" href="/api/auth/signout">Sign Out</Link></li>
                <li><Link href="/server">Server</Link></li>
                <li><Link href="/client">Client</Link></li>
                <li><Link href="/extra">Extra</Link></li>
                <li><Link href="/friends">Friends</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link id="navbar-register" href="/Register">Register</Link></li>
                <li><Link id="navbar-unregister" href="/Unregister">Unregister</Link></li>
            </ul>
        </nav>
    )
}

