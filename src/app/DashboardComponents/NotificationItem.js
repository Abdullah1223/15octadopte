const NotificationItem = ({ notification }) => {
    return (
      <div className="border-b border-gray-100 p-4 hover:bg-gray-50">
        <div className="flex items-start">
          <div className={`px-3 py-1 text-sm font-medium rounded mr-4 ${
            notification.type === 'Job Proposal' 
              ? 'bg-yellow-100 text-yellow-800' 
              : notification.type === 'Message' 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
          }`}>
            {notification.type}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{notification.title}</h4>
            <p className="text-sm text-gray-600 mb-1">{notification.description}</p>
            <div className="flex justify-between items-center">
              <a href="#" className="text-orange-500 text-sm">{notification.actionText}</a>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NotificationItem;