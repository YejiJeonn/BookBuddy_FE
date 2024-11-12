import {useEffect, useState} from "react";
import axios from "axios";
import '../components/CssReadHistory.scss'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ReadHistory() {
    const [readingTimes, setReadingTimes] = useState([]);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchReadingTimes();
    }, []);

    const fetchReadingTimes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/reading-times", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const readingData = response.data;

            // 각 도서의 커버 이미지를 불러오는 API 호출
            const updatedReadingData = await Promise.all(
                readingData.map(async (book) => {
                    const coverResponse = await fetchBookCover(book.bookIsbn);
                    /*console.log(book.bookIsbn);*/
                    return {
                        ...book,
                        cover: coverResponse, // 가져온 cover 이미지 URL 추가
                    };
                })
            );

            setReadingTimes(response.data);
            processChartData(response.data);
        } catch (error) {
            console.error("Error fetching reading times:", error);
            setError("데이터를 불러오는데 실패했습니다.");
        }
    };

    const [book, setBook] = useState('');

    // 특정 isbn으로 책 커버 이미지 가져오기
    const fetchBookCover = async (isbn) => {
        try {
            // API 호출 시 올바른 매개변수 이름과 값 전달
            const response = await axios.get("http://localhost:8080/api/book-detail", {
                params: {itemId: isbn} // 매개변수 이름을 서버가 기대하는 대로 수정
            });

            // 응답 데이터 구조 확인
            console.log(response.data); // 응답 데이터의 구조를 확인
            return setBook(response.data.item[0]) || ""; // cover가 존재하지 않으면 빈 문자열 반환
        } catch (error) {
            console.error("Error fetching book cover:", error);
            return ""; // 오류 시 빈 문자열 반환
        }
    };

    // 날짜별로 그룹화하여 총 독서 시간 계산
    const processChartData = (data) => {
        const dateMap = {};

        data.forEach(record => {
            const date = new Date(record.createdAt).toLocaleDateString();
            if (dateMap[date]) {
                dateMap[date] += record.totalTime;
            } else {
                dateMap[date] = record.totalTime;
            }
        });

        // 날짜와 독서 시간을 배열로 변환
        const dates = Object.keys(dateMap);
        const totalTimes = Object.values(dateMap);

        setChartData({
            labels: dates,
            datasets: [
                {
                    label: "날짜별 총 독서 시간 (초)",
                    data: totalTimes,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75,192,192,0.2)",
                    fill: true,
                },
            ],
        });
    };

    return (
        <div className="history-container">
            <h1>독서 기록 목록</h1>
            {error && <p style={{color: "red"}}>{error}</p>}

            {/* 날짜별 총 독서 시간 그래프 */}
            <div className="chart-container">
                <Line data={chartData} options={{responsive: true, plugins: {legend: {position: 'top'}}}}/>
            </div>

            {/* 독서 기록 목록 */}
            <div className="card-list">
                {readingTimes.map((book) => (
                    <div className="card" key={book.id}>
                        <img
                            src={book?.cover} // API 호출을 통해 받아온 cover 이미지
                            alt={book.bookTitle}
                            className="book-cover"
                        />
                        <div className="card-content">
                            <h3 className="book-title">{book.bookTitle}</h3>
                            {/*<p><strong>사용자 ID:</strong> {book.userId}</p>*/}
                            <p><strong>생성 날짜:</strong> {new Date(book.createdAt).toLocaleDateString()}</p>
                            <p><strong>시작 시간:</strong> {new Date(book.startTime).toLocaleTimeString()}</p>
                            <p><strong>종료 시간:</strong> {new Date(book.endTime).toLocaleTimeString()}</p>
                            <p><strong>총 읽은 시간:</strong> {book.totalTime} 초</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReadHistory;