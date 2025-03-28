import React , {useState} from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [bgColor, setBgColor] = useState("white"); // Default background

  // Function to change background color dynamically
  const changeBackground = (event) => {
    const computedStyle = window.getComputedStyle(event.target);
    let selectedColor = computedStyle.color; // Default to text color

    // If clicked on a button, use background color instead
    if (computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
      selectedColor = computedStyle.backgroundColor;
    }

    setBgColor(selectedColor); // Update background
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      {/* for whatsapp logo chat */}
      <div className="elfsight-app-e6453eb0-ef8c-476b-ae42-6a096d19011b" data-elfsight-app-lazy></div>
      <section
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-[#ffffff] bg-opacity-75"></div>

        <div className="relative container mx-auto px-6 text-center text-[#141715]">
          <h1 className="text-5xl font-extrabold leading-tight" onClick={changeBackground}>
            Welcome to <span className="text-[#de6c2a]" onClick={changeBackground}>RetailEdge</span>
          </h1>
          <p className="mt-6 text-xl text-blue" onClick={changeBackground}>
            Revolutionize your shopping experience with our self-checkout app.
          </p>
          <Link
            to="/cart"
            className="mt-8 inline-block bg-[#de6c2a] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#c0581f] transition shadow-lg"
            onClick={changeBackground}
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 " style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 text-red-400" onClick={changeBackground}>
            Features
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <img
                src="/images/qr-scan.jpg"
                alt="QR Scan"
                className="w-16 mx-auto mb-4"
              />
              <h4 className="text-lg font-semibold text-[#de6c2a]" onClick={changeBackground}>
                Quick QR Scanning
              </h4>
              <p className="text-gray-600 mt-2" onClick={changeBackground}>
                Easily scan products with your device's camera to add them to
                your cart.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300" >
              <img
                src="/images/self-checkout-icon.jpg"
                alt="Self Checkout"
                className="w-16 mx-auto mb-4"
              />
              <h4 className="text-lg font-semibold text-[#de6c2a]" onClick={changeBackground}>
                Self Checkout
              </h4>
              <p className="text-gray-600 mt-2" onClick={changeBackground}>
                Enjoy the convenience of checking out your items without waiting
                in line.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <img
                src="/images/secure-payment-icon.png"
                alt="Secure Payment"
                className="w-16 mx-auto mb-4"
              />
              <h4 className="text-lg font-semibold text-[#de6c2a]" onClick={changeBackground}>
                Secure Payments
              </h4>
              <p className="text-gray-600 mt-2" onClick={changeBackground}>
                Process your payments securely and efficiently right within the
                app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#C6E7FF] " style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8" onClick={changeBackground}>
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 text-center">
              <p className="text-gray-600 italic" onClick={changeBackground}>
                "RetailEdge has made my shopping experience so much faster and
                easier. I love it!"
              </p>
              <h4 className="mt-4 font-bold text-gray-800" onClick={changeBackground}>- Priya Sharma</h4>
            </div>
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 text-center">
              <p className="text-gray-600 italic" onClick={changeBackground}>
                "No more long queues! This app is a game-changer."
              </p>
              <h4 className="mt-4 font-bold text-gray-800" onClick={changeBackground}>- Aman Gupta</h4>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8" onClick={changeBackground}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            <details className="mb-4 border-b pb-2">
              <summary className="text-lg font-semibold cursor-pointer" onClick={changeBackground}>
                Is RetailEdge compatible with all devices?
              </summary>
              <p className="mt-2 text-gray-600" onClick={changeBackground}>
                Yes, RetailEdge works seamlessly on both Android and iOS
                devices.
              </p>
            </details>
            <details className="mb-4 border-b pb-2">
              <summary className="text-lg font-semibold cursor-pointer" onClick={changeBackground}>
                How secure are my payments?
              </summary>
              <p className="mt-2 text-gray-600" onClick={changeBackground}>
                We use industry-standard encryption to ensure all transactions
                are safe and secure.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#FFF2D7]" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4" onClick={changeBackground}>
            Ready to Shop Smarter?
          </h2>
          <p className="text-gray-700 text-lg mb-6" onClick={changeBackground}>
            Download RetailEdge today and enjoy a hassle-free shopping
            experience.
          </p>
          <Link
            to="/download"
            className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-md"
            onClick={changeBackground}
          >
            Download the App
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#C6E7FF] text-[#141715] py-6" >
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">&copy; 2024 RetailEdge. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/terms" className="hover:underline text-[#de6c2a]" onClick={changeBackground}>
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline text-[#de6c2a]" onClick={changeBackground}>
              Privacy Policy
            </Link>

            <Link to="/contact" className="hover:underline text-[#de6c2a]" onClick={changeBackground}>
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
// const slides = [
//     {
//         heading: "Welcome to Retail Edge",
//         subheading: "Revolutionize your shopping experience with our self-checkout app.",
//         buttonText: "Start Shopping",
//         buttonLink: "/cart",
//     },
//     {
//         heading: "Effortless Self-Checkout",
//         subheading: "No queues, no hassle—scan, pay, and go!",
//         buttonText: "Learn More",
//         buttonLink: "/features",
//     },
//     {
//         heading: "Secure Payments",
//         subheading: "Fast and reliable transactions you can trust.",
//         buttonText: "Get Started",
//         buttonLink: "/cart",
//     },
// ];

// const HeroSection = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section className="relative h-screen bg-cover bg-center overflow-hidden">
//             <div className="absolute w-full h-full bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6]"></div>
//             <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Overlay */}
//             <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center text-white">
//                 <h1 className="text-5xl font-extrabold leading-tight transition-opacity duration-1000 opacity-100">
//                     {slides[currentSlide].heading}
//                 </h1>
//                 <p className="mt-6 text-xl transition-opacity duration-1000 opacity-100">
//                     {slides[currentSlide].subheading}
//                 </p>
//                 <Link
//                     to={slides[currentSlide].buttonLink}
//                     className="mt-8 inline-block bg-[#de6c2a] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#c0581f] transition-shadow shadow-lg"
//                 >
//                     {slides[currentSlide].buttonText}
//                 </Link>
//             </div>
//         </section>
//     );
// };
// const features = [
//     {
//         title: "Quick QR Scanning",
//         description: "Scan products using your smartphone camera and instantly add them to your shopping cart. It's seamless and efficient!",
//         image: "/images/farzi5.png",
//     },
//     {
//         title: "Self Checkout",
//         description: "Complete your checkout process directly from your phone without waiting in long queues. Convenience redefined!",
//         image: "/images/farzi4.png",
//     },
//     {
//         title: "Secure Payments",
//         description: "Your transactions are encrypted and processed securely, giving you peace of mind every time you shop.",
//         image: "/images/farzi2.png",
//     },
// ];

// const FeaturesSection = () => {
//     return (
//         <section className="py-16 bg-gray-50">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Features</h2>
//                 {features.map((feature, index) => (
//                     <div key={index} className="flex flex-col md:flex-row items-center mb-12">
//                         <img
//                             src={feature.image}
//                             alt={feature.title}
//                             className="w-1/2 md:w-1/3 mb-4 md:mb-0 md:mr-8"
//                         />
//                         <div>
//                             <h3 className="text-2xl font-semibold text-[#de6c2a] mb-4">{feature.title}</h3>
//                             <p className="text-gray-700">{feature.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// const testimonials = [
//     {
//         title: "Shopping Made Easy",
//         feedback: "Retail Edge has completely changed the way I shop. I love the self-checkout feature—it’s quick, easy, and incredibly convenient!",
//         rating: 5,
//         customer: "Priya Sharma",
//     },
//     {
//         title: "No More Queues",
//         feedback: "I can’t imagine shopping without Retail Edge now. The secure payments and the smooth checkout process are top-notch.",
//         rating: 4.5,
//         customer: "Aman Gupta",
//     },
// ];

// const TestimonialsSection = () => {
//     return (
//         <section className="py-16 bg-[#254E58]">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Users Say</h2>
//                 {testimonials.map((testimonial, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow p-8 mb-8">
//                         <h3 className="text-xl font-bold text-[#de6c2a]">{testimonial.title}</h3>
//                         <p className="italic text-gray-700 my-4">{testimonial.feedback}</p>
//                         <p className="text-yellow-500">{"⭐".repeat(testimonial.rating)}</p>
//                         <h4 className="mt-4 font-bold text-gray-800">- {testimonial.customer}</h4>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// const faqs = [
//     {
//         question: "Is Retail Edge compatible with all devices?",
//         answer: "Yes, Retail Edge works seamlessly on both Android and iOS devices, ensuring a smooth experience regardless of your platform.",
//     },
//     {
//         question: "How secure are my payments?",
//         answer: "We use industry-standard encryption to ensure all your transactions are safe, secure, and confidential.",
//     },
//     {
//         question: "Can I return items using the app?",
//         answer: "Absolutely! Retail Edge allows you to initiate returns directly from the app with just a few taps.",
//     },
//     {
//         question: "What is the self-checkout feature?",
//         answer: "The self-checkout feature enables you to scan, pay, and leave without waiting in queues, saving you valuable time.",
//     },
//     {
//         question: "Is there customer support available?",
//         answer: "Yes, our dedicated customer support team is available 24/7 to assist you with any issues or queries.",
//     },
//     {
//         question: "Does the app support multiple payment options?",
//         answer: "Yes, you can pay via credit/debit cards, UPI, digital wallets, or net banking for your convenience.",
//     },
//     {
//         question: "Are there any hidden charges?",
//         answer: "No, Retail Edge is transparent in its operations, and there are no hidden fees or charges.",
//     },
//     {
//         question: "Can I track my purchase history?",
//         answer: "Yes, you can view and manage your purchase history directly from the app’s dashboard.",
//     },
// ];

// const FAQSection = () => {
//     return (
//         <section className="py-16 bg-gray-50">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
//                 <div className="max-w-4xl mx-auto">
//                     {faqs.map((faq, index) => (
//                         <details key={index} className="mb-6 border-b pb-4">
//                             <summary className="text-lg font-semibold cursor-pointer">
//                                 {faq.question}
//                             </summary>
//                             <p className="mt-2 text-gray-700">{faq.answer}</p>
//                         </details>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// const Footer = () => {
//     return (
//         <footer className="bg-[#254E58] text-[#FFFFFF] py-8">
//             <div className="container mx-auto px-6">
//                 <div className="text-center">
//                     {/* Logo */}
//                     <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">
//                         Retail Edge
//                     </h2>
//                     {/* Description */}
//                     <p className="text-sm text-white mb-6">
//                         Empowering your shopping experience with innovation and convenience.
//                     </p>
//                     {/* Navigation Links */}
//                     <div className="flex justify-center space-x-6 mb-4">
//                         <Link
//                             to="/terms"
//                             className="text-[#FFFFFF] hover:text-[#de6c2a] transition">
//                             Terms of Service
//                         </Link>
//                         <Link
//                             to="/privacy"
//                             className="text-[#FFFFFF] hover:text-[#de6c2a] transition">
//                             Privacy Policy
//                         </Link>
//                         <Link
//                             to="/contact"
//                             className="text-[#FFFFFF] hover:text-[#de6c2a] transition">
//                             Contact Us
//                         </Link>
//                     </div>
//                 </div>
//                 {/* Copyright */}
//                 <div className="mt-6 text-center text-sm text-white">
//                     &copy; {new Date().getFullYear()} Retail Edge. All Rights Reserved.
//                 </div>
//             </div>
//         </footer>
//     );
// };

// return (
//     <div>
//         {/* Hero Section */}
//         <HeroSection />

//         {/* Features Section */}
//         <FeaturesSection />

//         {/* Testimonials Section */}
//         <TestimonialsSection />

//         {/* FAQ Section */}
//         <FAQSection />

//         {/* Footer */}
//         <Footer />
//     </div>
// );

// };

// export default HomePage;
