import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, Edit, History, Download, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface GradebookDetailProps {
  onOpenGradeEdit: () => void;
  onOpenGradeHistory: () => void;
}

const GradebookDetail: React.FC<GradebookDetailProps> = ({ onOpenGradeEdit, onOpenGradeHistory }) => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('all');

  const classInfo = {
    name: 'Mathematics 101',
    code: 'MATH101',
    semester: 'Fall 2024',
    students: 28,
    avgGrade: 85.5
  };

  const assignments = [
    { id: 1, name: 'Quiz 1', type: 'Quiz', points: 50, dueDate: '2024-01-15' },
    { id: 2, name: 'Homework 1', type: 'Homework', points: 100, dueDate: '2024-01-20' },
    { id: 3, name: 'Midterm Exam', type: 'Exam', points: 200, dueDate: '2024-02-15' },
    { id: 4, name: 'Project', type: 'Project', points: 150, dueDate: '2024-03-01' }
  ];

  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@school.edu',
      grades: { 1: 45, 2: 95, 3: 185, 4: 140 },
      total: 465,
      percentage: 93.0
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.c@school.edu',
      grades: { 1: 42, 2: 88, 3: 170, 4: 135 },
      total: 435,
      percentage: 87.0
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@school.edu',
      grades: { 1: 48, 2: 92, 3: 175, 4: 145 },
      total: 460,
      percentage: 92.0
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      email: 'alex.r@school.edu',
      grades: { 1: 35, 2: 75, 3: 140, 4: 120 },
      total: 370,
      percentage: 74.0
    },
    {
      id: 5,
      name: 'Jessica Wu',
      email: 'jessica.w@school.edu',
      grades: { 1: 47, 2: 90, 3: 180, 4: 142 },
      total: 459,
      percentage: 91.8
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/gradebook" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{classInfo.name}</h1>
            <p className="text-gray-600">{classInfo.code} • {classInfo.semester}</p>
          </div>
        </div>

        {/* Class Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{classInfo.students}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class Average</p>
                <p className="text-2xl font-bold text-gray-900">{classInfo.avgGrade}%</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">A</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
              <button 
                onClick={onOpenGradeEdit}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Assignments</option>
              {assignments.map(assignment => (
                <option key={assignment.id} value={assignment.id.toString()}>
                  {assignment.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onOpenGradeEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Grade
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                {assignments.map(assignment => (
                  <th key={assignment.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div>
                      <div className="font-semibold">{assignment.name}</div>
                      <div className="text-gray-400 normal-case">({assignment.points} pts)</div>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/student/${student.id}`}
                      className="flex items-center hover:text-blue-600 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="text-sm font-medium text-blue-800">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </Link>
                  </td>
                  {assignments.map(assignment => (
                    <td key={assignment.id} className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={onOpenGradeEdit}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {student.grades[assignment.id] || '-'}/{assignment.points}
                      </button>
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-medium text-gray-900">{student.total}/500</div>
                    <div className={`text-sm font-medium ${getGradeColor(student.percentage)}`}>
                      {student.percentage}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={onOpenGradeEdit}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Edit Grade"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={onOpenGradeHistory}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Grade History"
                      >
                        <History className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradebookDetail;