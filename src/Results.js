import './Results.css';
export default function Results(props){

    const {testResults} = props;

    let wpm, correctChars, incorrectChars, accuracy, gwpm;
    if(JSON.stringify([-1, -1, -1])==JSON.stringify(testResults)){
         wpm = "-";
         correctChars = "-";
         incorrectChars = "-";
         accuracy = "-";
         gwpm = "-";
    }else{

         wpm = testResults[0];
         correctChars = testResults[1];
         incorrectChars = testResults[2];
         gwpm = (correctChars + incorrectChars) / 5;
         accuracy = Number(((correctChars/(correctChars + incorrectChars)) * 100).toFixed(2));

    }


    return(
            <div id="results">
                <span>
                    <span id="wpm-result">{wpm} wpm</span>
                </span>

                <ul id="results-list">
                    <li>
                        <span>Gross wpm</span>
                        <span>{gwpm}</span>

                    </li>

                    <li>
                        <span>Accuracy</span>
                        <span>{accuracy} %</span>

                    </li>

                    <li>
                        <span>Correct Characters</span>
                        <span className="correct">{correctChars}</span>
                    </li>

                    <li>
                        <span>Incorrect Characters</span>
                        <span className="incorrect">{incorrectChars}</span>
                    </li>

                </ul>
            </div>
    );
}
