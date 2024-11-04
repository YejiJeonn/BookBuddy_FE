import React, {createContext, useContext, useEffect, useState} from 'react';

const TimerContext = createContext();

export const TimerProvider = ({children}) => {
    const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
    const [stopwatchTime, setStopwatchTime] = useState(() => {
        const savedTime = localStorage.getItem('stopwatchTime');
        return savedTime ? parseInt(savedTime, 10) : 0;
    });

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerTime, setTimerTime] = useState(() => {
        const savedTimerTime = localStorage.getItem('timerTime');
        return savedTimerTime ? parseInt(savedTimerTime, 10) : 300000; // 기본 5분
    });

    const [userInput, setUserInput] = useState(() => {
        const savedUserInput = localStorage.getItem('userInput');
        return savedUserInput ? parseInt(savedUserInput, 10) : 5; // 분 단위
    });
    const [isTimerInitialized, setIsTimerInitialized] = useState(false);

    // 스톱워치 기능
    useEffect(() => {
        let interval;
        if (isStopwatchRunning) {
            interval = setInterval(() => {
                setStopwatchTime((prevTime) => {
                    const updatedTime = prevTime + 1000;
                    localStorage.setItem('stopwatchTime', updatedTime);
                    return updatedTime;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStopwatchRunning]);

    // 페이지 로드 시 로컬 스토리지에서 userInput을 불러옴
    useEffect(() => {
        localStorage.setItem('userInput', userInput);
    }, [userInput]);

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
