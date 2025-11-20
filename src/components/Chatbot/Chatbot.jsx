// // src/components/Chatbot/Chatbot.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useCart } from '../../context/CartContext';
// import { supabase } from '../../config/supabase';
// import { useCart } from '../context/CartContext';
// import { X, ShoppingCart, CheckCircle, Clock, AlertCircle } from 'lucide-react';
// import './Chatbot.css';


// const CheckoutComponent = () => {
//   const { clearCart, setOrderStatus } = useCart();

//   const handleConfirmOrder = async () => {
//     try {
//       setOrderStatus('processing');
      
//       // Your order confirmation logic here
//       // e.g., API call to Supabase
//       await confirmOrderToSupabase();
      
//       // Clear the cart after successful order confirmation
//       clearCart();
//             setOrderStatus('success');
//     } catch (error) {
//       console.error('Order confirmation failed:', error);
//       setOrderStatus('error');
//     }
//   };

// const Chatbot = () => {
//   const { 
//     cartItems, 
//     isChatbotOpen, 
//     toggleChatbot, 
//     clearCart, 
//     getCartTotal,
//     orderStatus,
//     setOrderStatus
//   } = useCart();
  
//   const [messages, setMessages] = useState([]);
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isChatbotOpen && cartItems.length > 0) {
//       // Initialize chat with cart summary
//       setMessages([
//         {
//           id: 1,
//           type: 'bot',
//           text: `Hello! I see you have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart. Ready to place your order?`,
//           timestamp: new Date()
//         },
//         {
//           id: 2,
//           type: 'bot',
//           text: 'Please provide your name and phone number to continue:',
//           timestamp: new Date()
//         }
//       ]);
//     } else if (isChatbotOpen && cartItems.length === 0) {
//       setMessages([
//         {
//           id: 1,
//           type: 'bot',
//           text: 'Your cart is empty. Add some delicious items from our menu first!',
//           timestamp: new Date()
//         }
//       ]);
//     }
//   }, [isChatbotOpen, cartItems.length]);

//   const handleSubmitOrder = async () => {
//     if (!customerName.trim() || !customerPhone.trim()) {
//       addMessage('bot', 'Please provide both your name and phone number to proceed.');
//       return;
//     }

//     if (cartItems.length === 0) {
//       addMessage('bot', 'Your cart is empty. Please add items before ordering.');
//       return;
//     }

//     setIsSubmitting(true);
//     setOrderStatus('processing');
    
//     addMessage('user', 'Yes, please confirm my order!');
//     addMessage('bot', 'Processing your order...');

//     try {
//       // 1. Save to Supabase
//       const orderData = {
//         customer_name: customerName.trim(),
//         customer_phone: customerPhone.trim(),
//         items: cartItems,
//         total_amount: getCartTotal(),
//         status: 'confirmed',
//         created_at: new Date().toISOString()
//       };

//       const { data: order, error: supabaseError } = await supabase
//         .from('orders')
//         .insert([orderData])
//         .select()
//         .single();

//       if (supabaseError) throw supabaseError;

//       // 2. Send to n8n webhook
//       const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
//       if (webhookUrl) {
//         await fetch(webhookUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             order_id: order.id,
//             ...orderData
//           })
//         });
//       }

//       // Success
//       setOrderStatus('success');
//       addMessage('bot', `✅ Order confirmed! Your order #${order.id} has been received. Total: $${getCartTotal().toFixed(2)}`);
//       addMessage('bot', 'Thank you for your order! We will prepare it right away.');
      
//       // Clear cart after successful order
//       setTimeout(() => {
//         clearCart();
//         setCustomerName('');
//         setCustomerPhone('');
//         setTimeout(() => toggleChatbot(), 2000);
//       }, 3000);

//     } catch (error) {
//       console.error('Order submission error:', error);
//       setOrderStatus('error');
//       addMessage('bot', '❌ Sorry, there was an error processing your order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     addMessage('user', 'I want to cancel');
//     addMessage('bot', 'No problem! Feel free to continue shopping. Your cart items are saved.');
//     setTimeout(() => toggleChatbot(), 1500);
//   };

//   const addMessage = (type, text) => {
//     const newMessage = {
//       id: messages.length + 1,
//       type,
//       text,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   if (!isChatbotOpen) return null;

//   return (
//     <div className="chatbot-overlay">
//       <div className="chatbot-container">
//         {/* Chat Header */}
//         <div className="chatbot-header">
//           <div className="chatbot-title">
//             <ShoppingCart size={20} />
//             <span>Order Confirmation</span>
//           </div>
//           <button className="close-btn" onClick={toggleChatbot}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="chatbot-messages">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}
//             >
//               <div className="message-bubble">
//                 {message.text}
//               </div>
//               <span className="message-time">
//                 {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </span>
//             </div>
//           ))}
          
//           {/* Order Summary */}
//           {cartItems.length > 0 && (
//             <div className="order-summary">
//               <div className="summary-header">Order Summary</div>
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <span className="item-name">{item.name} × {item.quantity}</span>
//                   <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}
//               <div className="summary-total">
//                 <strong>Total: ${getCartTotal().toFixed(2)}</strong>
//               </div>
//             </div>
//           )}

//           {/* Customer Info Form */}
//           {cartItems.length > 0 && messages.length >= 2 && (
//             <div className="customer-form">
//               <div className="form-group">
//                 <label>Your Name</label>
//                 <input
//                   type="text"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Enter your name"
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   placeholder="Enter your phone number"
//                   disabled={isSubmitting}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Loading Indicator */}
//           {isSubmitting && (
//             <div className="loading-indicator">
//               <Clock className="spinner" size={20} />
//               <span>Processing your order...</span>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Chat Actions */}
//         {cartItems.length > 0 && !isSubmitting && orderStatus === 'idle' && (
//           <div className="chatbot-actions">
//             <button 
//               className="confirm-btn"
//               onClick={handleSubmitOrder}
//               disabled={!customerName.trim() || !customerPhone.trim()}
//             >
//               <CheckCircle size={18} />
//               Confirm Order
//             </button>
//             <button 
//               className="cancel-btn"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;











// // src/components/Chatbot/Chatbot.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useCart } from '../../context/CartContext';
// import { supabase } from '../../config/supabase';
// import { X, ShoppingCart, CheckCircle, Clock, AlertCircle } from 'lucide-react';
// import './Chatbot.css';

// const Chatbot = () => {
//   const { 
//     cartItems, 
//     isChatbotOpen, 
//     toggleChatbot, 
//     clearCart, 
//     getCartTotal,
//     orderStatus,
//     setOrderStatus
//   } = useCart();
  
//   const [messages, setMessages] = useState([]);
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isChatbotOpen) {
//       // Reset messages when chatbot opens
//       setMessages([]);
      
//       if (cartItems.length > 0) {
//         // Initialize chat with cart summary
//         setMessages([
//           {
//             id: 1,
//             type: 'bot',
//             text: `Hello! I see you have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart. Ready to place your order?`,
//             timestamp: new Date()
//           },
//           {
//             id: 2,
//             type: 'bot',
//             text: 'Please provide your name and phone number to continue:',
//             timestamp: new Date()
//           }
//         ]);
//       } else {
//         setMessages([
//           {
//             id: 1,
//             type: 'bot',
//             text: 'Your cart is empty. Add some delicious items from our menu first!',
//             timestamp: new Date()
//           }
//         ]);
//       }
//     }
//   }, [isChatbotOpen, cartItems.length]);

//   const handleSubmitOrder = async () => {
//     if (!customerName.trim() || !customerPhone.trim()) {
//       addMessage('bot', 'Please provide both your name and phone number to proceed.');
//       return;
//     }

//     if (cartItems.length === 0) {
//       addMessage('bot', 'Your cart is empty. Please add items before ordering.');
//       return;
//     }

//     setIsSubmitting(true);
//     setOrderStatus('processing');
    
//     addMessage('user', 'Yes, please confirm my order!');
//     addMessage('bot', 'Processing your order...');

//     try {
//       // 1. Save to Supabase
//       const orderData = {
//         customer_name: customerName.trim(),
//         customer_phone: customerPhone.trim(),
//         items: cartItems,
//         total_amount: getCartTotal(),
//         status: 'confirmed',
//         created_at: new Date().toISOString()
//       };

//       const { data: order, error: supabaseError } = await supabase
//         .from('orders')
//         .insert([orderData])
//         .select()
//         .single();

//       if (supabaseError) throw supabaseError;

//       // 2. Send to n8n webhook
//       const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
//       if (webhookUrl) {
//         await fetch(webhookUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             order_id: order.id,
//             ...orderData
//           })
//         });
//       }

//       // Success
//       setOrderStatus('success');
//       addMessage('bot', `✅ Order confirmed! Your order #${order.id} has been received. Total: $${getCartTotal().toFixed(2)}`);
//       addMessage('bot', 'Thank you for your order! We will prepare it right away.');
      
//       // Clear cart and reset form after successful order
//       clearCart();
//       setCustomerName('');
//       setCustomerPhone('');
      
//       // Close chatbot after delay
//       setTimeout(() => {
//         toggleChatbot();
//       }, 3000);

//     } catch (error) {
//       console.error('Order submission error:', error);
//       setOrderStatus('error');
//       addMessage('bot', '❌ Sorry, there was an error processing your order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     addMessage('user', 'I want to cancel');
//     addMessage('bot', 'No problem! Feel free to continue shopping. Your cart items are saved.');
//     setTimeout(() => toggleChatbot(), 1500);
//   };

//   const addMessage = (type, text) => {
//     const newMessage = {
//       id: Date.now(), // Use timestamp for unique ID
//       type,
//       text,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   // Reset form when chatbot closes
//   useEffect(() => {
//     if (!isChatbotOpen) {
//       setMessages([]);
//       setCustomerName('');
//       setCustomerPhone('');
//       setIsSubmitting(false);
//       setOrderStatus('idle');
//     }
//   }, [isChatbotOpen]);

//   if (!isChatbotOpen) return null;

//   return (
//     <div className="chatbot-overlay">
//       <div className="chatbot-container">
//         {/* Chat Header */}
//         <div className="chatbot-header">
//           <div className="chatbot-title">
//             <ShoppingCart size={20} />
//             <span>Order Confirmation</span>
//             {orderStatus === 'processing' && (
//               <div className="order-status processing">
//                 <Clock size={16} />
//                 Processing...
//               </div>
//             )}
//             {orderStatus === 'success' && (
//               <div className="order-status success">
//                 <CheckCircle size={16} />
//                 Order Confirmed!
//               </div>
//             )}
//             {orderStatus === 'error' && (
//               <div className="order-status error">
//                 <AlertCircle size={16} />
//                 Error
//               </div>
//             )}
//           </div>
//           <button 
//             className="close-btn" 
//             onClick={toggleChatbot}
//             disabled={isSubmitting}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="chatbot-messages">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}
//             >
//               <div className="message-bubble">
//                 {message.text}
//               </div>
//               <span className="message-time">
//                 {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </span>
//             </div>
//           ))}
          
//           {/* Order Summary - Only show if we have items and not in success state */}
//           {cartItems.length > 0 && orderStatus !== 'success' && (
//             <div className="order-summary">
//               <div className="summary-header">Order Summary</div>
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <span className="item-name">{item.name} × {item.quantity}</span>
//                   <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}
//               <div className="summary-total">
//                 <strong>Total: ${getCartTotal().toFixed(2)}</strong>
//               </div>
//             </div>
//           )}

//           {/* Customer Info Form - Only show if we have items and not submitting/success */}
//           {cartItems.length > 0 && !isSubmitting && orderStatus === 'idle' && (
//             <div className="customer-form">
//               <div className="form-group">
//                 <label>Your Name</label>
//                 <input
//                   type="text"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Enter your name"
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   placeholder="Enter your phone number"
//                   disabled={isSubmitting}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Loading Indicator */}
//           {isSubmitting && (
//             <div className="loading-indicator">
//               <Clock className="spinner" size={20} />
//               <span>Processing your order...</span>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Chat Actions - Only show if we have items and not submitting/success */}
//         {cartItems.length > 0 && !isSubmitting && orderStatus === 'idle' && (
//           <div className="chatbot-actions">
//             <button 
//               className="confirm-btn"
//               onClick={handleSubmitOrder}
//               disabled={!customerName.trim() || !customerPhone.trim()}
//             >
//               <CheckCircle size={18} />
//               Confirm Order
//             </button>
//             <button 
//               className="cancel-btn"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* Success Message */}
//         {orderStatus === 'success' && (
//           <div className="success-message">
//             <CheckCircle size={32} />
//             <h3>Order Confirmed!</h3>
//             <p>Thank you for your order. We'll start preparing it right away!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;










// src/components/Chatbot/Chatbot.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useCart } from '../../context/CartContext';
// import { supabase } from '../../config/supabase';
// import { X, ShoppingCart, CheckCircle, Clock, AlertCircle, Send } from 'lucide-react';
// import './Chatbot.css';

// const Chatbot = () => {
//   const { 
//     cartItems, 
//     isChatbotOpen, 
//     toggleChatbot, 
//     clearCart, 
//     getCartTotal,
//     orderStatus,
//     setOrderStatus
//   } = useCart();
  
//   const [messages, setMessages] = useState([]);
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [n8nStatus, setN8nStatus] = useState('checking'); // 'checking', 'connected', 'failed'
//   const messagesEndRef = useRef(null);

//   // n8n webhook URL - make sure this matches your exact n8n webhook URL
//   const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL || 'http://localhost:5678/webhook/44f627cc-4d03-4604-b986-2852c30b2562/chat';

//   // Load chat history from localStorage on component mount
//   useEffect(() => {
//     const savedChat = localStorage.getItem('restaurant-chat-history');
//     if (savedChat) {
//       try {
//         const parsedChat = JSON.parse(savedChat);
//         const messagesWithDates = parsedChat.map(msg => ({
//           ...msg,
//           timestamp: new Date(msg.timestamp)
//         }));
//         setMessages(messagesWithDates);
//       } catch (error) {
//         console.error('Error loading chat history:', error);
//       }
//     }
//   }, []);

//   // Save chat history to localStorage whenever messages change
//   useEffect(() => {
//     localStorage.setItem('restaurant-chat-history', JSON.stringify(messages));
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isChatbotOpen && cartItems.length > 0 && messages.length === 0) {
//       setMessages([
//         {
//           id: Date.now(),
//           type: 'bot',
//           text: `Hello! I see you have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart. Ready to place your order?`,
//           timestamp: new Date()
//         },
//         {
//           id: Date.now() + 1,
//           type: 'bot',
//           text: 'You can either proceed with your order or ask me anything about our restaurant!',
//           timestamp: new Date()
//         }
//       ]);
//     } else if (isChatbotOpen && cartItems.length === 0 && messages.length === 0) {
//       setMessages([
//         {
//           id: Date.now(),
//           type: 'bot',
//           text: 'Hello! Welcome to Savoré Restaurant. How can I help you today?',
//           timestamp: new Date()
//         }
//       ]);
//     }
//   }, [isChatbotOpen, cartItems.length, messages.length]);

//   // Test n8n connection when chatbot opens
//   useEffect(() => {
//     const testN8nConnection = async () => {
//       if (!isChatbotOpen) return;
      
//       setN8nStatus('checking');
//       console.log('Testing n8n connection to:', N8N_WEBHOOK_URL);
      
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 5000);
        
