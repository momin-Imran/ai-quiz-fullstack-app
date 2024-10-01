import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//configurations
dotenv.config();
//console.log(process.env);
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your application client origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//Routes using RESTFUL API

app.post("/api/generateQuiz", async (req, res) => {
  try {
    //async function to allow using the API
    const apiKey = process.env.OPENAI_API_KEY;
    const searchTopic = req.body.searchTopic;
    const url = "https://api.openai.com/v1/chat/completions";

    //object of request type
    const requestOptions = {
      method: "POST", //method of request
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },

      //generating request body using a made prompt for quiz generation
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant who only responds in JSON.",
          },
          {
            role: "user",
            content: `Please generate a 5-question multiple-choice quiz on ${searchTopic}. Questions should be of intermediate difficulty. Format each question as JSON in this format: "[
              {"question": "...", "options": ["...", "..."], "correctAnswer": "..."},
              {"question": "...", "options": ["...", "..."], "correctAnswer": "..."},
              // more questions
            ]" No additional intro or conclusive text or characters should be provided!`,
          },
        ],
      }),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    res.json(data); //data is then sent out as response from the server on this endpoint
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//setting up the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is listening for requests on port ", PORT);
});
