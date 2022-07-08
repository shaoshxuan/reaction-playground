import { useNavigate } from 'react-router-dom';
import './GameCard.scss';

interface GameProps {
    route: string,
    thumbnail: string,
    gameName: string,
    gameDesc: string,
    bestScore: number | string,
}

const GameCard = ({route, thumbnail, gameName, gameDesc, bestScore}: GameProps) => {
    const navigate = useNavigate();
    
    return (
        <div className="GameCard" onClick={() => navigate(`/${route}`)}>
            <div className="gameThumbnail">
                <img src={`./gifs/${thumbnail}`} alt={`${gameName} Thumbnail`} />
            </div>
            <div className='gameInfo'>
                <div className='gameName'>
                    {gameName}
                </div>
                <div className='gameDesc'>
                    {gameDesc}
                </div>
                <div className='bestScore'>
                    Your Best: {bestScore} {typeof(bestScore) === "number" && "s"}
                </div>
            </div>
        </div>
    )
}

export default GameCard;