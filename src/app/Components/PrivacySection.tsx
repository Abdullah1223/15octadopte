'use client';

import { useState } from "react";
import { MessageSquare,Eye } from "lucide-react";
import { SettingsOption } from "./SettingOptions";
import { ToggleSwitch } from "./ToggleSwitch";
export const PrivacySection = () => {
  const [canMessage, setCanMessage] = useState('All'); // 'All' or 'Employer'
  const [isPublic, setIsPublic] = useState(true);

  return (
    <>
      <SettingsOption icon={MessageSquare} title="Who Can Message You">
        <select
          value={canMessage}
          onChange={(e) => setCanMessage(e.target.value)}
          className="p-2 text-sm border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500 focus:ring-1 transition duration-150"
        >
          <option value="Employer">Employer</option>
          <option value="All">All</option>
        </select>
      </SettingsOption>
      <SettingsOption icon={Eye} title="Profile Visibility">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{isPublic ? 'Public' : 'Private'}</span>
          <ToggleSwitch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
        </div>
      </SettingsOption>
    </>
  );
};
