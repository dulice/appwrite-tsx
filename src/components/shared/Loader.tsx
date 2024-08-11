import { Icon } from '@mdi/react'
import { mdiLoading } from '@mdi/js'

const Loader = () => {
  return (
    <Icon path={mdiLoading} spin size={1}/>
  )
}

export default Loader