import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import './Style.css';
import Swal from 'sweetalert2';

function Home() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/all-product`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.products);
                setLoading(false);
            }
        });
    }, []);

    const submitAddtocart = (e, item_id) => {
        e.preventDefault();

        const data = {
            product_id: item_id,
            product_qty: 1,
        }

        axios.post(`/api/add-to-cart`, data).then(res => {
            if(res.data.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: true,
                });
            }
            else if(res.data.status === 409){
                Swal.fire({
                    icon: 'warning',
                    title: res.data.message,
                    showConfirmButton: true,
                });
            }
            else if(res.data.status === 401){
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    showConfirmButton: true,
                });
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'warning',
                    title: res.data.message,
                    showConfirmButton: true,
                });
            }
        });
    }

    var prod_list = ''
    if(loading){
        return  <div className="loader"></div> 
    }
    else{
        prod_list = <div className="py-8">
            <div className="flex flex-wrap">
                {product.map( (item, idx) => {
                    return(
                        <>{item.original_price && item.selling_price && item.original_price - item.selling_price !==0 && idx >= 1 && idx <= 4 ?
                        <div key={idx} className="item flex flex-col w-1/4 px-2"> 
                            <Link className='image' to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.photo}`} alt={item.photo} />
                            </Link>
                            <div onClick={(e) => submitAddtocart(e, item.id)} className="basketShopping px-2 py-1 bg-white absolute mt-3 ml-3 rounded-full">
                                <FontAwesomeIcon icon={faBasketShopping} />
                            </div>
                            <div className="py-2">
                                <Link className='title' to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <p className='text-base font-bold first-letter:uppercase'>{item?.name}</p>
                                </Link>
                                <div className="pt-1 flex">
                                    {item?.original_price ? <span className='text-sm text-gray-500 font-thin line-through'>&#36;{item.original_price}</span> : ""}
                                    <span className='font-bold text-gray-800 text-sm pl-1'>&#36;{item?.selling_price}</span>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                        }
                    </>
                    );
                })}
            </div>
        </div>
    }

    return (
        <div className='bg-gray-50'>
            <div className="container">
                <div className="pt-40 pb-20">
                    <div className="justify-between flex items-center">
                        <div className="flex-col w-1/3">
                            <div className="pb-12 pr-8">
                                <div className="font-bold text-6xl first-letter:uppercase">
                                    {product[0]?.name}
                                </div>
                            </div>
                            <div className="pt-20">
                                <div className="flex items-center">
                                    <p className='pr-4'>&#36;{product[0]?.selling_price}</p>
                                    <button type='button' onClick={(e) => submitAddtocart(e, product[0].id)} className='text-lg py-2 px-5 text-center bg-primary text-white hover:bg-gray-900 duration-150 ease-linear rounded-md uppercase'>add to cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <img className='w-full' src={`http://localhost:8000/${product[0]?.photo}`} alt="" />
                        </div>
                        <div className="py-10 px-20 w-1/3">
                            <p className='text-2xl font-bold'>Description</p>
                            <p className='pt-4 first-letter:uppercase'>{product[0]?.description}</p>
                            <div className="pt-24 flex flex-col">
                                <p className='text-gray-600 font-bold text-xl'>Share:</p>
                                <div className="flex pt-2 space-x-3">
                                    <div className="py-3 px-3.5 bg-black rounded-full">
                                        <FontAwesomeIcon className=' text-white text-2xl' icon={faFacebook}/>
                                    </div>
                                    <div className="py-3 px-3.5 bg-black rounded-full">
                                        <FontAwesomeIcon className=' text-white text-2xl' icon={faTwitter}/>
                                    </div>
                                    <div className="py-3 px-3 bg-black rounded-full">
                                        <FontAwesomeIcon className=' text-white text-2xl' icon={faYoutube}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {prod_list}
            </div>
        </div>
    );
}

export default Home