import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@heroui/react";
import { User as UserInfo } from '@/lib/types';

interface UserDropdownProps {

  user: UserInfo;
  logOut: () => void;
}
export default function UserDropdown(userInfo: UserDropdownProps) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          {userInfo.user.picture ? (
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: `https://timetogo-user-pictures.s3.amazonaws.com/${userInfo.user.picture}`,
              }}
              className="transition-transform"
              name={userInfo.user.name + " " + userInfo.user.lastName}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-gray-400 rounded-full">
              {userInfo.user.name.charAt(0)}{userInfo.user.lastName.charAt(0)}
            </div>
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2" href="/profile">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userInfo.user.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" href="/settings">Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={userInfo.logOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
