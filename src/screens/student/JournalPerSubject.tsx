import React, { useState } from 'react';
import { ArrowLeft, Calendar, Plus, Search, BookOpen, Tag, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const JournalPerSubject: React.FC = () => {
  const { subject } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Mock subject data
  const subjectInfo = {
    name: 'Mathematics 101',
    code: 'MATH101',
    instructor: 'Prof. Johnson',
    semester: 'Fall 2024'
  };

  const journalEntries = [
    {
      id: 1,
      title: 'Quadratic Equations and Real-World Applications',
      date: '2024-01-20',
      wordCount: 245,
      tags: ['algebra', 'problem-solving', 'applications'],
      mood: 'confident',
      difficulty: 'medium',
      content: 'Today we learned about quadratic equations and their applications in real-world problems. I found it particularly interesting how parabolic motion in physics can be modeled using these equations. The discriminant concept was initially confusing, but after working through several examples, I can now determine the nature of roots without actually solving the equation.\n\nKey insights:\n- The vertex form makes graphing much easier\n- Real-world applications include projectile motion and profit optimization\n- Practice problems helped solidify my understanding\n\nAreas to review: Complex number solutions when discriminant is negative.',
      learningObjectives: ['Solve quadratic equations', 'Apply to real-world scenarios', 'Understand discriminant'],
      questionsRaised: ['How do complex solutions relate to real-world problems?', 'Are there other forms of quadratic equations?']
    },
    {
      id: 2,
      title: 'Introduction to Derivatives',
      date: '2024-01-18',
      wordCount: 312,
      tags: ['calculus', 'derivatives', 'limits'],
      mood: 'excited',
      difficulty: 'challenging',
      content: 'First introduction to derivatives today. The concept of instantaneous rate of change is fascinating. We started with the limit definition and worked our way to basic differentiation rules.\n\nThe geometric interpretation as the slope of a tangent line really helped me visualize what derivatives represent. Practice with the power rule was straightforward, but I need more work on the product and quotient rules.\n\nProfessor Johnson\'s explanation using the velocity-position relationship was particularly helpful.',
      learningObjectives: ['Understand derivative concept', 'Apply basic differentiation rules', 'Interpret geometrically'],
      questionsRaised: ['How do derivatives apply in economics?', 'What about derivatives of trigonometric functions?']
    },
    {
      id: 3,
      title: 'Systems of Linear Equations',
      date: '2024-01-15',
      wordCount: 198,
      tags: ['linear-algebra', 'systems', 'matrices'],
      mood: 'curious',
      difficulty: 'easy',
      content: 'Learned three methods for solving systems of linear equations: substitution, elimination, and graphing. The elimination method seems most efficient for larger systems.\n\nMatrix representation was introduced briefly - looking forward to exploring this further. The connection between graphical solutions and algebraic solutions is clearer now.',
      learningObjectives: ['Solve systems using multiple methods', 'Understand graphical interpretation'],
      questionsRaised: ['When is each method most appropriate?', 'How do matrices simplify the process?']
    },
    {
      id: 4,
      title: 'Polynomial Functions and Graphs',
      date: '2024-01-12',
      wordCount: 276,
      tags: ['polynomials', 'graphing', 'functions'],
      mood: 'thoughtful',
      difficulty: 'medium',
      content: 'Deep dive into polynomial functions today. Understanding the relationship between degree and the shape of the graph was key. Higher-degree polynomials have more complex behavior, but there are patterns to recognize.\n\nEnd behavior is determined by the leading term, and zeros determine x-intercepts. The intermediate value theorem guarantees that continuous functions take on all values between any two points.',
      learningObjectives: ['Analyze polynomial behavior', 'Sketch graphs', 'Find zeros'],
      questionsRaised: ['How do complex zeros affect real graphs?', 'What about rational functions?']
    }
  ];

  const filteredEntries = journalEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'word-count':
        return b.wordCount - a.wordCount;
      default:
        return 0;
    }
  });

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excited': return 'bg-green-100 text-green-800';
      case 'confident': return 'bg-blue-100 text-blue-800';
      case 'curious': return 'bg-yellow-100 text-yellow-800';
      case 'thoughtful': return 'bg-purple-100 text-purple-800';
      case 'confused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalEntries: journalEntries.length,
    totalWords: journalEntries.reduce((sum, entry) => sum + entry.wordCount, 0),
    avgWordsPerEntry: Math.round(journalEntries.reduce((sum, entry) => sum + entry.wordCount, 0) / journalEntries.length),
    allTags: [...new Set(journalEntries.flatMap(entry => entry.tags))]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/journal" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{subjectInfo.name}</h1>
            <p className="text-gray-600">{subjectInfo.code} • {subjectInfo.instructor} • {subjectInfo.semester}</p>
          </div>
          <Link
            to={`/journal/${subject}/new`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Entry
          </Link>
        </div>
      </div>

      {/* Subject Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Entries</p>
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
              <p className="text-sm font-medium text-gray-600">Avg Words</p>
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
              <p className="text-sm font-medium text-gray-600">Tags Used</p>
              <p className="text-2xl font-bold text-gray-900">{stats.allTags.length}</p>
            </div>
            <Tag className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="word-count">Word Count</option>
            </select>
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {stats.allTags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full cursor-pointer hover:bg-blue-200 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {sortedEntries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{entry.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {entry.date}
                    </div>
                    <span>{entry.wordCount} words</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(entry.difficulty)}`}>
                      {entry.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 line-clamp-4">{entry.content}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Learning Objectives</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {entry.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Questions Raised</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {entry.questionsRaised.map((question, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/journal/entry/${entry.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Read Full Entry →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedEntries.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
          <Link
            to={`/journal/${subject}/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create First Entry
          </Link>
        </div>
      )}
    </div>
  );
};

export default JournalPerSubject;