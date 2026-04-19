// src/pages/ContactPage.js 
import { useState } from 'react'; 
import API from '../api/axios'; 
import mapPlaceholder from '../assets/map-placeholder.jpg'; 
function ContactPage() { 
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '', 
  }); 
  const [submitted, setSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  
  const handleChange = (e) => { 
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value, 
    }); 
  }; 
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(''); 
    setLoading(true); 

    try {
      await API.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  }; 
  
  return ( 
    <> 
      <main> 
        {/* Contact Form Section */} 
        <section className="contact-section"> 
          <h2>Get in Touch</h2> 
          <p>This contact form is for demonstration purposes only. Share messages, thoughts, or questions related to BTS and music appreciation.</p> 
          
          {submitted ? ( 
            <p>Thank you! We will get back to you soon.</p> 
          ) : ( 
            <form className="contact-form" onSubmit={handleSubmit}> 
              <label htmlFor="name">Name</label> 
              <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required /> 
              
              <label htmlFor="email">Email</label> 
              <input type="email" id="email" name="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required /> 
              
              <label htmlFor="message">Message</label> 
              <textarea id="message" name="message" rows="5" placeholder="Write your message here" value={formData.message} onChange={handleChange} required></textarea> 
              
              {error && <p className="error-text">{error}</p>} 
              <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button> 
            </form> 
          )} 
        </section> 
        
        {/* Resources Table Section */} 
        <section className="resources-section"> 
          <h2>Helpful BTS Resources</h2> 
          <table> 
            <thead> 
              <tr> 
                <th>Resource Name</th> 
                <th>Description</th> 
              </tr> 
            </thead> 
            <tbody> 
              <tr> 
                <td>BTS Official Website</td> 
                <td>Official announcements, profiles, and updates about BTS.</td> 
              </tr> 
              <tr> 
                <td>Weverse</td> 
                <td>Platform where BTS shares content and communicates with fans.</td> 
              </tr> 
              <tr> 
                <td>Spotify</td> 
                <td>Music streaming platform to listen to BTS songs and albums.</td> 
              </tr> 
            </tbody> 
          </table> 
        </section> 
        
        {/* External Links Section */} 
        <section className="links-section"> 
          <h2>Related Links</h2> 
          <ul> 
            <li><a href="https://ibighit.com/bts/" target="_blank" rel="noopener noreferrer">BTS Official Site</a></li> 
            <li><a href="https://www.weverse.io/bts" target="_blank" rel="noopener noreferrer">BTS on Weverse</a></li> 
            <li><a href="https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX" target="_blank" rel="noopener noreferrer">BTS on Spotify</a></li> 
          </ul> 
        </section> 
        
        {/* Map Placeholder Section */} 
        <section className="map-section"> 
          <h2>Location</h2> 
          <img src={mapPlaceholder} alt="Map placeholder representing Seoul, South Korea" /> 
        </section> 
      </main> 
      
      {/* Footer */} 
      <footer className="site-footer"> 
        <p>&copy; 2026 BTS: The Music That Shaped My Journey As A Fan</p> 
      </footer> 
    </> 
  ); 
} 
export default ContactPage;