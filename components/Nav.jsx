"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import{ signIn, signOut, useSession, getProviders } from 'next-auth/react';


const Nav = () => {

  const {data: session} = useSession();
  const [proveiders, setProveiders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  


  useEffect(() => {
    const setUpProveiders = async () => {
      const response = await getProviders();

      setProveiders(response)
    }
    setUpProveiders();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3 '>
    <Link href='/' className='flex gap-2 flex-center'>
        <Image src=" /assets/images/logo.svg" alt='logo' width={30} height={30}  />
        <p className='logo_text'> Promtps.ia </p>


    </Link>



    {/* Desktop   navigation */}
    <div className='sm:flex hidden'>
        {session?.user ? 
        (
          <div className='flex gap-3 md:gap-5'>
          <Link href="/create-prompt" className='black_btn'>
              Create Post
          </Link>

          <button type="button" onClick={signOut} className='outline_btn'>
            Sign Out
          </button>

          <Link href="/profile">
            <Image 
              src={session?.user.image}
              alt='user image'
              width={37}
              height={37}
              className='object-contain rounded-full'

            />
             
          </Link>

        </div>
        ):(
          <>
          {proveiders && Object.values(proveiders).map((proveider) => (
            <button type='button' key={proveider.name} onClick={() => signIn(proveider.id)}  className='black_btn'>
            Sign In


            </button>
          ))}

          </>
        )
        
        }

    </div>

    {/* mobilenav */}

    <div className='sm:hidden flex relative'>
      {session?.user ? (
        <div className='flex'>

          <Image 
            src={session?.user.image}
            width={37}
            height={37}
            className='object-contain'
            alt='profile'
            onClick={() => setToggleDropDown((prev) => (!prev))}
          />
          
          {toggleDropDown && (
            <div className='dropdown'>
              <Link href='/profile'
              className='dropdown_link'
              onClick={() => setToggleDropDown(false)}
              >My Profile
              </Link>

              <Link href='/profile'
              className='dropdown_link'
              onClick={() => setToggleDropDown(false)}
              >Create Prompt
              </Link>

              <button type='button'
              onClick={() => {
                setToggleDropDown(false);
                signOut();
              }}
              className='mt-5 w-full black_btn'
              >
              Sign Out
              </button>

            </div>
          )}

        </div>
      ) : (
        <>
          {proveiders && Object.values(proveiders).map((proveider) => (
            <button type='button' key={proveider.name} onClick={() => signIn(proveider.id)}  className='black_btn'>
             Sign In


            </button>
          ))}

          </>
      )

      }

      </div>

    

    </nav>
  )
}

export default Nav