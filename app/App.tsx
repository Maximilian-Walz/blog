'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ScrollTop } from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'
import { MatomoProvider } from '@jonkoops/matomo-tracker-react'
import { matomoInstance } from 'matomo.config'
import { KBarSearchProvider } from 'pliny/search/KBar'

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <MatomoProvider value={matomoInstance}>
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between font-sans">
          <KBarSearchProvider kbarConfig={{ searchDocumentsPath: 'search.json' }}>
            <Header />
            <main className="mb-auto">{children}</main>
            <ScrollTop />
          </KBarSearchProvider>
          <Footer />
        </div>
      </SectionContainer>
    </MatomoProvider>
  )
}
