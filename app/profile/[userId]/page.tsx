import React from 'react';

const ProfilePage = ({ userId }: { userId: string }) => {
    // Dummy data
    const user = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
        avatar: 'https://via.placeholder.com/150'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Profile Page</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={user.avatar} alt="Avatar" style={{ borderRadius: '50%', marginRight: '20px' }} />
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
            <p>{user.bio}</p>
        </div>
    );
};

export default ProfilePage;