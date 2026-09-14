"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown, MessageCircle, Instagram, Linkedin, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/alumni", label: "Alumni" },
  { href: "https://e-cell-builders-guild.vercel.app/", label: "Builders", external: true },
  { href: "/blog", label: "Blog" },
];

const joinLinks = [
  { 
    label: "WhatsApp", 
    href: "https://chat.whatsapp.com/Gf3tw3YTHLwLpiOtGofj1Q", 
    icon: <MessageCircle size={14} className="text-green-500" />,
    color: "hover:bg-green-500/10 hover:text-green-400"
  },
  { 
    label: "Instagram", 
    href: "https://www.instagram.com/ecell.svce?igshid=YmMyMTA2M2Y%3D", 
    icon: <Instagram size={14} className="text-pink-500" />,
    color: "hover:bg-pink-500/10 hover:text-pink-400"
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/company/e-cell-svce/", 
    icon: <Linkedin size={14} className="text-blue-500" />,
    color: "hover:bg-blue-500/10 hover:text-blue-400"
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowJoin(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setShowJoin(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-6 md:px-12 pointer-events-none">
      <header
        className={`mx-auto max-w-7xl flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
          scrolled 
            ? "px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl" 
            : "px-2 py-2 bg-transparent rounded-none"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <div className={`relative transition-all duration-500 ${scrolled ? "w-8 h-8 md:w-10 md:h-10" : "w-10 h-10 md:w-12 md:h-12"}`}>
              <Image
                src="/logo.png"
                alt="E-Cell SVCE"
                fill
                className="object-contain drop-shadow-2xl brightness-125"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-black uppercase tracking-[0.2em] transition-all duration-500 ${scrolled ? "text-sm text-rose-400" : "text-base text-white"}`}>
                E-Cell
              </span>
              <span className={`font-bold uppercase tracking-[0.4em] text-[8px] transition-all duration-500 ${scrolled ? "text-white/40" : "text-white/20"}`}>
                SVCE Chennai
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = !link.external && ((pathname === link.href) || (link.href !== "/" && pathname?.startsWith(link.href)));
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative group overflow-hidden text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <span className="relative z-10">{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    transition={{ duration: 0.3 }}
                  />
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? "text-rose-300 bg-rose-500/10 border border-rose-500/20" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button - Dropdown Tooltip */}
        <div className="hidden lg:block relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowJoin(!showJoin)}
            className={`px-6 py-2.5 bg-gradient-to-r from-rose-600 to-amber-400 hover:brightness-110 text-white font-bold text-[9px] uppercase tracking-[0.3em] rounded-xl transition-all shadow-lg flex items-center gap-2 group ${showJoin ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-black' : ''}`}
          >
            Join Us <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showJoin ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showJoin && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-56 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden"
              >
                {joinLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 transition-all ${link.color}`}
                  >
                    <div className="flex items-center gap-3">
                       {link.icon}
                       {link.label}
                    </div>
                  </a>
                ))}
                <Link 
                  href="/contact" 
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-white/5 text-[9px] font-bold uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-colors"
                >
                   <Globe size={10} /> Community Hub
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 bg-white/5 rounded-2xl border border-white/5"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5 text-indigo-400" />}
        </button>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-sm bg-black/95 backdrop-blur-3xl z-[150] p-10 flex flex-col pointer-events-auto border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-16">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-indigo-500">Navigation</span>
               <button onClick={closeMenu} className="p-3 bg-white/5 rounded-xl border border-white/5"><X className="w-5 h-5" /></button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isActive = !link.external && ((pathname === link.href) || (link.href !== "/" && pathname?.startsWith(link.href)));
                if (link.external) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="text-4xl font-bold tracking-tighter transition-all hover:text-indigo-400 flex items-center justify-between group text-white"
                      >
                        {link.label}
                        <ArrowUpRight className="w-6 h-6 text-indigo-400 opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`text-4xl font-bold tracking-tighter transition-all hover:text-indigo-400 flex items-center justify-between group ${
                        isActive ? "text-indigo-500" : "text-white"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-auto pt-10 border-t border-white/5 space-y-8">
               <div className="grid grid-cols-3 gap-4">
                  {joinLinks.map((link) => (
                    <a 
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white"
                    >
                      {link.icon}
                    </a>
                  ))}
               </div>
               <Link href="/contact" onClick={closeMenu}>
                  <button className="w-full py-5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-3xl shadow-2xl">
                    View Join Hub
                  </button>
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;