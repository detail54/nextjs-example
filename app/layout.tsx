import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import Providers from '@/lib/Providers'
import { PAGE_TITLES } from '@/context/pageTitles'
import './globals.css'

export const metadata: Metadata = {
  title: PAGE_TITLES.HOME,
  description: PAGE_TITLES.HOME,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' data-theme='dark' suppressHydrationWarning>
      <head>
        {/* 테마 깜빡임 방지 - 하이드레이션 전 localStorage에서 테마 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('noto-theme')||'{}');document.documentElement.setAttribute('data-theme',s.state?.theme||'dark')}catch(e){}})()`,
          }}
        />
      </head>
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
