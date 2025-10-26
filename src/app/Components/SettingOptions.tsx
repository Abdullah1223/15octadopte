export const SettingsOption = ({ icon: Icon, title, children }) => (
  <div className="flex justify-between items-center p-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="text-gray-700">{title}</span>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);