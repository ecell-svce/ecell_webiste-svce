"use client"

import React, { useState, useEffect } from 'react'
import { 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert,
  ArrowUpRight,
  Database,
  Users,
  Briefcase,
  Zap,
  Award,
  DollarSign,
  Flame,
  Building2,
  Sparkles,
  Play,
  Pause,
  AlertCircle,
  CheckCircle2,
  Crown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ZERO TO HERO STARTUP SIMULATOR GAME
interface StartupState {
  stage: number // 1: Garage, 2: Incubator, 3: PMF, 4: Series A Scale, 5: IPO / Hero
  stageName: string
  companyName: string
  capital: number
  valuation: number
  users: number
  pmf: number // 0-100%
  monthlyBurn: number
  monthlyRevenue: number
  runway: number // Months
  morale: number // 0-100%
  reputation: number // 0-100%
  team: {
    engineers: number
    marketers: number
    sales: number
  }
  month: number
  isPlaying: boolean
  isGameOver: boolean
  isVictory: boolean
  logs: { text: string; type: 'success' | 'fail' | 'info' | 'warn' }[]
}

const STAGES = [
  { level: 1, name: "Garage & Bootstrap", targetValuation: 5000000, desc: "Building initial MVP with pocket money & late nights." },
  { level: 2, name: "SVCE E-Cell Incubator", targetValuation: 25000000, desc: "Refining prototype, getting first 1,000 users & seed grant." },
  { level: 3, name: "Product-Market Fit", targetValuation: 100000000, desc: "Monetizing users, scaling ops, and proving unit economics." },
  { level: 4, name: "Series A Scaleup", targetValuation: 500000000, desc: "Expanding nationwide, hiring leadership team & VC backing." },
  { level: 5, name: "Unicorn & IPO Exit", targetValuation: 1000000000, desc: "Public market listing / Hero status achieved!" }
]

export default function StartupSimulatorGame() {
  const [state, setState] = useState<StartupState>({
    stage: 1,
    stageName: "Garage & Bootstrap",
    companyName: "Nexus Labs",
    capital: 150000, // ₹1.5L initial
    valuation: 1500000, // ₹15L initial
    users: 50,
    pmf: 15,
    monthlyBurn: 15000,
    monthlyRevenue: 2000,
    runway: 11.5,
    morale: 85,
    reputation: 20,
    team: { engineers: 1, marketers: 0, sales: 0 },
    month: 1,
    isPlaying: false,
    isGameOver: false,
    isVictory: false,
    logs: [{ text: "GAME STARTED. ZERO TO HERO STARTUP ENGINE ONLINE.", type: "info" }]
  })

  const [activeTab, setActiveTab] = useState<'actions' | 'team' | 'pitch' | 'logs'>('actions')

  // Format Currency in INR (K, L, Cr)
  const formatINR = (val: number) => {
    const abs = Math.abs(val)
    if (abs >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`
    if (abs >= 100000) return `₹${(val / 100000).toFixed(1)}L`
    if (abs >= 1000) return `₹${(val / 1000).toFixed(1)}K`
    return `₹${Math.round(val)}`
  }

  const addLog = (text: string, type: 'success' | 'fail' | 'info' | 'warn' = 'info') => {
    setState(prev => ({
      ...prev,
      logs: [{ text: `[M${prev.month}] ${text}`, type }, ...prev.logs].slice(0, 10)
    }))
  }

  // Reset Game
  const resetGame = () => {
    setState({
      stage: 1,
      stageName: "Garage & Bootstrap",
      companyName: "Nexus Labs",
      capital: 150000,
      valuation: 1500000,
      users: 50,
      pmf: 15,
      monthlyBurn: 15000,
      monthlyRevenue: 2000,
      runway: 11.5,
      morale: 85,
      reputation: 20,
      team: { engineers: 1, marketers: 0, sales: 0 },
      month: 1,
      isPlaying: false,
      isGameOver: false,
      isVictory: false,
      logs: [{ text: "SIMULATION RESET. NEW FOUNDER JOURNEY READY.", type: "info" }]
    })
  }

  // Execute Action
  const executeAction = (action: {
    name: string
    cost: number
    pmfGain?: number
    userGain?: number
    repGain?: number
    moraleGain?: number
    risk: number
    minStage?: number
    reqTeam?: string
  }) => {
    if (state.isGameOver || state.isVictory) return
    if (!state.isPlaying) {
      setState(s => ({ ...s, isPlaying: true }))
    }

    if (action.cost > state.capital) {
      addLog(`INSUFFICIENT FUNDS FOR: ${action.name}`, 'warn')
      return
    }

    const successProb = Math.min(0.95, Math.max(0.2, 1 - action.risk + (state.pmf / 200) + (state.morale / 300)))
    const isSuccess = Math.random() < successProb

    if (isSuccess) {
      setState(s => {
        const newCapital = s.capital - action.cost
        const newPmf = Math.min(100, s.pmf + (action.pmfGain || 0))
        const newUsers = s.users + (action.userGain || 0)
        const newRep = Math.min(100, s.reputation + (action.repGain || 0))
        const newMorale = Math.min(100, s.morale + (action.moraleGain || 0))
        const newRev = Math.round(newUsers * (newPmf / 100) * 85)
        const newValuation = Math.round((newRev * 24) + (newUsers * 500) + (newCapital * 1.5))

        // Check Stage Advancement
        let currentStage = s.stage
        if (newValuation >= 500000000 && currentStage < 5) currentStage = 5
        else if (newValuation >= 100000000 && currentStage < 4) currentStage = 4
        else if (newValuation >= 25000000 && currentStage < 3) currentStage = 3
        else if (newValuation >= 5000000 && currentStage < 2) currentStage = 2

        const victory = currentStage >= 5 && newValuation >= 1000000000

        return {
          ...s,
          capital: newCapital,
          pmf: newPmf,
          users: newUsers,
          reputation: newRep,
          morale: newMorale,
          monthlyRevenue: newRev,
          valuation: newValuation,
          stage: currentStage,
          stageName: STAGES[currentStage - 1].name,
          isVictory: victory,
          isPlaying: victory ? false : s.isPlaying
        }
      })
      addLog(`[SUCCESS] ${action.name} executed! Gains applied.`, 'success')
    } else {
      setState(s => ({
        ...s,
        capital: s.capital - action.cost,
        morale: Math.max(10, s.morale - 10)
      }))
      addLog(`[FAILED] ${action.name} hit unexpected bugs/roadblocks! Capital lost.`, 'fail')
    }
  }

  // Hire Team Member
  const hireMember = (type: 'engineers' | 'marketers' | 'sales', monthlySalary: number, hiringCost: number) => {
    if (state.capital < hiringCost) {
      addLog(`Cannot afford hiring fee for ${type}!`, 'warn')
      return
    }

    setState(s => {
      const updatedTeam = { ...s.team, [type]: s.team[type] + 1 }
      const newBurn = s.monthlyBurn + monthlySalary
      const newCapital = s.capital - hiringCost
      return {
        ...s,
        team: updatedTeam,
        capital: newCapital,
        monthlyBurn: newBurn,
        morale: Math.min(100, s.morale + 5)
      }
    })
    addLog(`Hired +1 ${type.toUpperCase()}! Monthly burn updated.`, 'success')
  }

  // Pitch for Investment
  const pitchInvestor = (roundName: string, reqPmf: number, reqUsers: number, fundingAmount: number, valuationBoost: number) => {
    if (state.pmf < reqPmf || state.users < reqUsers) {
      addLog(`Pitch Rejected! Need at least ${reqPmf}% PMF and ${reqUsers} users for ${roundName}.`, 'fail')
      return
    }

    const successProb = 0.75 + (state.reputation / 400)
    if (Math.random() < successProb) {
      setState(s => {
        const newCap = s.capital + fundingAmount
        const newVal = s.valuation + valuationBoost
        return {
          ...s,
          capital: newCap,
          valuation: newVal,
          reputation: Math.min(100, s.reputation + 25),
          morale: 100
        }
      })
      addLog(`[INVESTMENT CLOSED] ${roundName} Secured! +${formatINR(fundingAmount)} Capital Added!`, 'success')
    } else {
      addLog(`Investor passed on ${roundName} this time. Improve traction and retry!`, 'warn')
    }
  }

  // Game Loop (Simulate Months)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (state.isPlaying && !state.isGameOver && !state.isVictory) {
      timer = setInterval(() => {
        setState(s => {
          const nextMonth = s.month + 1
          const monthlyNet = s.monthlyRevenue - s.monthlyBurn
          const newCapital = s.capital + monthlyNet

          // Bankruptcy Check
          if (newCapital <= 0) {
            return {
              ...s,
              capital: 0,
              isPlaying: false,
              isGameOver: true,
              logs: [{ text: "BANKRUPTCY DECLARED. RUNWAY EXHAUSTED.", type: 'fail' }, ...s.logs]
            }
          }

          // User Organic Growth based on PMF and Marketers
          const organicUserGrowth = Math.round((s.users * (s.pmf / 100) * 0.12) + (s.team.marketers * 250) + (s.team.sales * 400))
          const newUsers = s.users + organicUserGrowth
          const newRev = Math.round(newUsers * (s.pmf / 100) * 85)
          const netBurn = Math.max(1, s.monthlyBurn - newRev)
          const newRunway = newCapital / netBurn
          const newValuation = Math.round((newRev * 24) + (newUsers * 500) + (newCapital * 1.5))

          // Random Events (15% chance per month)
          let eventLog: string | null = null
          if (Math.random() < 0.15) {
            const events: Array<{
              msg: string
              cap?: number
              rep?: number
              users?: number
              pmf?: number
              morale?: number
            }> = [
              { msg: "SVCE E-Cell Pitch Winner! +₹1L Grant & PR Boost!", cap: 100000, rep: 15 },
              { msg: "Viral Tech Reel! +1,200 Organic Users!", users: 1200, pmf: 5 },
              { msg: "Server Crash during peak hours! Morale dropped.", morale: -15 },
              { msg: "Industry Mentor Joined Advisory Board! Reputation up!", rep: 20 }
            ]
            const ev = events[Math.floor(Math.random() * events.length)]
            eventLog = ev.msg
          }

          const nextLogs: StartupState['logs'] = eventLog
            ? [{ text: `[EVENT] ${eventLog}`, type: 'info' }, ...s.logs].slice(0, 10) as StartupState['logs']
            : s.logs

          return {
            ...s,
            month: nextMonth,
            capital: newCapital,
            users: newUsers,
            monthlyRevenue: newRev,
            valuation: newValuation,
            runway: newRunway,
            logs: nextLogs
          }
        })
      }, 1500) // 1 month per 1.5s
    }
    return () => clearInterval(timer)
  }, [state.isPlaying, state.isGameOver, state.isVictory])

  const actionList = [
    { name: "Build Core MVP V1.0", cost: 40000, pmfGain: 15, userGain: 200, risk: 0.15 },
    { name: "SVCE Campus Launch Campaign", cost: 25000, userGain: 800, repGain: 10, risk: 0.1 },
    { name: "AI Feature Integration", cost: 120000, pmfGain: 25, userGain: 1500, risk: 0.25 },
    { name: "Performance Marketing Ad Blitz", cost: 200000, userGain: 5000, repGain: 15, risk: 0.3 },
    { name: "Enterprise Security & Infrastructure", cost: 400000, pmfGain: 20, repGain: 25, risk: 0.15 },
    { name: "Pan-India PR & Brand Campaign", cost: 800000, userGain: 15000, repGain: 35, risk: 0.35 }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-4 sm:p-8 md:p-10 shadow-2xl text-white font-sans overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header & Stage Progress */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} /> Stage {state.stage} of 5: {state.stageName}
            </span>
            <span className="text-xs font-bold text-gray-400">Month {state.month}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            {state.companyName} <span className="text-indigo-500 text-lg font-bold">Simulator</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setState(s => ({ ...s, isPlaying: !s.isPlaying }))}
            disabled={state.isGameOver || state.isVictory}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg ${
              state.isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30'
            }`}
          >
            {state.isPlaying ? <><Pause size={14} /> Pause Engine</> : <><Play size={14} /> Run Engine</>}
          </button>
          
          <button
            onClick={resetGame}
            className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
            title="Reset Game"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Hero Victory / Bankruptcy Banner */}
      <AnimatePresence>
        {state.isVictory && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-6 sm:p-8 bg-gradient-to-r from-emerald-900/80 via-indigo-900/80 to-purple-900/80 border-2 border-emerald-400 rounded-3xl text-center space-y-4 shadow-2xl relative z-20">
            <Crown className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">HERO STATUS ACHIEVED! 🎉</h2>
            <p className="text-emerald-300 text-lg font-medium max-w-xl mx-auto">
              Your startup hit a valuation of <span className="font-bold text-white">{formatINR(state.valuation)}</span> with {state.users.toLocaleString()} users! You successfully went public on NSE/BSE!
            </p>
            <button onClick={resetGame} className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all">
              Start Next Venture
            </button>
          </motion.div>
        )}

        {state.isGameOver && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-6 sm:p-8 bg-rose-950/80 border-2 border-rose-500 rounded-3xl text-center space-y-4 shadow-2xl relative z-20">
            <AlertCircle className="w-16 h-16 text-rose-400 mx-auto" />
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">BANKRUPTCY DECLARED</h2>
            <p className="text-rose-300 text-base sm:text-lg font-medium max-w-xl mx-auto">
              Capital ran out at Month {state.month}. The path of a founder is tough, but resilience builds legends!
            </p>
            <button onClick={resetGame} className="px-8 py-4 bg-rose-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-rose-500 transition-all">
              Try Again (Restart)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 relative z-10">
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Liquid Capital</span>
            <DollarSign size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">{formatINR(state.capital)}</div>
          <div className="text-[11px] text-gray-400 font-medium">Runway: {state.runway > 99 ? '∞' : state.runway.toFixed(1)} months</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Valuation</span>
            <TrendingUp size={16} className="text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-400 tabular-nums">{formatINR(state.valuation)}</div>
          <div className="text-[11px] text-gray-400 font-medium">Target: {formatINR(STAGES[state.stage - 1].targetValuation)}</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Monthly MRR</span>
            <Flame size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">+{formatINR(state.monthlyRevenue)}</div>
          <div className="text-[11px] text-rose-400 font-medium">Burn: -{formatINR(state.monthlyBurn)}/mo</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Users & PMF</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">{state.users.toLocaleString()}</div>
          <div className="text-[11px] text-indigo-300 font-medium">PMF Score: {state.pmf}%</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('actions')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'actions' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Growth Actions
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'team' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Hire Team ({state.team.engineers + state.team.marketers + state.team.sales})
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'pitch' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Fundraising Pitch
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            activeTab === 'logs' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Terminal Logs
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'actions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actionList.map((action, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-white text-base uppercase tracking-tight">{action.name}</h3>
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {formatINR(action.cost)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                  {action.pmfGain && <span>+${action.pmfGain}% PMF</span>}
                  {action.userGain && <span>+{action.userGain} Users</span>}
                  {action.repGain && <span>+{action.repGain} Rep</span>}
                </div>
              </div>
              <button
                onClick={() => executeAction(action)}
                disabled={state.capital < action.cost}
                className="w-full py-3 bg-indigo-600/80 hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-indigo-600/80 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Execute Project <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="font-black text-lg text-white uppercase">Software Engineers</h3>
            <p className="text-xs text-gray-400 font-medium">Improves product stability & PMF growth rate.</p>
            <div className="text-sm font-bold text-indigo-400">Current Count: {state.team.engineers}</div>
            <button
              onClick={() => hireMember('engineers', 45000, 30000)}
              className="w-full py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all"
            >
              Hire (+₹45K/mo burn)
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="font-black text-lg text-white uppercase">Growth Marketers</h3>
            <p className="text-xs text-gray-400 font-medium">Boosts organic user acquisition every month.</p>
            <div className="text-sm font-bold text-indigo-400">Current Count: {state.team.marketers}</div>
            <button
              onClick={() => hireMember('marketers', 35000, 20000)}
              className="w-full py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all"
            >
              Hire (+₹35K/mo burn)
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="font-black text-lg text-white uppercase">B2B Sales Leads</h3>
            <p className="text-xs text-gray-400 font-medium">Closes high-ticket clients & accelerates MRR.</p>
            <div className="text-sm font-bold text-indigo-400">Current Count: {state.team.sales}</div>
            <button
              onClick={() => hireMember('sales', 50000, 25000)}
              className="w-full py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all"
            >
              Hire (+₹50K/mo burn)
            </button>
          </div>
        </div>
      )}

      {activeTab === 'pitch' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-black text-lg text-white uppercase">Seed Angel Round</h3>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                +₹25L Capital
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">Requires 25% PMF & 500 active users.</p>
            <button
              onClick={() => pitchInvestor("Seed Angel Round", 25, 500, 2500000, 10000000)}
              className="w-full py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-all"
            >
              Pitch Angel Investors
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-black text-lg text-white uppercase">Series A Institutional VC</h3>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                +₹2.5Cr Capital
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">Requires 50% PMF & 5,000 active users.</p>
            <button
              onClick={() => pitchInvestor("Series A VC Round", 50, 5000, 25000000, 80000000)}
              className="w-full py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all"
            >
              Pitch Series A VCs
            </button>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 space-y-3 max-h-64 overflow-y-auto">
          {state.logs.map((log, index) => (
            <div
              key={index}
              className={`text-xs font-mono p-2.5 rounded-xl border ${
                log.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' :
                log.type === 'fail' ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' :
                log.type === 'warn' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' :
                'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
              }`}
            >
              {log.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
