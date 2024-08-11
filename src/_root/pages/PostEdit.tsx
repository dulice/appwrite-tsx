import PostForm from '@/components/forms/PostForm'
import Loader from '@/components/shared/Loader'
import { useGetPostById } from '@/lib/react-query/queries'
import { mdiBookEdit } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { useParams } from 'react-router-dom'

const PostEdit = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  if(isPending) return <Loader />
  return (
    <div className='card my-8 mr-8'>
      <div className="flex items-center gap-2 text-violet-400">
        <Icon path={mdiBookEdit} size={1.5}/>
        <p className='font-bold text-xl'>Edit Post</p>
      </div>
      <PostForm post={post} action='Update'/>
    </div>
  )
}

export default PostEdit