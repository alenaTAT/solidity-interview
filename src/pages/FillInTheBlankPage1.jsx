import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "In Solidity, the ______ modifier can restrict a function to be called only by the contract owner.",
    english: "Solidity 中的 ______ 修饰符可将函数限制为仅由合约所有者调用。",
    answer: ["onlyOwner"],
    explanation: "onlyOwner 通常来自 Ownable 合约，是基本的访问控制方式。",
    contrast: "对比：可结合 OpenZeppelin 中的 AccessControl 进行更细粒度权限划分。"
  },
  {
    id: 2,
    question: "Solidity 的 constructor 函数在合约 ______ 时被调用一次。",
    english: "The constructor function in Solidity runs once when the contract is ______.",
    answer: ["部署", "部署时", "部署的时候", "deployed"],
    explanation: "constructor 是合约部署时执行的初始化函数。",
    contrast: "对比：普通函数可被多次调用，而 constructor 仅执行一次。"
  },
  {
    id: 3,
    question: "msg.sender 表示当前调用的 ______。",
    english: "msg.sender refers to the ______ of the current call.",
    answer: ["caller", "调用者"],
    explanation: "msg.sender 表示发起此次调用的地址。",
    contrast: "对比：tx.origin 是交易发起者地址，存在钓鱼风险。"
  },
  {
    id: 4,
    question: "view 函数不能更改合约的 ______ 数据。",
    english: "view functions cannot modify the contract’s ______ data.",
    answer: ["state", "状态"],
    explanation: "view 表示函数不会改变区块链状态，只读取状态变量。",
    contrast: "对比：pure 不读取也不修改状态；普通函数可读写状态。"
  },
  {
    id: 5,
    question: "Solidity 中使用 ______ 来处理以太币的接收。",
    english: "In Solidity, ______ is used to handle the receipt of Ether.",
    answer: ["receive"],
    explanation: "receive 是一个特殊函数，在合约收到 ETH 时触发。",
    contrast: "对比：fallback 用于调用不存在的函数或带数据的交易。"
  },
  {
    id: 6,
    question: "在 Solidity 中使用 ______ 关键字声明函数的可见性。",
    english: "In Solidity, the ______ keyword is used to declare function visibility.",
    answer: ["public", "private", "internal", "external"],
    explanation: "这些关键字决定函数在哪些上下文中可被访问。",
    contrast: "对比：public 可内部外部调用；private 仅限当前合约。"
  },
  {
    id: 7,
    question: "可以使用 ______ 限制合约的编译器版本范围。",
    english: "You can use ______ to restrict the compiler version for the contract.",
    answer: ["pragma"],
    explanation: "pragma 指令用于定义编译器版本限制。",
    contrast: "对比：import 用于引入外部合约，与版本无关。"
  },
  {
    id: 8,
    question: "函数不访问状态变量应使用 ______ 修饰符。",
    english: "If a function does not access any state variable, use the ______ modifier.",
    answer: ["pure"],
    explanation: "pure 函数不读取也不修改合约状态，常用于计算。",
    contrast: "对比：view 可读状态，pure 不读不写。"
  },
  {
    id: 9,
    question: "合约中定义永久变量时使用 ______ 关键字。",
    english: "The ______ keyword declares persistent state variables in a contract.",
    answer: ["storage"],
    explanation: "storage 表示变量存储在区块链上，具有持久性。",
    contrast: "对比：memory 为临时变量，生命周期仅限于函数。"
  },
  {
    id: 10,
    question: "Solidity 中 ______ 用于定义日志事件。",
    english: "In Solidity, ______ is used to define event logs.",
    answer: ["event"],
    explanation: "event 用于记录链上事件，可被前端监听。",
    contrast: "对比：function 用于定义函数行为。"
  }
];

export default function FillInTheBlankPage1() {
  const [inputs, setInputs] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    if (!userName.trim()) {
      alert("请输入你的名字");
      return;
    }
    setSubmitted(true);
  };

  const score = inputs.reduce((acc, val, idx) => {
    const acceptedAnswers = Array.isArray(questions[idx].answer)
      ? questions[idx].answer
      : [questions[idx].answer];
    const isCorrect = acceptedAnswers.some(
      (ans) => val.trim().toLowerCase() === ans.toLowerCase()
    );
    return acc + (isCorrect ? 1 : 0);
  }, 0);

  const renderQuestionWithInput = (text, index) => {
    const parts = text.split("______");
    return (
      <span>
        {parts[0]}
        <input
          type="text"
          className="inline border-b-2 border-black text-center w-40 mx-1"
          value={inputs[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          disabled={submitted}
        />
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧠 Solidity 填空题 - 第 1 页</h1>

      {!submitted && (
        <div className="mb-6">
          <label className="block mb-2 font-medium">请输入你的名字：</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      )}

      {questions.map((q, idx) => {
        const acceptedAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        const isCorrect = acceptedAnswers.some(
          (ans) => inputs[idx].trim().toLowerCase() === ans.toLowerCase()
        );
        return (
          <div key={q.id} className="bg-white rounded-xl p-4 mb-4 shadow">
            <p className="font-medium">{idx + 1}. {renderQuestionWithInput(q.question, idx)}</p>
            <p className="text-sm text-gray-500 mb-2">{q.english}</p>
            {submitted && (
              <div>
                {isCorrect ? (
                  <p className="text-green-600 font-semibold">✔ 正确</p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    ✘ 错误，正确答案是：{acceptedAnswers.join(" / ")}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-1">📘 解析：{q.explanation}</p>
                {q.contrast && <p className="text-sm text-blue-600 mt-1">🔍 对比概念：{q.contrast}</p>}
              </div>
            )}
          </div>
        );
      })}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          提交答案
        </button>
      )}

      {submitted && (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold mb-4">
            🎉 {userName} 的得分是：{score} / {questions.length}
          </p>
          <button
            onClick={() => navigate("/page2")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            跳转到下一页 →
          </button>
        </div>
      )}
    </div>
  );
}
