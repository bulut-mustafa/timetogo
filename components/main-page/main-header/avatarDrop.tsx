import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@heroui/react";
import {User as UserInfo} from '@/lib/types';

interface UserDropdownProps {

    user: UserInfo;
    loading: boolean;
    logOut: () => void;
  }
export default function UserDropdown(userInfo : UserDropdownProps) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
        <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: userInfo.user.picture,
            }}
            className="transition-transform"
            name={userInfo.user.name + " " + userInfo.user.lastName}
          />

        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2" href="/profile">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userInfo.user.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={userInfo.logOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