//         const response = await fetch(N8N_WEBHOOK_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ 
//             message: 'test',
//             timestamp: new Date().toISOString(),
//             isTest: true 
//           }),
//           signal: controller.signal
//         });
        
//         clearTimeout(timeoutId);
        
//         if (response.ok) {
//           console.log('✅ n8n connection successful');
//           setN8nStatus('connected');
//         } else {
//           console.warn('❌ n8n connection failed with status:', response.status);
//           setN8nStatus('failed');
//         }
//       } catch (error) {
//         console.error('❌ n8n connection error:', error);
//         setN8nStatus('failed');
        
//         // Add connection warning message
//         if (messages.length <= 2) {
//           addMessage('bot', 'Note: I\'m currently in offline mode. You can still place orders and I\'ll help with basic questions about our restaurant.');
//         }
//       }
//     };

//     testN8nConnection();
//   }, [isChatbotOpen]);

//   // Fallback responses when n8n is not available
//   const getFallbackResponse = (userMessage) => {
//     const message = userMessage.toLowerCase();
    
//     if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
//       return "Hello! Welcome to Savoré Restaurant. I'm here to help with your order or answer questions about our menu.";
//     } else if (message.includes('menu') || message.includes('food') || message.includes('dish')) {
//       return "We offer a variety of delicious dishes including pasta, pizza, salads, and desserts. Check our menu page for full details!";
//     } else if (message.includes('hour') || message.includes('open') || message.includes('time')) {
//       return "We're open Monday-Sunday from 11:00 AM to 10:00 PM. Kitchen closes at 9:30 PM.";
//     } else if (message.includes('reservation') || message.includes('book') || message.includes('table')) {
//       return "You can make a reservation through our website or by calling us at (555) 123-4567.";
//     } else if (message.includes('delivery') || message.includes('takeout')) {
//       return "Yes! We offer both delivery and takeout. Delivery is available within 5 miles of the restaurant.";
//     } else if (message.includes('price') || message.includes('cost')) {
//       return "Our prices range from $12 for appetizers to $35 for main courses. Check our menu for specific pricing.";
//     } else if (message.includes('vegetarian') || message.includes('vegan')) {
//       return "We have several vegetarian and vegan options! Look for the leaf icon on our menu.";
//     } else if (message.includes('allergy') || message.includes('diet')) {
//       return "Please inform our staff about any allergies. We're happy to accommodate dietary restrictions.";
//     } else if (cartItems.length > 0 && (message.includes('order') || message.includes('cart'))) {
//       return `You have ${cartItems.length} items in your cart totaling $${getCartTotal().toFixed(2)}. Ready to proceed with your order?`;
//     } else {
//       return "I'm currently in offline mode. You can ask me about our menu, hours, reservations, or proceed with your order below.";
//     }
//   };

