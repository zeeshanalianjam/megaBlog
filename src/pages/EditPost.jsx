import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../appwrite/configServices'
import { Container, PostForm } from '../components'

const EditPost = () => {
    const [post, setPost] = useState()
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        if(slug){
            services.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost