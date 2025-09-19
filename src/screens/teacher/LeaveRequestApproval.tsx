import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileText, Download, CheckCircle, XCircle, Clock, User, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const LeaveRequestApproval: React.FC = () => {
  const { id } = useParams();
  const [decision, setDecision] = useState('');
  const [comments, setComments] = useState('');

  const request = {
    id: 1,
    studentName: 'Sarah Johnson',
    studentId: 'STU2024001',
    email: 'sarah.j@school.edu',
    type: 'Medical',
    startDate: '2024-01-25',
    endDate: '2024-01-27',
    days: 3,
    reason: 'Fever and flu symptoms requiring rest as advised by family physician. Unable to attend classes during recovery period.',
    status: 'pending',
    submittedAt: '2024-01-20 09:30 AM',
    attachments: [
      { name: 'medical_certificate.pdf', size: '125 KB', type: 'application/pdf' },
      { name: 'doctor_note.jpg', size: '89 KB', type: 'image/jpeg' }
    ],
    affectedClasses: [
      'Mathematics 101 - Jan 25, 27',
      'Physics Advanced - Jan 25, 26',
      'Chemistry Basics - Jan 26, 27'
    ],
    previousRequests: [
      { date: '2023-12-15', type: 'Personal', days: 1, status: 'approved' },
      { date: '2023-11-08', type: 'Medical', days: 2, status: 'approved' },
    ]
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Medical':
        return 'bg-red-100 text-red-800';
      case 'Personal':
        return 'bg-blue-100 text-blue-800';
      case 'Academic':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDecision = (newDecision: 'approve' | 'reject') => {
    setDecision(newDecision);
  };

  const handleSubmit = () => {
    // Handle decision submission logic here
    console.log('Decision:', decision, 'Comments:', comments);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/leave-requests" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leave Request Review</h1>
            <p className="text-gray-600">Request #{request.id} from {request.studentName}</p>
          </div>
        </div>
      </div>

      {/* Request Details */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{request.studentName}</h2>
                <p className="text-gray-600">{request.studentId} • {request.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(request.type)}`}>
                {request.type}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Leave Period</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-gray-900">
                  {request.startDate} - {request.endDate} ({request.days} days)
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Submitted</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-gray-900">{request.submittedAt}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Reason for Leave</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{request.reason}</p>
            </div>
          </div>

          {/* Attachments */}
          {request.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
              <div className="space-y-2">
                {request.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Affected Classes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Affected Classes</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="space-y-1">
                {request.affectedClasses.map((cls, index) => (
                  <li key={index} className="text-sm text-yellow-800">{cls}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Requests */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Previous Leave Requests</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {request.previousRequests.map((prevRequest, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{prevRequest.date}</span>
                    <span className="text-sm text-gray-600 ml-2">• {prevRequest.type} • {prevRequest.days} day{prevRequest.days > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prevRequest.status)}`}>
                  {prevRequest.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Make Decision</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Decision</label>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDecision('approve')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    decision === 'approve'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  Approve
                </button>
                <button
                  onClick={() => handleDecision('reject')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    decision === 'reject'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <XCircle className="h-5 w-5" />
                  Reject
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                Comments {decision === 'reject' && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <MessageCircle className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="comments"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={decision === 'approve' ? "Optional approval message..." : decision === 'reject' ? "Please provide reason for rejection..." : "Add your comments..."}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link
                to="/leave-requests"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                disabled={!decision || (decision === 'reject' && !comments.trim())}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestApproval;