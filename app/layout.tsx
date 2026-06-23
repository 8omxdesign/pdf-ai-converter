export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "sans-serif", padding: "2rem" }}>
        {children}
      </body>
    </html>
  );
}
