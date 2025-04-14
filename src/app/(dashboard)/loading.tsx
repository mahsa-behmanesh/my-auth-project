type Props = {
  message?: React.ReactNode;
};
export default function Loading({ message = "Loading" }: Readonly<Props>) {
  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center backdrop-blur-lg bg-background/70">
      <div className="flex flex-col items-center space-y-3">
        <div className="relative ">
          <div className="w-full h-full border-2 border-border p-8 rounded-full" />
          <span className="absolute inset-0 border-b-2 border-white p-8 animate-spin rounded-full" />
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}
