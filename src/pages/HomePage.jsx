

// import React from "react";
// import { BackgroundBeams } from "../components/ui/background-beams";
// import { Link } from "react-router-dom";
// import { Button } from "../components/ui/moving-border";
import { HoverEffect } from "../components/ui/card-hover-effect";
 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";


import { Button } from "../components/ui//Button"


// const HomePage = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-neutral-950">
//       <div className="elfsight-app-e6453eb0-ef8c-476b-ae42-6a096d19011b" data-elfsight-app-lazy></div>
      
//       {/* Banner Section */}
//        <section
//         className="relative py-16 bg-cover bg-center"
//         style={{ backgroundImage: "url('/images/banner.jpg')" }}
//       >
//         <div className="relative container mx-auto px-6 text-center text-[#141715]">
//           <h1 className="text-5xl font-extrabold leading-tight">
//             Welcome to <span className="text-[#de6c2a]">RetailEdge</span>
//           </h1>
//           <p className="mt-6 text-xl text-blue">
//             Revolutionize your shopping experience with our self-checkout app.
//           </p>
//           <Link
//             to="/cart"
//             className="mt-8 inline-block bg-[#de6c2a] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#c0581f] transition shadow-lg"
//           >
//             Start Shopping
//           </Link>
//         </div>
//       </section> 
//       {/* Features Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-red-400 mb-8">
//             Features
//           </h2>
//           <div className="flex flex-wrap justify-center gap-8">
//             {/* Feature 1 */}
//             <div className=" rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
//               <img
//                 src="/images/qr-scan.jpg"
//                 alt="QR Scan"
//                 className="w-16 mx-auto mb-4"
//               />
//               <h4 className="text-lg font-semibold text-[#de6c2a]">
//                 Quick QR Scanning
//               </h4>
//               <p className="text-gray-600 mt-2">
//                 Easily scan products with your device's camera to add them to your cart.
//               </p>
//             </div>
//             {/* Feature 2 */}
//             <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
//               <img
//                 src="/images/self-checkout-icon.jpg"
//                 alt="Self Checkout"
//                 className="w-16 mx-auto mb-4"
//               />
//               <h4 className="text-lg font-semibold text-[#de6c2a]">
//                 Self Checkout
//               </h4>
//               <p className="text-gray-600 mt-2">
//                 Enjoy the convenience of checking out your items without waiting in line.
//               </p>
//             </div>
//             {/* Feature 3 */}
//             <div className=" rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
//               <img
//                 src="/images/secure-payment-icon.png"
//                 alt="Secure Payment"
//                 className="w-16 mx-auto mb-4"
//               />
//               <h4 className="text-lg font-semibold text-[#de6c2a]">
//                 Secure Payments
//               </h4>
//               <p className="text-gray-600 mt-2">
//                 Process your payments securely and efficiently right within the app.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 ">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
//             What Our Users Say
//           </h2>
//           <div className="flex flex-wrap justify-center gap-8">
//             <div className=" rounded-lg shadow p-6 w-full md:w-1/3 text-center">
//               <p className="text-gray-600 italic">
//                 "RetailEdge has made my shopping experience so much faster and easier. I love it!"
//               </p>
//               <h4 className="mt-4 font-bold text-gray-800">- Priya Sharma</h4>
//             </div>
//             <div className=" rounded-lg shadow p-6 w-full md:w-1/3 text-center">
//               <p className="text-gray-600 italic">
//                 "No more long queues! This app is a game-changer."
//               </p>
//               <h4 className="mt-4 font-bold text-gray-800">- Aman Gupta</h4>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//      <section className="py-16">
//       <div className="max-w-3xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center text-black mb-8">
//           Frequently Asked Questions
//         </h2>
//         <Accordion type="single" collapsible>
//           <AccordionItem value="item-1">
//             <AccordionTrigger>What is a self-checkout application?</AccordionTrigger>
//             <AccordionContent>
//               A self-checkout application allows customers to scan, manage, and pay for items on their own using a mobile device, without waiting in line at the cashier.
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem value="item-2">
//             <AccordionTrigger>How do I use the self-checkout system?</AccordionTrigger>
//             <AccordionContent>
//               A self-checkout application allows customers to scan, manage, and pay for items on their own using a mobile device, without waiting in line at the cashier.
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem value="item-3">
//             <AccordionTrigger>How is payment handled?</AccordionTrigger>
//             <AccordionContent>
//               You can pay securely using UPI, debit/credit cards, or digital wallets integrated within the app. All payments are encrypted for safety.
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem value="item-4">
//             <AccordionTrigger>Can I scan all types of products?</AccordionTrigger>
//             <AccordionContent>
//               Yes, all store-eligible items with valid barcodes or QR codes can be scanned. For items without codes, assistance is available at help desks.
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem value="item-5">
//             <AccordionTrigger>What if the scanner doesn’t detect a product?</AccordionTrigger>
//             <AccordionContent>
//               If scanning fails, try adjusting the camera focus or lighting. If the issue persists, use the manual search or contact in-store support.
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </section>


