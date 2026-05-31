import "./globals.css";

export const metadata = {
  title: "CleTenant",
  description: "Find information about any property in Cleveland",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
