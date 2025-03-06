import React, { useState, useEffect } from "react";
import shop from "../image/shop.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Variable";

const Shop = () => {
  const navigate = useNavigate();
  const location=useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const priceQuery=queryParams.get('price' || '');

  console.log("url",API_URL);

  // State to hold fetched products
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');

const handOrderInfoClick = (product,e) => {
  e.preventDefault();
  navigate('/Productpage', { state: { product } });
};

const handleCategoryChange = (category) => {
  setSelectedCategories((prev) => 
    prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
  );
};

const handlePriceChange = (type, value) => {
  if (type === "min") setMinPrice(value);
  else setMaxPrice(value);
};

const handleSortChange = (sortOption) => {
  setSortOrder(sortOption);
};


  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          search:searchQuery,
          price:priceQuery,
          categories: selectedCategories.join(','), 
          minPrice,
          maxPrice,
          sortOrder
        };
  
        const response = await axios.get(`${API_URL}/product/getproducts`, { params });
        setProducts(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
  
    fetchProducts();
  }, [selectedCategories, minPrice, maxPrice, sortOrder,searchQuery,priceQuery]);
  
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

   // Change page handler
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Calculate total pages
   const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 space-y-8 md:space-y-0 md:space-x-8">
      {/* Filters Section */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
              {["Gown", "Kurti", "Saree", "Lehenga Choli"].map((category) => (
                <li key={category}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Price Range</h3>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Min price"
              className="w-full border border-gray-300 rounded-md p-2" 
              value={minPrice}
              onChange={(e) => handlePriceChange("min", e.target.value)}         
            />
            <input
              type="number"
              placeholder="Max price"
              className="w-full border border-gray-300 rounded-md p-2"
              value={maxPrice}
              onChange={(e) => handlePriceChange("max", e.target.value)}
            />
          </div>
        </div>

        <div>
            <h3 className="text-lg font-bold mb-4">Sort Order</h3>
            <ul className="space-y-2">
              {["Most Popular", "Best Rating", "Newest", "Price Low - High", "Price High - Low"].map((option) => (
                <li key={option}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sort"
                      className="form-radio"
                      onChange={() => handleSortChange(option)}
                      checked={sortOrder === option}
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
      </div>

      {/* Products Section */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(currentProducts) && currentProducts.length === 0 ? (
          <div className="col-span-3 text-center">
            <p>Loading products...</p>
          </div>
        ) : (
          Array.isArray(currentProducts) && currentProducts.map((product, index) => (
            <div
              key={index}
              className="h-[410px] border border-gray-200 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={product.images && product.images.length > 0 
                      ? `${API_URL}/${JSON.parse(product.images)[0]}` 
                      : shop}
                alt={`Product ${index + 1}`}
                className="w-full h-[300px] object-cover mb-4 rounded-md"
                onClick={(event) => handOrderInfoClick(product, event)}
              />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p className="text-gray-500 mt-2">₹{product.price}</p>
            </div>
          ))
        )}
      </div>

      
    </div>
    <div >
      {/* Pagination Section Below Products */}
      <div className="flex justify-center  mt-8">
        <ul className="flex space-x-4">
          {/* Show previous page button if not on the first page */}
          {currentPage > 1 && (
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Prev
              </button>
            </li>
          )}

          {/* Show page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`px-4 py-2 rounded-lg ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          {/* Show next page button if not on the last page */}
          {currentPage < totalPages && (
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Shop;






// import React, { useState, useEffect } from "react";
// import shop from "../image/shop.png";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const Shop = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [categories, setCategories] = useState([]);
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   const productsPerPage = 6;

//   const handOrderInfoClick = (product, e) => {
//     e.preventDefault();
//     navigate('/Productpage', { state: { product } });
//   };

//   const fetchProducts = async () => {
//     try {
//       const params = {
//         categories: categories.join(','),
//         minPrice,
//         maxPrice,
//         sortBy,
//         page: currentPage,
//         limit: productsPerPage,
//         search: new URLSearchParams(location.search).get("search") || ""
//       };

//       const response = await axios.get('http://localhost:3000/product/getproducts', { params }); 
//       console.log("API Response:", response.data);
//       setProducts(response.data);

//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, categories, minPrice, maxPrice, sortBy, location.search]);

//   const handleCategoryChange = (category) => {
//     if (categories.includes(category)) {
//       setCategories(categories.filter(cat => cat !== category));
//     } else {
//       setCategories([...categories, category]);
//     }
//   };

//   const handlePriceChange = (e, type) => {
//     if (type === "min") setMinPrice(e.target.value);
//     if (type === "max") setMaxPrice(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   return (
//     <>
//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 space-y-8 md:space-y-0 md:space-x-8">
//         {/* Filters Section */}
//         <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md space-y-6">
//           <div>
//             <h3 className="text-lg font-bold mb-4">Categories</h3>
//             <ul className="space-y-2">
//               {["Gown", "Kurti", "Saree", "Lehenga Choli"].map((category) => (
//                 <li key={category}>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       className="form-checkbox"
//                       checked={categories.includes(category)}
//                       onChange={() => handleCategoryChange(category)}
//                     />
//                     <span>{category}</span>
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-bold mb-4">Price Range</h3>
//             <div className="space-y-4">
//               <input
//                 type="number"
//                 placeholder="Min price"
//                 value={minPrice}
//                 onChange={(e) => handlePriceChange(e, "min")}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//               <input
//                 type="number"
//                 placeholder="Max price"
//                 value={maxPrice}
//                 onChange={(e) => handlePriceChange(e, "max")}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-bold mb-4">Sort Order</h3>
//             <ul className="space-y-2">
//               {["Most Popular", "Best Rating", "Newest", "Price Low - High", "Price High - Low"].map((option) => (
//                 <li key={option}>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="sort"
//                       value={option}
//                       checked={sortBy === option}
//                       onChange={handleSortChange}
//                       className="form-radio"
//                     />
//                     <span>{option}</span>
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Products Section */}
//         <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.isArray(currentProducts) && currentProducts.length === 0 ? (
//             <div className="col-span-3 text-center">
//               <p>No products found...</p>
//             </div>
//           ) : (
//             Array.isArray(currentProducts) && currentProducts.map((product, index) => (
//               <div
//                 key={index}
//                 className="h-[410px] border border-gray-200 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-200"
//               >
//                 <img
//                   src={product.image && product.image[0] ? product.image[0] : shop}
//                   alt={`Product ${index + 1}`}
//                   className="w-full h-[300px] object-cover mb-4 rounded-md"
//                   onClick={(event) => handOrderInfoClick(product, event)}
//                 />
//                 <h4 className="text-lg font-semibold">{product.name}</h4>
//                 <p className="text-gray-500 mt-2">₹{product.price}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Pagination Section Below Products */}
//       <div className="flex justify-center mt-8">
//         <ul className="flex space-x-4">
//           {currentPage > 1 && (
//             <li>
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 className="px-4 py-2 rounded-lg bg-gray-300"
//               >
//                 Prev
//               </button>
//             </li>
//           )}

//           {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//             <li key={pageNumber}>
//               <button
//                 onClick={() => paginate(pageNumber)}
//                 className={`px-4 py-2 rounded-lg ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//               >
//                 {pageNumber}
//               </button>
//             </li>
//           ))}

//           {currentPage < totalPages && (
//             <li>
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 className="px-4 py-2 rounded-lg bg-gray-300"
//               >
//                 Next
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Shop;
