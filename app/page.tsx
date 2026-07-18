import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { HowItWorks } from './sections/HowItWorks'
import { Features } from './sections/Features'
import { CLIExamples } from './sections/CLIExamples'
import { Comparison } from './sections/Comparison'
import { FutureVision } from './sections/FutureVision'
import { OpenSource } from './sections/OpenSource'
import { Testimonials } from './sections/Testimonials'
import { FinalCTA } from './sections/FinalCTA'
import { Footer } from './sections/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <CLIExamples />
      <Comparison />
      <FutureVision />
      <OpenSource />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  )
}
