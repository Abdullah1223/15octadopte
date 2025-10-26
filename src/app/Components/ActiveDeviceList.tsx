import { Smartphone } from "lucide-react";

export const ActiveDevicesList = () => {
  const devices = [
    { name: 'iPhone 14 Pro', time: '2025-10-21 11:30 AM', id: 1 },
    { name: 'MacBook Pro', time: '2025-10-21 09:15 AM', id: 2 },
  ];
  return (
    <div className="space-y-2 p-4 pt-0">
      {devices.map((device) => (
        <div key={device.id} className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-gray-400" />
            <span>{device.name}</span>
          </div>
          <span className="text-xs text-gray-500">{device.time}</span>
        </div>
      ))}
    </div>
  );
};
