import React, { useState } from 'react';
import { X, Save, Calculator, AlertCircle } from 'lucide-react';

interface GradeEditModalProps {
  onClose: () => void;
}

const GradeEditModal: React.FC<GradeEditModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    studentId: '1',
    assignmentId: '1',
    score: '45',
    maxScore: '50',
    feedback: '',
    lateSubmission: false,
    latePenalty: '0'
  });

  const students = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Emily Davis' },
    { id: '4', name: 'Alex Rodriguez' }
  ];

  const assignments = [
    { id: '1', name: 'Quiz 1', maxScore: 50, type: 'Quiz' },
    { id: '2', name: 'Homework 1', maxScore: 100, type: 'Homework' },
    { id: '3', name: 'Midterm Exam', maxScore: 200, type: 'Exam' },
    { id: '4', name: 'Final Project', maxScore: 150, type: 'Project' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle grade submission logic here
    console.log('Grade data:', formData);
    onClose();
  };

  const selectedStudent = students.find(s => s.id === formData.studentId);
  const selectedAssignment = assignments.find(a => a.id === formData.assignmentId);
  
  const calculatePercentage = () => {
    const score = parseFloat(formData.score) || 0;
    const maxScore = parseFloat(formData.maxScore) || 1;
    const penalty = formData.lateSubmission ? parseFloat(formData.latePenalty) || 0 : 0;
    const finalScore = Math.max(0, score - penalty);
    return ((finalScore / maxScore) * 100).toFixed(1);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Grade</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student and Assignment Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                Student
              </label>
              <select
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="assignmentId" className="block text-sm font-medium text-gray-700 mb-2">
                Assignment
              </label>
              <select
                id="assignmentId"
                name="assignmentId"
                value={formData.assignmentId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {assignments.map(assignment => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.name} ({assignment.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Score Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2">
                Score Earned
              </label>
              <input
                type="number"
                id="score"
                name="score"
                value={formData.score}
                onChange={handleInputChange}
                min="0"
                max={formData.maxScore}
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="maxScore" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Score
              </label>
              <input
                type="number"
                id="maxScore"
                name="maxScore"
                value={formData.maxScore}
                onChange={handleInputChange}
                min="1"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Late Submission */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lateSubmission"
                name="lateSubmission"
                checked={formData.lateSubmission}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="lateSubmission" className="ml-2 block text-sm text-gray-700">
                Late submission
              </label>
            </div>
            
            {formData.lateSubmission && (
              <div>
                <label htmlFor="latePenalty" className="block text-sm font-medium text-gray-700 mb-2">
                  Late Penalty (points)
                </label>
                <input
                  type="number"
                  id="latePenalty"
                  name="latePenalty"
                  value={formData.latePenalty}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Grade Calculation Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Grade Calculation</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Raw Score:</span>
                <div className="font-medium text-blue-900">
                  {formData.score}/{formData.maxScore}
                </div>
              </div>
              <div>
                <span className="text-blue-700">Percentage:</span>
                <div className="font-medium text-blue-900">{calculatePercentage()}%</div>
              </div>
              <div>
                <span className="text-blue-700">Letter Grade:</span>
                <div className="font-medium text-blue-900">
                  {getGradeLetter(parseFloat(calculatePercentage()))}
                </div>
              </div>
            </div>
            {formData.lateSubmission && parseFloat(formData.latePenalty) > 0 && (
              <div className="mt-2 flex items-center gap-2 text-sm text-orange-700">
                <AlertCircle className="h-4 w-4" />
                <span>Late penalty of {formData.latePenalty} points applied</span>
              </div>
            )}
          </div>

          {/* Feedback */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              rows={4}
              placeholder="Provide feedback on the student's performance..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeEditModal;