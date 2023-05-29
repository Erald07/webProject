import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import './Style.css';
import FilterComponent from "../multirangeSlider/RangeSlider";

function ViewProduct(props)
{
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const order = searchParams.get('orderBy');
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [modalPrice, setModalPrice] = useState(false);
    const productsCount = product.length;
    const { product_slug } = useParams();

    function handleChange(e){
        navigate(`?orderBy=${e.target.value}`)
    }

    useEffect(() => {
        let isMounted = true;

        axios.post(`/api/fetchproducts/${product_slug}`, { orderBy: order }).then(res => {
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading(false);
                }
                else if(res.data.status ===400)
                {
                    Swal("Warning",res.data.message,"");
                }
                else if(res.data.status ===404)
                {
                    navigate('/collections');
                    Swal("Warning",res.data.message,"error");
                }
            }
        })

        return () => {
            isMounted = false
        };
        
    }, [order, product_slug, navigate]);


    if(loading)
    {
        return  <div className="loader"></div>
    }
    else
    {
        var showProductList = '';
        if(productsCount)
        {
            showProductList = product.map( (item, idx) => {
                return (
                    <div className="flex w-1/4" key={idx}>
                        <div className="flex-col w-full px-2">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.photo}`} className="w-full h-80 bg-slate-100 px-2 py-2" alt={item.name} />
                            </Link>
                            <div className="py-3 px-4">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5 className="uppercase font-bold text-ellipsis">{ item.name }</h5>
                                </Link>  
                                {item.original_price ? 
                                    <span className="font-thin text-gray-600 text-sm line-through">&#36;{item.original_price}</span>
                                    :
                                    ""
                                }    
                                {item.original_price ? 
                                    <span className="font-bold text-gray-700 text-sm"> &#36;{item.selling_price}</span>
                                    :
                                    ""
                                }                         
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else
        {
            showProductList = 
            <div className="col-md-12">
                <h4>No products available for {category.name}</h4>
            </div>
        }
    }

    return (
        <div className="bg-white">
            <div className="container">
                <div className="py-12">
                    <div className="py-5 flex px-3 text-gray-600 text-sm">
                        <span><Link to={'/'}>Home </Link></span>
                        <span className="first-letter:uppercase"> / {product_slug}</span>
                    </div>
                    <div className="pb-5 pt-2 flex px-3 text-gray-700 text-base items-center justify-between">
                        <div className="flex">
                            <span>Showing all {productsCount} results</span>
                            {productsCount === 0 ? "" : <button onClick={(e) => setModalPrice(current => !current)} className="px-4"><FontAwesomeIcon icon={faSliders} /><span className="px-2">Filter</span></button>}
                        </div>
                        <div className="flex">
                            <p className='font-normal text-xs md:text-sm'>
                                <select onChange={handleChange} className='border border-solid border-gray-300 px-4 py-2 rounded-full text-gray-600 text-base sm:text-xs leading-tight focus:outline-none pr-6 ml-2'>
                                    <option value={'default'} selected={order === null ? true : false}>Default sorting</option>
                                    <option value={'popularity'} selected={order === 'popularity' ? true : false}>Sort by popularity</option>
                                    <option value={'latest'} selected={order === 'latest' ? true : false}>Sort by latest</option>
                                    <option value={'price-low-to-high'} selected={order === 'price-low-to-high' ? true : false}>Sort by price: low to high</option>
                                    <option value={'price-high-to-low'} selected={order === 'price-high-to-low' ? true : false}>Sort by price: high to low</option>
                                </select>
                            </p>
                        </div>
                    </div>
                    {modalPrice ? <FilterComponent /> : ""}
                    <div className="py-3 flex flex-wrap">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;