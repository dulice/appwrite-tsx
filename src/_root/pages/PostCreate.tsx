import PostForm from '@/components/forms/PostForm'
import { mdiImagePlus } from '@mdi/js'
import Icon from '@mdi/react'

const PostCreate = () => {
  return (
    <div className='card m-6'>
      <div className="flex items-center gap-2 text-violet-400">
        <Icon path={mdiImagePlus} size={1.5}/>
        <p className='font-bold text-xl'>Create Post</p>
      </div>
      <PostForm action='Create'/>
    </div>
  )
}

export default PostCreate