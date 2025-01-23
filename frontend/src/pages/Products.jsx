import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { RiAddLine } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: ''
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...(filters.brand && { brand: filters.brand }),
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        ...(filters.sort && { sort: filters.sort })
      });

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, filters]);

  const handleFilterChange = (e, filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: e.target.value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleAddProduct = async (productData) => {
    const loadingToast = toast.loading('Adding product...');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      toast.dismiss(loadingToast);
      
      if (response.ok) {
        toast.success('Product added successfully!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        fetchProducts();
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to add product', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (productData) => {
    const loadingToast = toast.loading('Updating product...');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${productData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      toast.dismiss(loadingToast);
      
      if (response.ok) {
        toast.success('Product updated successfully!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        fetchProducts();
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to update product', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    // Show a loading toast
    const loadingToast = toast.loading('Deleting product...');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`, {
        method: 'DELETE',
      });
      
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      
      if (response.ok) {
        // Show success toast
        toast.success('Product deleted successfully!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        fetchProducts();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error('Failed to delete product', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      
      <div className='bg-[url(./front.png)] bg-left bg-cover bg-no-repeat w-full h-80 relative'>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-55'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 flex-col text-black flex justify-center gap-2 items-center'>
          <span className='font-semibold text-4xl'>Shop</span>
          <span className='font-semibold text-sm' >Home<i class="ri-arrow-right-wide-line"></i> Shop</span>
        </div>
      </div>

      <div className="container mx-auto   px-4 py-4 sm:py-8 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Products</h1>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <RiAddLine className="text-lg" /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by brand"
            value={filters.brand}
            onChange={(e) => handleFilterChange(e, 'brand')}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by category"
            value={filters.category}
            onChange={(e) => handleFilterChange(e, 'category')}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange(e, 'minPrice')}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange(e, 'maxPrice')}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange(e, 'sort')}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Sort by</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name: A to Z</option>
            <option value="name:desc">Name: Z to A</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={(product) => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No products found
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 sm:mt-8 flex justify-center gap-1 sm:gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base transition-colors
                    ${currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base transition-colors ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base transition-colors
                    ${currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default Products; 