import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <>
            <main>
                <div className="page-header container">
                    <button className="btn-back" onClick={() => navigate(-2)}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    <h2>Errore</h2>
                </div>
                <div className="error-container">
                    <h2 className="error-message">Ooops, qualcosa e' andato storto. <br /> Pagina non trovata!<br /> "Errore 404"</h2>

                    <button className="btn-home" onClick={() => navigate("/posts")}>
                        Torna ai Post
                    </button>
                </div>
            </main>
        </>
    )
}

export default NotFoundPage;