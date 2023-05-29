import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './collections/Style.css'

const SearchResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const order = searchParams.get('orderBy');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const productsCount = results.length;

    const handleAddOrder = (e, newParams) => {
        const existingQuery = new URLSearchParams(window.location.search);
        const newQuery = new URLSearchParams();

        if (existingQuery.has(newParams)) {
            existingQuery.set(newParams, `${e.target.value}`);
        } 
        else {
            existingQuery.append(newParams, `${e.target.value}`);
        }

        existingQuery.forEach((value, key) => {
            newQuery.append(key, value);
        });


        const newURL = `${window.location.pathname}?${newQuery.toString()}`;

        navigate(newURL);
    };

    useEffect(() => {
        const fetchResults = async () => {
            try {
                await axios.post('/api/search', { searchText: query, orderBy: order }).then(res => {
                    if (res.data.status === 200) {
                        setResults(res.data.products);
                        setLoading(false)
                    }
                    else {
                        Swal("Warning", res.data.message, "");
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query, order]);

    if (loading) {
        return <div className="loader"></div>
    }
    else {
        var showProductList = '';
        if (productsCount) {
            showProductList = results.map((product, idx) => {
                return (
                    <div className="flex w-1/4" key={idx}>
                        <div className="flex-col w-full px-2">
                            <Link to={`/collections/${product.category.slug}/${product.slug}`}>
                                <img src={`http://localhost:8000/${product.photo}`} className="w-full h-80 bg-slate-100 px-2 py-2" alt={product.name} />
                            </Link>
                            <div className="py-3 px-4">
                                <Link to={`/collections/${product.category.slug}/${product.slug}`}>
                                    <h5 className="uppercase font-bold text-ellipsis">{product.name}</h5>
                                </Link>
                                {product.original_price ?
                                    <span className="font-thin text-gray-600 text-sm line-through">&#36;{product.original_price}</span>
                                    :
                                    ""
                                }
                                {product.original_price ?
                                    <span className="font-bold text-gray-700 text-sm"> &#36;{product.selling_price}</span>
                                    :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            showProductList =
                <div className="col-md-12 px-3">
                    <h4>No products were found</h4>
                </div>
        }
    }

    return (
        <div className="bg-white">
            <div className="container">
                <div className="py-12">
                    <div className="py-5 flex px-3 text-gray-600 text-sm">
                        <span><Link to={'/'}>Home </Link>/ Search results for "{query}"</span>
                    </div>
                    <div className="flex items-center py-2 justify-between">
                        <div className="flex px-3 py-2 text-gray-700 text-base items-center">
                            <span>Showing all {productsCount} results</span>
                        </div>
                        <div className="flex">
                            <p className='font-normal text-xs md:text-sm'>
                                <select onChange={(e) => handleAddOrder(e, 'orderBy')} className='border border-solid border-gray-300 px-4 py-2 rounded-full text-gray-600 text-base sm:text-xs leading-tight focus:outline-none pr-6 ml-2'>
                                    <option value={'default'} selected={order === null ? true : false}>Default sorting</option>
                                    <option value={'popularity'} selected={order === 'popularity' ? true : false}>Sort by popularity</option>
                                    <option value={'latest'} selected={order === 'latest' ? true : false}>Sort by latest</option>
                                    <option value={'price-low-to-high'} selected={order === 'price-low-to-high' ? true : false}>Sort by price: low to high</option>
                                    <option value={'price-high-to-low'} selected={order === 'price-high-to-low' ? true : false}>Sort by price: high to low</option>
                                </select>
                            </p>
                        </div>
                    </div>
                    <div className="py-3 flex flex-wrap">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;