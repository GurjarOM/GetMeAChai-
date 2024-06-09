"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'



const PaymentPage = ({ username }) => {
    // const { data: session } = useSession();

    const [paymentform, setpaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if(searchParams.get("paymentdone") == "true") {
            toast('🦄 Payment has been made!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    // router.push(`${username}`)
      
    }, [])
    


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        // console.log(u, dbpayments)
    }

    const pay = async (amount) => {
        // get the order Id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();


    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-52 md:h-[400]' src={currentUser.coverpic} alt="" />


                <div className="profilePic absolute -bottom-16 right-[36%] md:right-[46%] border-2 border-white overflow-hidden  rounded-2xl size-32">
                    <img className='rounded-2xl object-cover size-32' width={120} height={120} src={currentUser.profilepic} alt="" />

                    {/* dogs pic        https://wallpapers.com/images/high/cheems-76o6aaqcfyns1au1.webp */}
                </div>
            </div>

            <div className="info flex flex-col justify-center items-center my-24 gap-2">
                <div className='font-bold text-lg'>
                    @{username}
                </div>

                <div className='text-slate-400'>
                    Lets help {username} get a chai
                </div>

                <div className='text-slate-400'>
                    {payments.length} Payments .  ₹{payments.reduce((a,b) => a+b.amount, 0)} raised
                </div>

                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        {/* show list of all the supporters as a leaderboard */}
                        <h2 className='text-2xl font-bold my-5 '>Top 10 Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <li>No Payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img width={30} src="avatar.gif" alt="" />
                                    <span> {p.name} donated <span className="font-bold">₹{p.amount}</span> with a message "{p.message}"</span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">

                        <h2 className='text-2xl font-bold my-5 '>Make a payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <div className=''>

                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />

                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-slate-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount<1}>Pay</button>
                        </div>
                        {/* or choose from these amounts */}
                        <div className="flex gap-2 mt-5">
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage