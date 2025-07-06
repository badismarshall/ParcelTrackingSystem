export default async function AdministratorLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <>
          <main>{children}</main>
      </>
    );
}