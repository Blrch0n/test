import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, Eye, FileText, Download } from 'lucide-react';

const LeaveRequestStatus: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const leaveRequests = [
    {
      id: 1,
      type: 'Medical',
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      days: 3,
      reason: 'Fever and flu symptoms',
      status: 'approved',
      submittedAt: '2024-01-20 09:30 AM',
      reviewedAt: '2024-01-21 02:15 PM',
      reviewedBy: 'Prof. Johnson',
      comments: 'Approved. Please ensure to catch up on missed assignments. Get well soon!',
      attachments: ['medical_certificate.pdf']
    },
    {
      id: 2,
      type: 'Personal',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      reason: 'Wedding ceremony attendance',
      status: 'pending',
      submittedAt: '2024-01-21 01:20 PM',
      attachments: ['wedding_invitation.jpg'],
      estimatedReview: '2024-01-24'
    },
    {
      id: 3,
      type: 'Academic',
      startDate: '2024-02-15',
      endDate: '2024-02-16',
      days: 2,
      reason: 'Mathematics competition participation',
      status: 'approved',
      submittedAt: '2024-01-18 11:45 AM',
      reviewedAt: '2024-01-19 09:30 AM',
      reviewedBy: 'Prof. Smith',
      comments: 'Excellent opportunity! Approved. Please share your experience with the class upon return.',
      attachments: ['competition_invitation.pdf']
    },
    {
      id: 4,
      type: 'Personal',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      days: 1,
      reason: 'Family emergency',
      status: 'rejected',
      submittedAt: '2024-01-14 08:20 PM',
      reviewedAt: '2024-01-15 07:00 AM',
      reviewedBy: 'Prof. Davis',
      comments: 'Request submitted too late. Please submit requests at least 24 hours in advance except for true emergencies. Contact me directly for urgent situations.',
      attachments: []
    },
    {
      id: 5,
      type: 'Medical',
      startDate: '2024-01-08',
      endDate: '2024-01-10',
      days: 3,
      reason: 'Dental surgery',
      status: 'approved',
      submittedAt: '2024-01-05 02:30 PM',
      reviewedAt: '2024-01-06 10:15 AM',
      reviewedBy: 'Prof. Johnson',
      comments: 'Approved. Medical documentation provided. Take care and recover well.',
      attachments: ['dental_appointment.pdf']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Medical':
        return 'bg-red-100 text-red-800';
      case 'Personal':
        return 'bg-blue-100 text-blue-800';
      case 'Academic':
        return 'bg-purple-100 text-purple-800';
      case 'Emergency':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.status === 'pending').length,
    approved: leaveRequests.filter(r => r.status === 'approved').length,
    rejected: leaveRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Leave Requests</h1>
            <p className="text-gray-600">Track the status of your submitted leave requests</p>
          </div>
          <a
            href="/leave-request"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Request
          </a>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
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
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Medical">Medical</option>
              <option value="Personal">Personal</option>
              <option value="Academic">Academic</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.startDate} {request.startDate !== request.endDate && `- ${request.endDate}`}
                    </h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{request.reason}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{request.days} day{request.days > 1 ? 's' : ''}</span>
                    <span>Submitted: {request.submittedAt}</span>
                    {request.reviewedAt && <span>Reviewed: {request.reviewedAt}</span>}
                  </div>
                </div>
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <Eye className="h-5 w-5" />
                </button>
              </div>

              {/* Status-specific content */}
              {request.status === 'pending' && request.estimatedReview && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Under Review</h4>
                      <p className="text-sm text-yellow-700">
                        Expected review by: {request.estimatedReview}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {request.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Approved by {request.reviewedBy}</h4>
                      <p className="text-sm text-green-700 mt-1">{request.comments}</p>
                    </div>
                  </div>
                </div>
              )}

              {request.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Rejected by {request.reviewedBy}</h4>
                      <p className="text-sm text-red-700 mt-1">{request.comments}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {request.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">{attachment}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <a
            href="/leave-request"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Your First Request
          </a>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestStatus;