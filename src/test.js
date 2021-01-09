import {useState, useEffect, findDOMNode, useRef} from 'react';
import getWords from './words';
import './test.css';
import Results from './Results.js'

export default function Test(){
    const C = ' correct';
    const I = ' incorrect';
    const CR =' current';
    const [firstLine, setFirstLine] = useState(getWords());
    const [secondLine, setSecondLine] = useState(getWords());
    const [wpm, setWpm] = useState(0);
    const [firstLineStatus, setFirstLineStatus] = useState([]);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('01');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(60);

    const [testResults, setTestResults] = useState([-1, -1, -1]);

    const txtInput = useRef(null);

    useEffect(()=>{
        let intervalId;

        if (isActive){
            intervalId = setInterval(()=> {
                if(counter === -1){
                    setIsActive(false);
                    setTestResults([wpm, correctChars, incorrectChars]);
                    return;
                }

                console.log(correctChars);
                if(counter < 60){
                    setWpm(Math.round((correctChars/5)/((60-counter)/60)));
                }
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter/60);

                let computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                    let computedMinute =
                        String(minuteCounter).length === 1
                            ? `0${minuteCounter}`
                            : minuteCounter;

                    setSecond(computedSecond);
                    setMinute(computedMinute);
                    setCounter((counter) => counter - 1);

            }, 1000);
        }

        return ()=> clearInterval(intervalId);
    }, [isActive, counter]);


    const firstRow = firstLine.map((word, index) => {
        let styling = 'test-word';

        if (index < firstLineStatus.length){

            styling = styling.concat(firstLineStatus[index] === 'c' ? C : I);

        }

        if(index === firstLineStatus.length){
            styling = styling.concat(CR);
        }

        return <span className={styling}>{word}</span>;
    });

    const secondRow = secondLine.map((word, index) => <span className="test-word">{word}</span>);

    function matchesCurrWord(word){
        return word.slice(0,-1) === firstLine[firstLineStatus.length];
    }

    function hammingDistanceCurrWord(word){
        let mismatches = 0;

        for(let i = 0; i <= firstLine[firstLineStatus.length].length; i++){
            if(firstLine[firstLineStatus.length][i] != word[i] ){
                mismatches++;
            }
        }
        return mismatches-1;
    }

    function handleInputChange(e){
        if(counter === -1){
            e.target.blur();
            return;
        }
        if (e.target.value === ' '){
            e.target.value = '';
        }
        if (!isActive) {setIsActive(true)};
        if (e.target.value.includes(' ')){


            setFirstLineStatus([...firstLineStatus, matchesCurrWord(e.target.value) ? 'c': 'i'])

            setCorrectChars(correctChars + (firstLine[firstLineStatus.length].length - hammingDistanceCurrWord(e.target.value)));
            setIncorrectChars(incorrectChars + hammingDistanceCurrWord(e.target.value));

            if(firstLineStatus.length+1 === firstLine.length){

                setFirstLine(secondLine);
                setSecondLine(getWords());
                setFirstLineStatus([]);
            }
            e.target.value = '';
        }

    }

    function handleResetClick(){
        setFirstLine(getWords());
        setSecondLine(getWords());
        setWpm(0);
        setFirstLineStatus([]);
        setCorrectChars(0);
        setSecond('00');
        setMinute('1');
        setIsActive(false);
        setCounter(60);
        txtInput.current.value='';
        txtInput.current.focus();
    }


    return(
        <>
            <div id="text-container">
                {firstRow}
                <br/>
                {secondRow}
            </div>
            <div id="input-bar">
                <input id="text-input" type="text" onChange={handleInputChange} ref={txtInput} autoFocus/>
                <div id="wpm">
                    {wpm} wpm
                </div>
                <div id="timer">
                    <span>{minute}</span>
                    <span>:</span>
                    <span>{second}</span>
                </div>
                <button id="reset-btn" onClick={()=>handleResetClick()}>
                    <img src="/reset_icon.png" width="35" height="35"/>
                </button>
            </div>
            <Results testResults={testResults}/>

        </>
    );





}
