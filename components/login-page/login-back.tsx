import loginBackground from '@/public/backgrounds/login-background.jpg'; // Import the image

export default function LoginBack() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60"
      style={{ backgroundImage: `url(${loginBackground.src})` }} // Use the imported image path
    >
      {/* Add any other content for your login page here */}
    </div>
  );
}