import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, MapPin, Clock, Smartphone, Monitor, Check, Sparkles, Gift, ChevronRight, CreditCard, Package, Truck, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

const OmnichannelFashionAgent = () => {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedDress, setSelectedDress] = useState(null);
  const [addedShoes, setAddedShoes] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const chatEndRef = useRef(null);

  const products = {
    dresses: [
      {
        id: 1,
        name: "Bella Emerald Gown",
        price: 289,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=600&fit=crop",
        description: "Elegant floor-length emerald silk gown with delicate beading"
      },
      {
        id: 2,
        name: "Aurora Blush Dress",
        price: 249,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
        description: "Romantic blush pink midi dress with flowing chiffon overlay"
      },
      {
        id: 3,
        name: "Celestial Navy Gown",
        price: 319,
        image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&h=600&fit=crop",
        description: "Sophisticated navy gown with illusion neckline"
      }
    ],
    shoes: {
      id: 4,
      name: "Silver Starlight Heels",
      price: 129,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      description: "Strappy silver heels with crystal embellishments"
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => addMessage('agent', 'welcome'), 500);
    }
  }, [step]);

  const addMessage = (sender, type) => {
    const messageMap = {
      welcome: { text: "Welcome back, Sarah! I see you were looking at formal wear last week. How can I help today?", agent: "Sales Agent" },
      userNeed: { text: "I'm looking for a formal dress for a wedding in four weeks.", agent: null },
      styleQuestion: { text: "That sounds exciting! What color or style are you leaning towards?", agent: "Sales Agent" },
      userStyle: { text: "I love jewel tones, especially emerald or sapphire. Something elegant and sophisticated.", agent: null },
      recommendations: { text: "Perfect! Based on your preferences, I've found three stunning options.", agent: "Recommendation Agent", special: "products" },
      upsell: { text: "Excellent choice! These Silver Starlight Heels pair perfectly with the Bella Emerald Gown.", agent: "Recommendation Agent", special: "shoes" },
      addShoes: { text: "Yes, please add the heels!", agent: null },
      shoesAdded: { text: "Great! I've added the heels. Let me check availability.", agent: "Recommendation Agent" },
      inventory: { text: "Good news! Both items are available at Downtown Fashion Plaza.", agent: "Inventory Agent", special: "inventory" },
      purchaseOptions: { text: "How would you like to proceed?", agent: "Sales Agent", special: "purchaseChoice" },
      chooseInstant: { text: "I'd like to buy now and have it delivered!", agent: null },
      chooseReserve: { text: "I'd like to reserve for try-on in store.", agent: null },
      processingPayment: { text: "Excellent! Processing your order with loyalty benefits applied.", agent: "Payment Agent", special: "payment" },
      paymentSuccess: { text: "Payment successful! Your order is confirmed.", agent: "Payment Agent" },
      paymentFailed: { text: "Payment failed. Please verify your information and try again.", agent: "Payment Agent" },
      orderConfirmation: { text: "Your order has been placed successfully!", agent: "Order Management Agent", special: "orderDetails" },
      trackingUpdate: { text: "Your order is being prepared for shipment.", agent: "Fulfillment Agent", special: "tracking" },
      kioskWelcome: { text: "Welcome to the store! Confirm try-on for Bella Emerald Gown at 2:30 PM?", agent: "Sales Agent" },
      confirmReservation: { text: "Yes, please confirm!", agent: null },
      loyalty: { text: "Wonderful! Applying your loyalty benefits.", agent: "Loyalty & Offers Agent", special: "loyalty" },
      completion: { text: "You'll receive a notification when ready. See you at 2:30 PM!", agent: "Post-Purchase Support Agent" }
    };

    const msg = messageMap[type];
    setMessages(prev => [...prev, { sender, ...msg }]);
  };

  const simulatePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      setPaymentStatus(success ? 'success' : 'failed');
      setPaymentProcessing(false);
      
      if (success) {
        const orderId = 'LX' + Math.floor(Math.random() * 900000 + 100000);
        setOrderNumber(orderId);
        setTimeout(() => { addMessage('agent', 'paymentSuccess'); addMessage('agent', 'orderConfirmation'); setStep(10); }, 500);
      } else {
        setTimeout(() => { addMessage('agent', 'paymentFailed'); setStep(11); }, 500);
      }
    }, 3000);
  };

  const handleAction = (action) => {
    const actions = {
      startChat: () => { addMessage('user', 'userNeed'); setTimeout(() => { addMessage('agent', 'styleQuestion'); setStep(1); }, 800); },
      respondStyle: () => { addMessage('user', 'userStyle'); setTimeout(() => { addMessage('agent', 'recommendations'); setStep(2); }, 1000); },
      selectDress: () => { setSelectedDress(products.dresses[0]); setTimeout(() => { addMessage('agent', 'upsell'); setStep(3); }, 500); },
      addShoes: () => { setAddedShoes(true); addMessage('user', 'addShoes'); setTimeout(() => { addMessage('agent', 'shoesAdded'); addMessage('agent', 'inventory'); setStep(4); }, 800); },
      showPurchaseOptions: () => { addMessage('agent', 'purchaseOptions'); setStep(5); },
      chooseInstant: () => { addMessage('user', 'chooseInstant'); setTimeout(() => { addMessage('agent', 'processingPayment'); setStep(9); simulatePayment(); }, 800); },
      chooseReserve: () => { addMessage('user', 'chooseReserve'); setTimeout(() => { addMessage('agent', 'kioskWelcome'); setStep(7); }, 500); },
      confirmKiosk: () => { addMessage('user', 'confirmReservation'); setTimeout(() => { addMessage('agent', 'loyalty'); setStep(8); }, 800); },
      complete: () => { addMessage('agent', 'completion'); setStep(12); },
      viewTracking: () => { addMessage('agent', 'trackingUpdate'); setStep(13); },
      retryPayment: () => { setPaymentStatus(null); setStep(9); simulatePayment(); }
    };
    actions[action]?.();
  };

  const AgentBadge = ({ agent }) => (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-primary text-white text-xs rounded-full mb-1">
      <Sparkles className="w-3 h-3" />
      <span className="font-medium">{agent}</span>
    </div>
  );

  const ChatMessage = ({ message }) => (
    <div className={`flex gap-3 mb-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
      {message.sender === 'agent' && (
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      {message.sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold">S</span>
        </div>
      )}
      <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
        {message.agent && <AgentBadge agent={message.agent} />}
        <div className={`rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-gradient-primary text-white' : 'bg-gradient-subtle text-gray-900'}`}>
          <p className="text-sm">{message.text}</p>
        </div>
        
        {message.special === 'products' && (
          <div className="grid grid-cols-3 gap-2 mt-3 w-full">
            {products.dresses.map(d => (
              <div key={d.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleAction('selectDress')}>
                <img src={d.image} alt={d.name} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1">{d.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{d.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">${d.price}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">In Stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {message.special === 'shoes' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-3 w-64">
            <img src={products.shoes.image} alt={products.shoes.name} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1">{products.shoes.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{products.shoes.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-purple-600">${products.shoes.price}</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Low Stock</span>
              </div>
            </div>
          </div>
        )}
        
        {message.special === 'inventory' && selectedDress && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-3 w-80">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Downtown Fashion Plaza</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">{selectedDress.name}</span>
                <span className="text-sm font-semibold text-green-600">Size 6 Available</span>
              </div>
              {addedShoes && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">{products.shoes.name}</span>
                  <span className="text-sm font-semibold text-green-600">Size 7 Available</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {message.special === 'purchaseChoice' && (
          <div className="flex flex-col gap-2 mt-3 w-80">
            <button onClick={() => handleAction('chooseInstant')} className="bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />Buy Now & Ship to Me
            </button>
            <button onClick={() => handleAction('chooseReserve')} className="bg-gradient-subtle py-3 rounded-lg font-semibold hover:bg-purple-50 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />Reserve for In-Store Try-On
            </button>
          </div>
        )}
        
        {message.special === 'payment' && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-3 w-full max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-lg">Secure Checkout</h3>
            </div>
            {paymentProcessing ? (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Processing payment...</p>
              </div>
            ) : paymentStatus === 'success' ? (
              <div className="py-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-green-600">Payment Successful!</p>
                <p className="text-sm text-gray-600 mt-1">Order #{orderNumber}</p>
              </div>
            ) : paymentStatus === 'failed' ? (
              <div className="py-6 text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-red-600">Payment Failed</p>
                <button onClick={() => handleAction('retryPayment')} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700">
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Saved Payment</span>
                    <span className="text-purple-600">•••• 4242</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${selectedDress.price + (addedShoes ? products.shoes.price : 0)}</span></div>
                    <div className="flex justify-between text-green-600"><span>Loyalty Discount</span><span>-$25</span></div>
                    <div className="flex justify-between text-green-600"><span>Promo Code</span><span>-$10</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span className="text-green-600">FREE</span></div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-purple-600">${(selectedDress.price + (addedShoes ? products.shoes.price : 0) - 35)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {message.special === 'orderDetails' && selectedDress && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-3 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-lg">Order Confirmed</h3>
              </div>
              <span className="text-sm font-mono text-gray-600">#{orderNumber}</span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Order placed successfully!</span>
              </div>
              <p className="text-sm text-green-700 mt-1 ml-7">Expected: Nov 2-4, 2025</p>
            </div>
            <div className="space-y-3 border-t pt-3">
              <div className="flex gap-3">
                <img src={selectedDress.image} alt={selectedDress.name} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{selectedDress.name}</p>
                  <p className="text-xs text-gray-600">Size 6</p>
                  <p className="text-sm font-semibold text-purple-600 mt-1">${selectedDress.price}</p>
                </div>
              </div>
              {addedShoes && (
                <div className="flex gap-3">
                  <img src={products.shoes.image} alt={products.shoes.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{products.shoes.name}</p>
                    <p className="text-xs text-gray-600">Size 7</p>
                    <p className="text-sm font-semibold text-purple-600 mt-1">${products.shoes.price}</p>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => handleAction('viewTracking')} className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />Track Order
            </button>
          </div>
        )}
        
        {message.special === 'tracking' && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-3 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-lg">Order Tracking</h3>
              </div>
              <span className="text-sm font-mono text-gray-600">#{orderNumber}</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-blue-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Currently Processing</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { status: 'Order Confirmed', time: 'Oct 25, 2:45 PM', done: true },
                { status: 'Processing', time: 'Oct 25, 3:30 PM', done: true },
                { status: 'Shipped', time: 'Oct 26, Expected', done: false },
                { status: 'Delivered', time: 'Nov 2-4, Expected', done: false }
              ].map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.done ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <CheckCircle className={`w-5 h-5 ${s.done ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${s.done ? 'text-gray-900' : 'text-gray-500'}`}>{s.status}</p>
                    <p className="text-xs text-gray-600">{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {message.special === 'loyalty' && selectedDress && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-4 mt-3 w-96">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-lg">Your Savings Applied!</h3>
            </div>
            <div className="space-y-3 bg-white rounded-lg p-3">
              <div className="flex justify-between text-sm"><span>{selectedDress.name}</span><span>${selectedDress.price}</span></div>
              {addedShoes && <div className="flex justify-between text-sm"><span>{products.shoes.name}</span><span>${products.shoes.price}</span></div>}
              <div className="border-t pt-2">
                <div className="flex justify-between text-sm text-green-600"><span>Loyalty Points</span><span>-$25</span></div>
                <div className="flex justify-between text-sm text-green-600"><span>Coupon: FORMAL10</span><span>-$10</span></div>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Final Price</span>
                <span className="text-purple-600">${(selectedDress.price + (addedShoes ? products.shoes.price : 0) - 35)}</span>
              </div>
              <div className="text-center text-sm text-green-600 font-semibold">You saved $35!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      <div className="bg-gradient-primary text-white p-4 shadow-lg">
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}
        <div ref={chatEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t">
        {step === 0 && <button onClick={() => handleAction('startChat')} className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:bg-purple-700">Start Conversation</button>}
        {step === 1 && <button onClick={() => handleAction('respondStyle')} className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:bg-purple-700">Tell Agent My Preferences</button>}
        {step === 3 && <button onClick={() => handleAction('addShoes')} className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:bg-purple-700">Add Heels to Selection</button>}
        {step === 4 && <button onClick={() => handleAction('showPurchaseOptions')} className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:bg-purple-700">Continue to Checkout</button>}
        {step === 7 && <button onClick={() => handleAction('confirmKiosk')} className="w-full bg-gradient-primary text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90">Confirm Reservation</button>}
        {step === 8 && <button onClick={() => handleAction('complete')} className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 flex items-center justify-center gap-2"><Check className="w-6 h-6" />Complete Reservation</button>}
        {step === 12 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-8 h-8" />
              <span className="font-bold text-2xl">Reservation Confirmed!</span>
            </div>
            <p className="text-sm opacity-90">See you at 2:30 PM</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OmnichannelFashionAgent;