import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewProduct(props)
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const[product, setProduct] = useState([]);
    const[category, setCategory] = useState([]);
    const productsCount = product.length;
    const { product_slug } = useParams();

    useEffect(() => {
        
        let isMounted = true;

        axios.get(`/api/fetchproducts/${product_slug}`).then(res => {
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
    }, [product_slug, navigate]);

    if(loading)
    {
        return <h4>Loading Products...</h4>
    }
    else
    {
        var showProductList = '';
        if(productsCount)
        {
            showProductList = product.map( (item, idx) => {
                return (
                    <div className="flex w-1/4 px-3" key={idx}>
                        <div className="flex-col">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src="https://media.wired.com/photos/63f00cfbde5e9cf54ad7754a/4:3/w_1536,h_1152,c_limit/Best-Android-Phones-2023-Featured-2023.jpg" className="w-full" alt={item.name} />
                            </Link>
                            <div className="py-3">
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
        <div className="bg-gray-100">
            <div className="container">
                <div className="py-12">
                    <div className="py-5 flex px-3 text-gray-600 text-sm">
                        <span><Link to={'/'}>Home </Link></span>
                        <span className="first-letter:uppercase"> / {product_slug}</span>
                    </div>
                    <div className="pb-5 pt-2 flex px-3 text-gray-700 text-base">
                        <span>Showing all {productsCount} results</span>
                    </div>
                    <div className="py-3 flex">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;