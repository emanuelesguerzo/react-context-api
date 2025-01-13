import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";
import AppCard from "../components/AppCard";


function PostsList() {

    const globalProviderValue = useContext(GlobalContext);
    const {posts, removePost} = globalProviderValue;

    return (

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
    )
}

export default PostsList;