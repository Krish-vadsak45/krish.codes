import React from "react";

// Authentic macOS Sonoma / Sequoia Squircles and Details

export const FinderIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="finder-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4bb2fc" />
        <stop offset="100%" stopColor="#1872df" />
      </linearGradient>
      <linearGradient id="finder-half" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c5e6fe" />
        <stop offset="100%" stopColor="#8cc8fb" />
      </linearGradient>
      <filter id="finder-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#finder-bg)" />
    {/* Left Light Blue Half */}
    <path
      d="M0 22C0 9.85 9.85 0 22 0H50V100H22C9.85 100 0 90.15 0 78V22Z"
      fill="url(#finder-half)"
    />
    {/* Dividing Nose Curve */}
    <path
      d="M50 0C50 32 40 45 40 52C40 60 50 63 50 100"
      stroke="#184b8a"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Eyes */}
    <circle cx="30" cy="40" r="4.5" fill="#184b8a" filter="url(#finder-shadow)" />
    <circle cx="70" cy="40" r="4.5" fill="#184b8a" filter="url(#finder-shadow)" />
    {/* Smile */}
    <path
      d="M24 64C34 78 66 78 76 64"
      stroke="#184b8a"
      strokeWidth="3.5"
      strokeLinecap="round"
      filter="url(#finder-shadow)"
    />
  </svg>
);

export const SafariIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="safari-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d5dbe4" />
      </linearGradient>
      <linearGradient id="compass-outer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#258af9" />
        <stop offset="100%" stopColor="#0b58cf" />
      </linearGradient>
      <linearGradient id="needle-red" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff453a" />
        <stop offset="100%" stopColor="#d71917" />
      </linearGradient>
      <linearGradient id="needle-white" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5f7fa" />
        <stop offset="100%" stopColor="#cdd5df" />
      </linearGradient>
      <filter id="safari-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#safari-bg)" />
    {/* Compass Dial */}
    <circle cx="50" cy="50" r="38" fill="url(#compass-outer)" filter="url(#safari-shadow)" />
    {/* Compass Degree Tick marks */}
    {[...Array(24)].map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="16"
        x2="50"
        y2={i % 3 === 0 ? "21" : "19"}
        stroke={i % 3 === 0 ? "#ffffff" : "rgba(255,255,255,0.4)"}
        strokeWidth={i % 3 === 0 ? "1.8" : "1"}
        strokeLinecap="round"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}
    {/* Compass Needle (rotated 45deg) */}
    <g transform="rotate(45 50 50)" filter="url(#safari-shadow)">
      {/* North / Red Needle */}
      <polygon points="50,18 43,50 50,47" fill="url(#needle-red)" />
      <polygon points="50,18 57,50 50,47" fill="#ff6b62" />
      {/* South / White Needle */}
      <polygon points="50,82 43,50 50,53" fill="url(#needle-white)" />
      <polygon points="50,82 57,50 50,53" fill="#ffffff" />
      {/* Center Pivot */}
      <circle cx="50" cy="50" r="3.5" fill="#ffffff" />
      <circle cx="50" cy="50" r="1.5" fill="#758296" />
    </g>
  </svg>
);

export const TerminalIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="term-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#36383e" />
        <stop offset="100%" stopColor="#1a1b1e" />
      </linearGradient>
      <linearGradient id="term-glare" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#term-bg)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    {/* Screen Glare top */}
    <path d="M0 22C0 9.85 9.85 0 22 0H78C90.15 0 100 9.85 100 22V48L0 28V22Z" fill="url(#term-glare)" />
    {/* Terminal prompt symbol '>_' */}
    <path
      d="M26 35L44 50L26 65"
      stroke="#4ade80"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="48"
      y1="65"
      x2="74"
      y2="65"
      stroke="#ffffff"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gear-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ababaf" />
        <stop offset="100%" stopColor="#6e7075" />
      </linearGradient>
      <linearGradient id="gear-teeth" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#8e9095" />
      </linearGradient>
      <filter id="gear-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#gear-bg)" />
    {/* Centered Cog Wheels */}
    <g transform="translate(50,50)" filter="url(#gear-shadow)">
      {/* 8 Gear Teeth */}
      {[...Array(8)].map((_, i) => (
        <rect
          key={i}
          x="-6.5"
          y="-36"
          width="13"
          height="12"
          rx="2.5"
          fill="url(#gear-teeth)"
          transform={`rotate(${i * 45})`}
        />
      ))}
      <circle r="30" fill="url(#gear-teeth)" />
      <circle r="22" fill="#58595d" />
      <circle r="14" fill="#8e9095" />
      <circle r="8" fill="#3a3a3c" />
    </g>
  </svg>
);

