// rfc emmet abbr (React Functional Component)
import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import home.css
import '../css/home.css'




export default function Home(props) {
    return (
        <>
            <Navbar />
            <div className = 'postsContainer'>
                {/* <Posts /> */}
            </div>
        </>
    )
}