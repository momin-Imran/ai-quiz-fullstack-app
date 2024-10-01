import React, {useState, useEffect} from 'react';
import Loading from './Loading'

const Quiz = ({searchTerm}) => {

  //state management 
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  
    useEffect(() => {
      // Only proceed if searchTerm has a meaningful value
      if (searchTerm) {
        setIsLoading(true);
    
        const fetchData = async () => {
          try {
            const response = await fetch('ai-quiz-fullstack-app-production.up.railway.app/api/generateQuiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ searchTopic: searchTerm }),
            });
            const data = await response.json();
    
            console.log(searchTerm);
            console.log('Raw Data:', data.choices[0].message.content);
    
            try {
              const quizContent = JSON.parse(data.choices[0].message.content);
              setIsLoading(false);
              setQuizData(quizContent);
            } catch (err) {
              setIsLoading(false);
              console.error('Error parsing JSON:', err);
            }
          } catch (err) {
            setIsLoading(false);
            alert('Error fetching data.');
            console.error('Could not fetch quiz data: ', err);
          }
        };
    
        fetchData();
      } else {
        setIsLoading(false);
        setQuizData(null);
      }
    }, [searchTerm]);
    

  
    const handleAnswerClick = async (selectedAnswer) => {
      const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
      const isCorrect = selectedAnswer === correctAnswer;
      
     
        setIsAnswerCorrect(isCorrect)
        setSelectedAnswer(selectedAnswer)
      
      console.log("Is Correct:", isCorrect); // Debugging
    
      if (isCorrect) {
        setScore(score + 1);
      }
    
      // Update the UI immediately based on isCorrect value
  const listItems = document.querySelectorAll('li');
  listItems.forEach((item) => {
    if (item.textContent === selectedAnswer) {
      item.style.backgroundColor = isCorrect ? 'green' : 'red';
    }
  });

     // Remove custom styling after 500ms (half a second)
  setTimeout(() => {
    listItems.forEach((item) => {
      item.style.backgroundColor = '';
    });
  }, 500);

  // Move to next question or finish quiz
  setTimeout(() => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true)
      //setQuizData(null);
      //setScore(0);
      //setCurrentQuestionIndex(0);
    }
  }, 500);
    };
    
  useEffect(() => {
    if (!quizData || !(quizData.length > currentQuestionIndex)) {
      setQuizData(null);
      setIsLoading(false)
    }
  }, [quizData, currentQuestionIndex]);
  

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center fixed inset-0 bg-opacity-50 bg-black backdrop-blur z-50">
          <div className="flex items-center">
            <div className="text-white drop-shadow-xl text-lg font-quicksand">Generating results with AI...</div>
            <div><Loading /></div>
          </div>
        </div>
      ) : isQuizFinished ? (
        <div className="flex items-center justify-center fixed inset-0 bg-opacity-50 bg-black backdrop-blur z-50">
          <div className="text-white drop-shadow-xl text-lg font-quicksand text-center">
            <p>Quiz completed!</p>
            <p>Your score is {score}/5.</p>
            <button className="bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg mx-2 px-6 my-2 py-2"onClick={() => { setIsQuizFinished(false); setQuizData(null); setScore(0); setCurrentQuestionIndex(0); }}>
              Restart
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-aqua-600 to-transparent drop-shadow-2xl shadow-2xl bg-opacity-10 backdrop-blur-xl rounded-xl p-8 w-80 mt-10 mb-20 text-center">
          {quizData && quizData.length > currentQuestionIndex ? (
            <>
              <h2 className="text-2xl text-white font-bold drop-shadow-2xl mb-4">
                {quizData[currentQuestionIndex]?.question}
              </h2>
              <ul>
                {quizData[currentQuestionIndex]?.options?.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className="list-none p-2 rounded-lg border text-white font-medium border-white border-opacity-50 m-2 cursor-pointer lg:hover:bg-slate-200 lg:hover:text-black transition-all duration-250"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="animate-bounce transition duration-700 h-10 flex flex-row justify-center">
                <img className="max-h-10 max-w-100" src="/quiz.png" alt="logo.png" />
              </div>
              <div className='text-white drop-shadow-2xl font-quicksand font-medium'>Please enter meaningful topics or questions for the best quiz experience.</div>
            </div>
          )}
        </div>
      )}
    </>
  );
  
  
        }


export default Quiz;
