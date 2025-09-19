import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, Eye, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeaveRequestsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const leaveRequests = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      studentId: 'STU2024001',
      type: 'Medical',
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      days: 3,
      reason: 'Fever and flu symptoms',
      status: 'pending',
      submittedAt: '2024-01-20 09:30 AM',
      attachments: ['medical_certificate.pdf']
    },
    {
      id: 2,
      studentName: 'Mike Chen',
      studentId: 'STU2024002',
      type: 'Personal',
      startDate: '2024-01-30',
      endDate: '2024-01-30',
      days: 1,
      reason: 'Family emergency',
      status: 'approved',
      submittedAt: '2024-01-18 02:15 PM',
      approvedAt: '2024-01-19 10:00 AM',
      attachments: []
    },
    {
      id: 3,
      studentName: 'Emily Davis',
      studentId: 'STU2024003',
      type: 'Academic',
      startDate: '2024-02-05',
      endDate: '2024-02-07',
      days: 3,
      reason: 'Academic conference participation',
      status: 'approved',
      submittedAt: '2024-01-15 11:20 AM',
      approvedAt: '2024-01-16 03:30 PM',
      attachments: ['conference_invitation.pdf']
    },
    {
      id: 4,
      studentName: 'Alex Rodriguez',
      studentId: 'STU2024004',
      type: 'Medical',
      startDate: '2024-01-22',
      endDate: '2024-01-24',
      days: 3,
      reason: 'Dental surgery',
      status: 'rejected',
      submittedAt: '2024-01-19 04:45 PM',
      rejectedAt: '2024-01-21 09:15 AM',
      rejectionReason: 'Insufficient medical documentation',
      attachments: []
    },
    {
      id: 5,
      studentName: 'Jessica Wu',
      studentId: 'STU2024005',
      type: 'Personal',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      reason: 'Wedding ceremony attendance',
      status: 'pending',
      submittedAt: '2024-01-21 01:20 PM',
      attachments: ['wedding_invitation.jpg']
    }
  ];

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.studentId.toLowerCase().includes(searchTerm.toLowerCase());
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
        <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
        <p className="text-gray-600">Review and manage student leave requests</p>
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
              placeholder="Search by student name or ID..."
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
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="text-sm font-medium text-blue-800">
                          {request.studentName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.studentName}</div>
                        <div className="text-sm text-gray-500">{request.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.startDate} {request.startDate !== request.endDate && `- ${request.endDate}`}
                    </div>
                    <div className="text-sm text-gray-500">{request.days} day{request.days > 1 ? 's' : ''}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={request.reason}>
                      {request.reason}
                    </div>
                    {request.attachments.length > 0 && (
                      <div className="text-xs text-blue-600 mt-1">
                        {request.attachments.length} attachment{request.attachments.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      to={`/leave-request/${request.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestsList;