import loginBackground from '@/public/backgrounds/login-background.jpg'; 

export default function LoginBack() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60"
      style={{ backgroundImage: `url(${loginBackground.src})` }} 
    >
      
    </div>
  );
}