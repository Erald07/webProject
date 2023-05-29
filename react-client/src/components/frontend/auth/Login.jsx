import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputForm from "./InputForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

export default function Login(){

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleShowHide = () => {
        setShow(!show);
    }

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            className: "w-full border outline-gray-400 rounded py-3 px-3 text-gray-700",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: show ? "text" : "password",
            message: "The password must be at least 8 characters, with uppercase and lowercase letters, numbers and special characters.",
            placeholder: "Password",
            className: "w-full border outline-gray-400 rounded py-3 px-3 text-gray-700",
            butoni: show ? 
                (<FontAwesomeIcon icon={faEye} id="show_hide" className="absolute" onClick={handleShowHide} />) 
                : 
                (<FontAwesomeIcon icon={faEyeSlash} id="show_hide" className="absolute" onClick={handleShowHide} />),
            required: true,
        },
        
    ];

    async function Login(){
        axios.get(`/sanctum/csrf-cookie`).then(response => {
            axios.post(`/api/login-user`, values).then(res => {
                if(res.data.status === 200){

                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    localStorage.setItem("auth_id", res.data.id);

                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 2500
                    });

                    if(res.data.role === 'admin'){
                        navigate('/admin/dashboard');
                    }
                    else{
                        navigate('/');
                    }
                }
                else if(res.data.status === 400){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    })
                    setLoading(false);
                }
            });
        })
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return(
        <div className="container pt-16">
            <div className="w-full max-w-md shadow-2xl mx-auto px-3 md:px-8 rounded-xl">
                <h2 className="text-3xl font-norma pt-10">Please log in</h2>
                <div className="mt-6">
                    {inputs.map((input) => (
                        <InputForm key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                    ))}
                    {/* <div className="text-end text-sm underline decoration-1">
                        <Link to={'/forgot-password'}>Forgot password?</Link>
                    </div> */}
                    <div onClick={() => setLoading(true)} className="flex items-center pt-6">
                        <button onClick={Login} className="bg-primary hover:bg-white hover:text-primary duration-75 delay-75 outline-primary outline-1 hover:outline text-white w-full font-bold py-3 px-4 rounded-lg text-sm">
                            {loading ? <svg aria-hidden="true" class="inline w-5 h-5 text-gray-200 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        :
                                        <p>LOG IN</p>
                            }
                        </button>
                    </div>
                    <div className="mt-8 px-3 md:px-8 py-4 text-center">
                        <p className="text-sm ">Do not have an account?</p>
                        <Link to={'/register'} className="text-primary uppercase mt-1 hover:underline hover:decoration-1 text-md font-semibold">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}