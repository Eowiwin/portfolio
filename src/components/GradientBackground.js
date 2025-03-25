import React from 'react';

const GradientBlob = ({ className, gradientColors }) => (
  <div 
    className={`absolute rounded-full blur-3xl opacity-70 ${className}`}
    style={{
      background: `linear-gradient(to bottom right, ${gradientColors.join(', ')})`
    }}
  />
);

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-gray-50/50 dark:bg-gray-900/50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a0aec0' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient Blobs */}
      <GradientBlob 
        className="w-[500px] h-[300px] left-[-100px] top-[-50px]"
        gradientColors={['#86efac', '#93c5fd', '#f9a8d4']}
      />
      <GradientBlob 
        className="w-[400px] h-[400px] right-[-50px] top-[100px]"
        gradientColors={['#fde047', '#f9a8d4', '#fca5a5']}
      />
      <GradientBlob 
        className="w-[450px] h-[250px] bottom-[-50px] left-1/4"
        gradientColors={['#93c5fd', '#d8b4fe', '#86efac']}
      />
    </div>
  );
};

export default GradientBackground; 