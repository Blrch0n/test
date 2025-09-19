import React from "react";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";

interface TeacherDashboardProps {
  onOpenGradeEdit: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onOpenGradeEdit,
}) => {
  const stats = [
    { label: "Total Students", value: "156", icon: Users, color: "blue" },
    { label: "Active Classes", value: "8", icon: BookOpen, color: "green" },
    { label: "Pending Grades", value: "23", icon: Clock, color: "yellow" },
    {
      label: "Attendance Rate",
      value: "94%",
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const recentActivities = [
    {
      action: "Graded Math Quiz #3",
      student: "Sarah Johnson",
      time: "5 minutes ago",
    },
    {
      action: "Marked attendance for Period 2",
      class: "Physics 101",
      time: "30 minutes ago",
    },
    {
      action: "Added assignment",
      assignment: "History Essay",
      time: "1 hour ago",
    },
    {
      action: "Approved leave request",
      student: "Mike Chen",
      time: "2 hours ago",
    },
  ];

  const upcomingClasses = [
    {
      subject: "Mathematics",
      time: "09:00 AM",
      room: "Room 101",
      students: 28,
    },
    { subject: "Physics", time: "11:00 AM", room: "Lab 201", students: 24 },
    { subject: "Chemistry", time: "02:00 PM", room: "Lab 301", students: 22 },
  ];

  const pendingTasks = [
    { task: "Grade Biology Lab Reports", count: 15, urgent: true },
    { task: "Review Leave Requests", count: 3, urgent: false },
    { task: "Update Attendance Records", count: 2, urgent: true },
    { task: "Prepare Semester Reports", count: 8, urgent: false },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back, Professor Smith!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Classes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{cls.subject}</h3>
                    <p className="text-sm text-gray-600">
                      {cls.room} • {cls.students} students
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Tasks
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={
                    task.task.includes("Grade") ? onOpenGradeEdit : undefined
                  }
                >
                  <div className="flex items-center">
                    {task.urgent && (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{task.task}</h3>
                      <p className="text-sm text-gray-600">
                        {task.count} items
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.urgent
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.urgent ? "Urgent" : "Normal"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
