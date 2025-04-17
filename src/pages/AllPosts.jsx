import React, { useEffect, useState } from 'react'
import services from '../appwrite/configServices'
import { Container, PostCard } from '../components'

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        services.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.dcocuments)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post} />
                    </div>
                ))}

            </div>
        </Container>
    </div>
  )
}

export default AllPosts