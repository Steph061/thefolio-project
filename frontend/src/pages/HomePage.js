// src/pages/HomePage.js 
import BackToTop from '../components/BackToTop'; 
import btsHero from '../assets/bts-hero.jpg'; 
import album1 from '../assets/album1.jpg'; 
import album2 from '../assets/album2.jpg'; 
import album3 from '../assets/album3.jpg'; 
import album4 from '../assets/album4.jpg'; 
import album5 from '../assets/album5.jpg'; 
import album6 from '../assets/album6.jpg'; 
import album7 from '../assets/album7.jpg'; 
import album8 from '../assets/album8.jpg'; 
import album9 from '../assets/album9.jpg';
import album10 from '../assets/album10.jpg';
import BTS from '../assets/BTS.jpg';

const albumImages = [
  album1,
  album2,
  album3,
  album4,
  album5,
  album6,
  album7,
  album8,
  album9,
  album10,
  BTS,
];

function HomePage() { 
  return ( 
    <> 
      <section className="hero"> 
        <div className="hero-text"> 
          <h2>Music That Inspires Me</h2> 
          <p>BTS is more than just a music group to me. Their songs, messages, and artistry have become a source of inspiration, comfort, and motivation in my daily life.</p> 
        </div> 
        <img src={btsHero} alt="BTS performing on stage during a concert" /> 
      </section> 
      
      <section className="promo-section"> 
        <div className="promo-copy"> 
          <p className="eyebrow">New Album Alert</p> 
          <h3>Discover BTS' latest album: ARIRANG</h3> 
          <p>ARIRANG is BTS' newest release, blending powerful beats, meaningful storytelling, and Korean heritage for both new listeners and longtime ARMY fans. It is the ideal introduction to BTS' evolving sound.</p> 
          <ul className="promo-list"> 
            <li>Fresh tracks with bold production</li> 
            <li>Strong message of connection and identity</li> 
            <li>Perfect for users who want to hear their newest work</li> 
          </ul> 
          <div className="promo-buttons"> 
            <a href="https://open.spotify.com/search/arirang%20bts" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Listen on Spotify</a> 
            <a href="https://www.youtube.com/results?search_query=bts+arirang" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Watch the ARIRANG promo</a> 
          </div> 
        </div> 
        <div className="promo-image"> 
          <img src={BTS} alt="BTS ARIRANG album promotion" /> 
        </div> 
      </section> 
      
      {/* Highlights List */} 
      <section className="highlights"> 
        <h3>Why BTS Matters to Me</h3> 
        <ul> 
          <li>Music that promotes self-love and confidence</li> 
          <li>Lyrics that connect to real-life emotions</li> 
          <li>Strong teamwork and dedication</li> 
          <li>Positive influence on fans worldwide</li> 
        </ul> 
      </section> 
      
      {/* Preview Sections */} 
      <section className="previews"> 
        <article className="preview-card"> 
          <h4>My Journey as a Fan</h4> 
          <p>From casually listening to their songs to becoming a dedicated fan, BTS has shaped how I appreciate music and creativity.</p> 
          <a href="/about">Read more →</a> 
        </article> 
        
        <article className="preview-card"> 
          <h4>Helpful BTS Resources</h4> 
          <p>Discover websites and platforms where fans can learn more about BTS, their music, and their achievements.</p> 
          <a href="/contact">Explore resources →</a> 
        </article> 
        
        <article className="preview-card"> 
          <h4>Join the Community</h4> 
          <p>Sign up to receive updates and share your interest in BTS and music appreciation.</p> 
          <a href="/register">Sign up →</a> 
        </article> 
      </section> 
      
      {/* Album Gallery */} 
      <section className="album-gallery-section"> 
        <h2>BTS Album Gallery</h2> 
        <div className="album-gallery"> 
          {albumImages.map((src, index) => ( 
            <div className="album-card" key={index}> 
              <img src={src} alt={`BTS album cover ${index + 1}`} /> 
            </div> 
          ))} 
        </div> 
      </section> 
      
      {/* Footer */} 
      <footer className="site-footer"> 
        <p>&copy; 2026 BTS: The Music That Shaped My Journey As A Fan</p> 
      </footer> 
      <BackToTop /> 
    </> 
  ); 
} 
export default HomePage;