//       {/* Call to Action Section */}
//       <section className="py-16 ">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold text-cyan-300 mb-4">
//             Ready to Shop Smarter?
//           </h2>
//           <p className="text-gray-700 text-lg mb-6">
//             Download RetailEdge today and enjoy a hassle-free shopping experience.
//           </p>
//           <Link
//             to="/download"
//             className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-md"
//           >
//             Download the App
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className=" text-[#141715] py-6">
//         <div className="container mx-auto px-6 text-center">
//           <p className="mb-2">&copy; 2024 RetailEdge. All Rights Reserved.</p>
//           <div className="flex justify-center space-x-4">
//             <Link to="/terms" className="hover:underline text-[#de6c2a]">Terms of Service</Link>
//             <Link to="/privacy" className="hover:underline text-[#de6c2a]">Privacy Policy</Link>
//             <Link to="/contact" className="hover:underline text-[#de6c2a]">Contact Us</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="elfsight-app-e6453eb0-ef8c-476b-ae42-6a096d19011b" data-elfsight-app-lazy></div>

      {/* Hero Section */}
      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#ffffff] bg-opacity-50"></div>
        <div className="relative container mx-auto px-6 text-center text-[#141715]">
          <h1 className="text-5xl font-extrabold leading-tight" >
            Welcome to <span className="text-[#1fe4c4] " >RetailEdge</span>
          </h1>
          <p className="mt-6  mb-10 text-xl text-blue">
            Revolutionize your shopping experience with our self-checkout app.
          </p>
          <Link
            to="/cart"
           
          >
            <Button variant="default" size="xl">Start Shopping</Button>
          </Link>
          
          
        </div>
      </section>
 



    <div className="container mx-auto px-10 lg:px-32 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side: Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Our Cart Module</h2>
          <p className="text-lg text-muted-foreground">
            RetailEdge aims to address these problems by offering a comprehensive, automated 
            solution that integrates key aspects of retail operations into a single, cohesive platform.</p>
            <p className="text-lg text-muted-foreground"> By utilizing advanced technologies such as IoT devices, automated billing systems, and real
            time inventory management, RetailEdge reduces manual errors, speeds up the checkout 
            process, and ensures accurate inventory tracking. This results in improved customer 
            experiences, increased operational efficiency, and enhanced profitability for retailers.</p> 
            <p className="text-lg text-muted-foreground">Through its innovative approach, RetailEdge bridges the gap between traditional retail 
            practices and modern digital advancements, driving the industry towards a more efficient 
            and customer-centric future. 
          </p>
        </div>

        {/* Right side: Image */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
          <img
            src="/images/checkout4.png"
            alt="Descriptive image alt text"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>



      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black-700 mb-8">
            Our Features
          </h2>
          <div className="max-w-5xl mx-auto px-8">
              <HoverEffect items={projects} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="h-[25rem] rounded-md flex flex-col antialiased bg-[#82c3f0] dark:bg-[#82c3f0] dark:bg-grid-[#8f84e2] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>

      {/* FAQ Section */}
           <section className="py-16">
       <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
             <AccordionTrigger>What is a self-checkout application?</AccordionTrigger>
            <AccordionContent>
              A self-checkout application allows customers to scan, manage, and pay for items on their own using a mobile device, without waiting in line at the cashier.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-2">
             <AccordionTrigger>How do I use the self-checkout system?</AccordionTrigger>
             <AccordionContent>
               A self-checkout application allows customers to scan, manage, and pay for items on their own using a mobile device, without waiting in line at the cashier.
             </AccordionContent>
           </AccordionItem>
           <AccordionItem value="item-3">
             <AccordionTrigger>How is payment handled?</AccordionTrigger>
             <AccordionContent>
               You can pay securely using UPI, debit/credit cards, or digital wallets integrated within the app. All payments are encrypted for safety.
             </AccordionContent>
           </AccordionItem>
           <AccordionItem value="item-4">
             <AccordionTrigger>Can I scan all types of products?</AccordionTrigger>
             <AccordionContent>
               Yes, all store-eligible items with valid barcodes or QR codes can be scanned. For items without codes, assistance is available at help desks.
             </AccordionContent>
           </AccordionItem>
           <AccordionItem value="item-5">
             <AccordionTrigger>What if the scanner doesn’t detect a product?</AccordionTrigger>
             <AccordionContent>
               If scanning fails, try adjusting the camera focus or lighting. If the issue persists, use the manual search or contact in-store support.
             </AccordionContent>
           </AccordionItem>
        </Accordion>
       </div>
    </section>

      {/* <section className="py-16 bg-[#FFF2D7]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">Ready to Shop Smarter?</h2>
          <p className="text-gray-700 text-lg mb-6">
            Download RetailEdge today and enjoy a hassle-free shopping experience.
          </p>
          <Link
            to="/download"
            className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-md"
          >
            Download the App
          </Link>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-[#82c3f0] text-[#141715] py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">&copy; 2024 RetailEdge. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/terms" className="hover:underline text-[#4e8eea]">Terms of Service</Link>
            <Link to="/privacy" className="hover:underline text-[#4e8eea]">Privacy Policy</Link>
            <Link to="/contact" className="hover:underline text-[#4e8eea]">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

const projects = [
  {
    title: "Automated Billing System",
    description:
      "This feature allows customers to self-checkout with ease, reducing wait times and enhancing convenience. The system automatically calculates the total bill, minimizing errors associated with manual billing.",
    // link: "https://stripe.com",
  },
  {
    title: "Inventory Management Module",
    description:
      " This module provides real-time stock updates, helping retailers avoid shortages or overstocking. By maintaining accurate inventory levels, retailers can ensure that popular products are always available while minimizing waste. ",
    // link: "https://netflix.com",
  },
  {
    title: "Payment Integration",
    description:
      "The application supports multiple payment methods, inluding digital wallets and UPI, catering to diverse customer preferences. This flexibility ensures a smooth and secure payment process, enhancing overall satisfaction.",
    // link: "https://google.com",
  },
  {
    title: "Multi-Platform Accessibility",
    description:
      "RetailEdge is designed to be accessible across vaious devices, including desktops, tablets, and smartphones. This multi-platform support ensures that both customers and staff can use the system conveniently, regardless of their device.",
    // link: "https://meta.com",
  },
];
const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];


