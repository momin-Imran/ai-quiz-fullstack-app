
<img src="https://github.com/user-attachments/assets/018d0955-064e-4a23-9c96-8411a0417fe0" width="30" height="30">

# QuizMe - An AI-Powered Quiz Generator

AI Quiz Generator is a full-stack application that allows users to generate quizzes on various topics using OpenAI's GPT-3.5 model. The application dynamically generates multiple-choice questions based on the user's selected topic, providing a smooth and engaging quiz experience.

## Live Demo

Check out the live demo of the project here: [AI Quiz Generator](https://ai-quiz-me.vercel.app/)

![image](https://github.com/user-attachments/assets/ade4616f-a261-4b98-a91a-5bacf60f9a36)
![image](https://github.com/user-attachments/assets/2c614933-fad5-4c8e-9a51-43c945b594a1)




## Features

- **AI-Powered Quiz Generation**: Leverages the OpenAI API to generate custom multiple-choice quizzes based on the input topic.
- **Real-Time Response**: The app interacts with OpenAI in real-time to provide immediate quiz generation.
- **Engaging UI**: Smooth animations and intuitive design for an excellent user experience.
- **Multiple Topics**: Allows users to input any topic of their choice to generate quizzes.

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling the frontend.
- **Vercel**: Deployment platform for frontend.

### Backend:
- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Web framework for building the API.
- **OpenAI API**: AI model for generating the quiz questions.
- **Railway**: Hosting platform for the backend.

## How It Works

1. **User Input**: The user enters a topic (for instance, "JavaScript").
2. **AI Quiz Generation**: The backend server sends a request to the OpenAI API, asking it to generate a 5-question multiple-choice quiz on the given topic.
3. **Response Handling**: The backend processes the AI response and formats it into quiz questions and options.
4. **Interactive Quiz**: The quiz is presented to the user with immediate feedback on whether their selected answer is correct.

## API Integration

The backend uses the **OpenAI GPT-4o** API to generate quiz questions dynamically. Here's the process:
- A HTTP POST request is made to `/api/generateQuiz` with a topic.
- OpenAI generates a quiz with multiple-choice questions based on the topic.
- The backend returns the quiz data, which is then displayed on the frontend.
