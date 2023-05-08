import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Product() {
  const [categorylist, setCategorylist] = useState([]);
  const [productInput, setProduct] = useState({
    category_id: '',
    name: '',
    slug: '',
    description: '',
    original_price: '',
    selling_price: '',
    quantity: '',
    warranty: '',
  });

  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  }
  const handleImage = (e) => {
    setPicture( {image: e.target.files[0]} );
  }

  const [allcheckbox, setCheckboxes] = useState([]);
  const handleCheckbox = (e) => {
    setCheckboxes( {...allcheckbox, [e.target.name]: e.target.checked} );
  }

  useEffect(() => {
    axios.get('/api/all-category').then(res => {
      if (res.data.status === 200) {
        setCategorylist(res.data.category);
      }
    })
  }, []);

  const submitProduct = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('image', picture.image);
    formData.append('category_id', productInput.category_id);
    formData.append('name', productInput.name);
    formData.append('slug', productInput.slug);
    formData.append('description', productInput.description);
    formData.append('original_price', productInput.original_price);
    formData.append('selling_price', productInput.selling_price);
    formData.append('quantity', productInput.quantity);
    formData.append('warranty', productInput.warranty);
    formData.append('featured', allcheckbox.featured ? '1' : '0');
    formData.append('popular', allcheckbox.popular ? '1' : '0');
    formData.append('status', allcheckbox.status ? '1' : '0');


    axios.post('/api/store-product', formData).then(res => {
      if (res.data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 2500
        });
        setProduct({
          ...productInput,
          category_id: '',
          name: '',
          slug: '',
          description: '',
          original_price: '',
          selling_price: '',
          quantity: '',
          warranty: '',
          featured: '',
          popular: '',
          status: '',
        });
        setError([]);
      }
      else if (res.data.status === 422) {
        Swal.fire({
          icon: 'error',
          title: "All fields are mandetory",
          showConfirmButton: false,
          timer: 2500
        });
        setError(res.data.errors);
      }
    });
  }

    return (
        <div className='w-full shadow-2xl p-6'>
            <h1 className='text-3xl pt-3 pb-8 font-medium'>Add Product</h1>
            <form onSubmit={submitProduct} encType="multipart/form-data" id='PRODUCT_FORM'>
                <div className="mb-6">
                    <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 ">Select Category</label>
                    <select onChange={handleInput} value={productInput.category_id} name='category_id' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" >
                        <option value="">Select Categotry</option>
                        {
                          categorylist.map( (item) => {
                            return(
                              <option value={item.id} key={item.id}>{item.name}</option>
                            );
                          })
                        }
                    </select>
                    <p className='my-1 text-red-500'>{errorlist.category_id}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label>
                    <input type="text" onChange={handleInput} value={productInput.name} name="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{errorlist.name}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 ">Slug</label>
                    <input type="text" onChange={handleInput} value={productInput.slug} name="slug" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{errorlist.slug}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea onChange={handleInput} value={productInput.description} name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" ></textarea>
                    <p className='my-1 text-red-500'>{errorlist.description}</p>
                </div>
                <div className="mb-6 flex space-x-5">
                    <div className='w-full'>
                        <label htmlFor="original_price" className="block mb-2 text-sm font-medium text-gray-900 ">Original Price</label>
                        <input type='text' onChange={handleInput} value={productInput.original_price} name="original_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        <p className='my-1 text-red-500'>{errorlist.original_price}</p>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="selling_price" className="block mb-2 text-sm font-medium text-gray-900 ">Selling Price</label>
                        <input type='text' onChange={handleInput} value={productInput.selling_price} name="selling_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        <p className='my-1 text-red-500'>{errorlist.selling_price}</p>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Quantity</label>
                        <input type='text' onChange={handleInput} value={productInput.quantity} name="quantity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        <p className='my-1 text-red-500'>{errorlist.quantity}</p>
                    </div>
                    <div className="w-full">
                      <label htmlFor="warranty" className="block mb-2 text-sm font-medium text-gray-900 ">Warranty</label>
                      <input type='text' onChange={handleInput} value={productInput.warranty} name="warranty" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                      <p className='my-1 text-red-500'>{errorlist.warranty}</p>
                  </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                    <input type='file' onChange={handleImage} name="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    <p className='my-1 text-red-500'>{errorlist.image}</p>
                </div>
                <div className="flex items-start mb-6 space-x-20">
                  <div className='flex'>
                    <div className="flex items-center h-5">
                        <input type="checkbox" name='featured' onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ? true : false} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-900">Featured</label>
                  </div>
                  <div className='flex'>
                    <div className="flex items-center h-5">
                        <input type="checkbox" name='popular' onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true : false} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="popular" className="ml-2 text-sm font-medium text-gray-900">Popular</label>
                  </div>
                  <div className='flex'>
                    <div className="flex items-center h-5">
                        <input type="checkbox" name='status' onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                    </div>
                    <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-900">Status</label>
                  </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
}

export default Product;