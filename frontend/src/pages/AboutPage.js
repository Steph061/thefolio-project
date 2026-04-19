// src/pages/AboutPage.js 
import { useState } from 'react'; 
import BackToTop from '../components/BackToTop'; 
import btsGroup from '../assets/bts-group.jpg'; 
import btsStage from '../assets/bts-stage.jpg'; 

const quizData = [
  {
    question: "What is the name of the website?",
    options: ["BTS Universe", "BTS: The Music That Shaped My Journey", "ARMY's World"],
    correct: "BTS: The Music That Shaped My Journey"
  },
  {
    question: "Who is the leader of BTS?",
    options: ["Jin", "RM", "Suga"],
    correct: "RM"
  },
  {
    question: "What color represents BTS and ARMY?",
    options: ["Red", "Purple", "Blue"],
    correct: "Purple"
  },
  {
    question: "Which song by BTS is about self-love?",
    options: ["Dynamite", "Fake Love", "Answer: Love Myself"],
    correct: "Answer: Love Myself"
  },
  {
    question: "Which platform connects BTS with ARMY?",
    options: ["Instagram", "Weverse", "Twitter"],
    correct: "Weverse"
  }
];

function AboutPage() { 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState('');

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setFeedback('');
  };

  const checkAnswer = (answer) => {
    const correctAnswer = quizData[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Incorrect! The correct answer is: ${correctAnswer}`);
    }
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFeedback('');
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setFeedback('');
  };

  return ( 
    <>  
      <main> 
        {/* About Section */} 
        <section className="about-section"> 
          <h2>My Journey as a BTS Fan</h2> 
          <p> 
            I discovered BTS when I was in Grade 6, during the time they released the song <em>"Just One Day"</em>. At that time, I was still young and simply enjoyed listening to their music. As I grew older and entered my teenage years, their songs started to have a deeper meaning for me. The messages in their music inspired me to support them and appreciate their artistry even more. 
          </p> 
          <p> 
            Since then, I have supported BTS in my own quiet way. I listen to and stream their songs, watch their vlogs, performances, and interviews, and follow their journey as artists. Being a fan does not always mean being loud. For me, it means consistently appreciating their work and allowing their music to motivate me during different stages of my life. 
          </p> 
        </section> 
        
        <section className="band-info"> 
          <h3>Who is BTS?</h3> 
          <p>Bangtan Sonyeondan, also known as BTS, is a South Korean boy band that debuted in 2013. The group consists of seven members: RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook. They have earned global recognition for their music, compelling storytelling, and positive messages about self-love, youth, and mental health.</p> 
          <div className="fact-grid"> 
            <div className="fact-card"> 
              <strong>7 Members</strong> 
              <p>RM, Jin, Suga, J-Hope, Jimin, V, Jungkook</p> 
            </div> 
            <div className="fact-card"> 
              <strong>Debut</strong> 
              <p>June 2013 with "No More Dream"</p> 
            </div> 
            <div className="fact-card"> 
              <strong>Global Awards</strong> 
              <p>Multiple Billboard Music Awards, AMAs, and Grammy nominations</p> 
            </div> 
            <div className="fact-card"> 
              <strong>Army</strong> 
              <p>Their passionate fanbase is called ARMY</p> 
            </div> 
          </div> 
        </section> 
        
        <section className="album-promo"> 
          <h3>New Album Spotlight: ARIRANG</h3> 
          <p>ARIRANG is BTS' latest album offering and it delivers a powerful new chapter for both new listeners and long-time fans. This album explores Korean culture, personal growth, and connection through strong production and emotional lyrics.</p> 
          <ul className="promo-list"> 
            <li>Released: 2026</li> 
            <li>Theme: identity, heritage, and togetherness</li> 
            <li>Perfect for people who want to learn BTS through their newest music</li> 
          </ul> 
          <div className="promo-buttons"> 
            <a href="https://open.spotify.com/search/arirang%20bts" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Listen on Spotify</a> 
            <a href="https://www.youtube.com/results?search_query=bts+arirang" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Watch ARIRANG videos</a> 
          </div> 
        </section> 
        
        {/* Image Gallery */} 
        <section className="gallery-section"> 
          <h3>Moments That Inspire Me</h3> 
          <div className="image-gallery"> 
            <figure> 
              <img src={btsGroup} alt="BTS group during a music era" /> 
              <figcaption>BTS as a group, showing teamwork and unity.</figcaption> 
            </figure> 
            <figure> 
              <img src={btsStage} alt="BTS performing on stage" /> 
              <figcaption>A live performance that shows their passion for music.</figcaption> 
            </figure> 
          </div> 
        </section> 
        
        {/* Quotes Section */} 
        <section className="quotes-section"> 
          <h3>Words That Motivate Me</h3> 
          <p className="section-copy">These quotes help me stay focused, stay kind, and remember that growth is a journey — not a finish line.</p> 
          <div className="quote-grid"> 
            <article className="quote-card"> 
              <p>"Effort makes you. You will regret someday if you don't do your best now. Don't think it's too late, but keep working on it."</p> 
              <span>— Jungkook</span> 
            </article> 
            <article className="quote-card"> 
              <p>"Hard work will never betray you."</p> 
              <span>— J-Hope</span> 
            </article> 
            <article className="quote-card"> 
              <p>"Happiness is not something that you have to achieve. You can still feel happy during the process of achieving something."</p> 
              <span>— RM</span> 
            </article> 
            <article className="quote-card"> 
              <p>"Purple is the last color of the rainbow. Purple means I will trust and love you for a long time."</p> 
              <span>— V</span> 
            </article> 
            <article className="quote-card"> 
              <p>"You were born to be real, not to be perfect."</p> 
              <span>— Suga</span> 
            </article> 
            <article className="quote-card"> 
              <p>"Your presence can give happiness. I hope you remember that."</p> 
              <span>— Jin</span> 
            </article> 
            <article className="quote-card"> 
              <p>"It's okay to not be okay. It's okay to show weakness."</p> 
              <span>— Jimin</span> 
            </article> 
          </div> 
        </section> 
        
        {/* BTS Song Quotes */} 
        <section className="song-quotes-section"> 
          <h3>BTS Lyrics That Relate to Life</h3> 
          <p className="section-copy">These lyric cards are reminders that even through challenges, BTS music can be a safe place to feel, heal, and keep moving forward.</p> 
          <div className="lyric-grid"> 
            <article className="lyric-card"> 
              <p className="lyric-text">"Dream, though your beginnings may be humble, may the end be prosperous."</p> 
              <span>So Far Away</span> 
            </article> 
            <article className="lyric-card"> 
              <p className="lyric-text">"You gave me the best of me, so you'll give you the best of you."</p> 
              <span>Magic Shop</span> 
            </article> 
            <article className="lyric-card"> 
              <p className="lyric-text">"Even if it takes time, I'll keep running toward my dream."</p> 
              <span>Run</span> 
            </article> 
            <article className="lyric-card"> 
              <p className="lyric-text">"After winter, there's always spring."</p> 
              <span>Spring Day</span> 
            </article> 
          </div> 
        </section> 
        
        {/* QUIZ GAME */} 
        <section className="quiz-game"> 
          <h2>BTS Quiz Game 🎤</h2> 
          <p id="quiz-question"> 
            {quizFinished 
              ? `🎉 Quiz Finished! Your Score: ${score}/${quizData.length}` 
              : quizStarted 
                ? quizData[currentQuestionIndex].question 
                : "Click start to begin the quiz!"} 
          </p> 
          
          <div className="answers"> 
            {quizFinished ? ( 
              <div> 
                <p className="result-text">You got {score} correct out of {quizData.length}</p> 
                <button className="play-again-btn" onClick={restartQuiz}>Play Again</button> 
              </div> 
            ) : quizStarted ? ( 
              <div> 
                {quizData[currentQuestionIndex].options.map((option, index) => ( 
                  <button key={index} onClick={() => checkAnswer(option)}>{option}</button> 
                ))} 
                {feedback && <p>{feedback}</p>} 
              </div> 
            ) : ( 
              <button id="startBtn" onClick={startQuiz}>Start Quiz</button> 
            )} 
          </div> 
        </section> 
      </main> 
      
      {/* Footer */} 
      <footer className="site-footer"> 
        <p>&copy; 2026 BTS: The Music That Shaped My Journey As A Fan</p> 
      </footer> 
      <BackToTop /> 
    </> 
  ); 
} 
export default AboutPage;