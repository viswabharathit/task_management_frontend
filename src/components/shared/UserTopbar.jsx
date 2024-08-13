import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { ModeToggle } from '../mode-toggle'

const UserTopbar = () => {
    return (
        <div className='h-[8vh] w-full flex justify-center items-center shadow-sm shadow-primary bg-black border-gray-500  border-y-2'>
            <div className='w-[95%] h-full flex items-center justify-end gap-4'>
                {/* <ModeToggle/> */}
                <h1 className='text-white font-bold'>Team Member</h1>
                <Avatar>
                    <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" alt="@shadcn" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default UserTopbar;