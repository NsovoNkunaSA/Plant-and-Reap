import { useEffect, useState } from 'react'
import './App.css'

const habitats = [
  { id: 'trees', name: 'Forest trees', detail: 'Tall, steady growth', symbol: '♧' },
  { id: 'flowers', name: 'Wildflowers', detail: 'A little color', symbol: '✿' },
  { id: 'ferns', name: 'Ferns', detail: 'Quietly unfurling', symbol: '❧' },
  { id: 'wildlife', name: 'Woodland life', detail: 'Visitors arrive', symbol: '⌁' },
]
const durations = [25, 45, 60]

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remaining = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remaining}`
}

function Scene({ habitat, growth }) {
  const count = Math.max(1, Math.ceil(growth * 8))
  const positions = [55, 142, 225, 325, 424, 518, 625, 724]

  return (
    <svg className={`landscape landscape-${habitat}`} viewBox="0 0 780 320" role="img" aria-label={`${count} ${habitat === 'wildlife' ? 'woodland visitors' : habitat} growing in your focus scene`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#b4d7d1" />
          <stop offset="100%" stopColor="#e5e9c9" />
        </linearGradient>
        <linearGradient id="meadow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#788e5b" />
          <stop offset="100%" stopColor="#435e45" />
        </linearGradient>
      </defs>
      <rect width="780" height="320" fill="url(#sky)" />
      <circle cx="626" cy="74" r="34" fill="#f2d89a" opacity=".88" />
      <path d="M0 192 Q118 120 248 180 T508 162 T780 174 V320 H0Z" fill="#94a77b" />
      <path d="M0 220 Q154 164 296 216 T570 204 T780 208 V320 H0Z" fill="#718962" />
      <path d="M0 238 Q140 192 286 244 T548 226 T780 238 V320 H0Z" fill="url(#meadow)" />
      <path d="M0 280 Q166 248 338 284 T780 270 V320 H0Z" fill="#3c5943" opacity=".63" />
      <g fill="#f7f1dc" opacity=".58">
        <ellipse cx="130" cy="72" rx="33" ry="10" />
        <ellipse cx="151" cy="68" rx="21" ry="13" />
        <ellipse cx="469" cy="112" rx="28" ry="8" />
        <ellipse cx="486" cy="108" rx="18" ry="11" />
      </g>
      <g className="scene-growth">
        {positions.slice(0, count).map((x, index) => {
          const y = 266 - (index % 2) * 13
          if (habitat === 'flowers') {
            const colors = ['#e8a4a0', '#f0d17f', '#d2a6c4', '#faf0d1']
            return <g key={x} className="growing-element" style={{ animationDelay: `${index * 90}ms` }} transform={`translate(${x} ${y})`}>
              <path d="M0 0 Q-3 -18 1 -31" fill="none" stroke="#e1e6bd" strokeWidth="2.5" />
              <circle cx="1" cy="-34" r="5" fill={colors[index % colors.length]} />
              <circle cx="-5" cy="-34" r="4" fill={colors[index % colors.length]} />
              <circle cx="7" cy="-34" r="4" fill={colors[index % colors.length]} />
              <circle cx="1" cy="-34" r="2" fill="#f5d992" />
              <path d="M0 -15 Q-10 -22 -12 -15 Q-6 -11 0 -12" fill="#a9bb88" />
            </g>
          }
          if (habitat === 'ferns') {
            return <g key={x} className="growing-element" style={{ animationDelay: `${index * 90}ms` }} transform={`translate(${x} ${y})`} fill="none" stroke={index % 2 ? '#c1c78d' : '#9eb782'} strokeWidth="2.5" strokeLinecap="round">
              <path d="M0 0 Q-2 -18 1 -38" />
              <path d="M0 -7 Q-11 -18 -14 -14 M0 -13 Q10 -25 14 -21 M0 -20 Q-9 -29 -12 -27 M1 -27 Q8 -37 12 -33" />
            </g>
          }
          if (habitat === 'wildlife') {
            return <g key={x} className="growing-element" style={{ animationDelay: `${index * 90}ms` }} transform={`translate(${x} ${y - 10})`} fill={index % 2 ? '#d9c7a2' : '#eadfc5'}>
              <ellipse cx="0" cy="-8" rx="13" ry="8" />
              <circle cx="12" cy="-16" r="5" />
              <path d="M-7 -1 v11 M6 -1 v11 M13 -20 l-3 -8 6 6 4 -4 -2 9" stroke="#d9c7a2" strokeWidth="2" fill="none" />
              <circle cx="14" cy="-17" r="1" fill="#354d3c" />
            </g>
          }
          return <g key={x} className="growing-element" style={{ animationDelay: `${index * 90}ms` }} transform={`translate(${x} ${y})`}>
            <path d="M0 0 V-48" stroke="#795f47" strokeWidth="7" />
            <path d="M-21 -23 L0 -72 L21 -23Z" fill={index % 2 ? '#536f50' : '#617d58'} />
            <path d="M-17 -41 L0 -82 L17 -41Z" fill={index % 2 ? '#607d5b' : '#718b63'} />
            <path d="M-12 -57 L0 -90 L12 -57Z" fill="#82946a" />
          </g>
        })}
      </g>
      <g fill="#3b594d" opacity=".78">
        <path d="M92 159 q7 -7 14 0 q7 -7 14 0 q-7 -3 -14 2 q-7 -5 -14 -2Z" />
        <path d="M370 128 q6 -6 12 0 q6 -6 12 0 q-6 -3 -12 2 q-6 -5 -12 -2Z" />
      </g>
    </svg>
  )
}

export default function App() {
  const [selectedHabitat, setSelectedHabitat] = useState('trees')
  const [duration, setDuration] = useState(25)
  const [customDuration, setCustomDuration] = useState('')
  const [remaining, setRemaining] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(3)

  useEffect(() => {
    if (!isRunning) return undefined
    const timeout = window.setTimeout(() => {
      if (remaining <= 1) {
        setRemaining(0)
        setIsRunning(false)
        setSessions((total) => total + 1)
      } else {
        setRemaining(remaining - 1)
      }
    }, 1000)
    return () => window.clearTimeout(timeout)
  }, [isRunning, remaining])

  const totalSeconds = duration * 60
  const progress = Math.min(1, Math.max(0, (totalSeconds - remaining) / totalSeconds))
  const growth = Math.max(0.13, progress)
  const selected = habitats.find((habitat) => habitat.id === selectedHabitat)

  function chooseDuration(minutes) {
    const bounded = Math.min(120, Math.max(1, minutes))
    setDuration(bounded)
    setRemaining(bounded * 60)
    setIsRunning(false)
  }

  function resetTimer() {
    setRemaining(duration * 60)
    setIsRunning(false)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Rooted home">
          <span className="brand-mark" aria-hidden="true">r.</span>
          <span>rooted<span className="brand-period">.</span></span>
        </a>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-item nav-active" href="#focus"><span aria-hidden="true">◷</span> Focus garden</a>
          <a className="nav-item" href="#collection"><span aria-hidden="true">▧</span> My collection</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-icon" aria-hidden="true">✳</div>
          <p className="streak-label">YOUR GROWING STREAK</p>
          <p className="streak-number">4 <span>days</span></p>
          <div className="week-dots" aria-label="Four study days this week">
            <span className="done">M</span><span className="done">T</span><span className="done">W</span><span className="today">T</span><span>F</span><span>S</span><span>S</span>
          </div>
          <div className="sidebar-footer"><span className="avatar">S</span><span>User's garden</span><span className="more">···</span></div>
        </div>
      </aside>

      <section className="workspace" id="focus">
        <header className="topbar">
          <div className="breadcrumb">Your space <span>/</span> <strong>Focus garden</strong></div>
          <div className="topbar-right"><span className="today-date">TUESDAY, NOV 11</span><button className="icon-button" type="button" aria-label="Notifications">♧<i /></button></div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> A QUIETER WAY TO GET THINGS DONE</p>
              <h1>Make room to <em>grow.</em></h1>
              <p className="welcome-copy">Settle in, focus on one thing, and watch your little world take shape.</p>
            </div>
            <div className="sessions-pill"><span className="sessions-spark">✳</span><span><strong>{sessions} sessions</strong><small>grown this week</small></span></div>
          </section>

          <section className="garden-panel" aria-label="Your growing focus scene">
            <div className="garden-heading"><div><span className="garden-kicker">YOUR FOCUS GARDEN</span><h2>{isRunning ? 'A little more, a little further.' : remaining === 0 ? 'Look what you grew.' : 'A fresh start, just for you.'}</h2></div><div className="weather"><span className="weather-sun">☼</span> A good day to grow</div></div>
            <div className="scene-wrap"><Scene habitat={selectedHabitat} growth={growth} /><div className="scene-caption"><span className="caption-dot" /> {selected?.name} <span className="caption-divider">/</span> {Math.round(progress * 100)}% grown</div></div>
            <div className="garden-footer"><span>{remaining === 0 ? 'Session complete. Take a moment to enjoy it.' : isRunning ? 'Your garden is growing while you focus.' : 'Choose what you’d like to grow today.'}</span><span className="growth-meter"><i style={{ width: `${progress * 100}%` }} /></span></div>
          </section>

          <div className="work-grid">
            <section className="setup-panel" aria-labelledby="choose-title">
              <div className="section-heading"><div><p className="eyebrow-small">FIRST, PICK YOUR PATCH</p><h2 id="choose-title">What shall we grow?</h2></div><span className="step-number">01</span></div>
              <div className="habitat-grid">
                {habitats.map((habitat) => (
                  <button className={`habitat-option ${selectedHabitat === habitat.id ? 'habitat-selected' : ''}`} key={habitat.id} type="button" aria-pressed={selectedHabitat === habitat.id} onClick={() => setSelectedHabitat(habitat.id)}>
                    <span className={`habitat-symbol symbol-${habitat.id}`} aria-hidden="true">{habitat.symbol}</span><span className="habitat-text"><strong>{habitat.name}</strong><small>{habitat.detail}</small></span><span className="radio-mark" />
                  </button>
                ))}
              </div>
            </section>

            <section className="timer-panel" aria-labelledby="timer-title">
              <div className="section-heading"><div><p className="eyebrow-small">THEN, FIND YOUR RHYTHM</p><h2 id="timer-title">Time to settle in</h2></div><span className="step-number">02</span></div>
              <div className="duration-options" aria-label="Focus duration">
                {durations.map((minutes) => <button key={minutes} type="button" className={duration === minutes ? 'duration-active' : ''} aria-pressed={duration === minutes} onClick={() => chooseDuration(minutes)}>{minutes}<small>min</small></button>)}
                <label className={`custom-duration ${!durations.includes(duration) ? 'duration-active' : ''}`}><input aria-label="Custom duration in minutes" type="number" min="1" max="120" placeholder="···" value={customDuration} onChange={(event) => { setCustomDuration(event.target.value); if (event.target.value) chooseDuration(Number(event.target.value)) }} /><small>custom</small></label>
              </div>
              <div className="timer-readout" aria-live="polite">{formatTime(remaining)}<span>{remaining === 0 ? 'Beautifully done' : isRunning ? 'Stay with this moment' : 'minutes of focus'}</span></div>
              <div className="timer-actions">
                <button className="start-button" type="button" onClick={() => { if (remaining === 0) { setRemaining(duration * 60); setIsRunning(true) } else { setIsRunning((running) => !running) } }}><span aria-hidden="true">{isRunning ? 'Ⅱ' : '▶'}</span>{remaining === 0 ? 'Grow again' : isRunning ? 'Pause session' : 'Start focusing'}</button>
                <button className="reset-button" type="button" aria-label="Reset timer" title="Reset timer" onClick={resetTimer}>↺</button>
              </div>
            </section>
          </div>
          <footer className="page-footer"><span>One thing at a time is plenty.</span><span>Take a breath <b>·</b> You’re right where you need to be</span></footer>
        </div>
      </section>
    </main>
  )
}