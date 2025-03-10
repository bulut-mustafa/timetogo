import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@heroui/react";
import { authUser } from '@/lib/types';

interface UserDropdownProps {

  user: authUser;
  logOut: () => void;
}
export default function UserDropdown(userInfo: UserDropdownProps) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `https://timetogo-user-pictures.s3.amazonaws.com/${userInfo.user.photoURL}`,
            }}
            className="transition-transform"
            name={userInfo.user.displayName}
          />
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
