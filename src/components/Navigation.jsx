"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Heart,
  Brain,
  Calendar,
  MessageCircle,
  BookOpen,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Headphones,
  Activity,
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Activity,
      description: "Your mental health overview and progress",
    },
    {
      title: "Therapy",
      href: "/therapy",
      icon: Brain,
      description: "AI-powered therapy sessions and guidance",
      submenu: [
        {
          title: "Start Session",
          href: "/therapy/session",
          description: "Begin a new therapy session",
        },
        {
          title: "Chat Support",
          href: "/therapy/chat",
          description: "24/7 AI chat support",
        },
        {
          title: "Guided Exercises",
          href: "/therapy/exercises",
          description: "Mindfulness and coping exercises",
        },
      ],
    },
    {
      title: "Wellness",
      href: "/wellness",
      icon: Heart,
      description: "Track mood, habits, and wellness activities",
      submenu: [
        {
          title: "Mood Tracker",
          href: "/wellness/mood",
          description: "Daily mood logging and insights",
        },
        {
          title: "Meditation",
          href: "/wellness/meditation",
          description: "Guided meditation sessions",
        },
        {
          title: "Journal",
          href: "/wellness/journal",
          description: "Private journaling space",
        },
      ],
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: Calendar,
      description: "Schedule and manage therapy appointments",
    },
    {
      title: "Community",
      href: "/community",
      icon: MessageCircle,
      description: "Connect with supportive community",
    },
    {
      title: "Resources",
      href: "/resources",
      icon: BookOpen,
      description: "Educational content and self-help tools",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Therapeia Logo"
                width={40}
                height={40}
                className="w-full h-full"
              />
            </div>
            <span className="font-bold text-xl text-teal-700">Therapeia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isClient ? (
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.submenu ? (
                        <>
                          <NavigationMenuTrigger className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[400px] gap-3 p-4">
                              <div className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-teal-500/20 to-blue-600/20 p-6 no-underline outline-none focus:shadow-md"
                                  >
                                    <item.icon className="h-6 w-6 text-teal-600" />
                                    <div className="mb-2 mt-4 text-lg font-medium text-teal-900">
                                      {item.title}
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </div>
                              <div className="grid gap-2">
                                {item.submenu.map((subItem) => (
                                  <NavigationMenuLink
                                    key={subItem.title}
                                    asChild
                                  >
                                    <Link
                                      href={subItem.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <div className="text-sm font-medium leading-none">
                                        {subItem.title}
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                          >
                            <item.icon className="h-4 w-4 mr-2" />
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              // Fallback navigation for SSR
              <div className="flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Menu & Crisis Support */}
          <div className="flex items-center space-x-3">
            {/* Crisis Support Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <Link href="/crisis">
                <span className="inline-flex items-center">
                  <Shield className="h-4 w-4" />
                  <span className="ml-2">Crisis Support</span>
                </span>
              </Link>
            </Button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-teal-700 hover:text-teal-800"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* User Avatar Menu */}
            {isClient ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Welcome back
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        user@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/support" className="flex items-center">
                      <Headphones className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Fallback avatar for SSR
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <div className="ml-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Crisis Support */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50"
              >
                <Link href="/crisis">
                  <span className="inline-flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Crisis Support
                  </span>
                </Link>
              </Button>

              {/* Mobile Auth Buttons */}
              <div className="flex space-x-2 mt-3">
                <Link href="/login" className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button
                    size="sm"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
