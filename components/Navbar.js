"use client"
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)
    // if (session) {
    //     return <>
    //         Signed in as {session.user.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }

    return (
        <nav className='bg-gray-900 text-white flex justify-between px-4 md:h-16 items-center flex-col md:flex-row'>

            <Link className="logo font-bold text-lg flex items-center justify-center" href={"/"}>
                <img className='mb-3 imgInvert ' width={64} src="tea.gif" alt="" />
                <span className='text-xl md:text-base my-3 md:my-0'>Get Me a Chai!</span>
            </Link>



            <div className='relative flex flex-col gap-3 md:block'>
                {session && <>
                 <button onClick={() => setShowdropdown(!showdropdown)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                    <div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            
                            <li>
                                <Link className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Your Page</Link>
                            </li>
                            <li>
                                <Link href="#" onClick={() => signOut()} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Sign Out</Link>
                            </li>
                        </ul>
                    </div></>
                }



                {session && <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => { signOut() }}>LogOut</button>}

                {!session && <Link href={"/login"}>
                    <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button></Link>}
            </div>
        </nav>
    )
}

export default Navbar







