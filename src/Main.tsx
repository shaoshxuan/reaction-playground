import './Main.scss';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import AppRoutes from './pages/AppRoutes';

const Main = () => {
    return (
        <div className="Main">
            <Header />
            <AppRoutes />
            <Footer />
        </div>
    )
}

export default Main;