//   // Send message to n8n webhook and get bot response
//   const sendMessageToN8N = async (userMessage) => {
//     console.log('Sending message to n8n:', userMessage);
    
//     // If n8n is not connected, use fallback responses
//     if (n8nStatus === 'failed') {
//       console.log('Using fallback response (n8n not available)');
//       return getFallbackResponse(userMessage);
//     }

//     try {
//       const payload = {
//         message: userMessage,
//         timestamp: new Date().toISOString(),
//         hasCartItems: cartItems.length > 0,
//         cartItemCount: cartItems.length,
//         cartTotal: getCartTotal(),
//         sessionId: localStorage.getItem('chat-session-id') || 'session_' + Date.now()
//       };

//       if (!localStorage.getItem('chat-session-id')) {
//         localStorage.setItem('chat-session-id', payload.sessionId);
//       }

//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 8000);

//       const response = await fetch(N8N_WEBHOOK_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//         signal: controller.signal
//       });

//       clearTimeout(timeoutId);
      
//       console.log('Response status:', response.status);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('n8n response data:', data);
      
//       // Handle different response formats from n8n
//       if (data.reply) {
//         return data.reply;
//       } else if (data.message) {
//         return data.message;
//       } else if (data.response) {
//         return data.response;
//       } else if (typeof data === 'string') {
//         return data;
//       } else {
//         console.warn('Unexpected n8n response format:', data);
//         return getFallbackResponse(userMessage);
//       }
//     } catch (error) {
//       console.error('Error sending message to n8n:', error);
      
