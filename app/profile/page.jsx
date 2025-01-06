'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {

    const router = useRouter();

    const {data : session} = useSession();

    const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

    const handleEdit = async (myPosts) => {
      router.push(`/update-prompt?id=${myPosts._id}`)
    }

    const handleDelete = async (myPosts) => {
      const hasConfirmed = confirm("Are you sure you want to delete this post?");

      if (hasConfirmed) {
        try {
          const response = await fetch(`/api/prompt/${myPosts._id}`, {
            method: "DELETE"
          });

          const filteredPosts = myPosts.filter((post) => post._id !== myPosts._id);

          setMyPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={myPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile
