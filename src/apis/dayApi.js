// ✅ [샘플 기능] -------------------------------------------

// 요일 자동 계산 (한글)
function getKoreanWeekday(dateString) {
  const dayIndex = new Date(dateString).getDay();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return weekdays[dayIndex];
}

// 1년치 샘플 생성 (2024-07-01 ~ 2025-06-30)
export function generateSampleMonthlyData() {
  const data = [];
  const start = new Date("2024-07-01");
  const end = new Date("2025-06-30");
  let date = new Date(start);

  while (date <= end) {
    const isoDate = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    data.push({
      date: isoDate,
      power: Math.floor(180 + Math.random() * 150),
      weekday: getKoreanWeekday(isoDate),
    });
    date.setDate(date.getDate() + 1);
  }
  return data;
}

// 샘플 데이터 가져오기(비동기처럼 사용)
export const fetchMonthlyData = async () => {
  // 👉 샘플 데이터만 반환
  return Promise.resolve(generateSampleMonthlyData());
};

/* 
// ✅ [실제 가져오기 기능] (주석 처리)
export const fetchMonthlyData = async () => {
  const res = await fetch('/api/power-data/monthly');
  const data = await res.json();
  // weekday가 없으면 자동 추가
  return data.map(item => ({
    ...item,
    weekday: item.weekday || getKoreanWeekday(item.date),
  }));
};
*/

/*
// axios 방식 예시 (주석 처리)
import axios from "axios";
export const fetchMonthlyData = async () => {
  const res = await axios.get('/api/power-data/monthly');
  const data = res.data;
  return data.map(item => ({
    ...item,
    weekday: item.weekday || getKoreanWeekday(item.date),
  }));
};
*/

