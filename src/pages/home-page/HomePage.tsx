import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import GameCard from '../../components/game-card/GameCard';
import './HomePage.scss'

const HomePage = () => {
    const [localItems, setLocalItems] = useState<{[key: string]: number[]}>();

    useEffect(() => {
        const playgroundScores = JSON.parse(localStorage.getItem('reactionPlaygroundScores') || "{}");
        if (playgroundScores) {
            setLocalItems(playgroundScores);
        }
    }, []);

    const gameInfo = [
        {
            route: "classic-colour-change",
            thumbnail: "classic-colour-change.gif",
            gameName: "CLASSIC COLOUR CHANGE",
            gameDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            bestScore: localItems ? (localItems["classic-colour-change"] ? localItems["classic-colour-change"][0] : "Not Set") : "Not Set",
        }
    ]

    return (
        <div className='HomePage'>
            <Helmet>
                <title>REACTION PLAYGROUND</title>
            </Helmet>
            <div className='homeTitle'>
                Test your reaction times with the games below!
            </div>
            <div className="gamesGrid">
                {gameInfo.map((game, index) => {
                    return (
                        <GameCard key={index} route={game.route} thumbnail={game.thumbnail} gameName={game.gameName} gameDesc={game.gameDesc} bestScore={game.bestScore} />
                    )
                })}
            </div>
            <div className='moreGamesTitle'>
                🚀 More games to be added in the future! 🚀
            </div>
        </div>
    )
}

export default HomePage;