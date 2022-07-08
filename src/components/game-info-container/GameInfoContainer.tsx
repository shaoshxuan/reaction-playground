import "./GameInfoContainer.scss"

interface GameInfoContainerProps {
    gameName: string,
    gameInstructions: string,
}

const GameInfoContainer = ({gameName, gameInstructions}: GameInfoContainerProps) => {
    return (
        <div className="GameInfoContainer">
            <div className='gameTitle'>
                {gameName}
            </div>
            <div className='gameInstructions'>
                {gameInstructions}
            </div>
        </div>
    )
}

export default GameInfoContainer;