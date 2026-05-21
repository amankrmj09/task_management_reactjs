import { useMemo, useState } from "react";

import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

function SettingsTabs({ tabs }) {
  const defaultTabs = useMemo(
    () =>
      tabs || [
        {
          id: "profile",
          label: "Profile",
          content: <ProfileForm />,
        },
        {
          id: "security",
          label: "Security",
          content: <ChangePasswordForm />,
        },
      ],
    [tabs],
  );

  const [activeTab, setActiveTab] = useState(defaultTabs[0]?.id);

  const activeContent =
    defaultTabs.find((tab) => tab.id === activeTab)?.content || null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {defaultTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{activeContent}</div>
    </div>
  );
}

export default SettingsTabs;
