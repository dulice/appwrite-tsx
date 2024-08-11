import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import { Signin, Signup } from './_auth/forms'
import RootLayout from './_root/RootLayout'
import { Explore, Home, People, PostCreate, PostDetails, PostEdit, Profile, ProfileEdit, Saved } from './_root/pages'

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/people' element={<People />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/profile/:id/edit' element={<ProfileEdit />} />
          <Route path='/posts/create' element={<PostCreate />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/posts/:id/edit' element={<PostEdit />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
