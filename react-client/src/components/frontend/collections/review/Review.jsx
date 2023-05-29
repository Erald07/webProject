import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPen, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

function Review(props) {

    const [review, setReview] = useState({
        review_text: '',
        error_list: [],
    });   

    const [allReview, setAllReview] = useState([]);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState([]);
    const inputRef = useRef(null);

    const handleInput = (e) => {
        e.persist();
        setReview({...review, [e.target.name]: e.target.value})
    }

    const handleClick = () => {
        setEditing(current => !current);
        if (inputRef.current) {
            inputRef.current.disabled = false;
            inputRef.current.focus();
            const textLength = inputRef.current.value.length;
            inputRef.current.setSelectionRange(textLength, textLength);
        }
    };

    useEffect(() => {
        axios.get(`/api/getAllReview/${props.id}`).then(res => {
            if(res.data.status === 200){
                setAllReview(res.data.reviews);
            }
        });
    }, [props.id]);

    const submitReview = (e) => {
        e.preventDefault();

        const data = {
            review_text: review.review_text,
            product_id: props.id
        }

        axios.post(`/api/store-review`, data).then(res => {

            if(res.data.status === 200){
                setReview({
                    review_text: '',
                    error_list: [],
                });
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                document.getElementById('REVIEW_FORM').reset();
                document.location.reload(true);
            }
            else if(res.data.status === 400){
                setReview({...review, error_list: res.data.errors})
            }
        });
    }

    const updateReview = (e, review_id) => {
        e.preventDefault();

        const data = review;

        axios.put(`/api/update-review/${review_id}`, data).then(res => {

            if(res.data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                setError([]);
                window.location.reload(true);
            }
            else if(res.data.status === 422){
                Swal.fire({
                    icon: 'error',
                    title: "All fields are mandetory",
                    showConfirmButton: false,
                    timer: 2500
                });
                setError(res.data.errors)
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    showConfirmButton: true,
                });
            }
        });
    }

    const deleteReview = (e, review_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-review/${review_id}`).then( res => {
            if(res.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                });
                window.location.reload(true);
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'error',
                    text: res.data.message,
                    showConfirmButton: true,
                });
            }
        })

    }

    var display_errors = [];
    if(review.error_list){
        display_errors = [
            review.error_list.review_text,
        ];  
    }
    
    return (
    <>
        <div className="border-t-2 border-gray-400">
            <div className="py-8">
                <div className="flex flex-col" id='REVIEW_LIST'>
                    {allReview?.map( (review) => {
                        return(
                            <div key={review.id} id='review' className="flex space-x-4 py-2">
                                <FontAwesomeIcon className='w-12 h-12 text-gray-400' icon={faCircleUser} />
                                <div className="flex flex-col w-full">
                                    {review.user_id === localStorage.getItem('auth_id') ? 
                                        <p className='text-xl italic text-gray-500'>Your review</p>
                                        :
                                        <p className='text-xl italic text-gray-500'><span className='first-letter:uppercase'>{review.user.first_name}</span><span className='first-letter:uppercase'> {review.user.last_name}</span></p>
                                    }
                                    <div className="flex space-x-3 items-center pt-1">
                                        <p className='text-gray-500 text-xs'>{dateFormat(review.created_at, "mmmm dS, yyyy")}</p>
                                        {review.user_id === localStorage.getItem('auth_id') ? 
                                            <>
                                            <button onClick={handleClick} className='text-xs'>
                                                {editing ? 
                                                    <span onClick={(e) => updateReview(e, review.id)} className='px-3 py-1 rounded-full bg-secondary text-white'><FontAwesomeIcon icon={faCheckCircle} /> Save</span>
                                                    :
                                                    <span className='px-3 py-1 rounded-full bg-gray-500 text-white'><FontAwesomeIcon icon={faPen} /> Edit</span>
                                                }
                                            </button>
                                            <button onClick={(e) => deleteReview(e, review.id)} className='text-xs px-3 py-1 rounded-full bg-primary text-white'><FontAwesomeIcon icon={faTrash} /> Delete</button>
                                            </>
                                            :
                                            ""
                                        }
                                    </div>
                                    <textarea onChange={handleInput} name="review_text" id="review" ref={inputRef} className="py-1 px-2 text-sm text-gray-500 w-full my-2" disabled={!editing} >{review.review_text}</textarea>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className="border border-gray-300">
            <div className="px-6 py-4">
                <form onSubmit={submitReview} id='REVIEW_FORM'>
                    <div className="flex flex-col" >
                        <p className='text-gray-700 py-2 text-xl'>Add a review</p>
                        <p className='text-gray-700'>Your email address will not be published. Required fields are marked *</p>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="review_text" className='text-gray-700 text-xl pb-2'>Your reveiw *</label>
                            <textarea name="review_text" onChange={handleInput} rows="4" className='p-2 outline-none border border-gray-300' required></textarea>
                            <p className='my-1 text-red-500'>{display_errors[0]}</p>
                        </div>
                        <button type='submit' className='bg-primary py-2 text-white hover:bg-gray-800 w-32 rounded-md text-lg uppercase tracking-widest '>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default Review