//       // Switch to fallback mode for future messages
//       setN8nStatus('failed');
      
//       return getFallbackResponse(userMessage);
//     }
//   };

//   // Handle sending a general chat message
//   const handleSendMessage = async () => {
//     if (!userInput.trim()) return;

//     const userMessage = userInput.trim();
//     setUserInput('');
//     setIsLoading(true);

//     // Add user message to chat
//     addMessage('user', userMessage);

//     try {
//       // Get bot response from n8n or fallback
//       const botResponse = await sendMessageToN8N(userMessage);
      
//       // Add bot response to chat
//       addMessage('bot', botResponse);
//     } catch (error) {
//       console.error('Error in chat:', error);
//       addMessage('bot', getFallbackResponse(userMessage));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmitOrder = async () => {
//     if (!customerName.trim() || !customerPhone.trim()) {
//       addMessage('bot', 'Please provide both your name and phone number to proceed.');
//       return;
//     }

//     if (cartItems.length === 0) {
//       addMessage('bot', 'Your cart is empty. Please add items before ordering.');
//       return;
//     }

//     setIsSubmitting(true);
//     setOrderStatus('processing');
    
//     addMessage('user', 'Yes, please confirm my order!');
//     addMessage('bot', 'Processing your order...');

//     try {
//       const orderData = {
//         customer_name: customerName.trim(),
//         customer_phone: customerPhone.trim(),
//         items: cartItems,
//         total_amount: getCartTotal(),
//         status: 'confirmed',
//         created_at: new Date().toISOString()
//       };

//       const { data: order, error: supabaseError } = await supabase
//         .from('orders')
//         .insert([orderData])
//         .select()
//         .single();

//       if (supabaseError) throw supabaseError;

//       // Success
//       setOrderStatus('success');
//       addMessage('bot', `✅ Order confirmed! Your order #${order.id} has been received. Total: $${getCartTotal().toFixed(2)}`);
//       addMessage('bot', 'Thank you for your order! We will prepare it right away.');
      
//       // Clear cart and reset form after successful order
//       clearCart();
//       setCustomerName('');
//       setCustomerPhone('');
      
//       setTimeout(() => {
//         toggleChatbot();
//       }, 3000);

//     } catch (error) {
//       console.error('Order submission error:', error);
//       setOrderStatus('error');
//       addMessage('bot', '❌ Sorry, there was an error processing your order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     addMessage('user', 'I want to cancel');
//     addMessage('bot', 'No problem! Feel free to continue shopping. Your cart items are saved.');
//     setTimeout(() => toggleChatbot(), 1500);
//   };

//   const addMessage = (type, text) => {
//     const newMessage = {
//       id: Date.now(),
//       type,
//       text,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Reset form when chatbot closes
//   useEffect(() => {
//     if (!isChatbotOpen) {
//       setCustomerName('');
//       setCustomerPhone('');
//       setIsSubmitting(false);
//       setOrderStatus('idle');
//       setUserInput('');
//       setIsLoading(false);
//     }
//   }, [isChatbotOpen]);

