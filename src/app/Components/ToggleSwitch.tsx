export const ToggleSwitch = ({ checked, onChange,disabled }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" disabled={disabled} checked={checked} onChange={onChange} className="sr-only peer" />
    <div
      className={`w-11 h-6 rounded-full peer transition-colors duration-300 ${
        checked ? 'bg-orange-500' : 'bg-gray-200'
      } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300`}
    >
      <div
        className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${
          checked ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
    </div>
  </label>
);
