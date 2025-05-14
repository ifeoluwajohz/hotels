import { MenubarDemo } from './Menubar'
import React from 'react'
import Profile from '../app/auth/pages'


const Nav = () => {
  return (
    <div className=" text-center flex justify-end flex-row items-center w-full gap-x-2">
      <MenubarDemo />
      {/* <ThemedDatePicker /> */}
      <Profile />

      
    </div>
  )
}

export default Nav