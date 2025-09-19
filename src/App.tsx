import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ErrorState from "./screens/ErrorState";

// Teacher Screens
import TeacherDashboard from "./screens/teacher/Dashboard";
import GradebookList from "./screens/teacher/GradebookList";
import GradebookDetail from "./screens/teacher/GradebookDetail";
import StudentProfileView from "./screens/teacher/StudentProfileView";
import AttendanceManagement from "./screens/teacher/AttendanceManagement";
import AttendancePerStudent from "./screens/teacher/AttendancePerStudent";
import LeaveRequestsList from "./screens/teacher/LeaveRequestsList";
import LeaveRequestApproval from "./screens/teacher/LeaveRequestApproval";

// Student Screens
import StudentDashboard from "./screens/student/Dashboard";
import JournalSummary from "./screens/student/JournalSummary";
import JournalPerSubject from "./screens/student/JournalPerSubject";
import GradeDetail from "./screens/student/GradeDetail";
import AssignmentDetail from "./screens/student/AssignmentDetail";
import AttendanceOverview from "./screens/student/AttendanceOverview";
import AttendancePerSession from "./screens/student/AttendancePerSession";
import LeaveRequestForm from "./screens/student/LeaveRequestForm";
import LeaveRequestStatus from "./screens/student/LeaveRequestStatus";
import StudentProfile from "./screens/student/StudentProfile";

// Shared Screens
import Reports from "./screens/shared/Reports";

// Modals
import GradeEditModal from "./components/modals/GradeEditModal";
import GradeHistoryModal from "./components/modals/GradeHistoryModal";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState<"teacher" | "student">("teacher");

  // Check URL parameters to auto-show modals for screenshot purposes
  const urlParams = new URLSearchParams(window.location.search);
  const [showGradeEditModal, setShowGradeEditModal] = useState(
    urlParams.get("modal") === "grade-edit"
  );
  const [showGradeHistoryModal, setShowGradeHistoryModal] = useState(
    urlParams.get("modal") === "grade-history"
  );

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  onLogin={setIsAuthenticated}
                  onRoleSelect={setUserRole}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorState />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ConditionalNavigation />
        <main className="pt-16">
          <Routes>
            {/* Teacher Routes - Always accessible */}
            <Route
              path="/"
              element={
                <TeacherDashboard
                  onOpenGradeEdit={() => setShowGradeEditModal(true)}
                />
              }
            />
            <Route
              path="/teacher"
              element={
                <TeacherDashboard
                  onOpenGradeEdit={() => setShowGradeEditModal(true)}
                />
              }
            />
            <Route path="/gradebook" element={<GradebookList />} />
            <Route
              path="/gradebook/:id"
              element={
                <GradebookDetail
                  onOpenGradeEdit={() => setShowGradeEditModal(true)}
                  onOpenGradeHistory={() => setShowGradeHistoryModal(true)}
                />
              }
            />
            <Route path="/student/:id" element={<StudentProfileView />} />
            <Route
              path="/attendance-management"
              element={<AttendanceManagement />}
            />
            <Route
              path="/attendance/student/:id"
              element={<AttendancePerStudent />}
            />
            <Route path="/leave-requests" element={<LeaveRequestsList />} />
            <Route
              path="/leave-request/:id"
              element={<LeaveRequestApproval />}
            />

            {/* Student Routes - Always accessible */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/journal" element={<JournalSummary />} />
            <Route path="/journal/:subject" element={<JournalPerSubject />} />
            <Route path="/grades" element={<GradeDetail />} />
            <Route path="/assignment/:id" element={<AssignmentDetail />} />
            <Route path="/attendance" element={<AttendanceOverview />} />
            <Route
              path="/attendance/session/:id"
              element={<AttendancePerSession />}
            />
            <Route path="/leave-request" element={<LeaveRequestForm />} />
            <Route
              path="/leave-requests-status"
              element={<LeaveRequestStatus />}
            />
            <Route path="/profile" element={<StudentProfile />} />

            {/* Shared Routes */}
            {/* Allow navigating to Login even when already authenticated */}
            <Route
              path="/login"
              element={
                <Login
                  onLogin={setIsAuthenticated}
                  onRoleSelect={setUserRole}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports userRole={userRole} />} />
            <Route path="*" element={<ErrorState />} />
          </Routes>
        </main>

        {/* Modals */}
        {showGradeEditModal && (
          <GradeEditModal onClose={() => setShowGradeEditModal(false)} />
        )}
        {showGradeHistoryModal && (
          <GradeHistoryModal onClose={() => setShowGradeHistoryModal(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;

function ConditionalNavigation() {
  const location = useLocation();
  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;
  return <Navigation />;
}
