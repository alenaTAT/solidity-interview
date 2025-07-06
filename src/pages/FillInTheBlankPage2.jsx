import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 用于跳转

const questions = [
  {
    id: 21,
    question: "函数若需接收以太币，应加上 ______ 修饰符。",
    english: "To receive ether, a function must be marked as ______.",
    answer: ["payable"],
    explanation: "`payable` 允许函数接收 ETH。",
    contrast: "对比：没有 payable 的函数将拒绝以太币。"
  },
  {
    id: 22,
    question: "使用 ______ 关键字可将局部变量声明为内存类型。",
    english: "Use the ______ keyword to declare local variables in memory.",
    answer: ["memory"],
    explanation: "memory 是临时内存，仅在函数生命周期内可用。",
    contrast: "对比：storage 用于永久状态变量。"
  },
  {
    id: 23,
    question: "合约中可以通过 ______ 检查调用者地址。",
    english: "Inside contracts, use ______ to check the caller's address.",
    answer: ["msg.sender"],
    explanation: "`msg.sender` 代表调用者地址。",
    contrast: "对比：tx.origin 是发起者地址，常被用于 phishing 攻击。"
  },
  {
    id: 24,
    question: "使用 ______ 可以终止执行并退还剩余 gas。",
    english: "Use ______ to stop execution and refund remaining gas.",
    answer: ["revert"],
    explanation: "revert 会终止交易并返还剩余 gas，适合用在 require 失败时。",
    contrast: "对比：assert 用于检查不变量，不应捕获。"
  },
  {
    id: 25,
    question: "状态变量定义在合约级别，默认保存在 ______ 中。",
    english: "State variables defined at contract level are stored in ______.",
    answer: ["storage"],
    explanation: "storage 表示持久性存储，会写入链上。",
    contrast: "对比：memory 是函数临时变量。"
  },
  {
    id: 26,
    question: "使用 ______ 可将合约部署地址转为合约类型。",
    english: "Use ______ to cast an address to a contract type.",
    answer: ["ContractName(address)"],
    explanation: "如 `MyContract(myAddress)` 可调用合约方法。",
    contrast: "对比：仅 address 无法调用合约函数。"
  },
  {
    id: 27,
    question: "为了避免 over/underflow，推荐使用 OpenZeppelin 的 ______。",
    english: "To prevent over/underflow, use OpenZeppelin's ______.",
    answer: ["SafeMath"],
    explanation: "`SafeMath` 为整数操作提供溢出检查。",
    contrast: "对比：Solidity 0.8+ 默认有溢出检查，可不需 SafeMath。"
  },
  {
    id: 28,
    question: "fallback 函数没有名称且需声明为 ______。",
    english: "fallback functions have no name and must be marked as ______.",
    answer: ["external"],
    explanation: "fallback 函数必须 external 修饰，否则编译失败。",
    contrast: "对比：普通函数可以是 public/internal 等。"
  },
  {
    id: 29,
    question: "只有构造函数允许使用关键字 ______ 来声明。",
    english: "Only constructors use the ______ keyword to declare.",
    answer: ["constructor"],
    explanation: "constructor 是合约初始化时运行一次的特殊函数。",
    contrast: "对比：普通函数使用 function 关键词定义。"
  },
  {
    id: 30,
    question: "合约中使用 ______ 发送 ETH 但会限制 gas 量。",
    english: "Use ______ to send ETH with limited gas.",
    answer: ["transfer"],
    explanation: "`transfer` 默认最多提供 2300 gas，用于简单支付。",
    contrast: "对比：call 可自定义 gas，但风险更大。"
  }
];

export default function FillInTheBlankPage2() {
  const [inputs, setInputs] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); // 初始化导航函数

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
      <h1 className="text-3xl font-bold mb-4">🧠 Solidity 填空题 - 第 2 页</h1>

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
            <p className="font-medium">
              {idx + 1}. {renderQuestionWithInput(q.question, idx)}
            </p>
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
                {q.contrast && (
                  <p className="text-sm text-blue-600 mt-1">🔍 对比概念：{q.contrast}</p>
                )}
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
            onClick={() => navigate("/")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            返回第一页
          </button>
        </div>
      )}
    </div>
  );
}
