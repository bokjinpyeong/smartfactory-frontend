// 📄 파일: src/components/menu/leftMenu.jsx
// 📌 좌측 메뉴바 (TopMenu에 가려지지 않도록 top offset 및 높이 설정)

import { NavLink } from "react-router-dom";

function LeftMenuComponent() {
  const linkClass =
    "flex flex-col items-center space-y-1 text-white px-2 py-4 hover:bg-gray-700 rounded transition text-sm";

  const iconStyle = "w-12 h-12";

  return (
    <div className="bg-gray-900 text-white w-24 h-full pt-16 fixed left-0 top-0 z-30 flex flex-col items-center space-y-4">
      {/* ⬆ pt-16: TopMenu 높이만큼 위에 여백을 줘서 겹치지 않도록 함 */}

      <NavLink
        to="/power"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? "bg-gray-700 font-semibold" : ""}`
        }
      >
        <img src="/icons/power.png" alt="전력 소비" className={iconStyle} />
        <span>전력 소비</span>
      </NavLink>

      <hr className="w-10 border-gray-600" />

      <NavLink
        to="/realtime"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? "bg-gray-700 font-semibold" : ""}`
        }
      >
        <img src="/icons/realtime.png" alt="실시간 상황" className={iconStyle} />
        <span>실시간 상황</span>
      </NavLink>

      <hr className="w-10 border-gray-600" />

      {/* 🆕 솔루션 메뉴 추가 */}
      <NavLink
        to="/solution"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? "bg-gray-700 font-semibold" : ""}`
        }
      >
        <img src="/icons/solution.png" alt="솔루션" className={iconStyle} />
        <span>솔루션</span>
      </NavLink>
    </div>
  );
}

export default LeftMenuComponent;
