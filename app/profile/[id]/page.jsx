'use client'
import React from 'react'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile  = ( {params}) => {

    const searchParams = useSearchParams();
  const userName = searchParams.get("name");



const [userPost, setUserPost] = useState([]);



    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
    
          setUserPost(data);
        };
    
        if (params?.id) fetchPosts();
      }, [params.id]);
    

    


  return (
    <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPost}
    />
  )
}

export default MyProfile 