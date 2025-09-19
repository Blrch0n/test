import React from 'react';
import { X, History, Edit, User, Calendar, MessageCircle } from 'lucide-react';

interface GradeHistoryModalProps {
  onClose: () => void;
}

const GradeHistoryModal: React.FC<GradeHistoryModalProps> = ({ onClose }) => {
  const gradeHistory = [
    {
      id: 1,
      date: '2024-01-20 02:15 PM',
      action: 'Grade Updated',
      oldScore: 42,
      newScore: 45,
      maxScore: 50,
      changedBy: 'Prof. Johnson',
      reason: 'Corrected calculation error in problem #3',
      feedback: 'Good work on the quadratic formula applications. Minor arithmetic error corrected.'
    },
    {
      id: 2,
      date: '2024-01-16 10:30 AM',
      action: 'Grade Entered',
      oldScore: null,
      newScore: 42,
      maxScore: 50,
      changedBy: 'Prof. Johnson',
      reason: 'Initial grading',
      feedback: 'Strong understanding of concepts. Watch arithmetic in problem #3.'
    },
    {
      id: 3,
      date: '2024-01-15 11:45 AM',
      action: 'Assignment Submitted',
      oldScore: null,
      newScore: null,
      maxScore: 50,
      changedBy: 'Sarah Johnson (Student)',
      reason: 'Student submission',
      feedback: null
    }
  ];

  const assignmentInfo = {
    name: 'Quiz 1 - Quadratic Equations',
    type: 'Quiz',
    dueDate: '2024-01-15',
    student: 'Sarah Johnson',
    studentId: 'STU2024001',
    currentScore: 45,
    maxScore: 50,
    currentPercentage: 90.0,
    currentGrade: 'A-'
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Grade Updated':
        return 'bg-blue-100 text-blue-800';
      case 'Grade Entered':
        return 'bg-green-100 text-green-800';
      case 'Assignment Submitted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Grade Updated':
        return <Edit className="h-4 w-4" />;
      case 'Grade Entered':
        return <MessageCircle className="h-4 w-4" />;
      case 'Assignment Submitted':
        return <User className="h-4 w-4" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <History className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Grade History</h2>
              <p className="text-sm text-gray-600">{assignmentInfo.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Assignment Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">{assignmentInfo.student}</h3>
                <p className="text-sm text-blue-700">{assignmentInfo.studentId}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {assignmentInfo.currentScore}/{assignmentInfo.maxScore}
                </div>
                <div className="text-sm text-blue-700">
                  {assignmentInfo.currentPercentage}% ({assignmentInfo.currentGrade})
                </div>
              </div>
            </div>
          </div>

          {/* History Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change History</h3>
            
            {gradeHistory.map((entry, index) => (
              <div key={entry.id} className="relative">
                {/* Timeline line */}
                {index < gradeHistory.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                    {getActionIcon(entry.action)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getActionColor(entry.action)}`}>
                          {entry.action}
                        </span>
                        <span className="text-sm text-gray-600">by {entry.changedBy}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {entry.date}
                      </div>
                    </div>
                    
                    {/* Score Change */}
                    {entry.newScore !== null && (
                      <div className="mb-3">
                        {entry.oldScore !== null ? (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Score changed from</span>
                            <span className="font-medium text-red-600">{entry.oldScore}/{entry.maxScore}</span>
                            <span className="text-gray-600">to</span>
                            <span className="font-medium text-green-600">{entry.newScore}/{entry.maxScore}</span>
                            <span className="text-gray-600">
                              ({((entry.newScore / entry.maxScore) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Score set to</span>
                            <span className="font-medium text-green-600">{entry.newScore}/{entry.maxScore}</span>
                            <span className="text-gray-600">
                              ({((entry.newScore / entry.maxScore) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Reason */}
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-700">Reason: </span>
                      <span className="text-sm text-gray-600">{entry.reason}</span>
                    </div>
                    
                    {/* Feedback */}
                    {entry.feedback && (
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Feedback:</span>
                        </div>
                        <p className="text-sm text-gray-600">{entry.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Changes:</span>
                <div className="font-medium text-gray-900">
                  {gradeHistory.filter(h => h.action === 'Grade Updated').length}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Last Modified:</span>
                <div className="font-medium text-gray-900">{gradeHistory[0].date}</div>
              </div>
              <div>
                <span className="text-gray-600">Modified By:</span>
                <div className="font-medium text-gray-900">{gradeHistory[0].changedBy}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeHistoryModal;