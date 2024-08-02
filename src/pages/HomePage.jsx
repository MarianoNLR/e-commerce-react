import { useAuth } from "../components/AuthProvider.jsx"

export function HomePage () {
    const { user, loadingUser } = useAuth()
    
    if (loadingUser) {
        return <></>
    }

    return (
        <>
            <h1>Home Page</h1>
            <p>Welcome {user.username}</p>
        </>
    )
}