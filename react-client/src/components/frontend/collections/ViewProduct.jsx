import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';

function ViewProduct(props)
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const[product, setProduct] = useState([]);
    const[category, setCategory] = useState([]);
    const productsCount = product.length;

    useEffect(() => {
        
        let isMounted = true;

        const product_slug = props.match.params.slug;
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
                    navigate.push('/collections');
                    Swal("Warning",res.data.message,"error");
                }
            }
        })

        return () => {
            isMounted = false
        };
    }, [navigate]);

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
                    <div className="col-md-3" key={idx}>
                        <div className="card">
                            <Link to="">
                                <img src={`http://localhost:8000/${item.image}`} className="w-100" alt=""></img>
                            </Link>
                            <div className="card-body">
                                <Link>
                                    <h5>{ item.name }</h5>
                                </Link>                            
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
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections / {category.name}</h6>
                </div>
            </div>
            <div className="py-3 bg-warning">
                <div className="row">
                    {showProductList}
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;