import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Users, BarChart, Eye } from 'lucide-react';

const GradebookList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('current');

  const classes = [
    {
      id: 1,
      name: 'Mathematics 101',
      code: 'MATH101',
      students: 28,
      semester: 'Fall 2024',
      avgGrade: 85.5,
      lastUpdated: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Physics Advanced',
      code: 'PHYS201',
      students: 24,
      semester: 'Fall 2024',
      avgGrade: 78.2,
      lastUpdated: '1 day ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Chemistry Basics',
      code: 'CHEM101',
      students: 32,
      semester: 'Fall 2024',
      avgGrade: 92.1,
      lastUpdated: '3 hours ago',
      status: 'active'
    },
    {
      id: 4,
      name: 'Biology Lab',
      code: 'BIO301',
      students: 18,
      semester: 'Fall 2024',
      avgGrade: 88.7,
      lastUpdated: '5 hours ago',
      status: 'active'
    },
    {
      id: 5,
      name: 'Statistics',
      code: 'STAT201',
      students: 26,
      semester: 'Spring 2024',
      avgGrade: 84.3,
      lastUpdated: '2 weeks ago',
      status: 'completed'
    },
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || 
                           (selectedSemester === 'current' && cls.status === 'active') ||
                           (selectedSemester === 'archived' && cls.status === 'completed');
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gradebook</h1>
        <p className="text-gray-600">Manage grades for all your classes</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="current">Current Semester</option>
              <option value="archived">Archived</option>
              <option value="all">All Classes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{filteredClasses.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredClasses.reduce((sum, cls) => sum + cls.students, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">
                {(filteredClasses.reduce((sum, cls) => sum + cls.avgGrade, 0) / filteredClasses.length).toFixed(1)}%
              </p>
            </div>
            <BarChart className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Classes</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredClasses.filter(cls => cls.status === 'active').length}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-600">{cls.code}</p>
                  <p className="text-xs text-gray-500 mt-1">{cls.semester}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  cls.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {cls.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="text-sm font-medium text-gray-900">{cls.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Grade</span>
                  <span className={`text-sm font-medium ${
                    cls.avgGrade >= 90 ? 'text-green-600' : 
                    cls.avgGrade >= 80 ? 'text-blue-600' : 
                    cls.avgGrade >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {cls.avgGrade.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm text-gray-500">{cls.lastUpdated}</span>
                </div>
              </div>

              <Link
                to={`/gradebook/${cls.id}`}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Gradebook
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default GradebookList;