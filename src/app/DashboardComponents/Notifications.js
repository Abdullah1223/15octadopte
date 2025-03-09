import NotificationList from "./NotificationList";

 export default function Notifications() {
  const notifications = [
    {
      type: 'Job Proposal',
      title: 'Job proposal for unisex has been accepted',
      description: 'You job proposal has been accepted by shiekh solutions for unisex barber',
      actionText: 'Click Here To See more',
      time: '24 feb 2025 at 9:30pm',
    },
    {
      type: 'Message',
      title: 'Shiekh Solutions Has Sent You The Message',
      description: 'Sheikh Solutions Has Sent You The Message',
      actionText: 'Click Here To Reply Him',
      time: '24 feb 2025 at 9:30pm',
    },
    {
      type: 'New Article',
      title: 'New Article Is Published About Hair Style',
      description: 'New Article Is Published By Shiekh Solutions About Hair Style',
      actionText: 'Click Here To See',
      time: '24 feb 2025 at 9:30pm',
    },
  ];

  return (

      <div className="p-6">
        <NotificationList notifications={notifications} />
      </div>

  );
}
