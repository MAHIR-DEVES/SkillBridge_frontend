import { AppSidebar } from '@/components/layout/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Role } from '../constants/role';
import { userService } from '@/services/user.service';
import { Sparkles } from 'lucide-react';

export default async function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userRole = data?.user?.role;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 transition-colors duration-300">
        <AppSidebar user={{ role: userRole }} />

        <SidebarInset className="bg-transparent">
          {/* --- Minimalist Header with theme colors --- */}
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md transition-all border-purple-100 dark:border-purple-900/30 px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1 text-purple-500 hover:text-purple-600 dark:hover:text-pink-400 transition-all rounded-lg p-2 hover:bg-purple-50 dark:hover:bg-purple-950/50" />
              <Separator
                orientation="vertical"
                className="h-6 bg-gradient-to-b from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800"
              />

              <Breadcrumb className="hidden sm:block">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/dashboard"
                      className="text-[11px] font-bold text-purple-500 hover:text-purple-600 dark:hover:text-pink-400 uppercase tracking-widest transition-colors"
                    >
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-purple-300 dark:text-pink-700" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-widest">
                      {userRole} Portal
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Optional: Add user role badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
                <Sparkles size={12} className="text-purple-600" />
                <span className="text-[9px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {userRole}
                </span>
              </div>
            </div>
          </header>

          {/* --- Dynamic Content Body --- */}
          <main className="flex-1 overflow-y-auto relative">
            <div className="mx-auto w-full">
              {userRole === Role.admin && (
                <div className="relative">
                  {/* Optional decorative gradient for admin section */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10" />
                  {admin}
                </div>
              )}

              {userRole === Role.student && (
                <div className="relative pt-2">
                  {/* Optional decorative gradient for student section */}
                  <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl -z-10" />
                  {student}
                </div>
              )}

              {userRole === Role.tutor && (
                <div className="relative pt-2">
                  {/* Optional decorative gradient for tutor section */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl -z-10" />
                  {tutor}
                </div>
              )}
            </div>
          </main>

          {/* --- Minimalist Footer with theme colors --- */}
          <footer className="px-10 py-6 border-t border-purple-100 dark:border-purple-900/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-[2px]">
              &copy; 2026 SkillBridge
            </p>
            <div className="flex gap-6">
              <span className="text-[9px] font-black text-purple-500 dark:text-pink-400 uppercase cursor-pointer hover:text-purple-600 dark:hover:text-pink-500 transition-colors relative group">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
              </span>
              <span className="text-[9px] font-black text-purple-500 dark:text-pink-400 uppercase cursor-pointer hover:text-purple-600 dark:hover:text-pink-500 transition-colors relative group">
                Terms
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
              </span>
              <span className="text-[9px] font-black text-purple-500 dark:text-pink-400 uppercase cursor-pointer hover:text-purple-600 dark:hover:text-pink-500 transition-colors relative group">
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
              </span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
