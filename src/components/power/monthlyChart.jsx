// 📄 파일: src/components/power/monthlyChart.jsx
// 📊 월간 전력 소비 차트 (요일 포함, 색상별 피크 강조 + 하단 표)

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { usePowerChart } from "../../contexts/PowerChartContext";

function MonthlyChartComponent() {
  const { monthlyData } = usePowerChart();

  // 🔍 정렬하여 상위 7개 추출
  const sorted = [...monthlyData].sort((a, b) => b.power - a.power);
  const top3 = sorted.slice(0, 3).map((d) => d.date);
  const top7 = sorted.slice(0, 7);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">📅 월간 전력 소비 추이</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(v) => `${v}일`} />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value} kWh`, "소비량"]}
            labelFormatter={(label) => {
              const item = monthlyData.find((d) => d.date === label);
              return `${label}일 (${item?.weekday})`;
            }}
          />
          <Line
            type="monotone"
            dataKey="power"
            stroke="#8884d8"
            strokeWidth={2}
            dot={({ cx, cy, payload }) => {
              const isTop3 = top3.includes(payload.date);
              const isTop7 = top7.find((d) => d.date === payload.date);
              const color = isTop3
                ? "#ff4d4f" // 🔴 빨강
                : isTop7
                ? "#f97316" // 🧡 진한 주황
                : "#facc15"; // 🟡 노랑
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={1}
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 📋 하단 표: TOP 7 */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">🔥 전력 소비 TOP 7</h3>
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">순위</th>
              <th className="border px-2 py-1">날짜</th>
              <th className="border px-2 py-1">요일</th>
              <th className="border px-2 py-1">소비량</th>
            </tr>
          </thead>
          <tbody>
            {top7.map((item, idx) => (
              <tr
                key={item.date}
                className={
                  idx < 3
                    ? "bg-red-100"
                    : "bg-orange-100"
                }
              >
                <td className="border px-2 py-1">{idx + 1}위</td>
                <td className="border px-2 py-1">{item.date}일</td>
                <td className="border px-2 py-1">{item.weekday}</td>
                <td className="border px-2 py-1">{item.power} kWh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyChartComponent;
