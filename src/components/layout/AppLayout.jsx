import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';
import { MobileNav } from '../common/MobileNav';
import { QuickAddModal } from '../common/QuickAddModal';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout = () => {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenQuickAdd={() => setIsQuickAddOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
      />

      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full mb-16 md:mb-0">
          <Outlet context={{ onOpenQuickAdd: () => setIsQuickAddOpen(true) }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        onOpenQuickAdd={() => setIsQuickAddOpen(true)}
        onToggleMore={() => setMobileSidebarOpen(true)}
      />

      {/* Global Quick Log Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />

      {/* Toast Alert Notifications */}
      <ToastContainer />
    </div>
  );
};

