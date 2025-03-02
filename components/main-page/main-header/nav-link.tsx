import Link from "next/link"
// Define the props interface
interface NavLinkProps {
    href: string; // The link's destination
    children: React.ReactNode; // The content inside the link
  }
export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <>
      <Link
        href={href}
        className={`no-underline font-bold px-1 py-2 rounded-md text-sm md:text-normal`}
      >
        {children}
      </Link>
    </>
  );
}