export const NotesIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="notes-paper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f4f5f8" />
      </linearGradient>
      <linearGradient id="notes-header" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffb900" />
        <stop offset="100%" stopColor="#e59d00" />
      </linearGradient>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#notes-paper)" />
    {/* Top Yellow Notepad Header */}
    <path
      d="M0 22C0 9.85 9.85 0 22 0H78C90.15 0 100 9.85 100 22V32H0V22Z"
      fill="url(#notes-header)"
    />
    {/* Stitching dots */}
    <line x1="12" y1="32" x2="88" y2="32" stroke="#d48c00" strokeWidth="1" strokeDasharray="3 3" />
    {/* Ruled lines */}
    <line x1="18" y1="46" x2="82" y2="46" stroke="#e0e2e8" strokeWidth="1.5" />
    <line x1="18" y1="58" x2="82" y2="58" stroke="#e0e2e8" strokeWidth="1.5" />
    <line x1="18" y1="70" x2="82" y2="70" stroke="#e0e2e8" strokeWidth="1.5" />
    <line x1="18" y1="82" x2="60" y2="82" stroke="#e0e2e8" strokeWidth="1.5" />
    {/* Yellow marker accent */}
    <rect x="22" y="52" width="38" height="4" rx="2" fill="#ffd666" opacity="0.6" />
  </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mail-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#25a8fc" />
        <stop offset="100%" stopColor="#086ad8" />
      </linearGradient>
      <linearGradient id="mail-stamp" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <filter id="mail-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#mail-bg)" />
    {/* Envelope White Paper Body */}
    <g filter="url(#mail-shadow)">
      <rect x="18" y="28" width="64" height="44" rx="6" fill="url(#mail-stamp)" />
      {/* Envelope Flap Lines */}
      <path
        d="M18 32L50 56L82 32"
        stroke="#0c5bba"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 68L38 48"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M82 68L62 48"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const GithubMacIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gh-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2c2d30" />
        <stop offset="100%" stopColor="#141416" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#gh-bg)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 20C33.43 20 20 33.43 20 50C20 63.26 28.6 74.48 40.52 78.44C42.02 78.72 42.57 77.79 42.57 77C42.57 76.3 42.54 73.78 42.53 71.18C34.19 72.99 32.43 67.62 32.43 67.62C31.06 64.15 29.09 63.23 29.09 63.23C26.37 61.37 29.3 61.41 29.3 61.41C32.31 61.62 33.89 64.5 33.89 64.5C36.56 69.08 40.9 67.76 42.61 66.99C42.88 65.05 43.66 63.73 44.52 62.98C37.86 62.22 30.86 59.65 30.86 48.16C30.86 44.89 32.03 42.21 33.95 40.11C33.64 39.35 32.61 36.31 34.24 32.2C34.24 32.2 36.75 31.4 42.47 35.28C44.86 34.61 47.41 34.28 49.95 34.27C52.49 34.28 55.04 34.61 57.44 35.28C63.15 31.4 65.65 32.2 65.65 32.2C67.29 36.31 66.26 39.35 65.95 40.11C67.88 42.21 69.03 44.89 69.03 48.16C69.03 59.69 62.01 62.21 55.33 62.95C56.4 63.87 57.36 65.69 57.36 68.48C57.36 72.48 57.32 75.7 57.32 76.68C57.32 77.48 57.86 78.43 59.39 78.13C71.34 74.19 79.97 63.07 79.97 50C79.97 33.43 66.57 20 50 20Z"
      fill="#ffffff"
    />
  </svg>
);

