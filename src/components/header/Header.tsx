import { useNavigate } from 'react-router-dom';
import './Header.scss'

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="Header" onClick={() => navigate("/")}>
            <div className="reactionPlaygroundTitle">
                REACTIONPLAYGROUND
            </div>
        </div>
    )
}

export default Header;
