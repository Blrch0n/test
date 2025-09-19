import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

const ErrorState: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
            
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </button>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you continue to experience issues, please contact support.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Email: support@edutracker.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;