//   if (!isChatbotOpen) return null;

//   return (
//     <div className="chatbot-overlay">
//       <div className="chatbot-container">
//         {/* Chat Header */}
//         <div className="chatbot-header">
//           <div className="chatbot-title">
//             <ShoppingCart size={20} />
//             <span>Restaurant Assistant</span>
//             {n8nStatus === 'failed' && (
//               <div className="connection-status offline">
//                 <AlertCircle size={14} />
//                 Offline Mode
//               </div>
//             )}
//             {n8nStatus === 'connected' && (
//               <div className="connection-status online">
//                 <CheckCircle size={14} />
//                 Online
//               </div>
//             )}
//             {orderStatus === 'processing' && (
//               <div className="order-status processing">
//                 <Clock size={16} />
//                 Processing...
//               </div>
//             )}
//             {orderStatus === 'success' && (
//               <div className="order-status success">
//                 <CheckCircle size={16} />
//                 Order Confirmed!
//               </div>
//             )}
//             {orderStatus === 'error' && (
//               <div className="order-status error">
//                 <AlertCircle size={16} />
//                 Error
//               </div>
//             )}
//           </div>
//           <button 
//             className="close-btn" 
//             onClick={toggleChatbot}
//             disabled={isSubmitting}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="chatbot-messages">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}
//             >
//               <div className="message-bubble">
//                 {message.text}
//               </div>
//               <span className="message-time">
//                 {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </span>
//             </div>
//           ))}
          
