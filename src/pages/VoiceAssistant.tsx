import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ShoppingCart, CreditCard, Search, X, Star, CheckCircle, Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  brand: string;
  originalPrice?: number;
}

// Define the order status types
type OrderStatus = 'cart' | 'payment_successful' | 'confirmed' | 'tracking';

const VoiceRetailAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState('Click the microphone to start shopping with voice!');
  
  // NEW STATE FOR ORDER FLOW
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('cart');
  const [orderData, setOrderData] = useState<{ id: string; date: string; expectedDelivery: string } | null>(null);

  const recognitionRef = useRef<any>(null);

  // Expanded Product Database with REALISTIC IMAGE URL PLACEHOLDERS
  const productDatabase: Product[] = [
    // Electronics
    { id: '1', name: 'iPhone 15 Pro', price: 999, originalPrice: 1199, category: 'Electronics', brand: 'Apple', rating: 4.8, image: '/assets/iphone15pro.jpg', description: 'Latest Apple smartphone' },
    { id: '2', name: 'Samsung Galaxy S24', price: 899, originalPrice: 950, category: 'Electronics', brand: 'Samsung', rating: 4.5, image: '/assets/samsungs24.jpg', description: 'Premium Android phone' },
    { id: '3', name: 'MacBook Pro', price: 2499, originalPrice: 2799, category: 'Electronics', brand: 'Apple', rating: 4.9, image: '/assets/macbookpro.jpg', description: 'Powerful laptop for professionals' },
    { id: '4', name: 'Sony WH-1000XM5', price: 399, category: 'Electronics', brand: 'Sony', rating: 4.7, image: '/assets/sonyheadphones.jpg', description: 'Noise-canceling headphones' },
    { id: '11', name: 'Smart Watch', price: 299, category: 'Electronics', brand: 'Fitbit', rating: 4.2, image: '/assets/smartwatch.jpg', description: 'Fitness and health tracker' },

    // Women's Clothing
    { id: '16', name: 'Floral Maxi Dress', price: 65, originalPrice: 120, category: "Women's Clothing", brand: 'Vero Moda', rating: 4.4, image: '/assets/floral_maxi_dress.jpg', description: 'Elegant summer maxi dress' },
    { id: '17', name: 'High-Waist Jeans', price: 49, category: "Women's Clothing", brand: 'Levi\'s', rating: 4.6, image: '/assets/womens_jeans.jpg', description: 'Comfortable high-rise denim' },
    { id: '18', name: 'Crop Top', price: 20, category: "Women's Clothing", brand: 'H&M', rating: 4.1, image: '/assets/crop_top.jpg', description: 'Casual cotton crop top' },
    { id: '19', name: 'Leather Handbag', price: 150, category: "Accessories", brand: 'Caprese', rating: 4.7, image: '/assets/leather_handbag.jpg', description: 'Premium leather shoulder bag' },

    // Men's Clothing & Shoes
    { id: '9', name: 'Straight-Fit Jeans', price: 89, category: "Men's Clothing", brand: 'Levi\'s', rating: 4.5, image: '/assets/mens_jeans.jpg', description: 'Classic denim jeans for men' },
    { id: '10', name: 'Polo T-Shirt', price: 35, originalPrice: 50, category: "Men's Clothing", brand: 'USPA', rating: 4.3, image: '/assets/polo_tshirt.jpg', description: 'Collared pique cotton shirt' },
    { id: '7', name: 'Running Shoes', price: 150, category: 'Shoes', brand: 'Nike', rating: 4.6, image: '/assets/running_shoes.jpg', description: 'Comfortable athletic running shoes' },
    { id: '20', name: 'Formal Blazer', price: 120, originalPrice: 199, category: "Men's Clothing", brand: 'Raymond', rating: 4.4, image: '/assets/formal_blazer.jpg', description: 'Smart office wear blazer' },
    
    // Kids & Toys
    { id: '21', name: 'Building Blocks Set', price: 45, category: 'Toys', brand: 'Lego', rating: 4.9, image: '/assets/lego_blocks.jpg', description: 'Classic 1000-piece creative block set' },
    { id: '22', name: 'Remote Control Car', price: 30, category: 'Toys', brand: 'Hasbro', rating: 4.0, image: '/assets/rc_car.jpg', description: 'High-speed rechargeable RC car' },
    { id: '23', name: 'Dinosaur T-Shirt', price: 15, category: "Kids' Clothing", brand: 'Gini & Jony', rating: 4.5, image: '/assets/kids_tshirt.jpg', description: "Fun graphic tee for children" },

    // Home Goods
    { id: '13', name: 'Coffee Maker', price: 79, category: 'Home', brand: 'Cuisinart', rating: 4.3, image: '/assets/coffee_maker.jpg', description: 'Automatic 12-cup coffee machine' },
    { id: '14', name: 'Blender', price: 59, originalPrice: 85, category: 'Home', brand: 'NutriBullet', rating: 4.6, image: '/assets/blender.jpg', description: 'High-speed personal blender' },
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Reset order status when starting a new command
    if (orderStatus !== 'cart') {
        setOrderStatus('cart');
        setOrderData(null);
    }
    
    // Search for products
    const matchedProducts = productDatabase.filter(product => 
      product.name.toLowerCase().includes(lowerCommand) ||
      product.category.toLowerCase().includes(lowerCommand) ||
      product.brand.toLowerCase().includes(lowerCommand) ||
      lowerCommand.split(' ').some(word => 
        product.name.toLowerCase().includes(word) || 
        product.category.toLowerCase().includes(word) ||
        product.brand.toLowerCase().includes(word)
      )
    );

    if (matchedProducts.length > 0) {
      setProducts(matchedProducts);
      setAssistantMessage(`Found ${matchedProducts.length} product(s) matching "${command}". Click on a product to view details.`);
      speak(`I found ${matchedProducts.length} products for you.`);
    } else if (lowerCommand.includes('cart') || lowerCommand.includes('checkout')) {
      if (cart.length > 0) {
        setShowPayment(true);
        setAssistantMessage('Opening payment gateway...');
        speak('Opening checkout');
      } else {
        setAssistantMessage('Your cart is empty. Add some products first!');
        speak('Your cart is empty');
      }
    } else if (lowerCommand.includes('show all') || lowerCommand.includes('show everything')) {
      setProducts(productDatabase);
      setAssistantMessage('Showing all available products.');
      speak('Showing all products');
    } else {
      setAssistantMessage(`I couldn't find anything matching "${command}". Try saying "iPhone", "dress", "toys", or "show all".`);
      speak('No products found');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      if (transcript && !products.length && !showPayment) {
        handleVoiceCommand(transcript);
      }
    } else {
      setTranscript(''); 
      recognitionRef.current?.start();
      setIsListening(true);
      setAssistantMessage('Listening... Say a product name or category!');
    }
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setAssistantMessage(`${product.name} added to cart!`);
    speak('Added to cart');
    setSelectedProduct(null);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };
  
  const getDiscountPercentage = (product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  // UPDATED handlePayment function to simulate the entire flow
  const handlePayment = () => {
    setAssistantMessage('Processing payment...');
    speak('Payment processing');
    setShowPayment(false); // Close the initial modal

    // --- 1. Simulate Payment Successful ---
    setTimeout(() => {
        setOrderStatus('payment_successful');
        setAssistantMessage('Payment successful! Your order is being processed.');
        speak('Payment successful');
    }, 1500);

    // --- 2. Simulate Order Confirmed ---
    setTimeout(() => {
        const orderId = 'RL4356527';
        const today = new Date();
        const confirmedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        // Calculate expected delivery date (e.g., 2-5 days later)
        const expectedMin = new Date();
        expectedMin.setDate(today.getDate() + 2);
        const expectedMax = new Date();
        expectedMax.setDate(today.getDate() + 5);
        
        const expectedDelivery = `${expectedMin.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${expectedMax.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

        setOrderData({
            id: orderId,
            date: confirmedDate,
            expectedDelivery: expectedDelivery,
        });

        setOrderStatus('confirmed');
        setAssistantMessage(`Order ${orderId} confirmed! Check below for details.`);
        speak('Order confirmed');
    }, 4000); // 4 seconds total

    // --- 3. Simulate Order Tracking (Processing) ---
    setTimeout(() => {
        setOrderStatus('tracking');
        setAssistantMessage('Your order is currently processing and being prepared for shipment.');
        speak('Order tracking initiated');
        setCart([]); // Clear cart only after tracking starts
    }, 7000); // 7 seconds total
  };


  // --- JSX for Order Flow States ---

  const renderPaymentSuccessful = () => (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto mb-6 text-center">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-lg text-gray-600">Code #PL335527</p>
        <p className="mt-4 text-sm text-gray-500">Processing your order with loyalty benefits applied.</p>
    </div>
  );

  const renderOrderConfirmed = () => (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto mb-6">
        <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Order Confirmed</h2>
            <span className="text-sm text-gray-500">#{orderData?.id}</span>
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <p className="text-sm text-green-700 font-semibold">
                Order placed successfully! Expected item {orderData?.expectedDelivery}.
            </p>
        </div>

        <div className="mt-6 space-y-4">
            {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e: any) => e.target.src = 'https://via.placeholder.com/64?text=P'}
                    />
                    <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-green-600 font-bold">${item.price}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all">
            Track Order
        </button>
    </div>
  );

  const renderOrderTracking = () => (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto mb-6">
        <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Order Tracking</h2>
            <span className="text-sm text-gray-500">#{orderData?.id}</span>
        </div>

        <p className="text-gray-600 my-4">Your order is being prepared for shipment.</p>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6 flex items-center gap-2">
            <Clock size={20} className="text-blue-600" />
            <p className="text-sm text-blue-700 font-semibold">
                Currently Processing
            </p>
        </div>

        <div className="space-y-4">
            {/* Status Steps */}
            <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-xs text-gray-500">Oct 26, 2:45 PM</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-xs text-gray-500">Oct 26, 3:30 PM</p>
                </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
                <CheckCircle size={20} className="text-gray-400" />
                <div>
                    <p className="font-medium">Shipped</p>
                    <p className="text-xs text-gray-500">Expected: Oct 26</p>
                </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
                <CheckCircle size={20} className="text-gray-400" />
                <div>
                    <p className="font-medium">Out for Delivery</p>
                    <p className="text-xs text-gray-500">Expected: Oct 27</p>
                </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
                <CheckCircle size={20} className="text-gray-400" />
                <div>
                    <p className="font-medium">Delivered</p>
                    <p className="text-xs text-gray-500">Expected: {orderData?.expectedDelivery}</p>
                </div>
            </div>
        </div>
    </div>
  );


  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Voice Controls */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">🛍️ Voice Retail Assistant</h1>
              <p className="text-gray-600">{assistantMessage}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleListening}
                className={`p-4 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse ring-4 ring-red-300' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white shadow-lg`}
              >
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
              </button>
              <div className="relative">
                <button
                  onClick={() => { setShowPayment(true); setOrderStatus('cart'); }} // Reset status when opening cart
                  className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all"
                >
                  <ShoppingCart size={32} />
                </button>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </div>
          {transcript && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">You said: <span className="font-semibold">{transcript}</span></p>
            </div>
          )}
        </div>

        {/* Dynamic Order Flow Content (Visible outside of modal, replacing the product grid) */}
        {(orderStatus === 'payment_successful' || orderStatus === 'confirmed' || orderStatus === 'tracking') && (
            <div className="mb-6">
                {orderStatus === 'payment_successful' && renderPaymentSuccessful()}
                {orderStatus === 'confirmed' && renderOrderConfirmed()}
                {orderStatus === 'tracking' && renderOrderTracking()}
            </div>
        )}
        
        {/* Products Grid (Hidden if an order flow is active) */}
        {products.length > 0 && orderStatus === 'cart' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              >
                {/* Product Image Area */}
                <div className="relative h-48 overflow-hidden">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        onError={(e: any) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'}
                    />
                    {product.originalPrice && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                            {getDiscountPercentage(product)}% OFF
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="p-3">
                  <p className="text-xs text-gray-500 font-bold uppercase truncate">{product.brand}</p>
                  <h3 className="text-base font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 h-8">{product.description}</p>
                  
                  {/* Price Section */}
                  <div className="flex items-baseline mt-2">
                    <span className="text-lg font-bold text-green-700">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="flex items-center mt-2">
                    <span className="flex items-center bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                        <Star size={12} className="mr-1 fill-white"/> {product.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">({Math.floor(Math.random() * 500) + 50} Ratings)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Detail Modal (Unchanged) */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="h-64 mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="max-h-full max-w-full object-contain" 
                      onError={(e: any) => e.target.src = 'https://via.placeholder.com/250?text=No+Image'}
                  />
              </div>

              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <p className="text-sm text-gray-500 mb-4">Brand: {selectedProduct.brand} | Category: {selectedProduct.category}</p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-green-600">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                        <span className="text-xl text-gray-400 line-through ml-3">${selectedProduct.originalPrice}</span>
                    )}
                </div>
              </div>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {/* Payment Modal (Only shown when orderStatus is 'cart' and showPayment is true) */}
        {showPayment && orderStatus === 'cart' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                <button onClick={() => setShowPayment(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="mb-6 max-h-60 overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" onError={(e: any) => e.target.src = 'https://via.placeholder.com/32?text=P'} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-green-600">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${getTotalPrice()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    Proceed to Payment Gateway
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    In production, this would integrate with Stripe, PayPal, or Razorpay
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Quick Commands (Updated) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Try saying:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {['Dress', 'Tops for women', 'Kids toys', 'Men shirt', 'Shoes', 'Electronics', 'Show all', 'Checkout'].map(cmd => (
              <button
                key={cmd}
                onClick={() => handleVoiceCommand(cmd)}
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm transition-all"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceRetailAssistant;