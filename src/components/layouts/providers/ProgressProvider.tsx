'use client'

import { ProgressProvider as AppProgressProvider } from '@bprogress/next/app'

function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppProgressProvider height='3px' color='#0D9394' options={{ showSpinner: false }} shallowRouting>
      {children}
    </AppProgressProvider>
  )
}

export default ProgressProvider
