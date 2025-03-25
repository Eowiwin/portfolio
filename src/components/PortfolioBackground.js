import React from "react";

const PortfolioBackground = () => {
  return (
    <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gray-200" style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/gray-sand.png')",
        opacity: 0.3
      }}></div>

      {/* Gradient Shapes */}
      <div className="absolute w-[500px] h-[300px] bg-gradient-to-br from-green-300 via-blue-300 to-pink-300 rounded-full blur-3xl opacity-70 left-10 top-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-yellow-300 via-pink-300 to-red-300 rounded-full blur-3xl opacity-70 right-20 top-20"></div>
      <div className="absolute w-[450px] h-[250px] bg-gradient-to-br from-blue-300 via-purple-300 to-green-300 rounded-full blur-3xl opacity-70 bottom-10 left-1/4"></div>
      
      {/* Text Content */}
      <h1 className="text-4xl font-bold text-gray-800 relative z-10">Hey, I'm <span className="text-blue-500">Erwan MENAGER</span></h1>
    </div>
  );
};

export default PortfolioBackground;