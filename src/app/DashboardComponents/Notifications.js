import { useTranslation } from "../Context/TranslationContext.";
import NotificationList from "./NotificationList";

 export default function Notifications() {
          const { translate, setLanguage, language } = useTranslation();
  const notifications = [
    {
      type: translate('job_proposal'),
      title: translate('Job proposal for unisex has been accepted'),
      description: translate('You job proposal has been accepted by shiekh solutions for unisex barber'),
      actionText:translate( 'Click Here To See more'),
      time: '24 feb 2025 at 9:30pm',
    },
    {
      type: 'Message',
      title: translate('Shiekh Solutions Has Sent You The Message'),
      description: translate('Sheikh Solutions Has Sent You The Message_2'),
      actionText: translate('Click Here To Reply Him'),
      time: '24 feb 2025 at 9:30pm',
    },
    {
      type: translate('New Article'),
      title: translate('New Article Is Published About Hair Style'),
      description: translate('New Article Is Published By Shiekh Solutions About Hair Style'),
      actionText: translate('Click Here To See more'),
      time: '24 feb 2025 at 9:30pm',
    },
  ];

  return (

      <div className="p-6">
        <NotificationList notifications={notifications} />
      </div>

  );
}
