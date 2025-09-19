import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Check, X, AlertCircle, Filter } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const AttendancePerSession: React.FC = () => {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');

  const subjectInfo = {
    name: 'Mathematics 101',
    code: 'MATH101',
    instructor: 'Prof. Johnson',
    schedule: 'Mon, Wed, Fri - 09:00 AM',
    room: 'Room 101',
    totalStudents: 28
  };

  const sessions = [
    {
      date: '2024-01-22',
      dayOfWeek: 'Monday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Quadratic Equations - Applications',
      status: 'present',
      checkedInAt: '08:58 AM',
      location: 'Room 101',
      notes: 'On time, active participation in class discussion'
    },
    {
      date: '2024-01-20',
      dayOfWeek: 'Friday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Quadratic Formula and Discriminant',
      status: 'present',
      checkedInAt: '09:02 AM',
      location: 'Room 101',
      notes: 'Slightly late, but caught up quickly'
    },
    {
      date: '2024-01-17',
      dayOfWeek: 'Wednesday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Completing the Square Method',
      status: 'late',
      checkedInAt: '09:15 AM',
      location: 'Room 101',
      notes: 'Late due to traffic, provided explanation',
      lateMinutes: 15
    },
    {
      date: '2024-01-15',
      dayOfWeek: 'Monday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Introduction to Quadratic Equations',
      status: 'present',
      checkedInAt: '08:55 AM',
      location: 'Room 101',
      notes: 'Early arrival, prepared for quiz'
    },
    {
      date: '2024-01-12',
      dayOfWeek: 'Friday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Review: Linear Equations',
      status: 'absent',
      location: 'Room 101',
      notes: 'Sick leave - flu symptoms',
      excused: true,
      makeupWork: 'Completed review exercises at home'
    },
    {
      date: '2024-01-10',
      dayOfWeek: 'Wednesday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Systems of Linear Equations',
      status: 'present',
      checkedInAt: '09:01 AM',
      location: 'Room 101',
      notes: 'Good participation, asked clarifying questions'
    },
    {
      date: '2024-01-08',
      dayOfWeek: 'Monday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      topic: 'Linear Equations in Two Variables',
      status: 'present',
      checkedInAt: '08:57 AM',
      location: 'Room 101',
      notes: 'Excellent engagement, helped peer with problem'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const filteredSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const selectedDate = new Date(selectedMonth + '-01');
    return sessionDate.getFullYear() === selectedDate.getFullYear() && 
           sessionDate.getMonth() === selectedDate.getMonth();
  });

  const monthStats = {
    totalSessions: filteredSessions.length,
    present: filteredSessions.filter(s => s.status === 'present').length,
    absent: filteredSessions.filter(s => s.status === 'absent').length,
    late: filteredSessions.filter(s => s.status === 'late').length,
    rate: (filteredSessions.filter(s => s.status === 'present' || s.status === 'late').length / filteredSessions.length) * 100
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/attendance" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Session History</h1>
            <p className="text-gray-600">{subjectInfo.name} • {subjectInfo.instructor}</p>
          </div>
        </div>
      </div>

      {/* Subject Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">{subjectInfo.schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="text-gray-900">{subjectInfo.room}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-gray-900">{subjectInfo.totalStudents} students enrolled</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{monthStats.rate.toFixed(1)}%</div>
              <div className="text-sm text-blue-800">Attendance Rate</div>
              <div className="text-xs text-blue-600 mt-1">
                {monthStats.present + monthStats.late} of {monthStats.totalSessions} sessions attended
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
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
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Present: {monthStats.present}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Late: {monthStats.late}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Absent: {monthStats.absent}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="space-y-4">
        {filteredSessions.map((session, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {session.dayOfWeek}, {session.date}
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(session.status)}`}>
                      {getStatusIcon(session.status)}
                      {session.status === 'late' ? `Late (${session.lateMinutes} min)` : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {session.startTime} - {session.endTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {session.location}
                    </div>
                    {session.checkedInAt && (
                      <div className="text-green-600">
                        Checked in: {session.checkedInAt}
                      </div>
                    )}
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Topic: {session.topic}</h4>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  {session.status === 'absent' ? (
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0"></div>
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 mb-2">Session Notes</h5>
                    <p className="text-gray-700 text-sm mb-2">{session.notes}</p>
                    
                    {session.status === 'absent' && (
                      <div className="space-y-2">
                        {session.excused && (
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium">Excused Absence</span>
                          </div>
                        )}
                        {session.makeupWork && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h6 className="font-medium text-blue-900 text-sm">Makeup Work Completed:</h6>
                            <p className="text-blue-800 text-sm">{session.makeupWork}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
          <p className="text-gray-600">Try selecting a different month</p>
        </div>
      )}
    </div>
  );
};

export default AttendancePerSession;