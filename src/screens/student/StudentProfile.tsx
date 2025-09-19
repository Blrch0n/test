import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X, Camera, BookOpen, TrendingUp } from 'lucide-react';

const StudentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '(555) 123-4567',
    dateOfBirth: '2002-03-15',
    address: '123 Main Street, Anytown, ST 12345',
    emergencyContact: 'Jane Johnson (Mother) - (555) 987-6543',
    studentId: 'STU2024001',
    enrollmentDate: '2024-01-15',
    expectedGraduation: '2026-05-15',
    major: 'Computer Science',
    minor: 'Mathematics',
    advisor: 'Prof. Dr. Smith'
  });

  const academicInfo = {
    currentSemester: 'Fall 2024',
    totalCredits: 45,
    completedCredits: 32,
    gpa: 3.85,
    classRank: 15,
    totalStudents: 120,
    academicStanding: 'Good Standing'
  };

  const enrolledCourses = [
    { code: 'MATH101', name: 'Mathematics 101', credits: 3, instructor: 'Prof. Johnson', grade: 'A-' },
    { code: 'PHYS201', name: 'Physics Advanced', credits: 4, instructor: 'Prof. Wilson', grade: 'B+' },
    { code: 'CHEM101', name: 'Chemistry Basics', credits: 3, instructor: 'Prof. Davis', grade: 'A' },
    { code: 'ENG201', name: 'English Literature', credits: 3, instructor: 'Prof. Brown', grade: 'A-' },
    { code: 'HIST301', name: 'History Modern', credits: 3, instructor: 'Prof. Miller', grade: 'B+' },
    { code: 'BIO401', name: 'Biology Lab', credits: 2, instructor: 'Prof. Garcia', grade: 'A' }
  ];

  const achievements = [
    { title: 'Dean\'s List', semester: 'Spring 2024', description: 'Achieved GPA of 3.8 or higher' },
    { title: 'Mathematics Excellence Award', date: '2024-01-15', description: 'Outstanding performance in calculus' },
    { title: 'Perfect Attendance', semester: 'Fall 2023', description: 'No absences throughout the semester' },
    { title: 'Peer Tutor Recognition', date: '2023-12-10', description: 'Helped 5+ students improve their grades' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'academic', label: 'Academic Info' },
    { id: 'courses', label: 'Current Courses' },
    { id: 'achievements', label: 'Achievements' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your personal and academic information</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-gray-600">{profileData.studentId} • {profileData.major}</p>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{academicInfo.gpa}</div>
            <div className="text-sm text-gray-600">Current GPA</div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={profileData.studentId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Current Semester</h3>
                  <p className="text-blue-800">{academicInfo.currentSemester}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Academic Standing</h3>
                  <p className="text-green-800">{academicInfo.academicStanding}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">Credits Progress</h3>
                  <p className="text-purple-800">{academicInfo.completedCredits} / {academicInfo.totalCredits} completed</p>
                  <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(academicInfo.completedCredits / academicInfo.totalCredits) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-900 mb-2">Class Rank</h3>
                  <p className="text-orange-800">{academicInfo.classRank} of {academicInfo.totalStudents}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                  <input
                    type="text"
                    value={profileData.major}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minor</label>
                  <input
                    type="text"
                    value={profileData.minor}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Advisor</label>
                  <input
                    type="text"
                    value={profileData.advisor}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation</label>
                  <input
                    type="date"
                    value={profileData.expectedGraduation}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Enrollment</h3>
              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{course.name}</h4>
                        <p className="text-sm text-gray-600">{course.code} • {course.instructor} • {course.credits} credits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-900">{achievement.title}</h4>
                      <p className="text-sm text-yellow-800 mb-1">
                        {achievement.semester || achievement.date}
                      </p>
                      <p className="text-sm text-yellow-700">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;