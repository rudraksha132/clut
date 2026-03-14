'use client'

import React from 'react'
import { NavPill } from '@/components/nav-pill'
import { CustomCursor } from '@/components/custom-cursor'
import { HookSection } from '@/components/sections/hook-section'
import { ProofSection } from '@/components/sections/proof-section'
import { ProcessSection } from '@/components/sections/process-section'
import { SocialSection } from '@/components/sections/social-section'
import { CloseSection } from '@/components/sections/close-section'
import { useLenis } from '@/hooks/use-lenis'

export default function Home() {
  useLenis()

  return (
    <>
      <CustomCursor />
      <NavPill />
      <main className="w-full bg-base text-ink" style={{ cursor: 'none' }}>
        <HookSection />
        <ProofSection />
        <ProcessSection />
        <SocialSection />
        <CloseSection />
      </main>
    </>
  )
}
