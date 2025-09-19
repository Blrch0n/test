import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Calendar, Eye, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const GradeDetail: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    'Mathematics 101',
    'Physics Advanced',
    'Chemistry Basics',
    'English Literature',
    'History Modern',
    'Biology Lab'
  ];

  const grades = [
    {
      id: 1,
      subject: 'Mathematics 101',
      code: 'MATH101',
      assignments: [
        { id: 1, name: 'Quiz 1', type: 'Quiz', score: 45, maxScore: 50, percentage: 90, date: '2024-01-15', weight: 10 },
        { id: 2, name: 'Homework 1', type: 'Homework', score: 95, maxScore: 100, percentage: 95, date: '2024-01-20', weight: 15 },
        { id: 3, name: 'Midterm Exam', type: 'Exam', score: 185, maxScore: 200, percentage: 92.5, date: '2024-02-15', weight: 30 },
        { id: 4, name: 'Final Project', type: 'Project', score: 140, maxScore: 150, percentage: 93.3, date: '2024-03-01', weight: 25 }
      ],
      currentGrade: 93.0,
      gpa: 4.0,
      credits: 3
    },
    {
      id: 2,
      subject: 'Physics Advanced',
      code: 'PHYS201',
      assignments: [
        { id: 5, name: 'Lab Report 1', type: 'Lab', score: 88, maxScore: 100, percentage: 88, date: '2024-01-18', weight: 20 },
        { id: 6, name: 'Quiz 2', type: 'Quiz', score: 42, maxScore: 50, percentage: 84, date: '2024-01-25', weight: 10 },
        { id: 7, name: 'Research Paper', type: 'Paper', score: 175, maxScore: 200, percentage: 87.5, date: '2024-02-20', weight: 35 }
      ],
      currentGrade: 87.5,
      gpa: 3.5,
      credits: 4
    },
    {
      id: 3,
      subject: 'Chemistry Basics',
      code: 'CHEM101',
      assignments: [
        { id: 8, name: 'Lab Practical', type: 'Lab', score: 92, maxScore: 100, percentage: 92, date: '2024-01-22', weight: 25 },
        { id: 9, name: 'Chapter Test', type: 'Test', score: 87, maxScore: 100, percentage: 87, date: '2024-02-05', weight: 20 },
        { id: 10, name: 'Final Exam', type: 'Exam', score: 178, maxScore: 200, percentage: 89, date: '2024-03-10', weight: 40 }
      ],
      currentGrade: 89.2,
      gpa: 3.7,
      credits: 3
    }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 65) return 'D';
    return 'F';
  };

  const filteredGrades = grades.filter(subject => {
    const matchesSubject = selectedSubject === 'all' || subject.subject === selectedSubject;
    const matchesSearch = subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const overallStats = {
    totalCredits: grades.reduce((sum, subject) => sum + subject.credits, 0),
    weightedGPA: grades.reduce((sum, subject) => sum + (subject.gpa * subject.credits), 0) / 
                 grades.reduce((sum, subject) => sum + subject.credits, 0),
    totalAssignments: grades.reduce((sum, subject) => sum + subject.assignments.length, 0),
    avgGrade: grades.reduce((sum, subject) => sum + subject.currentGrade, 0) / grades.length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
        <p className="text-gray-600">Track your academic performance across all subjects</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall GPA</p>
              <p className="text-3xl font-bold text-blue-600">{overallStats.weightedGPA.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credits</p>
              <p className="text-3xl font-bold text-green-600">{overallStats.totalCredits}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">C</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-3xl font-bold text-purple-600">{overallStats.totalAssignments}</p>
            </div>
            <BarChart className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-3xl font-bold text-orange-600">{overallStats.avgGrade.toFixed(1)}%</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">{getGradeLetter(overallStats.avgGrade)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="current">Current Semester</option>
              <option value="previous">Previous Semester</option>
              <option value="all">All Semesters</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subject Grade Cards */}
      <div className="space-y-6">
        {filteredGrades.map((subject) => (
          <div key={subject.id} className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{subject.subject}</h2>
                  <p className="text-sm text-gray-600">{subject.code} • {subject.credits} credits</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Current Grade</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">{subject.currentGrade.toFixed(1)}%</span>
                      <span className={`px-3 py-1 text-sm font-bold rounded-full ${getGradeColor(subject.currentGrade)}`}>
                        {getGradeLetter(subject.currentGrade)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">GPA</p>
                    <p className="text-2xl font-bold text-green-600">{subject.gpa.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Assignment</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Type</th>
                      <th className="text-center py-3 text-sm font-medium text-gray-600">Score</th>
                      <th className="text-center py-3 text-sm font-medium text-gray-600">Grade</th>
                      <th className="text-center py-3 text-sm font-medium text-gray-600">Weight</th>
                      <th className="text-center py-3 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-center py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subject.assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{assignment.name}</div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            assignment.type === 'Exam' ? 'bg-red-100 text-red-800' :
                            assignment.type === 'Quiz' ? 'bg-blue-100 text-blue-800' :
                            assignment.type === 'Homework' ? 'bg-green-100 text-green-800' :
                            assignment.type === 'Project' ? 'bg-purple-100 text-purple-800' :
                            assignment.type === 'Lab' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {assignment.type}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-medium">{assignment.score}/{assignment.maxScore}</span>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`font-bold ${assignment.percentage >= 90 ? 'text-green-600' : 
                              assignment.percentage >= 80 ? 'text-blue-600' : 
                              assignment.percentage >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {assignment.percentage.toFixed(1)}%
                            </span>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getGradeColor(assignment.percentage)}`}>
                              {getGradeLetter(assignment.percentage)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="text-sm text-gray-600">{assignment.weight}%</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="text-sm text-gray-600">{assignment.date}</span>
                        </td>
                        <td className="py-4 text-center">
                          <Link
                            to={`/assignment/${assignment.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGrades.length === 0 && (
        <div className="text-center py-12">
          <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default GradeDetail;