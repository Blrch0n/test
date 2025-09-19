import React, { useState } from 'react';
import { Calendar, Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const LeaveRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'personal',
    startDate: '',
    endDate: '',
    reason: '',
    additionalDetails: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const leaveTypes = [
    { value: 'medical', label: 'Medical', description: 'For medical appointments or illness' },
    { value: 'personal', label: 'Personal', description: 'For personal or family matters' },
    { value: 'academic', label: 'Academic', description: 'For conferences, competitions, or academic events' },
    { value: 'emergency', label: 'Emergency', description: 'For urgent family emergencies' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Your leave request has been submitted and is pending approval. You will receive an email notification once it's reviewed.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Request Summary</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Type:</strong> {leaveTypes.find(t => t.value === formData.type)?.label}</p>
              <p><strong>Dates:</strong> {formData.startDate} to {formData.endDate} ({calculateDays()} days)</p>
              <p><strong>Status:</strong> Pending Review</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  type: 'personal',
                  startDate: '',
                  endDate: '',
                  reason: '',
                  additionalDetails: ''
                });
                setAttachments([]);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Request
            </button>
            <button
              onClick={() => window.location.href = '/leave-requests'}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View My Requests
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Request Leave</h1>
        <p className="text-gray-600">Submit a leave request for review and approval</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Leave Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveTypes.map((type) => (
              <label key={type.value} className="relative">
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={formData.type === type.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.type === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <h3 className="font-medium text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <div className="relative">
                <Calendar className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          {formData.startDate && formData.endDate && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Duration:</strong> {calculateDays()} day{calculateDays() > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Reason */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reason for Leave</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Brief Reason *
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="e.g., Medical appointment, Family emergency, Conference attendance"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={4}
                value={formData.additionalDetails}
                onChange={handleInputChange}
                placeholder="Provide any additional context or details that might be helpful for the approval process..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload supporting documents (medical certificates, invitations, etc.)
              </p>
              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB each)
              </p>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Uploaded Files:</h3>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-800">Important Notice</h3>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Submit your request at least 24 hours in advance for non-emergency situations</li>
                <li>• Medical leave may require a doctor's certificate for absences longer than 3 days</li>
                <li>• You will receive an email notification once your request is reviewed</li>
                <li>• Contact your instructors directly for any urgent academic concerns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.startDate || !formData.endDate || !formData.reason}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;