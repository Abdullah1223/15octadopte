import { Check, Clock, X } from "lucide-react";

export const LoginHistoryList = () => {
  const history = [
    { time: '2025-10-21 11:30 AM', location: 'New York, US', status: 'Success' },
    { time: '2025-10-20 08:00 PM', location: 'London, UK', status: 'Failure' },
  ];
  return (
    <div className="space-y-2 p-4 pt-0">
      {history.map((item, index) => (
        <div key={index} className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{item.time} - {item.location}</span>
          </div>
          <span className={`text-xs font-medium flex items-center space-x-1 ${item.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
            {item.status === 'Success' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            <span>{item.status}</span>
          </span>
        </div>
      ))}
    </div>
  );
};
