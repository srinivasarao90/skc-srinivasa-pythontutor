"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import "./styles.css"; // Make sure to link your CSS properly

export default function AIPythonTutor() {
  const [apiKey, setApiKey] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("chat");
  const [selectedAvatar, setSelectedAvatar] = useState("robot");

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Set up quiz questions
    setQuizQuestions([
      { question: "What is the output of print(2 + 3)?", options: ["2", "3", "5", "23"], correctAnswer: "5" },
      { question: "Which of these is a valid Python data type?", options: ["list", "set", "dict", "all of the above"], correctAnswer: "all of the above" },
      { question: "What is used to define a function in Python?", options: ["def", "func", "define", "function"], correctAnswer: "def" },
      { question: "How do you create a variable in Python?", options: ["x = 10", "int x = 10", "var x = 10", "10 = x"], correctAnswer: "x = 10" },
      { question: "Which function is used to get the length of a list in Python?", options: ["len()", "length()", "count()", "size()"], correctAnswer: "len()" },
{ question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "&&", "//"], correctAnswer: "**" },
      { question: "Which keyword is used to import modules in Python?", options: ["import", "require", "include", "using"], correctAnswer: "import" },
      { question: "What is the result of the expression 5 // 2?", options: ["2", "2.5", "5", "3"], correctAnswer: "2" },
      { question: "How do you define a dictionary in Python?", options: ["{}", "[]", "()", "<>"], correctAnswer: "{}" },
      { question: "Which of the following is the correct way to start a loop in Python?", options: ["for i in range(5):", "loop i in range(5):", "for i = 1 to 5:", "loop for i in 1 to 5:"], correctAnswer: "for i in range(5):" },
      { question: "Which of these are immutable types in Python?", options: ["list", "dict", "tuple", "set"], correctAnswer: "tuple" },
      { question: "What will be the output of print(1 == True)?", options: ["True", "False", "Error", "None"], correctAnswer: "True" },
      { question: "Which of the following statements is used to stop a loop in Python?", options: ["stop", "break", "exit", "continue"], correctAnswer: "break" },
      { question: "What does the 'is' operator do in Python?", options: ["Compares values", "Checks object identity", "Checks if both sides are equal", "None of the above"], correctAnswer: "Checks object identity" },
      { question: "What is the output of print(0.1 + 0.2 == 0.3)?", options: ["True", "False", "Error", "None"], correctAnswer: "False" },
      { question: "Which of these statements is used for exception handling in Python?", options: ["try...catch", "try...except", "catch...finally", "try...error"], correctAnswer: "try...except" },
      { question: "Which function is used to get the absolute value in Python?", options: ["abs()", "absolute()", "get_abs()", "val()"], correctAnswer: "abs()" },
      { question: "What is the default value of the 'sep' parameter in the print() function?", options: ["' '", "'\t'", "'\n'", "';'"], correctAnswer: "' '" },
      { question: "Which of the following is not a valid way to create a tuple in Python?", options: ["()", "(1, 2, 3)", "tuple(1, 2, 3)", "(1,)"], correctAnswer: "tuple(1, 2, 3)" }

      // Add 15 more questions here
    ]);
  }, []);

  const handleAnswer = (answer) => {
    const question = quizQuestions[currentQuestionIndex];
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers, [currentQuestionIndex]: answer };
      if (answer === question.correctAnswer) {
        setScore(score + 1); // Increase score if the answer is correct
      }
      return updatedAnswers;
    });
    
    // Move to the next question or end the quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setActiveSection("results");
    }
  };

  const sections = {
    chat: (
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg, i) => (
            <div key={i} className="chat-message">
              <p className="user-message">You: {msg.user}</p>
              <p className="ai-message">{msg.ai}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ask about Python..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading}
            className="send-button"
          >
            {loading ? "..." : "Ask"}
          </Button>
        </div>
      </div>
    ),
    quiz: (
      <div className="quiz-container">
        <h2>Python Quiz</h2>
        <div className="question-container">
          <p>{quizQuestions[currentQuestionIndex]?.question}</p>
          <div className="options">
            {quizQuestions[currentQuestionIndex]?.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className="quiz-option"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <p>Score: {score}</p>
      </div>
    ),
    results: (
      <div className="results-container">
        <h2>Quiz Results</h2>
        <p>Your Score: {score} out of {quizQuestions.length}</p>
        <Button onClick={() => setActiveSection("quiz")} className="retry-button">
          Try Again
        </Button>
      </div>
    ),
    lessons: (
      <div className="lessons-container">
        <h2>Python Basics</h2>
        <div className="lesson">
          <h3>1. Variables and Data Types</h3>
          <p>
            In Python, variables are created when you assign a value to them.
            Example: <code>x = 10</code>. Python supports various data types like:
            <ul>
              <li><code>int</code> (for integers)</li>
              <li><code>float</code> (for floating-point numbers)</li>
              <li><code>str</code> (for strings)</li>
              <li><code>list</code> (for ordered collections)</li>
            </ul>
          </p>
        </div>
        <div className="lesson">
          <h3>2. Control Flow</h3>
          <p>
            You can use <code>if</code>, <code>elif</code>, and <code>else</code> for decision-making.
            Example:
            <pre>
              {`if x > 10:\n  print("x is greater than 10")\nelse:\n  print("x is less than or equal to 10")`}
            </pre>
          </p>
        </div>
        <div className="lesson">
          <h3>3. Functions</h3>
          <p>
            Functions in Python are defined using the <code>def</code> keyword. Example:
            <pre>
              {`def greet(name):\n  return f"Hello, {name}!"`}
            </pre>
          </p>
        </div>
        <div className="lesson">
          <h3>4. Loops</h3>
          <p>
            You can use <code>for</code> and <code>while</code> loops in Python to iterate over sequences.
            Example (for loop):
            <pre>
              {`for i in range(5):\n  print(i)`}
            </pre>
          </p>
        </div>
      </div>
    ),
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <header className="header">
          <div className="header-content">
            <Avatar className="avatar">
              <AvatarImage src={`/avatars/${selectedAvatar}.svg`} />
              <AvatarFallback>🐍</AvatarFallback>
            </Avatar>
            <div className="header-info">
              <h1>Python Mentor</h1>
              <p>Learn Python Programming Basics</p>
            </div>
          </div>
        </header>

        <div className="sidebar">
          <Button onClick={() => setActiveSection("chat")} className="sidebar-button">💬 Chat</Button>
          <Button onClick={() => setActiveSection("quiz")} className="sidebar-button">❓ Quiz</Button>
          <Button onClick={() => setActiveSection("lessons")} className="sidebar-button">📚 Lessons</Button>
          <div className="api-key-container">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
            />
            <Button onClick={() => localStorage.setItem("apiKey", apiKey)}>Save Key</Button>
          </div>
        </div>

        <div className="main-content">
          <Card className="card">
            <CardHeader className="card-header">
              <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            </CardHeader>
            <CardContent className="card-content">
              {sections[activeSection]}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Function to handle sending message
const handleSendMessage = async () => {
  // Logic for sending message to AI
};
