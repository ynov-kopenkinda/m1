import { CenterLoader } from "../components/default/Loader";
import { useNotifications } from "../hooks/notifications/useNotifications";
import type { Notification as NotificationType } from "../hooks/notifications/useNotifications";

export default function NotificationsPage() {
  const [notifications, areNotificationsLoading] = useNotifications();
  if (areNotificationsLoading) {
    return <CenterLoader />;
  }
  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-4 text-4xl font-black">Notifications</h1>
      {(notifications === undefined || notifications.length === 0) && (
        <p className="text-center">No new notifications</p>
      )}
      {notifications?.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

function Notification({ notification }: { notification: NotificationType }) {
  return (
    <div className="rounded-md border p-4">
      <p className="text-sm">{notification.friendship.status}</p>
    </div>
  );
}
