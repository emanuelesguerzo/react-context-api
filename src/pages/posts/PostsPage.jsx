import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostsList from "../../components/PostsList";
import GlobalContext from "../../contexts/GlobalContext";

function PostsPage() {

    const navigate = useNavigate();
    const globalProviderValue = useContext(GlobalContext);
    const {filter, setFilter, tag} = globalProviderValue;

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

                <PostsList />
            </main>

        </>
    )
}

export default PostsPage;