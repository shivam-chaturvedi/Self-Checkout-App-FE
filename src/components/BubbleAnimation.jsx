import React from 'react';

const BubbleAnimation = () => {
  return (
    <div className="absolute z-10 w-full h-screen bg-[#296a9ac5] overflow-hidden">
      {/* Bubble 1 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble1 left-[-10%] top-[10%] scale-60"></div>
      
      {/* Bubble 2 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble2 left-[10%] top-[80%] scale-40"></div>

      {/* Bubble 3 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble3 left-[20%] top-[40%] scale-70"></div>

      {/* Bubble 4 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble4 left-[30%] top-0 scale-30"></div>

      {/* Bubble 5 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble5 left-[40%] top-[50%] scale-50"></div>

      {/* Bubble 6 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble6 left-[50%] top-[10%] scale-80"></div>

      {/* Bubble 7 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble7 left-[60%] top-[60%] scale-40"></div>

      {/* Bubble 8 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble8 left-[70%] top-[20%] scale-30"></div>

      {/* Bubble 9 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble9 left-[80%] top-[50%] scale-60"></div>

      {/* Bubble 10 */}
      <div className="absolute rounded-full w-48 h-48 bg-gradient-radial from-white/30 to-transparent shadow-[0_20px_30px_rgba(0,0,0,0.2),inset_0px_10px_30px_5px_rgba(255,255,255,1)] animate-bubble10 left-[90%] top-[80%] scale-30"></div>
    </div>
  );
};

export default BubbleAnimation;
