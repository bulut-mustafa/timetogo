import Header from '@/components/main-page/main-header/header';
import {User} from "@heroui/react";
import ClientProviderProfile from '@/components/profile-page/client-provider';
export default function Profile() {

    
    return (
        <>
            <Header />
            <ClientProviderProfile />
        </>
    );
}
