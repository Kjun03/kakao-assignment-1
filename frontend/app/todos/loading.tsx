
export default function TodosLoading() {
  return (
    <div className="min-h-screen bg-[#f9f9fa] flex flex-col justify-center items-center px-4 font-sans">
      <div className="bg-white w-full max-w-[450px] p-[40px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center">
        
        <div className="w-12 h-12 border-4 border-[#edf2f7] border-t-[#672be0] rounded-full animate-spin mb-5"></div>
        
        <h2 className="text-[#222222] text-xl font-bold tracking-tight mb-2">
          할 일 목록을 불러오는 중...
        </h2>
        <p className="text-[#64748b] text-sm">
          잠시만 기다려주세요 🚀
        </p>
      </div>
    </div>
  );
}