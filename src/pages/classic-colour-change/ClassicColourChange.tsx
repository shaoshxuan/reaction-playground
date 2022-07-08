import classNames from 'classnames';
import { useEffect, useState } from 'react';
import GameInfoContainer from '../../components/game-info-container/GameInfoContainer';
import './ClassicColourChange.scss';
import { Helmet } from 'react-helmet'

const ClassicColourChange = () => {
    const [localItems, setLocalItems] = useState<{[key: string]: number[]}>(JSON.parse(localStorage.getItem('reactionPlaygroundScores') || "{}"));
    const [detectChange, toggleChangeDetection] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem('reactionPlaygroundScores', JSON.stringify(localItems));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detectChange])

    const [gameStarted, toggleGameStart] = useState<boolean>(false)
    const [changed, toggleChange] = useState<boolean>(false);
    const [reactionTime, setReactionTime] = useState<number | boolean | string>(false);
    const [countDownTimer, setCountDownTimer] = useState<any>();
    const [startTime, setStartTime] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();

    const minSeconds = 1000;
    const maxSeconds = 8000;

    useEffect(() => {
        endTime && startTime && setReactionTime((endTime.getTime()-startTime.getTime())/1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endTime])

    useEffect(() => {
        if (typeof(reactionTime) === "number"){
            let tempScoreArr = localItems;
            if (tempScoreArr && !("classic-colour-change" in tempScoreArr)){
                tempScoreArr["classic-colour-change"] = [reactionTime];
                setLocalItems(tempScoreArr);
                toggleChangeDetection(!detectChange)
            } else if (tempScoreArr && tempScoreArr["classic-colour-change"].length < 10){
                tempScoreArr["classic-colour-change"].push(reactionTime);
                tempScoreArr["classic-colour-change"].sort();
                setLocalItems(tempScoreArr);
                toggleChangeDetection(!detectChange)
            } else {
                if (tempScoreArr && tempScoreArr["classic-colour-change"][9] > reactionTime){
                    tempScoreArr["classic-colour-change"].pop();
                    tempScoreArr["classic-colour-change"].push(reactionTime);
                    tempScoreArr["classic-colour-change"].sort();
                    setLocalItems(tempScoreArr);
                    toggleChangeDetection(!detectChange)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reactionTime])

    const startGame = () => {
        toggleChange(true);
        setStartTime(new Date());
    }

    const endGame = () => {
        if (changed){
            setEndTime(new Date());            
            toggleGameStart(false);
        } else {
            setCountDownTimer(clearTimeout(countDownTimer));
            toggleGameStart(false);
            setReactionTime(`Too early!\nStop Guessing!`);
        }
    }

    const readyUp = () => {
        toggleChange(false);
        setReactionTime(false);
        toggleGameStart(true);
        setCountDownTimer(setTimeout(
            startGame, 
            Math.floor(Math.random()*(maxSeconds-minSeconds+1))+minSeconds
        ));
    }

    return (
        <div className='ClassicColourChange'>
            <Helmet>
                <title>REACTION PLAYGROUND | Classic Colour Change</title>
            </Helmet>
            <GameInfoContainer gameName={"Classic Colour Change"} gameInstructions={"Click on circle when color turns green!"} />
            <div className='gameArea'>
                <div className={classNames('reactionCircle', changed && "colourChanged")} style={gameStarted ? {"cursor": "pointer"} : {"cursor": "default"}}
                    onClick={() => {
                        gameStarted
                        &&
                        endGame()
                    }}
                >
                </div>
                <div className="inCircleControls">
                    {
                        reactionTime
                        &&
                        <div className='reactionTime'>
                            {typeof(reactionTime) === "number" ? `Your reaction time:\n${reactionTime}s` : reactionTime}
                        </div>
                    }
                    {
                        !gameStarted
                        &&
                        <div className='readyBtn' onClick={() => readyUp()}>
                            {
                                reactionTime
                                ?
                                "TRY AGAIN"
                                :
                                "READY"
                            }
                        </div>
                    }
                    
                </div>
            </div>
            <div className='scoreBoard'>
                <div className='scoreboardTitle'>
                    Your 10<br/>Best Times
                </div>
                <div className='top10Scores'>
                    {localItems["classic-colour-change"] && localItems["classic-colour-change"].map((time, index) => {
                        return (
                            <div className="indivScores" key={index}>{index+1}. {time}s</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ClassicColourChange;