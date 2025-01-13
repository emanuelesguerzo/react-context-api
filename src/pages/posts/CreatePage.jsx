import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const initialPostData = {
    title: "",
    content: "",
    image: "",
    tags: [],
}

const availableTags = [
    "Dolce",
    "Primo",
    "Rustico",
    "Tradizionale",
    "Snack",
    "Salato",
    "Fritto",
    "Semplice",
    "Colazione",
    "Vegetariano",
    "Colorato",
]

function CreatePage() {
    const [newPost, setNewPost] = useState(initialPostData);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

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

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;

        setNewPost((curPost) => ({
            ...curPost,
            [name]: newValue,
        }));
    };

    const handleNewPostSubmit = (event) => {
        event.preventDefault();

        if (newPost.title.trim() === "" || posts.some((curPost) => curPost.title === newPost.title)) {
            const message = newPost.title.trim() === ""
                ? "Aggiungi un titolo"
                : "Titolo già presente";
            return alert(message);
        }

        axios.post("http://localhost:3000/posts", newPost)
            .then((resp) => {
                const createdPostId = resp.data.id;
                navigate(`/posts/${createdPostId}`)
            })
            .catch((err) => {
                console.error("Errore durante l'invio del post:", err)
            })
    }
        return (
            <>
            <div className="page-header container">
                <button className="btn-back" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h2>Crea il tuo post!</h2>
            </div>
            

            <form action="" className="form-container container" onSubmit={handleNewPostSubmit}>

                {/* Title Input */}
                <div className="input-container post-title">
                    <label htmlFor="PostName">Titolo</label>
                    <input
                        type="text"
                        placeholder="Titolo del Post"
                        id="PostName"
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Image Input */}
                <div className=" input-container post-image">
                    <label htmlFor="PostImage">URL Immagine</label>
                    <input
                        type="text"
                        placeholder="URL Immagine del Post"
                        id="PostImage"
                        name="image"
                        value={newPost.image}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Content Input */}
                <div className="input-container post-content">
                    <label htmlFor="PostContent">Contenuto</label>
                    <textarea
                        rows="4"
                        type="text"
                        placeholder="Contenuto del Post..."
                        id="PostContent"
                        name="content"
                        value={newPost.content}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* Tags Checkboxes */}
                <div className="input-container post-tags">
                    <label htmlFor="TagContainer">Tag</label>
                    <div className="tag-container" id="TagContainer">
                        {availableTags.map((curTag) => (
                            <div key={curTag} className="inputTag-container">
                                <input
                                    className=""
                                    type="checkbox"
                                    id={curTag}
                                    name="tags"
                                    value={curTag}
                                    checked={newPost.tags.includes(curTag)}
                                    onChange={(event) => {
                                        const { value, checked } = event.target;

                                        setNewPost((curPost) => ({
                                            ...curPost,
                                            tags: checked
                                                ? [...curPost.tags, value]
                                                : curPost.tags.filter((curTag) => curTag !== value),
                                        }));
                                    }}
                                />
                                <div className={`tag ${curTag.toLowerCase()}`}>
                                    {curTag}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn submit"
                >
                    Crea Post
                </button>

            </form>
            </>
        )
    }



export default CreatePage;