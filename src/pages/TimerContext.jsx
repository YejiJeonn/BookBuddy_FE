import React, {createContext, useContext, useEffect, useState} from 'react';

const TimerContext = createContext();

export const TimerProvider = ({children}) => {
    const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
    const [stopwatchTime, setStopwatchTime] = useState(0); // 항상 0으로 초기화

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerTime, setTimerTime] = useState(300000); // 기본 5분
    const [userInput, setUserInput] = useState(5); // 분 단위

    const [isTimerInitialized, setIsTimerInitialized] = useState(false);

    // 스톱워치 기능
    useEffect(() => {
        let interval;
        if (isStopwatchRunning) {
            interval = setInterval(() => {
                setStopwatchTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStopwatchRunning]);

    return (
        <TimerContext.Provider
            value={{
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
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
