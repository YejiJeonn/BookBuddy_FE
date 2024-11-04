import React, {useState} from 'react';
import axios from 'axios';
import {useTimer} from './TimerContext';
import '../components/CssTimer.scss';

const TimerPage = () => {
    const {
        isStopwatchRunning,
        setIsStopwatchRunning,
        stopwatchTime,
        setStopwatchTime,
        isTimerRunning,
        setIsTimerRunning,
        timerTime,
        setTimerTime,
        userInput,
        setUserInput,
        isTimerInitialized,
        setIsTimerInitialized,
    } = useTimer();

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // 스톱워치 기능
    const toggleStopwatch = () => {
        setIsStopwatchRunning(!isStopwatchRunning);
        if (!isStopwatchRunning) {
            setStartTime(new Date()); // 시작 시간 설정
        } else {
            setEndTime(new Date()); // 종료 시간 설정
        }
    };

    const resetStopwatch = () => {
        setIsStopwatchRunning(false);
        setStopwatchTime(0);
        setStartTime(null);
        setEndTime(null);
    };

    // 저장 버튼 클릭 시 읽기 시간 저장
    const saveReadingTime = async () => {
        const userId = 1; // 사용자 ID (로그인 상태라면 실제 ID로 대체)
        const readingTime = stopwatchTime || (timerTime - userInput * 60000); // 경과 시간
        const startDate = startTime ? startTime.toISOString() : null;
        const endDate = endTime ? endTime.toISOString() : null;

        try {
            await axios.post("http://localhost:8080/api/save-reading-time", {
                userId,
                startDate,
                endDate,
                readingTime,
            });
            alert("독서 시간이 저장되었습니다!");
        } catch (error) {
            console.error("Error saving reading time:", error);
            alert("저장에 실패했습니다.");
        }
    };

    return (
        <div className="content">
            {/*기록 측정 시 유의 사항*/}
            <div>
                <h2>유의사항</h2>
                <p>
                    페이지 이동 시 진행된 타이머 혹은 스톱워치의 시간은 일시적으로 저장되지만<br/>
                    다시 시작하게되면 <strong>초기화</strong>됩니다. <br/>
                    독서 기록 중에는 페이지를 이동하지 마시고 독서에만 집중해주세요. <br/>
                    불가피하게 페이지를 이동하게 될 경우 하단의 <strong>'저장'</strong>버튼을 꼭 눌러주세요.
                </p>
            </div>

            <h1>Stopwatch</h1>
            <div className="timerDisplay">
                <span>{formatTime(stopwatchTime)}</span>
            </div>
            <button onClick={toggleStopwatch} className="btn">
                {!isStopwatchRunning ? 'Start' : 'Stop'}
            </button>
            <button onClick={resetStopwatch} className="btn">
                Reset
            </button>

            {/* 저장 버튼 추가 */}
            <div style={{marginTop: '30px'}}>
                <button onClick={saveReadingTime} className="btnSave">
                    저장
                </button>
            </div>
        </div>
    );
};

export default TimerPage;
