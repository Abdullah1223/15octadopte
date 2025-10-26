'use client'
import React, { useState, useEffect, useCallback } from 'react';
import {
  User, Lock, Shield, 
  ChevronDown, ChevronUp, 
} from 'lucide-react';
import { SecuritySection } from '../../Components/SecuritySection';
import { PrivacySection } from '../../Components/PrivacySection';
import { AccountSection } from '../../Components/AcountSection';


const SettingsSectionHeader = ({ icon: Icon, title, isCollapsible, isExpanded, onToggle }) => (
  <button
    className={`flex justify-between items-center w-full p-4 border-b ${isCollapsible ? 'md:border-b-0' : 'border-b'}`}
    onClick={isCollapsible ? onToggle : undefined}
    disabled={!isCollapsible}
  >
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-orange-500" />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    {isCollapsible && (
      <span className="text-gray-500 md:hidden">
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </span>
    )}
  </button>
);


const SettingsPage = () => {
  const [expandedSection, setExpandedSection] = useState('Account'); // Only one section expanded at a time on mobile

  const sections = [
    { id: 'Account', title: 'Account Settings', icon: User, content: <AccountSection /> },
    { id: 'Privacy', title: 'Privacy Preferences', icon: Lock, content: <PrivacySection /> },
    { id: 'Security', title: 'Security Controls', icon: Shield, content: <SecuritySection /> },
  ];

  const handleToggle = useCallback((sectionId) => {
    setExpandedSection(current => current === sectionId ? null : sectionId);
  }, []);

  // Effect to handle initial desktop state (all expanded) - useful if component mounts on desktop
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop && expandedSection !== null) {
        setExpandedSection(null); // Null will be ignored by the desktop layout logic
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto md:p-8 md:bg-white md:shadow-xl md:rounded-xl">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 md:text-3xl md:mb-8">Settings</h1>

        <div className="space-y-4">
          {sections.map(({ id, title, icon, content }) => {
            const isExpanded = expandedSection === id;
            const isCollapsible = true; // Always true, behavior controlled by CSS media query

            return (
              <div
                key={id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${isExpanded ? 'ring-2 ring-orange-500/50' : ''} md:shadow-none md:ring-0 md:border md:border-gray-200`}
              >
                {/* Section Header (Mobile: Collapsible, Desktop: Always visible/static) */}
                <SettingsSectionHeader
                  icon={icon}
                  title={title}
                  isCollapsible={isCollapsible}
                  isExpanded={isExpanded}
                  onToggle={() => handleToggle(id)}
                />

                {/* Section Content (Mobile: Conditionally shown, Desktop: Always shown) */}
                <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? 'max-h-screen' : 'max-h-0'}
                    md:max-h-full md:border-t md:border-gray-200
                `}>
                    {/* Inner wrapper to apply padding and remove desktop border for the last section */}
                    <div className="md:p-0">
                        {content}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;