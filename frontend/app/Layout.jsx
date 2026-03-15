import "../styles/translatia.css";

export const metadata = {
  title: "Translatia · Rs4Machine",
  description: "Technical Article Translator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}