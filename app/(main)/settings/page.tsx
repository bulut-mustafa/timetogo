"use client";
import { useState } from "react";
import ChangePassword from "@/components/settings-page/change-password";
import ChangeName from "@/components/settings-page/change-name";
import DeleteUser from "@/components/settings-page/delete-user";

const settingsOptions = [
  { key: "change-password", label: "Change Password", component: <ChangePassword /> },
  { key: "change-name", label: "Change Name", component: <ChangeName /> },
  { key: "delete-account", label: "Delete Account", component: <DeleteUser /> },
];

export default function Settings() {
  const [selectedSetting, setSelectedSetting] = useState(settingsOptions[0].key);

  return (
    <>
      <div>
        <p className="text-3xl font-semibold p-2 pl-4 border-b border-black" >Account Settings</p>
      </div>
      <div className="flex flex-col md:flex-row h-full">
        
        <div className="border-r border-gray-300 w-full md:w-1/4 p-4">
          {settingsOptions.map((option) => (
            <button
              key={option.key}
              className={`block w-full text-left p-2 rounded-md ${selectedSetting === option.key ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                }`}
              onClick={() => setSelectedSetting(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>

        
        <div className="flex-1 p-4">
          {settingsOptions.find((option) => option.key === selectedSetting)?.component}
        </div>
      </div>
    </>

  );
}
