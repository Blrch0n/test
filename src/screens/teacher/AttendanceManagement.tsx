import React, { useState } from 'react';
import { Calendar, Users, Search, Filter, Check, X, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttendanceManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-20');
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101', time: '09:00 AM', students: 28 },
    { id: 2, name: 'Physics Advanced', code: 'PHYS201', time: '11:00 AM', students: 24 },
    { id: 3, name: 'Chemistry Basics', code: 'CHEM101', time: '02:00 PM', students: 32 },
    { id: 4, name: 'Biology Lab', code: 'BIO301', time: '03:30 PM', students: 18 }
  ];

  const attendanceData = [
    {
      classId: 1,
      className: 'Mathematics 101',
      students: [
        { id: 1, name: 'Sarah Johnson', status: 'present' },
        { id: 2, name: 'Mike Chen', status: 'present' },
        { id: 3, name: 'Emily Davis', status: 'absent' },
        { id: 4, name: 'Alex Rodriguez', status: 'late' },
        { id: 5, name: 'Jessica Wu', status: 'present' }
      ]
    },
    {
      classId: 2,
      className: 'Physics Advanced',
      students: [
        { id: 6, name: 'David Kim', status: 'present' },
        { id: 7, name: 'Lisa Zhang', status: 'present' },
        { id: 8, name: 'Tom Wilson', status: 'present' },
        { id: 9, name: 'Anna Lopez', status: 'absent' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Check className="h-4 w-4" />;
      case 'absent':
        return <X className="h-4 w-4" />;
      case 'late':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredAttendance = attendanceData.filter(classData => {
    if (selectedClass === 'all') return true;
    return classData.classId.toString() === selectedClass;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600">Track and manage student attendance</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id.toString()}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Students
            </label>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">
                {attendanceData.reduce((sum, cls) => 
                  sum + cls.students.filter(s => s.status === 'present').length, 0
                )}
              </p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-red-600">
                {attendanceData.reduce((sum, cls) => 
                  sum + cls.students.filter(s => s.status === 'absent').length, 0
                )}
              </p>
            </div>
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late Today</p>
              <p className="text-2xl font-bold text-yellow-600">
                {attendanceData.reduce((sum, cls) => 
                  sum + cls.students.filter(s => s.status === 'late').length, 0
                )}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Attendance by Class */}
      <div className="space-y-6">
        {filteredAttendance.map((classData) => {
          const filteredStudents = classData.students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <div key={classData.classId} className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{classData.className}</h2>
                    <p className="text-sm text-gray-600">
                      {filteredStudents.length} students • {selectedDate}
                    </p>
                  </div>
                  <Link
                    to={`/attendance/student/${classData.classId}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">ID: {student.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                        
                        <div className="flex gap-1">
                          <button
                            className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            title="Mark Present"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            title="Mark Absent"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
                            title="Mark Late"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceManagement;