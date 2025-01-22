import React from "react";
import 'remixicon/fonts/remixicon.css';

const Footer = () => {
  const features = [
    {
      icon: "ri-trophy-line", // Using Remix Icon
      title: "High Quality",
      description: "crafted from top materials",
    },
    {
      icon: "ri-check-line",
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      icon: "ri-truck-line",
      title: "Free Shipping",
      description: "Order over 150 $",
    },
    {
      icon: "ri-headphone-line",
      title: "24 / 7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <div className="bg-[#F9F1E7] w-full py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 justify-center sm:justify-start"
            >
              <i className={`text-2xl sm:text-3xl ${feature.icon}`}></i>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
