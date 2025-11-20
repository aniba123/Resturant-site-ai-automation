

import React, { useEffect } from 'react';
import logo from '../assets/savore.png';
import './ChatWidget.css';

const ChatWidget = () => {
  useEffect(() => {
    // Convert the imported logo to a URL that can be used by the external script
    const getLogoUrl = () => {
      // If logo is already a URL string, use it directly
      if (typeof logo === 'string') return logo;
      
      // If it's a module object, try to get the default export
      if (logo && logo.default) return logo.default;
      
      // Fallback to original URL
      return "https://images.vexels.com/media/users/3/197046/raw/d70337c7aecbf9f3d8196b103041e9ae-e-commerce-logo-template.jpg";
    };

    // Set the config BEFORE loading the script
    window.ChatWidgetConfig = {
      webhook: {
        url: 'http://localhost:5678/webhook/124d24a8-d9d2-4177-8653-47e4858eb125/chat',
        route: 'general',
      },
      branding: {
        logo: getLogoUrl(), // Use the converted URL
        name: 'Savoré.io',
        welcomeText: 'Hi 👋, how can we help today?',
        responseTimeText: 'We typically respond right away',
      },
      style: {
        primaryColor: '#FF6B35',
        secondaryColor: '#2E86AB', 
        position: 'right',
        backgroundColor: '#FFFFFF',
        fontColor: '#2D3748',
        // Note: The external script might not support all these custom properties
      }
    };

    // Check if script already exists to avoid duplicates
    if (!document.querySelector('script[src*="chat-widget"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/WayneSimpson/n8n-chatbot-template@ba944c3/chat-widget.js';
      script.async = true;
      
      // Add error handling
      script.onerror = () => {
        console.error('Failed to load chat widget script');
      };
      
      document.body.appendChild(script);
    }

    // Add more aggressive CSS to override the external styles
    const style = document.createElement('style');
    style.textContent = `
      /* Forceful overrides for chat widget */
      .chat-widget-container {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        overflow: hidden !important;
      }
      
      /* Header styling */
      .chat-widget-container .chat-header {
        background: linear-gradient(135deg, #1A202C 0%, #2D3748 100%) !important;
        border-radius: 12px 12px 0 0 !important;
        padding: 20px !important;
        color: white !important;
      }
      
      /* Logo styling */
      .chat-widget-container .chat-header img {
        border-radius: 50% !important;
        border: 3px solid #FFD166 !important;
        box-shadow: 0 4px 12px rgba(255, 209, 102, 0.3) !important;
        width: 50px !important;
        height: 50px !important;
        object-fit: cover !important;
      }
      
      /* Company name */
      .chat-widget-container .chat-header .company-name {
        font-weight: 700 !important;
        font-size: 18px !important;
        color: white !important;
        margin-top: 8px !important;
      }
      
      /* Welcome text */
      .chat-widget-container .chat-header .welcome-text {
        color: #E2E8F0 !important;
        font-size: 14px !important;
        opacity: 0.9 !important;
      }
      
      /* Close button */
      .chat-widget-container .close-button {
        background: rgba(255, 255, 255, 0.1) !important;
        border-radius: 50% !important;
        color: white !important;
        transition: all 0.3s ease !important;
        border: none !important;
        width: 30px !important;
        height: 30px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .chat-widget-container .close-button:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        transform: scale(1.1) !important;
      }
      
      /* Message bubbles */
      .chat-widget-container .message-bubble {
        border-radius: 18px !important;
        margin: 8px 0 !important;
        padding: 12px 16px !important;
        max-width: 80% !important;
      }
      
      /* Bot messages */
      .chat-widget-container .message-bubble.bot {
        background: linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%) !important;
        border-radius: 18px 18px 18px 4px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        color: #2D3748 !important;
      }
      
      /* User messages */
      .chat-widget-container .message-bubble.user {
        background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%) !important;
        border-radius: 18px 18px 4px 18px !important;
        box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3) !important;
        color: white !important;
        margin-left: auto !important;
      }
      
      /* Input area */
      .chat-widget-container .input-container {
        border-top: 1px solid #E2E8F0 !important;
        padding: 16px !important;
        background: #F7FAFC !important;
      }
      
      .chat-widget-container .message-input {
        border: 2px solid #E2E8F0 !important;
        border-radius: 24px !important;
        padding: 12px 20px !important;
        font-size: 14px !important;
        transition: all 0.3s ease !important;
        background: white !important;
      }
      
      .chat-widget-container .message-input:focus {
        border-color: #FF6B35 !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1) !important;
        outline: none !important;
      }
      
      /* Send button */
      .chat-widget-container .send-button {
        background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%) !important;
        border-radius: 50% !important;
        color: white !important;
        transition: all 0.3s ease !important;
        border: none !important;
        width: 40px !important;
        height: 40px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .chat-widget-container .send-button:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4) !important;
      }
      
      /* Launcher button */
      .chat-widget-launcher {
        background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%) !important;
        border-radius: 50% !important;
        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4) !important;
        border: none !important;
        transition: all 0.3s ease !important;
        width: 60px !important;
        height: 60px !important;
      }
      
      .chat-widget-launcher:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 12px 30px rgba(255, 107, 53, 0.6) !important;
      }
      
      /* Typing indicator */
      .chat-widget-container .typing-indicator {
        color: #FF6B35 !important;
      }
      
      /* Timestamps */
      .chat-widget-container .message-time {
        font-size: 11px !important;
        opacity: 0.7 !important;
        margin-top: 4px !important;
      }
    `;
    
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="chat-widget"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      document.head.removeChild(style);
      delete window.ChatWidgetConfig;
    };
  }, []);

  return null;
};

export default ChatWidget;