import {useState} from 'react';
import getWords from './words';
import './test.css';

export default function Test(){
    const C = ' correct';
    const I = ' incorrect';
    const CR =' current';
    const [firstLine, setFirstLine] = useState(getWords());
    const [secondLine, setSecondLine] = useState(getWords());
    const [wpm, setWpm] = useState(0);
    const [firstLineStatus, setFirstLineStatus] = useState([]);

    const firstRow = firstLine.map((word, index) => {
        let styling = 'test-word';

        if (index < firstLineStatus.length){

            styling = styling.concat(firstLineStatus[index] == 'c' ? C : I);

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

    function handleInputChange(e){
        if (e.target.value === ' '){
            e.target.value = '';
        }
        if (e.target.value.includes(' ')){

            setFirstLineStatus([...firstLineStatus, matchesCurrWord(e.target.value) ? 'c': 'i'])

            console.log(firstLineStatus.length);
            console.log(firstLine.length);
            if(firstLineStatus.length+1 === firstLine.length){
                console.log('hit');
                setFirstLine(secondLine);
                setSecondLine(getWords());
                setFirstLineStatus([]);
            }
            e.target.value = '';
        }

    }

    return(
        <>
            <div id="text-container">
                {firstRow}
                <br/>
                {secondRow}
            </div>
            <div id="input-bar">
                <input id="text-input" type="text" onChange={handleInputChange}/>
                <div id="wpm">
                    {wpm} wpm
                </div>
                <div id="timer">
                    1:00
                </div>
                <button id="reset-btn">
                    Reset
                </button>
            </div>

        </>
    );





}
