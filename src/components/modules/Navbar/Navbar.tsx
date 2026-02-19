'use client';

import { Menu, LogOut, User, Sparkles, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/layout/ModeToggle';
import { authClient } from '@/lib/auth-client';

/* ================= TYPES ================= */

interface MenuItem {
  title: string;
  url: string;
}

interface SessionUser {
  name?: string;
  email?: string;
  role?: string;
}

interface Session {
  user?: SessionUser;
}

interface NavbarProps {
  className?: string;
  session?: Session | null;
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

/* ================= COMPONENT ================= */

const Navbar = ({
  session,
  logo = { url: '/', title: 'SkillBridge' },
  menu = [
    { title: 'Home', url: '/' },
    { title: 'Browse Tutors', url: '/TutoreProfile' },
    { title: 'About', url: '/about' },
    { title: 'Dashboard', url: '/student-dashboard' },
    { title: 'Contact', url: '/contact' },
  ],
  auth = {
    login: { title: 'Login', url: '/login' },
    signup: { title: 'Register', url: '/register' },
  },
  className,
}: NavbarProps) => {
  const router = useRouter();
  const isLoggedIn = Boolean(session?.user);

  const filteredMenu = menu.filter(item => {
    if (item.title === 'Dashboard' && !isLoggedIn) {
      return false;
    }
    return true;
  });

  const handalLogout = async () => {
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
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        'bg-gradient-to-r from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-black/80 dark:to-pink-950/30 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/30',
        className,
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* ================= DESKTOP ================= */}
        <nav className="hidden lg:flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            {/* Logo with icon */}
            <Link
              href={logo.url}
              className="flex items-center gap-2 text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              <GraduationCap className="w-7 h-7 text-purple-600" />
              {logo.title}
            </Link>

            {/* Menu with active indicator */}
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {filteredMenu.map(item => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="relative px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 dark:hover:text-purple-400 transition-colors group"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Area with new design */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-1.5 pr-4 rounded-2xl border border-purple-200 dark:border-purple-800/50 shadow-lg shadow-purple-500/20">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
                  <User size={18} />
                </div>
                <span className="text-sm font-bold truncate max-w-[120px] text-purple-900 dark:text-purple-300">
                  {session?.user?.name ?? 'User'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handalLogout}
                  className="text-purple-400 hover:text-pink-500 transition-colors ml-2 h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  variant="ghost"
                  className="font-bold text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-xl"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-7 rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-95"
                >
                  <Link href={auth.signup.url}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {auth.signup.title}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <Link
            href={logo.url}
            className="flex items-center gap-2 text-xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            <GraduationCap className="w-6 h-6 text-purple-600" />
            {logo.title}
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-200 hover:to-pink-200"
                >
                  <Menu size={22} className="text-purple-600" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-gradient-to-b from-purple-50 via-white to-pink-50 dark:from-purple-950/50 dark:via-black dark:to-pink-950/50 border-l border-purple-200 dark:border-purple-900/30"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2 text-xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                    {logo.title}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1 mt-8">
                  {filteredMenu.map(item => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-md font-bold p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all text-purple-900 dark:text-purple-300"
                    >
                      {item.title}
                    </Link>
                  ))}

                  <div className="h-[1px] bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50 my-4" />

                  {isLoggedIn ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white uppercase font-bold shadow-lg">
                          {session?.user?.name?.[0] || <User size={20} />}
                        </div>
                        <span className="font-bold text-purple-900 dark:text-purple-300">
                          {session?.user?.name}
                        </span>
                      </div>
                      <Button
                        onClick={handalLogout}
                        variant="destructive"
                        className="w-full rounded-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-0"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl font-bold border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50"
                      >
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button
                        asChild
                        className="rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                      >
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
