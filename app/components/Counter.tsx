import { useState } from "react";


export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-gray-100 rounded-e 
      border-1 border-gray-300
    focus:border-gray-400 active:border-gray-400 
      px-[.5rem] py-[.5rem]" 
      onClick={() => setCount(count + 1)}
    >
      Clicks: {count}
    </button>
  );
}
