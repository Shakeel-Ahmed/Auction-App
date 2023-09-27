import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import goBack from "../images/back.svg";

function ErrorPage() {

    const navigate = useNavigate();
    return(<>
        <Header />
        <div style={{minHeight: 'calc(100vh - 140px)'}}>
                <div className="row p-5">
                    <div className="col-12 text-center">
                        <img src="https://cdn4.iconfinder.com/data/icons/web-design-and-development-8-2/128/390-512.png"
                             alt="Error 404"
                        style={{maxWidth:'300px'}}/>
                    </div>
                </div>
                <h2 className="text-center">The webpage you are looking for doesn't exist</h2>
                <p className="text-center">
                    <img src={ goBack }
                         alt="back button"
                         style={{ width: '80px'}}
                         onClick={ navigate.bind(null, -1) }
                    />
                </p>
            </div>
        <Footer />
    </>);
}

export default ErrorPage;