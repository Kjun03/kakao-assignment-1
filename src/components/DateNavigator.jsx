export default function DateNavigator({ currentDate, onChangeDate }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return (
    <div className="flex justify-between items-center mb-6 p-2.5 bg-[#f8fafc] rounded-xl">
      <button
        onClick={() => onChangeDate(-1)}
        className="bg-white border border-[#e2e8f0] text-[#475569] w-8 h-8 rounded-lg flex justify-center items-center font-bold hover:bg-[#e2e8f0] hover:text-[#672be0] hover:border-[#cbd5e1] transition-all duration-200 cursor-pointer"
        aria-label="이전 날짜"
      >
        &lt;
      </button>
      <h2 className="text-base text-[#334155] font-semibold">
        {year}년 {month}월 {day}일
      </h2>
      <button
        onClick={() => onChangeDate(1)}
        className="bg-white border border-[#e2e8f0] text-[#475569] w-8 h-8 rounded-lg flex justify-center items-center font-bold hover:bg-[#e2e8f0] hover:text-[#672be0] hover:border-[#cbd5e1] transition-all duration-200 cursor-pointer"
        aria-label="다음 날짜"
      >
        &gt;
      </button>
    </div>
  );
}