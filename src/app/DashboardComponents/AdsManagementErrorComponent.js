import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return (
          <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
            <AlertCircle size={14} />
            <span>{error.message || error}</span>
          </div>
        );
      };



export default ErrorMessage;
