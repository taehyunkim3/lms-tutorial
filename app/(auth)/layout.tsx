const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex-col outline-dotted bg-red-50 flex items-center justify-center">
      <p className="text-center w-full outline-dashed fixed top-4">AUTH</p>
      <div className="">{children}</div>
    </div>
  );
};

export default AuthLayout;
