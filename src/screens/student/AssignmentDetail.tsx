import React from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const AssignmentDetail: React.FC = () => {
  const { id } = useParams();

  const assignment = {
    id: 1,
    name: "Quadratic Equations Quiz",
    subject: "Mathematics 101",
    code: "MATH101",
    instructor: "Prof. Johnson",
    type: "Quiz",
    score: 45,
    maxScore: 50,
    percentage: 90,
    gradeLetter: "A-",
    weight: 10,
    submittedAt: "2024-01-15 09:30 AM",
    gradedAt: "2024-01-16 02:15 PM",
    dueDate: "2024-01-15 11:59 PM",
    instructions:
      "This quiz covers Chapter 4: Quadratic Equations. You will have 45 minutes to complete 10 problems. Make sure to show all work for partial credit. Use only the methods taught in class.",
    objectives: [
      "Solve quadratic equations using the quadratic formula",
      "Factor quadratic expressions",
      "Identify the discriminant and determine the nature of roots",
      "Apply quadratic equations to real-world problems",
    ],
    rubric: [
      {
        criteria: "Problem-solving accuracy",
        points: 25,
        earned: 23,
        feedback:
          "Most solutions are correct with minor calculation errors in problems 3 and 7.",
      },
      {
        criteria: "Work shown and methodology",
        points: 15,
        earned: 14,
        feedback:
          "Clear work shown for most problems. Remember to always state your final answer clearly.",
      },
      {
        criteria: "Application problems",
        points: 10,
        earned: 8,
        feedback:
          "Good understanding of concepts but need improvement in translating word problems to equations.",
      },
    ],
    feedback:
      "Excellent work overall! You demonstrate a strong understanding of quadratic equations. Your methodology is sound and calculations are mostly accurate. Focus on being more careful with arithmetic in future assignments, and practice more word problems to improve application skills. Well done!",
    attachments: [
      { name: "quiz_submission.pdf", size: "1.2 MB", downloadUrl: "#" },
      { name: "reference_formulas.pdf", size: "345 KB", downloadUrl: "#" },
    ],
    statistics: {
      classAverage: 38.5,
      highestScore: 48,
      lowestScore: 22,
      myPercentile: 85,
    },
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 70)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quiz":
        return "bg-blue-100 text-blue-800";
      case "Exam":
        return "bg-red-100 text-red-800";
      case "Homework":
        return "bg-green-100 text-green-800";
      case "Project":
        return "bg-purple-100 text-purple-800";
      case "Lab":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/grades"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {assignment.name}
            </h1>
            <p className="text-gray-600">
              {assignment.subject} • {assignment.instructor}
            </p>
          </div>
        </div>
      </div>

      {/* Assignment Overview Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Type</span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(
                  assignment.type
                )}`}
              >
                {assignment.type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Weight</span>
              <span className="text-sm text-gray-900">
                {assignment.weight}% of total grade
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Due Date
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-900">
                <Calendar className="h-4 w-4" />
                {assignment.dueDate}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Submitted
              </span>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                {assignment.submittedAt}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`border-2 rounded-lg p-6 text-center ${getGradeColor(
                assignment.percentage
              )}`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6" />
                <span className="text-2xl font-bold">
                  {assignment.score}/{assignment.maxScore}
                </span>
              </div>
              <div className="text-lg font-semibold">
                {assignment.percentage}% - {assignment.gradeLetter}
              </div>
              <div className="text-sm mt-1">
                Graded on {assignment.gradedAt}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Assignment Instructions
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {assignment.instructions}
        </p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Learning Objectives
        </h2>
        <ul className="space-y-2">
          {assignment.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed Feedback */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Rubric & Feedback</h2>
        
        <div className="space-y-4 mb-6">
          {assignment.rubric.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{item.criteria}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">{item.earned}/{item.points} pts</span>
                  <div className={`w-4 h-4 rounded-full ${
                    item.earned === item.points ? 'bg-green-500' :
                    item.earned >= item.points * 0.8 ? 'bg-blue-500' :
                    item.earned >= item.points * 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.earned === item.points ? 'bg-green-500' :
                    item.earned >= item.points * 0.8 ? 'bg-blue-500' :
                    item.earned >= item.points * 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(item.earned / item.points) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{item.feedback}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Instructor Feedback</h3>
          <p className="text-blue-800">{assignment.feedback}</p>
        </div>
      </div> */}

      {/* Class Statistics */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Your Score</span>
              <span className="text-lg font-bold text-blue-600">{assignment.score}/{assignment.maxScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Class Average</span>
              <span className="text-sm text-gray-900">{assignment.statistics.classAverage}/{assignment.maxScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Highest Score</span>
              <span className="text-sm text-gray-900">{assignment.statistics.highestScore}/{assignment.maxScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Lowest Score</span>
              <span className="text-sm text-gray-900">{assignment.statistics.lowestScore}/{assignment.maxScore}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{assignment.statistics.myPercentile}th</div>
              <div className="text-sm text-gray-600">Percentile</div>
              <div className="text-xs text-gray-500 mt-2">
                You scored better than {assignment.statistics.myPercentile}% of the class
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Attachments */}
      {/* {assignment.attachments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Files & Resources</h2>
          <div className="space-y-3">
            {assignment.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-600">{file.size}</div>
                  </div>
                </div>
                <a
                  href={file.downloadUrl}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AssignmentDetail;
