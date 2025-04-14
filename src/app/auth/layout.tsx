export default function AuthLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[90%] md:w-1/2 xl:w-1/4">{children}</div>
    </div>
  );
}
