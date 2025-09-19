import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, TrendingUp, BookOpen, User, AlertCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const StudentProfileView: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const student = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@school.edu',
    phone: '(555) 123-4567',
    studentId: 'STU2024001',
    enrollmentDate: '2024-01-15',
    grade: 12,
    gpa: 3.85,
    avatar: '/api/placeholder/150/150'
  };

  const enrolledClasses = [
    { id: 1, name: 'Mathematics 101', grade: 93.0, status: 'active' },
    { id: 2, name: 'Physics Advanced', grade: 87.5, status: 'active' },
    { id: 3, name: 'Chemistry Basics', grade: 91.2, status: 'active' },
    { id: 4, name: 'English Literature', grade: 89.8, status: 'active' }
  ];

  const attendanceData = {
    totalDays: 180,
    presentDays: 168,
    absentDays: 12,
    rate: 93.3
  };

  const recentGrades = [
    { assignment: 'Math Quiz 3', grade: 95, maxGrade: 100, date: '2024-01-20' },
    { assignment: 'Physics Lab Report', grade: 88, maxGrade: 100, date: '2024-01-18' },
    { assignment: 'Chemistry Homework 2', grade: 92, maxGrade: 100, date: '2024-01-15' },
    { assignment: 'English Essay', grade: 87, maxGrade: 100, date: '2024-01-12' }
  ];

  const behaviorNotes = [
    { date: '2024-01-20', type: 'positive', note: 'Excellent participation in class discussion' },
    { date: '2024-01-15', type: 'neutral', note: 'Requested extra help with physics concepts' },
    { date: '2024-01-10', type: 'positive', note: 'Helped classmate with math problem' }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'grades', label: 'Grades' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'behavior', label: 'Behavior Notes' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/gradebook" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
        </div>
      </div>

      {/* Student Header Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{student.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">ID: {student.studentId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Grade {student.grade}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Overall GPA</span>
            <span className="text-2xl font-bold text-blue-600">{student.gpa}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enrolled Classes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Classes</h3>
                <div className="space-y-3">
                  {enrolledClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{cls.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(cls.grade)}`}>
                          {cls.grade}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Attendance Rate</span>
                      <span className="text-lg font-bold text-blue-600">{attendanceData.rate}%</span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Average Grade</span>
                      <span className="text-lg font-bold text-green-600">
                        {(enrolledClasses.reduce((sum, cls) => sum + cls.grade, 0) / enrolledClasses.length).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-800">Total Classes</span>
                      <span className="text-lg font-bold text-purple-600">{enrolledClasses.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{grade.assignment}</h4>
                      <p className="text-sm text-gray-600">{grade.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${grade.grade / grade.maxGrade >= 0.9 ? 'text-green-600' : 
                        grade.grade / grade.maxGrade >= 0.8 ? 'text-blue-600' : 
                        grade.grade / grade.maxGrade >= 0.7 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {grade.grade}/{grade.maxGrade}
                      </span>
                      <p className="text-sm text-gray-600">
                        {((grade.grade / grade.maxGrade) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Total Days</h4>
                  <p className="text-2xl font-bold text-blue-600">{attendanceData.totalDays}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Present</h4>
                  <p className="text-2xl font-bold text-green-600">{attendanceData.presentDays}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Absent</h4>
                  <p className="text-2xl font-bold text-red-600">{attendanceData.absentDays}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-800 mb-2">Rate</h4>
                  <p className="text-2xl font-bold text-purple-600">{attendanceData.rate}%</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500"
                    style={{ width: `${attendanceData.rate}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {attendanceData.presentDays} of {attendanceData.totalDays} days attended
                </p>
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Behavior Notes</h3>
              <div className="space-y-4">
                {behaviorNotes.map((note, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        note.type === 'positive' ? 'bg-green-100' : 
                        note.type === 'negative' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {note.type === 'positive' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : note.type === 'negative' ? (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">{note.date}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            note.type === 'positive' ? 'bg-green-100 text-green-800' : 
                            note.type === 'negative' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {note.type}
                          </span>
                        </div>
                        <p className="text-gray-700">{note.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;