import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App - 할 일 관리',
  description: 'Next.js와 TypeScript로 만든 강력한 할 일 관리 앱',
  keywords: ['todo', 'task manager', 'productivity', 'next.js', 'typescript'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
