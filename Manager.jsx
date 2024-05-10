import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const ref = useRef();
    const passwordRef=useRef()
    
    const [form, setform] = useState({ site: "", username: "", password: "" });

    const showPassword = () => {
        passwordRef.current.type="text"
        
        if (ref.current.src.includes("eyeslash.jfif")) {
            ref.current.src = "eye.jfif";
            passwordRef.current.type="password"
        }
        else {
            passwordRef.current.type="text"
            ref.current.src = "eyeslash.jfif";
        }
    };

    const savePassword = () => {
        if(form.site.length >0 && form.username.length>0 && form.password.length>0){
            setpasswordArray([...passwordArray, {...form,id : uuidv4()}]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id : uuidv4()}]));
            console.log([...passwordArray, form]);
            setform({site:"",username:"",password:""})
        }
        
    };

    const deletePassword=(id) => { 
        console.log("Deleting password with id ",id);
        setpasswordArray(passwordArray.filter(item=>item.id!=id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)));
     }

     const editPassword=(id) => { 
        console.log("Editing password with id ",id);
        setform(passwordArray.filter(item=>item.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!=id))
     }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, []);


    return (


        <div className=" p-1 md:mycontainer bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-300 via-white to-white ">
            <h1 className='text-4xl text-center font-bold'>

                <span className=' text-green-700'> &lt; </span>
                <span>Pass</span><span className='text-green-500'>OP /&gt;</span>

            </h1>
            <p className='text-green-900 text-lg text-center'>Your own password manager</p>
            <div className="text-black flex flex-col p-4 gap-8">
                <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                <div className="flex w-full justify-between gap-8 md:flex-row flex-col">
                    <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />

                    <div className="relative">

                        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="password" id="password" />
                        <span className='absolute right-0 p-2 cursor-pointer' onClick={showPassword}>
                            <img ref={ref} width={26} className='relative bottom-1' src="eyeslash.jfif" alt="" />
                        </span>
                    </div>

                </div>

                <div className="flex justify-center gap-3">

                    <button onClick={savePassword} className=' bg-green-500 rounded-full p-3 hover:bg-green-400 '>Add Password</button>

                </div>

            </div>

            <div className="passwords">
                <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                {passwordArray.length === 0 && <div> No passwords to show</div>}
                {passwordArray.length != 0 &&
                    <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>

                            {passwordArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div onClick={() => { copyText(item.site); } } className="flex justify-center gap-5">
                                                <span>
                                                    <a target='_blank' href="{item.site}">{item.site}</a>
                                                </span>
                                                <span>
                                                    <img className='p-1 cursor-pointer' width={26} src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/copy-icon.png" alt="" />

                                                </span>
                                            </div>

                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div onClick={() => { copyText(item.username); } } className="flex justify-center gap-5">
                                                <span>
                                                    {item.username}
                                                </span>
                                                <span>
                                                    <img className='p-1 cursor-pointer' width={26} src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/copy-icon.png" alt="" />

                                                </span>
                                            </div>

                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div onClick={() => { copyText(item.password); } } className="flex justify-center gap-5">
                                                <span>
                                                    {item.password}
                                                </span>
                                                <span>
                                                    <img className='p-1 cursor-pointer' width={26} src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/copy-icon.png" alt="" />

                                                </span>
                                            </div>
                                        </td>

                                        <td className='justify-center py-2 border border-white text-center w-32'>

                                        <div className="flex justify-center">
                                        <span onClick={() => { editPassword(item.id) }} className='mx-2 cursor-pointer'>
                                           <img width={26} src="https://th.bing.com/th?id=OIP.mUfg-Eczh0choVJw9tQ-4AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
                                           </span>
                                            

                                           <span onClick={() => { deletePassword(item.id) }}  className='mx-2 cursor-pointer'>
                                           <img width={26} src="https://th.bing.com/th/id/OIP.JymbH67S1jo-lRK9jNGHrQHaHa?w=193&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                                           </span>
                                        </div>
                                            
                                        </td>

                                    </tr>
                                );

                            })}



                        </tbody>
                    </table>}
            </div>
        </div>





    );
}

export default Manager