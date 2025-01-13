import { useNavigate } from "react-router-dom";

function AboutPage() {
    const navigate = useNavigate();

    return (
        <main>

            <div className="page-header container">
                <button className="btn-back" onClick={() => navigate("/")}>
                    <i className="fa-solid fa-arrow-left"></i> Home
                </button>

                <h2>Su di noi!</h2>
            </div>
        </main>
    )
}

export default AboutPage;