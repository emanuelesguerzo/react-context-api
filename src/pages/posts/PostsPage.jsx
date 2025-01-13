import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import AppCard from "../../components/AppCard";
const apiUrl = import.meta.env.VITE_API_URL;

function PostsPage() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("all")
    const [tag, setTag] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getPosts();
    }, [filter])

    useEffect(() => {
        getTags();
    }, []);

    const getPosts = (resp) => {
        let url = `${apiUrl}/posts`;

        if (filter !== "all") {
            url += `?tags=${filter}`;
        }

        axios.get(url)
            .then((resp) => {
                setPosts(resp.data.data)

            })
            .catch((err) => {
                console.error("Errore durante il recupero dati:", err)
            })
    }

    const getTags = () => {
        axios.get(`${apiUrl}/tags`)
            .then((resp) => {
                setTag(resp.data.tags)
            })
    }

    const removePost = (postToRemove) => {
        axios.delete(`http://localhost:3000/posts/${postToRemove.id}`)
            .then(() => {
                setPosts(posts.filter((curPost) => curPost.id !== postToRemove.id));
            })
            .catch((err) => {
                console.error("Errore durante la cancellazione del post:", err);
            });
    };

    return (
        <>
            <main>

                <div className="page-header container">
                    <button className="btn-back" onClick={() => navigate("/")}>
                        <i className="fa-solid fa-arrow-left"></i> Home
                    </button>

                   <h2>I tuoi Post</h2>
                </div>

                <Link className="btn-new container" to="/posts/create">
                   + Aggiungi nuovo post
                </Link>

                <section className="input-container filter container row">
                    <label htmlFor="tags">Filtra per Tag</label>
                    <select
                        name="tags"
                        id=""
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                    >
                        <option value="all">Tutti</option>
                        {tag.map((curTag, index) => <option key={index} value={curTag}>{curTag}</option>)}
                    </select>
                </section>

                <section>
                    {posts.length > 0 ? (
                        <ul className="container row">
                            {posts.map((curPost) => (
                                <AppCard
                                    key={curPost.id}
                                    curPost={curPost}
                                    onRemove={() => {
                                        removePost(curPost)
                                    }}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-list container row">
                            La tua lista è vuota! Aggiungi qualche Post!
                        </p>
                    )}
                </section>
            </main>

        </>
    )
}

export default PostsPage;