import NotificationItem from "./NotificationItem";

const NotificationList = ({ notifications }) => {
    return (
      <div className="bg-white shadow rounded-lg divide-y divide-gray-100">
        <div className="p-4 bg-gray-50">
          <h2 className="font-semibold">Notifications</h2>
          <p className="text-sm text-gray-500">Everything That happens in your account</p>
        </div>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    );
  };

  export default NotificationList;