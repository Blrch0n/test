import React, { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, User, Check, X, Clock, Filter } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const AttendancePerStudent: React.FC = () => {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedClass, setSelectedClass] = useState('all');

  const student = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@school.edu',
    studentId: 'STU2024001',
    grade: 12
  };

  const classes = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101' },
    { id: 2, name: 'Physics Advanced', code: 'PHYS201' },
    { id: 3, name: 'Chemistry Basics', code: 'CHEM101' },
    { id: 4, name: 'English Literature', code: 'ENG201' }
  ];

  const attendanceRecords = [
    { date: '2024-01-20', class: 'Mathematics 101', status: 'present', time: '09:00 AM' },
    { date: '2024-01-20', class: 'Physics Advanced', status: 'present', time: '11:00 AM' },
    { date: '2024-01-20', class: 'Chemistry Basics', status: 'absent', time: '02:00 PM', reason: 'Sick leave' },
    { date: '2024-01-19', class: 'Mathematics 101', status: 'late', time: '09:15 AM', note: '15 minutes late' },
    { date: '2024-01-19', class: 'Physics Advanced', status: 'present', time: '11:00 AM' },
    { date: '2024-01-19', class: 'English Literature', status: 'present', time: '03:00 PM' },
    { date: '2024-01-18', class: 'Mathematics 101', status: 'present', time: '09:00 AM' },
    { date: '2024-01-18', class: 'Chemistry Basics', status: 'present', time: '02:00 PM' },
  ];

  const attendanceStats = {
    totalSessions: 64,
    present: 58,
    absent: 4,
    late: 2,
    rate: 90.6
  };

  const monthlyStats = [
    { month: 'Jan 2024', present: 18, absent: 2, late: 1, rate: 85.7 },
    { month: 'Dec 2023', present: 20, absent: 1, late: 0, rate: 95.2 },
    { month: 'Nov 2023', present: 19, absent: 1, late: 1, rate: 90.5 },
    { month: 'Oct 2023', present: 20, absent: 0, late: 1, rate: 95.2 }
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

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesClass = selectedClass === 'all' || record.class.includes(selectedClass);
    const recordDate = new Date(record.date);
    const selectedDate = new Date(selectedMonth + '-01');
    const matchesMonth = recordDate.getFullYear() === selectedDate.getFullYear() && 
                        recordDate.getMonth() === selectedDate.getMonth();
    return matchesClass && matchesMonth;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/attendance" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Attendance</h1>
            <p className="text-gray-600">Detailed attendance records for {student.name}</p>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
            <p className="text-sm text-gray-500">ID: {student.studentId} • Grade {student.grade}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Attendance</p>
            <p className="text-2xl font-bold text-blue-600">{attendanceStats.rate}%</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024-01">January 2024</option>
              <option value="2023-12">December 2023</option>
              <option value="2023-11">November 2023</option>
              <option value="2023-10">October 2023</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalSessions}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
            </div>
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Trends</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {monthlyStats.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{month.month}</h3>
                    <p className="text-sm text-gray-600">
                      Present: {month.present} • Absent: {month.absent} • Late: {month.late}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">{month.rate}%</span>
                    {index > 0 && (
                      month.rate > monthlyStats[index - 1].rate ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class Breakdown */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Attendance by Class</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {classes.map(cls => {
                const classRecords = attendanceRecords.filter(record => record.class === cls.name);
                const present = classRecords.filter(r => r.status === 'present').length;
                const total = classRecords.length;
                const rate = total > 0 ? (present / total) * 100 : 0;
                
                return (
                  <div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{cls.name}</h3>
                      <p className="text-sm text-gray-600">{cls.code}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">{rate.toFixed(1)}%</span>
                      <p className="text-sm text-gray-600">{present}/{total} sessions</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Records</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{record.date}</p>
                    <p className="text-xs text-gray-500">{record.time}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{record.class}</h3>
                    {record.reason && (
                      <p className="text-sm text-gray-600">Reason: {record.reason}</p>
                    )}
                    {record.note && (
                      <p className="text-sm text-gray-600">Note: {record.note}</p>
                    )}
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(record.status)}`}>
                  {getStatusIcon(record.status)}
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
          
          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-600">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePerStudent;