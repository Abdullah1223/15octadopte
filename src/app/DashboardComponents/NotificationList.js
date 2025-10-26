import { useTranslation } from "../Context/TranslationContext.";
import NotificationItem from "./NotificationItem";
import { Bell } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const NotificationList = ({ notifications, onLoadMore, hasMore, isLoading,lastCursor,prevDocs }) => {
  const { translate } = useTranslation();

  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && !isLoading && hasMore) {
        onLoadMore(lastCursor,prevDocs);
      }
    },
  });

  return (
    <div className="w-full h-full">
      <div className="sticky top-0 bg-white border-b border-gray-100 z-5">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-orange-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500 mt-1">
                {translate('Everything That happens in your account')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification, index) => (
              <NotificationItem key={index} notification={notification} />
            ))}
            <div ref={ref} className="h-10 flex items-center justify-center">
              {isLoading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500" />
              )}
            </div>
          </>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;