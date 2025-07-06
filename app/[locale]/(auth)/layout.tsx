
export default async function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div className="flex flex-col justify-center items-center">
          <main className="flex-1 w-[350px] sm:w-max">{children}</main>
      </div>
    );
}