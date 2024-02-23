import './App.css'
import { TwitterFollowCard } from "./TwitterFollowCard";


// List of users gotten from another method

const users = [
    {
        personName: "Jesus Daniel",
        username: "jesus",
        initialIsFollowing: false,
        education: "BSc"
    },
    {
        personName: "Jose Dario",
        username: "jose",
        initialIsFollowing: true,
        education: "BSc"
    },
    {
        personName: "Julian David",
        username: "julian",
        initialIsFollowing: true,
        education: "PhD"
    }
]

export function App (){
    const functionOnName = (username) => `@${username}`
    
    return(
        <section className='App'>
            {
                users.map((user) => {
                    return(
                    <TwitterFollowCard
                        key={user.username} /*SHOULD BE UNIQUE*/
                        functionOnName={functionOnName}
                        personName={user.personName}
                        username={user.username}
                        initialIsFollowing={user.initialIsFollowing}>
                            {user.education}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}