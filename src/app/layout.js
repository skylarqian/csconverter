import "./globals.css";

export const metadata = {
  title: "Converter",
  description: "boop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer>based on UC Berkeley's CS61C reference sheet</footer>
      </body>
    </html>
  );
}