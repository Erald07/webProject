import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './Style.css';
import Review from './review/Review';

function ProductDetail(props) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const[product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const { category_slug } = useParams();
    const { product_slug } = useParams();

    const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const handleIncrement = () => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }       
    }

    const submitAddtocart = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_qty: quantity,
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

    useEffect(() => {
        
        let isMounted = true;

        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product);
                    setLoading(false);
                }
                else if(res.data.status === 404)
                {
                    navigate('/collections');
                    Swal.fire({
                        icon: 'error',
                        title: res.data.message,
                        showConfirmButton: true,
                    });
                }
            }
        })

        return () => {
            isMounted = false
        };
    }, [category_slug, product_slug, navigate]);

    if(loading)
    {
        return  <div className="loader"></div>
    }
    else{

        var avail_stock = '';
        if(product.quantity > 0){
            avail_stock = 
            <div>
                <span className="text-sm px-4 py-2 bg-secondary text-white font-semibold rounded-lg">In Stock</span>
                <div className="pt-8 flex">
                    <div className="w-1/4 border border-gray-300">
                        <div className="py-2 px-3 flex text-gray-500">
                            <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>
                            <div className='form-control text-center w-full bg-gray-100 outline-none'>{quantity}</div>
                            <button type='button' onClick={handleIncrement}  className='input-group-text'>+</button>
                        </div>
                    </div>
                    <div className="w-2/5 mx-2">
                        <button type='button' onClick={submitAddtocart} className='bg-primary w-full px-4 py-2 rounded-md text-white font-semibold uppercase'>Add to Cart</button>
                    </div>
                    {/* <div className="w-2/4 mx-2">
                        <button type='button' className='bg-secondary w-full px-4 py-2 rounded-lg text-white font-semibold uppercase'>Add to wishlist</button>
                    </div> */}
                </div>
            </div>
        }   
        else{
            avail_stock = <div>
            <span className="text-sm px-4 py-2 bg-primary text-white font-semibold rounded-lg first-letter:uppercase">out of Stock</span>
            </div>
        }
    }

    return (
        <div className='bg-gray-100'>
            <div className="container">
                <div className="py-20 px-20">
                    <div className="flex">
                        <div className="w-1/2">
                            <img src={`http://localhost:8000/${product.photo}`} className="w-full" alt={product.name} />
                        </div>
                        <div className="w-1/2 pl-24">
                            <h4 className='text-primary first-letter:uppercase mb-3 text-base font-medium'>
                                {product.category.slug}
                            </h4>
                            <h1 className='font-bold text-3xl first-letter:uppercase mb-6'>{product.name}</h1>
                            <h4 className="mb-1">
                                <span className="text-gray-500 font-normal text-2xl line-through">&#36;{product.original_price}</span>
                                {product.selling_price ? <span className='font-bold text-2xl ml-2'>&#36;{product.selling_price}</span> : ""}
                            </h4>
                            <p className='py-3 text-gray-600'>{product.description}</p>
                            <div>
                                {avail_stock}
                            </div>
                            <fieldset className='border border-gray-300 rounded-md mt-6'>
                                <legend className='mx-auto w-auto text-base font-semibold text-gray-500 px-2'>Guaranteed Safe Checkout</legend>
                                <div className="flex justify-center">
                                    <div className="py-2">
                                        <img src={`http://localhost:8000/img/paypal1.png`} className='w-36' alt="" />
                                    </div>
                                </div>
                            </fieldset>
                            <div className="flex-col mt-4">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-gray-500 ml-2'>No-Risk Money Back Guarantee!</span>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-gray-500 ml-2'>No Hassle Refunds</span>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-gray-500 ml-2'>Secure Payments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12">
                        <Review id={product.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail