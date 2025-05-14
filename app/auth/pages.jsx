// components/Profile.tsx
'use client'

import { useUser } from '../../context/UserContext'
import { supabase } from '@/lib/supabaseClient'
import { User2, UserCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from 'react' 




const Profile = () => {
  const { user, loading } = useUser()

  if (loading) return <div className="flex fixed right-2 p-2">
  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
</div>

const SignIn = async () => {
  try{
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/',
      },
    })
  
    if (error) {
      toast("Sign-in failed", {
        description: error.message,
        action: {
          label: "Retry",
          onClick: () => SignInWithToast(),
        },
      })
    } else {
      toast("Sign-in successful", {
        description: "Welcome back!",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed"),
        },
      })
    }
  }catch(err){
    toast.error(err.message)
  }
}

const SignInWithToast = () => {
  useEffect(async()=> {
    try{
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: process.env.NODE_ENV === 'production'
            ? 'https://your-production-url.com/'
            : 'http://localhost:3000/',
        },
      })
    
      if (error) {
        toast("Sign-in failed", {
          description: error.message,
          action: {
            label: "Retry",
            onClick: () => SignInWithToast(),
          },
        })
      } else {
        toast.success("Sign-in successful")
        toast("Sign-in successful", {
          description: "Welcome back!",
          action: {
            label: "Dismiss",
            onClick: () => console.log("Dismissed"),
          },
        })
      }
    }catch(err){
      toast.error(err.message)
      console.log(err.message)
    }
  },[user])
  
  
  
}

  return (
    <DropdownMenu>
      <Toaster richColors={true} />
      <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="p-2 flex justify-center items-center">
        <User2 className="h-5 w-5" />
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-4 shadow-lg rounded-lg bg-white border border-gray-200">
      <p className="text-lg font-semibold text-gray-700">
        Account Information
      </p>
      <DropdownMenuSeparator className="my-2 border-gray-300" />
      {user ? (
        <DropdownMenuGroup className="flex flex-col items-center space-y-2">
        <img
          src={user.user_metadata.picture}
          alt="User Picture"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div className="text-sm font-medium text-gray-800">
            <div className="flex flex-col items-center">
            <p className="text-sm font-medium text-gray-800">
              {user.user_metadata.full_name}
            </p>
            <p className="text-xs text-gray-500">
                <a
                href={`mailto:${user.user_metadata.email}`}
                className="text-blue-500 hover:underline"
                >
                {user.user_metadata.email}
                </a>
            </p>
            </div>
        </div>
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => {
          supabase.auth.signOut();
          toast("Logged out successfully", {
            description: "You have been signed out.",
          });
          }}
        >
          Log Out
        </Button>
        </DropdownMenuGroup>
      ) : (
        <DropdownMenuGroup className="flex flex-col items-center space-y-2">
        <UserCircle2 className="h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-600">Sign in to access your account</p>
        <Button
          variant="default"
          className="w-full mt-2"
          onClick={SignInWithToast}
        >
          Sign In
        </Button>
        </DropdownMenuGroup>
      )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile




