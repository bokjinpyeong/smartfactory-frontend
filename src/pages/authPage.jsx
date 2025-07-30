import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import AuthLayout from "../layouts/authLayout";
import AuthContainer from "../components/auth/authContainer";
import AuthScrollHelperComponent from "../components/auth/authScrollHelper";

function AuthPage() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  if (isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div
      className="h-screen w-screen flex bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.png')" }}
    >
      {/* ✅ 왼쪽 설명 영역 (스크롤 가능, 상대 위치 기준) */}
      <div className="w-4/7 overflow-y-auto max-h-screen pr-2 scrollbar-none relative">
        <style>
          {`
            .scrollbar-none::-webkit-scrollbar { display: none; }
            .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

        <div className="p-8">
          <AuthLayout />
        </div>

        {/* ✅ 설명 오른쪽 위에 붙은 고정 스크롤 버튼 */}
        <div className="absolute top-8 left-full ml-4 z-50">
          <AuthScrollHelperComponent />
        </div>
      </div>

      {/* 오른쪽 로그인 영역 */}
      <div className="w-3/7 flex items-center pl-16">
        <div className="w-full max-w-md ml-auto mr-16">
          <AuthContainer />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
