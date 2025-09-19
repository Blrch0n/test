import React from 'react';
import { BookOpen, TrendingUp, Calendar, Clock, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const stats = [
    { label: 'Overall GPA', value: '3.85', icon: TrendingUp, color: 'blue' },
    { label: 'Courses', value: '6', icon: BookOpen, color: 'green' },
    { label: 'Attendance Rate', value: '96%', icon: Calendar, color: 'purple' },
    { label: 'Assignments Due', value: '3', icon: Clock, color: 'yellow' },
  ];

  const recentGrades = [
    { subject: 'Mathematics 101', assignment: 'Quiz 3', grade: 95, maxGrade: 100, date: '2024-01-20' },
    { subject: 'Physics Advanced', assignment: 'Lab Report 2', grade: 88, maxGrade: 100, date: '2024-01-18' },
    { subject: 'Chemistry Basics', assignment: 'Homework 4', grade: 92, maxGrade: 100, date: '2024-01-15' },
    { subject: 'English Literature', assignment: 'Essay Analysis', grade: 89, maxGrade: 100, date: '2024-01-12' }
  ];

  const upcomingAssignments = [
    { subject: 'Mathematics 101', title: 'Chapter 5 Test', dueDate: '2024-01-25', priority: 'high' },
    { subject: 'Physics Advanced', title: 'Project Proposal', dueDate: '2024-01-27', priority: 'medium' },
    { subject: 'Chemistry Basics', title: 'Lab Report 3', dueDate: '2024-01-30', priority: 'low' },
  ];

  const todaySchedule = [
    { subject: 'Mathematics 101', time: '09:00 AM', room: 'Room 101' },
    { subject: 'Chemistry Basics', time: '11:30 AM', room: 'Lab 301' },
    { subject: 'English Literature', time: '02:00 PM', room: 'Room 205' },
  ];

  const journalEntries = [
    { subject: 'Mathematics 101', date: '2024-01-20', content: 'Learned about quadratic equations and their applications in real-world problems...' },
    { subject: 'Physics Advanced', date: '2024-01-19', content: 'Conducted experiment on electromagnetic induction. Key findings include...' },
    { subject: 'Chemistry Basics', date: '2024-01-18', content: 'Study of molecular structures and bonding patterns...' }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600">Welcome back, Sarah! Here's your academic overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
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
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todaySchedule.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{cls.subject}</h3>
                    <p className="text-sm text-gray-600">{cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
              <Link to="/assignments" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(assignment.priority)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      {assignment.priority === 'high' && <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />}
                      <div>
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{assignment.dueDate}</p>
                      <p className="text-xs text-gray-500 capitalize">{assignment.priority} priority</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Grades */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Grades</h2>
              <Link to="/grades" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{grade.assignment}</h3>
                    <p className="text-sm text-gray-600">{grade.subject}</p>
                    <p className="text-xs text-gray-500">{grade.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${getGradeColor((grade.grade / grade.maxGrade) * 100)}`}>
                      {grade.grade}/{grade.maxGrade}
                    </span>
                    <p className={`text-sm font-medium ${getGradeColor((grade.grade / grade.maxGrade) * 100)}`}>
                      {((grade.grade / grade.maxGrade) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Journal Entries */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Journal Entries</h2>
              <Link to="/journal" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {journalEntries.map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{entry.subject}</h3>
                    <span className="text-xs text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
                  <Link 
                    to={`/journal/${entry.subject.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-3 w-3" />
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/journal"
            className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Write Journal Entry
          </Link>
          <Link 
            to="/attendance"
            className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Check Attendance
          </Link>
          <Link 
            to="/leave-request"
            className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Request Leave
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;