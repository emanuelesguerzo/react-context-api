import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

function DetailPage() {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${apiUrl}/posts/${id}`)
            .then((resp) => {
                setPosts(resp.data)
            })
            .catch((err) => {
                if(err.status === 404) {
                    navigate("/not-found")
                }
            })
    }, [id])

    const getImgSrc = (path) => {

        if (!path) {
            return "https://placehold.co/600x400";
        }

        if (path.startsWith("http://") || path.startsWith("https://")) {
            return path;
        } else {
            return `${apiUrl}/${path}`;
        }
    }

    return (

        <main>

            <div className="page-header container">
                <button className="btn-back" onClick={() => navigate("/posts")}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h2>Dettagli del Post numero {id}</h2>
            </div>

            <div className="detail-page">

                <h3>
                    {posts.title}
                </h3>

                <div className="detail-page-image-container">
                    <img className="" src={getImgSrc(posts.image)} alt="Immagine del Post" />
                </div>


                <p>
                    {'"' + posts.content + '"'}
                </p>


                <div className="prev-next-container">
                    <Link className="btn-prev" to={`/posts/${posts.id - 1}`}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <Link className="btn-next " to={`/posts/${posts.id + 1}`}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>

            </div>

        </main>
    )
}

export default DetailPage;