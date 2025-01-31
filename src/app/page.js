import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AIPythonTutor() {
  const [apiKey, setApiKey] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [aiAvatar, setAiAvatar] = useState("default-avatar.png");
  const [score, setScore] = useState(0);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key");
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSendMessage = async () => {
    if (!apiKey || !userMessage) return;
    setLoading(true);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.choices) {
      const aiResponse = data.choices[0].message.content;
      setChatHistory([...chatHistory, { user: userMessage, ai: aiResponse }]);
      setUserMessage("");
      speak(aiResponse);
    }
  };

  const handleGenerateQuiz = async () => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Generate a simple Python quiz question for kids." }],
      }),
    });
    const data = await response.json();
    if (data.choices) {
      setQuizQuestion({
        question: data.choices[0].message.content,
        correctAnswer: "To be determined",
      });
      speak(data.choices[0].message.content);
    }
  };

  const handleCheckAnswer = () => {
    if (quizQuestion && quizAnswer.trim().toLowerCase() === quizQuestion.correctAnswer.toLowerCase()) {
      setScore(score + 1);
      alert("Correct! You earned a star!");
    } else {
      alert("Try again!");
    }
  };

  const handleGenerateLesson = async () => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Provide a step-by-step lesson for Python beginners." }],
      }),
    });
    const data = await response.json();
    if (data.choices) {
      setLesson(data.choices[0].message.content);
      speak(data.choices[0].message.content);
    }
  };

  const speak = (text) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const changeAvatar = (avatar) => {
    setAiAvatar(avatar);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Python Tutor for Kids</h1>
      <div className="flex justify-center mb-4">
        <img src={aiAvatar} alt="AI Tutor Avatar" className="w-20 h-20 rounded-full" />
      </div>
      <div className="flex justify-center mb-4">
        <Button onClick={() => changeAvatar("E:\projects\skc_srinivasa_pythontutor\public\article.jpeg")}>Avatar 1</Button>
        <Button onClick={() => changeAvatar("E:\projects\skc_srinivasa_pythontutor\public\arr.png")} className="ml-2">Avatar 2</Button>
        <Button onClick={() => changeAvatar("E:\projects\skc_srinivasa_pythontutor\public\arr1.jpeg")} className="ml-2">Avatar 3</Button>
      </div>
      <Card className="mb-4 p-4">
        <CardContent>
          <label className="font-bold">Set API Key:</label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              localStorage.setItem("openai_api_key", e.target.value);
            }}
            placeholder="Enter OpenAI API Key"
            className="mb-2"
          />
        </CardContent>
      </Card>
      <Card className="p-4 mb-4">
        <CardContent>
          <Textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ask me anything about Python!"
            className="mb-2"
          />
          <Button onClick={handleSendMessage} disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </Button>
        </CardContent>
      </Card>
      <Card className="p-4 mt-4">
        <CardContent>
          <h2 className="font-bold">Interactive Quiz</h2>
          <Button onClick={handleGenerateQuiz} className="mb-2">Generate a Quiz</Button>
          {quizQuestion && (
            <div>
              <p className="font-bold">{quizQuestion.question}</p>
              <Input
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Your answer"
                className="mb-2"
              />
              <Button onClick={handleCheckAnswer}>Check Answer</Button>
            </div>
          )}
          <p className="font-bold mt-2">Score: {score} ⭐</p>
        </CardContent>
      </Card>
      <Card className="p-4 mt-4">
        <CardContent>
          <h2 className="font-bold">Step-by-Step Python Lessons</h2>
          <Button onClick={handleGenerateLesson} className="mb-2">Start Lesson</Button>
          {lesson && <p className="mt-2">{lesson}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
 
