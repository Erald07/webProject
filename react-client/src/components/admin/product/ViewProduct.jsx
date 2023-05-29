import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../frontend/collections/Style.css';

const ViewProduct = () => {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`/api/view-product`).then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.products);
        setLoading(false);
      }
    });
  }, []);

  var display_ProductData = "";

  if (loading) {
    return  <div className="loader"></div>
  } else {
    var ProductStatus = '';
    display_ProductData = viewProduct.map((item) => {
      if(item.status == '0'){
        ProductStatus = 'Shown'
      }
      else if(item.status == '1'){
        ProductStatus = 'Hidden'
      }
      return (
        item.quantity === '0' ? 
          <tr key={item.id} className="text-center items-center border-b-2 border-gray-300 last-of-type:border-none bg-red-600 py-4">
            <td>{item.id}</td>
            <td>{item.category.name}</td>
            <td>{item.name}</td>
            <td>{item.original_price} &euro;</td>
            <td>{item.selling_price} &euro;</td>
            <td>
              <img src={`http://localhost:8000/${item.photo}`} alt={item.name} className="w-20" />
            </td>
            <td className="py-3 px-2"><Link to={`/admin/edit-product/${item.id}`} className='py-1.5 px-2 text-base font-medium bg-secondary text-white rounded-lg'>Edit</Link></td>
            <td>{ProductStatus}</td>
          </tr>
        :
          <tr key={item.id} className="text-center items-center border-b-2 border-gray-300 last-of-type:border-none py-4">
            <td className='px-4'>{item.id}</td>
            <td>{item.category.name}</td>
            <td>{item.name}</td>
            <td>{item.original_price} &euro;</td>
            <td>{item.selling_price} &euro;</td>
            <td>
              <img src={`http://localhost:8000/${item.photo}`} alt={item.name} className="w-20" />
            </td>
            <td className="py-3 px-2"><Link to={`/admin/edit-product/${item.id}`} className='py-1.5 px-2 text-base font-medium bg-secondary text-white rounded-lg'>Edit</Link></td>
            <td>{ProductStatus}</td>
          </tr>
      );
    });
  }

  return (
    <div className='w-full shadow-2xl p-6'>
      <div className='flex justify-between'>
        <h1 className='text-3xl pt-3 pb-8 font-medium'>View Product</h1>
        <Link to={'/admin/add-product'} className='px-5 text-white bg-gray-700 items-center rounded-xl text-md h-fit py-2 mt-6'>Add Product</Link>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Original Price
              </th>
              <th scope="col" className="px-6 py-3">
                Selling Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className='bg-gray-200'>
            {display_ProductData}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
