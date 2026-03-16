import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import Providers from '@/lib/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'nextjs-example-todo-list',
  description: 'nextjs-example-todo-list',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>
          {children}
          {/* Sonner 토스트 - primary 테마에 맞춰 커스텀 */}
          <Toaster
            position='top-right'
            richColors
            toastOptions={{
              style: {
                '--error-bg': '#fff1f2',
                '--error-border': '#fecdd3',
                '--error-text': '#9f1239',
                '--success-bg': '#ecfdf5',
                '--success-border': '#a7f3d0',
                '--success-text': '#065f46',
              } as React.CSSProperties,
              classNames: {
                title: 'font-semibold text-sm',
                description: 'text-xs',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
