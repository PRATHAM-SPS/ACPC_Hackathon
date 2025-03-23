import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';

// Mock images - replace with actual image imports
const heroVideo = 'https://assets.mixkit.co/videos/preview/mixkit-setting-up-a-small-robot-23662-large.mp4';
const aiAgentImage = 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const customerEngagementImage = 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const costSavingImage = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [response, setResponse] = useState('');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone
    };

    try {
      // Make the POST request to Flask API
      const res = await axios.post('https://r2xrsccx-5000.inc1.devtunnels.ms/call', data);
      setResponse(res.data.message);
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setCompany('');
    } catch (error) {
      setResponse('Error submitting your request. Please try again.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Transform Your Loan Sales With AI Voice Agents
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-subtitle"
          >
            Neural voices with the lowest latency and highest customer engagement
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a href="#contact" className="cta-button">Get Started Today</a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={isVisible["features"] ? "visible" : "hidden"}
          variants={fadeIn}
        >
          Revolutionary AI Voice Technology
        </motion.h2>
        
        <motion.div 
          className="features-grid"
          initial="hidden"
          animate={isVisible["features"] ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="feature-card" variants={fadeIn}>
            <div className="feature-icon">🎯</div>
            <h3>Neural Voice Technology</h3>
            <p>Human-like conversations that customers can't distinguish from real agents</p>
          </motion.div>

          <motion.div className="feature-card" variants={fadeIn}>
            <div className="feature-icon">⚡</div>
            <h3>Industry-Leading Latency</h3>
            <p>Response times under 500ms for seamless conversational flow</p>
          </motion.div>

          <motion.div className="feature-card" variants={fadeIn}>
            <div className="feature-icon">📊</div>
            <h3>Data-Driven Optimization</h3>
            <p>AI learns from every call to continuously improve performance</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={isVisible["benefits"] ? "visible" : "hidden"}
          variants={fadeIn}
        >
          Transform Your Call Center Operations
        </motion.h2>

        <div className="benefit-row">
          <motion.div 
            className="benefit-content"
            initial="hidden"
            animate={isVisible["benefits"] ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h3>Reduce Workforce Costs by 80%</h3>
            <p>Replace expensive call center operations with AI agents that work 24/7 without breaks, benefits, or turnover.</p>
            <ul className="benefit-list">
              <li>Eliminate training and HR costs</li>
              <li>Scale instantly to meet demand</li>
              <li>Consistent performance at all times</li>
            </ul>
          </motion.div>
          <motion.div 
            className="benefit-image"
            initial={{ opacity: 0, x: 100 }}
            animate={isVisible["benefits"] ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
          >
            <img src={costSavingImage} alt="Cost savings visualization" />
          </motion.div>
        </div>

        <div className="benefit-row reverse">
          <motion.div 
            className="benefit-content"
            initial="hidden"
            animate={isVisible["benefits"] ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h3>Superior Customer Engagement</h3>
            <p>Our AI agents deliver consistent, empathetic interactions tailored to each customer's needs.</p>
            <ul className="benefit-list">
              <li>Personalized conversations based on customer data</li>
              <li>Multilingual support for diverse customers</li>
              <li>Perfect recall of customer preferences and history</li>
            </ul>
          </motion.div>
          <motion.div 
            className="benefit-image"
            initial={{ opacity: 0, x: -100 }}
            animate={isVisible["benefits"] ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <img src={customerEngagementImage} alt="Customer engagement visualization" />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={isVisible["how-it-works"] ? "visible" : "hidden"}
          variants={fadeIn}
        >
          How VoiceOps Works
        </motion.h2>

        <motion.div 
          className="timeline"
          initial="hidden"
          animate={isVisible["how-it-works"] ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="timeline-item" variants={fadeIn}>
            <div className="timeline-number">1</div>
            <h3>Integration</h3>
            <p>Seamlessly connect our AI agents with your existing systems and CRM</p>
          </motion.div>

          <motion.div className="timeline-item" variants={fadeIn}>
            <div className="timeline-number">2</div>
            <h3>Training</h3>
            <p>Customize AI agents with your company voice, products, and sales approaches</p>
          </motion.div>

          <motion.div className="timeline-item" variants={fadeIn}>
            <div className="timeline-number">3</div>
            <h3>Deployment</h3>
            <p>Launch your AI workforce and start handling customer calls immediately</p>
          </motion.div>

          <motion.div className="timeline-item" variants={fadeIn}>
            <div className="timeline-number">4</div>
            <h3>Optimization</h3>
            <p>Continuous improvement through machine learning and performance analysis</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="testimonials-section">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={isVisible["testimonials"] ? "visible" : "hidden"}
          variants={fadeIn}
        >
          What Our Clients Say
        </motion.h2>

        <motion.div 
          className="testimonials-grid"
          initial="hidden"
          animate={isVisible["testimonials"] ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="testimonial-card" variants={fadeIn}>
            <div className="testimonial-text">
              "VoiceOps helped us reduce call center costs by 78% while improving our loan conversion rate by 23%. The quality of AI conversations is incredible."
            </div>
            <div className="testimonial-author">- James Wilson, CEO of LoanDirect</div>
          </motion.div>

          <motion.div className="testimonial-card" variants={fadeIn}>
            <div className="testimonial-text">
              "Our customers can't tell they're talking to AI agents. The technology is that good, and our satisfaction scores have actually improved."
            </div>
            <div className="testimonial-author">- Sarah Johnson, CMO of FastFunding</div>
          </motion.div>

          <motion.div className="testimonial-card" variants={fadeIn}>
            <div className="testimonial-text">
              "The scalability of VoiceOps means we can handle peak periods without hiring seasonal staff. It's been a game-changer for our mortgage business."
            </div>
            <div className="testimonial-author">- Michael Chen, Operations Director at HomeLoans Inc.</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={isVisible["contact"] ? "visible" : "hidden"}
          variants={fadeIn}
        >
          Transform Your Loan Sales Today
        </motion.h2>

        <div className="contact-container">
          <motion.div 
            className="contact-form-container"
            initial="hidden"
            animate={isVisible["contact"] ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h3>Schedule a Demo</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Request Demo</button>
            </form>
            {response && <div className="response-message">{response}</div>}
          </motion.div>

          <motion.div 
            className="contact-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible["contact"] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <img src={aiAgentImage} alt="AI Voice Agent" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>VoiceOps</h2>
            <p>The Future of Loan Sales</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Company</h3>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#blog">Blog</a>
            </div>
            <div className="footer-column">
              <h3>Solutions</h3>
              <a href="#mortgage">Mortgage Loans</a>
              <a href="#personal">Personal Loans</a>
              <a href="#auto">Auto Financing</a>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <a href="tel:+1800VOICEOPS">1-800-VOICEOPS</a>
              <a href="mailto:info@voiceops.ai">info@voiceops.ai</a>
              <div className="social-links">
                <a href="#linkedin">LinkedIn</a>
                <a href="#twitter">Twitter</a>
                <a href="#facebook">Facebook</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 VoiceOps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