export const LeetCodeMacIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lc-mac-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2c2d30" />
        <stop offset="100%" stopColor="#141416" />
      </linearGradient>
    </defs>
    {/* Base macOS Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#lc-mac-bg)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
    {/* Exact Official LeetCode Brand Vector */}
    <g transform="translate(25.5, 18.5) scale(0.525)">
      {/* 1. Signature LeetCode Orange Lower Bracket */}
      <path
        d="M67.5068339,83.0664138 C70.0005384,80.5763786 74.0371402,80.5828822 76.5228362,83.0809398 C79.0085322,85.5789975 79.00204,89.6226456 76.5083355,92.1126808 L65.4351451,103.169577 C55.2192332,113.370744 38.5604663,113.518673 28.1722578,103.513204 C28.112217,103.455678 23.486583,98.9201326 8.22702585,83.9570195 C-1.92478479,74.0028895 -2.93614945,58.0748736 6.61697549,47.8463644 L24.4286944,28.7745461 C33.9100043,18.6218594 51.3874487,17.5122246 62.2279907,26.2789232 L78.4052912,39.3620235 C81.1448956,41.5776292 81.5728103,45.5984975 79.3610655,48.3428842 C77.1493207,51.0872709 73.1354592,51.5159327 70.3958548,49.300327 L54.2186634,36.2173149 C48.5492813,31.6325105 38.631911,32.2621597 33.7398535,37.5006265 L15.9279056,56.5726899 C11.2772073,61.552182 11.7865613,69.5740156 17.1461283,74.8292186 C28.3515339,85.8169393 36.9874071,94.2846214 36.9973988,94.294225 C42.3981571,99.4959838 51.130862,99.418438 56.43358,94.1233737 L67.5068339,83.0664138 Z"
        fill="#FFA116"
      />
      {/* 2. Middle Horizontal Bar */}
      <path
        d="M40.6069914,72.0014117 C37.086019,72.0014117 34.2317068,69.142117 34.2317068,65.6149982 C34.2317068,62.0878794 37.086019,59.2285847 40.6069914,59.2285847 L87.6247154,59.2285847 C91.1456879,59.2285847 94,62.0878794 94,65.6149982 C94,69.142117 91.1456879,72.0014117 87.6247154,72.0014117 L40.6069914,72.0014117 Z"
        fill="#B3B3B3"
      />
      {/* 3. Upper White Loop */}
      <path
        d="M49.4124315,2.02335002 C51.8178981,-0.552320454 55.852269,-0.686893945 58.4234511,1.72277172 C60.9946333,4.13243738 61.1289722,8.17385083 58.7235056,10.7495213 L15.9282277,56.5728697 C11.2773659,61.551984 11.7867168,69.5737689 17.1459309,74.8291832 L36.9094236,94.2091099 C39.4255514,96.6764051 39.4686234,100.719828 37.0056277,103.240348 C34.5426319,105.760868 30.5062548,105.804016 27.990127,103.33672 L8.22654289,83.9567041 C-1.92467414,74.0021005 -2.93603527,58.0741402 6.61751533,47.846311 L49.4124315,2.02335002 Z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
);

export const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 94 111" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M67.5068339,83.0664138 C70.0005384,80.5763786 74.0371402,80.5828822 76.5228362,83.0809398 C79.0085322,85.5789975 79.00204,89.6226456 76.5083355,92.1126808 L65.4351451,103.169577 C55.2192332,113.370744 38.5604663,113.518673 28.1722578,103.513204 C28.112217,103.455678 23.486583,98.9201326 8.22702585,83.9570195 C-1.92478479,74.0028895 -2.93614945,58.0748736 6.61697549,47.8463644 L24.4286944,28.7745461 C33.9100043,18.6218594 51.3874487,17.5122246 62.2279907,26.2789232 L78.4052912,39.3620235 C81.1448956,41.5776292 81.5728103,45.5984975 79.3610655,48.3428842 C77.1493207,51.0872709 73.1354592,51.5159327 70.3958548,49.300327 L54.2186634,36.2173149 C48.5492813,31.6325105 38.631911,32.2621597 33.7398535,37.5006265 L15.9279056,56.5726899 C11.2772073,61.552182 11.7865613,69.5740156 17.1461283,74.8292186 C28.3515339,85.8169393 36.9874071,94.2846214 36.9973988,94.294225 C42.3981571,99.4959838 51.130862,99.418438 56.43358,94.1233737 L67.5068339,83.0664138 Z"
      fill="#FFA116"
    />
    <path
      d="M40.6069914,72.0014117 C37.086019,72.0014117 34.2317068,69.142117 34.2317068,65.6149982 C34.2317068,62.0878794 37.086019,59.2285847 40.6069914,59.2285847 L87.6247154,59.2285847 C91.1456879,59.2285847 94,62.0878794 94,65.6149982 C94,69.142117 91.1456879,72.0014117 87.6247154,72.0014117 L40.6069914,72.0014117 Z"
      fill="#B3B3B3"
    />
    <path
      d="M49.4124315,2.02335002 C51.8178981,-0.552320454 55.852269,-0.686893945 58.4234511,1.72277172 C60.9946333,4.13243738 61.1289722,8.17385083 58.7235056,10.7495213 L15.9282277,56.5728697 C11.2773659,61.551984 11.7867168,69.5737689 17.1459309,74.8291832 L36.9094236,94.2091099 C39.4255514,96.6764051 39.4686234,100.719828 37.0056277,103.240348 C34.5426319,105.760868 30.5062548,105.804016 27.990127,103.33672 L8.22654289,83.9567041 C-1.92467414,74.0021005 -2.93603527,58.0741402 6.61751533,47.846311 L49.4124315,2.02335002 Z"
      fill="#FFFFFF"
    />
  </svg>
);

