import React, { useState } from "react";
import {
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Users,
  BookOpen,
  PieChart,
  LineChart,
} from "lucide-react";

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("semester");
  const [selectedReport, setSelectedReport] = useState("overview");

  const teacherReports = [
    {
      id: "overview",
      name: "Class Overview",
      description: "Overall class performance and statistics",
    },
    {
      id: "grades",
      name: "Grade Distribution",
      description: "Grade patterns and distribution analysis",
    },
    {
      id: "attendance",
      name: "Attendance Report",
      description: "Student attendance patterns and trends",
    },
    {
      id: "individual",
      name: "Individual Progress",
      description: "Detailed student progress reports",
    },
    {
      id: "comparative",
      name: "Comparative Analysis",
      description: "Compare performance across classes",
    },
  ];

  const studentReports = [
    {
      id: "academic",
      name: "Academic Progress",
      description: "Your grades and academic performance",
    },
    {
      id: "attendance",
      name: "Attendance Summary",
      description: "Your attendance record and patterns",
    },
    {
      id: "goals",
      name: "Learning Goals",
      description: "Progress toward learning objectives",
    },
    {
      id: "journal",
      name: "Journal Analytics",
      description: "Your learning journal insights",
    },
    {
      id: "transcript",
      name: "Unofficial Transcript",
      description: "Complete academic record",
    },
  ];

  // Combine both teacher and student reports so Builder.io (or any consumer)
  // can access all reports without relying on a role prop.
  const combinedReports = [...teacherReports, ...studentReports].reduce(
    (acc: typeof teacherReports, r) => {
      if (!acc.find((x) => x.id === r.id)) acc.push(r as any);
      return acc;
    },
    [] as typeof teacherReports
  );

  const reports = combinedReports;

  const teacherStats = {
    totalStudents: 156,
    averageGrade: 85.2,
    attendanceRate: 94.1,
    assignmentsGraded: 234,
    classesActive: 8,
  };

  const studentStats = {
    currentGPA: 3.85,
    creditsCompleted: 32,
    attendanceRate: 96.2,
    journalEntries: 45,
    assignmentsCompleted: 28,
  };

  // Keep both teacherStats and studentStats available and present both in the UI
  // so builders can see content for either role. No per-role prop is required.

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          This page exposes both teacher and student reports so external
          builders and tools can access all available report types.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {/* Show teacher stats then student stats so builders can fetch either */}
        <>
          {/* Teacher stats block */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teacherStats.totalStudents}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Grade
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teacherStats.averageGrade}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Attendance Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teacherStats.attendanceRate}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Assignments Graded
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teacherStats.assignmentsGraded}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Classes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teacherStats.classesActive}
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student stats block */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Current GPA
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {studentStats.currentGPA}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Credits Completed
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {studentStats.creditsCompleted}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Attendance Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {studentStats.attendanceRate}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Journal Entries
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {studentStats.journalEntries}
                  </p>
                </div>
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">J</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Assignments Done
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {studentStats.assignmentsCompleted}
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">A</span>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trends */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Class &amp; Academic Performance Trends
              </h2>
              <LineChart className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Performance Over Time
              </h3>
              <p className="text-gray-500 mb-4">
                Track class average grades and improvement trends — also monitor
                individual grade progression throughout the semester.
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">
                    Class Average / Your Grades
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Grade Distribution / Subject Performance
              </h2>
              <PieChart className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Grade Breakdown / Performance by Subject
              </h3>
              <p className="text-gray-500 mb-4">
                Distribution of student grades across all assignments and
                individual performance across different subjects.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">A (90-100%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">B (80-89%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600">C (70-79%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Below 70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