//           {/* Order Summary */}
//           {cartItems.length > 0 && orderStatus !== 'success' && !isLoading && (
//             <div className="order-summary">
//               <div className="summary-header">Your Current Order</div>
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <span className="item-name">{item.name} × {item.quantity}</span>
//                   <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}
//               <div className="summary-total">
//                 <strong>Total: ${getCartTotal().toFixed(2)}</strong>
//               </div>
//             </div>
//           )}

//           {/* Customer Info Form */}
//           {cartItems.length > 0 && !isSubmitting && orderStatus === 'idle' && !isLoading && (
//             <div className="customer-form">
//               <div className="form-group">
//                 <label>Your Name</label>
//                 <input
//                   type="text"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Enter your name"
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   placeholder="Enter your phone number"
//                   disabled={isSubmitting}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Loading Indicator for chat */}
//           {isLoading && (
//             <div className="loading-indicator">
//               <Clock className="spinner" size={20} />
//               <span>Assistant is typing...</span>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Chat Input */}
//         <div className="chat-input-container">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your message here..."
//             disabled={isSubmitting || isLoading}
//             className="chat-input"
//           />
//           <button 
//             onClick={handleSendMessage}
//             disabled={!userInput.trim() || isSubmitting || isLoading}
//             className="send-button"
//           >
//             <Send size={18} />
//           </button>
//         </div>

//         {/* Order Actions */}
//         {cartItems.length > 0 && !isSubmitting && orderStatus === 'idle' && !isLoading && (
//           <div className="chatbot-actions">
//             <button 
//               className="confirm-btn"
//               onClick={handleSubmitOrder}
//               disabled={!customerName.trim() || !customerPhone.trim()}
//             >
//               <CheckCircle size={18} />
//               Confirm Order
//             </button>
//             <button 
//               className="cancel-btn"
//               onClick={handleCancel}
//             >
//               Cancel Order
//             </button>
//           </div>
//         )}

//         {/* Success Message */}
//         {orderStatus === 'success' && (
//           <div className="success-message">
//             <CheckCircle size={32} />
//             <h3>Order Confirmed!</h3>
//             <p>Thank you for your order. We'll start preparing it right away!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;








import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Step 1: Set up the global window.ChatWidgetConfig object
    window.ChatWidgetConfig = {
      webhook: {
        url: 'http://localhost:5678/webhook/b530af52-6d69-4586-ba29-885a0cd33c00',
        route: 'general',
      },
      branding: {
        logo: "https://images.vexels.com/media/users/3/197046/raw/d70337c7aecbf9f3d8196b103041e9ae-e-commerce-logo-template.jpg",
        name: 'Savoré Assistant',
        welcomeText: '👋 Hi there! How can we assist you today?',
        responseTimeText: 'Typically responds instantly ⚡',
      },
      style: {
        primaryColor: '#6C63FF',           // Elegant purple accent
        secondaryColor: '#4CAF50',         // Soft green for highlights
        position: 'right',
        backgroundColor: '#f8f9fa',        // Light modern background
        fontColor: '#212529',              // Deep gray for clean text
        borderRadius: '18px',              // Smooth rounded corners
        fontFamily: '"Poppins", sans-serif',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)', // Subtle glow
        chatButtonColor: '#6C63FF',        // Floating button color
        chatButtonIconColor: '#ffffff',
        chatButtonShadow: '0 4px 12px rgba(108, 99, 255, 0.5)', // Glow effect
        transition: 'all 0.3s ease-in-out', // Smooth hover animation
      },
    };

    // Step 2: Dynamically add the external script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/WayneSimpson/n8n-chatbot-template@ba944c3/chat-widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.ChatWidgetConfig;
    };
  }, []);

  return null; // UI renders dynamically
};

export default Chatbot;

