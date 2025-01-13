import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PostsPage from "./pages/posts/PostsPage";
import CreatePage from "./pages/posts/CreatePage";
import DetailPage from "./pages/posts/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import GlobalContext from "./contexts/GlobalContext";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all")
  const [tag, setTag] = useState([])

  useEffect(() => {
    getPosts();
  }, [filter])

  useEffect(() => {
    getTags();
  }, []);

  const getPosts = () => {
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
    axios.delete(`${apiUrl}/posts/${postToRemove.id}`)
      .then(() => {
        setPosts(posts.filter((curPost) => curPost.id !== postToRemove.id));
      })
      .catch((err) => {
        console.error("Errore durante la cancellazione del post:", err);
      });
  };

  const paths = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/posts",
      title: "Posts",
    },
    {
      path: "/about",
      title: "About",
    },
  ]

  const globalProviderValue = {
    paths,
    posts,
    filter,
    tag,
    setFilter,
    removePost,
  }

  return (
    <>
      <GlobalContext.Provider value={globalProviderValue}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts">
                <Route index element={<PostsPage />} />
                <Route path="create" element={<CreatePage />} />
                <Route path=":id" element={<DetailPage />} />
              </Route>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  )
}

export default App;
