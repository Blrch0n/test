import React, { useState } from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Check,
  X,
  Clock,
  Eye,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const AttendanceOverview: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const subjects = [
    { id: 1, name: "Mathematics 101", code: "MATH101" },
    { id: 2, name: "Physics Advanced", code: "PHYS201" },
    { id: 3, name: "Chemistry Basics", code: "CHEM101" },
    { id: 4, name: "English Literature", code: "ENG201" },
    { id: 5, name: "History Modern", code: "HIST301" },
    { id: 6, name: "Biology Lab", code: "BIO401" },
  ];

  const attendanceData = [
    {
      subject: "Mathematics 101",
      totalSessions: 20,
      present: 19,
      absent: 1,
      late: 0,
      rate: 95.0,
      trend: "up",
    },
    {
      subject: "Physics Advanced",
      totalSessions: 18,
      present: 16,
      absent: 1,
      late: 1,
      rate: 88.9,
      trend: "down",
    },
    {
      subject: "Chemistry Basics",
      totalSessions: 22,
      present: 21,
      absent: 0,
      late: 1,
      rate: 95.5,
      trend: "up",
    },
    {
      subject: "English Literature",
      totalSessions: 16,
      present: 15,
      absent: 1,
      late: 0,
      rate: 93.8,
      trend: "stable",
    },
    {
      subject: "History Modern",
      totalSessions: 15,
      present: 14,
      absent: 1,
      late: 0,
      rate: 93.3,
      trend: "up",
    },
    {
      subject: "Biology Lab",
      totalSessions: 12,
      present: 11,
      absent: 0,
      late: 1,
      rate: 91.7,
      trend: "stable",
    },
  ];

  const recentAttendance = [
    {
      date: "2024-01-22",
      subject: "Mathematics 101",
      status: "present",
      time: "09:00 AM",
    },
    {
      date: "2024-01-22",
      subject: "Chemistry Basics",
      status: "present",
      time: "11:30 AM",
    },
    {
      date: "2024-01-22",
      subject: "English Literature",
      status: "late",
      time: "02:15 PM",
      note: "15 min late",
    },
    {
      date: "2024-01-21",
      subject: "Physics Advanced",
      status: "present",
      time: "10:00 AM",
    },
    {
      date: "2024-01-21",
      subject: "History Modern",
      status: "present",
      time: "03:00 PM",
    },
    {
      date: "2024-01-20",
      subject: "Biology Lab",
      status: "absent",
      time: "01:00 PM",
      reason: "Sick leave",
    },
    {
      date: "2024-01-20",
      subject: "Mathematics 101",
      status: "present",
      time: "09:00 AM",
    },
    {
      date: "2024-01-19",
      subject: "Chemistry Basics",
      status: "present",
      time: "11:30 AM",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-4 w-4" />;
      case "absent":
        return <X className="h-4 w-4" />;
      case "late":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const filteredAttendance = attendanceData.filter(
    (item) => selectedSubject === "all" || item.subject === selectedSubject
  );

  const filteredRecentAttendance = recentAttendance.filter(
    (item) => selectedSubject === "all" || item.subject === selectedSubject
  );

  const overallStats = {
    totalSessions: attendanceData.reduce(
      (sum, item) => sum + item.totalSessions,
      0
    ),
    totalPresent: attendanceData.reduce((sum, item) => sum + item.present, 0),
    totalAbsent: attendanceData.reduce((sum, item) => sum + item.absent, 0),
    totalLate: attendanceData.reduce((sum, item) => sum + item.late, 0),
    overallRate:
      (attendanceData.reduce((sum, item) => sum + item.present, 0) /
        attendanceData.reduce((sum, item) => sum + item.totalSessions, 0)) *
      100,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        <p className="text-gray-600">
          Track your attendance across all subjects
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Rate</p>
              <p className="text-3xl font-bold text-blue-600">
                {overallStats.overallRate.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-3xl font-bold text-green-600">
                {overallStats.totalPresent}
              </p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-3xl font-bold text-red-600">
                {overallStats.totalAbsent}
              </p>
            </div>
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-3xl font-bold text-yellow-600">
                {overallStats.totalLate}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
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
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Subject-wise Attendance */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Attendance by Subject
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredAttendance.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.subject}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.present} present • {item.absent} absent •{" "}
                      {item.late} late
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.rate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-6">
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">
                        {item.rate.toFixed(1)}%
                      </span>
                      <div className="text-sm text-gray-500">
                        {item.totalSessions} sessions
                      </div>
                    </div>
                    {getTrendIcon(item.trend)}
                    <Link
                      to={`/attendance/session/${item.subject
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Attendance
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredRecentAttendance.slice(0, 8).map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {record.date}
                      </div>
                      <div className="text-xs text-gray-500">{record.time}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {record.subject}
                      </div>
                      {record.note && (
                        <div className="text-xs text-gray-600">
                          {record.note}
                        </div>
                      )}
                      {record.reason && (
                        <div className="text-xs text-gray-600">
                          Reason: {record.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {getStatusIcon(record.status)}
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
