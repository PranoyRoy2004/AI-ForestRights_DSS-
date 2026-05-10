'use client'
import Link from 'next/link'
import { ArrowRight, FileText, MessageSquare, BarChart3, Globe, TreePine, Shield, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-950 overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-stone-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-900/40">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-semibold text-stone-100 text-lg">Vanadhikar</span>
            <span className="text-stone-600 text-sm ml-2">&#2357;&#2344;&#2366;&#2343;&#2367;&#2325;&#2366;&#2352;</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-stone-400 hover:text-stone-200 text-sm transition-colors">Dashboard</Link>
          <Link href="/cases"     className="text-stone-400 hover:text-stone-200 text-sm transition-colors">Cases</Link>
          <Link href="/policy"    className="text-stone-400 hover:text-stone-200 text-sm transition-colors">Policy</Link>
          <Link href="/analytics" className="text-stone-400 hover:text-stone-200 text-sm transition-colors">Analytics</Link>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-900/30"
        >
          Open Platform <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero */}
      <main className="relative z-10">
        <div className="max-w-4xl mx-auto px-8 pt-28 pb-16 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-950/60 border border-green-800/40 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-sm font-medium">
              Forest Rights Act 2006 &middot; AI-Powered Decision Support System
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-stone-50 leading-[1.08] tracking-tight mb-6">
            Every Forest Dweller
            <br />
            <span className="text-green-400">
              Deserves Their Rights
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            An AI-powered platform for tribal communities, forest officers, and advocates
            simplifying FRA 2006 claims, case management, and legal guidance across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-xl shadow-green-900/30"
            >
              Enter Platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/claims"
              className="flex items-center gap-2 border border-stone-700 hover:border-green-700 text-stone-300 hover:text-green-300 px-8 py-4 rounded-xl text-base font-medium transition-all"
            >
              File a Claim
            </Link>
          </div>

          {/* Capability Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {[
              '9 Indian Languages',
              'FRA 2006 Full Coverage',
              'AI Document Analysis',
              'Individual Claims',
              'Community Claims',
              'Habitat Claims',
              'Real-time Case Tracking',
              'Policy Q&A Engine',
            ].map(pill => (
              <span
                key={pill}
                className="text-xs px-3 py-1.5 rounded-full border border-stone-800 bg-stone-900/60 text-stone-500"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-6xl mx-auto px-8 pb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-200 mb-2">Everything You Need</h2>
            <p className="text-stone-600 text-sm">Built specifically for India&apos;s Forest Rights ecosystem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare,
                title: 'AI Legal Chatbot',
                description: 'Ask anything about FRA in your language. Get accurate step-by-step guidance powered by Claude AI across Hindi, Bengali, Odia, Santali and more.',
                badge: 'Multilingual',
                href: '/dashboard',
                color: 'text-green-400',
                bg: 'bg-green-900/30',
                border: 'border-green-900/50',
              },
              {
                icon: FileText,
                title: 'Document Analyzer',
                description: 'Upload claim documents for instant AI analysis. Get completeness scoring, issue detection, missing document alerts, and actionable recommendations.',
                badge: 'AI Powered',
                href: '/claims',
                color: 'text-emerald-400',
                bg: 'bg-emerald-900/30',
                border: 'border-emerald-900/50',
              },
              {
                icon: Shield,
                title: 'Case Manager',
                description: 'Track FRA cases from submission to resolution. Priority flags, officer assignments, deadline tracking, and full case history in one place.',
                badge: 'Real-time',
                href: '/cases',
                color: 'text-green-400',
                bg: 'bg-green-900/30',
                border: 'border-green-900/50',
              },
              {
                icon: Globe,
                title: 'Multilingual Support',
                description: 'The entire platform supports 9 Indian languages breaking barriers between communities, advocates, and forest administration completely.',
                badge: '9 Languages',
                href: '/dashboard',
                color: 'text-emerald-400',
                bg: 'bg-emerald-900/30',
                border: 'border-emerald-900/50',
              },
              {
                icon: BarChart3,
                title: 'Analytics and Insights',
                description: 'Visual dashboards with district-wise breakdowns, approval trends, processing time analysis, and administrative performance metrics.',
                badge: 'Visual',
                href: '/analytics',
                color: 'text-green-400',
                bg: 'bg-green-900/30',
                border: 'border-green-900/50',
              },
              {
                icon: Users,
                title: 'Policy Knowledge Base',
                description: 'Complete FRA 2006 legal reference with AI-powered Q&A. Search any section, rule, amendment, or eligibility criteria instantly.',
                badge: 'FRA 2006',
                href: '/policy',
                color: 'text-emerald-400',
                bg: 'bg-emerald-900/30',
                border: 'border-emerald-900/50',
              },
            ].map(({ icon: Icon, title, description, badge, href, color, bg, border }) => (
              <Link
                key={title}
                href={href}
                className="card-glow group p-6 rounded-2xl border border-stone-800/60 bg-stone-900/40 hover:bg-stone-900/70 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-stone-800/80 text-stone-500 border border-stone-700/40">
                    {badge}
                  </span>
                </div>
                <h3 className="text-stone-100 font-semibold text-base mb-2 group-hover:text-green-300 transition-colors">
                  {title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-800/50 px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-600 text-sm">
            <TreePine className="w-4 h-4 text-green-800" />
            Vanadhikar &middot; Forest Rights Decision Support System
          </div>
          <div className="text-stone-800 text-xs">
            Powered by Claude AI &middot; Built for India&apos;s Forest Communities
          </div>
        </div>
      </main>
    </div>
  )
}