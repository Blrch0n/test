import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  BarChart3,
  Calendar,
  User,
  Menu,
  X,
  GraduationCap,
  FileText,
} from "lucide-react";

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const teacherNavItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/gradebook", label: "Gradebook", icon: BookOpen },
    { path: "/attendance", label: "Attendance", icon: Calendar },
    { path: "/leave-requests", label: "Leave Requests", icon: FileText },
    { path: "/reports", label: "Reports", icon: BarChart3 },
  ];

  const studentNavItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/journal", label: "Journal", icon: BookOpen },
    { path: "/grades", label: "Grades", icon: GraduationCap },
    { path: "/attendance", label: "Attendance", icon: Calendar },
    { path: "/profile", label: "Profile", icon: User },
  ];

  // Merge teacher and student nav items and deduplicate by path so navigation
  // always shows all available routes. Preserve the order: teacher items
  // first, then student items that don't conflict.
  const paths = new Set<string>();
  const navItems = [
    ...teacherNavItems,
    ...studentNavItems.filter(
      (item) => !paths.has(item.path) && (paths.add(item.path) || true)
    ),
  ];

  // Ensure the set is primed with teacher paths so filter above works
  teacherNavItems.forEach((t) => paths.add(t.path));

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              EduTracker
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* No role badge: navigation now shows combined links so a role
              prop is not required. */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
              {/* No role badge in mobile menu either. */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
