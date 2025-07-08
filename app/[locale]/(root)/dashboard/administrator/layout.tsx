export default async function AdministratorLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <>
          <div>{children}</div>
      </>
    );
}