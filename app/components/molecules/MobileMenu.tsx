"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/app/components/atoms/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

type MobileMenuProps = {
  links: { href: string; label: string }[];
};

const subscribe = () => () => {};

export const MobileMenu = ({ links }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -mr-1 text-foreground/60 hover:text-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-100 bg-black/30 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                />

                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed top-0 right-0 bottom-0 z-101 w-72 bg-background border-l border-border shadow-2xl flex flex-col"
                >
                  <div className="flex items-center justify-between px-5 h-16 border-b border-border/60 shrink-0">
                    <span className="text-xs font-semibold tracking-widest uppercase text-foreground/40">
                      Menu
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-2 -mr-2 text-foreground/50 hover:text-foreground transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <nav className="flex flex-col px-3 py-4 flex-1 gap-0.5 overflow-y-auto">
                    {links.map((link, i) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 + i * 0.04 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                              isActive
                                ? "bg-secondary text-foreground"
                                : "text-foreground/55 hover:text-foreground hover:bg-secondary/60",
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <div className="px-5 py-5 border-t border-border/60 shrink-0">
                    <LanguageSwitcher />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};
