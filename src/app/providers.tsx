// app/providers.tsx
'use client'; // Mark this as a client component

import { ThemeProvider } from '@/src/components/theme-provider'; // Your existing ThemeProvider
import { store } from '@/src/redux/store'; // Adjust the path to your Redux store
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
    </Provider>
  );
}
