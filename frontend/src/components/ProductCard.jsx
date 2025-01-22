import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin6Line, RiShoppingCart2Line, RiHeartLine, RiSearchLine } from 'react-icons/ri';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl w-full sm:w-[200px] md:w-[220px] lg:w-[250px]"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmTlhFbdfuGz8Gz93VLiCDbHdrY5sRW3qMdg&s" 
          alt={product.name} 
          className="w-full h-32 sm:h-36 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay with actions */}
        <div className={`
          absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2
          transition-opacity duration-300
          ${showActions ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* Quick actions */}
          <button 
            className="p-2 bg-white rounded-full hover:bg-[#B88E2F] hover:text-white transform hover:scale-110 transition-all duration-300"
            onClick={() => onEdit(product)}
          >
            <RiSearchLine size={18} />
          </button>
          <button 
            className="p-2 bg-white rounded-full hover:bg-[#B88E2F] hover:text-white transform hover:scale-110 transition-all duration-300"
          >
            <RiHeartLine size={18} />
          </button>
          <button 
            className="p-2 bg-white rounded-full hover:bg-[#B88E2F] hover:text-white transform hover:scale-110 transition-all duration-300"
          >
            <RiShoppingCart2Line size={18} />
          </button>
        </div>

        {/* Admin actions */}
        <div className={`
          absolute top-2 right-2 flex gap-2
          transition-opacity duration-300
          ${showActions ? 'opacity-100' : 'opacity-0'}
        `}>
          <button 
            onClick={() => onEdit(product)}
            className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all duration-300"
          >
            <RiEditLine size={16} />
          </button>
          <button 
            onClick={() => onDelete(product._id)}
            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all duration-300"
          >
            <RiDeleteBin6Line size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 bg-white transition-transform duration-300 group-hover:translate-y-[-4px]">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate group-hover:text-[#B88E2F]">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 truncate">{product.brand}</p>
        <p className="text-xs text-gray-500 truncate">{product.category}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-sm sm:text-base font-bold text-[#B88E2F]">
            ${product.price}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-xs">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 