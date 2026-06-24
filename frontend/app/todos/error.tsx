"use client"; 

import { useEffect } from "react";

export default function TodosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Todos 폴더 내부에서 에러가 발생했습니다:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f9f9fa] flex flex-col justify-center items-center px-4 font-sans">
      <div className="bg-white w-full max-w-[450px] p-[40px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] text-center">
        <div className="text-5xl mb-5">🚨</div>
        <h2 className="text-[#222222] text-2xl font-bold mb-3 tracking-tight">
          앗, 무언가 잘못되었습니다!
        </h2>
        <p className="text-[#64748b] text-sm mb-8 break-keep">
          데이터를 불러오거나 처리하는 중에 문제가 발생했습니다. 백엔드 서버가 정상적으로 켜져 있는지 확인해 주세요.
        </p>
        
        <button
          onClick={() => reset()}
          className="bg-[#672be0] text-white px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#521cb8] transition-colors duration-200"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}