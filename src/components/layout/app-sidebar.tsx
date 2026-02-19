'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { adminRoutes } from '@/routes/adminRoutes';
import { studentRoutes } from '@/routes/studentRoutes';
import { tutorRoutes } from '@/routes/tutorRoutes';
import { authClient } from '@/lib/auth-client';

import { Route } from '@/types/icon';
import { LogOut, Home, LayoutDashboard, Sparkles } from 'lucide-react';

function cn(...inputs: (string | boolean | undefined | null | number)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  let routes: Route[] = [];

  switch (user.role) {
    case 'ADMIN':
      routes = adminRoutes as Route[];
      break;
    case 'STUDENT':
      routes = studentRoutes as Route[];
      break;
    case 'TUTOR':
      routes = tutorRoutes as Route[];
      break;
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  return (
    <Sidebar
      {...props}
      className="border-r border-purple-100 dark:border-purple-800/30 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 transition-colors duration-300"
    >
      <SidebarContent className="flex flex-col justify-between h-full bg-transparent">
        <div>
          {/* Logo Section */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <LayoutDashboard className="text-white" size={20} />
              </div>
              <span className="font-black text-xl tracking-tight dark:text-white uppercase">
                Skill
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Bridge
                </span>
              </span>
            </div>
          </div>

          {/* Home Link */}
          <div className="px-4 mb-6">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200',
                pathname === '/'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30'
                  : 'text-purple-500 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30',
              )}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
          </div>

          {/* Role Badge */}
          <div className="px-6 mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
              <Sparkles size={12} className="text-purple-600" />
              <span className="text-[9px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {user.role} Access
              </span>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4">
            {routes.map(group => (
              <SidebarGroup key={group.title} className="px-4">
                <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {group.title}
                </SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {group.items.map(item => {
                      const isActive = pathname === item.url;
                      const Icon = item.icon || LayoutDashboard;

                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={cn(
                                'flex items-center gap-3 px-4 py-6 rounded-2xl font-bold transition-all duration-200 group relative overflow-hidden',
                                isActive
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                  : 'text-purple-600 dark:text-pink-400 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30',
                              )}
                            >
                              {/* Active indicator shine effect */}
                              {isActive && (
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                              )}

                              <Icon
                                size={18}
                                className={cn(
                                  'transition-all duration-300',
                                  isActive
                                    ? 'text-white group-hover:scale-110'
                                    : 'text-purple-500 dark:text-pink-400 group-hover:scale-110 group-hover:text-purple-600 dark:group-hover:text-pink-500',
                                )}
                              />
                              <span className="text-sm tracking-wide">
                                {item.title}
                              </span>

                              {isActive && (
                                <div className="ml-auto flex gap-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                  <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse delay-150" />
                                </div>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        </div>

        {/* Logout Section */}
        <div className="px-4 pb-8">
          <div className="pt-4 border-t border-purple-100 dark:border-purple-800/30">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl
              font-bold text-pink-500 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 
              dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 
              border border-transparent hover:border-pink-200 dark:hover:border-pink-800/30 
              transition-all duration-200 group"
            >
              <LogOut
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span className="text-sm">Logout Session</span>
            </button>
          </div>
        </div>
      </SidebarContent>

      <SidebarRail className="bg-purple-200 dark:bg-purple-800" />
    </Sidebar>
  );
}
