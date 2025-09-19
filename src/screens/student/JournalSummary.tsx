import React, { useState } from 'react';
import { Search, Filter, Calendar, BookOpen, Eye, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const JournalSummary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('2024-01');

  const subjects = [
    'Mathematics 101',
    'Physics Advanced',
    'Chemistry Basics',
    'English Literature',
    'History Modern',
    'Biology Lab'
  ];

  const journalEntries = [
    {
      id: 1,
      subject: 'Mathematics 101',
      title: 'Quadratic Equations and Real-World Applications',
      date: '2024-01-20',
      wordCount: 245,
      tags: ['algebra', 'problem-solving'],
      mood: 'confident',
      content: 'Today we learned about quadratic equations and their applications in real-world problems. I found it particularly interesting how parabolic motion can be modeled using these equations...'
    },
    {
      id: 2,
      subject: 'Physics Advanced',
      title: 'Electromagnetic Induction Experiment',
      date: '2024-01-19',
      wordCount: 312,
      tags: ['experiment', 'electricity'],
      mood: 'excited',
      content: 'Conducted experiment on electromagnetic induction today. Key findings include the relationship between magnetic field strength and induced current...'
    },
    {
      id: 3,
      subject: 'Chemistry Basics',
      title: 'Molecular Structures and Bonding',
      date: '2024-01-18',
      wordCount: 189,
      tags: ['molecules', 'bonding'],
      mood: 'curious',
      content: 'Study of molecular structures revealed fascinating patterns in how atoms bond to form compounds. The concept of electron sharing in covalent bonds...'
    },
    {
      id: 4,
      subject: 'English Literature',
      title: 'Analysis of Shakespeare\'s Hamlet',
      date: '2024-01-17',
      wordCount: 428,
      tags: ['shakespeare', 'drama'],
      mood: 'thoughtful',
      content: 'Reading Hamlet has been an incredible journey through complex themes of revenge, madness, and moral ambiguity. The character development...'
    },
    {
      id: 5,
      subject: 'History Modern',
      title: 'Industrial Revolution Impact',
      date: '2024-01-16',
      wordCount: 356,
      tags: ['history', 'society'],
      mood: 'reflective',
      content: 'The Industrial Revolution fundamentally changed society in ways that continue to impact us today. The shift from agricultural to industrial...'
    }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excited': return 'bg-green-100 text-green-800';
      case 'confident': return 'bg-blue-100 text-blue-800';
      case 'curious': return 'bg-yellow-100 text-yellow-800';
      case 'thoughtful': return 'bg-purple-100 text-purple-800';
      case 'reflective': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || entry.subject === selectedSubject;
    const entryDate = new Date(entry.date);
    const selectedDate = new Date(selectedMonth + '-01');
    const matchesMonth = entryDate.getFullYear() === selectedDate.getFullYear() && 
                        entryDate.getMonth() === selectedDate.getMonth();
    return matchesSearch && matchesSubject && matchesMonth;
  });

  const stats = {
    totalEntries: journalEntries.length,
    totalWords: journalEntries.reduce((sum, entry) => sum + entry.wordCount, 0),
    avgWordsPerEntry: Math.round(journalEntries.reduce((sum, entry) => sum + entry.wordCount, 0) / journalEntries.length),
    subjectsActive: new Set(journalEntries.map(entry => entry.subject)).size
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Journal</h1>
            <p className="text-gray-600">Track your learning progress and insights</p>
          </div>
          <Link
            to="/journal/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Entry
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEntries}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Words</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWords.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Words/Entry</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgWordsPerEntry}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">W</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.subjectsActive}</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">S</span>
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
              placeholder="Search journal entries..."
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
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024-01">January 2024</option>
              <option value="2023-12">December 2023</option>
              <option value="2023-11">November 2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* Journal Entries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{entry.title}</h3>
                  <p className="text-sm text-blue-600 mb-1">{entry.subject}</p>
                  <p className="text-xs text-gray-500">{entry.date}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getMoodColor(entry.mood)}`}>
                  {entry.mood}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{entry.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{entry.wordCount} words</span>
                  <div className="flex gap-2">
                    {entry.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/journal/${entry.subject.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Eye className="h-4 w-4" />
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Link
            to="/journal/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Your First Entry
          </Link>
        </div>
      )}
    </div>
  );
};

export default JournalSummary;