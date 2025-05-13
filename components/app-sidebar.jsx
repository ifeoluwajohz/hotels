
'use client' ;
import { Calendar, ChevronUp, FileQuestion, FolderCode, Home, HouseIcon, Inbox, Settings, User2, UserCircle, Workflow } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


import { supabase } from '@/lib/supabaseClient'
import { useUser } from '../context/UserContext'
import { Button } from "./ui/button";



// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: FolderCode,
  },
  {
    title: "Lounges & Suites",
    url: "/Branches",
    icon: HouseIcon,
  },
  {
    title: "Bookings",
    url: "Reserves",
    icon: Calendar,
  },
  {
    title: "Payments",
    url: "#",
    icon: Workflow,
  },
  {
    title: "Settings",
    url: "/Rooms",
    icon: Settings,
  },
  {
    title: "Faq's",
    url: "Faq",
    icon: FileQuestion,
  },
  {
    title: "Profile",
    url: "#",
    icon: UserCircle,
  },
]

export function AppSidebar() {
      const { user, loading , logout } = useUser()

      const handleLogout = async () => {
        await supabase.auth.signOut()
      }
    
return (
    <Sidebar collapsible="icon" className="flex flex-col h-full">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <p className="text-2xl mt-4 mb-6 mx-2 font-black">SPANISH</p>
          <SidebarGroupLabel className="font-medium">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2 p-2 my-1 hover:bg-gray-100 rounded-md transition">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium ">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <Button className="w-full hover:bg-yellow-900 transition ease-in-out">BOOK NOW</Button>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
)
}

