import { useState, useRef, useEffect } from "react";
import "./assets/main.css";

function App() {
  const [input, setInput] = useState();
  const [data, setData] = useState([]);
  const [result, setResult] = useState();
  const [buttonText, setButtonText] = useState("선택");
  const inputField = useRef();

  const submitData = () => {
    setData([...data, input]);
    inputField.current.value = "";
    inputField.current.focus();
  };

  const choose = () => {
    const num = Math.round(Math.random() * (data.length - 1));
    setResult(data[num]);
    setButtonText("다시 선택하기");
  };

  useEffect(() => {
    inputField.current.focus();
  }, []);
  return (
    <div className="flex flex-col items-center h-screen text-yellow-200 bg-gray-600">
      <h1
        className="text-2xl m-4 text-gray-50"
        onClick={() => window.location.reload()}
      >
        Decision App
      </h1>
      <h3>고민되는 선택지를 입력해주세요</h3>
      <div className="flex flex-row justify-center items-center m-2">
        <input
          type="text"
          className="border-2 border-black m-2 text-black p-1"
          placeholder="고민 입력"
          onChange={(e) => setInput(e.target.value)}
          ref={inputField}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitData();
            }
          }}
        />
        <button
          onClick={submitData}
          className="m-2 bg-blue-500 px-4 py-1 text-yellow-100"
        >
          제출
        </button>
      </div>
      <div className="m-2 w-3/4 sm:w-1/3">
        {data
          ? data.map((e, index) => {
              return (
                <div className="mt-2">
                  <h3 className="text-gray-50 break-all self-start">
                    <span className="text-yellow-200">{index + 1}:</span> {e}
                  </h3>
                </div>
              );
            })
          : null}
      </div>
      {data.length > 0 ? (
        <button
          onClick={choose}
          className="m-2 bg-blue-500 px-4 py-1 text-yellow-100"
        >
          {buttonText}
        </button>
      ) : null}
      {result ? (
        <div className="w-full flex flex-col justify-center items-center m-2">
          <h3 className="break-all w-3/4 sm:w-2/4 text-center text-lg">
            당신의 선택은 {result}입니다!
          </h3>
        </div>
      ) : null}
    </div>
  );
}

export default App;
