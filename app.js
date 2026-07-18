function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useMemo,
  useRef,
  useEffect
} = React;
if (typeof document !== "undefined" && !document.getElementById("tt-responsive-css")) {
  const _s = document.createElement("style");
  _s.id = "tt-responsive-css";
  _s.textContent = ".tt-mob{display:none}@media(max-width:767px){.tt-desk{display:none!important}.tt-mob{display:flex!important}}";
  document.head.appendChild(_s);
}
const {
  createRoot
} = ReactDOM;
const _RC = window.Recharts || {};
const _chartBox = p => React.createElement('div', {
  style: {
    width: '100%',
    height: p && p.height || 260,
    display: 'grid',
    placeItems: 'center',
    color: '#5c6c7a',
    fontFamily: 'sans-serif',
    fontSize: 12,
    border: '1px dashed #26313c',
    borderRadius: 12
  }
}, 'chart preview');
const _pass = p => p && p.children || null;
const ResponsiveContainer = _RC.ResponsiveContainer || (p => React.createElement('div', {
  style: {
    width: '100%',
    height: p && p.height || 260
  }
}, _chartBox(p)));
const AreaChart = _RC.AreaChart || _pass,
  Area = _RC.Area || (() => null),
  LineChart = _RC.LineChart || _pass,
  Line = _RC.Line || (() => null),
  BarChart = _RC.BarChart || _pass,
  Bar = _RC.Bar || (() => null),
  PieChart = _RC.PieChart || _pass,
  Pie = _RC.Pie || (() => null),
  Cell = _RC.Cell || (() => null),
  XAxis = _RC.XAxis || (() => null),
  YAxis = _RC.YAxis || (() => null),
  CartesianGrid = _RC.CartesianGrid || (() => null),
  Tooltip = _RC.Tooltip || (() => null),
  Legend = _RC.Legend || (() => null);
var ICONS = {
  LayoutDashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  UserPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  UserCog: '<circle cx="10" cy="7" r="4"/><path d="M10.3 15H7a4 4 0 0 0-4 4v2"/><circle cx="19" cy="16" r="3"/><path d="M19 11v1"/><path d="M19 20v1"/><path d="m22.7 14.5-.9.5"/><path d="m16.2 17.5-.9.5"/><path d="m22.7 17.5-.9-.5"/><path d="m16.2 14.5-.9-.5"/>',
  TrendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  TrendingDown: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  Activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  Target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  Gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  Wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  Banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  PiggyBank: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/>',
  Receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  FileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  ClipboardList: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  Sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  Bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  Wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  Signal: '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',
  Router: '<rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6.01 18H6"/><path d="M10.01 18H10"/><path d="M15 10v4"/><path d="M17.84 7.17a4 4 0 0 0-5.66 0"/><path d="M20.66 4.34a8 8 0 0 0-11.31 0"/>',
  Network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
  Server: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
  AlertTriangle: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  CheckCircle2: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  Timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  CalendarClock: '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><circle cx="17" cy="16" r="5"/><path d="M17 14v2l1 1"/>',
  MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  Map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  ChevronRight: '<path d="m9 18 6-6-6-6"/>',
  ChevronDown: '<path d="m6 9 6 6 6-6"/>',
  ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  ArrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  ArrowDownRight: '<path d="m7 7 10 10"/><path d="M17 7v10H7"/>',
  Circle: '<circle cx="12" cy="12" r="10"/>',
  PhoneCall: '<path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  Wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>',
  HardHat: '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
  Layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  Lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  Zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  Send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>',
  Upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  Filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  Bug: '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>',
  Tags: '<path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/>',
  Pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>'
};
var _iconCache = {};
function _mkIcon(inner) {
  return function (p) {
    var s = p && p.size || 24;
    return React.createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: s,
      height: s,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: p && p.color || 'currentColor',
      strokeWidth: p && p.strokeWidth || 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: p && p.style,
      dangerouslySetInnerHTML: {
        __html: inner
      }
    });
  };
}
const _iconStub = p => React.createElement('svg', {
  width: p && p.size || 16,
  height: p && p.size || 16,
  viewBox: '0 0 24 24'
});
const L = new Proxy({}, {
  get: function (t, k) {
    if (typeof k !== 'string') return _iconStub;
    if (_iconCache[k]) return _iconCache[k];
    if (ICONS[k]) {
      _iconCache[k] = _mkIcon(ICONS[k]);
      return _iconCache[k];
    }
    return _iconStub;
  }
});
const {
  LayoutDashboard,
  Users,
  TrendingDown,
  TrendingUp,
  CalendarClock,
  Network,
  Wallet,
  Receipt,
  FileText,
  Sparkles,
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  X,
  Wifi,
  AlertTriangle,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Server,
  ChevronRight,
  Circle,
  PhoneCall,
  Banknote,
  ShieldCheck,
  Gauge,
  PiggyBank,
  ClipboardList,
  Wrench,
  Plus,
  UserCog,
  ArrowRight,
  ChevronDown,
  Upload,
  Filter,
  Router,
  Signal,
  UserPlus,
  Map: MapIcon,
  HardHat,
  Layers,
  Lightbulb,
  Timer,
  Bug,
  Tags,
  Pencil
} = L;

/* ------------------------------------------------------------------ */
/*  THEME                                                              */
/* ------------------------------------------------------------------ */
const THEMES = {
  dark: {
    name: "dark",
    canvas: "#0A111E",
    canvasGrad: "radial-gradient(1200px 600px at 78% -10%, rgba(44,201,228,0.10), transparent 60%)",
    surface: "#111C2E",
    surface2: "#0E1728",
    border: "#22314B",
    borderSoft: "#1A2740",
    text: "#E9F0FA",
    textMuted: "#8598B6",
    textFaint: "#5E7192",
    accent: "#2CC9E4",
    accentSoft: "rgba(44,201,228,0.14)",
    accentGlow: "0 0 24px rgba(44,201,228,0.45)",
    good: "#34D399",
    goodSoft: "rgba(52,211,153,0.14)",
    warn: "#FBBF24",
    warnSoft: "rgba(251,191,36,0.14)",
    bad: "#F87171",
    badSoft: "rgba(248,113,113,0.14)",
    violet: "#A78BFA",
    grid: "#1B2942"
  },
  light: {
    name: "light",
    canvas: "#F3F6FB",
    canvasGrad: "radial-gradient(1100px 560px at 80% -12%, rgba(14,151,178,0.10), transparent 60%)",
    surface: "#FFFFFF",
    surface2: "#F7FAFE",
    border: "#E2E9F3",
    borderSoft: "#EDF1F8",
    text: "#0E1B2E",
    textMuted: "#5A6E8C",
    textFaint: "#8497B2",
    accent: "#0E97B2",
    accentSoft: "rgba(14,151,178,0.10)",
    accentGlow: "0 6px 18px rgba(14,151,178,0.20)",
    good: "#12A672",
    goodSoft: "rgba(18,166,114,0.10)",
    warn: "#D8920B",
    warnSoft: "rgba(216,146,11,0.12)",
    bad: "#E0503F",
    badSoft: "rgba(224,80,63,0.10)",
    violet: "#7C5CFB",
    grid: "#E7EDF6"
  }
};

/* ------------------------------------------------------------------ */
/*  MOCK DATA — TIONGTECH Fiber, Talacogon, Agusan del Sur            */
/* ------------------------------------------------------------------ */
const peso = n => "₱" + Math.round(n).toLocaleString("en-PH");
const pesoK = n => n >= 1000 ? "₱" + (n / 1000).toFixed(n >= 100000 ? 0 : 1) + "k" : "₱" + n;

// Zeroed, not seeded. This held 742 active clients, 38 installs, ₱1,043,000 revenue and a 1.26%
// churn rate — demo figures, of which only activeClients and revenue were ever overwritten by live
// data. The rest rendered as fact. Every member is now 0 and the tiles that need a real number
// either count it from the client list or say "—".
let KPI = {
  activeClients: 0,
  newInstalls: 0,
  renewed: 0,
  expired: 0,
  disconnected: 0,
  saved: 0,
  churn: 0,
  revenue: 0,
  collectionRate: 0,
  target: 1000 // a GOAL, not a measurement — the only honest constant here
};

// EMPTY, not seeded. This fed the growth curve on the Owner Dashboard hero — a rise from 612 to
// 742 subscribers and ₱861k to ₱1,043k in revenue that belonged to nobody. The Subscribers screen
// already builds a REAL equivalent (growthReal, app.jsx:3049) from client_snapshots plus payments;
// pointing the hero chart at that is a follow-up, and until then an empty chart that says so beats
// a confident line going up.
const growth = [];
const churnTrend = [{
  m: "Aug",
  churn: 2.1,
  saved: 8
}, {
  m: "Sep",
  churn: 1.9,
  saved: 11
}, {
  m: "Oct",
  churn: 1.7,
  saved: 9
}, {
  m: "Nov",
  churn: 1.5,
  saved: 13
}, {
  m: "Dec",
  churn: 1.4,
  saved: 12
}, {
  m: "Jan",
  churn: 1.3,
  saved: 14
}, {
  m: "Feb",
  churn: 1.26,
  saved: 15
}];
const retentionFunnel = [{
  label: "Beginning active",
  value: 713
}, {
  label: "+ New installs",
  value: 38
}, {
  label: "+ Reconnections",
  value: 6
}, {
  label: "− Permanent disc.",
  value: -9
}, {
  label: "− Expired unpaid",
  value: -6
}, {
  label: "Ending active",
  value: 742
}];

// EMPTY, not seeded. These three held demo figures — a cash-flow curve peaking at ₱1,043k, expense
// categories headed by "Payroll ₱240,000" and "Bandwidth ₱210,000", income led by "Subscriptions
// ₱963,000" — and the loader only replaced them when the live result was NON-EMPTY. So a database
// with no expenses yet did not show an empty chart; it showed somebody else's business, on the
// owner's screen, labelled as theirs. An empty chart is the honest answer to an empty table.
let cashFlow = [];
let expenses = []; // see cashFlow above — seeded demo categories removed

let FIN_KPI = null;
let DASH = null;
let lastPayments = {};
let CLIENT_SNAPSHOTS = [];
let GOALS = [];
let HERO_PIN = ""; // owner-set featured goal id ("" = rotate); shared via server config
let RENEWAL_STAGES = {}; // account_number -> pipeline stage (from server)
const RN_STAGES = [["for_followup", "For Follow-up"], ["followup1", "1st Follow-Up"], ["followup2", "2nd Follow-Up"], ["promised", "Promised to Pay"], ["awaiting", "Awaiting Payment"], ["winback", "Win-Back"], ["modem_removal", "Modem Removal / For Deletion"], ["transferred", "Transferred to Other ISP / For Deletion"]];
const RN_LABEL = Object.fromEntries(RN_STAGES);
const RN_STAGE_COLS = {
  followup1: ["date", "reminder"],
  followup2: ["date", "reminder"],
  promised: ["date", "reminder"],
  awaiting: ["date"],
  winback: ["date", "remarks"],
  modem_removal: ["date", "remarks"],
  transferred: ["date", "remarks"]
};
const RN_DATE_LABEL = {
  followup1: "Next Follow-up",
  followup2: "Next Follow-up",
  promised: "Promise Date",
  awaiting: "Expected Payment",
  winback: "Target Date",
  modem_removal: "Removal Date",
  transferred: "Transfer Date"
};
const RN_COL_LABEL = {
  amount: "Amount Due",
  method: "Payment Method",
  remarks: "Remarks",
  reminder: "Reminder"
};
const RN_METHODS = ["", "GCash", "Cash", "Bank Transfer", "Maya", "Over-the-counter", "Other"];
const RN_NAV = {
  for_followup: "rn_ff",
  followup1: "rn_f1",
  followup2: "rn_f2",
  promised: "rn_promised",
  awaiting: "rn_awaiting",
  winback: "rn_winback",
  modem_removal: "rn_modem",
  transferred: "rn_transfer"
};
function renewalStageOf(c) {
  const acct = c.account_number;
  // A client who has paid for the current cycle has renewed — they leave the pipeline.
  if (typeof clientPaid === "function" && clientPaid(c)) return null;
  const info = acct ? RENEWAL_STAGES[acct] : null;
  if (info && info.stage) return info.stage; // an officer's explicit stage always wins
  // auto-populate: clients whose profile is Expired or Payment Reminder are the ones needing follow-up.
  const prof = (c.active_profile || "").trim().toLowerCase();
  if (prof === "expired" || prof === "payment reminder") return "for_followup";
  return null;
}
function renewalInfoOf(c) {
  const acct = c.account_number;
  return acct && RENEWAL_STAGES[acct] || {};
}
let VERSE = null;
let ME = {
  role: "owner",
  name: ""
};
let USERS = [];
let POSITIONS = ["Owner", "CFO", "Admin", "Admin Officer", "Payroll Officer", "Technician"];
let EXPENSE_CATS = []; // owner-managed supplier/category options for the expense form
let PAYROLL = [];
let PR = {
  employees: [],
  periods: [],
  items: [],
  users: [],
  plans: [],
  schedules: [],
  leaveTypes: [],
  isOfficer: false,
  myEmployeeId: null,
  notif: {
    total: 0
  }
};
async function loadPayrollData() {
  try {
    const d = await API("payroll_data");
    if (d && d.ok) {
      PR = {
        employees: d.employees || [],
        periods: d.periods || [],
        items: d.items || [],
        users: d.users || [],
        plans: d.plans || [],
        schedules: d.schedules || [],
        leaveTypes: d.leaveTypes || [],
        isOfficer: !!d.isOfficer,
        myEmployeeId: d.myEmployeeId || null,
        notif: d.notif || {
          total: 0
        }
      };
      return true;
    }
  } catch (e) {}
  return false;
}
const ROLE_EDIT = {
  owner: ["*"],
  admin: ["edit_pon", "edit_goals"],
  cfo: ["fin_income", "fin_expense"],
  admin_officer: ["fin_expense"],
  payroll: ["payroll"],
  technician: ["job_solution"]
};
const PERM_MENU = {
  edit_clients: ["clients", "pesowifi"],
  fin_income: ["income"],
  fin_expense: ["expenses"],
  edit_pon: ["nap"],
  payroll: ["payroll", "loans", "collections"],
  job_solution: ["jobs"],
  edit_goals: ["faithgoals"],
  jobtypes: ["jobtypes"],
  issues: ["issues"],
  solutions: ["solutions"],
  techs: ["techs"],
  sla: ["sla"]
};
const ROLE_VIEWS = {
  owner: "*",
  admin: "*",
  cfo: ["owner", "fin", "income", "expenses", "reports"],
  admin_officer: ["income", "expenses"],
  payroll: ["payroll", "loans", "collections"],
  technician: ["jobs", "joboverview", "salary"]
};
function _hasPerms() {
  const av = ME.allowed_views;
  return !!av && typeof av === "object" && !Array.isArray(av) && Object.keys(av).length > 0;
}
function _cap(id) {
  const av = ME.allowed_views;
  return _hasPerms() && av[id] ? av[id] : null;
} // {a,e,d} or null
function _permHas(p, cap) {
  return (PERM_MENU[p] || []).some(m => {
    const c = _cap(m);
    return !!(c && c[cap]);
  });
}
function canView(id) {
  if (id === "salary" && ME.pr_employee_id) return true;
  if (typeof id === "string" && id.slice(0, 3) === "rn_") id = "renew"; // pipeline stages inherit Renewals access
  if (id === "owner") {
    // Owner Dashboard
    if (ME.role === "owner") return true; // the real owner always sees it
    return _hasPerms() ? "owner" in ME.allowed_views : false; // everyone else (incl. admins) only if granted in Settings
  }
  if (ME.role === "owner") return true;
  if (_hasPerms()) return id in ME.allowed_views;
  const v = ROLE_VIEWS[ME.role];
  if (v === "*") return true;
  return (v || []).includes(id);
}
function canAdd(p) {
  if (ME.role === "owner") return true;
  if (_hasPerms()) return _permHas(p, "a");
  const e = ROLE_EDIT[ME.role] || [];
  return e.includes("*") || e.includes(p);
}
function can(p) {
  if (ME.role === "owner") return true;
  if (_hasPerms()) return _permHas(p, "e");
  const e = ROLE_EDIT[ME.role] || [];
  return e.includes("*") || e.includes(p);
}
function canDel(p) {
  if (ME.role === "owner") return true;
  if (_hasPerms()) return _permHas(p, "d");
  const e = ROLE_EDIT[ME.role] || [];
  return e.includes("*") || e.includes(p);
}
// menu groups shown in the per-user access picker (Settings → edit user)
const ACCESS_MENUS = [{
  label: "Owner Dashboard",
  items: [["owner", "Dashboard"]]
}, {
  label: "Subscribers",
  items: [["subs", "Overview"], ["clients", "Clients"], ["pesowifi", "PESOWiFi"]]
}, {
  label: "Churn & Retention",
  items: [["churn", "Churn & Retention"]]
}, {
  label: "Renewals",
  items: [["renew", "Overview"], ["rn_ff", "For Follow-up"], ["rn_f1", "1st Follow-Up"], ["rn_f2", "2nd Follow-Up"], ["rn_promised", "Promised to Pay"], ["rn_awaiting", "Awaiting Payment"], ["rn_winback", "Win-Back"], ["rn_modem", "Modem Removal / For Deletion"], ["rn_transfer", "Transferred to Other ISP / For Deletion"]]
}, {
  label: "Job Order",
  items: [["jobs", "Board"], ["joboverview", "Overview"], ["techs", "Technicians"], ["jobtypes", "Job Types"], ["issues", "Issues"], ["solutions", "Solutions"], ["sla", "SLA Rules"]]
}, {
  label: "Map Coverage",
  items: [["coverage", "Map Coverage"]]
}, {
  label: "PON Management",
  items: [["nap", "OLT & NAP"]]
}, {
  label: "Financials",
  items: [["fin", "Overview"], ["income", "Income"], ["expenses", "Expenses"], ["reports", "Reports"]]
}, {
  label: "Faith Goals",
  items: [["faithgoals", "Faith Goals"]]
}, {
  label: "Payroll",
  items: [["payroll", "Payroll"], ["loans", "Loan Management"], ["collections", "Collection Cards"]]
}, {
  label: "Salary",
  items: [["salary", "Own payslip"]]
}, {
  label: "AI Assistant",
  items: [["ai", "AI Assistant"]]
}];
const ALL_MENU_IDS = ACCESS_MENUS.flatMap(g => g.items.map(it => it[0]));
let FIN_RECENT = [];
let FIN_MONTH = null;
let FIN_ALL = null;
let FIN_YEAR = null;
let FIN_MONTHS = [];
let FIN_PAYMENTS = [];
let income = []; // see cashFlow above — seeded demo sources removed

const barangayProfit = [{
  area: "Anabu",
  subs: 168,
  margin: 41
}, {
  area: "Malagasang",
  subs: 142,
  margin: 38
}, {
  area: "Bucandala",
  subs: 121,
  margin: 36
}, {
  area: "Bayan Luma",
  subs: 98,
  margin: 33
}, {
  area: "Alapan",
  subs: 121,
  margin: 29
}, {
  area: "Talacogon",
  subs: 92,
  margin: 24
}];
const renewals = [{
  name: "Marites Villanueva",
  plan: "Fiber 100",
  amt: 1699,
  due: "Today",
  pay: "Unpaid",
  tech: "Jomar R.",
  cs: "Aira",
  risk: "high"
}, {
  name: "Rico dela Cruz",
  plan: "Fiber 50",
  amt: 1299,
  due: "Today",
  pay: "Paid",
  tech: "Kevin S.",
  cs: "Aira",
  risk: "low"
}, {
  name: "Divisoria Eatery",
  plan: "Biz 200",
  amt: 2999,
  due: "Today",
  pay: "Partial",
  tech: "Jomar R.",
  cs: "Nico",
  risk: "med"
}, {
  name: "Angelo Bautista",
  plan: "Fiber 25",
  amt: 999,
  due: "Tomorrow",
  pay: "Unpaid",
  tech: "Kevin S.",
  cs: "Nico",
  risk: "med"
}, {
  name: "Grace Mendoza",
  plan: "Fiber 100",
  amt: 1699,
  due: "In 3 days",
  pay: "Unpaid",
  tech: "Paulo T.",
  cs: "Aira",
  risk: "low"
}, {
  name: "Sari-Sari ni Aling Nena",
  plan: "Fiber 50",
  amt: 1299,
  due: "This week",
  pay: "Unpaid",
  tech: "Paulo T.",
  cs: "Nico",
  risk: "high"
}, {
  name: "JR Computer Shop",
  plan: "Biz 200",
  amt: 2999,
  due: "This week",
  pay: "Paid",
  tech: "Jomar R.",
  cs: "Aira",
  risk: "low"
}, {
  name: "Liza Fernandez",
  plan: "Fiber 25",
  amt: 999,
  due: "Overdue 2d",
  pay: "Unpaid",
  tech: "Kevin S.",
  cs: "Nico",
  risk: "high"
}];
const naps = [{
  id: "NAP-A12",
  olt: "OLT-01 Anabu",
  pon: "PON 1/3",
  cap: 16,
  used: 15,
  area: "Anabu"
}, {
  id: "NAP-A18",
  olt: "OLT-01 Anabu",
  pon: "PON 1/5",
  cap: 16,
  used: 11,
  area: "Anabu"
}, {
  id: "NAP-M04",
  olt: "OLT-02 Malagasang",
  pon: "PON 2/1",
  cap: 8,
  used: 8,
  area: "Malagasang"
}, {
  id: "NAP-M09",
  olt: "OLT-02 Malagasang",
  pon: "PON 2/4",
  cap: 16,
  used: 9,
  area: "Malagasang"
}, {
  id: "NAP-B02",
  olt: "OLT-03 Bucandala",
  pon: "PON 3/2",
  cap: 16,
  used: 13,
  area: "Bucandala"
}, {
  id: "NAP-L07",
  olt: "OLT-03 Bucandala",
  pon: "PON 3/6",
  cap: 8,
  used: 4,
  area: "Bayan Luma"
}, {
  id: "NAP-P01",
  olt: "OLT-04",
  pon: "PON 4/1",
  cap: 16,
  used: 14,
  area: "Talacogon"
}, {
  id: "NAP-P05",
  olt: "OLT-04",
  pon: "PON 4/3",
  cap: 8,
  used: 2,
  area: "Talacogon"
}];

/* ---- Real Dispatch Console catalogs (from your index.html) ---- */
const NO_TECH = "No Available Technician";
let CFG_JOBTYPES = ["Client Repair", "Follow-up", "INSTALL", "Mainline Repair", "PESOWiFi Repair"];
let CFG_ISSUES = ["Disconnected Clients", "Custom J.O", "New Client", "Red Modem", "Installation", "Weak Wi-Fi Signal", "No Power", "No Internet Connection", "SSID Missing", "Unstable Connection"];
let CFG_SOLUTIONS = ["Completed New Installation", "Escalated Mainline Repair", "Gidoot ang FIC", "Gitarong mga Saksakan", "Replace FIC Connector", "Replace Power Supply", "Replaced Modem", "Restart Modem", "Rewire/Fusion"];
let CFG_SLA = {
  standard: 24,
  warningLead: 3,
  followup: 72,
  followupWarnAt: 48
};
const AREAS = ["SL Balit", "Talacogon", "Poblacion", "San Isidro", "San Roque"];
const PLANS = ["25MBPS-ISP1", "50MBPS-ISP1", "100MBPS-ISP1", "200MBPS-BIZ"];
const OLT_STANDARDS = ["IEEE 802.3ah (EPON)", "ITU-T G.984 (GPON)", "ITU-T G.9807 (XGS-PON)"];
let techAccounts = [{
  name: "Ranel Dela Cruz",
  contact: "0917 555 2043",
  username: "ranel"
}, {
  name: "Kevin Santos",
  contact: "0918 221 7788",
  username: "kevin"
}, {
  name: "Paulo Tan",
  contact: "0999 114 2050",
  username: "paulo"
}];
const JO_STATUSES = [{
  id: "Pending",
  label: "Pending",
  tone: "accent"
}, {
  id: "In Progress",
  label: "In Progress",
  tone: "warn"
}, {
  id: "Completed",
  label: "Completed",
  tone: "good"
}];
let JO_TYPES = CFG_JOBTYPES;
let JO_TECHS = [NO_TECH, ...techAccounts.map(a => (a.name || "").trim())];
let seedOrders = [{
  id: "133210",
  client: "Marites Villanueva",
  type: "INSTALL",
  tech: NO_TECH,
  issue: "New Client",
  startDate: "2026-02-28",
  startTime: "09:00",
  finishDate: "",
  resHrs: null,
  status: "Pending",
  sla: "WARNING",
  solution: ""
}, {
  id: "133209",
  client: "Jinky Cabahug",
  type: "Client Repair",
  tech: "Kevin",
  issue: "No Internet Connection",
  startDate: "2026-02-28",
  startTime: "10:30",
  finishDate: "",
  resHrs: null,
  status: "Pending",
  sla: "OK",
  solution: ""
}, {
  id: "133208",
  client: "Rico Dela Cruz",
  type: "Mainline Repair",
  tech: "Paulo",
  issue: "Disconnected Clients",
  startDate: "2026-02-28",
  startTime: "08:15",
  finishDate: "",
  resHrs: null,
  status: "In Progress",
  sla: "WARNING",
  solution: ""
}, {
  id: "133207",
  client: "JR Computer Shop",
  type: "Client Repair",
  tech: "Ranel",
  issue: "Weak Wi-Fi Signal",
  startDate: "2026-02-27",
  startTime: "14:00",
  finishDate: "",
  resHrs: null,
  status: "In Progress",
  sla: "OK",
  solution: ""
}, {
  id: "133206",
  client: "Plaza Vendo",
  type: "PESOWiFi Repair",
  tech: "Kevin",
  issue: "No Power",
  startDate: "2026-02-27",
  startTime: "11:20",
  finishDate: "",
  resHrs: null,
  status: "In Progress",
  sla: "OK",
  solution: ""
}, {
  id: "133205",
  client: "Cely Bakeshop",
  type: "INSTALL",
  tech: "Ranel",
  issue: "Installation",
  startDate: "2026-02-25",
  startTime: "09:00",
  finishDate: "2026-02-25",
  resHrs: 6,
  status: "Completed",
  sla: "PASSED",
  solution: "Completed new installation"
}, {
  id: "133204",
  client: "Rico Dela Cruz",
  type: "Client Repair",
  tech: "Paulo",
  issue: "Red Modem",
  startDate: "2026-02-24",
  startTime: "13:00",
  finishDate: "2026-02-24",
  resHrs: 4,
  status: "Completed",
  sla: "PASSED",
  solution: "Replaced faulty ONU"
}, {
  id: "133203",
  client: "Jinky Cabahug",
  type: "Follow-up",
  tech: "Kevin",
  issue: "Unstable Connection",
  startDate: "2026-02-22",
  startTime: "15:30",
  finishDate: "2026-02-25",
  resHrs: 78,
  status: "Completed",
  sla: "FAILED",
  solution: "Rerouted fiber cable"
}];

/* clients: real field shape */
let clients = [{
  first_name: "Jinky",
  last_name: "Cabahug",
  account_number: "208111523",
  area: "SL Balit",
  address: "Purok 3, Balit, Talacogon",
  phone: "0917 111 2233",
  email: "jinky@example.com",
  profile: "50MBPS-ISP1",
  mrc: 1699,
  subscription_date: "2025-11-04",
  coordinates: "8.4521, 125.7899",
  olt: "TALACOGON VSOL",
  nap: "B-NAP4",
  napPort: "3",
  notes: ""
}, {
  first_name: "Rico",
  last_name: "Dela Cruz",
  account_number: "208111498",
  area: "Poblacion",
  address: "Rizal St, Poblacion",
  phone: "0918 445 9087",
  email: "",
  profile: "100MBPS-ISP1",
  mrc: 1999,
  subscription_date: "2025-09-18",
  coordinates: "8.4560, 125.7820",
  olt: "TALACOGON VSOL",
  nap: "P-NAP1",
  napPort: "6",
  notes: ""
}, {
  first_name: "Marites",
  last_name: "Villanueva",
  account_number: "208111544",
  area: "San Isidro",
  address: "San Isidro proper",
  phone: "0999 233 1120",
  email: "",
  profile: "25MBPS-ISP1",
  mrc: 1299,
  subscription_date: "2026-01-06",
  coordinates: "8.4490, 125.7955",
  olt: "SAN ISIDRO HW",
  nap: "SI-NAP2",
  napPort: "1",
  notes: "New client"
}, {
  first_name: "JR",
  last_name: "Computer Shop",
  account_number: "208111310",
  area: "Poblacion",
  address: "Market Rd, Poblacion",
  phone: "0917 900 3321",
  email: "jrshop@example.com",
  profile: "200MBPS-BIZ",
  mrc: 2999,
  subscription_date: "2025-06-22",
  coordinates: "8.4571, 125.7811",
  olt: "TALACOGON VSOL",
  nap: "P-NAP1",
  napPort: "2",
  notes: "Business account"
}, {
  first_name: "Cely",
  last_name: "Bakeshop",
  account_number: "208111277",
  area: "San Roque",
  address: "San Roque proper",
  phone: "0906 778 1123",
  email: "",
  profile: "50MBPS-ISP1",
  mrc: 1699,
  subscription_date: "2025-08-30",
  coordinates: "8.4448, 125.7742",
  olt: "SAN ISIDRO HW",
  nap: "SR-NAP1",
  napPort: "4",
  notes: ""
}];
const SAMPLE_CSV = `first_name,last_name,account_number,area,address,phone,email,profile,mrc,subscription_date,coordinates
Juan,Dela Cruz,208112001,SL Balit,"Purok 1, Balit",0917 222 3344,juan@example.com,50MBPS-ISP1,1699,2026-02-01,"8.4525, 125.7901"
Maria,Santos,208112002,Poblacion,"Rizal St",0918 333 4455,,100MBPS-ISP1,1999,2026-02-03,"8.4558, 125.7818"
Pedro,Reyes,208112003,San Isidro,"San Isidro proper",0999 444 5566,,25MBPS-ISP1,1299,2026-02-05,"8.4492, 125.7950"`;

/* PESOWiFi vendo units: real field shape */
let pisos = [{
  name: "Sari-Sari Store Vendo",
  vlan_number: "105",
  area: "SL Balit",
  address: "Purok 3, Balit",
  phone: "0917 555 0001",
  email: "",
  date_installed: "2025-10-12",
  coordinates: "8.4522, 125.7898",
  olt: "TALACOGON VSOL",
  nap: "B-NAP4",
  napPort: "7"
}, {
  name: "Terminal Vendo",
  vlan_number: "112",
  area: "Poblacion",
  address: "Talacogon Terminal",
  phone: "0918 555 0002",
  email: "",
  date_installed: "2025-11-20",
  coordinates: "8.4565, 125.7825",
  olt: "TALACOGON VSOL",
  nap: "P-NAP1",
  napPort: "5"
}, {
  name: "Plaza Vendo",
  vlan_number: "118",
  area: "San Isidro",
  address: "San Isidro Plaza",
  phone: "0999 555 0003",
  email: "",
  date_installed: "2026-01-15",
  coordinates: "8.4488, 125.7958",
  olt: "SAN ISIDRO HW",
  nap: "SI-NAP2",
  napPort: "2"
}, {
  name: "Highschool Gate Vendo",
  vlan_number: "121",
  area: "San Roque",
  address: "NHS Gate, San Roque",
  phone: "0906 555 0004",
  email: "",
  date_installed: "2025-12-02",
  coordinates: "8.4450, 125.7740",
  olt: "SAN ISIDRO HW",
  nap: "SR-NAP1",
  napPort: "3"
}];

/* PON hierarchy: OLT -> PON ports -> NAP -> NAP ports */
let olts = [{
  name: "TALACOGON VSOL",
  standard: "IEEE 802.3ah (EPON)",
  total_pon_ports: 16,
  description: "VLAN 250",
  areas_served: "SL Balit, Poblacion, San Roque"
}, {
  name: "SAN ISIDRO HW",
  standard: "ITU-T G.984 (GPON)",
  total_pon_ports: 8,
  description: "VLAN 260",
  areas_served: "San Isidro, San Roque"
}];
let napDevices = [{
  name: "B-NAP4",
  olt: "TALACOGON VSOL",
  pon: "PON 3",
  total_ports: 8,
  used: 6,
  coordinates: "8.4522, 125.7898",
  description: "Front of Elem. School"
}, {
  name: "P-NAP1",
  olt: "TALACOGON VSOL",
  pon: "PON 5",
  total_ports: 8,
  used: 8,
  coordinates: "8.4565, 125.7825",
  description: "Talacogon Terminal"
}, {
  name: "SI-NAP2",
  olt: "SAN ISIDRO HW",
  pon: "PON 1",
  total_ports: 8,
  used: 4,
  coordinates: "8.4488, 125.7958",
  description: "San Isidro Plaza"
}, {
  name: "SR-NAP1",
  olt: "SAN ISIDRO HW",
  pon: "PON 2",
  total_ports: 16,
  used: 5,
  coordinates: "8.4450, 125.7740",
  description: "San Roque proper"
}];
// The physical nap_port rows { id, nap_device_id, port_number }. The bootstrap already
// loaded these to count ports per device and then dropped them; they're kept now because
// they are the only place the clients.nap_port_id FK can be looked up — see _napPortId().
let napPorts = [];

/* ------------------------------------------------------------------ */
/*  LIVE DATA  —  loads real records from api.php (bootstrap).         */
/*  If the API isn't reachable (e.g. local preview), the sample data   */
/*  above is kept so the app still renders.                           */
/* ------------------------------------------------------------------ */
// ============================================================
//  SUPABASE ADAPTER
//  When the page provides window.SB (see supa.php), the app talks to
//  Supabase. On the normal index.php there is no window.SB, so the app
//  uses api.php exactly as before — the live site is unchanged.
// ============================================================
async function _supaAll(sb, table, cols) {
  let rows = [],
    from = 0;
  const step = 1000;
  for (;;) {
    const {
      data,
      error
    } = await sb.from(table).select(cols).range(from, from + step - 1);
    if (error) throw new Error(table + ": " + error.message);
    rows = rows.concat(data || []);
    if (!data || data.length < step) break;
    from += step;
  }
  return rows;
}
async function _supaBootstrap() {
  const sb = window.SB;
  const out = {
    ok: true
  };
  // who am I
  const {
    data: authData
  } = await sb.auth.getUser();
  const uid = authData && authData.user ? authData.user.id : null;
  let me = null;
  if (uid) {
    const {
      data
    } = await sb.from("erp_users").select("id,username,full_name,role,position,allowed_views").eq("auth_uid", uid).single();
    me = data;
  }
  let allowed = null;
  if (me && me.allowed_views) {
    try {
      allowed = typeof me.allowed_views === "string" ? JSON.parse(me.allowed_views) : me.allowed_views;
    } catch (e) {
      allowed = null;
    }
  }
  let prId = null;
  if (me) {
    const {
      data: pe
    } = await sb.from("pr_employees").select("id").eq("user_id", me.id).eq("active", 1).limit(1);
    if (pe && pe.length) prId = pe[0].id;
  }
  out.me = me ? {
    role: me.role,
    name: me.full_name,
    uid: me.id,
    position: me.position,
    allowed_views: allowed,
    pr_employee_id: prId
  } : {
    role: "admin",
    name: "",
    uid: null,
    position: null,
    allowed_views: null,
    pr_employee_id: null
  };
  // core datasets
  out.clients = await _supaAll(sb, "clients", "id,account_number,first_name,last_name,address,coordinates,area,phone,email,subscription_date,profile,mrc,balance,port,nap,url_link,notes,renewal_note,nap_port_id,bill_date,due_date,billing_status,active_profile,pppoe_username,pppoe_password");
  out.vendos = await _supaAll(sb, "vendos", "id,vlan_number,name,address,coordinates,area,phone,email,date_installed,port,nap,url_link,notes,nap_port_id");
  out.olts = await _supaAll(sb, "olt", "id,name,description,standard,total_pon_ports,areas_served");
  out.ponPorts = await _supaAll(sb, "pon_port", "id,olt_id,port_number");
  out.napDevices = await _supaAll(sb, "nap_device", "id,pon_port_id,name,nap_number,total_ports,coordinates,description");
  out.napPorts = await _supaAll(sb, "nap_port", "id,nap_device_id,port_number");
  out.goals = await _supaAll(sb, "goals", "id,title,category,target,current,unit,target_date,notes,done");
  out.clientSnapshots = await _supaAll(sb, "client_snapshots", "snap_date,active,registered,pesowifi");
  out.techAccounts = await _supaAll(sb, "tech_accounts", "name,contact,username");
  out.users = await _supaAll(sb, "erp_users", "id,username,full_name,role,position,allowed_views");
  out.jobs = await _supaAll(sb, "job_orders", "jo_id,customer,job_type,tech,issue,solution,start_date,start_time,finish_date,finish_time,status,resolution_hours,sla24,sla48,warning,followup");
  // renewal stages keyed by account
  const rs = await _supaAll(sb, "renewal_stages", "account_number,stage,next_date,remarks,promise_date,amount_due,payment_method");
  out.renewalStages = {};
  rs.forEach(r => {
    out.renewalStages[r.account_number] = {
      stage: r.stage,
      next_date: r.next_date,
      remarks: r.remarks,
      promise_date: r.promise_date,
      amount_due: r.amount_due,
      payment_method: r.payment_method
    };
  });
  // last payment per account (from the view)
  const lp = await _supaAll(sb, "client_last_paid", "account,last_paid");
  out.lastPayments = {};
  lp.forEach(r => {
    if (r.last_paid) out.lastPayments[r.account] = String(r.last_paid).slice(0, 10);
  });
  // config (app_config key/value)
  const cfgRows = await _supaAll(sb, "app_config", "config_key,config_value");
  const cfg = {};
  cfgRows.forEach(r => {
    cfg[r.config_key] = r.config_value;
  });
  const J = (k, def) => {
    try {
      return JSON.parse(cfg[k]);
    } catch (e) {
      return def;
    }
  };
  out.positions = J("positions", []);
  out.expenseCats = J("expense_cats", []);
  out.jobTypes = J("job_types", []);
  out.issues = J("issues", []);
  out.solutions = J("solutions", []);
  out.sla = J("sla", {});
  out.verse = J("dashboard_verse", {
    text: "",
    ref: ""
  });
  out.heroPin = cfg["hero_goal_pin"] || "";
  // technicians (full names where position = Technician)
  const names = new Set();
  out.users.forEach(u => {
    if ((u.position || "") === "Technician" && u.full_name) names.add(u.full_name);
  });
  const {
    data: prTechs
  } = await sb.from("pr_employees").select("full_name").eq("position", "Technician").eq("active", 1);
  (prTechs || []).forEach(r => {
    if (r.full_name) names.add(r.full_name);
  });
  out.technicians = Array.from(names).sort();
  out.payroll = [];
  return out;
}
// Map an ERP client record to the clients table (PESOWiFi rows too — those are just clients
// whose area starts with PESOWIFI, saved through these same actions). Mirrors api.php's
// create_client / update_client: the same columns, and the same empty-string rules. olt/pon
// aren't columns, and balance / billing_status / renewal_note / bill_date / due_date /
// active_profile are owned by other actions — writing them here would wipe them on every save.
const _cTxt = v => v === undefined || v === null ? null : v; // keeps "" as "" like api.php, so names never render as "null"
const _cNum = v => {
  const n = Number(v);
  return v === "" || v === null || v === undefined || !isFinite(n) ? null : n;
};
function _clientPayload(c) {
  return {
    account_number: _cTxt(c.account_number),
    first_name: _cTxt(c.first_name),
    last_name: _cTxt(c.last_name),
    address: _cTxt(c.address),
    coordinates: _cTxt(c.coordinates),
    area: _cTxt(c.area),
    phone: _cTxt(c.phone),
    email: _cTxt(c.email),
    subscription_date: c.subscription_date ? c.subscription_date : null,
    // "" is not a valid date in Postgres
    profile: _cTxt(c.profile),
    mrc: _cNum(c.mrc),
    nap: _cTxt(c.nap),
    // `napPort` is the UI's name for the port column: loadLiveData renames it on the way in
    // (napPort: c.port), and every form round-trips that spelling, so read it back the same
    // way. Reading c.port here found undefined on every save and nulled a live column.
    port: _cTxt(c.napPort !== undefined ? c.napPort : c.port),
    url_link: _cTxt(c.url_link),
    notes: _cTxt(c.notes),
    ..._napPortIdPatch(c)
  };
}
// clients.nap_port_id is the FK to the physical nap_port row. No form carries it: NapCascade
// picks a NAP device by *name* and a port by *number* (its options are counted off
// total_ports, so they're plain numbers, not row ids), and the PESOWiFi form takes both as
// free text. So derive the id from the pair the forms do carry. Undefined = can't tell.
function _napPortId(napName, portNo) {
  const name = String(napName == null ? "" : napName).trim();
  const no = String(portNo == null ? "" : portNo).trim();
  if (!name || !no) return undefined;
  const dev = (napDevices || []).find(n => String(n.name || "").trim() === name);
  if (!dev || dev.id == null) return undefined; // unknown device, or sample data with no id
  const row = (napPorts || []).find(p => String(p.nap_device_id) === String(dev.id) && String(p.port_number) === no);
  return row ? row.id : undefined;
}
// Display-only: what NapCascade should show when an edit form opens on an existing row.
// olt/pon aren't client columns, so a reopened form had nothing to select in the first two
// dropdowns -- and since the NAP list is filtered by the chosen OLT, an unset OLT blanked the
// NAP dropdown too, even on a row that has one. Only NAP Port, whose options come off the
// device the NAP name names, survived.
// The row records its NAP by name, and that name is exactly what _napPortId() walks through
// napPorts to reach clients.nap_port_id -- so the device it names IS the one the saved link
// points at, and loadLiveData already resolved that device's pon_port -> olt into the olt/pon
// names below. The port number adds nothing to the walk: it picks a port *within* the device,
// not the device, so a row whose port is blank still places its OLT/PON.
// Hands back olt/pon only -- the two fields _clientPayload never writes -- so opening a form
// cannot change what saving it sends. It deliberately does not carry nap_port_id onto the
// form: _napPortIdPatch() lets an explicit id beat the lookup, so a seeded one would outvote
// the NAP the user picks next and save the old link.
function _napChainOpen(c) {
  const name = String(c.nap == null ? "" : c.nap).trim();
  const dev = name ? (napDevices || []).find(n => String(n.name || "").trim() === name) : null;
  return dev ? {
    olt: dev.olt || "",
    pon: dev.pon || ""
  } : {};
}
// Decide nap_port_id for a save. `port` and nap_port_id are two records of the same fact, so
// they move together — except when we genuinely cannot tell, where leaving the column out of
// the write beats guessing at it.
function _napPortIdPatch(c) {
  if (c.nap_port_id !== undefined) return {
    nap_port_id: _cNum(c.nap_port_id)
  }; // an explicit caller wins
  if (!("napPort" in c)) return {}; // no NAP fields at all: don't touch the link
  if (!String(c.napPort == null ? "" : c.napPort).trim()) return {
    nap_port_id: null
  }; // cleared: `port` is going blank too
  const id = _napPortId(c.nap, c.napPort);
  return id === undefined ? {} : {
    nap_port_id: id
  }; // unresolvable: keep whatever is there rather than destroy it
}
// Money: the payments (income) and expenses tables. Same rules as _clientPayload — only
// the columns api.php's create_/update_ actions write, id excluded (it selects the row, it
// isn't a value), blank dates NULL, blank text kept as "".
// The MoneyModal form carries six fields per kind, and those are the six written here.
// payments.type / payments.receipt / created_by are not on the form: writing them would
// null them out on every edit, so they keep their DB default on insert and are left
// untouched on update.
const _pCols = "id,paid_at,account,source,amount,reference,user_name";
const _eCols = "id,spent_at,supplier,description,amount,invoice,user_name";
const _cDate = v => {
  const s = v ? String(v).slice(0, 10) : "";
  return s || null;
};
function _paymentPayload(p) {
  return {
    paid_at: _cDate(p.paid_at),
    account: _cTxt(p.account),
    source: _cTxt(p.source),
    amount: _cNum(p.amount),
    reference: _cTxt(p.reference),
    user_name: _cTxt(p.user_name)
  };
}
function _expensePayload(e) {
  return {
    spent_at: _cDate(e.spent_at),
    supplier: _cTxt(e.supplier),
    description: _cTxt(e.description),
    amount: _cNum(e.amount),
    invoice: _cTxt(e.invoice),
    user_name: _cTxt(e.user_name)
  };
}
// Read direction. The tables render `date` / `user`; the edit form reads back `paid_at` /
// `spent_at`, so both spellings of the date go out — same as api.php's rows.
const _payRow = r => ({
  id: r.id,
  date: _cDate(r.paid_at) || "",
  paid_at: _cDate(r.paid_at) || "",
  account: r.account || "",
  source: r.source || "",
  amount: r.amount != null ? Number(r.amount) : 0,
  user: r.user_name || "",
  reference: r.reference || ""
});
const _expRow = r => ({
  id: r.id,
  date: _cDate(r.spent_at) || "",
  spent_at: _cDate(r.spent_at) || "",
  supplier: r.supplier || "",
  description: r.description || "",
  amount: r.amount != null ? Number(r.amount) : 0,
  user: r.user_name || "",
  invoice: r.invoice || ""
});
const _ym = d => String(d.getFullYear()) + "-" + String(d.getMonth() + 1).padStart(2, "0");
// PostgREST has no GROUP BY, so every total below is summed here from the full tables.
// That's also why the lists aren't capped to a "recent" slice the way api.php's SQL can
// afford to be: the KPIs need every row loaded anyway, so sending them all costs nothing
// and lets search / Download / the date filter see the whole history.
async function _supaFinancials() {
  const sb = window.SB;
  const pays = (await _supaAll(sb, "payments", _pCols)).map(_payRow);
  const exps = (await _supaAll(sb, "expenses", _eCols)).map(_expRow);
  const newestFirst = (a, b) => (b.date || "").localeCompare(a.date || "");
  pays.sort(newestFirst);
  exps.sort(newestFirst);
  const sum = rows => rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
  const inMonth = (rows, k) => sum(rows.filter(r => (r.date || "").slice(0, 7) === k));
  const inYear = (rows, y) => sum(rows.filter(r => (r.date || "").slice(0, 4) === y));
  const now = new Date();
  const thisK = _ym(now),
    lastK = _ym(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const mLabel = k => new Date(k + "-01T00:00:00").toLocaleString("en-US", {
    month: "short",
    year: "numeric"
  });
  const collThis = inMonth(pays, thisK),
    collLast = inMonth(pays, lastK);
  const expThis = inMonth(exps, thisK),
    expLast = inMonth(exps, lastK);
  const yr = String(now.getFullYear());
  const yIn = inYear(pays, yr),
    yOut = inYear(exps, yr);
  const aIn = sum(pays),
    aOut = sum(exps);
  // group: [{ [key]: name, amt }] biggest first — feeds the income + expense charts
  const group = (rows, field, keyName) => {
    const by = {};
    rows.forEach(r => {
      const k = (r[field] || "").trim() || "Other";
      by[k] = (by[k] || 0) + (Number(r.amount) || 0);
    });
    return Object.keys(by).map(k => ({
      [keyName]: k,
      amt: by[k]
    })).sort((a, b) => b.amt - a.amt);
  };
  const cashFlow = []; // last 7 months, in ₱ thousands — the chart is labelled "₱ thousands"
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1),
      k = _ym(d);
    cashFlow.push({
      m: d.toLocaleString("en-US", {
        month: "short"
      }),
      inflow: Math.round(inMonth(pays, k) / 1000),
      outflow: Math.round(inMonth(exps, k) / 1000)
    });
  }
  const months = new Set();
  pays.concat(exps).forEach(r => {
    const k = (r.date || "").slice(0, 7);
    if (k) months.add(k);
  });
  return {
    ok: true,
    recentPayments: pays,
    recentExpenses: exps,
    incomeBySource: group(pays, "source", "src"),
    expensesByCategory: group(exps, "supplier", "cat"),
    cashFlow,
    kpi: {
      mtdIncome: collThis,
      paymentCount: pays.length,
      expenseCount: exps.length
    },
    monthKpi: {
      collThis,
      collLast,
      expThis,
      expLast,
      netThis: collThis - expThis,
      netLast: collLast - expLast,
      thisLabel: mLabel(thisK),
      lastLabel: mLabel(lastK)
    },
    year: {
      income: yIn,
      expense: yOut,
      net: yIn - yOut,
      label: now.getFullYear()
    },
    allTime: {
      income: aIn,
      expense: aOut,
      net: aIn - aOut
    },
    financeMonths: Array.from(months).sort().reverse()
  };
}
/* ---- The Owner Dashboard's money (dashboard) ----
   Every figure on the owner's main screen. Until this was wired the action fell through, DASH
   stayed null, and the tiles rendered hardcoded demo constants — ₱58,400 collected today, ₱678,000
   spent over two months, ₱365,000 net — numbers that were never anyone's data. Everything else in
   that block read ₱0 no matter what had actually been paid.

   ASIA/MANILA, EXPLICITLY. Every boundary here — today, this week, this month — is a Philippine
   local boundary, not a UTC one. paid_at is timestamptz, so a payment taken at 23:30 in Manila is
   15:30 UTC the same day, while one at 08:30 Manila is 00:30 UTC the same day: truncating the UTC
   instant would move evening payments into tomorrow and make "Collections Today" wrong every
   evening. The Philippines has never observed DST, so a fixed +8 is exact rather than an
   approximation — this is one of the few timezones where that shortcut is not a bug waiting to
   happen. Shifting the instant by +8h and then reading the UTC calendar fields off the result gives
   Manila wall-clock without needing a timezone database inside the VM.

   MONTHLY FIGURES COME FROM THE SAME ARITHMETIC AS THE FINANCIALS SCREEN, deliberately: same
   _supaAll reads, same _payRow/_expRow mapping, same "YYYY-MM prefix" bucketing. Two screens
   showing the same month must not be able to disagree, and the only way to guarantee that is to
   compute them the same way rather than to compute them twice.

   HONEST FAILURE, AND THIS ONE MATTERS MORE THAN USUAL. Every field here is a number the owner
   makes decisions on. A half-read dashboard would render as a confident set of zeros — which is
   indistinguishable from a quiet month — so any failed read returns ok:false and the screen shows
   "—" rather than a total nobody can tell is missing. */
const _MNL_OFFSET_MS = 8 * 60 * 60 * 1000; // Asia/Manila is UTC+8 year-round; no DST, ever
// A timestamp -> the Manila calendar date it falls on. Accepts a full timestamptz or a bare
// "YYYY-MM-DD": a date-only value parses as UTC midnight, and +8h leaves it on its own date.
const _mnlDay = v => {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return String(v).slice(0, 10); // unparseable: fall back to the prefix
  return new Date(d.getTime() + _MNL_OFFSET_MS).toISOString().slice(0, 10);
};
// "Now" as Manila wall-clock. `at` is a test seam — the boundary cases are the whole point of this
// handler and cannot be exercised against a clock that moves. Read-only either way.
const _mnlNow = at => new Date((at ? new Date(at).getTime() : Date.now()) + _MNL_OFFSET_MS);
async function _supaDashboard(payload) {
  const sb = window.SB;
  try {
    const now = _mnlNow(payload && payload.now);
    const today = now.toISOString().slice(0, 10);
    const thisK = today.slice(0, 7);
    const lastD = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    const lastK = lastD.toISOString().slice(0, 7);
    // The Manila week, Monday-start: getUTCDay() on the shifted instant is the Manila weekday.
    const dow = (now.getUTCDay() + 6) % 7; // 0 = Monday
    const weekStart = new Date(now.getTime() - dow * 86400000).toISOString().slice(0, 10);
    const weekEnd = new Date(now.getTime() + (6 - dow) * 86400000).toISOString().slice(0, 10);

    // _supaAll paginates; a plain .select() would stop at PostgREST's default 1000 and understate
    // every total the moment the ledger outgrows one page.
    const payRaw = await _supaAll(sb, "payments", _pCols + ",created_by");
    const expRaw = await _supaAll(sb, "expenses", _eCols);
    const cliRaw = await _supaAll(sb, "clients", "account_number,area,first_name,last_name");
    const planRaw = await _supaAll(sb, "pr_plans", "id,kind,total_amount,active");
    const ledRaw = await _supaAll(sb, "pr_plan_applied", _PR_APPLIED_COLS);
    const itemRaw = await _supaAll(sb, "pr_items", "id,period_id,net");
    const perRaw = await _supaAll(sb, "pr_periods", "id,pay_date");
    const pays = payRaw.map(_payRow);
    const exps = expRaw.map(_expRow);
    // Manila day per payment, computed from the RAW timestamptz rather than _payRow's already
    // date-truncated copy — truncating first would throw away the time and with it the timezone.
    const payDay = payRaw.map(r => _mnlDay(r.paid_at));
    const expDay = expRaw.map(r => _mnlDay(r.spent_at));
    const sum = rows => rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
    const inMonth = (rows, days, k) => rows.reduce((a, r, i) => a + ((days[i] || "").slice(0, 7) === k ? Number(r.amount) || 0 : 0), 0);
    const incomeThisMonth = inMonth(pays, payDay, thisK);
    const incomeLastMonth = inMonth(pays, payDay, lastK);
    const expensesThisMonth = inMonth(exps, expDay, thisK);
    const expensesLastMonth = inMonth(exps, expDay, lastK);
    // Two CALENDAR months, this plus last — not a rolling 60 days. The tiles sit beside the
    // per-month tiles, so the pair has to add up to what is shown above it.
    const income2mo = incomeThisMonth + incomeLastMonth;
    const expenses2mo = expensesThisMonth + expensesLastMonth;
    const todayIdx = [];
    payDay.forEach((d, i) => {
      if (d === today) todayIdx.push(i);
    });
    const cliByAcct = {};
    cliRaw.forEach(c => {
      cliByAcct[String(c.account_number || "")] = c;
    });
    const cliName = acct => {
      const c = cliByAcct[String(acct || "")];
      return c ? ((c.first_name || "") + " " + (c.last_name || "")).trim() : "";
    };
    const collectionsTodayList = todayIdx.map(i => ({
      reference: payRaw[i].reference || "",
      account: payRaw[i].account || "",
      client: cliName(payRaw[i].account),
      source: payRaw[i].source || "",
      amount: Number(payRaw[i].amount) || 0,
      paid_at: payRaw[i].paid_at || "",
      user_name: payRaw[i].user_name || "",
      created_by: payRaw[i].created_by || ""
    }));
    const thisMonthIdx = [];
    payDay.forEach((d, i) => {
      if ((d || "").slice(0, 7) === thisK) thisMonthIdx.push(i);
    });
    const incomeThisMonthList = thisMonthIdx.map(i => ({
      reference: payRaw[i].reference || "",
      account: payRaw[i].account || "",
      client: cliName(payRaw[i].account),
      source: payRaw[i].source || "",
      amount: Number(payRaw[i].amount) || 0,
      paid_at: payRaw[i].paid_at || "",
      user_name: payRaw[i].user_name || "",
      created_by: payRaw[i].created_by || ""
    }));
    // Clients renewed this month: DISTINCT accounts, so paying twice counts the person once.
    const renewedAccts = {};
    thisMonthIdx.forEach(i => {
      const a = String(payRaw[i].account || "").trim();
      if (a) renewedAccts[a] = 1;
    });

    // PESOWiFi income: a vending account is identified by clients.area starting "PESOWIFI"
    // (isPeso, app.jsx:7117). Same rule the client screens use, so the split cannot disagree.
    const isPesoAcct = acct => {
      const c = cliByAcct[String(acct || "")];
      return !!c && String(c.area || "").toUpperCase().trim().indexOf("PESOWIFI") === 0;
    };
    const pesoIn = k => payDay.reduce((a, d, i) => a + ((d || "").slice(0, 7) === k && isPesoAcct(payRaw[i].account) ? Number(payRaw[i].amount) || 0 : 0), 0);

    // Outstanding loans: REMAINING PRINCIPAL on active plans. Interest-only weeks carry term_no 0
    // and are excluded — they take interest and advance no principal, so counting them would report
    // a debt shrinking when it is not. Floored at 0 so an overpaid plan cannot subtract from
    // somebody else's balance and understate the total.
    const paidByPlan = {};
    ledRaw.forEach(r => {
      if (!(Number(r.term_no) > 0)) return;
      const k = String(r.plan_id);
      paidByPlan[k] = (paidByPlan[k] || 0) + (Number(r.amount) || 0);
    });
    let outstandingLoans = 0;
    planRaw.forEach(p => {
      if (!(Number(p.active) === 1)) return;
      outstandingLoans += Math.max(0, (Number(p.total_amount) || 0) - (paidByPlan[String(p.id)] || 0));
    });

    // Collection funds: money ALREADY taken, bucketed by the plan's kind. Every ledger row counts,
    // interest-only included — that money really was collected even though it advanced no term.
    const kindByPlan = {};
    planRaw.forEach(p => {
      kindByPlan[String(p.id)] = String(p.kind || "").toLowerCase();
    });
    const collectionFunds = {
      coop: 0,
      tshirt: 0,
      ca: 0,
      fines: 0
    };
    ledRaw.forEach(r => {
      const kind = kindByPlan[String(r.plan_id)];
      if (Object.prototype.hasOwnProperty.call(collectionFunds, kind)) collectionFunds[kind] += Number(r.amount) || 0;
    });
    // Summed from the four rather than tracked alongside them, so the total cannot drift from its parts.
    const collectionFundsTotal = collectionFunds.coop + collectionFunds.tshirt + collectionFunds.ca + collectionFunds.fines;

    // Payroll expense: pr_items.net for periods whose PAY DATE lands in the window. Keyed on
    // pay_date rather than on when the week was worked, because that is when the money leaves.
    const perDay = {};
    perRaw.forEach(p => {
      perDay[String(p.id)] = _mnlDay(p.pay_date);
    });
    const payrollIn = (lo, hi) => itemRaw.reduce((a, it) => {
      const d = perDay[String(it.period_id)] || "";
      return a + (d >= lo && d <= hi ? Number(it.net) || 0 : 0);
    }, 0);
    const bySource = {};
    payRaw.forEach(r => {
      const s = String(r.source || "").trim() || "Other";
      if (!bySource[s]) bySource[s] = {
        source: s,
        count: 0,
        amount: 0
      };
      bySource[s].count++;
      bySource[s].amount += Number(r.amount) || 0;
    });
    const expMonths = {};
    expDay.forEach((d, i) => {
      const k = (d || "").slice(0, 7);
      if (!k) return;
      expMonths[k] = (expMonths[k] || 0) + (Number(expRaw[i].amount) || 0);
    });
    return {
      ok: true,
      dashboard: {
        collectionsToday: todayIdx.reduce((a, i) => a + (Number(payRaw[i].amount) || 0), 0),
        collectionsTodayCount: todayIdx.length,
        collectionsTodayList,
        incomeThisMonth,
        incomeLastMonth,
        expensesThisMonth,
        expensesLastMonth,
        netLastMonth: incomeLastMonth - expensesLastMonth,
        income2mo,
        expenses2mo,
        net2mo: income2mo - expenses2mo,
        incomeThisMonthList,
        renewedThisMonth: Object.keys(renewedAccts).length,
        pesoThis: pesoIn(thisK),
        pesoLast: pesoIn(lastK),
        outstandingLoans,
        collectionFunds,
        collectionFundsTotal,
        payrollExpenseWeek: payrollIn(weekStart, weekEnd),
        payrollExpenseMonth: payrollIn(thisK + "-01", thisK + "-31"),
        // DASH's own spelling: {source, count, amount}. The financials screen's incomeBySource is
        // {src, amt} with no count — same name, different contract, and they must not be swapped.
        incomeBySource: Object.keys(bySource).map(k => bySource[k]).sort((a, b) => b.amount - a.amount),
        expenseMonths: Object.keys(expMonths).sort().map(k => ({
          ym: k,
          amount: expMonths[k]
        })),
        sumAllIncome: sum(pays),
        sumAllExpense: sum(exps)
      }
    };
  } catch (e) {
    // _supaAll throws on a read error. Better a dashboard that says it could not load than one
    // showing a confident set of zeros that reads exactly like a quiet month.
    return {
      ok: false,
      error: "Could not load the dashboard: " + (e && e.message || String(e))
    };
  }
}
/* ---- One client's payment history (client_payments) — READ ONLY ----
   ClientProfile's payment panel (app.jsx:6897), which asks by ACCOUNT NUMBER, not by client id:
   payments.account is a plain text column carrying clients.account_number, with no foreign key
   behind it. So the filter is a string match and nothing guarantees the account exists — an
   unknown one is simply a client with no payments, which is also what a real client with none
   looks like. That ambiguity is inherent to the link and is not worth inventing a lookup to
   resolve; the panel renders "No payments recorded." either way.

   NO ROLE GATE, deliberately. The panel is fetched by anyone who can open a client profile
   (app.jsx:6895 has no permission check), so a gate here would blank it for technicians. Reads on
   payments have to stay open to every role for the same reason pr_employees reads do.

   THE ONE THING THIS MUST NOT DO is return an empty list when the query failed. The caller reduces
   whatever comes back into a "Total Paid" figure (app.jsx:6902) and prints the row count beside
   it, so a swallowed error renders as a confident ₱0.00 and "0 payments" — a client who has paid
   shown as one who never has. Empty and broken must not look alike, which is why `error` returns
   ok:false rather than falling through to an empty map below. */
async function _supaClientPayments(payload) {
  const sb = window.SB;
  const account = String(payload && payload.account || "").trim();
  if (!account) return {
    ok: false,
    error: "Missing account"
  };
  const {
    data,
    error
  } = await sb.from("payments").select(_pCols).eq("account", account);
  if (error) return {
    ok: false,
    error: "Could not load this client's payments: " + error.message
  };
  // _payRow is the same mapping the finance pages read through, so the panel sees the shape the
  // rest of the app already agrees on. It emits more than the panel uses (date, user, account) —
  // a superset costs nothing and keeps one reader of the payments columns rather than two.
  const payments = (data || []).map(_payRow);
  // Newest first, sorted HERE rather than with .order(): _supaFinancials does the same (app.jsx:590)
  // because PostgREST ordering and JS ordering would be two different rules to keep in step, and
  // the dates are ISO strings so a plain string compare is the date compare.
  payments.sort((a, b) => String(b.paid_at || "").localeCompare(String(a.paid_at || "")));
  // Zero payments is a perfectly good answer, and an ok one: the client simply has not paid yet.
  return {
    ok: true,
    payments
  };
}
/* ---- Delete EVERY expense (delete_all_expenses) — OWNER ONLY, IRREVERSIBLE ----
   The most destructive action in this application. There is no soft delete here and no undo: the
   payroll deletes all became active=0 precisely so history survived, and this one cannot, because
   "wipe the expense ledger" is the thing being asked for. Every row goes.

   What that costs, so it is written down where it is done: expenses feeds _supaFinancials and
   _supaDashboard, so a wipe does not merely empty a list — it moves all-time net, the year figure,
   the seven-month cash-flow chart and the expense breakdown, and it moves them in the flattering
   direction. Income stays, outgoings vanish, and the business looks more profitable than it is.

   THREE GATES, and they are deliberately not the same gate written three times:
     1. The button renders only for ME.role === "owner" (app.jsx:4693).
     2. The UI demands the literal string "DELETE ALL" typed into a prompt — a confirmation that
        cannot be dismissed by reflex the way an OK button can.
     3. This handler re-checks the role, because gates 1 and 2 are both in the browser and neither
        survives a console.
   The handler does NOT re-check the typed word. A string echoed back by the caller proves nothing
   about what a human typed, so treating it as proof would be theatre; the role check is the part
   that means something on this side.

   COUNTED BEFORE AND AFTER, like _supaDeletePeriod (app.jsx:1173). A DELETE filtered by anything
   other than a resolved id returns 200 with an empty array both when it removed nothing and when
   RLS hid every row from it, and on a wipe those two are not remotely the same event. Knowing how
   many rows were there first is the only way to tell "the table was already empty" from "the
   database refused" from "some rows were removed and others were not". */
async function _supaDeleteAllExpenses() {
  const sb = window.SB;
  if (!ME || ME.role !== "owner") return {
    ok: false,
    error: "Only the superadmin can delete all expenses."
  };
  const {
    data: before,
    error: countErr
  } = await sb.from("expenses").select("id");
  if (countErr) return {
    ok: false,
    error: "Could not read the expenses before deleting: " + countErr.message + " Nothing was deleted."
  };
  const expected = (before || []).length;
  // An empty table is a success with nothing in it, not a failure. Returning early also means the
  // delete below is never issued against a table that has nothing to lose.
  if (!expected) return {
    ok: true,
    deleted: 0
  };
  // .gte("id", 0) is how "every row" is spelled to PostgREST, which rejects a DELETE with no filter
  // at all. Ids are a bigint identity sequence starting at 1, so nothing real sits below zero — and
  // if anything ever did, it would be SKIPPED rather than swept, and the count comparison below
  // would catch that as a partial rather than reporting a clean wipe.
  const {
    data: gone,
    error
  } = await sb.from("expenses").delete().gte("id", 0).select("id");
  if (error) return {
    ok: false,
    error: "Could not delete the expenses: " + error.message
  };
  const deleted = (gone || []).length;
  if (!deleted) return {
    ok: false,
    error: "The database refused to delete the expenses — your account may not have permission. All " + expected + " are still there."
  };
  if (deleted < expected) {
    return {
      ok: false,
      error: "Only " + deleted + " of " + expected + " expenses were deleted before the database refused the rest. The remaining " + (expected - deleted) + " are still there — fix the permission and run it again.",
      deleted
    };
  }
  // `deleted` is counted from rows the database actually gave back, never from `expected`.
  return {
    ok: true,
    deleted
  };
}
/* ---- Bulk expense import (import_expenses) — OWNER ONLY, ADD ONLY, TWO PHASE ----
   The Import button in ExpensesPage, which parses a CSV or spreadsheet in the browser and sends
   the rows here.

   ADD ONLY, AND THAT IS THE WHOLE POINT. The api.php version this replaces matched on an `id`
   column and UPSERTED, and the export writes that column — so re-uploading a file exported last
   week silently reverted every edit made since, with no prompt and no trace. Nothing on screen
   would have looked wrong. Here an incoming id is IGNORED: every accepted row goes through
   _expensePayload (app.jsx:563), which has no id key at all, so the database assigns a fresh one
   and an existing expense can never be written over. The worst case becomes a visible duplicate
   somebody can delete, instead of an invisible reversion nobody can see.

   TWO PHASES on one action. commit:false reads, tags and counts, and writes NOTHING; commit:true
   inserts. The preview is what turns "I uploaded a file" into "I am adding 31 rows totalling
   ₱48,200", which is the only point at which a wrong file is still cheap to notice.

   PHASE 2 RE-DECIDES EVERYTHING. It does not trust the tags Phase 1 handed out, because the rows
   come back through the browser in between and the ledger may have moved on. Validation and
   duplicate detection run again on fresh data, and only rows that pass THEN are inserted. */
const _EXP_REQUIRED = "a date, an amount and a supplier";
// Two expenses on the same day, for the same money, to the same supplier, with the same note are
// a re-import rather than a coincidence. Deliberately NOT keyed on invoice or user_name: those are
// the fields most often blank or retyped, and including them would let a re-upload slip through by
// differing in a column nobody looks at.
const _expDupKey = r => [_cDate(r.spent_at) || "", String(_cNum(r.amount)), String(r.supplier == null ? "" : r.supplier).trim().toLowerCase(), String(r.description == null ? "" : r.description).trim().toLowerCase()].join("|");
// A row is only worth writing if it carries the three things an expense IS. Everything else on the
// table is optional and stays optional. Amount has to parse to a real number: a blank or a stray
// "n/a" arriving as NaN would otherwise land as null and quietly drag every total down.
const _expRowInvalid = r => {
  if (!_cDate(r.spent_at)) return "missing or unreadable date";
  const raw = String(r.amount == null ? "" : r.amount).trim();
  if (!raw) return "missing amount";
  // _cNum, deliberately — the same helper _expensePayload uses to WRITE the amount. Asking the
  // question with the writer's own rule is what stops validation and storage from ever disagreeing:
  // anything this accepts is by construction something _cNum will turn into a real number, so a row
  // cannot pass here and still land as null. A cell reading "n/a" or "—" parses to NaN and is
  // refused. (This briefly used Number.isFinite instead, because isFinite was missing from the test
  // harness's VM globals and _cNum returned NaN under test; that gap is fixed in harness.mjs, and
  // the "every required field is enforced" test now doubles as the alarm if it ever comes back.)
  if (_cNum(raw) == null) return "amount is not a number";
  if (!String(r.supplier == null ? "" : r.supplier).trim()) return "missing supplier";
  return null;
};
async function _supaImportExpenses(payload) {
  const sb = window.SB;
  // Owner only, and stricter than the button that used to open this (canAdd("fin_expense"), which
  // also admits cfo and admin_officer). A bulk insert into the ledger is the same class of action
  // as Delete all beside it, and that one has always been owner-only.
  if (!ME || ME.role !== "owner") return {
    ok: false,
    error: "Only the superadmin can import expenses."
  };
  const rows = payload && payload.rows;
  if (!Array.isArray(rows)) return {
    ok: false,
    error: "Nothing to import — the file produced no rows."
  };
  if (!rows.length) return {
    ok: false,
    error: "Nothing to import — the file produced no rows."
  };
  // The existing ledger, read fresh on BOTH phases. Reusing the preview's answer would mean
  // deciding against a snapshot the officer may have been staring at for minutes.
  const {
    data: existing,
    error: readErr
  } = await sb.from("expenses").select("id,spent_at,supplier,description,amount");
  if (readErr) return {
    ok: false,
    error: "Could not read the existing expenses to check for duplicates: " + readErr.message
  };
  const seen = {};
  (existing || []).forEach(r => {
    seen[_expDupKey(r)] = 1;
  });
  // Tagged in file order. `seen` grows as accepted rows are taken, so a file containing the same
  // line twice flags the second one — the same hazard as re-importing, one step earlier.
  const tagged = rows.map(r => {
    const why = _expRowInvalid(r);
    if (why) return {
      row: r,
      tag: "invalid",
      why
    };
    const key = _expDupKey(r);
    if (seen[key]) return {
      row: r,
      tag: "duplicate",
      why: "already recorded"
    };
    seen[key] = 1;
    return {
      row: r,
      tag: "new",
      why: null
    };
  });
  const fresh = tagged.filter(x => x.tag === "new");
  const duplicateCount = tagged.filter(x => x.tag === "duplicate").length;
  const invalidCount = tagged.filter(x => x.tag === "invalid").length;
  const total = fresh.reduce((a, x) => a + (_cNum(x.row.amount) || 0), 0);
  if (!payload.commit) {
    // PHASE 1. Nothing has been written and nothing will be until this comes back and the officer
    // says yes. The rows go back tagged so the screen can show WHICH ones it is about to skip.
    return {
      ok: true,
      preview: true,
      newCount: fresh.length,
      duplicateCount,
      invalidCount,
      newTotal: total,
      rows: tagged.map(x => ({
        ...x.row,
        _tag: x.tag,
        _why: x.why
      })),
      required: _EXP_REQUIRED
    };
  }
  // PHASE 2. One insert per row, sequentially — the fake cannot represent an array insert, a bulk
  // insert would report one outcome for many rows, and the tally has to be what actually landed
  // rather than what was attempted. Stopping at the first refusal (rather than pressing on) means
  // the officer is told exactly where it stopped and how much of the file is already in.
  let added = 0;
  for (const x of fresh) {
    const {
      data: hit,
      error
    } = await sb.from("expenses").insert(_expensePayload(x.row)).select("id");
    if (error) {
      return {
        ok: false,
        error: "Import stopped after " + added + " of " + fresh.length + " new rows: " + error.message + " The " + added + " already added are in the ledger and will be seen as duplicates if you import again.",
        added,
        skipped_duplicates: duplicateCount,
        skipped_invalid: invalidCount
      };
    }
    if (!hit || !hit.length) {
      return {
        ok: false,
        error: "Import stopped after " + added + " of " + fresh.length + " new rows — the database refused the next one. The " + added + " already added are in the ledger and will be seen as duplicates if you import again.",
        added,
        skipped_duplicates: duplicateCount,
        skipped_invalid: invalidCount
      };
    }
    added++;
  }
  // added is counted from rows the database actually gave an id back for, never from fresh.length.
  return {
    ok: true,
    added,
    skipped_duplicates: duplicateCount,
    skipped_invalid: invalidCount
  };
}
/* ---- Expense category labels (save_expense_cats) ----
   The Categories modal in ExpensesPage (app.jsx:4088), which sends the WHOLE new list every time —
   this is a replacement, not an add or a remove, and the handler treats it as one.

   THE CATEGORIES ARE ONLY LABELS. They populate a datalist on the expense form (app.jsx:3882) and
   nothing else reads them. Removing one does NOT touch a single expense: the category lives on the
   expense row as its own text (expenses.supplier), so a spent row keeps saying what it said. That
   is why a destructive-looking edit here is safe, and why this handler never goes near the
   expenses table.

   app_config IS SHARED, AND THAT IS THE RISK HERE. One row per key, and the other keys are
   positions, job_types, issues, solutions, sla, dashboard_verse and hero_goal_pin (app.jsx:471) —
   the Job Orders screens and Settings all read from the same table. So the write is pinned to ONE
   key: _CFG_EXPENSE_CATS is a module constant, never anything off the payload. A caller cannot
   name the row it writes, which means no payload can reach `positions` or `sla` through this
   action however it is shaped.

   config_value is TEXT holding JSON, not a json column — the read parses it (app.jsx:470) — so the
   list goes out stringified or it comes back as "[object Object]".

   UPDATE THEN INSERT, not upsert. A real .upsert(onConflict: "config_key") is the better shape and
   is what this should become, but it needs a UNIQUE constraint on config_key to resolve against,
   and that constraint is unconfirmed — pr_plan_applied's was verified before being relied on and
   this one has not been. Update-then-insert is correct either way. It degrades safely too: if RLS
   refuses the update, zero rows come back, the insert is attempted and is refused in turn, and the
   caller gets an honest failure rather than a false success. */
const _CFG_EXPENSE_CATS = "expense_cats";
async function _supaSaveExpenseCats(payload) {
  const sb = window.SB;
  // Matches the button that opens this modal (app.jsx:4234) exactly, rather than reading ME.role
  // the way the payroll handlers do. That difference is deliberate: those mirror an RLS policy that
  // reads erp_users.role, so can() would have rendered buttons the database then refused. There is
  // no such policy on app_config, so the app IS the rule here, and the rule the user can see is the
  // one that should apply — gating tighter than the button would leave a Settings-granted finance
  // user staring at a Categories button that always fails.
  if (!canAdd("fin_expense")) return {
    ok: false,
    error: "Only the finance office can change expense categories."
  };
  const raw = payload && payload.cats;
  if (!Array.isArray(raw)) return {
    ok: false,
    error: "Expense categories must be a list."
  };
  // The modal already trims and drops blanks (app.jsx:4088); doing it again here is not distrust of
  // that screen but of the assumption it is the only caller. Dedupe is case-insensitive because two
  // spellings of one category split an expense report in two without ever looking wrong.
  const seen = {};
  const cats = [];
  raw.forEach(c => {
    const s = String(c == null ? "" : c).trim();
    const k = s.toLowerCase();
    if (s && !seen[k]) {
      seen[k] = 1;
      cats.push(s);
    }
  });
  const value = JSON.stringify(cats);
  const {
    data: hit,
    error
  } = await sb.from("app_config").update({
    config_value: value
  }).eq("config_key", _CFG_EXPENSE_CATS).select("config_key");
  if (error) return {
    ok: false,
    error: "Could not save the expense categories: " + error.message
  };
  if (hit && hit.length) return {
    ok: true,
    cats
  };
  // Nothing updated. Either the key has never been saved, or RLS hid the row from the write — and
  // the two are indistinguishable from here (200 + [] both ways). The insert settles it: a genuine
  // first save lands, and a refusal is refused again and reported below rather than passing as ok.
  const {
    data: ins,
    error: insErr
  } = await sb.from("app_config").insert({
    config_key: _CFG_EXPENSE_CATS,
    config_value: value
  }).select("config_key");
  if (insErr) return {
    ok: false,
    error: "Could not save the expense categories: " + insErr.message
  };
  if (!ins || !ins.length) return {
    ok: false,
    error: "Saving the expense categories was refused by the database. Nothing changed."
  };
  return {
    ok: true,
    cats
  };
}
// Renewals. Two owners share the renewal_stages row: set_renewal_stage owns `stage`, and
// set_renewal_followup owns the five follow-up columns. Each writes only its own, so an
// upsert from one never blanks the other's. account_number is the row key, never a value.
// Note that set_renewal_followup deliberately does NOT write `stage`: a client can sit on a
// for_followup card with no row at all (renewalStageOf auto-places anyone whose
// active_profile is Expired / Payment Reminder). Inserting a stage here would pin them
// explicitly, and an explicit stage always wins — so editing a remark would quietly change
// what the card means. Left NULL, the auto rule keeps working.
function _followupPayload(p) {
  return {
    next_date: _cDate(p.next_date),
    remarks: _cTxt(p.remarks),
    promise_date: _cDate(p.promise_date),
    amount_due: _cNum(p.amount_due),
    payment_method: _cTxt(p.payment_method)
  };
}
// api.php stamps notes and stage moves server-side; here it's the browser clock. Both the
// note `at` and the log's `moved_at` render raw in the timeline, so keep them short.
const _stamp = () => {
  const d = new Date(),
    p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
};
// Job orders. Unlike clients / payments / renewals, the mapping already exists: every
// caller sends _jobPayload(order), which is exactly the 16 job_orders columns with the SLA
// badge split back out across sla24 / followup / warning, and blanks already nulled. That
// object is what api.php receives and writes, so it passes straight through — re-deriving
// it here would fork the mapping and the two paths would drift apart.
// The whitelist only guards the column set. jo_id keys the row: the app allocates the
// number, so it is sent on insert but is the WHERE on update, never part of the SET.
const _JO_COLS = ["customer", "job_type", "tech", "issue", "solution", "start_date", "start_time", "finish_date", "finish_time", "status", "resolution_hours", "sla24", "sla48", "warning", "followup"];
const _joRow = (p, withId) => {
  const out = withId ? {
    jo_id: p.jo_id
  } : {};
  _JO_COLS.forEach(c => {
    if (p[c] !== undefined) out[c] = p[c];
  });
  return out;
};
/* ================= PAYROLL =================
   payroll_data mirrors api.php's response exactly: loadPayrollData() (app.jsx:245) and both
   payroll screens consume that shape unchanged, so anything else here is a UI change.
   payroll_data (read) and pr_save_items (the Save button) are the wired pair; every other
   payroll write still falls through to the "not connected" catch-all below.

   Scope is this function's job, not RLS's. RLS lets any signed-in user read every pr_ table,
   but SalaryPage takes employees[0] as "me" (app.jsx:4761) and turns EVERY item it is handed
   into one of my payslips (app.jsx:4764) — give a technician the unscoped tables and their
   Salary tab lists the whole company's pay. So a non-officer gets their own employee row and
   their own items, nothing else. The officer test is can("payroll") — the same one the
   screen's own edit buttons use (app.jsx:277). */
const _prN = v => v == null ? null : Number(v);
const _prNums = (row, cols) => {
  const o = {
    ...row
  };
  cols.forEach(c => {
    if (o[c] !== undefined) o[c] = _prN(o[c]);
  });
  return o;
};
const _PR_EMP_COLS = "id,full_name,position,schedule_id,per_day,user_id,active,day_off";
const _PR_PERIOD_COLS = "id,label,pay_date,status,notes,created_by,created_at,published_at";
const _PR_ITEM_COLS = "id,period_id,employee_id,days_present,per_day,att_present,att_absent,att_leave,att_halfday,leave_type_id,leave_paid,ot_hours,add_ot,sun_days,add_sunday,add_incentive,add_other,ded_coop,ded_tshirt,ded_ca,ded_fines,ded_excess,ded_loan,ded_uniform,ded_gov,ded_manual,ded_manual_note,ded_notes,gross,net,remarks,snap_schedule_id,snap_working_days,snap_sunday_rest,status,employee_remark,officer_reply,print_requested,printed,approved_at,updated_at";
const _PR_SCHED_COLS = "id,code,name,work_days,working_days_count,sunday_is_restday,pay_dow";
const _PR_PLAN_COLS = "id,employee_id,kind,category,label,total_amount,per_week,start_date,terms_total,active,interest_rate,interest_only";
const _PR_LEAVE_COLS = "id,name,is_paid,active";
// Which columns must arrive as real numbers. selId is always Number() (app.jsx:4543) and both
// the period lookup and the item filter compare with === (app.jsx:4427/4436), so an id that
// came back as a string would pick a week and then render an empty grid. Coerce up front
// rather than trust PostgREST's JSON types for numeric/int8.
// _prN preserves null on purpose: snap_working_days / snap_sunday_rest are read raw against
// `!= null` (app.jsx:4442/4451) to mean "this week is snapshotted — use these, not the
// employee's live schedule", and Number(null) === 0 would silently rewrite every snapshotted
// week's working-days total to zero. Everything else is read through prNum(), which maps a
// null to 0 anyway.
const _PR_EMP_N = ["id", "schedule_id", "per_day", "user_id", "active"];
const _PR_ITEM_N = ["id", "period_id", "employee_id", "days_present", "per_day", "att_present", "att_absent", "att_leave", "att_halfday", "leave_type_id", "leave_paid", "ot_hours", "add_ot", "sun_days", "add_sunday", "add_incentive", "add_other", "ded_coop", "ded_tshirt", "ded_ca", "ded_fines", "ded_excess", "ded_loan", "ded_uniform", "ded_gov", "ded_manual", "gross", "net", "snap_schedule_id", "snap_working_days", "snap_sunday_rest"];
const _PR_SCHED_N = ["id", "working_days_count", "sunday_is_restday", "pay_dow"];
const _PR_PLAN_N = ["id", "employee_id", "total_amount", "per_week", "terms_total", "active", "interest_rate", "interest_only"];
const _prByName = (a, b) => String(a.full_name || a.username || "").localeCompare(String(b.full_name || b.username || ""));
async function _supaPayroll() {
  const sb = window.SB;
  const officer = can("payroll");
  // bootstrap already resolved this the same way (app.jsx:447); re-derive only if it hasn't run.
  let myId = ME && ME.pr_employee_id != null ? ME.pr_employee_id : null;
  if (myId == null && ME && ME.uid) {
    const {
      data
    } = await sb.from("pr_employees").select("id").eq("user_id", ME.uid).eq("active", 1).limit(1);
    if (data && data.length) myId = data[0].id;
  }
  myId = _prN(myId);
  let employees = (await _supaAll(sb, "pr_employees", _PR_EMP_COLS)).map(r => _prNums(r, _PR_EMP_N));
  let items = (await _supaAll(sb, "pr_items", _PR_ITEM_COLS)).map(r => _prNums(r, _PR_ITEM_N));
  let plans = (await _supaAll(sb, "pr_plans", _PR_PLAN_COLS)).map(r => _prNums(r, _PR_PLAN_N));
  const periods = (await _supaAll(sb, "pr_periods", _PR_PERIOD_COLS)).map(r => _prNums(r, ["id"]));
  const schedules = (await _supaAll(sb, "pr_schedules", _PR_SCHED_COLS)).map(r => _prNums(r, _PR_SCHED_N));
  const leaveTypes = (await _supaAll(sb, "pr_leave_types", _PR_LEAVE_COLS)).map(r => _prNums(r, ["id", "is_paid", "active"]));
  // RosterModal is the only reader of `users` (app.jsx:3984) and it is officer-only, so an
  // employee has no reason to be handed the staff list.
  const users = officer ? (await _supaAll(sb, "erp_users", "id,username,full_name")).map(r => _prNums(r, ["id"])).sort(_prByName) : [];
  if (!officer) {
    employees = myId == null ? [] : employees.filter(e => e.id === myId); // [0] is "me" (app.jsx:4761)
    items = myId == null ? [] : items.filter(i => i.employee_id === myId); // my payslips only (app.jsx:4764)
    plans = myId == null ? [] : plans.filter(p => p.employee_id === myId);
  }
  // The roster keeps inactive staff: PayrollPage filters to active itself (app.jsx:4435) and
  // RosterModal is where `active` gets toggled back on, so filtering here would hide them.
  employees.sort(_prByName);
  periods.sort((a, b) => b.id - a.id); // newest first: periods[0] is the default week (app.jsx:4409/4425)
  // The sidebar badge (app.jsx:7657 -> 7676/7710/7736). An officer reviews discrepancies; an
  // employee reviews payslips waiting on them. The two never collide — the Salary tab is
  // hidden from owner/payroll (app.jsx:7734). The employee half is exactly what SalaryPage
  // counts for its own banner (app.jsx:4765). The officer half is a RECONSTRUCTION: api.php
  // is not in this repo, and "contested" is inferred from the reply flow resetting a line to
  // pending (app.jsx:4508). Confirm against the PHP before trusting the officer count.
  const notifTotal = officer ? items.filter(i => i.status === "contested").length : myId == null ? 0 : items.filter(i => i.status === "pending").length;
  return {
    ok: true,
    employees,
    periods,
    items,
    users,
    plans,
    schedules,
    leaveTypes,
    isOfficer: !!officer,
    myEmployeeId: myId,
    notif: {
      total: notifTotal
    }
  };
}
/* ---- The Save button (pr_save_items) ----
   api.php is not in this repo, so the contract reproduced here is the one the SCREEN states:
   saveGrid (app.jsx:4575) is the only caller, and what it sends is all that is known for sure.
   Three properties of that payload shape this code.

   1. Save sends the WHOLE grid, every time — one item per employee on screen, not just the
      edited row. So this is always a bulk save, and "no rows changed" is a normal outcome.
   2. It sends NO pr_items.id. The grid HAS the id (as _id, app.jsx:4540) and withholds it, so
      (period_id, employee_id) is the only key an item carries and insert-vs-update has to be
      decided here: read the period's rows once, match on employee_id, update those and insert
      the rest. This is an upsert in behaviour but not in SQL — a real .upsert() would need a
      unique index on (period_id, employee_id), and the confirmed schema only promises id as a
      key. Resolving the ids by hand costs a read and assumes nothing about the constraint.
   3. It sends 13 columns. pr_items has 41. The ones it withholds belong to other flows —
      ded_loan/ded_uniform/ded_gov/ded_notes to pr_apply_plans, status/approved_at/
      employee_remark/officer_reply to approval, printed/print_requested to printing, and the
      snap_* trio to whatever snapshots a week. A Save that wrote those would quietly undo the
      flow that owns them, so the list below is a whitelist, not a shorthand. Save must never
      approve a line it is only meant to store.

   gross/net are the one deliberate exception: not sent, but written anyway, because they are
   denormalised money and nothing else in the Supabase path recomputes them — left alone they
   would sit stale for any report reading the columns directly. The screen never notices (it
   renders prCalc of the live row, app.jsx:4573), which is exactly why a stale column could rot
   unseen. They are computed by CALLING prCalc (app.jsx:3893) rather than restating it, so the
   stored value cannot drift from the displayed one.
   That call needs four inputs Save does not send: ded_loan/ded_uniform/ded_gov (pr_apply_plans
   owns them) and snap_sunday_rest. The grid reads those off the DB row and the employee's
   schedule (app.jsx:4520/4530/4537), so _prSaveCalc reads them the same way — from the row
   being updated, falling back to the employee's schedule for Sunday duty. Skipping that would
   not be a rounding error: net would silently omit every installment deduction, and a
   schedule-B employee (no Sunday rest day) would bank a Sunday that the screen shows as ₱0.

   keep_ids — the employee_ids still on screen — is received and deliberately NOT acted on.
   Its only plausible meaning is "delete this period's rows for anyone not in this list":
   removeRow (app.jsx:4572) drops a row from the grid with no API call of its own, and Save
   reloads (app.jsx:4581) into an effect that rebuilds every employee holding a row for the
   period (app.jsx:4516), so a save is the only thing that could persist a removal. But that
   is an inference about a DELETE, and the guards are exactly the part that can't be inferred:
   whether api.php refuses to drop an approved, locked or printed line is unknowable from here,
   and a blind delete would erase an approved payslip on the next Save. So removal does not
   stick yet — the row returns on reload. That is a visible, recoverable wrong; deleting a pay
   line api.php would have kept is not. Deletion lands as its own change, once the rule is known. */
const _PR_SAVE_NUM = ["per_day", "att_present", "att_absent", "att_leave", "att_halfday", "ot_hours", "sun_days", "add_incentive", "ded_manual"];
// prNum (app.jsx:3878) is every number the grid renders, so a value has to land in the column
// the same way the screen will read it back out. It sits ~3000 lines below this one, which is
// fine: nothing here runs until API() is called and the whole script has evaluated. prCalc
// below is reached across the same gap for the same reason — one rule, one copy.
const _prSaveRow = it => {
  const out = {};
  _PR_SAVE_NUM.forEach(c => {
    if (it[c] !== undefined) out[c] = prNum(it[c]);
  });
  // leave_type_id arrives as a literal null (app.jsx:4579): null is the VALUE, not a missing
  // field. prNum would turn it into 0 and point the row at leave type #0.
  if (it.leave_type_id !== undefined) out.leave_type_id = it.leave_type_id == null ? null : Number(it.leave_type_id);
  // The grid guarantees both of these are strings (app.jsx:4538/4539); the null check is for a
  // caller that isn't the grid, so a text column never takes the string "null".
  if (it.ded_manual_note !== undefined) out.ded_manual_note = it.ded_manual_note == null ? "" : String(it.ded_manual_note);
  if (it.remarks !== undefined) out.remarks = it.remarks == null ? "" : String(it.remarks);
  return out;
};
// gross/net exactly as the screen shows them: rebuild the row prCalc would have seen, then let
// prCalc do the arithmetic. `db` is the pr_items row being updated ({} for a draft, which is
// what the grid does too — app.jsx:4537 defaults a draft's deductions to 0).
const _prSaveCalc = (it, db, emp, schedById) => {
  const sched = emp && schedById[Number(emp.schedule_id)] || {};
  // Same precedence as the grid (app.jsx:4530) and prSundayRest (app.jsx:3888): the row's own
  // snapshot wins, else the employee's schedule, else 1 (has Sunday duty).
  const sundayRest = db.snap_sunday_rest != null ? db.snap_sunday_rest : sched.sunday_is_restday != null ? sched.sunday_is_restday : 1;
  const c = prCalc({
    per_day: it.per_day,
    att_present: it.att_present,
    att_halfday: it.att_halfday,
    att_leave: it.att_leave,
    leave_paid: db.leave_paid,
    ot_hours: it.ot_hours,
    sun_days: it.sun_days,
    add_incentive: it.add_incentive,
    ded_manual: it.ded_manual,
    ded_loan: db.ded_loan,
    ded_uniform: db.ded_uniform,
    ded_gov: db.ded_gov,
    snap_sunday_rest: sundayRest // already resolved, so prSundayRest takes it as-is
  });
  return {
    gross: c.gross,
    net: c.net
  };
};
// A save is a row-at-a-time loop with nothing transactional around it, so "the save failed" and
// "nothing was written" are two different claims and only one of them is usually true. An
// officer told a save stopped needs to know which line stopped it and whether the lines before
// it already landed — "nothing was saved" would send them re-entering work that is already in
// the database, and on payroll that is how a week gets paid twice.
const _prSaveStopped = (eid, empById, written, why) => {
  const who = empById[eid] && empById[eid].full_name || "employee #" + eid;
  const before = written === 0 ? " Nothing was saved." : written === 1 ? " The line before it was already saved, so this week is now part-saved." : " The " + written + " lines before it were already saved, so this week is now part-saved.";
  return {
    ok: false,
    error: "Save stopped at " + who + " — " + why + before
  };
};
async function _supaSaveItems(payload) {
  const sb = window.SB;
  const periodId = Number(payload && payload.period_id || 0);
  if (!periodId) return {
    ok: false,
    error: "Missing period_id"
  };
  // A locked week is frozen for everyone, and this is where that is true. The grid disables
  // its inputs as well, but that is only a courtesy to the officer: the buttons are the one
  // layer a caller can skip, so the freeze has to live on the write path or it isn't a freeze.
  // First check on purpose — nothing below may run for a locked period.
  const {
    data: per,
    error: perErr
  } = await sb.from("pr_periods").select("status").eq("id", periodId).maybeSingle();
  if (perErr) return {
    ok: false,
    error: perErr.message
  };
  // No row: the week was deleted mid-edit, or the id is wrong. Either way the lock state is
  // unknown, and unknown must not read as unlocked — that is the whole point of the guard.
  if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };
  if (per.status === "locked") return {
    ok: false,
    error: "This payroll period is locked and cannot be edited. Ask the superadmin to unlock it first."
  };
  const items = payload && payload.items || [];
  if (!items.length) return {
    ok: true
  };
  // This read does double duty: it resolves the ids Save doesn't send, and it supplies the
  // prCalc inputs Save doesn't send either (the deductions pr_apply_plans owns, and the
  // Sunday-rest snapshot).
  const {
    data: existing,
    error: readErr
  } = await sb.from("pr_items").select("id,employee_id,leave_paid,ded_loan,ded_uniform,ded_gov,snap_sunday_rest").eq("period_id", periodId);
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  const dbByEmp = {};
  (existing || []).forEach(r => {
    dbByEmp[Number(r.employee_id)] = r;
  });
  // Sunday duty for a row with no snapshot of its own falls back to the employee's schedule,
  // which is where the grid gets it (app.jsx:4520). Both tables are tiny.
  const [emps, scheds] = await Promise.all([sb.from("pr_employees").select("id,schedule_id,full_name"),
  // full_name only so a refused row can name itself
  sb.from("pr_schedules").select("id,sunday_is_restday")]);
  if (emps.error) return {
    ok: false,
    error: emps.error.message
  };
  if (scheds.error) return {
    ok: false,
    error: scheds.error.message
  };
  const empById = {},
    schedById = {};
  (emps.data || []).forEach(e => {
    empById[Number(e.id)] = e;
  });
  (scheds.data || []).forEach(s => {
    schedById[Number(s.id)] = s;
  });
  // updated_at is timestamptz, so it takes a real UTC instant. _stamp() is the repo's
  // display-string helper (local time, no zone) — Postgres would read that as UTC and land the
  // row 8 hours off in PH.
  const stamp = new Date().toISOString();
  // Sequential on purpose. Nothing here spans a transaction the way api.php's single request
  // could, so a failure halfway leaves the week half-written either way — and in that case the
  // officer needs to know WHICH row stopped it, which a parallel fan-out muddies. A week is one
  // row per employee, so this stays in the dozens of round trips.
  let written = 0;
  for (const it of items) {
    const eid = Number(it.employee_id);
    if (!eid) continue;
    const db = dbByEmp[eid] || {};
    const row = _prSaveRow(it);
    Object.assign(row, _prSaveCalc(it, db, empById[eid], schedById));
    row.updated_at = stamp;
    const id = db.id;
    // .select() is what turns a silent refusal into a reportable one. Postgres does not error
    // when an RLS USING policy hides a row from an UPDATE — PostgREST answers 200 with an empty
    // array — so `error` stays null and a write that never happened looks exactly like a write
    // that did. Asking for the affected rows back is the only way to tell the two apart.
    const {
      data: hit,
      error
    } = id != null ? await sb.from("pr_items").update(row).eq("id", id).select("id") : await sb.from("pr_items").insert({
      ...row,
      period_id: periodId,
      employee_id: eid
    }).select("id");
    if (error) return _prSaveStopped(eid, empById, written, error.message);
    if (!hit || !hit.length) {
      return _prSaveStopped(eid, empById, written, "the database refused the write. The week may be locked, or your account may not have permission to edit it.");
    }
    written++;
  }
  return {
    ok: true
  };
}
/* ---- Unlock a locked week (superadmin only) ----
   The companion to the freeze in _supaSaveItems. 'locked' is only ever reached from
   'published' — the Lock button renders for no other status (app.jsx:4782) — so unlocking
   returns the week to 'published', the state it came from. Not 'draft': that would bring back
   "Publish & notify", and publishing a week that employees have already approved would reset
   their lines to pending and wipe those approvals. Unlock is meant to reopen a week for a
   correction, not to un-publish it, so published_at is left alone as well.

   THIS IS NOT A SECURITY BOUNDARY. It runs in the browser, and RLS currently lets any signed-in
   user write pr_periods, so anyone who can open a console can do exactly what this refuses:
     window.SB.from('pr_periods').update({ status: 'published' }).eq('id', 3)
   The check below stops the wrong button being pressed; it cannot stop an intent. Restricting
   unlock for real needs an RLS policy on pr_periods (and pr_items) that admits only the owner —
   without it the lock freeze itself is bypassable the same way. That policy is the next task.

   The owner test is ME.role === "owner", which is what the app already uses for every other
   owner-only action, including the two other destructive ones — the "Delete all" buttons at
   app.jsx:3293 and 6765. There is no username on ME to test instead (app.jsx:448), and the
   superadmin is the only account holding that role. */
async function _supaUnlock(payload) {
  const sb = window.SB;
  if (!ME || ME.role !== "owner") return {
    ok: false,
    error: "Only the superadmin can unlock a payroll period."
  };
  const periodId = Number(payload && payload.id || 0);
  if (!periodId) return {
    ok: false,
    error: "Missing id"
  };
  const {
    data: per,
    error: readErr
  } = await sb.from("pr_periods").select("status").eq("id", periodId).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };
  // Refusing a week that isn't locked is the point, not a formality: writing 'published'
  // blindly would PUBLISH a draft — notifying employees for a week nobody has finished.
  if (per.status !== "locked") return {
    ok: false,
    error: "This payroll period is not locked."
  };
  // Same reason as the save loop: an RLS USING policy hides the row rather than raising, so
  // without asking for the affected rows back a refused unlock would report "Week unlocked"
  // while the week stayed locked. That is the exact policy about to land on this table, so this
  // is the one call site where the blind spot is not hypothetical.
  const {
    data: hit,
    error
  } = await sb.from("pr_periods").update({
    status: "published"
  }).eq("id", periodId).select("id");
  if (error) return {
    ok: false,
    error: error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Unlock was blocked — the week is still locked. Your account may not have permission to unlock it."
  };
  return {
    ok: true
  };
}
/* ---- Publish a draft week (pr_publish) ----
   publish (app.jsx:4797) saves the grid first, then sends { id }. Two writes, because the screen
   needs both: every pr_items row for the week to status 'pending', and the period to 'published'.

   WHY THE ITEMS WRITE IS NOT OPTIONAL. The employee's payslip list does not filter on the
   period's status — _supaPayroll narrows an employee's rows by employee_id and nothing else
   (app.jsx:723) — so a draft week's card is already on their screen. What publishing changes is
   whether the line is ACTIONABLE: Approve/Contest render only for 'pending' (app.jsx:5110), the
   review banner counts 'pending' (app.jsx:5079) and so does the sidebar badge (app.jsx:738), and
   PrStatusChip knows three statuses and draws anything else as "—" (app.jsx:4164). Flip only the
   period and the employee is handed a payslip with no way to approve it.

   ITEMS FIRST, PERIOD LAST. Nothing here spans a transaction — the same gap _supaSaveItems lives
   with — so the order is the only safety on offer. If the lines are refused the period never
   flips, and the officer still has "Publish & notify" to try again. The reverse order publishes a
   week nobody can act on.

   The residue ordering cannot remove: because the employee UI keys off the ITEM status, a failure
   at the period flip leaves the lines already reviewable while the officer still sees a draft.
   That is the better half of a bad trade — the work done and the flag missing, rather than the
   flag set over work that never happened — but it is not nothing, and the message below says so
   instead of implying the publish simply didn't happen.

   REPUBLISHING RESETS APPROVALS. That is the confirmed behaviour, and it is why _supaUnlock
   returns a week to 'published' and never 'draft' (app.jsx:907): a second publish sets every line
   back to 'pending' and wipes what employees already approved. The draft-only precondition below
   is what keeps that reachable only on purpose.

   THE ROLE CHECK IS NOT A SECURITY BOUNDARY — same as _supaUnlock (app.jsx:912), and RLS is the
   one that counts: Piece B v2 admits is_owner() OR is_payroll() for draft->published. It is here
   because the two writes are not atomic. Without it an ineligible account sets every line to
   'pending' and only THEN gets refused on the period, notifying every employee about a week that
   never published. The database cannot prevent that; refusing before the first write can.

   It reads ME.role directly rather than can("payroll"), and the difference is real: can() also
   returns true for anyone GRANTED payroll access in Settings (app.jsx:265 via _hasPerms), while
   the database's is_payroll() reads erp_users.role. A granted admin passes can() and is still
   refused 42501 by Postgres — the client check has to ask the same question the policy asks. */
async function _supaPublish(payload) {
  const sb = window.SB;
  if (!ME || ME.role !== "owner" && ME.role !== "payroll") {
    return {
      ok: false,
      error: "Only the superadmin or the payroll officer can publish a week."
    };
  }
  const periodId = Number(payload && payload.id || 0);
  if (!periodId) return {
    ok: false,
    error: "Missing id"
  };
  const {
    data: per,
    error: readErr
  } = await sb.from("pr_periods").select("status").eq("id", periodId).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };
  // Draft only, and not as a formality: on a published week this would reset every line to
  // 'pending', and on a locked one it would do that to the approvals the lock exists to protect.
  if (per.status !== "draft") {
    return {
      ok: false,
      error: per.status === "published" ? "This week is already published. Publishing it again would reset every payslip to Awaiting Review and wipe the approvals employees have already given." : "Only a draft week can be published. This one is " + per.status + "."
    };
  }
  // How many lines SHOULD move. Without this, the zero-rows check below cannot tell "the database
  // refused every row" from "this week has no lines at all" — the update is filtered by period_id
  // rather than by a resolved id, so zero is ambiguous here in a way _supaSaveItems' per-row
  // write never is.
  const {
    data: before,
    error: cntErr
  } = await sb.from("pr_items").select("id").eq("period_id", periodId);
  if (cntErr) return {
    ok: false,
    error: cntErr.message
  };
  const expected = (before || []).length;
  if (!expected) return {
    ok: false,
    error: "This week has no pay lines to publish. Add employees to the week and save it first."
  };
  // .select() for the reason it is everywhere else in this file: an RLS USING policy hides rows
  // rather than raising, so a refused update is 200 with an empty array and `error` stays null.
  const {
    data: hitItems,
    error: itemsErr
  } = await sb.from("pr_items").update({
    status: "pending"
  }).eq("period_id", periodId).select("id");
  if (itemsErr) return {
    ok: false,
    error: "Publish stopped — the database refused to update this week's pay lines: " + itemsErr.message + " The week was NOT published."
  };
  const moved = (hitItems || []).length;
  if (!moved) return {
    ok: false,
    error: "Publish stopped — the database refused to update this week's pay lines. Your account may not have permission. The week was NOT published and nothing changed."
  };
  // A partial is possible in principle: RLS filters an UPDATE row by row, so some lines can move
  // while others stay hidden. Reporting "published" over that would be wrong in both directions.
  if (moved < expected) {
    return {
      ok: false,
      error: "Publish stopped — " + moved + " of " + expected + " pay lines were set to Awaiting Review before the database refused the rest. The week was NOT published; fix the permission and publish again."
    };
  }
  // Only now the period. Piece B v2 refuses this with a WITH CHECK, which RAISES 42501 rather
  // than hiding the row, so `error` is the branch that actually fires here — the live RLS test
  // confirmed it. The zero-rows branch is what a USING policy would do, and both stay because
  // this table is one policy edit away from either.
  const {
    data: hit,
    error
  } = await sb.from("pr_periods").update({
    status: "published"
  }).eq("id", periodId).select("id");
  const stranded = " This week's pay lines are already set to Awaiting Review, so employees can see them, but the week still shows as a draft — ask the payroll officer or the superadmin to publish it.";
  if (error) {
    return {
      ok: false,
      error: (error.code === "42501" ? "You don't have permission to publish this week." : "Publishing the week failed: " + error.message) + stranded
    };
  }
  if (!hit || !hit.length) return {
    ok: false,
    error: "Publishing the week was refused — your account may not have permission." + stranded
  };
  return {
    ok: true
  };
}
/* ---- Lock a published week as final (pr_lock) ----
   lockWeek (app.jsx:4986) sends { id }. One write, unlike _supaPublish — the lines do not move,
   only the period does. What makes this handler interesting is the precondition, not the write.

   EVERY LINE MUST BE APPROVED. Locking is the end of the week: _supaSaveItems refuses to edit a
   locked period, so a line left 'pending' at lock time is frozen with nobody having agreed to it,
   and the employee's Approve button is gone (the review gate is published-only, app.jsx:_prReviewGate).
   A contested line is worse — it is an open dispute, and locking would freeze the disagreement
   with no path to answer it except an owner unlock. So the count is the guard, and the message
   names what is outstanding rather than saying "no".

   THIS IS NOT A MIRROR OF _supaUnlock, and the asymmetry is deliberate rather than an oversight.
   Unlock is owner-only in this app (app.jsx:925). Piece B v2 lets a PAYROLL officer lock — its
   WITH CHECK admits is_payroll() for a status change to 'published' or 'locked' when the week is
   not already locked. So payroll can lock a week it then cannot unlock. That is the policy working
   as designed (tests/rls-live.mjs cases 5 and 7 prove both halves against the real database), and
   the button gate follows the DATABASE rather than _supaUnlock's shape.

   No role check here, and that is also deliberate. _supaPublish has one because its two writes are
   not atomic and an ineligible caller would strand the lines at 'pending'. This writes once: a
   refusal costs nothing, leaves nothing behind, and RLS is the thing that decides. The button gate
   below stops the wrong button being offered; 42501 is what stops the intent. */
async function _supaLock(payload) {
  const sb = window.SB;
  const periodId = Number(payload && payload.id || 0);
  if (!periodId) return {
    ok: false,
    error: "Missing id"
  };
  const {
    data: per,
    error: readErr
  } = await sb.from("pr_periods").select("status").eq("id", periodId).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };
  // Published only. A draft has not been shown to anyone — locking it would freeze a week no
  // employee has ever seen, with no way back except an owner unlock, which returns it to
  // 'published' (app.jsx:907) and would publish it for the first time by accident.
  if (per.status !== "published") {
    return {
      ok: false,
      error: per.status === "locked" ? "This week is already locked." : "Only a published week can be locked. This one is " + per.status + "."
    };
  }
  const {
    data: items,
    error: itemsErr
  } = await sb.from("pr_items").select("id,status").eq("period_id", periodId);
  if (itemsErr) return {
    ok: false,
    error: itemsErr.message
  };
  const rows = items || [];
  if (!rows.length) return {
    ok: false,
    error: "This week has no pay lines to lock."
  };
  // Anything not 'approved' blocks the lock. Counting pending and contested separately because
  // they need different things from the officer: pending is waiting on an employee, contested is
  // waiting on the officer's own reply. "Some lines aren't approved" would send them hunting.
  const pending = rows.filter(r => r.status === "pending").length;
  const contested = rows.filter(r => r.status === "contested").length;
  const other = rows.filter(r => r.status !== "approved" && r.status !== "pending" && r.status !== "contested").length;
  if (pending || contested || other) {
    const parts = [];
    if (pending) parts.push(pending + " line" + (pending === 1 ? " is" : "s are") + " still awaiting review");
    if (contested) parts.push(contested + (contested === 1 ? " is contested" : " are contested"));
    // A line with no status at all is a published week whose lines never moved — worth naming
    // rather than folding into "not approved", because it means something upstream went wrong.
    if (other) parts.push(other + " ha" + (other === 1 ? "s" : "ve") + " no review status at all");
    return {
      ok: false,
      error: "Can't lock yet — " + parts.join(" and ") + ". Every line must be approved first."
    };
  }
  const {
    data: hit,
    error
  } = await sb.from("pr_periods").update({
    status: "locked"
  }).eq("id", periodId).select("id");
  if (error) {
    return {
      ok: false,
      error: error.code === "42501" ? "You don't have permission to lock this week." : "Locking the week failed: " + error.message
    };
  }
  if (!hit || !hit.length) return {
    ok: false,
    error: "Locking the week was refused — your account may not have permission. The week is still published."
  };
  return {
    ok: true
  };
}
/* ---- Create or edit a period (pr_save_period) ----
   PeriodModal.save (app.jsx:4569) sends { id, label, pay_date, notes }. The id is undefined for a
   New week and set for an Edit, so the same action does both — and the caller already reads the id
   back (`if (r && r.id) id = r.id`, app.jsx:4574) to select the week it just made.

   status is not in the payload and must never be taken from one. A new week is always 'draft', and
   an edit leaves status exactly where it is — the lifecycle transitions (publish / lock / unlock)
   are the only things that move it, each with its own policy. Accepting a client status here would
   let the create form publish a week, skipping the every-line-approved gate that _supaLock exists
   to enforce. The column list is a whitelist for the same reason _supaSaveItems keeps one
   (app.jsx:757): the three fields the form owns, and nothing it doesn't.

   RLS: pr_periods_insert admits any authenticated user and the button gates by role; an edit is a
   non-status UPDATE, which pr_periods_update allows for anyone precisely because status is
   untouched, so its WITH CHECK passes. */
const _PR_PERIOD_SAVE_COLS = ["label", "pay_date", "notes"];
function _prPeriodFields(payload) {
  const out = {};
  for (const c of _PR_PERIOD_SAVE_COLS) {
    if (payload[c] !== undefined) out[c] = payload[c] == null ? null : String(payload[c]);
  }
  return out;
}
async function _supaSavePeriod(payload) {
  const sb = window.SB;
  const p = payload || {};
  const fields = _prPeriodFields(p);
  const id = Number(p.id || 0);
  if (id) {
    // Edit: the three columns only. status stays put, so this is the "new status equals the old"
    // path through pr_periods_update's WITH CHECK.
    const {
      data: hit,
      error
    } = await sb.from("pr_periods").update(fields).eq("id", id).select("id");
    if (error) return {
      ok: false,
      error: "Could not save the week: " + error.message
    };
    if (!hit || !hit.length) return {
      ok: false,
      error: "Saving the week was refused, or it no longer exists. Reload and try again."
    };
    return {
      ok: true,
      id
    };
  }
  // Create: status is forced, never read from the client.
  const {
    data: hit,
    error
  } = await sb.from("pr_periods").insert({
    ...fields,
    status: "draft"
  }).select("id");
  if (error) return {
    ok: false,
    error: "Could not create the week: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Creating the week was refused by the database. Nothing was added."
  };
  return {
    ok: true,
    id: hit[0].id
  };
}
/* ---- Delete a period and its lines (pr_delete_period) — DESTRUCTIVE, order matters ----
   delPeriod (app.jsx:5055) sends { id }, behind a confirm that names the week.

   THERE IS NO FOREIGN KEY from pr_items to pr_periods, so deleting the period does NOT cascade.
   The lines have to go first and by hand, or they are orphaned — pay rows pointing at a period id
   that no longer exists, invisible to every screen and impossible to clean up through the app.

   ITEMS FIRST, PERIOD LAST, and if the items delete is refused the period must stay. An orphaned
   pay line is worse than a stuck week: the week can be deleted again once permission is sorted,
   but an orphan has lost the only handle anything had on it. So a refusal on the lines aborts
   before the period is touched, and the "period had rows but zero came back" case counts as a
   refusal — same reason _supaSaveItems asks for the affected rows back (app.jsx:888).

   Zero items is legitimate, though: a New week that was never Saved has no lines. Counting first
   is what tells an empty draft apart from a blocked delete — without it the two are the same 200
   with an empty array, and an empty draft could never be deleted.

   RLS: pr_periods_delete admits (owner OR payroll) AND status<>'locked'; pr_items_write (Piece C,
   FOR ALL) lets owner+payroll delete non-locked items. The status guard below refuses a locked
   week before either delete, so a locked week never loses its lines even if the period delete
   would have been refused anyway. */
async function _supaDeletePeriod(payload) {
  const sb = window.SB;
  const periodId = Number(payload && payload.id || 0);
  if (!periodId) return {
    ok: false,
    error: "Missing id"
  };
  const {
    data: per,
    error: readErr
  } = await sb.from("pr_periods").select("status").eq("id", periodId).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };
  // Locked first, before anything is deleted. A locked week is final; deleting it would erase
  // approved payslips, and RLS refuses it anyway — but the client must not remove the LINES on the
  // way to discovering that, so this check has to precede the items delete.
  if (per.status === "locked") return {
    ok: false,
    error: "A locked week can't be deleted. Unlock it first (owner only)."
  };
  // How many lines SHOULD go, so a zero-rows delete can be read as a refusal rather than an empty
  // draft.
  const {
    data: before,
    error: cntErr
  } = await sb.from("pr_items").select("id").eq("period_id", periodId);
  if (cntErr) return {
    ok: false,
    error: cntErr.message
  };
  const expected = (before || []).length;
  if (expected) {
    const {
      data: goneItems,
      error: itemsErr
    } = await sb.from("pr_items").delete().eq("period_id", periodId).select("id");
    if (itemsErr) return {
      ok: false,
      error: "Delete stopped — the database refused to remove this week's pay lines: " + itemsErr.message + " The week was NOT deleted."
    };
    const removed = (goneItems || []).length;
    if (!removed) return {
      ok: false,
      error: "Delete stopped — the database refused to remove this week's pay lines. Your account may not have permission. The week was NOT deleted and nothing changed."
    };
    if (removed < expected) {
      // Partial: RLS filtered the delete row by row. The week is now inconsistent, so stop and say
      // so rather than deleting the period over a half-emptied line set.
      return {
        ok: false,
        error: "Delete stopped — " + removed + " of " + expected + " pay lines were removed before the database refused the rest. The week was NOT deleted; fix the permission and delete again."
      };
    }
  }
  // Only now the period. If this is refused after the lines are gone, say plainly that the lines
  // were removed but the week remains — the same honesty _supaPublish uses when its two writes
  // half-land.
  const stranded = expected ? " This week's pay lines were already removed, so the week is empty but still listed — delete it again once the permission is sorted." : "";
  const {
    data: gone,
    error
  } = await sb.from("pr_periods").delete().eq("id", periodId).select("id");
  if (error) return {
    ok: false,
    error: "Deleting the week failed: " + error.message + stranded
  };
  if (!gone || !gone.length) return {
    ok: false,
    error: "Deleting the week was refused — your account may not have permission." + stranded
  };
  return {
    ok: true
  };
}
/* ---- The review pair (pr_item_approve / pr_item_contest) ----
   The employee's two buttons on their own payslip (app.jsx:5162/5163), and — new — the officer's
   single-row Approve on the grid. Approve sends { id }; Contest sends { id, remark }.

   The two actions ask the SAME four questions of the same row in the same order and diverge only
   on what they write, so the questions live in one place. Two copies of a permission check is how
   one of them quietly loses a clause.

   Guard order is deliberate: exists -> published -> pending -> permission. Permission last means
   a stranger probing someone else's line learns its status before being refused — which sounds
   like a leak and is not one here, because RLS already lets any signed-in user READ every pr_
   table (app.jsx:671). They can read the row directly. When Piece C lands and that stops being
   true, this order should be revisited.

   PERMISSION IS AN APP-LEVEL GUARD AND NOTHING MORE — same as _supaUnlock (app.jsx:912) and
   _supaPublish. RLS currently lets any authenticated user write any pr_items row on a non-locked
   period, so this refuses the wrong button, not the intent. Anyone who can open a console can do
   exactly what it stops:
     window.SB.from('pr_items').update({ status: 'approved' }).eq('id', <someone else's line>)
   Real own-row enforcement needs an RLS policy on pr_items keyed to the caller's own employee row
   — Piece C, not this task. Until that lands, "you can only review your own payslip" is a
   statement about this screen and not about the database, and an approval on a line is not
   evidence that the employee named on it is who gave it. On payroll that distinction is the whole
   point of asking for the approval, so it is worth saying plainly rather than trusting the check
   below to mean more than it does. */
// Same resolution _supaPayroll uses (app.jsx:706): bootstrap normally carries it, and the
// fallback re-derives it for a session that signed in before the payroll link existed.
async function _prMyEmployeeId(sb) {
  if (ME && ME.pr_employee_id != null) return Number(ME.pr_employee_id);
  if (!ME || !ME.uid) return null;
  const {
    data
  } = await sb.from("pr_employees").select("id").eq("user_id", ME.uid).eq("active", 1).limit(1);
  return data && data.length ? Number(data[0].id) : null;
}
async function _prReviewGate(sb, itemId) {
  const id = Number(itemId || 0);
  if (!id) return {
    error: "Missing id"
  };
  const {
    data: it,
    error: readErr
  } = await sb.from("pr_items").select("id,employee_id,status,period_id").eq("id", id).maybeSingle();
  if (readErr) return {
    error: readErr.message
  };
  if (!it) return {
    error: "This payslip line no longer exists. Reload the page and try again."
  };
  const {
    data: per,
    error: perErr
  } = await sb.from("pr_periods").select("status").eq("id", it.period_id).maybeSingle();
  if (perErr) return {
    error: perErr.message
  };
  if (!per) return {
    error: "This payslip's week no longer exists. Reload the page and try again."
  };
  // Published only. Publishing is what puts a line up for review and locking is what ends it; a
  // draft has not been shown to anyone yet. This has to live here because no screen enforced it:
  // SalaryPage renders its buttons off the ITEM status alone, so before this guard a LOCKED
  // week's un-approved line still offered an Approve that worked.
  if (per.status !== "published") return {
    error: "This week isn't open for review right now."
  };
  // Pending only, which is what makes an employee's decision one-way. An approved or contested
  // line is decided; only the officer's reply (pr_item_reply, app.jsx:4897) resets it to pending.
  if (it.status !== "pending") return {
    error: "This line has already been reviewed."
  };
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) {
    const myId = await _prMyEmployeeId(sb);
    if (myId == null || Number(it.employee_id) !== myId) return {
      error: "You can only review your own payslip."
    };
  }
  return {
    item: it
  };
}
async function _supaItemApprove(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  const gate = await _prReviewGate(sb, id);
  if (gate.error) return {
    ok: false,
    error: gate.error
  };
  // approved_at is not decoration: the card renders "Approved on <date>" from it (app.jsx:5214)
  // and shows a bare "Approved" without it. toISOString and never _stamp() — the column is
  // timestamptz, and _stamp() is the repo's local-time display string, which Postgres would read
  // as UTC and land 8 hours off in PH.
  const {
    data: hit,
    error
  } = await sb.from("pr_items").update({
    status: "approved",
    approved_at: new Date().toISOString()
  }).eq("id", id).select("id");
  if (error) return {
    ok: false,
    error: "Could not approve this payslip: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Approving this payslip was refused by the database. Nothing changed."
  };
  return {
    ok: true
  };
}
async function _supaItemContest(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  // The Contest UI sends `remark` (app.jsx:5163); the column is employee_remark, which the
  // officer's grid reads back as _emp_remark (app.jsx:4844). The names differ, so the mapping is
  // written down here rather than assumed by whoever reads the payload next.
  const remark = String(payload && payload.remark || "").trim();
  if (!remark) return {
    ok: false,
    error: "Please describe the discrepancy."
  };
  const gate = await _prReviewGate(sb, id);
  if (gate.error) return {
    ok: false,
    error: gate.error
  };
  // approved_at is deliberately left alone: the pending guard means the row is not approved, and
  // this action owns status and the employee's message and nothing else — the same whitelist
  // discipline the save keeps (app.jsx:757).
  const {
    data: hit,
    error
  } = await sb.from("pr_items").update({
    status: "contested",
    employee_remark: remark
  }).eq("id", id).select("id");
  if (error) return {
    ok: false,
    error: "Could not send this to the payroll office: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "The database refused to record this discrepancy. Nothing changed."
  };
  return {
    ok: true
  };
}
async function _supaItemReply(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  // The Reply UI sends `reply` (app.jsx:5157); the column is officer_reply, which the employee's
  // card renders back as "Payroll office: …" (app.jsx:5482) and the officer's grid reads as _reply
  // (app.jsx:5105). Blank is refused before any lookup — the same discipline contest keeps for an
  // empty remark (app.jsx:1275): a reply with nothing in it must never reopen a line.
  const reply = String(payload && payload.reply || "").trim();
  if (!reply) return {
    ok: false,
    error: "Please write a reply before sending."
  };
  const {
    data: it,
    error: readErr
  } = await sb.from("pr_items").select("id,status,period_id").eq("id", id).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!it) return {
    ok: false,
    error: "This payslip line no longer exists. Reload the page and try again."
  };
  // Reply is the contested-line path and nothing else. A pending line has not been questioned and
  // an approved one is decided; only 'contested' has something to answer, and answering it is what
  // resets it to pending below. Without this guard a reply could quietly reopen a settled line.
  if (it.status !== "contested") return {
    ok: false,
    error: "You can only reply to a contested line."
  };
  // Officer-only, and this app check is load-bearing. RLS Piece C already lets owner/payroll write
  // any non-locked pr_items row, so the database backs THEM here — but that same policy does not
  // stop an ordinary employee from writing officer_reply on their OWN row, so nothing in the DB
  // refuses a self-serve "reply". True enforcement would need a column-level rule; until that
  // exists this is the only thing standing between an employee and answering on the office's behalf.
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can reply."
  };
  // A contested line should not exist on a locked week, but guard anyway: locking ends a week and
  // only an owner-unlock reopens it (see _supaUnlock). A reply resets the line to pending, so on a
  // locked week it would be a second, un-gated way back into an editable state — refuse it.
  const {
    data: per,
    error: perErr
  } = await sb.from("pr_periods").select("status").eq("id", it.period_id).maybeSingle();
  if (perErr) return {
    ok: false,
    error: perErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payslip's week no longer exists. Reload the page and try again."
  };
  if (per.status === "locked") return {
    ok: false,
    error: "This week is locked; unlock it first."
  };
  // Owns exactly two columns: the reply text and the reset to pending for re-approval. approved_at,
  // the employee's remark and every deduction are left untouched — the same whitelist discipline
  // approve/contest/save keep (app.jsx:757).
  const {
    data: hit,
    error
  } = await sb.from("pr_items").update({
    officer_reply: reply,
    status: "pending"
  }).eq("id", id).select("id");
  if (error) return {
    ok: false,
    error: "Could not send this reply: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Sending this reply was refused by the database. Nothing changed."
  };
  return {
    ok: true
  };
}
// The print pair. Both write a single boolean flag on pr_items and nothing else. They are kept
// deliberately in step with RLS Piece A (is_owner() OR (period NOT locked AND (is_payroll() OR
// item_is_mine()))) rather than trying to out-argue it: no database change, so the app must refuse
// exactly what the policy would refuse, or a button offers a write the DB then rejects.
// print_requested/printed are smallint 0/1 flags (confirmed against the live column type), so the
// set value is the number 1, not boolean true — PostgREST would reject `true` for a smallint. They
// are left out of _PR_ITEM_N's numeric coercion (app.jsx:695), but the grid reads them as plain
// truthy values (1 truthy, 0 falsy), so the (_print_req && !_printed) attention filter is unaffected.
async function _supaRequestPrint(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  if (!id) return {
    ok: false,
    error: "Missing id"
  };
  const {
    data: it,
    error: readErr
  } = await sb.from("pr_items").select("id,employee_id,period_id").eq("id", id).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!it) return {
    ok: false,
    error: "This payslip line no longer exists. Reload the page and try again."
  };
  const {
    data: per,
    error: perErr
  } = await sb.from("pr_periods").select("status").eq("id", it.period_id).maybeSingle();
  if (perErr) return {
    ok: false,
    error: perErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payslip's week no longer exists. Reload the page and try again."
  };
  // Pre-lock only. A hard-copy request is raised while the week is still open, and RLS would block a
  // non-owner on a locked row anyway (Piece A) — so refusing here keeps the app honest with the DB
  // instead of letting the button 42501. Deliberately NOT gated on item status: any line may be
  // requested, approved or not.
  if (per.status === "locked") return {
    ok: false,
    error: "This week is locked; hard-copy requests are made before it's locked."
  };
  // The row's own employee, or an officer. Same shape as _prReviewGate (app.jsx:1246): the officer
  // path needs no payroll row, an employee must match the line's employee_id, and a null id can
  // never match a row.
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) {
    const myId = await _prMyEmployeeId(sb);
    if (myId == null || Number(it.employee_id) !== myId) return {
      ok: false,
      error: "You can only request a hard copy of your own payslip."
    };
  }
  // Owns exactly one column — the request flag. `printed` and everything else are left untouched.
  const {
    data: hit,
    error
  } = await sb.from("pr_items").update({
    print_requested: 1
  }).eq("id", id).select("id");
  if (error) return {
    ok: false,
    error: "Could not send this request: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Sending this request was refused by the database. Nothing changed."
  };
  return {
    ok: true
  };
}
async function _supaMarkPrinted(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  if (!id) return {
    ok: false,
    error: "Missing id"
  };
  const {
    data: it,
    error: readErr
  } = await sb.from("pr_items").select("id,employee_id,period_id").eq("id", id).maybeSingle();
  if (readErr) return {
    ok: false,
    error: readErr.message
  };
  if (!it) return {
    ok: false,
    error: "This payslip line no longer exists. Reload the page and try again."
  };
  const {
    data: per,
    error: perErr
  } = await sb.from("pr_periods").select("status").eq("id", it.period_id).maybeSingle();
  if (perErr) return {
    ok: false,
    error: perErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payslip's week no longer exists. Reload the page and try again."
  };
  // Owner or payroll — but on a LOCKED week only the owner, mirroring RLS Piece A exactly: a locked
  // row is writable by is_owner() alone, so a payroll write would come back 42501. is_owner() is
  // unconditional; is_payroll() only while the week is not locked. Not gated on item status.
  const isOwner = !!ME && ME.role === "owner";
  const isPayroll = !!ME && ME.role === "payroll";
  if (!isOwner && !(isPayroll && per.status !== "locked")) {
    return {
      ok: false,
      error: isPayroll ? "This week is locked — only the superadmin can mark it printed." : "Only the payroll office can mark a payslip printed."
    };
  }
  // Owns exactly one column — the printed flag. It supersedes print_requested in both grids
  // (app.jsx:5219/5543), so the request flag is deliberately left as-is rather than cleared.
  const {
    data: hit,
    error
  } = await sb.from("pr_items").update({
    printed: 1
  }).eq("id", id).select("id");
  if (error) {
    // A payroll user who reached a locked-row write despite the gate lands here with 42501 — name
    // the real cause rather than surfacing the raw policy error.
    if (error.code === "42501" && isPayroll) return {
      ok: false,
      error: "This week is locked — only the superadmin can mark it printed."
    };
    return {
      ok: false,
      error: "Could not mark this printed: " + error.message
    };
  }
  if (!hit || !hit.length) return {
    ok: false,
    error: "Marking this printed was refused by the database. Nothing changed."
  };
  return {
    ok: true
  };
}
// Day-off is a pure LABEL: everyone works six days and the seventh is handled as OT, so day_off
// feeds no pay math. This writes pr_employees.day_off and NOTHING else — no pr_items, no recompute.
async function _supaSetDayoff(payload) {
  const sb = window.SB;
  const employeeId = Number(payload && payload.employee_id || 0);
  if (!employeeId) return {
    ok: false,
    error: "Missing employee_id"
  };
  // Owner or payroll only — and this app check is the ONLY thing restricting the write. pr_employees
  // carries a permissive UPDATE policy: a live probe showed an ordinary technician can update day_off
  // directly, so RLS does not back this the way Piece A/C back pr_items. Until pr_employees gets a
  // role-scoped policy, the app is the enforcement, so the check has to be real, not decorative.
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can change a rest day."
  };
  // The grid offers exactly two values (app.jsx:5453/5514). A label with no pay effect still should
  // not be free-text on the write path, so it is constrained to what the control can produce.
  const dayOff = String(payload && payload.day_off || "");
  if (dayOff !== "sun" && dayOff !== "sat") return {
    ok: false,
    error: "A rest day must be 'sun' or 'sat'."
  };
  // Whitelist: day_off only. Nothing else on the row is touched, and pr_items is never read or
  // written — the label does not change anyone's pay.
  const {
    data: hit,
    error
  } = await sb.from("pr_employees").update({
    day_off: dayOff
  }).eq("id", employeeId).select("id");
  if (error) return {
    ok: false,
    error: "Could not change the rest day: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Changing the rest day was refused by the database. Nothing changed."
  };
  return {
    ok: true
  };
}
/* ---- The roster (pr_save_employee add/edit, pr_delete_employee) ----
   RosterModal's Save (app.jsx:4700) and Delete (app.jsx:4711), both { id }-keyed. Owner or payroll
   only — an app-level guard and nothing more: pr_employees carries a permissive policy (a live probe
   showed an ordinary technician can write it), so this refuses the wrong screen, not the intent. The
   same wide-open policy also governs per_day / schedule_id / active / user_id, which are NOT harmless
   like day_off — a role-scoped policy on pr_employees is the real fix, and it is a separate task. */
async function _supaSaveEmployee(payload) {
  const sb = window.SB;
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can change the roster."
  };
  const fullName = String(payload && payload.full_name || "").trim();
  if (!fullName) return {
    ok: false,
    error: "An employee needs a name."
  };
  // Whitelist the roster columns. day_off is NOT here — it has its own handler (pr_set_dayoff) — and
  // the pay figures live on pr_items, never on the roster row. user_id links an EXISTING erp_users
  // login or none; this never creates a login. The picker's "" (no link) must land as null, not an
  // empty string, or the foreign key rejects it.
  const row = {
    full_name: fullName,
    position: String(payload && payload.position || ""),
    per_day: Number(payload && payload.per_day || 0),
    schedule_id: Number(payload && payload.schedule_id || 1),
    user_id: payload && payload.user_id ? Number(payload.user_id) : null,
    active: payload && payload.active ? 1 : 0
  };
  const id = Number(payload && payload.id || 0);
  if (id) {
    const {
      data: hit,
      error
    } = await sb.from("pr_employees").update(row).eq("id", id).select("id");
    if (error) return {
      ok: false,
      error: "Could not save this employee: " + error.message
    };
    if (!hit || !hit.length) return {
      ok: false,
      error: "Saving this employee was refused by the database. Nothing changed."
    };
    return {
      ok: true,
      id
    };
  }
  // Create: same shape as _supaSavePeriod (app.jsx:1134) — .select("id") returns an array, so the
  // new id is hit[0].id, and the caller stores it so a follow-up edit finds the row (app.jsx:4701).
  const {
    data: hit,
    error
  } = await sb.from("pr_employees").insert(row).select("id");
  if (error) return {
    ok: false,
    error: "Could not add this employee: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Adding this employee was refused by the database. Nothing was added."
  };
  return {
    ok: true,
    id: hit[0].id
  };
}
async function _supaDeleteEmployee(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  if (!id) return {
    ok: false,
    error: "Missing id"
  };
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can change the roster."
  };
  // SOFT delete: mark the roster row inactive, never remove it. A hard delete would orphan the
  // employee's pr_items pay lines — the grid would fall back to "?" for a name it could no longer
  // resolve (app.jsx:5229) and the history would lose the person's name for good. active=0 keeps the
  // row, so past payslips stay named, while dropping them from the new-week grid, which pays only
  // active staff (app.jsx:5216). Reactivation is reachable: the roster lists inactive staff with an
  // Active toggle (app.jsx:4813/4824), so ticking it and saving flips active back to 1. active is
  // smallint, so the value is 0, not false — PostgREST rejects a boolean for a smallint (the same
  // lesson as the print flags). Whitelist active only; pr_items is never touched. .select("id")
  // turns a silent RLS refusal (200 + []) into a reportable one, as the period delete does (1191).
  const {
    data: hit,
    error
  } = await sb.from("pr_employees").update({
    active: 0
  }).eq("id", id).select("id");
  if (error) return {
    ok: false,
    error: "Could not deactivate this employee: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Deactivating this employee was refused by the database — your account may not have permission. Nothing changed."
  };
  return {
    ok: true
  };
}
/* ---- Loan / installment plans (pr_save_plan add/edit, pr_delete_plan) ----
   LoanManagement's Save (via persist), its interest-only toggle, and Delete — the only screen
   that sends either action.

   Owner or payroll, enforced HERE and ONLY here. pr_plans carries the permissive `staff_all`
   policy — verified 2026-07-18 — so the database accepts a plan write from any signed-in staff
   account and refuses nothing. Unlike pr_items (Piece A/C), where RLS is the real freeze and this
   layer only picks the error message, these two guards ARE the access control: delete the officer
   check and any technician can write debts onto a co-worker's payslip. Same standing as
   _supaSaveEmployee against pr_employees. A role-scoped policy on pr_plans is the real fix and is
   a separate task; until then this check is load-bearing, which is why a mutation covers each one.

   A plan is a DEBT INSTRUCTION, not a payment record: pr_apply_plans reads these rows to write the
   weekly ded_* lines on pr_items. So a wrong total_amount or terms_total silently misprices every
   future week, which is why the numbers are validated here and not just in the form. */
async function _supaSavePlan(payload) {
  const sb = window.SB;
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can change a loan plan."
  };
  const employeeId = Number(payload && payload.employee_id || 0);
  if (!employeeId) return {
    ok: false,
    error: "Pick an employee for this loan."
  };
  const kind = String(payload && payload.kind || "").trim();
  if (!kind) return {
    ok: false,
    error: "A loan needs a type."
  };
  // total_amount drives the weekly share (total / terms) and terms_total is its divisor, so a zero
  // or negative either prices the deduction wrong or divides by zero. The form checks both
  // (app.jsx:5115/5121) — repeated here because the form is not the only way in, and a bad plan
  // corrupts every week it is applied to, not just the screen that created it.
  const totalAmount = Number(payload && payload.total_amount || 0);
  if (!(totalAmount > 0)) return {
    ok: false,
    error: "A loan needs a total amount greater than zero."
  };
  const termsTotal = Number(payload && payload.terms_total || 0);
  if (!(termsTotal >= 1)) return {
    ok: false,
    error: "A loan needs at least one weekly term."
  };
  // Whitelist the plan columns. terms_done/paid are NOT here — they are progress, owned by
  // pr_apply_plans, and letting an edit rewrite them would reset or fake a debt's repayment
  // history.
  //
  // per_week IS here, and is always RECOMPUTED from the two numbers just validated above — never
  // read off the payload, on either branch. api.php stores it the same way (round($total/$terms,
  // 2)) and pr_apply_plans reads it back as the weekly share. An earlier version of this handler
  // left the column alone on the grounds that a stored copy of a derived value drifts the moment
  // total_amount or terms_total changes; that worry is real but recomputing on every save answers
  // it directly, whereas omitting the write left every plan created since with no weekly share at
  // all. Taking a client-supplied per_week is the one thing that WOULD let it drift, which is why
  // payload.per_week is not consulted anywhere — a caller cannot set the price of a term
  // independently of the debt it divides. The terms_total >= 1 guard above runs first, so the
  // division cannot be by zero.
  //
  // interest_only and active are smallint (confirmed against the schema, 2026-07-18) like
  // pr_employees.active and the print flags — 0/1, never false/true, which PostgREST rejects for a
  // smallint. The read path already assumes this: both are in _PR_PLAN_N's numeric coercion (700).
  const row = {
    employee_id: employeeId,
    kind,
    category: String(payload && payload.category || "loan"),
    label: String(payload && payload.label || ""),
    total_amount: totalAmount,
    terms_total: termsTotal,
    per_week: _prR2(totalAmount / termsTotal),
    interest_rate: Number(payload && payload.interest_rate || 0),
    interest_only: payload && payload.interest_only ? 1 : 0,
    start_date: payload && payload.start_date ? payload.start_date : null
  };
  const id = Number(payload && payload.id || 0);
  if (id) {
    // Edit carries active through, because this is the path that REACTIVATES a soft-deleted plan:
    // ticking Active on an inactive row and saving flips it back to 1 (app.jsx:5163).
    row.active = payload && payload.active ? 1 : 0;
    const {
      data: hit,
      error
    } = await sb.from("pr_plans").update(row).eq("id", id).select("id");
    if (error) return {
      ok: false,
      error: "Could not save this loan: " + error.message
    };
    if (!hit || !hit.length) return {
      ok: false,
      error: "Saving this loan was refused by the database. Nothing changed."
    };
    return {
      ok: true,
      id
    };
  }
  // Create: a brand-new plan is always active. The form offers an Active tickbox on a new row
  // (app.jsx:5163) and an unticked one would write a debt that silently deducts nothing — the
  // officer would see it listed and wonder why no money moved. A plan that should not run yet has
  // start_date for that. Same .select("id") shape as _supaSaveEmployee (1454): the new id comes
  // back as hit[0].id, and LoanManagement reloads from the database rather than storing it (5109).
  row.active = 1;
  const {
    data: hit,
    error
  } = await sb.from("pr_plans").insert(row).select("id");
  if (error) return {
    ok: false,
    error: "Could not add this loan: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Adding this loan was refused by the database. Nothing was added."
  };
  return {
    ok: true,
    id: hit[0].id
  };
}
async function _supaDeletePlan(payload) {
  const sb = window.SB;
  const id = Number(payload && payload.id || 0);
  if (!id) return {
    ok: false,
    error: "Missing id"
  };
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can change a loan plan."
  };
  // SOFT delete, for the same reason as the roster (1465): a hard delete would destroy the record
  // of a debt that has ALREADY been deducted. The pr_items ded_* lines it produced stay on past
  // payslips either way, so removing the plan would leave money taken off a payslip with nothing
  // left to explain it — an employee asking "what was this ₱250?" could not be answered. active=0
  // stops future weeks deducting (pr_apply_plans reads active plans) while the record survives.
  // Reactivation is reachable: LoanManagement's "Show inactive" reveals the row and ticking Active
  // saves it back to 1 (app.jsx:5163 -> the id branch above). smallint, so 0 and not false.
  // Whitelist active only; pr_items is never touched, so no past deduction is rewritten.
  const {
    data: hit,
    error
  } = await sb.from("pr_plans").update({
    active: 0
  }).eq("id", id).select("id");
  if (error) return {
    ok: false,
    error: "Could not deactivate this loan: " + error.message
  };
  if (!hit || !hit.length) return {
    ok: false,
    error: "Deactivating this loan was refused by the database — your account may not have permission. Nothing changed."
  };
  return {
    ok: true
  };
}
/* ---- Apply installment plans to a week (pr_apply_plans) ----
   The Apply plans button (app.jsx:5483), which saves the grid FIRST and reloads after, so the
   pr_items rows already exist and already hold this week's attendance when this runs.

   This is the handler that turns a debt INSTRUCTION into money actually leaving a payslip.
   pr_save_plan only records what is owed; nothing deducted anything until this existed.

   pr_plan_applied is the ledger that makes it idempotent: one row per (plan, period), carrying
   which term this was. "How many terms has this loan already paid" is a COUNT over that ledger
   excluding the current period, so re-running the button recomputes the same term number and
   rewrites the same figures rather than advancing the loan a second time.

   LEDGER FIRST, PAY LINES SECOND, and the order is a choice about which half-finished state is
   survivable. Nothing here spans a transaction. If the ledger lands and the pay lines do not,
   the term is recorded as collected while no money moved — the borrower underpays by a term and
   the company carries it. If the pay lines land and the ledger does not, the next week counts a
   prior term short and deducts the SAME term again — the borrower is charged twice. Overcharging
   an employee is the worse failure, so the ledger goes first. Either residue is repaired by
   pressing the button again, because both writes are absolute rather than additive. */
const _PR_APPLIED_COLS = "id,plan_id,period_id,term_no,amount";
// Centavos. The weekly share of a debt divides unevenly far more often than not, so every money
// value here is rounded to two places at the point it is computed, not on the way out.
const _prR2 = n => Math.round(n * 100) / 100;
/* A plan's category decides which pr_items column it deducts into. This mapping exists nowhere
   else — the client had kind -> category (PR_KIND_CAT, app.jsx:5005) and category -> a display
   label (PR_CATS), and nothing that reached a column. It keys off CATEGORY rather than kind
   because category is a stored field the officer can override in the plan form (app.jsx:5001),
   so it is the field of record; a kind-keyed mapping would silently ignore that override.
   Everything unmatched falls to ded_loan, which is what carries `other` — the category `fines`
   becomes, and the one with no column of its own. That means a fine and a cash advance share a
   payslip line and ded_notes is the ONLY thing telling them apart, which is what makes the label
   below load-bearing rather than decorative. ded_manual is deliberately not reachable here: it
   is in _PR_SAVE_NUM (app.jsx:787), so the next grid Save would overwrite anything left in it. */
const _PR_CAT_DED = {
  uniform: "ded_uniform",
  government: "ded_gov"
};
const _prDedCol = cat => _PR_CAT_DED[String(cat == null ? "" : cat).toLowerCase()] || "ded_loan";
// Same shape as _prSaveStopped (app.jsx:829) and for the same reason — a loop with nothing
// transactional around it makes "it failed" and "nothing was written" two different claims. The
// wording is its own because "Save stopped at…" would name the wrong button.
const _prApplyStopped = (eid, empById, written, why) => {
  const who = empById[eid] && empById[eid].full_name || "employee #" + eid;
  const before = written === 0 ? " No pay lines were changed." : written === 1 ? " The pay line before it was already updated, so this week is now part-applied." : " The " + written + " pay lines before it were already updated, so this week is now part-applied.";
  return {
    ok: false,
    error: "Apply stopped at " + who + " — " + why + before
  };
};
async function _supaApplyPlans(payload) {
  const sb = window.SB;
  const periodId = Number(payload && payload.period_id || 0);
  if (!periodId) return {
    ok: false,
    error: "Missing period_id"
  };
  // pr_plans and pr_plan_applied are permissive at the database level (verified 2026-07-18), so
  // this check is the access control, not a nicety on top of a policy. pr_items is the one table
  // here RLS really does guard.
  const officer = !!ME && (ME.role === "owner" || ME.role === "payroll");
  if (!officer) return {
    ok: false,
    error: "Only the payroll office can apply installment plans."
  };
  const {
    data: per,
    error: perErr
  } = await sb.from("pr_periods").select("status,pay_date").eq("id", periodId).maybeSingle();
  if (perErr) return {
    ok: false,
    error: perErr.message
  };
  if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };
  // Same freeze, same words as every other write path (app.jsx:849). First check on purpose.
  if (per.status === "locked") return {
    ok: false,
    error: "This payroll period is locked and cannot be edited. Ask the superadmin to unlock it first."
  };
  const published = per.status !== "draft";
  const payDate = per.pay_date || null;
  // Three independent reads. The plans/employees pairing is a JOIN in the source SQL; it is two
  // reads here because a nested select cannot be verified by the fake — a test would pass against
  // a handler that never joined at all — so the tables are read apart and matched by id, exactly
  // as _supaSaveItems does (app.jsx:862).
  const [plansRes, empsRes, itemsRes] = await Promise.all([sb.from("pr_plans").select(_PR_PLAN_COLS).eq("active", 1), sb.from("pr_employees").select("id,full_name,per_day,active"), sb.from("pr_items").select("id,employee_id,gross,ded_loan,ded_uniform,ded_gov,ded_manual,ded_notes,net,status,approved_at").eq("period_id", periodId)]);
  if (plansRes.error) return {
    ok: false,
    error: "Could not read the loan plans: " + plansRes.error.message
  };
  if (empsRes.error) return {
    ok: false,
    error: "Could not read the roster: " + empsRes.error.message
  };
  if (itemsRes.error) return {
    ok: false,
    error: "Could not read this week's pay lines: " + itemsRes.error.message
  };
  const empById = {};
  (empsRes.data || []).forEach(e => {
    empById[e.id] = e;
  });
  const items = itemsRes.data || [];
  // Keyed by employee so a plan can be matched to the row it will deduct from. A plan whose
  // employee has NO pay line this week is skipped entirely, ledger included: writing a ledger row
  // for a deduction that has nowhere to land would record a term as collected while no money ever
  // moved, and the ledger-first ordering above makes that permanent rather than self-repairing.
  const itemByEmp = {};
  items.forEach(it => {
    itemByEmp[it.employee_id] = it;
  });
  // employee_id -> { ded_loan, ded_uniform, ded_gov, notes[] }
  const acc = {};
  const bucket = eid => acc[eid] || (acc[eid] = {
    ded_loan: 0,
    ded_uniform: 0,
    ded_gov: 0,
    notes: []
  });
  for (const p of plansRes.data || []) {
    const eid = Number(p.employee_id);
    const emp = empById[eid];
    if (!emp || !prNum(emp.active)) continue; // WHERE e.active = 1
    if (!itemByEmp[eid]) continue; // no pay line to deduct from
    const termsTotal = Math.trunc(prNum(p.terms_total));
    const totalAmount = prNum(p.total_amount);
    if (termsTotal < 1 || !(totalAmount > 0)) continue; // unusable plan; nothing to divide
    // This plan's whole ledger history. The prior-term count wants "every period but this one",
    // which is a .neq() the fake has no word for, so the filtering and the counting both happen
    // here in JS over the rows the read already returned.
    const {
      data: applied,
      error: appErr
    } = await sb.from("pr_plan_applied").select(_PR_APPLIED_COLS).eq("plan_id", p.id);
    if (appErr) return {
      ok: false,
      error: "Could not read this loan's payment history: " + appErr.message
    };
    const history = applied || [];
    const mine = history.find(r => Number(r.period_id) === periodId) || null;
    // A row that exists for this period but should not — the plan has not started yet, is fully
    // paid, or is interest-only with no interest to take. Dropping it is what lets a week be
    // re-applied after a plan changes underneath it. Nothing to drop is the normal case, so the
    // delete only runs when the read above actually found a row, which also keeps a legitimate
    // zero-rows result from being mistaken for a refusal.
    const dropMine = async () => {
      if (!mine) return null;
      const {
        error
      } = await sb.from("pr_plan_applied").delete().eq("plan_id", p.id).eq("period_id", periodId).select("id");
      return error ? {
        ok: false,
        error: "Could not clear a stale loan entry: " + error.message
      } : null;
    };
    // Not started: a plan dated after this week's pay date takes nothing yet.
    if (p.start_date && payDate && String(p.start_date) > String(payDate)) {
      const bad = await dropMine();
      if (bad) return bad;
      continue;
    }
    // Flat weekly interest on the ORIGINAL principal — it does not amortise down as the loan is
    // paid off, which is what makes interest-only below a real extension rather than a pause.
    const interest = _prR2(totalAmount * prNum(p.interest_rate) / 100);
    const prior = history.filter(r => Number(r.period_id) !== periodId && prNum(r.term_no) > 0).length;
    let termNo, amount, note;
    if (prNum(p.interest_only) === 1) {
      // Interest only: take the interest, advance nothing. term_no 0 is what keeps it out of the
      // prior count above, so the principal schedule stands still while this is switched on and
      // the term the borrower is on is exactly where they left it.
      if (!(interest > 0)) {
        const bad = await dropMine();
        if (bad) return bad;
        continue;
      }
      termNo = 0;
      amount = interest;
      note = "interest only";
    } else {
      termNo = prior + 1;
      if (termNo > termsTotal) {
        const bad = await dropMine();
        if (bad) return bad;
        continue;
      } // fully paid
      // The last term absorbs the rounding remainder. A flat per_week every week would have the
      // terms sum to per_week * terms_total, not to total_amount — ₱2000 over 3 weeks would
      // collect ₱2000.01 — so the final term is whatever is actually left rather than another
      // even share. This is the one line where the obvious simplification quietly overcharges
      // every borrower, which is why it has a test of its own.
      //
      // per_week is READ when the row carries one and DERIVED when it does not. _supaSavePlan now
      // stores it on every save, so the fallback covers exactly one population: plans created or
      // edited through the Supabase path in the window between pr_save_plan being wired (5dba650)
      // and per_week being added to its whitelist. Those rows have no weekly share, and taking the
      // column at face value would price them at zero for every term but the last. It is kept
      // rather than removed because nothing has back-filled them, and a plan that silently
      // deducted nothing until someone re-saved it would be a quiet way to lose money. Preferring
      // the stored value also keeps rows written by api.php deducting exactly what they always did.
      const stored = prNum(p.per_week);
      const pw = _prR2(stored > 0 ? stored : totalAmount / termsTotal);
      const principal = termNo === termsTotal ? _prR2(totalAmount - pw * (termsTotal - 1)) : pw;
      amount = _prR2(principal + interest);
      note = termNo + "/" + termsTotal;
    }
    // The ledger, on its unique (plan_id, period_id). A real upsert, unlike pr_items (app.jsx:753)
    // — this table actually carries the constraint, so the conflict target is named rather than
    // resolved by hand. Without onConflict this would raise a duplicate key the second time the
    // button is pressed, which is precisely the case the whole ledger exists to survive.
    const {
      data: ledHit,
      error: ledErr
    } = await sb.from("pr_plan_applied").upsert({
      plan_id: p.id,
      period_id: periodId,
      term_no: termNo,
      amount
    }, {
      onConflict: "plan_id,period_id"
    }).select("id");
    if (ledErr) return {
      ok: false,
      error: "Could not record this loan's payment: " + ledErr.message
    };
    if (!ledHit || !ledHit.length) return {
      ok: false,
      error: "Recording this loan's payment was refused by the database. Nothing changed."
    };
    const b = bucket(eid);
    b[_prDedCol(p.category)] = _prR2(b[_prDedCol(p.category)] + amount);
    b.notes.push(String(p.label || "").trim() + " " + note);
  }
  // Every pay line in the week, not only the ones a plan touched. A plan that was deleted or ran
  // out since the last press has to have its deduction CLEARED, and the only way to clear a row
  // is to write it — skipping the untouched ones would leave last press's figures behind forever.
  let written = 0,
    applied = 0;
  for (const it of items) {
    const eid = Number(it.employee_id);
    const b = acc[eid] || {
      ded_loan: 0,
      ded_uniform: 0,
      ded_gov: 0,
      notes: []
    };
    // Semicolon-delimited: prCleanNotes (app.jsx:4724) splits on ";" and is the only reader.
    const notes = b.notes.join(";");
    // Rounds ONCE, at the end. prCalc (app.jsx:4744) rounds each deduction and then sums them,
    // which is not the same arithmetic — with two deductions of .50 the two disagree by ₱1, and
    // the screen renders prCalc while this column holds the figure below. That split is inherited
    // from api.php, which has always rounded this way, and is reproduced here deliberately: a
    // Supabase path that quietly disagreed with the live system would be the worse bug. Unifying
    // the two is a real fix and a separate one — it moves figures on weeks already published,
    // locked and approved, so it needs the owner to say yes.
    const net = Math.round(prNum(it.gross) - (b.ded_loan + b.ded_uniform + b.ded_gov + Math.round(prNum(it.ded_manual))));
    const row = {
      ded_loan: b.ded_loan,
      ded_uniform: b.ded_uniform,
      ded_gov: b.ded_gov,
      ded_notes: notes,
      net
    };
    // A published week has already been shown to employees and may already be approved. If the
    // money changed, that approval was given for a different number, so it goes back to pending
    // and the employee is asked again. Unchanged pay keeps its approval — re-pressing the button
    // must not wipe a week's sign-offs for nothing.
    if (published && net !== prNum(it.net)) {
      row.status = "pending";
      row.approved_at = null;
    }
    const {
      data: hit,
      error
    } = await sb.from("pr_items").update(row).eq("id", it.id).select("id");
    if (error) return _prApplyStopped(eid, empById, written, "the database refused the write: " + error.message);
    if (!hit || !hit.length) return _prApplyStopped(eid, empById, written, "the database refused the write. The week may be locked, or your account may not have permission to edit it.");
    written++;
    if (b.notes.length) applied++;
  }
  return {
    ok: true,
    applied
  };
}
const API = (action, payload) => {
  if (window.SB) {
    const sb = window.SB;
    return (async () => {
      try {
        if (action === "login") {
          const u = (payload && payload.username || "").trim().toLowerCase();
          const {
            data,
            error
          } = await sb.auth.signInWithPassword({
            email: u + "@tiongtech.local",
            password: payload && payload.password || ""
          });
          if (error) return {
            ok: false,
            error: "Invalid username or password."
          };
          const {
            data: me
          } = await sb.from("erp_users").select("username,full_name,role").eq("auth_uid", data.user.id).single();
          return {
            ok: true,
            user: me ? {
              username: me.username,
              name: me.full_name,
              role: me.role
            } : {
              username: u,
              name: u
            }
          };
        }
        if (action === "logout") {
          await sb.auth.signOut();
          return {
            ok: true
          };
        }
        if (action === "bootstrap") {
          return await _supaBootstrap();
        }
        if (action === "payroll_data") {
          return await _supaPayroll();
        }
        // The wired payroll writes. Every other pr_* action still falls through below.
        if (action === "pr_save_items") {
          return await _supaSaveItems(payload);
        }
        if (action === "pr_unlock") {
          return await _supaUnlock(payload);
        }
        if (action === "pr_publish") {
          return await _supaPublish(payload);
        }
        if (action === "pr_lock") {
          return await _supaLock(payload);
        }
        if (action === "pr_save_period") {
          return await _supaSavePeriod(payload);
        }
        if (action === "pr_delete_period") {
          return await _supaDeletePeriod(payload);
        }
        if (action === "pr_item_approve") {
          return await _supaItemApprove(payload);
        }
        if (action === "pr_item_contest") {
          return await _supaItemContest(payload);
        }
        if (action === "pr_item_reply") {
          return await _supaItemReply(payload);
        }
        if (action === "pr_request_print") {
          return await _supaRequestPrint(payload);
        }
        if (action === "pr_mark_printed") {
          return await _supaMarkPrinted(payload);
        }
        if (action === "pr_set_dayoff") {
          return await _supaSetDayoff(payload);
        }
        if (action === "pr_save_employee") {
          return await _supaSaveEmployee(payload);
        }
        if (action === "pr_delete_employee") {
          return await _supaDeleteEmployee(payload);
        }
        if (action === "pr_save_plan") {
          return await _supaSavePlan(payload);
        }
        if (action === "pr_delete_plan") {
          return await _supaDeletePlan(payload);
        }
        if (action === "pr_apply_plans") {
          return await _supaApplyPlans(payload);
        }
        if (action === "create_client") {
          const {
            data,
            error
          } = await sb.from("clients").insert(_clientPayload(payload || {})).select("id").single();
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true,
            id: data ? data.id : null
          }; // the caller stores this id so a later edit/delete can find the row
        }
        if (action === "update_client") {
          if (!payload || !payload.id) return {
            ok: false,
            error: "Missing id"
          };
          const {
            error
          } = await sb.from("clients").update(_clientPayload(payload)).eq("id", payload.id);
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true
          };
        }
        if (action === "delete_client") {
          if (!payload || !payload.id) return {
            ok: false,
            error: "Missing id"
          };
          const {
            error
          } = await sb.from("clients").delete().eq("id", payload.id);
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true
          };
        }
        if (action === "financials") {
          return await _supaFinancials();
        }
        if (action === "dashboard") {
          return await _supaDashboard(payload);
        }
        if (action === "client_payments") {
          return await _supaClientPayments(payload);
        }
        if (action === "save_expense_cats") {
          return await _supaSaveExpenseCats(payload);
        }
        if (action === "import_expenses") {
          return await _supaImportExpenses(payload);
        }
        if (action === "delete_all_expenses") {
          return await _supaDeleteAllExpenses();
        }
        if (action === "fin_range") {
          const inc = (payload && payload.kind || "income") === "income";
          const col = inc ? "paid_at" : "spent_at";
          let q = sb.from(inc ? "payments" : "expenses").select(inc ? _pCols : _eCols);
          if (payload && payload.from) q = q.gte(col, payload.from);
          // "to" is inclusive: filter to < the next day so it also holds if the column is a
          // timestamp, where lte("2026-07-17") would drop everything logged during that day.
          if (payload && payload.to) {
            const d = new Date(payload.to + "T00:00:00");
            d.setDate(d.getDate() + 1);
            q = q.lt(col, d.toISOString().slice(0, 10));
          }
          const {
            data,
            error
          } = await q.order(col, {
            ascending: false
          });
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true,
            rows: (data || []).map(inc ? _payRow : _expRow)
          };
        }
        if (action === "create_payment" || action === "create_expense") {
          const inc = action === "create_payment";
          const {
            data,
            error
          } = await sb.from(inc ? "payments" : "expenses").insert(inc ? _paymentPayload(payload || {}) : _expensePayload(payload || {})).select("id").single();
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true,
            id: data ? data.id : null
          };
        }
        // .select("id") on both of these for the same reason every payroll write carries one
        // (app.jsx:888): Postgres does not error when an RLS USING policy hides a row from an
        // UPDATE or a DELETE — PostgREST answers 200 with an empty array — so `error` stays null
        // and money that was never touched reports as edited or removed. On a ledger that is the
        // worst possible place to guess: the row is still there, the screen says it is not, and
        // the books disagree with the database until somebody reloads.
        if (action === "update_payment" || action === "update_expense") {
          if (!payload || !payload.id) return {
            ok: false,
            error: "Missing id"
          };
          const inc = action === "update_payment";
          const what = inc ? "payment" : "expense";
          const {
            data: hit,
            error
          } = await sb.from(inc ? "payments" : "expenses").update(inc ? _paymentPayload(payload) : _expensePayload(payload)).eq("id", payload.id).select("id");
          if (error) return {
            ok: false,
            error: "Could not save this " + what + ": " + error.message
          };
          if (!hit || !hit.length) return {
            ok: false,
            error: "Saving this " + what + " was refused by the database. Nothing changed."
          };
          return {
            ok: true
          };
        }
        if (action === "delete_payment" || action === "delete_expense") {
          if (!payload || !payload.id) return {
            ok: false,
            error: "Missing id"
          };
          const inc = action === "delete_payment";
          const what = inc ? "payment" : "expense";
          const {
            data: gone,
            error
          } = await sb.from(inc ? "payments" : "expenses").delete().eq("id", payload.id).select("id");
          if (error) return {
            ok: false,
            error: "Could not delete this " + what + ": " + error.message
          };
          if (!gone || !gone.length) return {
            ok: false,
            error: "Deleting this " + what + " was refused by the database. It is still there."
          };
          return {
            ok: true
          };
        }
        if (action === "add_renewal_note") {
          if (!payload || !payload.id) return {
            ok: false,
            error: "Missing id"
          };
          const text = String(payload && payload.text || "").trim();
          if (!text) return {
            ok: false,
            error: "Empty note"
          };
          // Read-append-write: the thread is a JSON array in clients.renewal_note, which is
          // why _clientPayload leaves that column alone. rnThread() tolerates the older rows
          // where the note was still plain text, so replying to one converts it in place.
          const {
            data: row,
            error: readErr
          } = await sb.from("clients").select("renewal_note").eq("id", payload.id).single();
          if (readErr) return {
            ok: false,
            error: readErr.message
          };
          const thread = rnThread(row ? row.renewal_note : "");
          thread.push({
            by: ME && ME.name || "",
            pos: ME && ME.position || "",
            at: _stamp(),
            text
          });
          const {
            error
          } = await sb.from("clients").update({
            renewal_note: JSON.stringify(thread)
          }).eq("id", payload.id);
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true,
            thread
          }; // the caller re-renders straight from this
        }
        if (action === "set_renewal_stage") {
          if (!payload || !payload.account_number) return {
            ok: false,
            error: "Missing account_number"
          };
          const acct = payload.account_number,
            stage = payload.stage || null;
          // Read the stage being left first, so the log can record from \u2192 to. Settle `from`
          // before the write, so it can't be read back out of a row the upsert has changed.
          const {
            data: prev
          } = await sb.from("renewal_stages").select("stage").eq("account_number", acct).maybeSingle();
          const from = prev && prev.stage || null;
          const {
            error
          } = await sb.from("renewal_stages").upsert({
            account_number: acct,
            stage
          }, {
            onConflict: "account_number"
          });
          if (error) return {
            ok: false,
            error: error.message
          };
          if (from !== stage) {
            // Best effort, and deliberately so: the move is what the officer asked for, so a
            // failure to log it must not fail or roll back the move. insert() resolves with
            // an error rather than throwing, so this swallows both that and a network throw.
            try {
              await sb.from("renewal_stage_logs").insert({
                account_number: acct,
                from_stage: from,
                to_stage: stage,
                moved_at: _stamp(),
                moved_by: ME && ME.name || null
              });
            } catch (e) {}
          }
          return {
            ok: true
          };
        }
        if (action === "set_renewal_followup") {
          if (!payload || !payload.account_number) return {
            ok: false,
            error: "Missing account_number"
          };
          const {
            error
          } = await sb.from("renewal_stages").upsert({
            account_number: payload.account_number,
            ..._followupPayload(payload)
          }, {
            onConflict: "account_number"
          });
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true
          };
        }
        if (action === "renewal_history") {
          if (!payload || !payload.account_number) return {
            ok: false,
            error: "Missing account_number"
          };
          const {
            data,
            error
          } = await sb.from("renewal_stage_logs").select("from_stage,to_stage,moved_at,moved_by,remarks").eq("account_number", payload.account_number).order("moved_at", {
            ascending: true
          }); // oldest first: the timeline reads top-down
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true,
            log: data || []
          };
        }
        if (action === "create_job") {
          if (!payload || !payload.jo_id) return {
            ok: false,
            error: "Missing jo_id"
          };
          const {
            error
          } = await sb.from("job_orders").insert(_joRow(payload, true));
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true,
            jo_id: payload.jo_id
          }; // the app allocated it; echo it back like api.php
        }
        if (action === "save_job") {
          if (!payload || !payload.jo_id) return {
            ok: false,
            error: "Missing jo_id"
          };
          const {
            error
          } = await sb.from("job_orders").update(_joRow(payload, false)).eq("jo_id", payload.jo_id);
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true
          };
        }
        if (action === "delete_job") {
          if (!payload || !payload.jo_id) return {
            ok: false,
            error: "Missing jo_id"
          };
          const {
            error
          } = await sb.from("job_orders").delete().eq("jo_id", payload.jo_id);
          if (error) return {
            ok: false,
            error: error.message
          };
          return {
            ok: true
          };
        }
        return {
          ok: false,
          error: "\u201C" + action + "\u201D is not connected to Supabase yet."
        };
      } catch (e) {
        return {
          ok: false,
          error: e && e.message || String(e)
        };
      }
    })();
  }
  return fetch("api.php" + (payload ? "" : "?action=" + action), payload ? {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action,
      ...payload
    })
  } : {
    credentials: "same-origin"
  }).then(r => r.json());
};
function _hm(t) {
  return (t || "").slice(0, 5);
}

// Persist a change to the backend. No-op when running offline / in the local preview.
function _save(action, payload) {
  if (!window.__LIVE__) return Promise.resolve({
    ok: false,
    offline: true
  });
  return API(action, payload).then(r => {
    const res = r || {
      ok: false
    };
    if (res && res.ok !== false && typeof window.__APP_REFRESH === "function") setTimeout(() => window.__APP_REFRESH(), 250); // reflect the change everywhere
    return res;
  }).catch(() => ({
    ok: false
  }));
}

// Map an ERP job-order row to the database columns (keeps the single SLA badge round-tripping).
function _jobPayload(o) {
  const followup = o.type === "Follow-up";
  const pass = o.sla === "PASSED" || o.sla === "FAILED";
  return {
    jo_id: o.id,
    customer: o.client,
    job_type: o.type,
    tech: o.tech === NO_TECH ? null : o.tech,
    issue: o.issue || null,
    solution: o.solution || null,
    start_date: o.startDate || null,
    start_time: o.startTime || null,
    finish_date: o.finishDate || null,
    finish_time: null,
    status: o.status || "Pending",
    resolution_hours: o.resHrs != null ? o.resHrs : null,
    sla24: !followup && pass ? o.sla : null,
    sla48: null,
    warning: o.sla === "WARNING" ? "WARNING" : null,
    followup: followup && pass ? o.sla : null
  };
}
function _slaBadge(j) {
  if (j.status !== "Completed") return j.warning === "WARNING" ? "WARNING" : "OK";
  const v = j.job_type === "Follow-up" ? j.followup : j.sla24 || j.sla48;
  return v === "PASSED" || v === "FAILED" ? v : "OK";
}
async function loadLiveData() {
  let d;
  try {
    d = await API("bootstrap");
  } catch (e) {
    return false;
  }
  if (!d || d.ok === false) return false;
  window.__LIVE__ = true;
  if (d.lastPayments && typeof d.lastPayments === "object") lastPayments = d.lastPayments;
  if (Array.isArray(d.clientSnapshots)) CLIENT_SNAPSHOTS = d.clientSnapshots;
  if (Array.isArray(d.goals)) GOALS = d.goals;
  if (typeof d.heroPin === "string") HERO_PIN = d.heroPin;
  if (d.renewalStages && typeof d.renewalStages === "object") RENEWAL_STAGES = d.renewalStages;
  if (d.verse && typeof d.verse === "object") VERSE = d.verse;
  if (d.me && typeof d.me === "object") ME = d.me;
  if (Array.isArray(d.users)) USERS = d.users;
  if (Array.isArray(d.positions) && d.positions.length) POSITIONS = d.positions;
  if (Array.isArray(d.expenseCats)) EXPENSE_CATS = d.expenseCats;
  if (Array.isArray(d.payroll)) PAYROLL = d.payroll;
  try {
    if (Array.isArray(d.jobs)) seedOrders = d.jobs.map(j => ({
      id: String(j.jo_id),
      client: j.customer || "",
      type: j.job_type || "",
      tech: j.tech || NO_TECH,
      issue: j.issue || "",
      solution: j.solution || "",
      startDate: j.start_date || "",
      startTime: _hm(j.start_time),
      finishDate: j.finish_date || "",
      resHrs: j.resolution_hours != null ? Number(j.resolution_hours) : null,
      status: j.status || "Pending",
      sla: _slaBadge(j)
    }));
    if (Array.isArray(d.clients)) clients = d.clients.map(c => ({
      id: c.id,
      first_name: c.first_name || "",
      last_name: c.last_name || "",
      account_number: c.account_number || "",
      area: c.area || "",
      address: c.address || "",
      phone: c.phone || "",
      email: c.email || "",
      profile: c.profile || "",
      mrc: c.mrc != null ? Number(c.mrc) : "",
      balance: c.balance != null && c.balance !== "" ? Number(c.balance) : null,
      subscription_date: c.subscription_date || "",
      coordinates: c.coordinates || "",
      olt: "",
      nap: c.nap || "",
      napPort: c.port || "",
      notes: c.notes || "",
      renewal_note: c.renewal_note || "",
      bill_date: c.bill_date || "",
      due_date: c.due_date || "",
      billing_status: c.billing_status || "",
      active_profile: c.active_profile || ""
    }));
    if (Array.isArray(d.vendos)) pisos = d.vendos.map(v => ({
      id: v.id,
      name: v.name || "",
      vlan_number: v.vlan_number || "",
      area: v.area || "",
      address: v.address || "",
      phone: v.phone || "",
      email: v.email || "",
      date_installed: v.date_installed || "",
      coordinates: v.coordinates || "",
      olt: "",
      nap: v.nap || "",
      napPort: v.port || ""
    }));
    if (Array.isArray(d.olts)) olts = d.olts.map(o => ({
      id: o.id,
      name: o.name || "",
      standard: o.standard || "",
      total_pon_ports: Number(o.total_pon_ports) || 16,
      description: o.description || "",
      areas_served: o.areas_served || ""
    }));
    if (Array.isArray(d.napPorts)) napPorts = d.napPorts; // keep them: _napPortId() resolves the FK from these
    if (Array.isArray(d.napDevices)) {
      const ponById = {};
      (d.ponPorts || []).forEach(p => {
        ponById[p.id] = p;
      });
      const oltById = {};
      (d.olts || []).forEach(o => {
        oltById[o.id] = o;
      });
      const portCount = {};
      (d.napPorts || []).forEach(p => {
        portCount[p.nap_device_id] = (portCount[p.nap_device_id] || 0) + 1;
      });
      const usedByName = {};
      (d.clients || []).concat(d.vendos || []).forEach(x => {
        if (x.nap) usedByName[x.nap] = (usedByName[x.nap] || 0) + 1;
      });
      napDevices = d.napDevices.map(n => {
        const pon = ponById[n.pon_port_id];
        const olt = pon ? oltById[pon.olt_id] : null;
        return {
          id: n.id,
          pon_port_id: n.pon_port_id,
          name: n.name || "",
          olt: olt ? olt.name : "",
          pon: pon ? "PON " + pon.port_number : "",
          total_ports: Number(n.total_ports) || portCount[n.id] || 8,
          used: usedByName[n.name] || 0,
          coordinates: n.coordinates || "",
          description: n.description || ""
        };
      });
    }
    if (Array.isArray(d.techAccounts)) techAccounts = d.techAccounts.map(a => ({
      name: a.name,
      contact: a.contact || "",
      username: a.username
    }));
    if (Array.isArray(d.jobTypes) && d.jobTypes.length) CFG_JOBTYPES = d.jobTypes;
    if (Array.isArray(d.issues) && d.issues.length) CFG_ISSUES = d.issues;
    if (Array.isArray(d.solutions) && d.solutions.length) CFG_SOLUTIONS = d.solutions;
    {
      const _az = (a, b) => String(a).localeCompare(String(b));
      CFG_JOBTYPES = [...CFG_JOBTYPES].sort(_az);
      CFG_ISSUES = [...CFG_ISSUES].sort(_az);
      CFG_SOLUTIONS = [...CFG_SOLUTIONS].sort(_az);
    }
    if (d.sla && typeof d.sla === "object") CFG_SLA = {
      standard: Number(d.sla.standard) || 24,
      warningLead: Number(d.sla.warningLead) || 3,
      followup: Number(d.sla.followup) || 72,
      followupWarnAt: Number(d.sla.followupWarnAt) || 48
    };
    JO_TYPES = CFG_JOBTYPES;
    // Job Order technician dropdown = full names of people whose position is Technician (from Settings/roster).
    // Falls back to the old technician accounts only if no position-technicians are set yet.
    if (Array.isArray(d.technicians) && d.technicians.length) {
      JO_TECHS = [NO_TECH, ...d.technicians.map(n => (n || "").trim()).filter(Boolean)];
    } else {
      JO_TECHS = [NO_TECH, ...techAccounts.map(a => (a.name || "").trim()).filter(Boolean)];
    }
  } catch (e) {/* keep whatever mapped; never break the render */}
  try {
    const fin = await API("financials");
    if (fin && fin.ok) {
      // No `.length` guard. It used to be there, and it was the mechanism that kept the demo data
      // alive: an empty live result failed the test, the assignment was skipped, and the seed
      // stayed on screen looking exactly like real figures. An empty array IS the answer when the
      // table is empty, and it has to be allowed to win.
      if (Array.isArray(fin.cashFlow)) cashFlow = fin.cashFlow;
      if (Array.isArray(fin.incomeBySource)) income = fin.incomeBySource;
      if (Array.isArray(fin.expensesByCategory)) expenses = fin.expensesByCategory;
      if (Array.isArray(fin.recentExpenses)) FIN_RECENT = fin.recentExpenses;
      if (Array.isArray(fin.recentPayments)) FIN_PAYMENTS = fin.recentPayments;
      if (fin.kpi) {
        FIN_KPI = fin.kpi;
        if (fin.kpi.mtdIncome != null) KPI.revenue = fin.kpi.mtdIncome;
      }
      if (fin.monthKpi) FIN_MONTH = fin.monthKpi;
      if (fin.allTime) FIN_ALL = fin.allTime;
      if (fin.year) FIN_YEAR = fin.year;
      if (Array.isArray(fin.financeMonths)) FIN_MONTHS = fin.financeMonths;
    }
  } catch (e) {}
  try {
    const dash = await API("dashboard");
    if (dash && dash.ok && dash.dashboard) {
      DASH = dash.dashboard;
      // The Financials screen's two PESOWiFi tiles read FIN_MONTH.pesoThis/pesoLast, which
      // _supaFinancials has never produced — they rendered pesoK(undefined), a permanent ₱0 that
      // looked like a reading. The dashboard computes them (it already loads clients, which is what
      // identifies a PESOWiFi account), so the value is carried across rather than computed twice
      // in two places that could then disagree.
      if (FIN_MONTH) {
        FIN_MONTH.pesoThis = DASH.pesoThis;
        FIN_MONTH.pesoLast = DASH.pesoLast;
      }
    }
  } catch (e) {}
  KPI.activeClients = clients.length || KPI.activeClients;
  return true;
}
const coverageAreas = [{
  area: "SL Balit",
  x: 30,
  y: 34,
  subs: 168,
  util: 81
}, {
  area: "Poblacion",
  x: 63,
  y: 28,
  subs: 142,
  util: 74
}, {
  area: "San Isidro",
  x: 47,
  y: 58,
  subs: 121,
  util: 55
}, {
  area: "San Roque",
  x: 74,
  y: 63,
  subs: 98,
  util: 45
}, {
  area: "Talacogon",
  x: 21,
  y: 66,
  subs: 121,
  util: 68
}];

/* ------------------------------------------------------------------ */
/*  SMALL UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */
function Card({
  t,
  children,
  style,
  className = "",
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl " + className,
    onClick: onClick,
    style: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      boxShadow: t.name === "dark" ? "0 1px 0 rgba(255,255,255,0.02)" : "0 1px 2px rgba(16,27,46,0.04)",
      ...style
    }
  }, children);
}
function Eyebrow({
  t,
  children,
  icon: Icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      color: t.textMuted
    }
  }, Icon && /*#__PURE__*/React.createElement(Icon, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "uppercase tracking-widest",
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: "0.14em"
    }
  }, children));
}
function Delta({
  t,
  value,
  suffix = "%",
  invert = false
}) {
  const up = value >= 0;
  const positive = invert ? !up : up;
  const color = positive ? t.good : t.bad;
  const Arrow = up ? ArrowUpRight : ArrowDownRight;
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-0.5",
    style: {
      color,
      fontSize: 12,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    size: 13
  }), Math.abs(value), suffix);
}
function StatTile({
  t,
  label,
  value,
  delta,
  deltaSuffix,
  invert,
  icon: Icon,
  tone = "accent",
  sub,
  onClick
}) {
  const toneColor = {
    accent: t.accent,
    good: t.good,
    warn: t.warn,
    bad: t.bad,
    violet: t.violet
  }[tone];
  const toneSoft = {
    accent: t.accentSoft,
    good: t.goodSoft,
    warn: t.warnSoft,
    bad: t.badSoft,
    violet: "rgba(167,139,250,0.14)"
  }[tone];
  return /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 16,
      cursor: onClick ? "pointer" : "default"
    },
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, label), Icon && /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: toneSoft,
      color: toneColor
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex items-end gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontSize: 26,
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: "-0.02em"
    }
  }, value), delta !== undefined && /*#__PURE__*/React.createElement(Delta, {
    t: t,
    value: delta,
    suffix: deltaSuffix,
    invert: invert
  })), sub && /*#__PURE__*/React.createElement("div", {
    className: "mt-1.5",
    style: {
      color: onClick ? t.accent : t.textFaint,
      fontSize: 11.5,
      fontWeight: onClick ? 600 : 400
    }
  }, sub));
}
function Chip({
  t,
  children,
  tone
}) {
  const map = {
    Paid: [t.good, t.goodSoft],
    Unpaid: [t.bad, t.badSoft],
    Partial: [t.warn, t.warnSoft],
    high: [t.bad, t.badSoft],
    med: [t.warn, t.warnSoft],
    low: [t.good, t.goodSoft]
  };
  const [c, bg] = map[tone] || [t.textMuted, t.borderSoft];
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center rounded-full",
    style: {
      background: bg,
      color: c,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 9px"
    }
  }, children);
}
function SectionTitle({
  t,
  children,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  }, children), right);
}

/* Signature: glowing progress ring toward 1,000 subscribers */
function VerseModal({
  t,
  verse,
  onClose,
  onSaved
}) {
  const [text, setText] = useState(verse.text || "");
  const [ref, setRef] = useState(verse.ref || "");
  const [busy, setBusy] = useState(false);
  const lbl = {
    display: "block",
    color: t.textFaint,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
    marginBottom: 4
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none"
  };
  const save = async () => {
    if (!text.trim()) {
      alert("Enter the verse text.");
      return;
    }
    setBusy(true);
    try {
      await API("save_verse", {
        text: text.trim(),
        ref: ref.trim()
      });
    } catch (e) {}
    setBusy(false);
    onSaved({
      text: text.trim(),
      ref: ref.trim()
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 520,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Edit dashboard verse"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Verse"), /*#__PURE__*/React.createElement("textarea", {
    value: text,
    onChange: e => setText(e.target.value),
    rows: 4,
    placeholder: "Type the verse text\u2026",
    style: {
      ...inp,
      resize: "vertical"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Reference"), /*#__PURE__*/React.createElement("input", {
    value: ref,
    onChange: e => setRef(e.target.value),
    placeholder: "e.g. Proverbs 16:3",
    style: inp
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    disabled: busy,
    style: {
      background: t.violet,
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Saving…" : "Save verse"))));
}
function GoalRing({
  t,
  value,
  target,
  label,
  money
}) {
  const pct = Math.min(1, value / target);
  const R = 74,
    C = 2 * Math.PI * R,
    dash = C * pct;
  const fmt = n => (money ? "\u20B1" : "") + Number(n || 0).toLocaleString();
  const vStr = fmt(value);
  const vSize = vStr.length > 9 ? 20 : vStr.length > 7 ? 23 : vStr.length > 5 ? 26 : 30;
  return /*#__PURE__*/React.createElement("div", {
    className: "relative grid place-items-center",
    style: {
      width: 176,
      height: 176
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "176",
    height: "176",
    viewBox: "0 0 176 176",
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ringGrad",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: t.accent
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: t.violet
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "88",
    cy: "88",
    r: R,
    fill: "none",
    stroke: t.borderSoft,
    strokeWidth: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "88",
    cy: "88",
    r: R,
    fill: "none",
    stroke: "url(#ringGrad)",
    strokeWidth: "12",
    strokeLinecap: "round",
    strokeDasharray: `${dash} ${C - dash}`,
    style: {
      transition: "stroke-dasharray 1.1s cubic-bezier(.22,1,.36,1)",
      filter: `drop-shadow(0 0 8px ${t.accent}88)`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute text-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: vSize,
      fontWeight: 800,
      letterSpacing: "-0.02em"
    }
  }, vStr), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "of ", fmt(target), money ? "" : " " + (label || "subscribers")), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 inline-flex items-center rounded-full",
    style: {
      background: t.accentSoft,
      color: t.accent,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 8px"
    }
  }, Math.round(pct * 100), "% there")));
}

/* Chart tooltip */
function TT({
  t
}) {
  return ({
    active,
    payload,
    label
  }) => {
    if (!active || !payload || !payload.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl",
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        padding: "8px 10px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 11,
        fontWeight: 700,
        marginBottom: 4
      }
    }, label), payload.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-2",
      style: {
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 8,
        background: p.color || p.stroke || p.fill
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontWeight: 600
      }
    }, p.name, ":"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, typeof p.value === "number" ? p.value.toLocaleString() : p.value))));
  };
}

/* ------------------------------------------------------------------ */
/*  VIEWS                                                              */
/* ------------------------------------------------------------------ */
function OwnerDashboard({
  t
}) {
  const tt = TT({
    t
  });
  const [showRenewed, setShowRenewed] = useState(false);
  const [showColl, setShowColl] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroPin, setHeroPin] = useState(HERO_PIN || "");
  const _regularList = clients.filter(c => !isPeso(c));
  const _pesoCount = clients.length - _regularList.length;
  const _registered = _regularList.length; // all regular clients, any status
  const _active = _regularList.filter(c => clientIsActive(c)).length; // ACTIVE_PROFILE not Expired / Payment Reminder / blank
  const _todayStr = fmtDate(new Date());
  const _collList = DASH && Array.isArray(DASH.collectionsTodayList) ? DASH.collectionsTodayList : [];
  const _incList = DASH && Array.isArray(DASH.incomeThisMonthList) ? DASH.incomeThisMonthList : [];
  const _incTotal = _incList.reduce((s, p) => s + Number(p.amount || 0), 0);
  // real (non-discount) payments posted today, keyed by account, with the ACTUAL amount paid (not MRC)
  const _paidTodayByAcct = {};
  _collList.forEach(p => {
    const a = String(p.account || "");
    if (!a) return;
    if (!_paidTodayByAcct[a]) _paidTodayByAcct[a] = {
      amt: 0,
      at: ""
    };
    _paidTodayByAcct[a].amt += Number(p.amount || 0);
    if (p.paid_at) _paidTodayByAcct[a].at = p.paid_at;
  });
  const _renewedToday = _regularList.filter(c => _paidTodayByAcct[String(c.account_number || "")]); // clients with a real payment today
  // real money figures (from DASH) + client-side renewals/receivables
  const _renewToday = _regularList.filter(c => dueDays(c) === 0).length;
  const _due1 = _regularList.filter(c => dueDays(c) === 1).length;
  const _due2 = _regularList.filter(c => dueDays(c) === 2).length;
  const _due3 = _regularList.filter(c => dueDays(c) === 3).length;
  const _arList = _regularList.filter(c => clientIsActive(c) && !clientPaid(c) && dueDays(c) <= 0);
  const _ar = _arList.reduce((a, c) => a + (Number(c.mrc) || 0), 0);
  // _live now means LOADED, not "real vs demo". It used to gate invented constants — ₱58,400
  // collected today, ₱678,000 spent over two months, ₱365,000 net — that rendered whenever the
  // dashboard had not loaded, which was always, because the action was never wired. They are gone.
  // A screen that has not loaded shows "—" through _n() below; a screen that HAS loaded shows the
  // real figure, including a real ₱0. "I don't know yet" and "it is zero" are different answers and
  // must not look alike on a page somebody makes decisions from.
  const _live = !!DASH;
  const _n = v => _live ? Number(v) || 0 : null; // null -> the tile renders "—"
  const _money = v => v === null ? "—" : peso(v);
  const _moneyK = v => v === null ? "—" : pesoK(v);
  const _collToday = _n(DASH && DASH.collectionsToday);
  const _collN = _live ? Number(DASH.collectionsTodayCount) || 0 : null;
  const _exp2 = _n(DASH && DASH.expenses2mo);
  const _net2 = _n(DASH && DASH.net2mo);
  const _inc2 = _n(DASH && DASH.income2mo);
  const _incThisM = _n(DASH && DASH.incomeThisMonth);
  const _incLastM = _n(DASH && DASH.incomeLastMonth);
  const _expLastM = _n(DASH && DASH.expensesLastMonth);
  const _netLastM = _n(DASH && DASH.netLastMonth);
  const _cf = _live && DASH.collectionFunds ? DASH.collectionFunds : {
    coop: null,
    tshirt: null,
    ca: null,
    fines: null
  };
  const _cfTotal = _n(DASH && DASH.collectionFundsTotal);
  const _payWk = _n(DASH && DASH.payrollExpenseWeek);
  const _payMo = _n(DASH && DASH.payrollExpenseMonth);
  const _outLoans = _n(DASH && DASH.outstandingLoans);
  const tiles = [{
    label: "Active Clients",
    value: _active,
    icon: Users,
    tone: "good",
    sub: "renewed · not expired"
  }, {
    label: "Active Renewal This Month",
    value: DASH && DASH.renewedThisMonth != null ? DASH.renewedThisMonth : "—",
    icon: CheckCircle2,
    tone: "good",
    sub: "clients who paid this month · tap to view",
    onClick: () => setShowIncome(true)
  }, {
    label: "Clients Renewed Today",
    value: _renewedToday.length,
    icon: CheckCircle2,
    tone: "good",
    sub: "paid today · tap to view",
    onClick: () => setShowRenewed(true)
  }, {
    label: "Collections Today",
    value: _money(_collToday),
    icon: PiggyBank,
    tone: "good",
    sub: _collN === null ? "not loaded yet" : `${_collN} payment${_collN === 1 ? "" : "s"} · tap to view`,
    onClick: () => setShowColl(true)
  }, {
    label: "Income this Month",
    value: _moneyK(_incThisM),
    icon: Banknote,
    tone: "good",
    sub: "payments, this month · tap to view",
    onClick: () => setShowIncome(true)
  }, {
    label: "Income Last Month",
    value: _moneyK(_incLastM),
    icon: Banknote,
    tone: "accent",
    sub: "payments, last month"
  }, {
    label: "Expenses Last Month",
    value: _moneyK(_expLastM),
    icon: Receipt,
    tone: "warn",
    sub: "last month"
  }, {
    label: "Net Profit Last Month",
    value: _moneyK(_netLastM),
    icon: TrendingUp,
    tone: _netLastM === null ? "accent" : _netLastM >= 0 ? "good" : "bad",
    sub: "income − expenses"
  }, {
    label: "Income (last 2 mo)",
    value: _moneyK(_inc2),
    icon: Banknote,
    tone: "good",
    sub: "payments, this + last month"
  }, {
    label: "Expenses (last 2 mo)",
    value: _moneyK(_exp2),
    icon: Receipt,
    tone: "warn",
    sub: "this + last month"
  }, {
    label: "Net Profit (last 2 mo)",
    value: _moneyK(_net2),
    icon: TrendingUp,
    tone: _net2 === null ? "accent" : _net2 >= 0 ? "good" : "bad",
    sub: "income − expenses"
  }, {
    label: "Accounts Receivable",
    value: pesoK(_ar),
    icon: Wallet,
    tone: "warn",
    sub: `${_arList.length} unpaid, due/overdue`
  }, {
    label: "Renewals Today",
    value: _renewToday,
    icon: CalendarClock,
    tone: "accent",
    sub: "due today, excl. PESOWiFi"
  }, {
    label: "Clients Due Tomorrow",
    value: _due1,
    icon: CalendarClock,
    tone: "accent",
    sub: "in 1 day, excl. PESOWiFi"
  }, {
    label: "Clients Due in 2 Days",
    value: _due2,
    icon: CalendarClock,
    tone: "accent",
    sub: "excl. PESOWiFi"
  }, {
    label: "Clients Due in 3 Days",
    value: _due3,
    icon: CalendarClock,
    tone: "accent",
    sub: "excl. PESOWiFi"
  }];
  const _peso = _pesoCount;
  const _month = new Date().toLocaleString("en-US", {
    month: "long"
  });
  const _chips = [`${_active} active clients`, `${_registered} registered`, `${_peso} PESOWiFi vending machines`];
  const _verses = [["Commit to the LORD whatever you do, and he will establish your plans.", "Proverbs 16:3"], ["For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you.", "Jeremiah 29:11"], ["Whatever you do, work at it with all your heart, as working for the Lord.", "Colossians 3:23"], ["Trust in the LORD with all your heart and lean not on your own understanding.", "Proverbs 3:5"], ["And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus.", "Colossians 3:17"], ["Unless the LORD builds the house, the builders labor in vain.", "Psalm 127:1"], ["Give, and it will be given to you. A good measure, pressed down, shaken together and running over.", "Luke 6:38"], ["The plans of the diligent lead surely to abundance.", "Proverbs 21:5"]];
  const _dailyVerse = _verses[new Date().getDate() % _verses.length];
  // Featured Faith Goals: rotate through all active goals; arrows switch; pin locks one.
  const _heroList = (() => {
    const gs = (GOALS || []).filter(g => !g.done);
    return gs.length ? gs : [{
      id: "_def",
      title: "1000 Active Clients",
      target: 1000,
      current: _active,
      unit: "active clients",
      notes: ""
    }];
  })();
  useEffect(() => {
    if (heroPin || _heroList.length <= 1) return;
    const iv = setInterval(() => setHeroIdx(i => (i + 1) % _heroList.length), 7000);
    return () => clearInterval(iv);
  }, [heroPin, _heroList.length]);
  const _pinIdx = heroPin ? _heroList.findIndex(g => String(g.id) === String(heroPin)) : -1;
  const _hi = _pinIdx >= 0 ? _pinIdx : _heroList.length ? heroIdx % _heroList.length : 0;
  const _hg = _heroList[_hi] || _heroList[0];
  const _heroGoal = _hg;
  const _isClientGoal = /active\s*client|client|subscriber/i.test(_hg.title || "");
  const _goalTarget = Number(_hg.target) > 0 ? Number(_hg.target) : _isClientGoal ? 1000 : 0;
  const _goalValue = _isClientGoal ? _active : Number(_hg.current || 0);
  const _goalUnit = _isClientGoal ? "active clients" : _hg.unit || "";
  const _toGo = Math.max(0, _goalTarget - _goalValue);
  const _reached = _goalTarget > 0 && _goalValue >= _goalTarget;
  const _verseText = _hg.notes ? _hg.notes : _dailyVerse[0];
  const _verseRef = _hg.notes ? "" : _dailyVerse[1];
  const _isMoneyGoal = /^(\u20b1|php|peso|pesos|\$|usd)$/i.test((_goalUnit || "").trim());
  const _fmtGoal = n => _isMoneyGoal ? "\u20b1" + Number(n || 0).toLocaleString() : Number(n || 0).toLocaleString() + (_goalUnit ? " " + _goalUnit : "");
  const _heroHeading = _goalTarget <= 0 ? _hg.title || "Faith Goal" : _reached ? `${_fmtGoal(_goalValue)}.` : `${_fmtGoal(_toGo)} to go.`;
  const _isOwner = ME && ME.role === "owner";
  const _savePin = id => {
    const v = String(id || "");
    setHeroPin(v);
    HERO_PIN = v;
    API("set_hero_pin", {
      goal_id: v
    }).catch(() => {});
  };
  const _goHero = delta => {
    const ni = ((_hi + delta) % _heroList.length + _heroList.length) % _heroList.length;
    setHeroIdx(ni);
    if (_isOwner) _savePin(_heroList[ni].id);
  };
  const _pinHero = () => {
    if (!_isOwner) return;
    _savePin(heroPin ? "" : String(_hg.id));
  };
  const _isPinned = !!heroPin && String(heroPin) === String(_hg.id);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 22,
      background: `linear-gradient(120deg, ${t.surface}, ${t.surface2})`,
      overflow: "hidden",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:items-center gap-6 justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0"
  }, /*#__PURE__*/React.createElement(GoalRing, {
    t: t,
    value: _goalValue,
    target: _goalTarget,
    label: _goalUnit,
    money: _isMoneyGoal
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    t: t,
    icon: Activity
  }, "Owner command center \xB7 ", _month), _isOwner && _heroList.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => _goHero(-1),
    title: "Previous goal",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      borderRadius: 7,
      width: 22,
      height: 22,
      cursor: "pointer",
      lineHeight: 1,
      fontSize: 13,
      display: "grid",
      placeItems: "center"
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("button", {
    onClick: () => _goHero(1),
    title: "Next goal",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      borderRadius: 7,
      width: 22,
      height: 22,
      cursor: "pointer",
      lineHeight: 1,
      fontSize: 13,
      display: "grid",
      placeItems: "center"
    }
  }, "\u203A")), _isOwner && /*#__PURE__*/React.createElement("button", {
    onClick: _pinHero,
    title: _isPinned ? "Unpin (resume rotation for everyone)" : "Pin this goal for everyone",
    style: {
      background: _isPinned ? t.violetSoft || t.accentSoft : "transparent",
      border: "none",
      color: _isPinned ? t.violet : t.textFaint,
      borderRadius: 7,
      padding: "3px 8px",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\uD83D\uDCCC ", _isPinned ? "Pinned" : "Pin"), _heroList.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, _heroList.map((g, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: _isOwner ? () => {
      setHeroIdx(i);
      _savePin(_heroList[i].id);
    } : undefined,
    style: {
      width: 6,
      height: 6,
      borderRadius: 6,
      background: i === _hi ? t.violet : t.border,
      cursor: _isOwner ? "pointer" : "default"
    }
  })))), /*#__PURE__*/React.createElement("h2", {
    className: "mt-2",
    style: {
      color: t.text,
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: "-0.02em"
    }
  }, _heroHeading), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 max-w-md",
    style: {
      borderLeft: `3px solid ${t.violet}`,
      paddingLeft: 12
    }
  }, _heroGoal && /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.violet,
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: 2
    }
  }, _heroGoal.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.text,
      fontSize: 13.5,
      lineHeight: 1.55,
      fontStyle: "italic"
    }
  }, "\"", _verseText, "\""), _verseRef && /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.violet,
      fontSize: 12,
      fontWeight: 700,
      marginTop: 3
    }
  }, "\u2014 ", _verseRef)), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-wrap gap-2"
  }, _chips.map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    className: "inline-flex items-center gap-1 rounded-lg",
    style: {
      background: t.accentSoft,
      color: t.accent,
      fontSize: 12,
      fontWeight: 600,
      padding: "5px 10px"
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 13
  }), a))))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 360,
      height: 150
    }
  }, !growth.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      display: "grid",
      placeItems: "center",
      color: t.textFaint,
      fontSize: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, "No growth history yet", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      marginTop: 3
    }
  }, "Builds up as monthly snapshots accumulate."))) : /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(AreaChart, {
    data: growth,
    margin: {
      top: 6,
      right: 4,
      left: -18,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "subFill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: t.accent,
    stopOpacity: 0.5
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: t.accent,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: t.grid,
    vertical: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "m",
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false,
    domain: [560, 780]
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "subs",
    name: "Subscribers",
    stroke: t.accent,
    strokeWidth: 2.5,
    fill: "url(#subFill)"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5"
  }, tiles.map(x => /*#__PURE__*/React.createElement(StatTile, _extends({
    key: x.label,
    t: t
  }, x, {
    deltaSuffix: "%"
  })))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-4 pb-2",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Employee Collection Funds"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginTop: 2
    }
  }, "Salary expense and deductions held on behalf of employees / the cooperative \u2014 kept separate from income.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5 p-4"
  }, [{
    label: "Salary Expense This Week",
    value: _moneyK(_payWk),
    tone: "warn"
  }, {
    label: "Salary Expense This Month",
    value: _moneyK(_payMo),
    tone: "warn"
  }, {
    label: "Outstanding Employee Loans",
    value: _moneyK(_outLoans),
    tone: "bad"
  }, {
    label: "Cooperative Collections",
    value: _moneyK(_cf.coop),
    tone: "accent"
  }, {
    label: "T-Shirt Collections",
    value: _moneyK(_cf.tshirt),
    tone: "accent"
  }, {
    label: "Cash Advance Collections",
    value: _moneyK(_cf.ca),
    tone: "accent"
  }, {
    label: "Other Employee Collections",
    value: _moneyK(_cf.fines),
    tone: "accent"
  }, {
    label: "Total Collection Funds",
    value: _moneyK(_cfTotal),
    tone: "good"
  }].map(x => {
    const col = {
      accent: t.accent,
      good: t.good,
      warn: t.warn,
      bad: t.bad
    }[x.tone];
    return /*#__PURE__*/React.createElement("div", {
      key: x.label,
      style: {
        background: t.surface2,
        borderRadius: 12,
        padding: 13
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 11.5,
        fontWeight: 600,
        lineHeight: 1.3
      }
    }, x.label), /*#__PURE__*/React.createElement("div", {
      style: {
        color: col,
        fontSize: 20,
        fontWeight: 800,
        marginTop: 4
      }
    }, x.value));
  }))), (() => {
    const catColor = c => ({
      Faith: t.violet,
      Business: t.accent,
      Personal: t.good,
      Family: "#F472B6",
      Health: t.warn,
      Ministry: t.violet
    })[c] || t.textMuted;
    const gpct = g => g.done ? 100 : goalTarget(g) > 0 ? Math.min(100, Math.round(goalCurrent(g) / goalTarget(g) * 100)) : 0;
    const activeGoals = (GOALS || []).filter(g => !g.done).slice(0, 4);
    return /*#__PURE__*/React.createElement(Card, {
      t: t,
      style: {
        padding: 18
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      t: t,
      right: /*#__PURE__*/React.createElement(Eyebrow, {
        t: t,
        icon: Target
      }, (GOALS || []).filter(g => !g.done).length, " in progress")
    }, "Faith Goals"), activeGoals.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 13,
        padding: "10px 2px"
      }
    }, "No goals in progress. Open ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.textMuted
      }
    }, "Faith Goals"), " in the menu to add one.") : /*#__PURE__*/React.createElement("div", {
      className: "grid md:grid-cols-2 gap-x-8 gap-y-3.5 mt-1"
    }, activeGoals.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between",
      style: {
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontSize: 13,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: catColor(g.category) + "22",
        color: catColor(g.category),
        fontSize: 9.5,
        fontWeight: 800,
        padding: "1px 7px",
        textTransform: "uppercase",
        marginRight: 6
      }
    }, g.category || "Goal"), g.title), goalTarget(g) > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted,
        fontSize: 12,
        fontWeight: 700
      }
    }, gpct(g), "%") : null), /*#__PURE__*/React.createElement("div", {
      className: "rounded-full",
      style: {
        height: 7,
        background: t.borderSoft
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-full",
      style: {
        height: 7,
        width: `${gpct(g)}%`,
        background: catColor(g.category),
        transition: "width .8s ease"
      }
    })), g.target_date && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginTop: 3
      }
    }, "by ", String(g.target_date).slice(0, 10))))));
  })(), (() => {
    const byArea = {};
    clients.filter(c => !isPeso(c)).forEach(c => {
      const a = (c.area || "").trim() || "—";
      byArea[a] = (byArea[a] || 0) + 1;
    });
    const data = Object.entries(byArea).map(([area, subs]) => ({
      area,
      subs
    })).sort((a, b) => b.subs - a.subs).slice(0, 8);
    return /*#__PURE__*/React.createElement(Card, {
      t: t,
      style: {
        padding: 18
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      t: t,
      right: /*#__PURE__*/React.createElement(Eyebrow, {
        t: t,
        icon: MapPin
      }, "top areas")
    }, "Subscribers by area"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 230
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(BarChart, {
      data: data,
      margin: {
        top: 4,
        right: 8,
        left: -18,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: t.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "area",
      tick: {
        fill: t.textMuted,
        fontSize: 11
      },
      axisLine: false,
      tickLine: false,
      interval: 0,
      angle: -18,
      textAnchor: "end",
      height: 54
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: t.textFaint,
        fontSize: 11
      },
      axisLine: false,
      tickLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: tt,
      cursor: {
        fill: t.accentSoft
      }
    }), /*#__PURE__*/React.createElement(Bar, {
      dataKey: "subs",
      name: "Subscribers",
      radius: [6, 6, 0, 0],
      fill: t.accent
    })))));
  })(), showRenewed && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 90,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowRenewed(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 91,
      width: "100%",
      maxWidth: 560,
      padding: 0,
      maxHeight: "82vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Clients renewed today ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 500
    }
  }, "\xB7 ", _renewedToday.length)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRenewed(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "6px 0"
    }
  }, _renewedToday.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No clients have paid/renewed today yet."), _renewedToday.map((c, i) => {
    const pt = _paidTodayByAcct[String(c.account_number || "")] || {
      amt: 0,
      at: ""
    };
    return /*#__PURE__*/React.createElement("div", {
      key: (c.account_number || "") + i,
      className: "flex items-center justify-between px-5",
      style: {
        padding: "10px 20px",
        borderBottom: i === _renewedToday.length - 1 ? "none" : `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600,
        fontSize: 13.5
      }
    }, `${c.first_name || ""} ${c.last_name || ""}`.trim() || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5
      }
    }, c.account_number || "—", " \xB7 ", c.area || "—", c.profile ? " · " + c.profile : "")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.good,
        fontSize: 12.5,
        fontWeight: 700
      }
    }, peso(pt.amt)), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "paid today")));
  })))), showIncome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 90,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowIncome(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 91,
      width: "100%",
      maxWidth: 620,
      padding: 0,
      maxHeight: "82vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Income this month ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 500
    }
  }, "\xB7 ", peso(_incTotal), " from ", _incList.length, " payment", _incList.length === 1 ? "" : "s")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowIncome(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "6px 0"
    }
  }, _incList.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No payments recorded this month yet."), _incList.map((p, i) => {
    const who = p.client && String(p.client).trim() ? String(p.client).trim() : p.account || p.source || "—";
    const via = !p.created_by ? "from Taoki" : p.user_name ? "by " + p.user_name : "";
    const day = String(p.paid_at || "").slice(0, 10);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center justify-between",
      style: {
        padding: "10px 20px",
        borderBottom: i === _incList.length - 1 ? "none" : `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600,
        fontSize: 13.5
      }
    }, who), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5
      }
    }, p.account ? p.account + " · " : "", p.source || "payment", p.reference ? " · " + p.reference : "", via ? " · " + via : "")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.good,
        fontSize: 13,
        fontWeight: 700
      }
    }, peso(p.amount)), day && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, day)));
  })))), showColl && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 90,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowColl(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 91,
      width: "100%",
      maxWidth: 600,
      padding: 0,
      maxHeight: "82vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Collections today ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 500
    }
  }, "\xB7 ", _money(_collToday), " from ", _collList.length, " payment", _collList.length === 1 ? "" : "s")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowColl(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "6px 0"
    }
  }, _collList.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No payments posted today yet."), _collList.map((p, i) => {
    const who = p.client && p.client.trim() ? p.client.trim() : p.account || p.source || "—";
    const via = !p.created_by ? "from Taoki" : p.user_name ? "by " + p.user_name : "";
    const time = String(p.paid_at || "").slice(11, 16);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center justify-between px-5",
      style: {
        padding: "10px 20px",
        borderBottom: i === _collList.length - 1 ? "none" : `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600,
        fontSize: 13.5
      }
    }, who), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5
      }
    }, p.account ? p.account + " · " : "", p.source || "payment", p.reference ? " · " + p.reference : "", via ? " · " + via : "")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.good,
        fontSize: 13,
        fontWeight: 700
      }
    }, peso(p.amount)), time && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, time)));
  })))));
}
function Subscribers({
  t
}) {
  const tt = TT({
    t
  });
  const pesoList = clients.filter(isPeso);
  const pesoInstalled = pesoList.length;
  const _reg = clients.filter(c => !isPeso(c));
  const activeRegular = _reg.filter(clientIsActive).length; // active profile (not blank/expired/payment reminder)
  const renewedRegular = _reg.filter(c => clientIsActive(c) && clientPaid(c)).length; // active AND paid for the current cycle
  const _ym = new Date().toISOString().slice(0, 7);
  const pesoNew = pesoList.filter(c => (c.subscription_date || "").slice(0, 7) === _ym).length;
  // VIP clients = past due, but still in good standing (not Expired, not Payment Reminder)
  const vipClients = _reg.filter(c => {
    const prof = (c.active_profile || "").trim().toLowerCase();
    return !clientPaid(c) && clientNoRecentPayment(c, 2) && prof !== "expired" && prof !== "payment reminder";
  });
  const [vipOpen, setVipOpen] = useState(false);
  const funnelTiles = [{
    label: "Active Clients",
    value: activeRegular,
    tone: "accent",
    icon: Users
  },
  // These four read KPI's seed until now: 38 new installs, 24 expired, 1.26% churn, 91%
  // collection rate — none of them anybody's data, and each carried a hardcoded delta arrow
  // (+8.6, −3.1, +2.0) implying a trend that was never measured. The first two are countable from
  // the client list the tiles beside them already use, so they are counted. The last two are NOT
  // derivable from what the app holds — churn needs a prior-period snapshot and collection rate
  // needs billed-versus-collected — so they say "—" instead of a number nobody computed.
  {
    label: "New Client Installed",
    value: _reg.filter(c => (c.subscription_date || "").slice(0, 7) === _ym).length,
    tone: "good",
    icon: Zap,
    sub: "subscribed this month"
  }, {
    label: "PESOWiFi Installed",
    value: pesoInstalled,
    tone: "accent",
    icon: Wifi
  }, {
    label: "VIP Clients",
    value: vipClients.length,
    tone: "violet",
    icon: Users,
    sub: "balance · no pay 2mo",
    onClick: () => setVipOpen(true)
  }, {
    label: "Renewed Clients",
    value: renewedRegular,
    tone: "good",
    icon: CheckCircle2,
    sub: "paid this cycle"
  }, {
    label: "Expired Clients",
    value: _reg.filter(c => (c.active_profile || "").trim().toLowerCase() === "expired").length,
    tone: "warn",
    icon: Clock
  }, {
    label: "Monthly Churn",
    value: "—",
    tone: "accent",
    icon: TrendingDown,
    sub: "needs a prior-month snapshot"
  }, {
    label: "Collection Rate",
    value: "—",
    tone: "accent",
    icon: PiggyBank,
    sub: "needs billed vs collected"
  }];
  const [subStats, setSubStats] = useState(null);
  useEffect(() => {
    let ok = true;
    API("subscriber_stats").then(d => {
      if (ok && d && d.ok) setSubStats(d);
    }).catch(() => {});
    return () => {
      ok = false;
    };
  }, []);
  // real subscriber health from live client + job data
  const activeList = _reg.filter(clientIsActive);
  const nA = activeList.length || 1;
  const _now = new Date();
  const onTime = Math.round(activeList.filter(clientPaid).length / nA * 100);
  const tenure = Math.round(activeList.filter(c => {
    const s = _pdate(c.subscription_date);
    return s && (_now - s) / 86400000 >= 365;
  }).length / nA * 100);
  const repairSet = new Set((seedOrders || []).filter(o => /repair|trouble|fix|complain|reconnect|relocat|no ?internet|slow|down/i.test((o.type || "") + " " + (o.issue || ""))).map(o => (o.client || "").trim().toLowerCase()));
  const zeroTickets = Math.round(activeList.filter(c => !repairSet.has(`${c.first_name || ""} ${c.last_name || ""}`.trim().toLowerCase())).length / nA * 100);
  const pastDue = Math.round(activeList.filter(c => {
    const dd = dueDays(c);
    return dd !== null && dd < 0 && !clientPaid(c);
  }).length / nA * 100);
  const healthScore = Math.round((onTime + tenure + zeroTickets + (100 - pastDue)) / 4);
  const healthRows = [["On-time payers", onTime, t.good], ["Tenure > 12 mo", tenure, t.accent], ["Zero repair tickets", zeroTickets, t.good], ["Past due now", pastDue, t.warn]];
  // real growth: subscribers (active) from monthly snapshots + collections from payments
  const snapList = subStats && subStats.snapshots ? subStats.snapshots : CLIENT_SNAPSHOTS || [];
  const revList = subStats && subStats.revenue ? subStats.revenue : [];
  const gm = {};
  snapList.forEach(s => {
    const m = String(s.snap_date).slice(0, 7);
    gm[m] = Object.assign({}, gm[m], {
      subs: Number(s.active) || 0
    });
  });
  revList.forEach(r => {
    gm[r.ym] = Object.assign({}, gm[r.ym], {
      rev: Math.round((Number(r.total) || 0) / 1000)
    });
  });
  const growthReal = Object.keys(gm).sort().map(m => {
    const d = new Date(m + "-01T00:00:00");
    return {
      m: d.toLocaleString("en-US", {
        month: "short"
      }) + " " + String(d.getFullYear()).slice(2),
      subs: gm[m].subs != null ? gm[m].subs : null,
      rev: gm[m].rev != null ? gm[m].rev : null
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, funnelTiles.map(x => /*#__PURE__*/React.createElement(StatTile, _extends({
    key: x.label,
    t: t
  }, x, {
    deltaSuffix: "%"
  })))), vipOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setVipOpen(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      padding: 20,
      width: "min(620px, 94vw)",
      maxHeight: "85vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "VIP Clients"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 12.5
    }
  }, vipClients.length, " client", vipClients.length === 1 ? "" : "s", " with a balance and no payment in the last 2 months \u2014 not Expired / Payment Reminder")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setVipOpen(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "8px 10px",
      fontSize: 11,
      color: t.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      borderBottom: `1px solid ${t.border}`
    }
  }, "Client"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "8px 10px",
      fontSize: 11,
      color: t.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      borderBottom: `1px solid ${t.border}`
    }
  }, "Area"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "right",
      padding: "8px 10px",
      fontSize: 11,
      color: t.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      borderBottom: `1px solid ${t.border}`
    }
  }, "MRC"))), /*#__PURE__*/React.createElement("tbody", null, vipClients.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 3,
    style: {
      padding: 16,
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No VIP clients right now.")), vipClients.slice().sort((a, b) => (Number(b.mrc) || 0) - (Number(a.mrc) || 0)).map((c, i) => /*#__PURE__*/React.createElement("tr", {
    key: (c.account_number || "") + i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 600,
      fontSize: 13
    }
  }, `${c.first_name || ""} ${c.last_name || ""}`.trim() || "—"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 11,
      fontFamily: "ui-monospace, monospace"
    }
  }, c.account_number || "")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 10px",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, c.area || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 10px",
      textAlign: "right",
      color: t.text,
      fontWeight: 700,
      fontSize: 13
    }
  }, c.mrc ? peso(c.mrc) : "—")))))))), (() => {
    const monthly = {};
    (snapList || []).forEach(s => {
      const m = String(s.snap_date).slice(0, 7);
      monthly[m] = s;
    });
    const keys = Object.keys(monthly).sort();
    const data = keys.map(m => {
      const d = new Date(m + "-01T00:00:00");
      return {
        m: d.toLocaleString("en-US", {
          month: "short"
        }) + " " + String(d.getFullYear()).slice(2),
        active: Number(monthly[m].active) || 0,
        registered: Number(monthly[m].registered) || 0
      };
    });
    return /*#__PURE__*/React.createElement(Card, {
      t: t,
      style: {
        padding: 18
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      t: t,
      right: /*#__PURE__*/React.createElement(Eyebrow, {
        t: t
      }, "from monthly snapshots")
    }, "Active clients per month"), data.length < 2 ? /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 13,
        padding: "26px 4px",
        lineHeight: 1.6
      }
    }, "Building history\u2026 this chart fills in as the daily sync records a snapshot each month. ", data.length === 1 ? `So far: ${data[0].active} active of ${data[0].registered} registered (${keys[0]}).` : "Come back after the sync has run across a couple of months.") : /*#__PURE__*/React.createElement("div", {
      style: {
        height: 250
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(LineChart, {
      data: data,
      margin: {
        top: 6,
        right: 8,
        left: -20,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: t.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "m",
      tick: {
        fill: t.textMuted,
        fontSize: 11.5
      },
      axisLine: false,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: t.textFaint,
        fontSize: 11
      },
      axisLine: false,
      tickLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: tt
    }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "active",
      name: "Active",
      stroke: t.good,
      strokeWidth: 2.5,
      dot: {
        r: 3
      }
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "registered",
      name: "Registered",
      stroke: t.accent,
      strokeWidth: 2,
      strokeDasharray: "5 4",
      dot: false
    })))));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-3.5"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "subscribers \xB7 collections")
  }, "Subscriber & revenue growth"), growthReal.length < 2 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 13,
      padding: "26px 4px",
      lineHeight: 1.6
    }
  }, "Building history\u2026 subscriber counts are captured monthly and collections come from your recorded payments, so this fills in over time.", growthReal.length === 1 ? ` So far: ${growthReal[0].subs != null ? growthReal[0].subs + " active" : "—"}${growthReal[0].rev != null ? " · ₱" + growthReal[0].rev + "k collected" : ""} (${growthReal[0].m}).` : "") : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 250
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(LineChart, {
    data: growthReal,
    margin: {
      top: 4,
      right: 8,
      left: -18,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: t.grid,
    vertical: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "m",
    tick: {
      fill: t.textMuted,
      fontSize: 11.5
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "l",
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
    yAxisId: "l",
    type: "monotone",
    dataKey: "subs",
    name: "Active subscribers",
    stroke: t.accent,
    strokeWidth: 2.5,
    dot: {
      r: 3
    },
    connectNulls: true
  }), /*#__PURE__*/React.createElement(Line, {
    yAxisId: "l",
    type: "monotone",
    dataKey: "rev",
    name: "Collections (\u20B1k)",
    stroke: t.violet,
    strokeWidth: 2.5,
    dot: false,
    strokeDasharray: "4 3",
    connectNulls: true
  }))))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Gauge
    }, "health score")
  }, "Subscriber health"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid place-items-center rounded-2xl",
    style: {
      width: 120,
      height: 120,
      background: healthScore >= 70 ? t.goodSoft : healthScore >= 50 ? t.warnSoft : t.badSoft || t.warnSoft
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: healthScore >= 70 ? t.good : healthScore >= 50 ? t.warn : t.bad,
      fontSize: 34,
      fontWeight: 800
    }
  }, healthScore), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 11
    }
  }, "/ 100"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-2.5"
  }, healthRows.map(([lbl, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: lbl
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between",
    style: {
      fontSize: 12,
      color: t.textMuted,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", null, lbl), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontWeight: 700
    }
  }, v, "%")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-full",
    style: {
      height: 6,
      background: t.borderSoft
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-full",
    style: {
      height: 6,
      width: `${v}%`,
      background: c
    }
  })))))))));
}
function Churn({
  t
}) {
  const tt = TT({
    t
  });
  const maxFunnel = 760;
  const reg = clients.filter(c => !isPeso(c)); // exclude PESOWiFi, same basis as the dashboard
  const total = reg.length || 1;
  const prof = c => (c.active_profile || "").trim().toLowerCase();
  const active = reg.filter(clientIsActive).length; // active plan (not blank/expired/reminder) → matches 773
  const paid = reg.filter(c => clientIsActive(c) && clientPaid(c)).length; // renewed (active + paid this cycle)
  const expired = reg.filter(c => prof(c) === "expired").length;
  const reminder = reg.filter(c => prof(c) === "payment reminder").length;
  const noProfile = reg.filter(c => prof(c) === "").length;
  const inactive = reg.length - active; // expired + reminder + no profile
  const retention = Math.round(active / total * 100);
  const churnRate = Math.round(inactive / total * 100);
  const statusRows = [["Active", active], ["Payment Reminder", reminder], ["Expired", expired], ["No profile", noProfile]].filter(([, v]) => v > 0);
  const [snaps, setSnaps] = useState([]);
  useEffect(() => {
    let ok = true;
    API("churn_snapshots").then(d => {
      if (ok && d && d.ok && Array.isArray(d.snapshots)) setSnaps(d.snapshots);
    }).catch(() => {});
    return () => {
      ok = false;
    };
  }, []);
  const moLabel = ym => {
    const [y, m] = (ym || "").split("-");
    if (!y) return ym;
    const d = new Date(+y, (+m || 1) - 1, 1);
    const lab = d.toLocaleString("en-US", {
      month: "short"
    });
    return String(new Date().getFullYear()) !== y ? `${lab} '${y.slice(2)}` : lab;
  };
  const trend = (snaps.length ? snaps : [{
    ym: new Date().toISOString().slice(0, 7),
    active,
    inactive,
    churn_rate: churnRate
  }]).map(s => ({
    m: moLabel(s.ym),
    active: Number(s.active),
    inactive: Number(s.inactive),
    churn: Number(s.churn_rate)
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Retention Rate",
    value: retention + "%",
    icon: ShieldCheck,
    tone: "good",
    sub: `${active} active of ${reg.length}`
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Active Clients",
    value: active,
    icon: CheckCircle2,
    tone: "good",
    sub: `${paid} renewed this cycle`
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Churn Rate",
    value: churnRate + "%",
    icon: TrendingDown,
    tone: "bad",
    sub: `${inactive} not active`
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Expired / Reminder",
    value: inactive,
    icon: Clock,
    tone: "warn",
    sub: `${expired} expired · ${reminder} reminder${noProfile ? ` · ${noProfile} no profile` : ""}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-5 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    className: "lg:col-span-3",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "monthly")
  }, "Active & inactive over time"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 250
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(AreaChart, {
    data: trend,
    margin: {
      top: 4,
      right: 8,
      left: -22,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "churnFill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: t.bad,
    stopOpacity: 0.35
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: t.bad,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: t.grid,
    vertical: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "m",
    tick: {
      fill: t.textMuted,
      fontSize: 11.5
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false,
    allowDecimals: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "inactive",
    name: "Not active",
    stroke: t.bad,
    strokeWidth: 2.5,
    fill: "url(#churnFill)"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "active",
    name: "Active",
    stroke: t.good,
    strokeWidth: 2.5,
    dot: false
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginTop: 8
    }
  }, "A snapshot of active vs inactive clients is saved automatically each month, so this trend fills in with real history over time.")), /*#__PURE__*/React.createElement(Card, {
    t: t,
    className: "lg:col-span-2",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "live")
  }, "Client status breakdown"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2.5 mt-1"
  }, statusRows.map(([label, val]) => {
    const w = Math.min(100, Math.round(val / (reg.length || 1) * 100));
    const c = /active/i.test(label) ? t.good : /expired/i.test(label) ? t.bad : /reminder/i.test(label) ? t.warn : t.textMuted;
    return /*#__PURE__*/React.createElement("div", {
      key: label
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between",
      style: {
        fontSize: 12,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontWeight: 700
      }
    }, val, " \xB7 ", w, "%")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg",
      style: {
        height: 8,
        background: t.borderSoft
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg",
      style: {
        height: 8,
        width: `${w}%`,
        background: c,
        transition: "width .8s ease"
      }
    })));
  }), statusRows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12.5
    }
  }, "No client data yet.")))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-xl shrink-0",
    style: {
      width: 38,
      height: 38,
      background: t.accentSoft,
      color: t.accent
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 14
    }
  }, "Churn insight"), (() => {
    const reg = clients.filter(c => !isPeso(c));
    const inactive = reg.filter(c => !clientIsActive(c));
    const byArea = {};
    inactive.forEach(c => {
      const a = (c.area || "").trim() || "—";
      byArea[a] = (byArea[a] || 0) + 1;
    });
    const top = Object.entries(byArea).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const pct = reg.length ? Math.round(inactive.length / reg.length * 100) : 0;
    return /*#__PURE__*/React.createElement("p", {
      style: {
        color: t.textMuted,
        fontSize: 13,
        lineHeight: 1.55,
        marginTop: 4
      }
    }, inactive.length === 0 ? "Every regular client is currently active — no expired or payment-reminder accounts right now." : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, inactive.length), " of ", reg.length, " regular clients (", pct, "%) are not active (Expired, Payment Reminder, or no profile).", top.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, " Most are in ", top.map(([a, n], i) => /*#__PURE__*/React.createElement("span", {
      key: a
    }, i > 0 ? ", " : " ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, a), " (", n, ")")), "."), " ", "Follow these up in ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, "Renewals \u2192 Overview"), ", filter by ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, "Unpaid"), ", and print the follow-up sheet. PESOWiFi is excluded."));
  })()))));
}
function rnThread(raw) {
  if (!raw) return [];
  try {
    const a = JSON.parse(raw);
    if (Array.isArray(a)) return a;
  } catch (e) {}
  return raw ? [{
    by: "",
    text: String(raw)
  }] : [];
}
function RenewalPipeline({
  t,
  stage
}) {
  const fullName = c => `${c.first_name || ""} ${c.last_name || ""}`.trim();
  const label = RN_LABEL[stage] || "Renewals";
  const [q, setQ] = useState("");
  const [, setTick] = useState(0);
  const [chatFor, setChatFor] = useState(null);
  const [histLog, setHistLog] = useState(null);
  const openTimeline = async c => {
    setChatFor(c);
    setReply("");
    setHistLog(null);
    try {
      const r = await API("renewal_history", {
        account_number: c.account_number
      });
      setHistLog(r && r.ok && r.log || []);
    } catch (e) {
      setHistLog([]);
    }
  };
  const [reply, setReply] = useState("");
  const canEdit = can("edit_clients") || canView("renew") || canView("renewoverview");
  const inStage = (clients || []).filter(c => !isPeso(c) && renewalStageOf(c) === stage);
  const shown = inStage.filter(c => {
    const s = q.trim().toLowerCase();
    return !s || fullName(c).toLowerCase().includes(s) || (c.account_number || "").toLowerCase().includes(s);
  }).sort((a, b) => (dueDays(a) ?? 0) - (dueDays(b) ?? 0));
  const extraCols = RN_STAGE_COLS[stage] || [];
  const dateLabel = RN_DATE_LABEL[stage] || "Date";
  const hasDate = extraCols.includes("date");
  const _d = new Date();
  _d.setDate(_d.getDate() + 1);
  const tomorrowStr = _d.toISOString().slice(0, 10);
  const todayStr = new Date().toISOString().slice(0, 10);
  const dueTomorrow = hasDate ? shown.filter(c => (renewalInfoOf(c).next_date || "") === tomorrowStr).length : 0;
  const promiseOverdue = stage === "promised" ? shown.filter(c => {
    const nd = renewalInfoOf(c).next_date;
    return nd && nd < todayStr;
  }).length : 0;
  // pipeline-wide metrics for the dashboard strip
  const _allPipe = (clients || []).filter(c => !isPeso(c));
  const stageCount = st => _allPipe.filter(c => renewalStageOf(c) === st).length;
  const totalPipeline = _allPipe.filter(c => renewalStageOf(c)).length;
  const dueTodayAll = _allPipe.filter(c => renewalStageOf(c) && (renewalInfoOf(c).next_date || "") === todayStr).length;
  const dueTomorrowAll = _allPipe.filter(c => renewalStageOf(c) && (renewalInfoOf(c).next_date || "") === tomorrowStr).length;
  const promisesOverdueAll = _allPipe.filter(c => renewalStageOf(c) === "promised" && renewalInfoOf(c).next_date && renewalInfoOf(c).next_date < todayStr).length;
  const move = async (c, ns) => {
    if (!ns || ns === stage) return;
    RENEWAL_STAGES[c.account_number] = {
      ...(RENEWAL_STAGES[c.account_number] || {}),
      stage: ns
    };
    setTick(x => x + 1);
    try {
      await API("set_renewal_stage", {
        account_number: c.account_number,
        stage: ns
      });
    } catch (e) {}
  };
  const saveFollowup = async (c, patch) => {
    const info = {
      ...renewalInfoOf(c),
      ...patch
    };
    RENEWAL_STAGES[c.account_number] = {
      ...(RENEWAL_STAGES[c.account_number] || {
        stage
      }),
      ...patch
    };
    setTick(x => x + 1);
    try {
      await API("set_renewal_followup", {
        account_number: c.account_number,
        next_date: info.next_date || "",
        remarks: info.remarks || "",
        promise_date: info.promise_date || "",
        amount_due: info.amount_due != null ? info.amount_due : "",
        payment_method: info.payment_method || ""
      });
    } catch (e) {}
  };
  const reminderStatus = nd => {
    if (!nd) return {
      text: "No date set",
      color: t.textFaint
    };
    if (nd < todayStr) return {
      text: "Overdue",
      color: t.bad
    };
    if (nd === todayStr) return {
      text: "Due today",
      color: t.warn
    };
    if (nd === tomorrowStr) return {
      text: "Due tomorrow",
      color: t.warn
    };
    return {
      text: "Scheduled",
      color: t.good
    };
  };
  const sendNote = async () => {
    const txt = reply.trim();
    if (!txt || !chatFor) return;
    const send = () => API("add_renewal_note", {
      id: chatFor.id,
      text: txt
    });
    let r = null;
    try {
      r = await send();
    } catch (e) {
      r = null;
    }
    if (!r || !r.ok) {
      try {
        await new Promise(res => setTimeout(res, 500));
        r = await send();
      } catch (e) {
        r = null;
      }
    } // retry once if it was momentarily blocked
    if (r && r.ok) {
      chatFor.renewal_note = JSON.stringify(r.thread || []);
      setReply("");
      setChatFor({
        ...chatFor
      });
    } // keep the typed note if it still didn't go through
  };
  const th = {
    textAlign: "left",
    padding: "10px 14px",
    fontWeight: 700,
    fontSize: 11.5,
    color: t.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: `1px solid ${t.border}`,
    whiteSpace: "nowrap"
  };
  const td = {
    padding: "11px 14px",
    fontSize: 13,
    color: t.text,
    verticalAlign: "top"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Renewal pipeline"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 flex-wrap",
    style: {
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, "Due today ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.warn
    }
  }, dueTodayAll)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, "Tomorrow ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.warn
    }
  }, dueTomorrowAll)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, "Promises overdue ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.bad
    }
  }, promisesOverdueAll)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, "In pipeline ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, totalPipeline)))), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))",
      gap: 9
    }
  }, RN_STAGES.map(([id, lbl]) => {
    const n = stageCount(id);
    const active = id === stage;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => {
        const nav = RN_NAV[id];
        if (nav && window.__ttNav) window.__ttNav(nav);
      },
      style: {
        textAlign: "left",
        background: active ? t.accentSoft : t.surface2,
        border: `1px solid ${active ? t.accent : t.border}`,
        borderRadius: 10,
        padding: "9px 11px",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: active ? t.accent : t.text,
        fontSize: 20,
        fontWeight: 800,
        lineHeight: 1
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 10.5,
        lineHeight: 1.25,
        marginTop: 3
      }
    }, lbl));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      color: t.text,
      fontSize: 22,
      fontWeight: 800
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, shown.length, " client", shown.length === 1 ? "" : "s", " in this stage \xB7 pick a Next Move to advance each one"), dueTomorrow > 0 && /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 rounded-full mt-2",
    style: {
      background: t.warnSoft || t.accentSoft,
      color: t.warn,
      fontSize: 12.5,
      fontWeight: 800,
      padding: "5px 12px"
    }
  }, "\uD83D\uDD14 ", dueTomorrow, " client", dueTomorrow === 1 ? "" : "s", " need", dueTomorrow === 1 ? "s" : "", " follow-up tomorrow"), promiseOverdue > 0 && /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 rounded-full mt-2 ml-2",
    style: {
      background: t.badSoft || "#3a1620",
      color: t.bad,
      fontSize: 12.5,
      fontWeight: 800,
      padding: "5px 12px"
    }
  }, "\u26A0 ", promiseOverdue, " promise", promiseOverdue === 1 ? "" : "s", " overdue \u2014 still unpaid")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "8px 12px",
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 15,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search name or account\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: "100%"
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Client"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Address"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Contact"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Note Chat"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "MRC"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Balance"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Days Overdue"), extraCols.map(col => /*#__PURE__*/React.createElement("th", {
    key: col,
    style: th
  }, col === "date" ? dateLabel : RN_COL_LABEL[col])), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Next Move"))), /*#__PURE__*/React.createElement("tbody", null, shown.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 8 + extraCols.length,
    style: {
      padding: "18px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No clients in this stage.")), shown.map(c => {
    const dd = dueDays(c);
    const overdue = dd == null ? null : -dd;
    const thread = rnThread(c.renewal_note);
    const last = thread[thread.length - 1];
    return /*#__PURE__*/React.createElement("tr", {
      key: c.account_number,
      style: {
        borderBottom: `1px solid ${t.borderSoft}`,
        background: stage === "promised" && renewalInfoOf(c).next_date && renewalInfoOf(c).next_date < todayStr ? (t.badSoft || "#3a1620") + "66" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openTimeline(c),
      title: "View timeline & notes",
      style: {
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
        color: t.text,
        fontWeight: 700,
        fontSize: 13
      }
    }, fullName(c) || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontSize: 11.5,
        fontFamily: "ui-monospace, monospace"
      }
    }, c.account_number || ""), c.coordinates && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "\uD83D\uDCCD ", c.coordinates)), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        color: t.textMuted,
        maxWidth: 200
      }
    }, c.address || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        color: t.textMuted,
        whiteSpace: "nowrap"
      }
    }, c.phone || "—"), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openTimeline(c),
      className: "inline-flex items-center gap-1.5 rounded-lg",
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: last ? t.text : t.textFaint,
        cursor: "pointer",
        fontSize: 12,
        padding: "5px 9px",
        maxWidth: 210
      }
    }, /*#__PURE__*/React.createElement(FileText, {
      size: 13
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, last ? (last.text || "").slice(0, 30) : "Add note"))), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        textAlign: "right",
        fontWeight: 700
      }
    }, c.mrc ? peso(c.mrc) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        textAlign: "right",
        fontWeight: 700,
        color: (Number(c.balance) || 0) > 0 ? t.bad : t.textMuted
      }
    }, c.balance != null && c.balance !== "" ? peso(c.balance) : "—"), /*#__PURE__*/React.createElement("td", {
      style: td
    }, overdue == null ? "—" : overdue > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.bad,
        fontWeight: 700
      }
    }, overdue, " day", overdue === 1 ? "" : "s") : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Not overdue")), extraCols.length > 0 && (() => {
      const info = renewalInfoOf(c);
      const rs = reminderStatus(info.next_date);
      const inp = {
        background: t.surface2,
        color: t.text,
        border: `1px solid ${t.border}`,
        borderRadius: 8,
        padding: "6px 8px",
        fontSize: 12,
        outline: "none"
      };
      return extraCols.map(col => {
        if (col === "date") return /*#__PURE__*/React.createElement("td", {
          key: col,
          style: td
        }, /*#__PURE__*/React.createElement("input", {
          type: "date",
          value: info.next_date || "",
          disabled: !canEdit,
          onChange: e => saveFollowup(c, {
            next_date: e.target.value
          }),
          style: {
            ...inp,
            colorScheme: t.name === "dark" ? "dark" : "light"
          }
        }));
        if (col === "amount") return /*#__PURE__*/React.createElement("td", {
          key: col,
          style: td
        }, /*#__PURE__*/React.createElement("input", {
          type: "number",
          defaultValue: info.amount_due != null ? info.amount_due : "",
          disabled: !canEdit,
          onBlur: e => {
            if (String(e.target.value) !== String(info.amount_due ?? "")) saveFollowup(c, {
              amount_due: e.target.value
            });
          },
          placeholder: "\u20B1",
          style: {
            ...inp,
            width: 90
          }
        }));
        if (col === "method") return /*#__PURE__*/React.createElement("td", {
          key: col,
          style: td
        }, /*#__PURE__*/React.createElement("select", {
          value: info.payment_method || "",
          disabled: !canEdit,
          onChange: e => saveFollowup(c, {
            payment_method: e.target.value
          }),
          style: {
            ...inp,
            cursor: "pointer"
          }
        }, RN_METHODS.map(m => /*#__PURE__*/React.createElement("option", {
          key: m,
          value: m,
          style: {
            background: t.surface
          }
        }, m || "—"))));
        if (col === "remarks") return /*#__PURE__*/React.createElement("td", {
          key: col,
          style: td
        }, /*#__PURE__*/React.createElement("input", {
          defaultValue: info.remarks || "",
          disabled: !canEdit,
          onBlur: e => {
            if ((e.target.value || "") !== (info.remarks || "")) saveFollowup(c, {
              remarks: e.target.value
            });
          },
          placeholder: "Remarks\u2026",
          style: {
            ...inp,
            width: 150
          }
        }));
        if (col === "reminder") return /*#__PURE__*/React.createElement("td", {
          key: col,
          style: td
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            color: rs.color,
            fontWeight: 700,
            fontSize: 12
          }
        }, rs.text));
        return /*#__PURE__*/React.createElement("td", {
          key: col,
          style: td
        });
      });
    })(), /*#__PURE__*/React.createElement("td", {
      style: td
    }, canEdit ? /*#__PURE__*/React.createElement("select", {
      value: "",
      onChange: e => move(c, e.target.value),
      style: {
        background: t.surface2,
        color: t.text,
        border: `1px solid ${t.accent}66`,
        borderRadius: 8,
        padding: "6px 8px",
        fontSize: 12.5,
        cursor: "pointer",
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      style: {
        background: t.surface
      }
    }, "Move to\u2026"), RN_STAGES.filter(([id]) => id !== stage).map(([id, lbl]) => /*#__PURE__*/React.createElement("option", {
      key: id,
      value: id,
      style: {
        background: t.surface
      }
    }, lbl))) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint
      }
    }, "\u2014")));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 10,
      padding: 12
    }
  }, shown.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No clients in this stage."), shown.map(c => {
    const dd = dueDays(c);
    const overdue = dd == null ? null : -dd;
    const thread = rnThread(c.renewal_note);
    const last = thread[thread.length - 1];
    const info = renewalInfoOf(c);
    const rs = reminderStatus(info.next_date);
    const inp = {
      background: t.surface,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "8px 10px",
      fontSize: 13,
      outline: "none",
      width: "100%"
    };
    const isPromiseOverdue = stage === "promised" && info.next_date && info.next_date < todayStr;
    return /*#__PURE__*/React.createElement("div", {
      key: c.account_number,
      style: {
        background: isPromiseOverdue ? (t.badSoft || "#3a1620") + "66" : t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openTimeline(c),
      style: {
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 15
      }
    }, fullName(c) || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontSize: 11.5,
        fontFamily: "ui-monospace, monospace"
      }
    }, c.account_number || "")), overdue != null && overdue > 0 && /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        flexShrink: 0,
        background: t.bad + "22",
        color: t.bad,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px"
      }
    }, overdue, "d overdue")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "7px 12px",
        marginTop: 10,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "MRC"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600
      }
    }, c.mrc ? peso(c.mrc) : "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Balance"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: (Number(c.balance) || 0) > 0 ? t.bad : t.textMuted,
        fontWeight: 700
      }
    }, c.balance != null && c.balance !== "" ? peso(c.balance) : "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Contact"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.phone || "—")), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Address"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, c.address || "—"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => openTimeline(c),
      className: "inline-flex items-center gap-1.5 rounded-lg",
      style: {
        marginTop: 10,
        width: "100%",
        justifyContent: "flex-start",
        background: t.surface,
        border: `1px solid ${t.border}`,
        color: last ? t.text : t.textFaint,
        cursor: "pointer",
        fontSize: 12.5,
        padding: "8px 11px"
      }
    }, /*#__PURE__*/React.createElement(FileText, {
      size: 14
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, last ? (last.text || "").slice(0, 40) : "Add note / open timeline")), extraCols.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginTop: 10
      }
    }, extraCols.map(col => {
      if (col === "date") return /*#__PURE__*/React.createElement("label", {
        key: col,
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, dateLabel, /*#__PURE__*/React.createElement("input", {
        type: "date",
        value: info.next_date || "",
        disabled: !canEdit,
        onChange: e => saveFollowup(c, {
          next_date: e.target.value
        }),
        style: {
          ...inp,
          colorScheme: t.name === "dark" ? "dark" : "light",
          marginTop: 3
        }
      }));
      if (col === "amount") return /*#__PURE__*/React.createElement("label", {
        key: col,
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "Amount", /*#__PURE__*/React.createElement("input", {
        type: "number",
        defaultValue: info.amount_due != null ? info.amount_due : "",
        disabled: !canEdit,
        onBlur: e => {
          if (String(e.target.value) !== String(info.amount_due ?? "")) saveFollowup(c, {
            amount_due: e.target.value
          });
        },
        placeholder: "\u20B1",
        style: {
          ...inp,
          marginTop: 3
        }
      }));
      if (col === "method") return /*#__PURE__*/React.createElement("label", {
        key: col,
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "Method", /*#__PURE__*/React.createElement("select", {
        value: info.payment_method || "",
        disabled: !canEdit,
        onChange: e => saveFollowup(c, {
          payment_method: e.target.value
        }),
        style: {
          ...inp,
          cursor: "pointer",
          marginTop: 3
        }
      }, RN_METHODS.map(m => /*#__PURE__*/React.createElement("option", {
        key: m,
        value: m,
        style: {
          background: t.surface
        }
      }, m || "—"))));
      if (col === "remarks") return /*#__PURE__*/React.createElement("label", {
        key: col,
        style: {
          fontSize: 11,
          color: t.textFaint,
          gridColumn: "1 / -1"
        }
      }, "Remarks", /*#__PURE__*/React.createElement("input", {
        defaultValue: info.remarks || "",
        disabled: !canEdit,
        onBlur: e => {
          if ((e.target.value || "") !== (info.remarks || "")) saveFollowup(c, {
            remarks: e.target.value
          });
        },
        placeholder: "Remarks\u2026",
        style: {
          ...inp,
          marginTop: 3
        }
      }));
      if (col === "reminder") return /*#__PURE__*/React.createElement("div", {
        key: col,
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "Reminder", /*#__PURE__*/React.createElement("div", {
        style: {
          color: rs.color,
          fontWeight: 700,
          fontSize: 12,
          marginTop: 5
        }
      }, rs.text));
      return null;
    })), canEdit && /*#__PURE__*/React.createElement("select", {
      value: "",
      onChange: e => move(c, e.target.value),
      style: {
        marginTop: 10,
        width: "100%",
        background: t.surface,
        color: t.text,
        border: `1px solid ${t.accent}66`,
        borderRadius: 8,
        padding: "9px 10px",
        fontSize: 13,
        cursor: "pointer",
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      style: {
        background: t.surface
      }
    }, "Move to\u2026"), RN_STAGES.filter(([id]) => id !== stage).map(([id, lbl]) => /*#__PURE__*/React.createElement("option", {
      key: id,
      value: id,
      style: {
        background: t.surface
      }
    }, lbl))));
  }))), chatFor && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setChatFor(null),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      padding: 18,
      width: "min(560px, 94vw)",
      maxHeight: "86vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 15
    }
  }, fullName(chatFor)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 11.5,
      fontFamily: "ui-monospace, monospace"
    }
  }, chatFor.account_number || "")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setChatFor(null),
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      margin: "12px 0",
      minHeight: 120
    }
  }, (() => {
    const info = renewalInfoOf(chatFor);
    const st = renewalStageOf(chatFor);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        padding: "10px 12px",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap",
      style: {
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: t.accent + "22",
        color: t.accent,
        fontWeight: 800,
        padding: "3px 10px",
        fontSize: 11
      }
    }, RN_LABEL[st] || "—"), info.next_date && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "\uD83D\uDCC5 ", info.next_date), info.amount_due != null && info.amount_due !== "" && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "\uD83D\uDCB0 ", peso(info.amount_due)), info.payment_method && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "\xB7 ", info.payment_method)), info.remarks && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 12,
        marginTop: 5
      }
    }, info.remarks));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: 6
    }
  }, "Movement history"), histLog === null && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      padding: "2px 0 12px"
    }
  }, "Loading\u2026"), histLog !== null && histLog.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      padding: "2px 0 12px"
    }
  }, "No stage changes yet."), histLog !== null && histLog.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `2px solid ${t.border}`,
      paddingLeft: 12,
      marginBottom: 16,
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, histLog.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, h.from_stage ? (RN_LABEL[h.from_stage] || h.from_stage) + " → " : "Added to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.accent
    }
  }, RN_LABEL[h.to_stage] || h.to_stage)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10.5
    }
  }, h.moved_at, h.moved_by ? " · " + h.moved_by : "", h.remarks ? " · " + h.remarks : "")))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: 6
    }
  }, "Notes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, rnThread(chatFor.renewal_note).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12.5,
      padding: "2px 0"
    }
  }, "No notes yet."), rnThread(chatFor.renewal_note).map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 11px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 13,
      whiteSpace: "pre-wrap"
    }
  }, m.text), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10.5,
      marginTop: 3
    }
  }, m.by || "", m.at ? " · " + m.at : ""))))), canEdit && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    value: reply,
    onChange: e => setReply(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") sendNote();
    },
    placeholder: "Write a note\u2026",
    style: {
      flex: 1,
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: "9px 11px",
      fontSize: 13,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: sendNote,
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 9,
      padding: "9px 14px",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "Send")))));
}
const RnFF = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "for_followup"
});
const RnF1 = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "followup1"
});
const RnF2 = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "followup2"
});
const RnPromised = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "promised"
});
const RnAwaiting = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "awaiting"
});
const RnWinback = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "winback"
});
const RnModem = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "modem_removal"
});
const RnTransfer = p => /*#__PURE__*/React.createElement(RenewalPipeline, {
  t: p.t,
  stage: "transferred"
});
function Renewals({
  t
}) {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [chatFor, setChatFor] = useState(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const parseThread = raw => {
    if (!raw) return [];
    try {
      const a = JSON.parse(raw);
      if (Array.isArray(a)) return a;
    } catch (e) {}
    return [{
      by: "",
      pos: "",
      at: "",
      text: String(raw)
    }];
  };
  const sendReply = async () => {
    const txt = reply.trim();
    if (!txt || !chatFor || busy) return;
    setBusy(true);
    const send = () => API("add_renewal_note", {
      id: chatFor.id,
      text: txt
    });
    let r = null;
    try {
      r = await send();
    } catch (e) {
      r = null;
    }
    if (!r || !r.ok) {
      try {
        await new Promise(res => setTimeout(res, 500));
        r = await send();
      } catch (e) {
        r = null;
      }
    } // retry once if it was momentarily blocked
    if (r && r.ok) {
      chatFor.renewal_note = JSON.stringify(r.thread || []);
      setReply("");
      setChatFor({
        ...chatFor
      });
    } // keep the typed note if it still didn't go through
    setBusy(false);
  };
  const fullName = c => `${c.first_name || ""} ${c.last_name || ""}`.trim();
  const rows = clients.filter(c => !isPeso(c)).map(c => {
    const n = dueDays(c);
    const paid = clientPaid(c);
    return {
      c,
      n,
      paid,
      due: fmtDate(clientDueDate(c)),
      bill: fmtDate(clientBillDate(c))
    };
  }).filter(r => r.n !== null);
  const count = pred => rows.filter(pred).length;
  const buckets = [{
    k: "Due Today",
    n: count(r => r.n === 0),
    tone: "accent"
  }, {
    k: "Tomorrow",
    n: count(r => r.n === 1),
    tone: "accent"
  }, {
    k: "This week",
    n: count(r => r.n >= 2 && r.n <= 7),
    tone: "warn"
  }, {
    k: "This month",
    n: count(r => r.n >= 8 && r.n <= 31),
    tone: "good"
  }, {
    k: "Overdue 7 days",
    n: count(r => r.n <= -1 && r.n >= -7),
    tone: "bad"
  }, {
    k: "Overdue 15 days",
    n: count(r => r.n <= -8 && r.n >= -15),
    tone: "bad"
  }];
  const matchers = {
    "All": () => true,
    "All Overdue": r => r.n != null && r.n < 0 && !r.paid,
    "Unpaid": r => !r.paid,
    "Due in 3 Days": r => r.n === 3,
    "Due in 2 Days": r => r.n === 2,
    "Due Today": r => r.n === 0,
    "Past Due 1 Day": r => r.n === -1,
    "Past Due 2 Days": r => r.n === -2,
    "Past Due 3 Days": r => r.n === -3,
    "Paid": r => r.paid
  };
  const shown = rows.filter(matchers[filter] || (() => true)).filter(r => {
    const s = q.trim().toLowerCase();
    return !s || (r.c.account_number || "").toLowerCase().includes(s) || fullName(r.c).toLowerCase().includes(s);
  }).filter(r => {
    if (!dateFrom && !dateTo) return true;
    const lp = String(lastPayments[r.c.account_number] || "").slice(0, 10);
    if (!lp) return false;
    if (dateFrom && lp < dateFrom) return false;
    if (dateTo && lp > dateTo) return false;
    return true;
  }).sort((a, b) => a.n - b.n);
  const dueLabel = n => n < 0 ? `Overdue ${-n}d` : n === 0 ? "Due today" : `In ${n}d`;
  const dueColor = n => n < 0 ? t.bad : n === 0 ? t.warn : t.textMuted;
  const doDownload = () => {
    const esc = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
    const head = ["Client", "Account", "Contact", "Coordinates", "Note", "Area", "MRC", "Bill Date", "Due Date", "Days", "Last Paid", "Status"];
    const lines = shown.map(r => [fullName(r.c), r.c.account_number, r.c.phone, r.c.coordinates, parseThread(r.c.renewal_note).map(m => (m.by ? m.by + ": " : "") + m.text).join(" | "), r.c.area, r.c.mrc, r.bill, r.due, dueLabel(r.n), lastPayments[r.c.account_number] || "", r.paid ? "Paid" : "Unpaid"].map(esc).join(","));
    const csv = [head.join(","), ...lines].join("\n");
    const url = URL.createObjectURL(new Blob([csv], {
      type: "text/csv;charset=utf-8"
    }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `renewals_${filter.replace(/\s+/g, "-").toLowerCase()}_${fmtDate(new Date())}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const doPrint = () => {
    const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const rowsHtml = shown.map(r => `<tr><td>${esc(fullName(r.c))}</td><td>${esc(r.c.account_number)}</td><td>${esc(r.c.phone)}</td><td>${esc(parseThread(r.c.renewal_note).map(m => (m.by ? m.by + ": " : "") + m.text).join(" | "))}</td><td>${esc(r.c.area)}</td><td style="text-align:right">${r.c.mrc ? "₱" + Number(r.c.mrc).toLocaleString() : "—"}</td><td>${esc(r.bill)}</td><td>${esc(r.due)} (${esc(dueLabel(r.n))})</td><td>${esc(lastPayments[r.c.account_number] || "—")}</td><td>${r.paid ? "Paid" : "Unpaid"}</td></tr>`).join("");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Renewals — ${esc(filter)}</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:26px;color:#111}h1{font-size:19px;margin:0}.sub{color:#555;font-size:12px;margin:4px 0 14px}table{width:100%;border-collapse:collapse;font-size:11.5px}th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}th{background:#f1f3f5}</style></head><body><h1>TIONGTECH — Renewal Queue</h1><div class="sub">Filter: <b>${esc(filter)}</b>${q ? " · search: " + esc(q) : ""} · ${shown.length} clients · ${esc(fmtDate(new Date()))}</div><table><thead><tr><th>Client</th><th>Account</th><th>Contact</th><th>Note</th><th>Area</th><th>MRC</th><th>Bill Date</th><th>Due Date</th><th>Last Paid</th><th>Status</th></tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
    }, 350);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-6 gap-3.5"
  }, buckets.map(b => /*#__PURE__*/React.createElement(Card, {
    key: b.k,
    t: t,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12,
      fontWeight: 600
    }
  }, b.k), /*#__PURE__*/React.createElement("div", {
    className: "mt-1",
    style: {
      color: {
        accent: t.accent,
        warn: t.warn,
        good: t.good,
        bad: t.bad
      }[b.tone],
      fontSize: 26,
      fontWeight: 800
    }
  }, b.n), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, "clients")))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 pt-4 pb-3"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Renewal queue"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "7px 11px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 14,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search account # or name\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: 200
    }
  }), q && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQ(""),
    style: {
      background: "transparent",
      border: "none",
      color: t.textFaint,
      cursor: "pointer",
      display: "inline-flex",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 13
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, shown.length, " shown"), /*#__PURE__*/React.createElement("select", {
    value: filter,
    onChange: e => setFilter(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 11px",
      fontSize: 13,
      outline: "none"
    }
  }, Object.keys(matchers).map(k => /*#__PURE__*/React.createElement("option", {
    key: k,
    style: {
      background: t.surface,
      color: t.text
    }
  }, k))), /*#__PURE__*/React.createElement("button", {
    onClick: doDownload,
    className: "inline-flex items-center gap-1.5",
    title: "Download filtered list (CSV)",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), /*#__PURE__*/React.createElement("button", {
    onClick: doPrint,
    className: "inline-flex items-center gap-1.5",
    title: "Print filtered list",
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 15
  }), "Print"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap px-5 pb-3",
    style: {
      fontSize: 12.5,
      color: t.textMuted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Paid between"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateFrom,
    onChange: e => setDateFrom(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }), /*#__PURE__*/React.createElement("span", null, "and"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateTo,
    onChange: e => setDateTo(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }), (dateFrom || dateTo) && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDateFrom("");
      setDateTo("");
    },
    style: {
      background: "transparent",
      color: t.textFaint,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5
    }
  }, "Clear"), (dateFrom || dateTo) && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.good,
      fontWeight: 600
    }
  }, "\xB7 ", shown.length, " client", shown.length === 1 ? "" : "s", " paid in range")), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 800
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["Client", "Note", "Area", "MRC", "Bill Date", "Due Date", "Last Paid", "Payment"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: h === "MRC" ? "right" : "left",
      padding: "10px 16px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, shown.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 600
    }
  }, fullName(r.c)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginTop: 2
    }
  }, r.c.phone ? r.c.phone : "no contact", (() => {
    const ll = r.c.coordinates ? parseLatLng(r.c.coordinates) : null;
    if (!ll) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`,
      target: "_blank",
      rel: "noreferrer",
      style: {
        color: t.accent,
        fontWeight: 600,
        textDecoration: "none"
      }
    }, "\uD83D\uDCCD map"));
  })())), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 16px",
      fontSize: 12.5,
      maxWidth: 240
    }
  }, (() => {
    const th = parseThread(r.c.renewal_note);
    const last = th[th.length - 1];
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => {
        setChatFor(r.c);
        setReply("");
      },
      style: {
        cursor: "pointer"
      },
      title: "Open renewal chat"
    }, th.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, last.text), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, last.by || "note", last.pos ? " · " + last.pos : "", th.length > 1 ? ` · 💬 ${th.length}` : "")) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.accent,
        fontWeight: 600
      }
    }, "\uD83D\uDCAC add note"));
  })()), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, r.c.area), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.text,
      fontSize: 13,
      textAlign: "right",
      fontWeight: 600
    }
  }, r.c.mrc ? peso(r.c.mrc) : "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13,
      whiteSpace: "nowrap"
    }
  }, r.bill), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      fontSize: 13,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: dueColor(r.n),
      fontWeight: 600
    }
  }, r.due), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, "\xB7 ", dueLabel(r.n))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      fontSize: 12.5,
      color: r.paid ? t.good : t.textFaint,
      fontWeight: 600,
      whiteSpace: "nowrap"
    }
  }, lastPayments[r.c.account_number] || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full",
    style: {
      background: (r.paid ? t.good : t.bad) + "22",
      color: r.paid ? t.good : t.bad,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px"
    }
  }, r.paid ? "Paid" : "Unpaid")))), shown.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 8,
    style: {
      padding: "24px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, q ? `No renewal client matches “${q}”. (PESOWiFi accounts are excluded from renewals.)` : "No clients in this filter."))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 10
    }
  }, shown.map((r, i) => {
    const ll = r.c.coordinates ? parseLatLng(r.c.coordinates) : null;
    const th = parseThread(r.c.renewal_note);
    const last = th[th.length - 1];
    return /*#__PURE__*/React.createElement("div", {
      key: "m" + i,
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 15
      }
    }, fullName(r.c)), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5,
        marginTop: 2
      }
    }, r.c.phone || "no contact", ll ? /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`,
      target: "_blank",
      rel: "noreferrer",
      style: {
        color: "#f59e0b",
        fontWeight: 600,
        textDecoration: "none"
      }
    }, "\uD83D\uDCCD map")) : null)), /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        flexShrink: 0,
        background: (r.paid ? t.good : t.bad) + "22",
        color: r.paid ? t.good : t.bad,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px"
      }
    }, r.paid ? "Paid" : "Unpaid")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "7px 12px",
        marginTop: 10,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Area"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, r.c.area || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "MRC"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600
      }
    }, r.c.mrc ? peso(r.c.mrc) : "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Bill date"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, r.bill)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Due"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: dueColor(r.n),
        fontWeight: 600
      }
    }, r.due, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 10.5
      }
    }, "\xB7 ", dueLabel(r.n)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Last paid"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: r.paid ? t.good : t.textFaint,
        fontWeight: 600
      }
    }, lastPayments[r.c.account_number] || "—"))), /*#__PURE__*/React.createElement("div", {
      onClick: () => {
        setChatFor(r.c);
        setReply("");
      },
      style: {
        cursor: "pointer",
        marginTop: 10,
        paddingTop: 10,
        borderTop: `1px solid ${t.borderSoft}`
      },
      title: "Open renewal chat"
    }, th.length ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontSize: 12.5,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, "\uD83D\uDCAC ", last.text), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, last.by || "note", th.length > 1 ? ` · ${th.length} messages` : "", " \xB7 tap to open")) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.accent,
        fontWeight: 600,
        fontSize: 12.5
      }
    }, "\uD83D\uDCAC Add note")));
  }), shown.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, q ? `No renewal client matches “${q}”.` : "No clients in this filter."))), chatFor && (() => {
    const th = parseThread(chatFor.renewal_note);
    const meCan = can("edit_clients") || canView("renew");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 90,
        display: "grid",
        placeItems: "center",
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => setChatFor(null),
      style: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.6)"
      }
    }), /*#__PURE__*/React.createElement(Card, {
      t: t,
      style: {
        position: "relative",
        zIndex: 91,
        width: "100%",
        maxWidth: 460,
        padding: 0,
        maxHeight: "82vh",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between px-5 py-4",
      style: {
        borderBottom: `1px solid ${t.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 800,
        fontSize: 15
      }
    }, "Renewal chat"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 12
      }
    }, fullName(chatFor), " \xB7 ", chatFor.account_number)), /*#__PURE__*/React.createElement("button", {
      onClick: () => setChatFor(null),
      className: "grid place-items-center rounded-lg",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: t.textMuted,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 15
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: "auto",
        padding: "12px 16px",
        flex: 1
      }
    }, th.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 12.5,
        textAlign: "center",
        padding: "20px 0"
      }
    }, "No messages yet. Start the thread below."), th.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontSize: 12,
        fontWeight: 700
      }
    }, m.by || "Note", " ", m.pos && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.accent,
        fontWeight: 600
      }
    }, "\xB7 ", m.pos), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontWeight: 400,
        fontSize: 10.5
      }
    }, m.at)), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 13,
        lineHeight: 1.45,
        background: t.surface2,
        borderRadius: 10,
        padding: "8px 11px",
        marginTop: 3
      }
    }, m.text)))), meCan && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 px-4 py-3",
      style: {
        borderTop: `1px solid ${t.border}`
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: reply,
      onChange: e => setReply(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") sendReply();
      },
      placeholder: "Write a reply\u2026",
      className: "flex-1 rounded-xl outline-none",
      style: {
        background: t.surface2,
        color: t.text,
        border: `1px solid ${t.border}`,
        padding: "9px 12px",
        fontSize: 13
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: sendReply,
      disabled: busy || !reply.trim(),
      style: {
        background: t.accent,
        color: "#04222A",
        border: "none",
        borderRadius: 10,
        padding: "9px 15px",
        fontSize: 13,
        fontWeight: 700,
        cursor: busy || !reply.trim() ? "default" : "pointer",
        opacity: busy || !reply.trim() ? 0.6 : 1
      }
    }, "Send"))));
  })());
}
function RenewalsOverview({
  t
}) {
  const [openDay, setOpenDay] = useState(null);
  const [dayFilter, setDayFilter] = useState("All");
  const fullName = c => `${c.first_name || ""} ${c.last_name || ""}`.trim();
  const isPaidC = c => clientPaid(c);
  const byDay = {};
  clients.forEach(c => {
    if (isPeso(c)) return;
    const sub = _pdate(c.subscription_date);
    if (!sub) return;
    const d = sub.getDate();
    (byDay[d] = byDay[d] || []).push(c);
  });
  const days = Object.keys(byDay).map(Number).sort((a, b) => a - b);
  const maxTotal = days.reduce((m, d) => Math.max(m, byDay[d].length), 1);
  const rows = clients.map(c => ({
    c,
    n: dueDays(c),
    paid: isPaidC(c)
  })).filter(r => r.n !== null);
  const cnt = p => rows.filter(p).length;
  const cards = [{
    k: "Due Today",
    n: cnt(r => r.n === 0),
    tone: "accent"
  }, {
    k: "Tomorrow",
    n: cnt(r => r.n === 1),
    tone: "accent"
  }, {
    k: "This week",
    n: cnt(r => r.n >= 2 && r.n <= 7),
    tone: "warn"
  }, {
    k: "This month",
    n: cnt(r => r.n >= 8 && r.n <= 31),
    tone: "good"
  }, {
    k: "Overdue 7 days",
    n: cnt(r => r.n <= -1 && r.n >= -7),
    tone: "bad"
  }, {
    k: "Overdue 15 days",
    n: cnt(r => r.n <= -8 && r.n >= -15),
    tone: "bad"
  }];
  const dayClients = openDay ? byDay[openDay] || [] : [];
  const shown = dayClients.filter(c => dayFilter === "All" || (dayFilter === "Paid" ? isPaidC(c) : !isPaidC(c)));
  const rowData = shown.map(c => [c.account_number || "", fullName(c), c.phone || "", c.address || "", fmtDate(clientDueDate(c)), c.mrc ? Number(c.mrc) : "", isPaidC(c) ? "Paid" : "Unpaid"]);
  const doDownload = () => {
    downloadCSV(`clients_due_${openDay}_${dayFilter.toLowerCase()}.csv`, ["Account #", "Name", "Contact #", "Address", "Due Date", "Amount", "Status"], rowData);
  };
  const doPrint = () => {
    const title = dayFilter === "Unpaid" ? "For Immediate Follow-up" : `List of Clients Due Every ${openDay}`;
    const prows = shown.map(c => [c.account_number || "", fullName(c), c.phone || "", c.address || "", fmtDate(clientDueDate(c)), c.mrc ? peso(c.mrc) : ""]);
    printDoc(title, ["Account #", "Name", "Contact #", "Address", "Due Date", "Amount to be Collected"], prows);
  };
  const iconBtn = color => ({
    background: "transparent",
    border: `1px solid ${t.border}`,
    color,
    cursor: "pointer",
    padding: "7px 9px",
    borderRadius: 10,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12.5,
    fontWeight: 600
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-4 pb-3"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "renewed / due \xB7 click a day")
  }, "Renewals by due day")), /*#__PURE__*/React.createElement("div", {
    className: "px-5 pb-5 grid md:grid-cols-2 gap-x-8 gap-y-3.5"
  }, days.map(d => {
    const list = byDay[d];
    const total = list.length;
    const paid = list.filter(isPaidC).length;
    const pct = total ? Math.round(paid / total * 100) : 0;
    const open = openDay === d;
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => {
        setOpenDay(open ? null : d);
        setDayFilter("All");
      },
      style: {
        background: open ? t.surface2 : "transparent",
        border: "none",
        borderRadius: 10,
        padding: "6px 8px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between",
      style: {
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 13
      }
    }, "Due every ", d, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontWeight: 500,
        fontSize: 11.5
      }
    }, " \xB7 ", total, " client", total === 1 ? "" : "s")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 13
      }
    }, paid, "/", total, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "renewed"))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg",
      style: {
        height: 9,
        background: t.borderSoft,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg",
      style: {
        height: 9,
        width: `${Math.max(pct, total ? 3 : 0)}%`,
        background: pct >= 80 ? t.good : pct >= 40 ? t.warn : t.bad,
        transition: "width .7s ease"
      }
    })));
  }), days.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 13
    }
  }, "No subscription dates yet \u2014 run the Taoki sync to populate them."))), openDay && /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 pt-4 pb-3",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Clients Due Every ", openDay, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 500
    }
  }, "\xB7 ", shown.length, " shown")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("select", {
    value: dayFilter,
    onChange: e => setDayFilter(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "7px 11px",
      fontSize: 13,
      outline: "none"
    }
  }, ["All", "Paid", "Unpaid"].map(k => /*#__PURE__*/React.createElement("option", {
    key: k,
    style: {
      background: t.surface,
      color: t.text
    }
  }, k))), /*#__PURE__*/React.createElement("button", {
    onClick: doDownload,
    style: iconBtn(t.text)
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), /*#__PURE__*/React.createElement("button", {
    onClick: doPrint,
    style: iconBtn(t.accent)
  }, /*#__PURE__*/React.createElement(IconPrint, {
    size: 15
  }), "Print"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenDay(null),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 820
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["Account #", "Name", "Contact #", "Address", "Due Date", "Amount", "Status"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: h === "Amount" ? "right" : "left",
      padding: "10px 16px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, shown.map((c, i) => {
    const paid = isPaidC(c);
    return /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        borderBottom: `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textFaint,
        fontSize: 12,
        fontFamily: "ui-monospace, monospace"
      }
    }, c.account_number || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.text,
        fontWeight: 600,
        fontSize: 13
      }
    }, fullName(c)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 13
      }
    }, c.phone || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 12.5
      }
    }, c.address || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 13,
        whiteSpace: "nowrap"
      }
    }, fmtDate(clientDueDate(c))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.text,
        fontSize: 13,
        textAlign: "right",
        fontWeight: 600
      }
    }, c.mrc ? peso(c.mrc) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: (paid ? t.good : t.bad) + "22",
        color: paid ? t.good : t.bad,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px"
      }
    }, paid ? "Paid" : "Unpaid")));
  }), shown.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      padding: "22px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No clients in this filter.")))))));
}
function PonNap({
  t
}) {
  const [oltRows, setOltRows] = useState(olts);
  const [napRows, setNapRows] = useState(napDevices);
  const [oltQ, setOltQ] = useState("");
  const [napQ, setNapQ] = useState("");
  const [modal, setModal] = useState(null); // 'olt' | 'nap'
  const [flash, setFlash] = useState("");
  const blankOlt = {
    name: "",
    standard: OLT_STANDARDS[0],
    total_pon_ports: 16,
    description: "",
    areas_served: ""
  };
  const blankNap = {
    olt: oltRows[0] ? oltRows[0].name : "",
    pon: "PON 1",
    name: "",
    total_ports: 8,
    coordinates: "",
    description: ""
  };
  const [olt, setOlt] = useState(blankOlt);
  const [nap, setNap] = useState(blankNap);
  const [editingOlt, setEditingOlt] = useState(null);
  const [editingNap, setEditingNap] = useState(null);
  const [napClients, setNapClients] = useState(null);
  const [napClientList, setNapClientList] = useState([]);
  const [relocSel, setRelocSel] = useState({});
  const totalPorts = napRows.reduce((a, n) => a + Number(n.total_ports || 0), 0);
  const usedPorts = napRows.reduce((a, n) => a + Number(n.used || 0), 0);
  const util = totalPorts ? Math.round(usedPorts / totalPorts * 100) : 0;
  const saveOlt = () => {
    if (!olt.name.trim()) return;
    if (!window.confirm(editingOlt ? "Save changes to this OLT?" : "Add this OLT?")) return;
    const rec = {
      ...olt,
      total_pon_ports: Number(olt.total_pon_ports) || 16
    };
    if (editingOlt) {
      rec.id = editingOlt.id;
      _save("update_olt", rec);
      setOltRows(r => r.map(x => x === editingOlt ? rec : x));
      setFlash("OLT updated");
    } else {
      _save("create_olt", rec).then(r => {
        if (r && r.ok && r.id) rec.id = r.id;
      });
      setOltRows(r => [rec, ...r]);
      setFlash("OLT added");
    }
    setOlt(blankOlt);
    setEditingOlt(null);
    setModal(null);
    setTimeout(() => setFlash(""), 2500);
  };
  const editOlt = o => {
    setOlt({
      ...blankOlt,
      ...o
    });
    setEditingOlt(o);
    setModal("olt");
  };
  const removeOlt = o => {
    const naps = napRows.filter(n => n.olt === o.name);
    const withClients = naps.filter(n => clientsOn(n.name).length > 0);
    if (withClients.length > 0) {
      const total = withClients.reduce((a, n) => a + clientsOn(n.name).length, 0);
      window.alert(`Can't delete "${o.name}" yet — ${withClients.length} NAP${withClients.length === 1 ? "" : "s"} under it still ${withClients.length === 1 ? "has" : "have"} ${total} connected client${total === 1 ? "" : "s"}. Relocate those clients first (click the client badge on each NAP), then delete.`);
      return;
    }
    const msg = naps.length > 0 ? `Delete OLT "${o.name}"? This will also delete its ${naps.length} NAP device${naps.length === 1 ? "" : "s"} and all PON/NAP ports. This cannot be undone.` : `Delete OLT "${o.name}"? This also removes its PON ports. This cannot be undone.`;
    if (!window.confirm(msg)) return;
    // cascade: delete each (client-free) NAP under this OLT, then the OLT
    naps.forEach(n => {
      if (n.id) _save("delete_nap_device", {
        id: n.id
      });
    });
    if (naps.length > 0) setNapRows(r => r.filter(n => n.olt !== o.name));
    if (o.id) _save("delete_olt", {
      id: o.id
    });
    setOltRows(r => r.filter(x => x !== o));
    setFlash(naps.length > 0 ? `OLT + ${naps.length} NAP${naps.length === 1 ? "" : "s"} deleted` : "OLT deleted");
    setTimeout(() => setFlash(""), 2800);
  };
  const addOlt = () => {
    setOlt(blankOlt);
    setEditingOlt(null);
    setModal("olt");
  };
  const saveNap = () => {
    if (!nap.name.trim()) return;
    if (!window.confirm(editingNap ? "Save changes to this NAP?" : "Add this NAP?")) return;
    const rec = {
      ...nap,
      total_ports: Number(nap.total_ports) || 8,
      used: editingNap ? editingNap.used : 0
    };
    if (editingNap) {
      rec.id = editingNap.id;
      _save("update_nap_device", {
        id: editingNap.id,
        name: nap.name,
        total_ports: rec.total_ports,
        coordinates: nap.coordinates,
        description: nap.description
      });
      setNapRows(r => r.map(x => x === editingNap ? rec : x));
      setFlash("NAP device updated");
    } else {
      _save("create_nap_device", {
        olt_name: nap.olt,
        pon_number: parseInt(String(nap.pon).replace(/[^0-9]/g, ""), 10) || 1,
        name: nap.name,
        total_ports: rec.total_ports,
        coordinates: nap.coordinates,
        description: nap.description
      }).then(r => {
        if (r && r.ok && r.id) rec.id = r.id;
      });
      setNapRows(r => [rec, ...r]);
      setFlash("NAP device added");
    }
    setNap(blankNap);
    setEditingNap(null);
    setModal(null);
    setTimeout(() => setFlash(""), 2500);
  };
  const editNap = n => {
    setNap({
      ...blankNap,
      ...n
    });
    setEditingNap(n);
    setModal("nap");
  };
  const clientsOn = name => (clients || []).filter(c => (c.nap || "") === name);
  const openNapClients = n => {
    setNapClients(n);
    setNapClientList(clientsOn(n.name));
    setRelocSel({});
  };
  const relocateClient = (c, target) => {
    if (!target || target === c.nap) return;
    const rec = {
      ...c,
      nap: target
    };
    _save("update_client", rec);
    const gi = (clients || []).indexOf(c);
    if (gi >= 0) clients[gi] = rec;
    setNapClientList(list => list.filter(x => x !== c));
    setFlash("Client moved to " + target);
    setTimeout(() => setFlash(""), 2500);
  };
  const removeNap = n => {
    if (clientsOn(n.name).length > 0) {
      openNapClients(n);
      return;
    } // relocate connected clients first
    if (!window.confirm(`Delete NAP "${n.name || ""}"? This also removes its ports. This cannot be undone.`)) return;
    if (n.id) _save("delete_nap_device", {
      id: n.id
    });
    setNapRows(r => r.filter(x => x !== n));
    setNapClients(null);
    setFlash("NAP device deleted");
    setTimeout(() => setFlash(""), 2500);
  };
  const addNap = () => {
    setNap(blankNap);
    setEditingNap(null);
    setModal("nap");
  };
  const btn = primary => ({
    background: primary ? t.accent : t.surface2,
    color: primary ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
    border: primary ? "none" : `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 14px",
    borderRadius: 11
  });
  const selStyle = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    marginTop: 5
  };
  const lbl = {
    color: t.textMuted,
    fontSize: 11.5,
    fontWeight: 600
  };
  const ponOptions = olt.name && oltRows.find(o => o.name === nap.olt) ? Array.from({
    length: (oltRows.find(o => o.name === nap.olt) || {}).total_pon_ports || 0
  }, (_, i) => "PON " + (i + 1)) : Array.from({
    length: 16
  }, (_, i) => "PON " + (i + 1));
  const oltFiltered = oltRows.filter(o => `${o.name || ""} ${o.standard || ""} ${o.description || ""} ${o.areas_served || ""}`.toLowerCase().includes(oltQ.trim().toLowerCase()));
  const _napOltMap = {};
  napRows.forEach(n => {
    _napOltMap[n.name] = n.olt;
  });
  const _oltOf = c => c.olt || _napOltMap[c.nap] || "";
  const oltCounts = name => {
    let reg = 0,
      peso = 0;
    (clients || []).forEach(c => {
      if (_oltOf(c) === name) {
        if (isPeso(c)) peso++;else reg++;
      }
    });
    return {
      reg,
      peso
    };
  };
  const napFiltered = napRows.filter(n => `${n.name || ""} ${n.olt || ""} ${n.pon || ""} ${n.description || ""}`.toLowerCase().includes(napQ.trim().toLowerCase()));
  const searchBox = (val, setVal, ph) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "7px 11px",
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 14,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: val,
    onChange: e => setVal(e.target.value),
    placeholder: ph,
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 12.5,
      width: "100%"
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.goodSoft,
      color: t.good,
      padding: "10px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16
  }), flash), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "OLTs",
    value: oltRows.length,
    icon: Server,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "NAP Devices",
    value: napRows.length,
    icon: Network,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Ports Used",
    value: `${usedPorts} / ${totalPorts}`,
    icon: Wifi,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Utilization",
    value: util + "%",
    icon: Gauge,
    tone: util > 75 ? "warn" : "good",
    sub: `${napRows.filter(n => n.used / n.total_ports >= 0.95).length} NAPs full`
  })), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3 px-5 pt-4 pb-3 flex-wrap",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "OLT devices"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, searchBox(oltQ, setOltQ, "Search OLT, area…"), canAdd("edit_pon") && /*#__PURE__*/React.createElement("button", {
    onClick: addOlt,
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "Add OLT"))), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 720
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["OLT name", "Standard", "Total PON", "Description / VLAN", "Areas served", "Connected"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: h === "Total PON" ? "right" : "left",
      padding: "10px 16px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h)), /*#__PURE__*/React.createElement("th", {
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, oltFiltered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      padding: "14px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, oltQ ? "No OLT matches your search." : "No OLT devices yet.")), oltFiltered.map((o, i) => /*#__PURE__*/React.createElement("tr", {
    key: o.name + i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.text,
      fontWeight: 600,
      fontSize: 13
    }
  }, o.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, o.standard), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      textAlign: "right",
      color: t.text,
      fontSize: 13,
      fontWeight: 600
    }
  }, o.total_pon_ports), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, o.description), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, o.areas_served), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      fontSize: 12.5,
      whiteSpace: "nowrap"
    }
  }, (() => {
    const cnt = oltCounts(o.name);
    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, cnt.reg), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "client", cnt.reg === 1 ? "" : "s"), cnt.peso > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, " \xB7 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.violet || t.accent
      }
    }, cnt.peso), " PESOWiFi") : null);
  })()), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 12px",
      textAlign: "right"
    }
  }, can("edit_pon") && /*#__PURE__*/React.createElement("button", {
    onClick: () => editOlt(o),
    title: "Edit OLT",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 16
  })), canDel("edit_pon") && /*#__PURE__*/React.createElement("button", {
    onClick: () => removeOlt(o),
    title: "Delete OLT",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2,
      marginLeft: 4,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 8,
      padding: "0 14px 14px"
    }
  }, oltFiltered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 6px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, oltQ ? "No OLT matches your search." : "No OLT devices yet."), oltFiltered.map((o, i) => {
    const cnt = oltCounts(o.name);
    return /*#__PURE__*/React.createElement("div", {
      key: "m" + o.name + i,
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 14
      }
    }, o.name), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 12
      }
    }, o.standard || "—", " \xB7 ", o.total_pon_ports, " PON")), /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-3",
      style: {
        flexShrink: 0
      }
    }, can("edit_pon") && /*#__PURE__*/React.createElement("button", {
      onClick: () => editOlt(o),
      title: "Edit OLT",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 17
    })), canDel("edit_pon") && /*#__PURE__*/React.createElement("button", {
      onClick: () => removeOlt(o),
      title: "Delete OLT",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 17
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, cnt.reg), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "client", cnt.reg === 1 ? "" : "s"), cnt.peso > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, " \xB7 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.violet || t.accent
      }
    }, cnt.peso), " PESOWiFi") : null), (o.description || o.areas_served) && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        fontSize: 12,
        color: t.textFaint
      }
    }, o.description ? /*#__PURE__*/React.createElement("div", null, "VLAN: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, o.description)) : null, o.areas_served ? /*#__PURE__*/React.createElement("div", null, "Areas: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, o.areas_served)) : null));
  }))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3 px-5 pt-4 pb-3 flex-wrap",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "NAP devices"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, searchBox(napQ, setNapQ, "Search NAP, OLT, PON…"), canAdd("edit_pon") && /*#__PURE__*/React.createElement("button", {
    onClick: addNap,
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "Add NAP"))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 grid md:grid-cols-2 gap-x-8 gap-y-4"
  }, napFiltered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12.5,
      gridColumn: "1 / -1"
    }
  }, napQ ? "No NAP matches your search." : "No NAP devices yet."), napFiltered.map((n, i) => {
    const pct = n.total_ports ? Math.round(n.used / n.total_ports * 100) : 0;
    const c = pct >= 95 ? t.bad : pct >= 80 ? t.warn : t.good;
    const full = pct >= 95;
    return /*#__PURE__*/React.createElement("div", {
      key: n.name + i
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between",
      style: {
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 min-w-0"
    }, /*#__PURE__*/React.createElement(Circle, {
      size: 9,
      fill: c,
      color: c
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 13
      }
    }, n.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 11.5,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, "\xB7 ", n.olt, " \xB7 ", n.pon)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, full && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.bad,
        fontSize: 10.5,
        fontWeight: 800,
        textTransform: "uppercase"
      }
    }, "Full"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontSize: 12.5,
        fontWeight: 700
      }
    }, n.used, "/", n.total_ports), (() => {
      const cc = clientsOn(n.name).length;
      return cc > 0 ? /*#__PURE__*/React.createElement("button", {
        onClick: () => openNapClients(n),
        title: "View / relocate connected clients",
        style: {
          background: t.accent + "22",
          color: t.accent,
          border: "none",
          borderRadius: 20,
          padding: "2px 9px",
          fontSize: 10.5,
          fontWeight: 800,
          cursor: "pointer"
        }
      }, cc, " client", cc === 1 ? "" : "s") : null;
    })(), can("edit_pon") && /*#__PURE__*/React.createElement("button", {
      onClick: () => editNap(n),
      title: "Edit NAP",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 15
    })), canDel("edit_pon") && /*#__PURE__*/React.createElement("button", {
      onClick: () => removeNap(n),
      title: "Delete NAP",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 15
    })))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg",
      style: {
        height: 9,
        background: t.borderSoft
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg",
      style: {
        height: 9,
        width: `${pct}%`,
        background: c,
        boxShadow: full ? `0 0 8px ${t.bad}` : "none",
        transition: "width .8s ease"
      }
    })), n.description && /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginTop: 3
      }
    }, n.description));
  }))), napClients && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 65,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setNapClients(null),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      padding: 20,
      width: "min(660px, 94vw)",
      maxHeight: "86vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Clients on ", napClients.name), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNapClients(null),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  }))), napClientList.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.good,
      fontSize: 13.5,
      fontWeight: 700,
      padding: "18px 0"
    }
  }, "\u2713 No clients connected \u2014 this NAP is safe to delete.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginTop: 4,
      lineHeight: 1.55
    }
  }, napClientList.length, " client", napClientList.length === 1 ? "" : "s", " connected. Move each to another NAP; once the list is empty you can delete this NAP."), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 space-y-2"
  }, napClientList.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: (c.account_number || "") + i,
    className: "rounded-xl",
    style: {
      border: `1px solid ${t.border}`,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 190
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 13
    }
  }, `${c.first_name || ""} ${c.last_name || ""}`.trim() || "—", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.accent,
      fontSize: 11.5,
      fontFamily: "ui-monospace, monospace"
    }
  }, c.account_number || "")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12
    }
  }, c.address || "—", c.napPort ? " · port " + c.napPort : "")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: relocSel[c.account_number] || "",
    onChange: e => setRelocSel(s => ({
      ...s,
      [c.account_number]: e.target.value
    })),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "6px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Move to\u2026"), napRows.filter(x => x.name !== napClients.name).map(x => /*#__PURE__*/React.createElement("option", {
    key: x.name,
    value: x.name
  }, x.name, " (", x.used, "/", x.total_ports, ")"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => relocateClient(c, relocSel[c.account_number]),
    disabled: !relocSel[c.account_number],
    style: {
      background: relocSel[c.account_number] ? t.accent : t.surface2,
      color: relocSel[c.account_number] ? "#04222A" : t.textFaint,
      border: "none",
      borderRadius: 8,
      padding: "6px 14px",
      fontSize: 12.5,
      fontWeight: 700,
      cursor: relocSel[c.account_number] ? "pointer" : "default"
    }
  }, "Move"))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNapClients(null),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Close"), napClientList.length === 0 && canDel("edit_pon") && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const n = napClients;
      setNapClients(null);
      removeNap(n);
    },
    style: {
      background: t.bad,
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 800,
      cursor: "pointer"
    }
  }, "Delete NAP")))), modal === "olt" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal(null),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 560,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, editingOlt ? "Edit OLT" : "Add OLT"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setModal(null);
      setEditingOlt(null);
    },
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "OLT name"), /*#__PURE__*/React.createElement("input", {
    value: olt.name,
    onChange: e => setOlt({
      ...olt,
      name: e.target.value
    }),
    placeholder: "e.g. TALACOGON VSOL - A1-B2-C3-D4",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 mt-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Standard"), /*#__PURE__*/React.createElement("input", {
    value: olt.standard,
    onChange: e => setOlt({
      ...olt,
      standard: e.target.value
    }),
    placeholder: "e.g. IEEE 802.3ah (EPON)",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Total PON ports"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: olt.total_pon_ports,
    onChange: e => setOlt({
      ...olt,
      total_pon_ports: e.target.value
    }),
    min: "1",
    style: selStyle
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Description / VLAN"), /*#__PURE__*/React.createElement("input", {
    value: olt.description,
    onChange: e => setOlt({
      ...olt,
      description: e.target.value
    }),
    placeholder: "e.g. VLAN 250",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Areas served"), /*#__PURE__*/React.createElement("input", {
    value: olt.areas_served,
    onChange: e => setOlt({
      ...olt,
      areas_served: e.target.value
    }),
    placeholder: "e.g. Poblacion, San Isidro, ...",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setModal(null);
      setEditingOlt(null);
    },
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: saveOlt,
    style: btn(true)
  }, editingOlt ? "Save changes" : "Add OLT")))), modal === "nap" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal(null),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 560,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, editingNap ? "Edit NAP device" : "Add NAP device"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setModal(null);
      setEditingNap(null);
    },
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "OLT"), /*#__PURE__*/React.createElement("select", {
    value: nap.olt,
    disabled: !!editingNap,
    onChange: e => setNap({
      ...nap,
      olt: e.target.value
    }),
    style: {
      ...selStyle,
      opacity: editingNap ? 0.6 : 1
    }
  }, oltRows.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.name
  }, o.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "PON port"), /*#__PURE__*/React.createElement("select", {
    value: nap.pon,
    disabled: !!editingNap,
    onChange: e => setNap({
      ...nap,
      pon: e.target.value
    }),
    style: {
      ...selStyle,
      opacity: editingNap ? 0.6 : 1
    }
  }, ponOptions.map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 mt-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "NAP name"), /*#__PURE__*/React.createElement("input", {
    value: nap.name,
    onChange: e => setNap({
      ...nap,
      name: e.target.value
    }),
    placeholder: "e.g. B-NAP4",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Total ports"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: nap.total_ports,
    onChange: e => setNap({
      ...nap,
      total_ports: e.target.value
    }),
    min: "1",
    style: selStyle
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Coordinates"), /*#__PURE__*/React.createElement("input", {
    value: nap.coordinates,
    onChange: e => setNap({
      ...nap,
      coordinates: e.target.value
    }),
    placeholder: "lat, long",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Description"), /*#__PURE__*/React.createElement("input", {
    value: nap.description,
    onChange: e => setNap({
      ...nap,
      description: e.target.value
    }),
    placeholder: "e.g. Front of Elem. School",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setModal(null);
      setEditingNap(null);
    },
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: saveNap,
    style: btn(true)
  }, editingNap ? "Save changes" : "Add NAP")))));
}
function Financials({
  t
}) {
  const tt = TT({
    t
  });
  const K = FIN_KPI;
  const M = FIN_MONTH;
  const donut = expenses.map((e, i) => ({
    ...e,
    fill: [t.accent, t.violet, t.good, t.warn, "#F472B6", "#38BDF8", "#FB923C", t.bad, t.textFaint][i % 9]
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, M ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `Total Collection · ${M.lastLabel}`,
    value: pesoK(M.collLast),
    icon: Wallet,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `Total Expenses · ${M.lastLabel}`,
    value: pesoK(M.expLast),
    icon: Receipt,
    tone: "warn"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `Total Net · ${M.lastLabel}`,
    value: pesoK(M.netLast),
    icon: PiggyBank,
    tone: M.netLast >= 0 ? "good" : "bad"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `PESOWiFi Income · ${M.lastLabel}`,
    value: pesoK(M.pesoLast),
    icon: Wifi,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `Total Collection · ${M.thisLabel}`,
    value: pesoK(M.collThis),
    icon: Wallet,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `Total Expenses · ${M.thisLabel}`,
    value: pesoK(M.expThis),
    icon: Receipt,
    tone: "warn"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `Total Net · ${M.thisLabel}`,
    value: pesoK(M.netThis),
    icon: PiggyBank,
    tone: M.netThis >= 0 ? "good" : "bad"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: `PESOWiFi Income · ${M.thisLabel}`,
    value: pesoK(M.pesoThis),
    icon: Wifi,
    tone: "accent"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Collection \xB7 Last Month",
    value: "\u2014",
    icon: Wallet,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Expenses \xB7 Last Month",
    value: "\u2014",
    icon: Receipt,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Net \xB7 Last Month",
    value: "\u2014",
    icon: PiggyBank,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "PESOWiFi Income \xB7 Last Month",
    value: "\u2014",
    icon: Wifi,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Collection \xB7 This Month",
    value: "\u2014",
    icon: Wallet,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Expenses \xB7 This Month",
    value: "\u2014",
    icon: Receipt,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Net \xB7 This Month",
    value: "\u2014",
    icon: PiggyBank,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "PESOWiFi Income \xB7 This Month",
    value: "\u2014",
    icon: Wifi,
    tone: "accent"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-5 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    className: "lg:col-span-3",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "\u20B1 thousands")
  }, "Monthly cash flow"), !cashFlow.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 250,
      display: "grid",
      placeItems: "center",
      color: t.textFaint,
      fontSize: 13,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, "No data yet", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      marginTop: 4
    }
  }, "Record a payment or an expense and this fills in."))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 250
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(BarChart, {
    data: cashFlow,
    margin: {
      top: 4,
      right: 8,
      left: -18,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: t.grid,
    vertical: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "m",
    tick: {
      fill: t.textMuted,
      fontSize: 11.5
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt,
    cursor: {
      fill: t.accentSoft
    }
  }), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "inflow",
    name: "Inflow",
    fill: t.accent,
    radius: [5, 5, 0, 0]
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "outflow",
    name: "Outflow",
    fill: t.warn,
    radius: [5, 5, 0, 0]
  }))))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    className: "lg:col-span-2",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Expense breakdown"), !donut.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 250,
      display: "grid",
      placeItems: "center",
      color: t.textFaint,
      fontSize: 13,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, "No expenses recorded yet", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      marginTop: 4
    }
  }, "Add one, or import a CSV, and the breakdown appears."))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 250
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: donut,
    dataKey: "amt",
    nameKey: "cat",
    innerRadius: 52,
    outerRadius: 82,
    paddingAngle: 2,
    stroke: "none"
  }, donut.map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: d.fill
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-x-3 gap-y-1.5 mt-1"
  }, donut.slice(0, 6).map(d => /*#__PURE__*/React.createElement("div", {
    key: d.cat,
    className: "flex items-center gap-1.5",
    style: {
      fontSize: 11.5,
      color: t.textMuted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 8,
      background: d.fill
    }
  }), d.cat))))));
}
function MoneyModal({
  t,
  kind,
  row,
  onClose,
  onSaved
}) {
  const isInc = kind === "income";
  const today = new Date().toISOString().slice(0, 10);
  const init = isInc ? {
    paid_at: row && row.paid_at ? String(row.paid_at).slice(0, 10) : today,
    account: row && row.account || "",
    source: row && row.source || "",
    amount: row && row.amount != null ? row.amount : "",
    reference: row && row.reference || "",
    user_name: row && row.user || ""
  } : {
    spent_at: row && row.spent_at ? String(row.spent_at).slice(0, 10) : today,
    supplier: row && row.supplier || "",
    description: row && row.description || "",
    amount: row && row.amount != null ? row.amount : "",
    invoice: row && row.invoice || "",
    user_name: row && row.user || ""
  };
  const [form, setForm] = useState(init);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const lbl = {
    display: "block",
    color: t.textFaint,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
    marginBottom: 4
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none"
  };
  const save = async () => {
    if (form.amount === "" || isNaN(Number(form.amount))) {
      alert("Enter a valid amount.");
      return;
    }
    if (!window.confirm(row && row.id ? "Save changes to this entry?" : isInc ? "Record this payment?" : "Record this expense?")) return;
    setBusy(true);
    const action = row && row.id ? isInc ? "update_payment" : "update_expense" : isInc ? "create_payment" : "create_expense";
    const payload = isInc ? {
      id: row && row.id,
      paid_at: form.paid_at,
      account: form.account,
      source: form.source,
      amount: form.amount,
      reference: form.reference,
      user_name: form.user_name
    } : {
      id: row && row.id,
      spent_at: form.spent_at,
      supplier: form.supplier,
      description: form.description,
      amount: form.amount,
      invoice: form.invoice,
      user_name: form.user_name
    };
    // The handler now tells the truth about whether a row moved; this is what lets the screen say
    // so. Without it the .select() behind these actions would be invisible — a refused edit would
    // still close the modal and flash "Saved", which is the exact failure the check was added for.
    let res = null;
    try {
      res = await API(action, payload);
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Save failed."
      };
    }
    setBusy(false);
    if (res && res.ok) {
      onSaved();
      return;
    }
    // The modal stays OPEN on failure, deliberately: closing it would throw away what was typed,
    // and the entry did not land, so there is nothing to go back to. Leaving it up means the
    // officer can retry or copy the figures out.
    alert(res && res.error || "This entry was not saved.");
  };
  const fields = isInc ? [["Date", "paid_at", "date"], ["Amount (₱)", "amount", "number"], ["Account # (optional)", "account", "text"], ["Source (e.g. GCash, Cash)", "source", "text"], ["Reference (optional)", "reference", "text"], ["Posted by", "user_name", "text"]] : [["Date", "spent_at", "date"], ["Amount (₱)", "amount", "number"], ["Supplier / Category", "supplier", "text"], ["Description", "description", "text"], ["Invoice (optional)", "invoice", "text"], ["User", "user_name", "text"]];
  const supplierOpts = [...new Set([...(EXPENSE_CATS || []), ...(expenses || []).map(e => e.category || e.supplier), ...(FIN_RECENT || []).map(e => e.supplier)].map(x => (x || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 560,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, row && row.id ? "Edit" : "Add", " ", isInc ? "income" : "expense"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 grid grid-cols-2 gap-3"
  }, fields.map(([label, key, type]) => /*#__PURE__*/React.createElement("div", {
    key: key,
    style: key === "description" || key === "source" ? {
      gridColumn: "1 / -1"
    } : null
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, label), key === "supplier" ? /*#__PURE__*/React.createElement("select", {
    value: form[key] || "",
    onChange: e => {
      const v = e.target.value;
      if (v === "__new__") {
        const nv = (window.prompt("New supplier / category:", "") || "").trim();
        if (nv) set(key, nv);
      } else set(key, v);
    },
    style: {
      ...inp,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 select \u2014"), [...new Set([...(form[key] ? [String(form[key])] : []), ...supplierOpts])].map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o)), /*#__PURE__*/React.createElement("option", {
    value: "__new__"
  }, "\uFF0B New category\u2026")) : /*#__PURE__*/React.createElement("input", {
    type: type,
    value: form[key],
    onChange: e => set(key, e.target.value),
    style: inp
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    disabled: busy,
    style: {
      background: isInc ? t.good : t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Saving…" : "Save"))));
}
function _finRefresh(setPays, setExps) {
  return API("financials").then(f => {
    if (f && f.ok) {
      FIN_PAYMENTS = f.recentPayments || [];
      FIN_RECENT = f.recentExpenses || [];
      FIN_MONTH = f.monthKpi || FIN_MONTH;
      FIN_KPI = f.kpi || FIN_KPI;
      if (Array.isArray(f.incomeBySource)) income = f.incomeBySource;
      if (Array.isArray(f.expensesByCategory)) expenses = f.expensesByCategory;
      if (Array.isArray(f.financeMonths)) FIN_MONTHS = f.financeMonths;
      if (setPays) setPays(FIN_PAYMENTS);
      if (setExps) setExps(FIN_RECENT);
    }
  }).catch(() => {});
}
function IncomePage({
  t
}) {
  const tt = TT({
    t
  });
  const [pays, setPays] = useState(FIN_PAYMENTS);
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState("");
  const [q, setQ] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const refresh = () => _finRefresh(setPays, null);
  const applyRange = async () => {
    if (!dateFrom && !dateTo) {
      refresh();
      return;
    }
    try {
      const r = await API("fin_range", {
        kind: "income",
        from: dateFrom,
        to: dateTo
      });
      if (r && r.ok) setPays(r.rows || []);
    } catch (e) {}
  };
  const clearRange = () => {
    setDateFrom("");
    setDateTo("");
    refresh();
  };
  const onSaved = () => {
    setModal(null);
    setFlash("Saved");
    setTimeout(() => setFlash(""), 2500);
    refresh();
  };
  const del = async row => {
    if (!row.id || !window.confirm("Delete this payment?")) return;
    let res = null;
    try {
      res = await API("delete_payment", {
        id: row.id
      });
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Delete failed."
      };
    }
    // refresh() runs either way: on success the row goes, on failure the true ledger comes back,
    // so the list can never keep showing a deletion the database refused.
    refresh();
    if (res && res.ok) {
      setFlash("Deleted");
      setTimeout(() => setFlash(""), 2500);
      return;
    }
    setFlash("NOT deleted — " + (res && res.error || "the database refused it."));
    setTimeout(() => setFlash(""), 7000);
  };
  const s = q.trim().toLowerCase();
  const shown = pays.filter(p => !s || [p.date, p.account, p.source, p.reference, p.user, String(p.amount)].some(v => (v || "").toString().toLowerCase().includes(s)));
  const {
    sortKey,
    sortDir,
    onSort
  } = useSort("");
  const _INC_ACC = {
    "Date": p => p.paid_at || p.date || "",
    "Account #": p => (p.account || "").toLowerCase(),
    "Source": p => (p.source || "").toLowerCase(),
    "Amount": p => Number(p.amount) || 0,
    "Posted by": p => (p.user || "").toLowerCase(),
    "Reference": p => (p.reference || "").toLowerCase()
  };
  const _sortedRows = sortKey ? sortRows(shown, _INC_ACC[sortKey], sortDir) : shown;
  const visible = pageSize === "all" ? _sortedRows : _sortedRows.slice(0, pageSize);
  const download = () => {
    const rl = dateFrom || dateTo ? ` (${dateFrom || "start"} → ${dateTo || "today"})` : "";
    const fl = dateFrom || dateTo ? `_${dateFrom || "start"}_to_${dateTo || "today"}` : "";
    const rep = {
      title: "Income — Payments" + rl,
      file: "income" + fl,
      columns: ["Date", "Account #", "Source", "Amount", "Posted by", "Reference"],
      money: [3],
      rows: shown.map(p => [p.date || "", p.account || "", p.source || "", Number(p.amount) || 0, p.user || "", p.reference || ""])
    };
    astExportExcel(rep).catch(() => astExportPrint(rep));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.goodSoft || t.accentSoft,
      color: t.good,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, flash), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: TrendingUp
    }, "last 2 months")
  }, "Income by month"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 230
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(BarChart, {
    layout: "vertical",
    data: income,
    margin: {
      top: 0,
      right: 16,
      left: 8,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: t.grid,
    horizontal: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false,
    tickFormatter: v => pesoK(v)
  }), /*#__PURE__*/React.createElement(YAxis, {
    type: "category",
    dataKey: "src",
    width: 110,
    tick: {
      fill: t.textMuted,
      fontSize: 12
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt,
    cursor: {
      fill: t.accentSoft
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "amt",
    name: "Income",
    fill: t.good,
    radius: [0, 5, 5, 0]
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex justify-between",
    style: {
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, "Total income (2 mo)"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontWeight: 700
    }
  }, peso(income.reduce((a, x) => a + x.amt, 0))))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, FIN_KPI ? `${shown.length} shown · ${FIN_KPI.paymentCount.toLocaleString()} total` : "recent")
  }, "Payments (income)"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "7px 11px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 14,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search income\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: 170
    }
  }), q && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQ(""),
    style: {
      background: "transparent",
      border: "none",
      color: t.textFaint,
      cursor: "pointer",
      padding: 0,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 13
  }))), canAdd("fin_income") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      row: null
    }),
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.good,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 15
  }), "Add income"), /*#__PURE__*/React.createElement("button", {
    onClick: download,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-3 flex-wrap",
    style: {
      fontSize: 12.5,
      color: t.textMuted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateFrom,
    onChange: e => setDateFrom(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }), /*#__PURE__*/React.createElement("span", null, "to"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateTo,
    onChange: e => setDateTo(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: applyRange,
    style: {
      background: t.accent,
      color: t.name === "dark" ? "#04222A" : "#fff",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Apply"), (dateFrom || dateTo) && /*#__PURE__*/React.createElement("button", {
    onClick: clearRange,
    style: {
      background: "transparent",
      color: t.textFaint,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5
    }
  }, "Clear"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }), "Show", /*#__PURE__*/React.createElement("select", {
    value: pageSize,
    onChange: e => setPageSize(e.target.value === "all" ? "all" : Number(e.target.value)),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      cursor: "pointer"
    }
  }, [10, 25, 50, 100].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n)), /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "All")), "entries \xB7 ", shown.length ? `1–${visible.length}` : "0", " of ", shown.length), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 680
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["Date", "Account #", "Source", "Amount", "Posted by", "Reference"].map(h => /*#__PURE__*/React.createElement(SortTh, {
    key: h,
    t: t,
    label: h,
    sortKey: sortKey,
    sortDir: sortDir,
    onSort: onSort,
    align: h === "Amount" ? "right" : "left"
  })), /*#__PURE__*/React.createElement("th", {
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, shown.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      padding: "18px 12px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, q ? `No income matches "${q}".` : "No payments yet — add one above.")), visible.map((p, i) => /*#__PURE__*/React.createElement("tr", {
    key: p.id || i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textMuted,
      fontSize: 12.5,
      whiteSpace: "nowrap"
    }
  }, p.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textFaint,
      fontSize: 12,
      fontFamily: "ui-monospace, monospace"
    }
  }, p.account || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.text,
      fontSize: 12.5
    }
  }, p.source || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.good,
      fontSize: 12.5,
      textAlign: "right",
      fontWeight: 700
    }
  }, peso(p.amount)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, p.user || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textFaint,
      fontSize: 12
    }
  }, p.reference || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      textAlign: "right",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-3"
  }, can("fin_income") ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      row: p
    }),
    title: "Edit",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 16
  })), canDel("fin_income") && /*#__PURE__*/React.createElement("button", {
    onClick: () => del(p),
    title: "Delete",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  }))) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "view")))))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 8,
      marginTop: 10
    }
  }, visible.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 12px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, q ? `No income matches “${q}”.` : "No payments yet."), visible.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: "m" + (p.id || i),
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.good,
      fontWeight: 800,
      fontSize: 16
    }
  }, peso(p.amount)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12
    }
  }, p.date, " \xB7 ", p.source || "—")), can("fin_income") && /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      row: p
    }),
    title: "Edit",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 17
  })), canDel("fin_income") && /*#__PURE__*/React.createElement("button", {
    onClick: () => del(p),
    title: "Delete",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 17
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 12,
      color: t.textFaint,
      display: "flex",
      flexWrap: "wrap",
      gap: "2px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Acct: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontFamily: "ui-monospace, monospace"
    }
  }, p.account || "—")), /*#__PURE__*/React.createElement("span", null, "By: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, p.user || "—")), p.reference && /*#__PURE__*/React.createElement("span", null, "Ref: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, p.reference))))))), modal && /*#__PURE__*/React.createElement(MoneyModal, {
    t: t,
    kind: "income",
    row: modal.row,
    onClose: () => setModal(null),
    onSaved: onSaved
  }));
}
function ExpensesPage({
  t
}) {
  const tt = TT({
    t
  });
  const [exps, setExps] = useState(FIN_RECENT);
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState("");
  const [q, setQ] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [catModal, setCatModal] = useState(false);
  const [impPreview, setImpPreview] = useState(null); // Phase 1 result; non-null = the confirm dialog is up
  const [importing, setImporting] = useState(false);
  const [cats, setCats] = useState(EXPENSE_CATS);
  const [newCat, setNewCat] = useState("");
  const addCat = () => {
    const v = newCat.trim();
    if (!v || cats.some(c => c.toLowerCase() === v.toLowerCase())) {
      setNewCat("");
      return;
    }
    setCats([...cats, v]);
    setNewCat("");
  };
  const saveCats = async () => {
    const list = cats.map(c => c.trim()).filter(Boolean);
    EXPENSE_CATS = list;
    try {
      await API("save_expense_cats", {
        cats: list
      });
    } catch (e) {}
    setCatModal(false);
    setFlash("Categories saved");
    setTimeout(() => setFlash(""), 2500);
  };
  const impRef = useRef(null);
  const deleteAll = async () => {
    const c = window.prompt("\u26A0 This permanently deletes ALL expenses and cannot be undone.\n\nType DELETE ALL to confirm:");
    if (c === null) return;
    if (c.trim().toUpperCase() !== "DELETE ALL") {
      setFlash("Cancelled — you must type DELETE ALL exactly.");
      setTimeout(() => setFlash(""), 3500);
      return;
    }
    // The typed gate above is UNCHANGED and is the only thing standing between the click and the
    // wipe. Everything below just reports what actually happened.
    let res = null;
    try {
      res = await API("delete_all_expenses", {
        confirm: "DELETE ALL"
      });
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Delete failed."
      };
    }
    // Refreshed either way. On success the list empties; on a partial or a refusal the true
    // remaining rows come back, so the screen can never show a wipe that did not happen. onSaved
    // also reloads the financial totals, which a wipe moves as much as it moves this list.
    onSaved();
    if (res && res.ok) {
      setFlash(res.deleted === 0 ? "Nothing to delete — there were no expenses." : `Deleted ${res.deleted} expense${res.deleted === 1 ? "" : "s"}.`);
      setTimeout(() => setFlash(""), 5000);
      return;
    }
    setFlash("NOT deleted — " + (res && res.error || "the database refused it."));
    setTimeout(() => setFlash(""), 12000);
  };
  const importExpenses = async file => {
    if (!file) return;
    const parseRaw = str => {
      const s = String(str);
      const out = [];
      let row = [],
        field = "",
        i = 0,
        inQ = false;
      while (i < s.length) {
        const c = s[i];
        if (inQ) {
          if (c === '"') {
            if (s[i + 1] === '"') {
              field += '"';
              i += 2;
              continue;
            }
            inQ = false;
            i++;
            continue;
          }
          field += c;
          i++;
          continue;
        }
        if (c === '"') {
          inQ = true;
          i++;
          continue;
        }
        if (c === ",") {
          row.push(field);
          field = "";
          i++;
          continue;
        }
        if (c === "\r") {
          i++;
          continue;
        }
        if (c === "\n") {
          row.push(field);
          out.push(row);
          row = [];
          field = "";
          i++;
          continue;
        }
        field += c;
        i++;
      }
      if (field !== "" || row.length) {
        row.push(field);
        out.push(row);
      }
      return out.filter(r => Array.isArray(r) && r.some(x => String(x == null ? "" : x).trim() !== ""));
    };
    let parsed = [];
    const nm = (file.name || "").toLowerCase();
    try {
      if (nm.endsWith(".csv") || file.type === "text/csv") {
        parsed = parseRaw(await file.text());
      } else {
        const XLSX = await astLoadXLSX();
        const wb = XLSX.read(await file.arrayBuffer(), {
          type: "array"
        });
        const ws = wb.Sheets[wb.SheetNames[0]];
        parsed = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          raw: false,
          defval: ""
        }).filter(r => Array.isArray(r) && r.some(x => String(x == null ? "" : x).trim() !== ""));
      }
    } catch (e) {
      setFlash("Could not read file: " + (e.message || ""));
      setTimeout(() => setFlash(""), 4000);
      return;
    }
    if (parsed.length < 2) {
      setFlash("No rows found — export first, edit, then upload the CSV.");
      setTimeout(() => setFlash(""), 4500);
      return;
    }
    const header = parsed[0].map(h => (h || "").trim().toLowerCase());
    const col = n => header.indexOf(n);
    const iId = col("id"),
      iDate = col("date"),
      iSup = col("supplier"),
      iDesc = col("description"),
      iAmt = col("amount"),
      iUser = col("user"),
      iInv = col("invoice");
    const normDate = s => {
      s = (s || "").trim();
      if (!s) return "";
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
      const d = new Date(s);
      return isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10);
    };
    const rows = parsed.slice(1).map(r => ({
      id: iId >= 0 ? (r[iId] || "").trim() : "",
      spent_at: iDate >= 0 ? normDate(r[iDate]) : "",
      supplier: iSup >= 0 ? (r[iSup] || "").trim() : "",
      description: iDesc >= 0 ? (r[iDesc] || "").trim() : "",
      amount: iAmt >= 0 ? (r[iAmt] || "").replace(/[^0-9.\-]/g, "") : "",
      user_name: iUser >= 0 ? (r[iUser] || "").trim() : "",
      invoice: iInv >= 0 ? (r[iInv] || "").trim() : ""
    }));
    // PHASE 1 only. Nothing is written here — this asks what WOULD happen and puts it on screen.
    try {
      const res = await API("import_expenses", {
        rows
      });
      if (res && res.ok) {
        setImpPreview({
          ...res,
          rows: res.rows || [],
          _src: rows
        });
      } else {
        setFlash("Import failed: " + (res && res.error || "the file could not be read."));
        setTimeout(() => setFlash(""), 5000);
      }
    } catch (e) {
      setFlash("Import failed: " + (e.message || ""));
      setTimeout(() => setFlash(""), 4000);
    }
  };
  // PHASE 2. Only reachable from the Confirm button in the preview, and it re-sends the ORIGINAL
  // parsed rows rather than the tagged copy: the handler decides again from scratch, so nothing the
  // preview concluded is trusted on the way back in.
  const commitImport = async () => {
    if (!impPreview) return;
    const src = impPreview._src || [];
    setImporting(true);
    try {
      const res = await API("import_expenses", {
        rows: src,
        commit: true
      });
      setImporting(false);
      setImpPreview(null);
      if (res && res.ok) {
        const bits = [`${res.added} added`];
        if (res.skipped_duplicates) bits.push(`${res.skipped_duplicates} duplicate${res.skipped_duplicates === 1 ? "" : "s"} skipped`);
        if (res.skipped_invalid) bits.push(`${res.skipped_invalid} invalid skipped`);
        setFlash("Import complete — " + bits.join(", "));
        setTimeout(() => setFlash(""), 7000);
        onSaved();
        return;
      }
      // A partial import still added rows, and the officer has to know how many before deciding
      // whether to retry — so the handler's real count is shown, not the one that was hoped for.
      setFlash(res && res.error || "Import failed — nothing was added.");
      setTimeout(() => setFlash(""), 12000);
      onSaved();
    } catch (e) {
      setImporting(false);
      setImpPreview(null);
      setFlash("Import failed: " + (e.message || ""));
      setTimeout(() => setFlash(""), 5000);
    }
  };
  const refresh = () => _finRefresh(null, setExps);
  const applyRange = async () => {
    if (!dateFrom && !dateTo) {
      refresh();
      return;
    }
    try {
      const r = await API("fin_range", {
        kind: "expense",
        from: dateFrom,
        to: dateTo
      });
      if (r && r.ok) setExps(r.rows || []);
    } catch (e) {}
  };
  const clearRange = () => {
    setDateFrom("");
    setDateTo("");
    refresh();
  };
  const onSaved = () => {
    setModal(null);
    setFlash("Saved");
    setTimeout(() => setFlash(""), 2500);
    refresh();
  };
  const del = async row => {
    if (!row.id || !window.confirm("Delete this expense?")) return;
    let res = null;
    try {
      res = await API("delete_expense", {
        id: row.id
      });
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Delete failed."
      };
    }
    // refresh() runs either way: on success the row goes, on failure the true ledger comes back,
    // so the list can never keep showing a deletion the database refused.
    refresh();
    if (res && res.ok) {
      setFlash("Deleted");
      setTimeout(() => setFlash(""), 2500);
      return;
    }
    setFlash("NOT deleted — " + (res && res.error || "the database refused it."));
    setTimeout(() => setFlash(""), 7000);
  };
  const s = q.trim().toLowerCase();
  const shown = exps.filter(e => !s || [e.date, e.supplier, e.description, e.invoice, e.user, String(e.amount)].some(v => (v || "").toString().toLowerCase().includes(s)));
  const {
    sortKey,
    sortDir,
    onSort
  } = useSort("");
  const _EXP_ACC = {
    "Date": e => e.spent_at || e.date || "",
    "Supplier": e => (e.supplier || "").toLowerCase(),
    "Description": e => (e.description || "").toLowerCase(),
    "Amount": e => Number(e.amount) || 0,
    "User": e => (e.user || "").toLowerCase(),
    "Invoice": e => (e.invoice || "").toLowerCase()
  };
  const _sortedRows = sortKey ? sortRows(shown, _EXP_ACC[sortKey], sortDir) : shown;
  const visible = pageSize === "all" ? _sortedRows : _sortedRows.slice(0, pageSize);
  const download = () => {
    const rl = dateFrom || dateTo ? ` (${dateFrom || "start"} → ${dateTo || "today"})` : "";
    const fl = dateFrom || dateTo ? `_${dateFrom || "start"}_to_${dateTo || "today"}` : "";
    const rep = {
      title: "Expenses" + rl,
      file: "expenses" + fl,
      columns: ["ID", "Date", "Supplier", "Description", "Amount", "User", "Invoice"],
      money: [4],
      rows: shown.map(e => [e.id || "", e.date || "", e.supplier || "", e.description || "", Number(e.amount) || 0, e.user || "", e.invoice || ""])
    };
    astExportExcel(rep).catch(() => astExportPrint(rep));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.goodSoft || t.accentSoft,
      color: t.good,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, flash), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Receipt
    }, "last 2 months")
  }, "Expenses by category"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 230
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(BarChart, {
    layout: "vertical",
    data: expenses,
    margin: {
      top: 0,
      right: 16,
      left: 8,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: t.grid,
    horizontal: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    tick: {
      fill: t.textFaint,
      fontSize: 11
    },
    axisLine: false,
    tickLine: false,
    tickFormatter: v => pesoK(v)
  }), /*#__PURE__*/React.createElement(YAxis, {
    type: "category",
    dataKey: "cat",
    width: 110,
    tick: {
      fill: t.textMuted,
      fontSize: 12
    },
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: tt,
    cursor: {
      fill: t.warnSoft
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "amt",
    name: "Spent",
    fill: t.warn,
    radius: [0, 5, 5, 0]
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex justify-between",
    style: {
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, "Total expenses (2 mo)"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontWeight: 700
    }
  }, peso(expenses.reduce((a, x) => a + x.amt, 0))))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, FIN_KPI ? `${shown.length} shown · ${FIN_KPI.expenseCount.toLocaleString()} total` : "recent")
  }, "Expense log"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "7px 11px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 14,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search expenses\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: 170
    }
  }), q && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQ(""),
    style: {
      background: "transparent",
      border: "none",
      color: t.textFaint,
      cursor: "pointer",
      padding: 0,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 13
  }))), canAdd("fin_expense") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      row: null
    }),
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.warn,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 15
  }), "Add expense"), canAdd("fin_expense") && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCats(EXPENSE_CATS);
      setCatModal(true);
    },
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(Tags, {
    size: 15
  }), "Categories"), /*#__PURE__*/React.createElement("button", {
    onClick: download,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), ME.role === "owner" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    ref: impRef,
    type: "file",
    accept: ".csv,.xlsx,.xls,text/csv",
    style: {
      display: "none"
    },
    onChange: e => {
      const f = e.target.files && e.target.files[0];
      importExpenses(f);
      e.target.value = "";
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => impRef.current && impRef.current.click(),
    title: "Bulk-add expenses from a CSV (owner only) \u2014 shows a preview before anything is written",
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), "Import")), ME.role === "owner" && /*#__PURE__*/React.createElement("button", {
    onClick: deleteAll,
    title: "Permanently delete all expenses (owner only)",
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: "transparent",
      color: t.bad,
      border: `1px solid ${t.bad}66`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }), "Delete all"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-3 flex-wrap",
    style: {
      fontSize: 12.5,
      color: t.textMuted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateFrom,
    onChange: e => setDateFrom(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }), /*#__PURE__*/React.createElement("span", null, "to"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateTo,
    onChange: e => setDateTo(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      colorScheme: t.name === "dark" ? "dark" : "light"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: applyRange,
    style: {
      background: t.accent,
      color: t.name === "dark" ? "#04222A" : "#fff",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Apply"), (dateFrom || dateTo) && /*#__PURE__*/React.createElement("button", {
    onClick: clearRange,
    style: {
      background: "transparent",
      color: t.textFaint,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5
    }
  }, "Clear"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }), "Show", /*#__PURE__*/React.createElement("select", {
    value: pageSize,
    onChange: e => setPageSize(e.target.value === "all" ? "all" : Number(e.target.value)),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 12.5,
      cursor: "pointer"
    }
  }, [10, 25, 50, 100].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n)), /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "All")), "entries \xB7 ", shown.length ? `1–${visible.length}` : "0", " of ", shown.length), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 680
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["Date", "Supplier", "Description", "Amount", "User", "Invoice"].map(h => /*#__PURE__*/React.createElement(SortTh, {
    key: h,
    t: t,
    label: h,
    sortKey: sortKey,
    sortDir: sortDir,
    onSort: onSort,
    align: h === "Amount" ? "right" : "left"
  })), /*#__PURE__*/React.createElement("th", {
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, shown.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      padding: "18px 12px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, q ? `No expenses match "${q}".` : "No expenses yet — add one above.")), visible.map((e, i) => /*#__PURE__*/React.createElement("tr", {
    key: e.id || i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textMuted,
      fontSize: 12.5,
      whiteSpace: "nowrap"
    }
  }, e.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.text,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, e.supplier || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, e.description || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.text,
      fontSize: 12.5,
      textAlign: "right",
      fontWeight: 600
    }
  }, peso(e.amount)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, e.user || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 12px",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, e.invoice || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      textAlign: "right",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-3"
  }, can("fin_expense") ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      row: e
    }),
    title: "Edit",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 16
  })), canDel("fin_expense") && /*#__PURE__*/React.createElement("button", {
    onClick: () => del(e),
    title: "Delete",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  }))) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "view")))))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 8,
      marginTop: 10
    }
  }, visible.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 12px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, q ? `No expenses match “${q}”.` : "No expenses yet."), visible.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: "m" + (e.id || i),
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 15
    }
  }, e.supplier || "—"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12
    }
  }, e.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, peso(e.amount)), can("fin_expense") && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      row: e
    }),
    title: "Edit",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 17
  })), canDel("fin_expense") && /*#__PURE__*/React.createElement("button", {
    onClick: () => del(e),
    title: "Delete",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 17
  }))))), e.description && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      color: t.textMuted,
      fontSize: 12.5
    }
  }, e.description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 12,
      color: t.textFaint,
      display: "flex",
      flexWrap: "wrap",
      gap: "2px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "By: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, e.user || "—")), e.invoice && /*#__PURE__*/React.createElement("span", null, "Invoice: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, e.invoice))))))), modal && /*#__PURE__*/React.createElement(MoneyModal, {
    t: t,
    kind: "expense",
    row: modal.row,
    onClose: () => setModal(null),
    onSaved: onSaved
  }), impPreview && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 90,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => !importing && setImpPreview(null),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 91,
      width: "100%",
      maxWidth: 620,
      padding: 0,
      maxHeight: "88vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Review this import"), /*#__PURE__*/React.createElement("button", {
    onClick: () => !importing && setImpPreview(null),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "This will ADD ", impPreview.newCount, " new expense", impPreview.newCount === 1 ? "" : "s", " totalling ", peso(impPreview.newTotal || 0), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginBottom: 12
    }
  }, "Nothing has been written yet. Existing expenses are never changed by an import \u2014 rows are only ever added."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: t.goodSoft,
      color: t.good,
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 12,
      fontWeight: 700
    }
  }, impPreview.newCount, " to add"), impPreview.duplicateCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      background: t.warnSoft,
      color: t.warn,
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 12,
      fontWeight: 700
    }
  }, impPreview.duplicateCount, " duplicate", impPreview.duplicateCount === 1 ? "" : "s", " \u2014 skipped"), impPreview.invalidCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      background: t.badSoft || "#3a1620",
      color: t.bad,
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 12,
      fontWeight: 700
    }
  }, impPreview.invalidCount, " invalid \u2014 skipped")), (impPreview.duplicateCount > 0 || impPreview.invalidCount > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginBottom: 10
    }
  }, "A duplicate is a row already in the ledger with the same date, amount, supplier and description. Invalid rows are missing ", impPreview.required || "required fields", "."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 260,
      overflowY: "auto",
      border: `1px solid ${t.border}`,
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, ["", "Date", "Supplier", "Amount", "Note"].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: "left",
      padding: "6px 8px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`,
      background: t.surface2,
      position: "sticky",
      top: 0
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, (impPreview.rows || []).map((r, i) => {
    const tone = r._tag === "new" ? t.good : r._tag === "duplicate" ? t.warn : t.bad;
    return /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        borderBottom: `1px solid ${t.borderSoft}`,
        opacity: r._tag === "new" ? 1 : 0.6
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 8px",
        color: tone,
        fontSize: 10.5,
        fontWeight: 700,
        whiteSpace: "nowrap"
      }
    }, r._tag === "new" ? "ADD" : r._tag === "duplicate" ? "DUP" : "BAD"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 8px",
        color: t.text,
        fontSize: 12,
        whiteSpace: "nowrap"
      }
    }, r.spent_at || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 8px",
        color: t.text,
        fontSize: 12
      }
    }, r.supplier || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 8px",
        color: t.text,
        fontSize: 12,
        whiteSpace: "nowrap"
      }
    }, r.amount === "" || r.amount == null ? "—" : peso(r.amount)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "5px 8px",
        color: t.textFaint,
        fontSize: 11
      }
    }, r._why || r.description || ""));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setImpPreview(null),
    disabled: importing,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: importing ? "default" : "pointer"
    }
  }, "Cancel \u2014 write nothing"), /*#__PURE__*/React.createElement("button", {
    onClick: commitImport,
    disabled: importing || !impPreview.newCount,
    style: {
      background: t.good,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: importing || !impPreview.newCount ? "default" : "pointer",
      opacity: importing || !impPreview.newCount ? 0.5 : 1
    }
  }, importing ? "Adding…" : `Add ${impPreview.newCount} expense${impPreview.newCount === 1 ? "" : "s"}`)))), catModal && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setCatModal(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 460,
      padding: 0,
      maxHeight: "86vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Supplier / Category list"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12
    }
  }, "These appear in the expense dropdown")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCatModal(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4",
    style: {
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: newCat,
    onChange: e => setNewCat(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") addCat();
    },
    placeholder: "New supplier / category\u2026",
    style: {
      flex: 1,
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: "9px 11px",
      fontSize: 13,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addCat,
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 9,
      padding: "9px 14px",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "Add")), cats.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12.5,
      textAlign: "center",
      padding: "10px 0"
    }
  }, "No categories yet. Add some above."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, cats.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c + i,
    className: "flex items-center justify-between rounded-lg",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "7px 11px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontSize: 13
    }
  }, c), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const nv = (window.prompt("Rename category:", c) || "").trim();
      if (nv && !cats.some((x, idx) => idx !== i && x.toLowerCase() === nv.toLowerCase())) setCats(cats.map((x, idx) => idx === i ? nv : x));
    },
    title: "Rename",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      display: "inline-flex",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!window.confirm(`Remove the category "${c}"?\n\nIt's only removed from the dropdown list — your existing expenses keep their category. You still need to press Save.`)) return;
      setCats(cats.filter((_, idx) => idx !== i));
    },
    title: "Remove",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      display: "inline-flex",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 14
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCatModal(false),
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: saveCats,
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Save")))));
}
function ReportDetail({
  t,
  kind,
  ctx,
  onClose
}) {
  const {
    y,
    all,
    m,
    ar,
    arList,
    expCats,
    expTotal,
    byArea,
    arpu,
    breakeven,
    active,
    income
  } = ctx;
  const th = {
    textAlign: "left",
    padding: "8px 12px",
    fontWeight: 700,
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: t.textFaint,
    borderBottom: `1px solid ${t.border}`,
    position: "sticky",
    top: 0,
    background: t.surface
  };
  const td = {
    padding: "8px 12px",
    fontSize: 12.5,
    color: t.textMuted,
    borderBottom: `1px solid ${t.borderSoft}`
  };
  const tdR = {
    ...td,
    textAlign: "right",
    color: t.text,
    fontWeight: 600
  };
  const row2 = (k, v, color) => /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between",
    style: {
      padding: "8px 0",
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: color || t.text,
      fontSize: 13,
      fontWeight: 700
    }
  }, v));
  const titles = {
    pnl: "Profit & Loss",
    cashflow: "Cash Flow Statement",
    ar: "Accounts Receivable",
    expenses: "Expense Breakdown",
    revenue: "Revenue Analytics",
    breakeven: "Break-even Analysis",
    areas: "Areas by Registered Clients",
    alerts: "Financial Alerts"
  };
  const Table = ({
    head,
    rows
  }) => /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      border: `1px solid ${t.border}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 360,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 420
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, head.map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      ...th,
      textAlign: i === head.length - 1 ? "right" : "left"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: head.length,
    style: {
      ...td,
      textAlign: "center",
      color: t.textFaint
    }
  }, "No data.")) : rows))));
  let content = null;
  if (kind === "pnl") {
    content = /*#__PURE__*/React.createElement("div", null, row2(`Income (${y.label})`, peso(y.income), t.good), row2(`Expenses (${y.label})`, peso(y.expense), t.bad), row2("Net profit", peso(y.net), y.net >= 0 ? t.good : t.bad), row2("Margin", (y.income > 0 ? Math.round(y.net / y.income * 100) : 0) + "%"));
  } else if (kind === "cashflow") {
    content = /*#__PURE__*/React.createElement("div", null, row2("Total money in (all-time)", peso(all.income), t.good), row2("Total money out (all-time)", peso(all.expense), t.bad), row2("Net saved in bank", peso(all.net), all.net >= 0 ? t.good : t.bad), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 12,
        marginTop: 10
      }
    }, "Bank balance = every payment received minus every expense recorded."));
  } else if (kind === "ar") {
    const rows = arList.slice().sort((a, b) => dueDays(a) - dueDays(b)).map((c, i) => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      style: td
    }, c.account_number || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        color: t.text
      }
    }, `${c.first_name || ""} ${c.last_name || ""}`.trim()), /*#__PURE__*/React.createElement("td", {
      style: td
    }, c.area || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        whiteSpace: "nowrap"
      }
    }, dueDays(c) < 0 ? `${-dueDays(c)}d overdue` : "due today"), /*#__PURE__*/React.createElement("td", {
      style: tdR
    }, c.mrc ? peso(c.mrc) : "—")));
    content = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, row2("Total receivable", peso(ar), t.warn), row2("Accounts unpaid", arList.length)), /*#__PURE__*/React.createElement(Table, {
      head: ["Account #", "Client", "Area", "Status", "Amount"],
      rows: rows
    }));
  } else if (kind === "expenses") {
    const rows = expCats.map((e, i) => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        color: t.text
      }
    }, e.cat), /*#__PURE__*/React.createElement("td", {
      style: td
    }, Math.round(e.amt / expTotal * 100), "%"), /*#__PURE__*/React.createElement("td", {
      style: tdR
    }, peso(e.amt))));
    content = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, row2("Total (last 2 months)", peso(expTotal))), /*#__PURE__*/React.createElement(Table, {
      head: ["Category", "Share", "Amount"],
      rows: rows
    }));
  } else if (kind === "revenue") {
    const rows = (income || []).map((r, i) => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        color: t.text
      }
    }, r.src), /*#__PURE__*/React.createElement("td", {
      style: tdR
    }, peso(r.amt))));
    content = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, row2(`ARPU (${m.lastLabel || "last month"})`, peso(Math.round(arpu)), t.good), row2("Active clients", active), row2(`Collection (${m.lastLabel || "last month"})`, peso(m.collLast || m.collThis))), /*#__PURE__*/React.createElement(Table, {
      head: ["Month", "Income"],
      rows: rows
    }));
  } else if (kind === "breakeven") {
    const surplus = active - breakeven;
    content = /*#__PURE__*/React.createElement("div", null, row2(`Monthly expenses (${m.lastLabel || "last month"})`, peso(m.expLast || m.expThis), t.bad), row2("ARPU", peso(Math.round(arpu))), row2("Break-even active clients", breakeven), row2("You currently have", active), row2(surplus >= 0 ? "Surplus above break-even" : "Below break-even by", `${Math.abs(surplus)} clients`, surplus >= 0 ? t.good : t.bad));
  } else if (kind === "areas") {
    const rows = Object.entries(byArea).sort((a, b) => b[1].tot - a[1].tot).map(([a, v], i) => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        color: t.text
      }
    }, a), /*#__PURE__*/React.createElement("td", {
      style: tdR
    }, v.tot), /*#__PURE__*/React.createElement("td", {
      style: {
        ...tdR,
        color: t.good
      }
    }, v.tot ? Math.round(v.paid / v.tot * 100) : 0, "%")));
    content = /*#__PURE__*/React.createElement(Table, {
      head: ["Area", "Registered", "Renewed %"],
      rows: rows
    });
  } else if (kind === "alerts") {
    content = ctx.alerts.length ? /*#__PURE__*/React.createElement("div", null, ctx.alerts.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-2",
      style: {
        padding: "9px 0",
        borderBottom: `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 15,
      color: t.bad
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontSize: 13
      }
    }, a)))) : /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.good,
        fontSize: 13
      }
    }, "No alerts \u2014 everything looks healthy.");
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 640,
      padding: 0,
      maxHeight: "88vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`,
      position: "sticky",
      top: 0,
      background: t.surface,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, titles[kind] || "Detail"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4"
  }, content)));
}
function Reports({
  t
}) {
  const [dlMonth, setDlMonth] = useState("all");
  const [dling, setDling] = useState("");
  const [detail, setDetail] = useState(null);
  const monthLabel = m => m === "all" ? "All months" : new Date(m + "-01T00:00:00").toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  });
  const doExport = async kind => {
    setDling(kind);
    try {
      const r = await API("export_finance", {
        kind,
        month: dlMonth
      });
      const rows = r && r.ok && r.rows ? r.rows : [];
      const tag = dlMonth === "all" ? "all" : dlMonth;
      const title = `TIONGTECH FIBER — ${kind[0].toUpperCase() + kind.slice(1)} report (${monthLabel(dlMonth)})`;
      if (kind === "income") {
        downloadXLS(`income_${tag}.xls`, title, ["Date", "Account #", "Source", "Amount", "Reference", "Posted by"], rows.map(x => [x.date, x.account || "", x.source || "", Number(x.amount) || 0, x.reference || "", x.user || ""]));
      } else if (kind === "expenses") {
        downloadXLS(`expenses_${tag}.xls`, title, ["Date", "Supplier", "Description", "Amount", "Invoice", "User"], rows.map(x => [x.date, x.supplier || "", x.description || "", Number(x.amount) || 0, x.invoice || "", x.user || ""]));
      } else {
        downloadXLS(`income_expenses_${tag}.xls`, title, ["Date", "Type", "Party", "Description", "Amount", "Ref / Invoice", "User"], rows.map(x => [x.date, x.type, x.party || "", x.description || "", Number(x.amount) || 0, x.ref || "", x.user || ""]));
      }
    } catch (e) {
      alert("Download failed — try again.");
    }
    setDling("");
  };
  const K = n => pesoK(n || 0);
  const reg = clients.filter(c => !isPeso(c));
  const active = reg.filter(clientIsActive).length;
  const y = FIN_YEAR || {
    income: 0,
    expense: 0,
    net: 0,
    label: new Date().getFullYear()
  };
  const all = FIN_ALL || {
    income: 0,
    expense: 0,
    net: 0
  };
  const m = FIN_MONTH || {
    collThis: 0,
    collLast: 0,
    expThis: 0,
    expLast: 0,
    netThis: 0
  };
  const pnlMargin = y.income > 0 ? Math.round(y.net / y.income * 100) : 0;
  const arList = reg.filter(c => clientIsActive(c) && !clientPaid(c) && dueDays(c) <= 0);
  const ar = arList.reduce((a, c) => a + (Number(c.mrc) || 0), 0);
  const expCats = expenses || [];
  const expTotal = expCats.reduce((a, x) => a + x.amt, 0) || 1;
  const top2 = expCats.slice(0, 2);
  const top2Share = Math.round(top2.reduce((a, x) => a + x.amt, 0) / expTotal * 100);
  const arpu = active > 0 ? (m.collLast || m.collThis) / active : 0; // last full month for a stable ARPU
  const mom = m.collLast > 0 ? Math.round((m.collThis - m.collLast) / m.collLast * 100) : 0;
  const breakeven = arpu > 0 ? Math.ceil((m.expLast || m.expThis || 0) / arpu) : 0;
  // renewal % by area (highest)
  const byArea = {};
  reg.forEach(c => {
    const a = (c.area || "—").trim() || "—";
    byArea[a] = byArea[a] || {
      tot: 0,
      paid: 0
    };
    byArea[a].tot++;
    if (clientPaid(c)) byArea[a].paid++;
  });
  let topArea = null,
    topTot = -1;
  Object.entries(byArea).forEach(([a, v]) => {
    if (v.tot > topTot) {
      topTot = v.tot;
      topArea = a;
    }
  });
  const renewalPct = topArea && byArea[topArea].tot ? Math.round(byArea[topArea].paid / byArea[topArea].tot * 100) : 0;
  const renewalSub = topArea ? `${topArea} — ${byArea[topArea].tot} registered · ${renewalPct}% renewed (${byArea[topArea].paid}/${byArea[topArea].tot})` : "Not enough data yet";
  // alerts
  const alerts = [];
  if ((m.netThis || 0) < 0) alerts.push("net negative this month");
  if ((m.expLast || 0) > 0 && (m.expThis - m.expLast) / m.expLast > 0.2) alerts.push("expenses up >20% MoM");
  if (ar > 0) alerts.push(`${peso(ar)} receivables unpaid`);
  const alertsSub = alerts.length ? `${alerts.length} active · ${alerts.slice(0, 2).join(", ")}` : "No alerts — all healthy";
  const reports = [["Profit & Loss", `Net ${K(y.net)} · margin ${pnlMargin}% (${y.label})`, y.net >= 0 ? t.good : t.bad, TrendingUp, "pnl"], ["Cash Flow Statement", `In ${K(all.income)} · Out ${K(all.expense)} · Bank ${K(all.net)}`, t.accent, Banknote, "cashflow"], ["A/R Aging", `${peso(ar)} · ${arList.length} accounts unpaid`, t.warn, Clock, "ar"], ["Expense Breakdown", top2.length ? `${top2.map(x => x.cat).join(" & ")} = ${top2Share}%` : "No expenses yet", t.violet, Receipt, "expenses"], ["Revenue Analytics", `ARPU ${peso(Math.round(arpu))} · ${m.lastLabel || "last mo"}`, t.good, Activity, "revenue"], ["Break-even Analysis", breakeven ? `Break-even at ${breakeven} active clients · you have ${active}` : "—", active >= breakeven ? t.good : t.warn, Target, "breakeven"], ["Top Area by Registered Clients", renewalSub, t.accent, MapPin, "areas"], ["Financial Alerts", alertsSub, alerts.length ? t.bad : t.good, AlertTriangle, "alerts"]];
  const ctx = {
    y,
    all,
    m,
    ar,
    arList,
    expCats,
    expTotal,
    byArea,
    arpu,
    breakeven,
    active,
    income,
    alerts,
    K
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: IconDownload
    }, "excel")
  }, "Download report"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center gap-3 mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, "Month"), /*#__PURE__*/React.createElement("select", {
    value: dlMonth,
    onChange: e => setDlMonth(e.target.value),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 11px",
      fontSize: 13,
      outline: "none",
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "all",
    style: {
      background: t.surface,
      color: t.text
    }
  }, "All months"), FIN_MONTHS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m,
    style: {
      background: t.surface,
      color: t.text
    }
  }, monthLabel(m))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, [["income", "Income", t.good], ["expenses", "Expenses", t.warn], ["combined", "Income + Expenses", t.accent]].map(([k, label, color]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => doExport(k),
    disabled: !!dling,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: "transparent",
      color,
      border: `1px solid ${t.border}`,
      cursor: dling ? "default" : "pointer",
      fontSize: 12.5,
      fontWeight: 600,
      padding: "8px 13px",
      opacity: dling && dling !== k ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), dling === k ? "Preparing…" : label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      marginTop: 8
    }
  }, "Combined report merges income and expenses sorted by date (expenses shown as negative). Files open in Excel.")), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Target
    }, "Faith Goals")
  }, "Progress to goals"), (() => {
    const gpct = g => g.done ? 100 : goalTarget(g) > 0 ? Math.min(100, Math.round(goalCurrent(g) / goalTarget(g) * 100)) : 0;
    const catColor = c => ({
      Faith: t.violet,
      Business: t.accent,
      Personal: t.good,
      Family: "#F472B6",
      Health: t.warn,
      Ministry: t.violet
    })[c] || t.textMuted;
    const list = (GOALS || []).filter(g => !g.done).slice(0, 3);
    if (list.length === 0) return /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 13,
        marginTop: 8
      }
    }, "No goals in progress \u2014 add them in ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.textMuted
      }
    }, "Faith Goals"), ".");
    return /*#__PURE__*/React.createElement("div", {
      className: "grid md:grid-cols-3 gap-4 mt-1"
    }, list.map(g => {
      const has = goalTarget(g) > 0;
      return /*#__PURE__*/React.createElement("div", {
        key: g.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex justify-between",
        style: {
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.textMuted,
          fontSize: 12.5,
          fontWeight: 600
        }
      }, g.title), /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.text,
          fontSize: 12.5,
          fontWeight: 700
        }
      }, has ? gpct(g) + "%" : "—")), /*#__PURE__*/React.createElement("div", {
        className: "rounded-full",
        style: {
          height: 8,
          background: t.borderSoft
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "rounded-full",
        style: {
          height: 8,
          width: `${gpct(g)}%`,
          background: catColor(g.category),
          transition: "width .9s ease"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textFaint,
          fontSize: 11,
          marginTop: 4
        }
      }, has ? `${goalCurrent(g).toLocaleString()}${g.unit ? " " + g.unit : ""} of ${goalTarget(g).toLocaleString()}` : "set a target in Faith Goals"));
    }));
  })()), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-3.5"
  }, reports.map(([title, sub, c, Icon, kind]) => /*#__PURE__*/React.createElement("button", {
    key: title,
    onClick: () => setDetail(kind),
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
      textAlign: "left",
      cursor: "pointer",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-xl shrink-0",
    style: {
      width: 40,
      height: 40,
      background: t.borderSoft,
      color: c
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 14
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5
    }
  }, sub)), /*#__PURE__*/React.createElement(ChevronRight, {
    size: 17,
    color: t.textFaint
  })))))), detail && /*#__PURE__*/React.createElement(ReportDetail, {
    t: t,
    kind: detail,
    ctx: ctx,
    onClose: () => setDetail(null)
  }));
}
function GoalModal({
  t,
  goal,
  onClose,
  onSaved
}) {
  const cats = ["Faith", "Business", "Personal", "Family", "Health", "Ministry", "Other"];
  const init = {
    title: goal && goal.title || "",
    category: goal && goal.category || "Faith",
    target: goal && goal.target != null ? goal.target : "",
    current: goal && goal.current != null ? goal.current : "",
    unit: goal && goal.unit || "",
    target_date: goal && goal.target_date ? String(goal.target_date).slice(0, 10) : "",
    notes: goal && goal.notes || "",
    done: !!(goal && goal.done)
  };
  const [form, setForm] = useState(init);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const lbl = {
    display: "block",
    color: t.textFaint,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
    marginBottom: 4
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none"
  };
  const save = async () => {
    if (!form.title.trim()) {
      alert("Enter a goal title.");
      return;
    }
    if (!window.confirm(goal && goal.id ? "Save changes to this goal?" : "Create this goal?")) return;
    setBusy(true);
    const action = goal && goal.id ? "update_goal" : "create_goal";
    try {
      await API(action, {
        ...form,
        id: goal && goal.id
      });
    } catch (e) {}
    setBusy(false);
    onSaved();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 560,
      padding: 0,
      maxHeight: "90vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, goal && goal.id ? "Edit goal" : "New goal"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Goal"), /*#__PURE__*/React.createElement("input", {
    value: form.title,
    onChange: e => set("title", e.target.value),
    placeholder: "e.g. Reach 1,200 subscribers \xB7 Tithe monthly \xB7 Daily devotion",
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    value: form.category,
    onChange: e => set("category", e.target.value),
    style: inp
  }, cats.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    style: {
      background: t.surface,
      color: t.text
    }
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Target date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.target_date,
    onChange: e => set("target_date", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Target (number, optional)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.target,
    onChange: e => set("target", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Current progress"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.current,
    onChange: e => set("current", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Unit (e.g. subs, \u20B1, days)"), /*#__PURE__*/React.createElement("input", {
    value: form.unit,
    onChange: e => set("unit", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: "gdone",
    type: "checkbox",
    checked: form.done,
    onChange: e => set("done", e.target.checked),
    style: {
      width: 16,
      height: 16,
      accentColor: t.good
    }
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "gdone",
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, "Mark as achieved")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Notes / verse / reflection"), /*#__PURE__*/React.createElement("textarea", {
    value: form.notes,
    onChange: e => set("notes", e.target.value),
    rows: 3,
    style: {
      ...inp,
      resize: "vertical"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    disabled: busy,
    style: {
      background: t.good,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Saving…" : "Save goal"))));
}
function FaithGoals({
  t
}) {
  const [goals, setGoals] = useState(GOALS);
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState("");
  const refresh = async () => {
    try {
      const d = await API("bootstrap");
      if (d && d.ok && Array.isArray(d.goals)) {
        GOALS = d.goals;
        setGoals(d.goals);
      }
    } catch (e) {}
  };
  const onSaved = () => {
    setModal(null);
    setFlash("Saved");
    setTimeout(() => setFlash(""), 2500);
    refresh();
  };
  const del = async g => {
    if (!g.id || !window.confirm("Delete this goal?")) return;
    try {
      await API("delete_goal", {
        id: g.id
      });
    } catch (e) {}
    setFlash("Deleted");
    setTimeout(() => setFlash(""), 2500);
    refresh();
  };
  const toggleDone = async g => {
    try {
      await API("update_goal", {
        ...g,
        done: g.done ? 0 : 1
      });
    } catch (e) {}
    refresh();
  };
  const catColor = c => ({
    Faith: t.violet,
    Business: t.accent,
    Personal: t.good,
    Family: "#F472B6",
    Health: t.warn,
    Ministry: t.violet
  })[c] || t.textMuted;
  const pct = g => g.done ? 100 : goalTarget(g) > 0 ? Math.min(100, Math.round(goalCurrent(g) / goalTarget(g) * 100)) : 0;
  const active = goals.filter(g => !g.done);
  const done = goals.filter(g => g.done);
  const GoalCard = g => /*#__PURE__*/React.createElement(Card, {
    key: g.id,
    t: t,
    style: {
      padding: 16,
      opacity: g.done ? 0.75 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full",
    style: {
      background: catColor(g.category) + "22",
      color: catColor(g.category),
      fontSize: 10.5,
      fontWeight: 800,
      padding: "2px 9px",
      textTransform: "uppercase"
    }
  }, g.category || "Goal"), g.target_date && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 11.5
    }
  }, "\xB7 by ", String(g.target_date).slice(0, 10))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15,
      textDecoration: g.done ? "line-through" : "none"
    }
  }, g.title), g.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginTop: 3,
      lineHeight: 1.5
    }
  }, g.notes)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, can("edit_goals") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      goal: g
    }),
    title: "Edit",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 16
  })), canDel("edit_goals") && /*#__PURE__*/React.createElement("button", {
    onClick: () => del(g),
    title: "Delete",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  })))), goalTarget(g) > 0 || g.done ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between",
    style: {
      fontSize: 11.5,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted
    }
  }, g.done ? "Achieved" : `${goalCurrent(g)}${g.unit ? " " + g.unit : ""} of ${goalTarget(g)}${g.unit ? " " + g.unit : ""}`), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontWeight: 700
    }
  }, pct(g), "%")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-full",
    style: {
      height: 8,
      background: t.borderSoft
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-full",
    style: {
      height: 8,
      width: `${pct(g)}%`,
      background: g.done ? t.good : catColor(g.category),
      transition: "width .8s ease"
    }
  }))) : null, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleDone(g),
    className: "rounded-lg",
    style: {
      marginTop: 12,
      background: g.done ? t.surface2 : t.goodSoft || t.accentSoft,
      color: g.done ? t.textMuted : t.good,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      padding: "6px 12px",
      width: "100%"
    }
  }, g.done ? "Mark as not done" : "Mark achieved"));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.goodSoft || t.accentSoft,
      color: t.good,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, flash), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Faith Goals"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 13,
      marginTop: 2
    }
  }, "Set and track your faith, business, and personal goals. ", active.length, " in progress \xB7 ", done.length, " achieved.")), canAdd("edit_goals") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      goal: null
    }),
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.good,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      padding: "9px 15px"
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 16
  }), "New goal"))), goals.length === 0 && /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 30,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 14
    }
  }, "No goals yet."), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12.5,
      marginTop: 4
    }
  }, "Click \u201CNew goal\u201D to add your first Faith Goal.")), active.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-3.5"
  }, active.map(GoalCard)), done.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Achieved"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-3.5 mt-2"
  }, done.map(GoalCard))), modal && /*#__PURE__*/React.createElement(GoalModal, {
    t: t,
    goal: modal.goal,
    onClose: () => setModal(null),
    onSaved: onSaved
  }));
}
const ROLE_OPTIONS = [["owner", "Owner — full access"], ["admin", "Admin — sees all, edits PON only"], ["cfo", "CFO — financials; edits own income/expenses"], ["admin_officer", "Admin Officer — income & expenses (edits expenses)"], ["payroll", "Payroll Officer — payroll only"], ["technician", "Technician — job orders (solution only)"]];
const roleLabel = r => (ROLE_OPTIONS.find(x => x[0] === r) || [r, r])[1];
function UserModal({
  t,
  user,
  onClose,
  onSaved
}) {
  const hasPayroll = !!(user && (user.pr_employee_id || Number(user.per_day) > 0));
  const init = {
    username: user && user.username || "",
    password: "",
    full_name: user && user.full_name || "",
    role: user && user.role || "admin",
    position: user && user.position || POSITIONS[0] || "",
    in_payroll: user ? hasPayroll || user.role === "technician" : true,
    per_day: user && user.per_day || 0,
    schedule_id: user && user.schedule_id || 1
  };
  const [form, setForm] = useState(init);
  const _av = user && user.allowed_views && typeof user.allowed_views === "object" && !Array.isArray(user.allowed_views) ? user.allowed_views : null;
  const _isFull = _av && ALL_MENU_IDS.every(id => _av[id] && _av[id].a && _av[id].e && _av[id].d);
  const [perms, setPerms] = useState(_av && Object.keys(_av).length && !_isFull ? _av : null); // null = full access; else {menuId: {a,e,d}}
  const restricted = perms !== null;
  const setCap = (id, present, caps) => setPerms(p => {
    const cur = {
      ...(p || {})
    };
    if (!present) {
      delete cur[id];
    } else {
      cur[id] = {
        a: 0,
        e: 0,
        d: 0,
        ...(cur[id] || {}),
        ...(caps || {})
      };
    }
    return cur;
  });
  const fullPerms = () => {
    const o = {};
    ALL_MENU_IDS.forEach(id => {
      o[id] = {
        a: 1,
        e: 1,
        d: 1
      };
    });
    return o;
  };
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const lbl = {
    display: "block",
    color: t.textFaint,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
    marginBottom: 4
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none"
  };
  const save = async () => {
    if (!form.username.trim()) {
      alert("Username required.");
      return;
    }
    if (!user && !form.password.trim()) {
      alert("Password required for a new user.");
      return;
    }
    if (form.in_payroll && !(Number(form.per_day) > 0)) {
      alert("Enter a daily rate, or untick “Include in weekly payroll”.");
      return;
    }
    if (restricted && Object.keys(perms).length === 0) {
      alert("Pick at least one menu this user can open, or switch to Full access.");
      return;
    }
    if (!window.confirm(user && user.id ? `Save changes to “${form.username}”?` : `Create user “${form.username}”?`)) return;
    setBusy(true);
    try {
      await API(user && user.id ? "update_user" : "create_user", {
        ...form,
        in_payroll: form.in_payroll ? 1 : 0,
        allowed_views: restricted ? perms : fullPerms(),
        id: user && user.id
      });
    } catch (e) {}
    setBusy(false);
    onSaved();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 540,
      padding: 0,
      maxHeight: "90vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, user && user.id ? "Edit user" : "New user"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    value: form.username,
    onChange: e => set("username", e.target.value),
    disabled: !!(user && user.id),
    style: {
      ...inp,
      opacity: user && user.id ? 0.6 : 1
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, user ? "New password (blank = keep)" : "Password"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.password,
    onChange: e => set("password", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Full name"), /*#__PURE__*/React.createElement("input", {
    value: form.full_name,
    onChange: e => set("full_name", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Position"), /*#__PURE__*/React.createElement("select", {
    value: form.position,
    onChange: e => set("position", e.target.value),
    style: inp
  }, POSITIONS.map(p => /*#__PURE__*/React.createElement("option", {
    key: p,
    style: {
      background: t.surface,
      color: t.text
    }
  }, p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      marginTop: 2,
      paddingTop: 10,
      borderTop: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      color: t.text,
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!form.in_payroll,
    onChange: e => set("in_payroll", e.target.checked)
  }), "Include in weekly payroll"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      marginTop: 3
    }
  }, "Turn on for anyone paid weekly. This creates/links their payroll record automatically \u2014 no separate roster needed.")), form.in_payroll && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Daily rate (\u20B1)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.per_day,
    onChange: e => set("per_day", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Work schedule"), /*#__PURE__*/React.createElement("select", {
    value: form.schedule_id,
    onChange: e => set("schedule_id", Number(e.target.value)),
    style: inp
  }, /*#__PURE__*/React.createElement("option", {
    value: 1,
    style: {
      background: t.surface,
      color: t.text
    }
  }, "A \xB7 Mon\u2013Sat (Sunday duty)"), /*#__PURE__*/React.createElement("option", {
    value: 2,
    style: {
      background: t.surface,
      color: t.text
    }
  }, "B \xB7 Sun\u2013Fri (Sunday regular)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      marginTop: 2,
      paddingTop: 10,
      borderTop: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      color: t.text,
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !restricted,
    onChange: e => setPerms(e.target.checked ? null : {})
  }), "Full access \u2014 every section (except owner-only Settings)"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      marginTop: 3
    }
  }, "Untick to limit this user. Tick a menu for ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "view-only"), ", then add ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Add"), " (create new), ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Edit"), " (change existing), and/or ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Delete"), ". Managing users stays with the owner."), restricted && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: "10px 12px",
      maxHeight: 320,
      overflowY: "auto",
      background: t.surface2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between",
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 700
    }
  }, Object.keys(perms).length, " menu", Object.keys(perms).length === 1 ? "" : "s", " allowed"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPerms(fullPerms()),
    style: {
      background: "transparent",
      border: "none",
      color: t.accent,
      fontSize: 11.5,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "All + full"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPerms({}),
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Clear"))), ACCESS_MENUS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label,
    style: {
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontWeight: 700,
      marginBottom: 3
    }
  }, g.label), g.items.map(([id, label]) => {
    const c = perms[id];
    const on = !!c;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: "flex items-center justify-between",
      style: {
        padding: "3px 0",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        cursor: "pointer",
        color: on ? t.text : t.textMuted,
        fontSize: 12.5,
        minWidth: 130
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: on,
      onChange: e => setCap(id, e.target.checked, {})
    }), label), on && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3",
      style: {
        fontSize: 11.5
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        color: c.a ? t.good : t.textFaint
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!c.a,
      onChange: e => setCap(id, true, {
        a: e.target.checked ? 1 : 0
      })
    }), "Add"), /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        color: c.e ? t.accent : t.textFaint
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!c.e,
      onChange: e => setCap(id, true, {
        e: e.target.checked ? 1 : 0
      })
    }), "Edit"), /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        color: c.d ? t.bad : t.textFaint
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!c.d,
      onChange: e => setCap(id, true, {
        d: e.target.checked ? 1 : 0
      })
    }), "Delete")));
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    disabled: busy,
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Saving…" : "Save user"))));
}
function SettingsPage({
  t
}) {
  const [users, setUsers] = useState(USERS);
  const [uq, setUq] = useState("");
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState("");
  const [positions, setPositions] = useState(POSITIONS);
  const [newPos, setNewPos] = useState("");
  const [prOrphans, setPrOrphans] = useState([]);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!PR.employees || !PR.employees.length) await loadPayrollData();
      } catch (e) {}
      if (alive) setPrOrphans((PR.employees || []).filter(e => e.active && !e.user_id));
    })();
    return () => {
      alive = false;
    };
  }, [users]);
  const refresh = async () => {
    try {
      const d = await API("bootstrap");
      if (d && d.ok) {
        if (Array.isArray(d.users)) {
          USERS = d.users;
          setUsers(d.users);
        }
        if (Array.isArray(d.positions)) {
          POSITIONS = d.positions;
          setPositions(d.positions);
        }
      }
    } catch (e) {}
  };
  const onSaved = () => {
    setModal(null);
    setFlash("Saved");
    setTimeout(() => setFlash(""), 2500);
    refresh();
  };
  /* delete_user, reset_password and save_positions ALL still fall through to api.php — none of the
     three is in the Supabase dispatcher. That matters for how success is reported, because an
     unwired action does not throw: it RESOLVES { ok:false, "… is not connected to Supabase yet." }
     (app.jsx:2026). A `catch` around it therefore never fires, which is exactly how all three came
     to announce success for work that never happened. The rule below is the same one savePositions
     now follows — flash success only when the call SAYS it succeeded, and otherwise say what went
     wrong. In Supabase mode that means these three now surface an honest "not connected" instead of
     a false confirmation; that is a visible change, and the visible thing was the bug. */
  const delUser = async u => {
    if (!window.confirm(`Delete user "${u.username}"?`)) return;
    let res = null;
    try {
      res = await API("delete_user", {
        id: u.id
      });
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Delete failed."
      };
    }
    // Refreshed either way, and deliberately: on success the row goes, on failure the true list
    // comes back, so the screen can never keep showing a deletion that did not happen.
    refresh();
    if (res && res.ok) {
      setFlash("User deleted");
      setTimeout(() => setFlash(""), 2500);
      return;
    }
    setFlash("NOT deleted — " + (res && res.error || "the server refused the change.") + " The account is still active.");
    setTimeout(() => setFlash(""), 7000);
  };
  const resetPw = async u => {
    const who = u.full_name || u.username;
    // Asked BEFORE the password is typed, not after: naming the account up front is what catches a
    // click on the wrong row, and it costs nothing to answer. Confirming afterwards would mean
    // discovering the mistake with a password already composed.
    if (!window.confirm(`Reset the password for "${who}"?\n\nTheir current password stops working immediately — they will not be able to sign in until you give them the new one. Continue?`)) return;
    const np = window.prompt(`Set a NEW password for ${who} (they'll log in with this):`, "");
    if (np === null) return;
    if (np.trim().length < 4) {
      setFlash("Password must be at least 4 characters.");
      setTimeout(() => setFlash(""), 3500);
      return;
    }
    let res = null;
    try {
      res = await API("reset_password", {
        id: u.id,
        password: np.trim()
      });
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Reset failed."
      };
    }
    if (res && res.ok) {
      // The password is NOT echoed back, and this is not a loss of information: the admin typed it
      // a second ago, so repeating it tells them nothing they do not already know. It only puts a
      // live credential on screen for anyone walking past — and the old message left it there for
      // fifteen seconds, long enough to be read across a room or caught by a screen share.
      setFlash(`✓ Password reset for ${u.username}. Give them the password you just set — they can change it under My account.`);
      setTimeout(() => setFlash(""), 6000);
      return;
    }
    // Saying which password still works is the whole point of this branch. An admin who believes a
    // reset landed hands out a credential that does not work, and the account holder is locked out
    // with nobody knowing why — so a failed reset has to be unmistakable, and has to say that the
    // OLD password is still the live one.
    setFlash("Password NOT reset — " + (res && res.error || "the server refused the change.") + " Their existing password still works; do not hand out the new one.");
    setTimeout(() => setFlash(""), 9000);
  };
  // Reports what actually happened. This used to swallow every error and then flash "Positions
  // saved" unconditionally, which was worst against the Supabase path: save_positions is not wired
  // there, so it RESOLVES { ok:false, "not connected" } rather than throwing (app.jsx:2026), the
  // catch never fired, and a save that never happened always read as success.
  //
  // The optimistic local update is rolled back on failure too. Leaving it would keep a removed
  // position off the screen while it is still in the database — the same lie one layer down, and
  // the more durable one, because POSITIONS is a module global that outlives the flash.
  const savePositions = async list => {
    const prev = positions;
    setPositions(list);
    POSITIONS = list;
    let res = null;
    try {
      res = await API("save_positions", {
        positions: list
      });
    } catch (e) {
      res = {
        ok: false,
        error: e && e.message || "Save failed."
      };
    }
    if (res && res.ok) {
      setFlash("Positions saved");
      setTimeout(() => setFlash(""), 2000);
      return true;
    }
    setPositions(prev);
    POSITIONS = prev;
    setFlash("NOT saved — " + (res && res.error || "the server refused the change.") + " The list has been put back.");
    setTimeout(() => setFlash(""), 7000);
    return false;
  };
  const addPos = () => {
    const p = newPos.trim();
    if (!p || positions.includes(p)) return;
    savePositions([...positions, p]);
    setNewPos("");
  };
  // Confirmed before the destructive step, because there is no step after it: this list persists
  // the moment it changes, with no Save button standing between the click and the write. The
  // wording says so rather than promising a Save that does not exist.
  const removePos = p => {
    if (!window.confirm(`Remove the position "${p}"?\n\nThis updates the shared positions list used across the app, and saves immediately — there is no separate Save step. Employees already recorded with this position keep it; it just stops being offered on new entries.`)) return;
    savePositions(positions.filter(x => x !== p));
  };
  if (ME.role !== "owner") return /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 30,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted
    }
  }, "Settings are available to the owner account only."));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.goodSoft || t.accentSoft,
      color: t.good,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, flash), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "this device")
  }, "Notifications"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(PushToggle, {
    t: t
  }))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Users
    }, users.length, " users")
  }, "User accounts"), prOrphans.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "4px 0 12px",
      padding: "10px 13px",
      borderRadius: 10,
      fontSize: 12.5,
      fontWeight: 600,
      background: t.badSoft || "#3a1620",
      color: t.bad,
      border: `1px solid ${t.bad}44`
    }
  }, "\u26A0 ", prOrphans.length, " payroll record", prOrphans.length === 1 ? "" : "s", " not linked to a login account: ", prOrphans.map(e => e.full_name).filter(Boolean).join(", "), ".", /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontWeight: 500,
      marginTop: 3
    }
  }, "These people can't approve their own payslips. Fix: open the matching user below (or create their account), tick ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, "Include in weekly payroll"), ", and Save \u2014 it links their record automatically by name.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "7px 11px",
      minWidth: 210
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 14,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: uq,
    onChange: e => setUq(e.target.value),
    placeholder: "Search name, username, position\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 12.5,
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      user: null
    }),
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 15
  }), "Add user"))), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 640
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["Name", "Username", "Position", "Access", "Payroll", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: "left",
      padding: "9px 12px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, (() => {
    const fu = users.filter(u => `${u.full_name || ""} ${u.username || ""} ${u.position || ""}`.toLowerCase().includes(uq.trim().toLowerCase())).sort((a, b) => (a.full_name || a.username || "").toLowerCase().localeCompare((b.full_name || b.username || "").toLowerCase()));
    return /*#__PURE__*/React.createElement(React.Fragment, null, fu.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      colSpan: 6,
      style: {
        padding: "16px 12px",
        textAlign: "center",
        color: t.textFaint,
        fontSize: 12.5
      }
    }, uq ? "No users match your search." : "No users loaded.")), fu.map(u => /*#__PURE__*/React.createElement("tr", {
      key: u.id,
      style: {
        borderBottom: `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        color: t.text,
        fontSize: 12.5,
        fontWeight: 600
      }
    }, u.full_name || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        color: t.textMuted,
        fontSize: 12.5,
        fontFamily: "ui-monospace, monospace"
      }
    }, u.username), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        color: t.textMuted,
        fontSize: 12.5
      }
    }, u.position || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        fontSize: 12
      }
    }, u.role === "owner" ? /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: t.accentSoft,
        color: t.accent,
        padding: "2px 9px",
        fontWeight: 700
      }
    }, "Owner") : u.allowed_views && typeof u.allowed_views === "object" && !Array.isArray(u.allowed_views) && Object.keys(u.allowed_views).length ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Limited \xB7 ", Object.keys(u.allowed_views).length, " menus") : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.good,
        fontWeight: 600
      }
    }, "Full access")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 12px",
        fontSize: 12
      }
    }, u.pr_employee_id || Number(u.per_day) > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, peso(u.per_day), "/day ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint
      }
    }, "\xB7 ", Number(u.schedule_id) === 2 ? "B" : "A")) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint
      }
    }, "\u2014")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        textAlign: "right",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setModal({
        user: u
      }),
      title: "Edit",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 16
    })), u.role !== "owner" && /*#__PURE__*/React.createElement("button", {
      onClick: () => resetPw(u),
      title: "Reset password",
      style: {
        background: "transparent",
        border: "none",
        color: t.accent,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(ShieldCheck, {
      size: 15
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => delUser(u),
      title: "Delete",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 16
    })))))));
  })()))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 8,
      marginTop: 10
    }
  }, (() => {
    const fu = users.filter(u => `${u.full_name || ""} ${u.username || ""} ${u.position || ""}`.toLowerCase().includes(uq.trim().toLowerCase())).sort((a, b) => (a.full_name || a.username || "").toLowerCase().localeCompare((b.full_name || b.username || "").toLowerCase()));
    return /*#__PURE__*/React.createElement(React.Fragment, null, fu.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 12px",
        textAlign: "center",
        color: t.textFaint,
        fontSize: 12.5
      }
    }, uq ? "No users match your search." : "No users loaded."), fu.map(u => /*#__PURE__*/React.createElement("div", {
      key: "m" + u.id,
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 14
      }
    }, u.full_name || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 12,
        fontFamily: "ui-monospace, monospace"
      }
    }, u.username, u.position ? " · " + u.position : "")), /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-3",
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setModal({
        user: u
      }),
      title: "Edit",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 17
    })), u.role !== "owner" && /*#__PURE__*/React.createElement("button", {
      onClick: () => resetPw(u),
      title: "Reset password",
      style: {
        background: "transparent",
        border: "none",
        color: t.accent,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(ShieldCheck, {
      size: 16
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => delUser(u),
      title: "Delete",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 17
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
        fontSize: 12
      }
    }, u.role === "owner" ? /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: t.accentSoft,
        color: t.accent,
        padding: "2px 9px",
        fontWeight: 700
      }
    }, "Owner") : u.allowed_views && typeof u.allowed_views === "object" && !Array.isArray(u.allowed_views) && Object.keys(u.allowed_views).length ? /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: t.borderSoft,
        color: t.textMuted,
        padding: "2px 9px"
      }
    }, "Limited \xB7 ", Object.keys(u.allowed_views).length, " menus") : /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: t.goodSoft,
        color: t.good,
        padding: "2px 9px",
        fontWeight: 600
      }
    }, "Full access"), u.pr_employee_id || Number(u.per_day) > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, peso(u.per_day), "/day \xB7 Sched ", Number(u.schedule_id) === 2 ? "B" : "A") : null))));
  })())), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: ClipboardList
    }, "dropdown")
  }, "Employee positions"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-1"
  }, positions.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    className: "inline-flex items-center gap-1.5 rounded-full",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.text,
      fontSize: 12.5,
      fontWeight: 600,
      padding: "6px 6px 6px 12px"
    }
  }, p, /*#__PURE__*/React.createElement("button", {
    onClick: () => removePos(p),
    title: "Remove",
    style: {
      background: "transparent",
      border: "none",
      color: t.textFaint,
      cursor: "pointer",
      display: "inline-flex",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 13
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("input", {
    value: newPos,
    onChange: e => setNewPos(e.target.value),
    onKeyDown: e => e.key === "Enter" && addPos(),
    placeholder: "Add a position\u2026",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 11px",
      fontSize: 13,
      outline: "none",
      maxWidth: 240
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addPos,
    className: "rounded-xl",
    style: {
      background: t.accentSoft,
      color: t.accent,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 14px"
    }
  }, "Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      marginTop: 8
    }
  }, "These appear in the Position dropdown when creating users and payroll.")), modal && /*#__PURE__*/React.createElement(UserModal, {
    t: t,
    user: modal.user,
    onClose: () => setModal(null),
    onSaved: onSaved
  }));
}

/* ================================================================
   PAYROLL WORKFLOW  (weekly batches + technician approve/contest)
   Backed by pr_employees / pr_periods / pr_items via api.php.
   ================================================================ */
const PR_ATT = [["att_present", "P", "Present"], ["att_absent", "A", "Absent"], ["att_leave", "L", "Leave"], ["att_halfday", "H", "Half-day"]];
const PR_DEDS = [["ded_loan", "Loan"], ["ded_uniform", "Uniform"], ["ded_gov", "Government"], ["ded_manual", "Manual"]];
const prNum = v => {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};
function prCleanNotes(notes) {
  if (!notes) return "";
  const parts = String(notes).split(";").map(s => s.trim()).filter(Boolean);
  const counts = {};
  const order = [];
  parts.forEach(p => {
    if (counts[p] == null) {
      counts[p] = 0;
      order.push(p);
    }
    counts[p]++;
  });
  return order.map(p => counts[p] > 1 ? p + " ×" + counts[p] : p).join("  ·  ");
}
const PR_OT_MULTIPLIER = 1.15; // overtime rate multiplier
const prOtPay = it => Math.round(prNum(it.ot_hours) * (prNum(it.per_day) / 8) * PR_OT_MULTIPLIER * 100) / 100; // OT pay = (per_day ÷ 8) × 1.15 × OT hours
const prSundayRest = it => it.snap_sunday_rest != null ? prNum(it.snap_sunday_rest) : it._sunday_rest != null ? prNum(it._sunday_rest) : 1; // schedule A = 1
const prPaidDays = it => Math.round((prNum(it.att_present) + 0.5 * prNum(it.att_halfday) + (prNum(it.leave_paid) ? prNum(it.att_leave) : 0)) * 100) / 100;
const prAttTotal = it => prNum(it.att_present) + prNum(it.att_absent) + prNum(it.att_leave) + prNum(it.att_halfday);
const prWorkingDays = it => it.snap_working_days != null ? prNum(it.snap_working_days) : it._working_days != null ? prNum(it._working_days) : 6;
const prMissingAtt = it => prAttTotal(it) < prWorkingDays(it);
function prCalc(it) {
  const pd = prNum(it.per_day);
  const regular = Math.round(prPaidDays(it) * pd);
  const ot = Math.round(prOtPay(it));
  const sunday = prSundayRest(it) ? Math.round(prNum(it.sun_days) * pd) : 0;
  const incent = Math.round(prNum(it.add_incentive));
  const gross = regular + ot + sunday + incent;
  const ded = Math.round(prNum(it.ded_loan)) + Math.round(prNum(it.ded_uniform)) + Math.round(prNum(it.ded_gov)) + Math.round(prNum(it.ded_manual));
  return {
    regular,
    ot,
    sunday,
    incent,
    gross,
    ded,
    net: gross - ded
  };
}
function prPayslipRows(name, position, period, it) {
  const c = prCalc(it);
  const rows = [["Employee", name], ["Position", position || "—"], ["Pay period", period.label || ""], ["Pay date", period.pay_date || "—"], ["Rate per day", prNum(it.per_day)], ["Present", prNum(it.att_present)], ["Half-day", prNum(it.att_halfday)], ["Leave", prNum(it.att_leave)], ["Absent", prNum(it.att_absent)], ["Paid days", prPaidDays(it)], ["Regular (paid days × rate)", c.regular], ["OT (" + prNum(it.ot_hours) + " hrs)", c.ot]];
  if (prSundayRest(it)) rows.push(["Sunday duty (" + prNum(it.sun_days) + " days)", c.sunday]);
  rows.push(["Incentives", c.incent], ["GROSS", c.gross], ["Less: Loan", prNum(it.ded_loan)], ["Less: Uniform", prNum(it.ded_uniform)], ["Less: Government", prNum(it.ded_gov)], ["Less: Manual" + (it.ded_manual_note ? " (" + it.ded_manual_note + ")" : ""), prNum(it.ded_manual)]);
  if (it.ded_notes) rows.push(["Installments", prCleanNotes(it.ded_notes)]);
  rows.push(["NET SALARY", c.net]);
  return rows;
}
function downloadPayslipXLS(name, position, period, it) {
  const safe = (name || "employee").replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  downloadXLS(`payslip_${safe}_${(period.label || "").replace(/[^a-z0-9]+/gi, "_")}.xls`, `Payslip — ${name} — ${period.label || ""}`, ["Item", "Amount (₱)"], prPayslipRows(name, position, period, it));
}
function printPayslip(name, position, period, it) {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Please allow pop-ups to print.");
    return;
  }
  const c = prCalc(it);
  const esc = v => (v == null ? "" : String(v)).replace(/[&<>]/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  })[m]);
  const money = v => "₱" + Math.round(prNum(v)).toLocaleString("en-PH");
  const line = (l, v, b) => `<tr><td>${esc(l)}</td><td style="text-align:right${b ? ";font-weight:bold" : ""}">${money(v)}</td></tr>`;
  const html = "<html><head><title>Payslip</title><style>" + "body{font-family:Arial,Helvetica,sans-serif;padding:30px;color:#111;max-width:520px}" + "h1{font-size:17px;margin:0}.sub{color:#555;font-size:12px;margin:2px 0 14px}" + ".meta{font-size:13px;margin-bottom:10px}.meta b{display:inline-block;width:90px;color:#555;font-weight:600}" + "table{width:100%;border-collapse:collapse;font-size:13px}td{border:1px solid #bbb;padding:6px 10px}" + ".net td{background:#eef7f0;font-size:15px;font-weight:bold}" + ".sig{margin-top:34px;font-size:12px;color:#333}.sig span{display:inline-block;border-top:1px solid #333;width:220px;margin-top:34px;padding-top:4px}" + "</style></head><body>" + "<h1>TIONGTECH INTERNET AND CABLE INSTALLATION SERVICES</h1>" + "<div class='sub'>Weekly Payroll — Payslip · San Luis, Agusan del Sur</div>" + `<div class='meta'><div><b>Employee</b> ${esc(name)}</div><div><b>Position</b> ${esc(position || "—")}</div><div><b>Pay period</b> ${esc(period.label || "")}</div><div><b>Pay date</b> ${esc(period.pay_date || "—")}</div></div>` + "<table>" + line("Regular (" + prPaidDays(it) + " paid days × " + money(it.per_day) + ")", c.regular) + line("OT (" + prNum(it.ot_hours) + " hrs)", c.ot) + (prSundayRest(it) ? line("Sunday duty (" + prNum(it.sun_days) + " days)", c.sunday) : "") + line("Incentives", c.incent) + line("GROSS", c.gross, true) + line("Less: Loan", it.ded_loan) + line("Less: Uniform", it.ded_uniform) + line("Less: Government", it.ded_gov) + line("Less: Manual" + (it.ded_manual_note ? " (" + esc(it.ded_manual_note) + ")" : ""), it.ded_manual) + "<tr class='net'><td>NET SALARY</td><td style='text-align:right'>" + money(c.net) + "</td></tr>" + "</table>" + (it.ded_notes ? "<div style='font-size:11px;color:#555;margin-top:6px'>Installments: " + esc(prCleanNotes(it.ded_notes)) + "</div>" : "") + "<div class='sig'>Received by:<br><span>" + esc(name) + "</span></div>" + "</body></html>";
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => {
    try {
      w.print();
    } catch (e) {}
  }, 350);
}
function PrStatusChip({
  t,
  status
}) {
  const map = {
    pending: ["Awaiting review", t.warn, t.warnSoft],
    approved: ["Approved", t.good, t.goodSoft],
    contested: ["Discrepancy", t.bad, t.badSoft]
  };
  const [label, c, bg] = map[status] || ["—", t.textMuted, t.borderSoft];
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center rounded-full",
    style: {
      background: bg,
      color: c,
      fontSize: 10.5,
      fontWeight: 700,
      padding: "2px 9px",
      whiteSpace: "nowrap"
    }
  }, label);
}

/* ---- Roster manager (officer) ---- */
/* Payroll write helper — unlike the silent calls elsewhere, this SURFACES the
   real outcome so a failed save is never invisible. Throws with a useful message. */
async function prWrite(action, payload) {
  let r;
  try {
    r = await API(action, payload);
  } catch (e) {
    throw new Error("Couldn't reach the server. Check your connection and that api.php is uploaded to the same folder as index.php.");
  }
  if (!r) throw new Error("The server returned an empty response.");
  if (r.ok === false) throw new Error(r.error || "The server rejected \u201C" + action + "\u201D. Make sure the latest api.php is uploaded and you are signed in with an owner or payroll account.");
  return r;
}
function RosterModal({
  t,
  employees,
  users,
  schedules,
  onClose,
  onChanged
}) {
  const scheds = schedules && schedules.length ? schedules : [{
    id: 1,
    code: "A",
    name: "Schedule A — Mon to Sat"
  }, {
    id: 2,
    code: "B",
    name: "Schedule B — Sun to Fri"
  }];
  const schedCode = id => {
    const s = scheds.find(x => x.id == id);
    return s ? s.code : "A";
  };
  const [rows, setRows] = useState(employees);
  const [editing, setEditing] = useState({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "7px 9px",
    fontSize: 12.5,
    outline: "none"
  };
  const cellTxt = {
    color: t.text,
    fontSize: 12.5
  };
  const flash = (ok, text) => {
    setMsg({
      ok,
      text
    });
    if (ok) setTimeout(() => setMsg(null), 3500);
  };
  const set = (id, k, v) => setRows(r => r.map(x => x.id === id ? {
    ...x,
    [k]: v
  } : x));
  const isEdit = row => row._new || editing[row.id];
  const userName = uid => {
    const u = users.find(x => x.id == uid);
    return u ? (u.full_name || u.username) + " (" + u.username + ")" : "— none —";
  };
  const startEdit = row => {
    if (!window.confirm(`Edit ${row.full_name}?`)) return;
    setMsg(null);
    setEditing(e => ({
      ...e,
      [row.id]: true
    }));
  };
  const cancelEdit = row => {
    if (row._new) {
      setRows(r => r.filter(x => x.id !== row.id));
      return;
    }
    const orig = employees.find(x => x.id === row.id);
    if (orig) setRows(r => r.map(x => x.id === row.id ? {
      ...orig
    } : x));
    setEditing(e => {
      const n = {
        ...e
      };
      delete n[row.id];
      return n;
    });
  };
  const addRow = () => {
    setMsg(null);
    setRows(r => [...r, {
      id: "new_" + Date.now(),
      full_name: "",
      position: POSITIONS[0] || "",
      per_day: 0,
      schedule_id: 1,
      user_id: null,
      active: 1,
      _new: true
    }]);
  };
  const saveRow = async row => {
    if (!String(row.full_name || "").trim()) {
      flash(false, "Name is required.");
      return;
    }
    if (!window.confirm(row._new ? `Add ${row.full_name} to the roster?` : `Save changes to ${row.full_name}?`)) return;
    setBusy(true);
    try {
      const r = await prWrite("pr_save_employee", {
        id: row._new ? null : row.id,
        full_name: row.full_name,
        position: row.position,
        per_day: row.per_day,
        schedule_id: row.schedule_id || 1,
        user_id: row.user_id || "",
        active: row.active ? 1 : 0
      });
      setRows(rs => rs.map(x => x.id === row.id ? {
        ...x,
        _new: false,
        id: r.id || x.id
      } : x));
      setEditing(e => {
        const n = {
          ...e
        };
        delete n[row.id];
        return n;
      });
      flash(true, "Saved. (Schedule changes only affect future payrolls.)");
      onChanged();
    } catch (err) {
      flash(false, err.message);
    }
    setBusy(false);
  };
  const delRow = async row => {
    if (row._new) {
      setRows(r => r.filter(x => x.id !== row.id));
      return;
    }
    if (!window.confirm(`Mark ${row.full_name} as inactive?\n\nThey'll be removed from the active roster and won't appear on new payroll weeks, but their past payslips keep their name. You can undo this any time by editing them and ticking Active.`)) return;
    setBusy(true);
    // Soft delete: the row stays, flipped to inactive in place (so it shows “No” and can be
    // reactivated), rather than vanishing from the list.
    try {
      await prWrite("pr_delete_employee", {
        id: row.id
      });
      setRows(r => r.map(x => x.id === row.id ? {
        ...x,
        active: 0
      } : x));
      flash(true, "Marked inactive — reactivate any time by editing and ticking Active.");
      onChanged();
    } catch (err) {
      flash(false, err.message);
    }
    setBusy(false);
  };
  const editBtn = {
    background: t.violet + "22",
    color: t.violet,
    border: "none",
    cursor: "pointer",
    fontSize: 11.5,
    fontWeight: 700,
    padding: "5px 10px",
    borderRadius: 8,
    marginRight: 6
  };
  const saveBtn = {
    background: t.goodSoft,
    color: t.good,
    border: "none",
    cursor: "pointer",
    fontSize: 11.5,
    fontWeight: 700,
    padding: "5px 10px",
    borderRadius: 8,
    marginRight: 6
  };
  const cancelBtn = {
    background: "transparent",
    color: t.textMuted,
    border: `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 11.5,
    fontWeight: 700,
    padding: "5px 10px",
    borderRadius: 8,
    marginRight: 6
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 820,
      padding: 0,
      maxHeight: "90vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Employee roster"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      marginBottom: 10
    }
  }, "Link a login account so that person sees their own payslips under ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Salary"), ". Set inactive instead of deleting anyone with history."), (() => {
    const unlinked = rows.filter(r => r.active && !r.user_id && !r._new);
    return unlinked.length > 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10,
        padding: "9px 12px",
        borderRadius: 10,
        fontSize: 12.5,
        fontWeight: 600,
        background: t.badSoft || "#3a1620",
        color: t.bad,
        border: `1px solid ${t.bad}44`
      }
    }, "\u26A0 ", unlinked.length, " active employee", unlinked.length === 1 ? "" : "s", " ", unlinked.length === 1 ? "is" : "are", " not linked to a login account: ", unlinked.map(r => r.full_name).filter(Boolean).join(", "), ". They can't approve their own payslips until you set their ", /*#__PURE__*/React.createElement("b", null, "Linked login"), " below and Save.") : null;
  })(), msg && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10,
      padding: "8px 11px",
      borderRadius: 9,
      fontSize: 12.5,
      fontWeight: 600,
      background: msg.ok ? t.goodSoft : t.badSoft || "#3a1620",
      color: msg.ok ? t.good : t.bad,
      border: `1px solid ${msg.ok ? t.good : t.bad}33`
    }
  }, msg.text), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 720
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 10.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, ["Name", "Position", "Schedule", "Per day", "Linked login", "Active", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: "left",
      padding: "6px 8px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(row => /*#__PURE__*/React.createElement("tr", {
    key: row.id,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, isEdit(row) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: row.full_name,
    onChange: e => set(row.id, "full_name", e.target.value),
    style: {
      ...inp,
      minWidth: 150
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: row.position || "",
    onChange: e => set(row.id, "position", e.target.value),
    style: {
      ...inp,
      minWidth: 100
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: row.schedule_id || 1,
    onChange: e => set(row.id, "schedule_id", Number(e.target.value)),
    style: {
      ...inp,
      minWidth: 90
    }
  }, scheds.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.id,
    style: {
      background: t.surface,
      color: t.text
    }
  }, s.code, " \xB7 ", s.code === "A" ? "Mon–Sat" : "Sun–Fri")))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: row.per_day,
    onChange: e => set(row.id, "per_day", e.target.value),
    style: {
      ...inp,
      width: 80
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: row.user_id || "",
    onChange: e => set(row.id, "user_id", e.target.value),
    style: {
      ...inp,
      minWidth: 150
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    style: {
      background: t.surface,
      color: t.text
    }
  }, "\u2014 none \u2014"), users.map(u => /*#__PURE__*/React.createElement("option", {
    key: u.id,
    value: u.id,
    style: {
      background: t.surface,
      color: t.text
    }
  }, (u.full_name || u.username) + " (" + u.username + ")")))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!row.active,
    onChange: e => set(row.id, "active", e.target.checked ? 1 : 0)
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => saveRow(row),
    disabled: busy,
    style: saveBtn
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: () => cancelEdit(row),
    disabled: busy,
    style: cancelBtn
  }, "Cancel"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      ...cellTxt,
      fontWeight: 600
    }
  }, row.full_name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      ...cellTxt
    }
  }, row.position || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      padding: "1px 8px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 800,
      background: schedCode(row.schedule_id) === "A" ? t.accentSoft : t.violet + "22",
      color: schedCode(row.schedule_id) === "A" ? t.accent : t.violet
    }
  }, schedCode(row.schedule_id)), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, schedCode(row.schedule_id) === "A" ? "Mon–Sat" : "Sun–Fri")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      ...cellTxt
    }
  }, peso(row.per_day)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      fontSize: 12.5
    }
  }, row.user_id ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text
    }
  }, userName(row.user_id)) : row.active ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.bad,
      fontWeight: 700
    }
  }, "\u26A0 Not linked") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint
    }
  }, "\u2014 none \u2014")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      textAlign: "center"
    }
  }, row.active ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.good,
      fontSize: 12,
      fontWeight: 700
    }
  }, "Yes") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "No")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "5px 8px",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => startEdit(row),
    style: editBtn
  }, "Edit"), row.active ? /*#__PURE__*/React.createElement("button", {
    onClick: () => delRow(row),
    title: "Mark inactive (removes from active roster; keeps payslip history)",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  })) : null))))))), /*#__PURE__*/React.createElement("button", {
    onClick: addRow,
    className: "inline-flex items-center gap-1.5 rounded-xl mt-3",
    style: {
      background: t.accentSoft,
      color: t.accent,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "Add employee"))));
}

/* ---- New / edit week (officer) ---- */
function PeriodModal({
  t,
  period,
  onClose,
  onSaved
}) {
  const [form, setForm] = useState({
    label: period && period.label || "",
    pay_date: period && period.pay_date || "",
    notes: period && period.notes || "",
    start: "",
    end: ""
  });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const fmtRange = (s, e) => {
    if (!s || !e) return "";
    const ds = new Date(s + "T00:00:00"),
      de = new Date(e + "T00:00:00");
    if (isNaN(ds.getTime()) || isNaN(de.getTime())) return "";
    const mo = d => d.toLocaleString("en-US", {
      month: "short"
    });
    if (ds.getMonth() === de.getMonth() && ds.getFullYear() === de.getFullYear()) return `${mo(ds)} ${ds.getDate()}\u2013${de.getDate()}, ${de.getFullYear()}`;
    if (ds.getFullYear() === de.getFullYear()) return `${mo(ds)} ${ds.getDate()} \u2013 ${mo(de)} ${de.getDate()}, ${de.getFullYear()}`;
    return `${mo(ds)} ${ds.getDate()}, ${ds.getFullYear()} \u2013 ${mo(de)} ${de.getDate()}, ${de.getFullYear()}`;
  };
  const onRange = (k, v) => setForm(f => {
    const nf = {
      ...f,
      [k]: v
    };
    const lab = fmtRange(nf.start, nf.end);
    if (lab) {
      nf.label = lab;
      if (!nf.pay_date && nf.end) nf.pay_date = nf.end;
    } // suggest a pay date (edit if needed)
    return nf;
  });
  const lbl = {
    display: "block",
    color: t.textFaint,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
    marginBottom: 4
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    colorScheme: t.name === "dark" ? "dark" : "light"
  };
  const save = async () => {
    if (!form.label.trim()) {
      alert("Pick the period dates (or type a label), e.g. “Jul 18–25, 2026”.");
      return;
    }
    if (!window.confirm(period && period.id ? "Save changes to this week?" : `Create payroll week “${form.label}”?`)) return;
    setBusy(true);
    let id = period && period.id;
    try {
      const r = await prWrite("pr_save_period", {
        id,
        label: form.label,
        pay_date: form.pay_date,
        notes: form.notes
      });
      if (r && r.id) id = r.id;
      setBusy(false);
      onSaved(id);
    } catch (e) {
      setBusy(false);
      alert("Could not save the week:\n\n" + e.message);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 460,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, period && period.id ? "Edit week" : "New payroll week"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Period dates"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.start,
    onChange: e => onRange("start", e.target.value),
    style: inp,
    title: "From"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 700
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.end,
    onChange: e => onRange("end", e.target.value),
    style: inp,
    title: "To"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Period label"), /*#__PURE__*/React.createElement("input", {
    value: form.label,
    onChange: e => set("label", e.target.value),
    placeholder: "Jul 18\u201325, 2026",
    style: inp
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      marginTop: 3
    }
  }, "Fills in automatically from the dates above \u2014 you can still edit it.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Pay date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.pay_date,
    onChange: e => set("pay_date", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Notes (optional)"), /*#__PURE__*/React.createElement("input", {
    value: form.notes,
    onChange: e => set("notes", e.target.value),
    style: inp
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    disabled: busy,
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Saving…" : "Save week"))));
}

/* ---- Loan plan vocabulary: the kinds the form offers, the categories they file under, and the
   default mapping between them. PR_KIND_CAT is only a DEFAULT — category is its own stored column
   the officer can override, and it is category, not kind, that decides which pr_items column a
   plan deducts into (_PR_CAT_DED, app.jsx:1600). ---- */
const PR_KINDS = [["tshirt", "T-shirt"], ["coop", "Coop"], ["ca", "Cash advance"], ["fines", "Fines"]];
const PR_CATS = [["loan", "Loan"], ["uniform", "Uniform"], ["government", "Government"], ["other", "Other"]];
const PR_KIND_CAT = {
  tshirt: "uniform",
  coop: "loan",
  ca: "loan",
  fines: "other"
};

/* ---- Loan Management page (Payroll → Loan Management) ---- */
function LoanManagement({
  t
}) {
  const [pr, setPr] = useState(PR);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [newRows, setNewRows] = useState([]); // unsaved additions
  const [edits, setEdits] = useState({}); // id -> draft being edited
  const reload = async () => {
    await loadPayrollData();
    setPr({
      ...PR
    });
  };
  useEffect(() => {
    (async () => {
      await reload();
    })();
  }, []);
  const employees = pr.employees || [];
  const plans = pr.plans || []; // saved loans — the source of truth (from the database)
  const active = plans.filter(p => p.active).length;
  const [q, setQ] = useState("");
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [showInactive, setShowInactive] = useState(false);
  // Who may write a plan. ME.role, and NOT can("payroll") — the same reasoning PayrollPage spells
  // out for Publish (app.jsx:5267): _supaSavePlan/_supaDeletePlan gate on ME.role, so gating the
  // buttons on can() would render Edit/Delete for a Settings-granted admin and hand them a refusal
  // every time. The button should not exist unless the write behind it can succeed.
  const isOwner = !!ME && ME.role === "owner";
  const isPayroll = !!ME && ME.role === "payroll";
  const officer = isOwner || isPayroll;
  const outstanding = plans.filter(p => p.active).reduce((s, p) => s + Math.max(0, (Number(p.total_amount) || 0) - (Number(p.paid) || 0)), 0);
  const flash = (ok, text) => {
    setMsg({
      ok,
      text
    });
    if (ok) setTimeout(() => setMsg(null), 3500);
  };
  const empName = id => {
    const e = employees.find(x => x.id == id);
    return e ? e.full_name : "?";
  };
  const kindLabel = k => (PR_KINDS.find(x => x[0] === k) || [null, k])[1];
  const catLabel = c => (PR_CATS.find(x => x[0] === (c || "loan")) || [null, "Loan"])[1];
  const perWeek = row => {
    const tt = Number(row.terms_total) || 0,
      tot = Number(row.total_amount) || 0;
    return tt > 0 ? Math.round(tot / tt * 100) / 100 : 0;
  };
  const wkInterest = row => {
    const tot = Number(row.total_amount) || 0,
      r = Number(row.interest_rate) || 0;
    return Math.round(tot * r / 100 * 100) / 100;
  };
  const wkPayment = row => row.interest_only ? wkInterest(row) : Math.round((perWeek(row) + wkInterest(row)) * 100) / 100;
  const toggleIntOnly = async p => {
    const nv = p.interest_only ? 0 : 1;
    if (!window.confirm(nv ? `Switch "${kindLabel(p.kind)}" for ${empName(p.employee_id)} to INTEREST ONLY?\nOnly the weekly interest (${peso(wkInterest(p))}) will be deducted until you switch it back — the term extends.` : "Resume normal payments (principal + interest)?")) return;
    persist({
      id: p.id,
      employee_id: p.employee_id,
      kind: p.kind,
      category: p.category || PR_KIND_CAT[p.kind] || "loan",
      label: kindLabel(p.kind),
      total_amount: p.total_amount,
      terms_total: p.terms_total,
      interest_rate: p.interest_rate || 0,
      interest_only: nv,
      start_date: p.start_date || null,
      active: p.active ? 1 : 0
    }, nv ? "Now interest-only (extension)." : "Resumed normal payments.");
  };
  const applyKind = (row, k, v) => {
    if (k === "kind") {
      row.category = PR_KIND_CAT[v] || "loan";
      if (!row.label || PR_KINDS.some(x => x[1] === row.label)) row.label = kindLabel(v);
    }
    return row;
  };
  const addRow = () => {
    setMsg(null);
    const today = new Date().toISOString().slice(0, 10);
    setNewRows(r => [...r, {
      _tmp: "n" + Date.now(),
      employee_id: employees[0] && employees[0].id || "",
      kind: "ca",
      category: "loan",
      label: "Cash advance",
      total_amount: "",
      terms_total: "",
      interest_rate: "",
      interest_only: 0,
      start_date: today,
      active: 1
    }]);
  };
  const setNew = (tmp, k, v) => setNewRows(r => r.map(x => x._tmp === tmp ? applyKind({
    ...x,
    [k]: v
  }, k, v) : x));
  const cancelNew = tmp => setNewRows(r => r.filter(x => x._tmp !== tmp));
  const setEdit = (id, k, v) => setEdits(e => ({
    ...e,
    [id]: applyKind({
      ...e[id],
      [k]: v
    }, k, v)
  }));
  const startEdit = p => {
    setMsg(null);
    setEdits(e => ({
      ...e,
      [p.id]: {
        ...p
      }
    }));
  };
  const cancelEdit = id => setEdits(e => {
    const n = {
      ...e
    };
    delete n[id];
    return n;
  });
  const persist = async (payload, okText, after) => {
    setBusy(true);
    try {
      await prWrite("pr_save_plan", payload);
      await reload();
      if (after) after();
      flash(true, okText);
    } catch (e) {
      flash(false, e.message);
    }
    setBusy(false);
  };
  const saveNew = row => {
    if (!row.employee_id) return flash(false, "Pick an employee.");
    if (!(Number(row.total_amount) > 0) || !(Number(row.terms_total) > 0)) return flash(false, "Enter a total amount and number of weeks.");
    if (!window.confirm(`Add this ${row.label} loan for ${empName(row.employee_id)}?`)) return;
    persist({
      employee_id: row.employee_id,
      kind: row.kind,
      category: row.category || PR_KIND_CAT[row.kind] || "loan",
      label: kindLabel(row.kind),
      total_amount: row.total_amount,
      terms_total: row.terms_total,
      interest_rate: row.interest_rate || 0,
      interest_only: row.interest_only ? 1 : 0,
      start_date: row.start_date || null,
      active: row.active ? 1 : 0
    }, "Loan saved.", () => cancelNew(row._tmp));
  };
  const saveEdit = id => {
    const row = edits[id];
    if (!row) return;
    if (!(Number(row.total_amount) > 0) || !(Number(row.terms_total) > 0)) return flash(false, "Enter a total amount and number of weeks.");
    if (!window.confirm("Save changes to this loan?")) return;
    persist({
      id,
      employee_id: row.employee_id,
      kind: row.kind,
      category: row.category || "loan",
      label: kindLabel(row.kind),
      total_amount: row.total_amount,
      terms_total: row.terms_total,
      interest_rate: row.interest_rate || 0,
      interest_only: row.interest_only ? 1 : 0,
      start_date: row.start_date || null,
      active: row.active ? 1 : 0
    }, "Saved.", () => cancelEdit(id));
  };
  const delRow = async p => {
    // Says what actually happens. The old text promised "cannot be undone" over a hard delete; the
    // write is a soft delete, so the honest prompt is that deductions stop and the record stays —
    // and that it is reversible, which is the difference the officer is deciding on.
    if (!window.confirm(`Stop this ${p.label} loan for ${empName(p.employee_id)}?\n\nNo further weekly deductions will be made. Past deductions and the loan record are kept, and you can restore it later with "Show inactive".`)) return;
    setBusy(true);
    try {
      await prWrite("pr_delete_plan", {
        id: p.id
      });
      await reload();
      flash(true, "Loan stopped — no further deductions.");
    } catch (e) {
      flash(false, e.message);
    }
    setBusy(false);
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "6px 7px",
    fontSize: 12,
    outline: "none"
  };
  const cellTxt = {
    color: t.text,
    fontSize: 12
  };
  const btn = (bg, col) => ({
    background: bg,
    color: col,
    border: "none",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 7,
    marginRight: 5
  });
  const done = p => (p.terms_done || 0) >= (Number(p.terms_total) || 0);
  const ec = {
    padding: "5px 5px"
  };
  const editForm = (row, setFn, onSave, onCancel, isNew) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("select", {
    value: row.employee_id,
    onChange: e => setFn("employee_id", Number(e.target.value)),
    style: {
      ...inp,
      minWidth: 118
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    style: {
      background: t.surface,
      color: t.text
    }
  }, "\u2014 pick \u2014"), employees.filter(e => e.active).map(e => /*#__PURE__*/React.createElement("option", {
    key: e.id,
    value: e.id,
    style: {
      background: t.surface,
      color: t.text
    }
  }, e.full_name)))), /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("select", {
    value: row.kind,
    onChange: e => setFn("kind", e.target.value),
    style: {
      ...inp,
      minWidth: 84
    }
  }, PR_KINDS.map(([v, l]) => /*#__PURE__*/React.createElement("option", {
    key: v,
    value: v,
    style: {
      background: t.surface,
      color: t.text
    }
  }, l)))), /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("select", {
    value: row.category || "loan",
    onChange: e => setFn("category", e.target.value),
    style: {
      ...inp,
      minWidth: 84
    }
  }, PR_CATS.map(([v, l]) => /*#__PURE__*/React.createElement("option", {
    key: v,
    value: v,
    style: {
      background: t.surface,
      color: t.text
    }
  }, l)))), /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: row.total_amount,
    onChange: e => setFn("total_amount", e.target.value),
    style: {
      ...inp,
      width: 62
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: row.terms_total,
    onChange: e => setFn("terms_total", e.target.value),
    style: {
      ...inp,
      width: 42
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      ...ec,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: row.interest_rate,
    onChange: e => setFn("interest_rate", e.target.value),
    placeholder: "0",
    style: {
      ...inp,
      width: 46
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, "%")), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginTop: 4,
      color: t.textMuted,
      fontSize: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!row.interest_only,
    onChange: e => setFn("interest_only", e.target.checked ? 1 : 0)
  }), "interest only")), /*#__PURE__*/React.createElement("td", {
    style: {
      ...ec,
      color: t.text,
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap"
    }
  }, peso(wkPayment(row)), Number(row.interest_rate) > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 9,
      fontWeight: 500
    }
  }, peso(perWeek(row)), "+", peso(wkInterest(row))) : null), /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: row.start_date || "",
    onChange: e => setFn("start_date", e.target.value),
    style: {
      ...inp,
      width: 124,
      padding: "5px 4px"
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      ...ec,
      color: t.textFaint,
      fontSize: 12
    }
  }, isNew ? "—" : (row.terms_done || 0) + " / " + row.terms_total), /*#__PURE__*/React.createElement("td", {
    style: {
      ...ec,
      color: t.textFaint,
      fontSize: 12
    }
  }, isNew ? "—" : peso((Number(row.total_amount) || 0) - (Number(row.paid) || 0))), /*#__PURE__*/React.createElement("td", {
    style: ec
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      color: t.textMuted,
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!row.active,
    onChange: e => setFn("active", e.target.checked ? 1 : 0)
  }), "Active")), /*#__PURE__*/React.createElement("td", {
    style: {
      ...ec,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    disabled: busy,
    onClick: onSave,
    style: btn(t.goodSoft, t.good)
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: btn("transparent", t.textMuted)
  }, "Cancel")));

  // A soft-deleted plan (active=0) drops out of the list, so Delete LOOKS like a delete even though
  // the row survives. "Show inactive" is what keeps reactivation reachable: without it a deleted
  // plan would be invisible AND un-editable, and ticking Active back on (5163) could never be
  // reached — the record would persist with no way back, which is a worse outcome than a hard
  // delete, not a better one. Inactive rows are dimmed so the two states never read alike.
  const inactiveCount = plans.filter(p => !p.active).length;
  const visiblePlans = showInactive ? plans : plans.filter(p => p.active);
  const filteredPlans = visiblePlans.filter(p => {
    const s = (empName(p.employee_id) + " " + kindLabel(p.kind) + " " + catLabel(p.category) + " " + (p.label || "")).toLowerCase();
    return s.includes(q.trim().toLowerCase());
  });
  const pg = prPaginate(filteredPlans, size, page);
  const searchBox = /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, inactiveCount > 0 && /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      color: t.textMuted,
      fontSize: 11.5,
      whiteSpace: "nowrap",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showInactive,
    onChange: e => {
      setShowInactive(e.target.checked);
      setPage(0);
    }
  }), "Show inactive (", inactiveCount, ")"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "6px 10px",
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 14,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setPage(0);
    },
    placeholder: "Search employee, type\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 12.5,
      width: "100%"
    }
  })));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "Loan Management"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, active, " active \xB7 ", peso(outstanding), " outstanding")), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      marginBottom: 10
    }
  }, "Set a debt once \u2014 e.g. T-shirt \u20B1250 over 5 weeks, with a ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Payment start"), " date. From that date, every new payroll week automatically deducts the weekly share (labelled \u201Cn of N\u201D) and stops when fully paid. You can also re-sync a week manually with ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Apply plans"), ". Saved loans stay here until you delete them."), msg && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10,
      padding: "8px 11px",
      borderRadius: 9,
      fontSize: 12.5,
      fontWeight: 600,
      background: msg.ok ? t.goodSoft : t.badSoft || "#3a1620",
      color: msg.ok ? t.good : t.bad,
      border: `1px solid ${msg.ok ? t.good : t.bad}33`
    }
  }, msg.text), /*#__PURE__*/React.createElement(EntriesBar, {
    t: t,
    size: size,
    setSize: setSize,
    total: pg.total,
    from: pg.from,
    to: pg.to,
    page: pg.page,
    setPage: setPage,
    pages: pg.pages,
    right: searchBox
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 680,
      tableLayout: "auto"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 10.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, [["Employee"], ["Type"], ["Category"], ["Total ₱"], ["Weeks", "payment terms"], ["Interest", "% per week"], ["Weekly pay", "deducted / week"], ["Payment start", "first deduction"], ["Progress", "times paid"], ["Remaining", "balance"], ["Active"], [""]].map(([h, sub], i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: "left",
      padding: "6px 6px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h, sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 8.5,
      textTransform: "none",
      letterSpacing: 0,
      color: t.textFaint
    }
  }, sub) : null)))), /*#__PURE__*/React.createElement("tbody", null, pg.total === 0 && newRows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 12,
    style: {
      padding: "14px 8px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, q ? "No loans match your search." : "No loans yet — add one below.")), pg.slice.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`,
      opacity: p.active ? 1 : 0.55
    }
  }, edits[p.id] ? editForm(edits[p.id], (k, v) => setEdit(p.id, k, v), () => saveEdit(p.id), () => cancelEdit(p.id), false) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      ...cellTxt,
      fontWeight: 600
    }
  }, empName(p.employee_id)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      ...cellTxt
    }
  }, kindLabel(p.kind)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      fontSize: 11.5,
      color: t.textMuted,
      fontWeight: 700
    }
  }, catLabel(p.category)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      ...cellTxt
    }
  }, peso(p.total_amount)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      ...cellTxt
    }
  }, p.terms_total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      whiteSpace: "nowrap"
    }
  }, Number(p.interest_rate) > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontSize: 12,
      fontWeight: 600
    }
  }, p.interest_rate, "% ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 400
    }
  }, "(", peso(p.weekly_interest != null ? p.weekly_interest : wkInterest(p)), ")")) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "\u2014"), officer && p.active && !done(p) ? /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleIntOnly(p),
    disabled: busy,
    title: "Extend / waive: deduct interest only for now",
    style: {
      display: "block",
      marginTop: 3,
      background: p.interest_only ? t.warnSoft : "transparent",
      color: p.interest_only ? t.warn : t.textFaint,
      border: `1px solid ${p.interest_only ? t.warn : t.border}`,
      borderRadius: 6,
      fontSize: 9,
      fontWeight: 700,
      padding: "1px 5px",
      cursor: busy ? "default" : "pointer"
    }
  }, p.interest_only ? "● interest only — resume" : "○ set interest only") : p.interest_only ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.warn,
      fontSize: 9,
      fontWeight: 700
    }
  }, "interest only") : null), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      color: t.text,
      fontSize: 12.5,
      fontWeight: 700,
      whiteSpace: "nowrap"
    }
  }, peso(p.weekly_payment != null ? p.weekly_payment : wkPayment(p))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      ...cellTxt,
      whiteSpace: "nowrap"
    }
  }, p.start_date || /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint
    }
  }, "immediately")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      color: done(p) ? t.good : t.textMuted,
      fontSize: 12.5,
      fontWeight: done(p) ? 700 : 400,
      whiteSpace: "nowrap"
    }
  }, (p.terms_done || 0) + " / " + p.terms_total, done(p) ? " ✓" : ""), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      color: t.text,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, p.remaining_balance != null ? peso(p.remaining_balance) : peso((Number(p.total_amount) || 0) - (Number(p.paid) || 0))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px"
    }
  }, p.active ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.good,
      fontWeight: 700,
      fontSize: 12
    }
  }, "Yes") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "No")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 6px",
      whiteSpace: "nowrap"
    }
  }, officer && /*#__PURE__*/React.createElement("button", {
    onClick: () => startEdit(p),
    style: btn(t.violet + "22", t.violet)
  }, "Edit"), officer && p.active ? /*#__PURE__*/React.createElement("button", {
    onClick: () => delRow(p),
    style: btn(t.badSoft || "#3a1620", t.bad)
  }, "Delete") : null)))), newRows.map(row => /*#__PURE__*/React.createElement("tr", {
    key: row._tmp,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`,
      background: (t.accentSoft || "") + "20"
    }
  }, editForm(row, (k, v) => setNew(row._tmp, k, v), () => saveNew(row), () => cancelNew(row._tmp), true)))))), officer && /*#__PURE__*/React.createElement("button", {
    onClick: addRow,
    className: "inline-flex items-center gap-1.5 rounded-xl mt-3",
    style: {
      background: t.accentSoft,
      color: t.accent,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "Add loan"))));
}

/* ================= PAYROLL OFFICER PAGE ================= */
function PayrollPage({
  t
}) {
  const [pr, setPr] = useState(PR);
  const [selId, setSelId] = useState(PR.periods[0] && PR.periods[0].id || null);
  const [grid, setGrid] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showRoster, setShowRoster] = useState(false);
  const [gq, setGq] = useState("");
  const [gsize, setGsize] = useState(10);
  const [gpage, setGpage] = useState(0);
  const [flash, setFlash] = useState("");
  const [warn, setWarn] = useState("");
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState(null);
  const [replyFor, setReplyFor] = useState(null);
  const [replyText, setReplyText] = useState("");
  const flashMsg = m => {
    setFlash(m);
    setTimeout(() => setFlash(""), 2800);
  };
  const warnMsg = m => {
    setWarn(m);
    setTimeout(() => setWarn(""), 3200);
  };
  const reload = async () => {
    await loadPayrollData();
    setPr({
      ...PR
    });
  };
  useEffect(() => {
    (async () => {
      await reload();
      if (!selId && PR.periods[0]) setSelId(PR.periods[0].id);
    })();
  }, []);
  const period = pr.periods.find(p => p.id === selId) || null;
  // Same test the status chip already renders (app.jsx:4757). The real freeze is in
  // _supaSaveItems; this only stops the officer typing into a week that cannot be saved.
  const locked = !!period && period.status === "locked";
  // Who may unlock. Same gate as every other owner-only action (app.jsx:277/3293/6765), and
  // like those it decides what renders, not what is permitted — see _supaUnlock.
  const isOwner = !!ME && ME.role === "owner";
  // Who may publish. ME.role, deliberately, and NOT can("payroll"): can() is also true for anyone
  // granted payroll access in Settings (app.jsx:265), while the RLS policy behind Publish reads
  // erp_users.role. Gating on can() would render the button for a granted admin and hand them a
  // 42501 — a button that is always there and never works. Same question as the policy asks.
  const isPayroll = !!ME && ME.role === "payroll";
  const empMap = useMemo(() => {
    const m = {};
    pr.employees.forEach(e => {
      m[e.id] = e;
    });
    return m;
  }, [pr]);
  const schedMap = useMemo(() => {
    const m = {};
    (pr.schedules || []).forEach(s => {
      m[s.id] = s;
    });
    return m;
  }, [pr]);
  const leaveTypes = pr.leaveTypes || [];
  const leaveMap = useMemo(() => {
    const m = {};
    leaveTypes.forEach(l => {
      m[l.id] = l;
    });
    return m;
  }, [pr]);
  useEffect(() => {
    if (!period) {
      setGrid([]);
      return;
    }
    const ids = new Set(pr.employees.filter(e => e.active).map(e => e.id));
    const items = pr.items.filter(i => i.period_id === selId);
    items.forEach(i => ids.add(i.employee_id));
    const byEmp = {};
    items.forEach(i => {
      byEmp[i.employee_id] = i;
    });
    const rows = [...ids].map(eid => {
      const e = empMap[eid] || {};
      const it = byEmp[eid];
      const sched = schedMap[e.schedule_id] || {
        sunday_is_restday: 1,
        working_days_count: 6
      };
      const wdTotal = it && it.snap_working_days != null ? it.snap_working_days : sched.working_days_count;
      // Working days defaults to the full schedule (6) unless the officer has entered real attendance.
      const placeholder = it && prNum(it.att_present) === 0 && prNum(it.att_absent) === 0 && prNum(it.gross) === 0;
      const worked = !it || placeholder ? wdTotal : prNum(it.att_present);
      const awop = Math.max(0, Math.round((wdTotal - worked) * 10) / 10);
      return {
        employee_id: eid,
        full_name: e.full_name || "?",
        position: e.position || "",
        schedule_id: e.schedule_id || 1,
        day_off: e.day_off || (Number(e.schedule_id) === 2 ? "sat" : "sun"),
        _sunday_rest: it && it.snap_sunday_rest != null ? it.snap_sunday_rest : sched.sunday_is_restday,
        _working_days: wdTotal,
        snap_sunday_rest: it ? it.snap_sunday_rest : null,
        snap_working_days: it ? it.snap_working_days : null,
        per_day: it ? it.per_day : e.per_day || 0,
        att_present: worked,
        att_absent: awop,
        att_leave: 0,
        att_halfday: 0,
        leave_type_id: "",
        leave_paid: 0,
        ot_hours: it ? it.ot_hours : 0,
        sun_days: it ? it.sun_days : 0,
        add_incentive: it ? it.add_incentive : 0,
        ded_loan: it ? it.ded_loan : 0,
        ded_uniform: it ? it.ded_uniform : 0,
        ded_gov: it ? it.ded_gov : 0,
        ded_manual: it ? it.ded_manual : 0,
        ded_manual_note: it ? it.ded_manual_note || "" : "",
        remarks: it ? it.remarks || "" : "",
        ded_notes: it ? it.ded_notes || "" : "",
        _id: it ? it.id : null,
        _status: it ? it.status : null,
        _emp_remark: it ? it.employee_remark || "" : "",
        _reply: it ? it.officer_reply || "" : "",
        _print_req: it ? it.print_requested : 0,
        _printed: it ? it.printed : 0,
        _approved_at: it ? it.approved_at : null
      };
    }).sort((a, b) => a.full_name.localeCompare(b.full_name));
    setGrid(rows);
  }, [selId, pr, period, empMap, schedMap]);
  useEffect(() => {
    (async () => {
      if (!selId) {
        setSummary(null);
        return;
      }
      try {
        const r = await API("pr_summary", {
          period_id: selId
        });
        if (r && r.ok) setSummary(r.summary);else setSummary(null);
      } catch (e) {
        setSummary(null);
      }
    })();
  }, [selId, pr]);

  // The three grid mutators all refuse when the week is locked. The inputs are disabled too,
  // but gating here means a control that gets added later and forgets `disabled` still cannot
  // dirty a frozen week.
  const setCell = (eid, k, v) => !locked && setGrid(g => g.map(r => {
    if (r.employee_id !== eid) return r;
    const total = r._working_days != null ? prNum(r._working_days) : 6; // scheduled working days (6)
    const restday = prSundayRest(r); // schedule A = has Sunday duty
    if (k === "att_present") {
      const val = prNum(v);
      if (val > total + 1e-9) {
        warnMsg("Not allowed — maximum " + total + " working days.");
        return r;
      }
      const awop = Math.max(0, Math.round((total - val) * 10) / 10);
      return {
        ...r,
        att_present: v,
        att_absent: awop
      };
    }
    if (k === "sun_days") {
      if (prNum(v) > 1 + 1e-9) {
        warnMsg("Not allowed — only one Sunday per week (max 1).");
        return r;
      }
      return {
        ...r,
        sun_days: v
      };
    }
    return {
      ...r,
      [k]: v
    };
  }));
  const setDayOff = (eid, val) => {
    if (locked || !(isOwner || isPayroll)) return; // same gate the DB check enforces (app.jsx:_supaSetDayoff)
    setGrid(g => g.map(r => r.employee_id === eid ? {
      ...r,
      day_off: val
    } : r));
    API("pr_set_dayoff", {
      employee_id: eid,
      day_off: val
    }).catch(() => {});
  };
  const removeRow = eid => !locked && setGrid(g => g.filter(r => r.employee_id !== eid));
  const totals = grid.reduce((a, r) => {
    const c = prCalc(r);
    a.gross += c.gross;
    a.net += c.net;
    a.ded += c.ded;
    a.ot += c.ot;
    a.sunday += c.sunday;
    a.incent += c.incent;
    a.missing += prMissingAtt(r) ? 1 : 0;
    return a;
  }, {
    gross: 0,
    net: 0,
    ded: 0,
    ot: 0,
    sunday: 0,
    incent: 0,
    missing: 0
  });
  const saveGrid = async () => {
    if (!period) return false;
    setBusy(true);
    const items = grid.map(r => ({
      employee_id: r.employee_id,
      per_day: prNum(r.per_day),
      att_present: prNum(r.att_present),
      att_absent: prNum(r.att_absent),
      att_leave: 0,
      att_halfday: 0,
      leave_type_id: null,
      ot_hours: prNum(r.ot_hours),
      sun_days: prNum(r.sun_days),
      add_incentive: prNum(r.add_incentive),
      ded_manual: prNum(r.ded_manual),
      ded_manual_note: r.ded_manual_note || "",
      remarks: r.remarks
    }));
    try {
      await prWrite("pr_save_items", {
        period_id: selId,
        items,
        keep_ids: grid.map(r => r.employee_id)
      });
      await reload();
      flashMsg("Saved \u2713");
      setBusy(false);
      return true;
    } catch (e) {
      setBusy(false);
      alert("Could not save this week:\n\n" + e.message);
      return false;
    }
  };
  const publish = async () => {
    if (!window.confirm("Publish this week and notify employees? They'll be able to review and approve their payslip.")) return;
    if (!(await saveGrid())) return;
    try {
      await prWrite("pr_publish", {
        id: selId
      });
      await reload();
      flashMsg("Published — employees notified");
    } catch (e) {
      alert(e.message);
    }
  };
  const lockWeek = async () => {
    if (!window.confirm("Lock this week as final?")) return;
    try {
      await prWrite("pr_lock", {
        id: selId
      });
      await reload();
      flashMsg("Week locked");
    } catch (e) {
      alert(e.message);
    }
  };
  // Superadmin only, and only ever back to Published — see _supaUnlock for why not Draft.
  const unlockWeek = async () => {
    if (!window.confirm("Unlock this week so it can be edited again? It goes back to Published.")) return;
    try {
      await prWrite("pr_unlock", {
        id: selId
      });
      await reload();
      flashMsg("Week unlocked — editable again");
    } catch (e) {
      alert(e.message);
    }
  };
  const delPeriod = async () => {
    if (!period || !window.confirm(`Delete “${period.label}” and all its lines? This cannot be undone.`)) return;
    try {
      await prWrite("pr_delete_period", {
        id: selId
      });
      setSelId(null);
      await reload();
      flashMsg("Week deleted");
    } catch (e) {
      alert(e.message);
    }
  };
  const sendReply = async itemId => {
    try {
      await prWrite("pr_item_reply", {
        id: itemId,
        reply: replyText
      });
      setReplyFor(null);
      setReplyText("");
      await reload();
      flashMsg("Reply sent — line reset to pending for re-approval");
    } catch (e) {
      alert(e.message);
    }
  };
  // The officer approving on an employee's behalf. Worth a confirm the other row actions don't
  // get: it spends the employee's say-so for them, and _prReviewGate then refuses to let anyone
  // undo it — an approved line only reopens through Reply / resolve.
  const approveRow = async itemId => {
    if (!window.confirm("Approve this line on the employee's behalf? They will not be asked to review it, and this cannot be undone here.")) return;
    try {
      await prWrite("pr_item_approve", {
        id: itemId
      });
      await reload();
      flashMsg("Line approved");
    } catch (e) {
      alert(e.message);
    }
  };
  const markPrinted = async itemId => {
    try {
      await prWrite("pr_mark_printed", {
        id: itemId
      });
      await reload();
      flashMsg("Marked as printed");
    } catch (e) {
      alert(e.message);
    }
  };
  const applyPlans = async () => {
    if (!period) return;
    if (!window.confirm("Auto-fill this week's Coop / T-shirt / Cash advance / Fines from each employee's installment plans?")) return;
    if (!(await saveGrid())) return;
    try {
      await prWrite("pr_apply_plans", {
        period_id: selId
      });
      await reload();
      flashMsg("Installment plans applied and labelled");
    } catch (e) {
      alert(e.message);
    }
  };
  const downloadPayroll = () => {
    if (!period) return;
    const label = period.label || "period";
    const rep = {
      title: "Payroll — " + label,
      file: "payroll_" + label.replace(/[^A-Za-z0-9]+/g, "_"),
      columns: ["Employee", "Position", "Rate/day", "Days", "OT hrs", "Regular", "OT", "Sunday", "Incentive", "Gross", "Loan", "Uniform", "Gov't", "Manual", "Net", "Status"],
      money: [2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      rows: grid.map(r => {
        const c = prCalc(r);
        return [r.full_name || "", r.position || "", prNum(r.per_day), prPaidDays(r), prNum(r.ot_hours), c.regular, c.ot, c.sunday, c.incent, c.gross, Math.round(prNum(r.ded_loan)), Math.round(prNum(r.ded_uniform)), Math.round(prNum(r.ded_gov)), Math.round(prNum(r.ded_manual)), c.net, r.status || ""];
      })
    };
    astExportExcel(rep).catch(() => astExportPrint(rep));
  };
  const cellInp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 7,
    padding: "5px 6px",
    fontSize: 12,
    outline: "none",
    textAlign: "right"
  };
  const th = {
    padding: "7px 6px",
    fontWeight: 700,
    borderBottom: `1px solid ${t.border}`,
    whiteSpace: "nowrap",
    fontSize: 10
  };
  const attention = grid.filter(r => r._status === "contested" || r._print_req && !r._printed);
  // The officer's per-row Approve renders on exactly the conditions _prReviewGate enforces, so
  // the control is never offered where the write would be refused. The row's own 'pending' test
  // is applied per row at the call site.
  const canOfficerApprove = !!period && period.status === "published" && (isOwner || isPayroll);
  // Who may Mark printed. Owner always; payroll only while the week is not locked — the same line
  // RLS Piece A draws, so payroll never sees a button that would come back 42501 (_supaMarkPrinted).
  const canMarkPrinted = !!period && (isOwner || isPayroll && !locked);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.goodSoft || t.accentSoft,
      color: t.good,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, flash), warn && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.badSoft || "#3a1620",
      color: t.bad,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 700,
      border: `1px solid ${t.bad}33`
    }
  }, warn), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Wallet
    }, "weekly payroll")
  }, "Payroll"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, canAdd("payroll") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRoster(true),
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(Users, {
    size: 15
  }), "Rates & schedules"), (isOwner || isPayroll) && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      type: "period",
      period: null
    }),
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "New week"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap",
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: selId || "",
    onChange: e => setSelId(Number(e.target.value) || null),
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "8px 11px",
      fontSize: 13,
      outline: "none",
      minWidth: 200
    }
  }, pr.periods.length === 0 && /*#__PURE__*/React.createElement("option", {
    value: "",
    style: {
      background: t.surface,
      color: t.text
    }
  }, "No weeks yet \u2014 add one"), pr.periods.map(p => /*#__PURE__*/React.createElement("option", {
    key: p.id,
    value: p.id,
    style: {
      background: t.surface,
      color: t.text
    }
  }, p.label, p.status !== "draft" ? "  · " + p.status : ""))), period && /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center rounded-full",
    style: {
      background: period.status === "draft" ? t.warnSoft : period.status === "locked" ? t.borderSoft : t.goodSoft,
      color: period.status === "draft" ? t.warn : period.status === "locked" ? t.textMuted : t.good,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px"
    }
  }, period.status === "draft" ? "Draft" : period.status === "locked" ? "Locked" : "Published"), period && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      type: "period",
      period
    }),
    title: "Edit week",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 15
  })), period && /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal({
      type: "period",
      period
    }),
    title: "Edit this week's label / pay date / notes",
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.violet + "22",
      color: t.violet,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 14
  }), "Edit week"), period && (isOwner || isPayroll) && /*#__PURE__*/React.createElement("button", {
    onClick: delPeriod,
    title: "Delete week",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  })), period && period.status !== "locked" && /*#__PURE__*/React.createElement("button", {
    onClick: applyPlans,
    title: "Auto-fill installment deductions from plans",
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.violet + "22",
      color: t.violet,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(PiggyBank, {
    size: 15
  }), "Apply plans"), period && /*#__PURE__*/React.createElement("button", {
    onClick: downloadPayroll,
    title: "Download this period's payroll (Excel)",
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 13px"
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), /*#__PURE__*/React.createElement("span", {
    className: "flex-1"
  }), period && period.status === "draft" && (isOwner || isPayroll) && /*#__PURE__*/React.createElement("button", {
    onClick: publish,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.good,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 14px"
    }
  }, /*#__PURE__*/React.createElement(Send, {
    size: 15
  }), "Publish & notify"), period && period.status === "published" && (isOwner || isPayroll) && /*#__PURE__*/React.createElement("button", {
    onClick: lockWeek,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 14px"
    }
  }, "Lock week"), period && locked && isOwner && /*#__PURE__*/React.createElement("button", {
    onClick: unlockWeek,
    title: "Superadmin only \u2014 reopens this week for editing",
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: t.warnSoft,
      color: t.warn,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 14px"
    }
  }, "Unlock week"))), period && attention.length > 0 && /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18,
      border: `1px solid ${t.bad}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: AlertTriangle
    }, attention.length, " to handle")
  }, "Needs your attention"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, attention.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.employee_id,
    style: {
      background: t.surface2,
      borderRadius: 12,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 13
    }
  }, r.full_name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontWeight: 500
    }
  }, "\xB7 ", peso(prCalc(r).net), " net")), r._status === "contested" && /*#__PURE__*/React.createElement(PrStatusChip, {
    t: t,
    status: "contested"
  }), r._print_req && !r._printed ? /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center rounded-full",
    style: {
      background: t.accentSoft,
      color: t.accent,
      fontSize: 10.5,
      fontWeight: 700,
      padding: "2px 9px"
    }
  }, "Hard copy requested") : null), r._status === "contested" && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.bad
    }
  }, "Employee note:"), " ", r._emp_remark), r._reply && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.good
    }
  }, "Your reply:"), " ", r._reply), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap",
    style: {
      marginTop: 8
    }
  }, (isOwner || isPayroll) && r._status === "contested" && replyFor !== r._id && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setReplyFor(r._id);
      setReplyText(r._reply || "");
    },
    className: "rounded-lg",
    style: {
      background: t.accentSoft,
      color: t.accent,
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      padding: "6px 12px"
    }
  }, "Reply / resolve"), r._print_req && !r._printed ? /*#__PURE__*/React.createElement("button", {
    onClick: () => printPayslip(r.full_name, r.position, period, r),
    className: "inline-flex items-center gap-1 rounded-lg",
    style: {
      background: t.surface,
      color: t.text,
      border: `1px solid ${t.border}`,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      padding: "6px 12px"
    }
  }, /*#__PURE__*/React.createElement(IconPrint, {
    size: 14
  }), "Print") : null, r._print_req && !r._printed && canMarkPrinted ? /*#__PURE__*/React.createElement("button", {
    onClick: () => markPrinted(r._id),
    className: "rounded-lg",
    style: {
      background: t.goodSoft,
      color: t.good,
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      padding: "6px 12px"
    }
  }, "Mark printed") : null), (isOwner || isPayroll) && replyFor === r._id && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: replyText,
    onChange: e => setReplyText(e.target.value),
    placeholder: "Explain / confirm the fix\u2026",
    style: {
      flex: 1,
      background: t.surface,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "7px 10px",
      fontSize: 12.5,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => sendReply(r._id),
    className: "rounded-lg",
    style: {
      background: t.good,
      color: "#04222A",
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      padding: "7px 12px"
    }
  }, "Send"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setReplyFor(null),
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      fontSize: 12
    }
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginTop: 6
    }
  }, "Tip: edit the numbers in the table below and press ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "Save"), " \u2014 a changed line automatically returns to \u201Cawaiting review\u201D."))))), period && summary ? /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Banknote
    }, period.label)
  }, "Payroll summary"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5",
    style: {
      marginTop: 12
    }
  }, [["Employees paid", summary.employees_paid, t.text], ["Total gross", peso(summary.total_gross), t.text], ["Total net", peso(summary.total_net), t.good], ["Total OT pay", peso(summary.total_ot), t.text], ["Total Sunday duty", peso(summary.total_sunday), t.text], ["Total incentives", peso(summary.total_incentive), t.text], ["Loan deductions", peso(summary.total_loan), t.text], ["Uniform deductions", peso(summary.total_uniform), t.text], ["Government deductions", peso(summary.total_gov), t.text], ["Outstanding loan balance", peso(summary.outstanding_loan_balance), t.violet], ["Employees w/ active loans", summary.employees_with_active_loans, t.text], ["Missing attendance", summary.missing_attendance, summary.missing_attendance > 0 ? t.bad : t.good]].map(([label, val, col], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: "11px 13px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10.5,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      fontWeight: 700
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      color: col,
      fontSize: 17,
      fontWeight: 800,
      marginTop: 3
    }
  }, val)))), summary.total_gov === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      marginTop: 10
    }
  }, "Government deductions are wired but zero \u2014 add SSS / PhilHealth / Pag-IBIG plans (category \u201CGovernment\u201D) in Loans when you have the amounts.") : null) : null, period ? /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: Banknote
    }, grid.length, " employees \xB7 ", peso(totals.net), " net", totals.missing > 0 ? " · " + totals.missing + " missing att." : "")
  }, period.label), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm("Save this week's payroll entries?")) saveGrid();
    },
    disabled: busy || locked,
    title: locked ? "This week is locked — unlock required to edit." : undefined,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      background: locked ? t.surface2 : t.good,
      color: locked ? t.textFaint : "#04222A",
      border: locked ? `1px solid ${t.border}` : "none",
      cursor: busy || locked ? "default" : "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "8px 16px",
      opacity: busy ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 15
  }), busy ? "Saving…" : "Save")), locked && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      marginTop: 10,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      fontSize: 12.5,
      fontWeight: 600,
      padding: "8px 12px"
    }
  }, "Locked \u2014 unlock required to edit."), (() => {
    const fg = grid.filter(r => r.full_name.toLowerCase().includes(gq.trim().toLowerCase()));
    const gpg = prPaginate(fg, gsize, gpage);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(EntriesBar, {
      t: t,
      size: gsize,
      setSize: setGsize,
      total: gpg.total,
      from: gpg.from,
      to: gpg.to,
      page: gpg.page,
      setPage: setGpage,
      pages: gpg.pages,
      right: /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2",
        style: {
          background: t.surface2,
          border: `1px solid ${t.border}`,
          borderRadius: 10,
          padding: "6px 10px",
          minWidth: 200
        }
      }, /*#__PURE__*/React.createElement(Search, {
        size: 14,
        color: t.textFaint
      }), /*#__PURE__*/React.createElement("input", {
        value: gq,
        onChange: e => {
          setGq(e.target.value);
          setGpage(0);
        },
        placeholder: "Search employee\u2026",
        className: "bg-transparent outline-none",
        style: {
          color: t.text,
          fontSize: 12.5,
          width: "100%"
        }
      }))
    }), /*#__PURE__*/React.createElement("div", {
      className: "tt-desk",
      style: {
        overflowX: "auto"
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: 1140
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        color: t.textFaint,
        textTransform: "uppercase",
        letterSpacing: "0.04em"
      }
    }, /*#__PURE__*/React.createElement("th", {
      style: {
        ...th,
        textAlign: "left"
      }
    }, "Employee"), /*#__PURE__*/React.createElement("th", {
      style: th,
      title: "Days actually worked \u2014 defaults to 6, edit if absent"
    }, "Working days"), /*#__PURE__*/React.createElement("th", {
      style: th,
      title: "Absent Without Pay \u2014 auto = working-days total \u2212 working days"
    }, "AWOP"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Rate"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "OT hrs"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Day Off"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Incentive"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Manual ded"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Gross"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Deductions"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Net"), /*#__PURE__*/React.createElement("th", {
      style: {
        ...th,
        textAlign: "left"
      }
    }, "Status"), /*#__PURE__*/React.createElement("th", {
      style: th
    }))), /*#__PURE__*/React.createElement("tbody", null, gpg.total === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      colSpan: 13,
      style: {
        padding: "16px",
        textAlign: "center",
        color: t.textFaint,
        fontSize: 12.5
      }
    }, gq ? "No employees match your search." : "No employees yet. Add them in Settings → Users and tick “Include in weekly payroll”.")), gpg.slice.map(r => {
      const c = prCalc(r);
      const restday = prSundayRest(r);
      const wdTotal = prWorkingDays(r);
      const awop = prNum(r.att_absent);
      return /*#__PURE__*/React.createElement("tr", {
        key: r.employee_id,
        style: {
          borderBottom: `1px solid ${t.borderSoft}`
        }
      }, /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          whiteSpace: "nowrap"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.text,
          fontSize: 12,
          fontWeight: 600
        }
      }, r.full_name, /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 6,
          padding: "0 6px",
          borderRadius: 999,
          fontSize: 9.5,
          fontWeight: 800,
          background: restday ? t.accentSoft : t.violet + "22",
          color: restday ? t.accent : t.violet
        }
      }, restday ? "A" : "B")), /*#__PURE__*/React.createElement("div", {
        style: {
          color: awop > 0 ? t.warn || t.bad : t.textFaint,
          fontSize: 9.5,
          fontWeight: awop > 0 ? 700 : 400
        }
      }, "attendance ", prNum(r.att_present), "/", wdTotal, awop > 0 ? " · AWOP " + awop : "")), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "4px 5px"
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        step: "0.5",
        min: "0",
        max: "7",
        value: r.att_present,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "att_present", e.target.value),
        style: {
          ...cellInp,
          width: 54
        },
        title: "Days worked (default 6; a 7th day = 1 Sunday duty)"
      })), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          textAlign: "right",
          color: awop > 0 ? t.warn || t.bad : t.textFaint,
          fontSize: 12,
          fontWeight: awop > 0 ? 700 : 400
        }
      }, awop), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          textAlign: "right",
          color: t.textMuted,
          fontSize: 12
        }
      }, Math.round(prNum(r.per_day)).toLocaleString("en-PH")), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "4px 5px"
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        value: r.ot_hours,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "ot_hours", e.target.value),
        style: {
          ...cellInp,
          width: 46
        }
      }), prNum(r.ot_hours) > 0 ? /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textFaint,
          fontSize: 9.5,
          textAlign: "right"
        }
      }, "\u20B1", Math.round(prOtPay(r))) : null), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "4px 5px"
        }
      }, /*#__PURE__*/React.createElement("select", {
        value: r.day_off || "sun",
        disabled: locked || !(isOwner || isPayroll),
        onChange: e => setDayOff(r.employee_id, e.target.value),
        style: {
          ...cellInp,
          width: 92,
          cursor: locked ? "default" : "pointer"
        },
        title: "Which day is this employee's day off"
      }, /*#__PURE__*/React.createElement("option", {
        value: "sun",
        style: {
          background: t.surface,
          color: t.text
        }
      }, "Sun Day Off"), /*#__PURE__*/React.createElement("option", {
        value: "sat",
        style: {
          background: t.surface,
          color: t.text
        }
      }, "Sat Day Off"))), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "4px 5px"
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        value: r.add_incentive,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "add_incentive", e.target.value),
        style: {
          ...cellInp,
          width: 60
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "4px 5px"
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        value: r.ded_manual,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "ded_manual", e.target.value),
        style: {
          ...cellInp,
          width: 60
        }
      }), prNum(r.ded_manual) > 0 ? /*#__PURE__*/React.createElement("input", {
        value: r.ded_manual_note,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "ded_manual_note", e.target.value),
        placeholder: "note",
        style: {
          ...cellInp,
          width: 60,
          textAlign: "left",
          fontSize: 10,
          marginTop: 2
        }
      }) : null), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          textAlign: "right",
          color: t.textMuted,
          fontSize: 12,
          fontWeight: 600
        }
      }, Math.round(c.gross).toLocaleString("en-PH")), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textMuted,
          fontSize: 12,
          fontWeight: 600
        }
      }, Math.round(c.ded).toLocaleString("en-PH"))), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          textAlign: "right",
          color: t.good,
          fontSize: 12.5,
          fontWeight: 800
        }
      }, Math.round(c.net).toLocaleString("en-PH")), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px"
        }
      }, r._status ? /*#__PURE__*/React.createElement(PrStatusChip, {
        t: t,
        status: r._status
      }) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.textFaint,
          fontSize: 11
        }
      }, "\u2014")), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "5px 6px",
          whiteSpace: "nowrap"
        }
      }, r._id && r._status === "pending" && canOfficerApprove && /*#__PURE__*/React.createElement("button", {
        onClick: () => approveRow(r._id),
        title: `Approve ${r.full_name}'s line on their behalf`,
        className: "rounded-lg",
        style: {
          background: t.goodSoft,
          color: t.good,
          border: "none",
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 8px",
          marginRight: 6
        }
      }, "Approve"), r._id && /*#__PURE__*/React.createElement("button", {
        onClick: () => downloadPayslipXLS(r.full_name, r.position, period, r),
        title: "Download payslip",
        style: {
          background: "transparent",
          border: "none",
          color: t.textMuted,
          cursor: "pointer",
          padding: 2,
          marginRight: 4
        }
      }, /*#__PURE__*/React.createElement(IconDownload, {
        size: 15
      })), r._id && /*#__PURE__*/React.createElement("button", {
        onClick: () => printPayslip(r.full_name, r.position, period, r),
        title: "Print payslip",
        style: {
          background: "transparent",
          border: "none",
          color: t.textMuted,
          cursor: "pointer",
          padding: 2,
          marginRight: 4
        }
      }, /*#__PURE__*/React.createElement(IconPrint, {
        size: 15
      })), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          if (window.confirm(`Remove ${r.full_name} from this week?`)) removeRow(r.employee_id);
        },
        disabled: locked,
        title: locked ? "This week is locked" : "Remove from this week",
        style: {
          background: "transparent",
          border: "none",
          color: locked ? t.textFaint : t.bad,
          cursor: locked ? "default" : "pointer",
          padding: 2,
          opacity: locked ? 0.5 : 1
        }
      }, /*#__PURE__*/React.createElement(IconX, {
        size: 15
      }))));
    })), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        borderTop: `2px solid ${t.border}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        color: t.text,
        fontWeight: 800,
        fontSize: 12
      }
    }, "TOTAL"), /*#__PURE__*/React.createElement("td", {
      colSpan: 7
    }), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        textAlign: "right",
        color: t.textMuted,
        fontWeight: 800,
        fontSize: 12
      }
    }, Math.round(totals.gross).toLocaleString("en-PH")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        textAlign: "right",
        color: t.textMuted,
        fontWeight: 800,
        fontSize: 12
      }
    }, Math.round(totals.ded).toLocaleString("en-PH")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 6px",
        textAlign: "right",
        color: t.good,
        fontWeight: 800,
        fontSize: 13
      }
    }, Math.round(totals.net).toLocaleString("en-PH")), /*#__PURE__*/React.createElement("td", {
      colSpan: 2
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "tt-mob",
      style: {
        flexDirection: "column",
        gap: 12,
        marginTop: 10
      }
    }, gpg.total === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px",
        textAlign: "center",
        color: t.textFaint,
        fontSize: 12.5
      }
    }, gq ? "No employees match your search." : "No employees yet."), gpg.slice.map(r => {
      const c = prCalc(r);
      const restday = prSundayRest(r);
      const wdTotal = prWorkingDays(r);
      const awop = prNum(r.att_absent);
      return /*#__PURE__*/React.createElement("div", {
        key: "m" + r.employee_id,
        style: {
          background: t.surface2,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          padding: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.text,
          fontWeight: 700,
          fontSize: 15
        }
      }, r.full_name, /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 6,
          padding: "0 6px",
          borderRadius: 999,
          fontSize: 9.5,
          fontWeight: 800,
          background: restday ? t.accentSoft : t.violet + "22",
          color: restday ? t.accent : t.violet
        }
      }, restday ? "A" : "B")), /*#__PURE__*/React.createElement("div", {
        style: {
          color: awop > 0 ? t.warn || t.bad : t.textFaint,
          fontSize: 11,
          fontWeight: awop > 0 ? 700 : 400
        }
      }, "attendance ", prNum(r.att_present), "/", wdTotal, awop > 0 ? " · AWOP " + awop : "", " \xB7 \u20B1", Math.round(prNum(r.per_day)).toLocaleString("en-PH"), "/day")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0
        }
      }, r._id && r._status === "pending" && canOfficerApprove && /*#__PURE__*/React.createElement("button", {
        onClick: () => approveRow(r._id),
        className: "rounded-lg",
        style: {
          background: t.goodSoft,
          color: t.good,
          border: "none",
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 8px"
        }
      }, "Approve"), r._status ? /*#__PURE__*/React.createElement(PrStatusChip, {
        t: t,
        status: r._status
      }) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.textFaint,
          fontSize: 11
        }
      }, "\u2014"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginTop: 12,
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.surface,
          borderRadius: 10,
          padding: "8px 4px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textFaint,
          fontSize: 10
        }
      }, "GROSS"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.text,
          fontWeight: 700,
          fontSize: 14
        }
      }, Math.round(c.gross).toLocaleString("en-PH"))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.surface,
          borderRadius: 10,
          padding: "8px 4px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textFaint,
          fontSize: 10
        }
      }, "DED"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textMuted,
          fontWeight: 700,
          fontSize: 14
        }
      }, Math.round(c.ded).toLocaleString("en-PH"))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.surface,
          borderRadius: 10,
          padding: "8px 4px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.textFaint,
          fontSize: 10
        }
      }, "NET"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: t.good,
          fontWeight: 800,
          fontSize: 15
        }
      }, Math.round(c.net).toLocaleString("en-PH")))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 12
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "Working days", /*#__PURE__*/React.createElement("input", {
        type: "number",
        step: "0.5",
        min: "0",
        max: "7",
        value: r.att_present,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "att_present", e.target.value),
        style: {
          ...cellInp,
          width: "100%",
          marginTop: 3
        }
      })), /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "OT hrs", /*#__PURE__*/React.createElement("input", {
        type: "number",
        value: r.ot_hours,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "ot_hours", e.target.value),
        style: {
          ...cellInp,
          width: "100%",
          marginTop: 3
        }
      })), /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "Day off", /*#__PURE__*/React.createElement("select", {
        value: r.day_off || "sun",
        disabled: locked || !(isOwner || isPayroll),
        onChange: e => setDayOff(r.employee_id, e.target.value),
        style: {
          ...cellInp,
          width: "100%",
          marginTop: 3,
          cursor: locked ? "default" : "pointer"
        }
      }, /*#__PURE__*/React.createElement("option", {
        value: "sun",
        style: {
          background: t.surface,
          color: t.text
        }
      }, "Sun Day Off"), /*#__PURE__*/React.createElement("option", {
        value: "sat",
        style: {
          background: t.surface,
          color: t.text
        }
      }, "Sat Day Off"))), /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 11,
          color: t.textFaint
        }
      }, "Incentive", /*#__PURE__*/React.createElement("input", {
        type: "number",
        value: r.add_incentive,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "add_incentive", e.target.value),
        style: {
          ...cellInp,
          width: "100%",
          marginTop: 3
        }
      })), /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 11,
          color: t.textFaint,
          gridColumn: "1 / -1"
        }
      }, "Manual deduction", /*#__PURE__*/React.createElement("input", {
        type: "number",
        value: r.ded_manual,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "ded_manual", e.target.value),
        style: {
          ...cellInp,
          width: "100%",
          marginTop: 3
        }
      }), prNum(r.ded_manual) > 0 ? /*#__PURE__*/React.createElement("input", {
        value: r.ded_manual_note,
        disabled: locked,
        onChange: e => setCell(r.employee_id, "ded_manual_note", e.target.value),
        placeholder: "note",
        style: {
          ...cellInp,
          width: "100%",
          textAlign: "left",
          fontSize: 11,
          marginTop: 4
        }
      }) : null)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          gap: 4,
          marginTop: 12,
          paddingTop: 10,
          borderTop: `1px solid ${t.borderSoft}`
        }
      }, r._id && /*#__PURE__*/React.createElement("button", {
        onClick: () => downloadPayslipXLS(r.full_name, r.position, period, r),
        title: "Download payslip",
        style: {
          background: "transparent",
          border: "none",
          color: t.textMuted,
          cursor: "pointer",
          padding: 4
        }
      }, /*#__PURE__*/React.createElement(IconDownload, {
        size: 17
      })), r._id && /*#__PURE__*/React.createElement("button", {
        onClick: () => printPayslip(r.full_name, r.position, period, r),
        title: "Print payslip",
        style: {
          background: "transparent",
          border: "none",
          color: t.textMuted,
          cursor: "pointer",
          padding: 4
        }
      }, /*#__PURE__*/React.createElement(IconPrint, {
        size: 17
      })), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          if (window.confirm(`Remove ${r.full_name} from this week?`)) removeRow(r.employee_id);
        },
        disabled: locked,
        title: locked ? "This week is locked" : "Remove from this week",
        style: {
          background: "transparent",
          border: "none",
          color: locked ? t.textFaint : t.bad,
          cursor: locked ? "default" : "pointer",
          padding: 4,
          opacity: locked ? 0.5 : 1
        }
      }, /*#__PURE__*/React.createElement(IconX, {
        size: 17
      }))));
    }), gpg.total > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: "12px 14px",
        fontWeight: 800
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, "TOTAL NET"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.good
      }
    }, "\u20B1", Math.round(totals.net).toLocaleString("en-PH")))), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5,
        marginTop: 8
      }
    }, "Enter ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.textMuted
      }
    }, "Working days"), " (defaults to 6). ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.textMuted
      }
    }, "AWOP"), " = 6 \u2212 working days is computed automatically, and Gross updates as you type. Officer also inputs OT hours, Sunday days (schedule A), incentives and one-time manual deductions. Loan/uniform/government deductions come from ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.textMuted
      }
    }, "Apply plans"), " (one term per week). Rate & schedule are snapshotted per week \u2014 changing them in Settings only affects future weeks."));
  })()) : /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 30,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, "No payroll week selected. Press ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, "New week"), " to start one.")), modal && modal.type === "period" && /*#__PURE__*/React.createElement(PeriodModal, {
    t: t,
    period: modal.period,
    onClose: () => setModal(null),
    onSaved: async id => {
      setModal(null);
      await reload();
      if (id) setSelId(id);
      flashMsg("Saved");
    }
  }), showRoster && /*#__PURE__*/React.createElement(RosterModal, {
    t: t,
    employees: pr.employees,
    users: pr.users,
    schedules: pr.schedules,
    onClose: () => setShowRoster(false),
    onChanged: reload
  }));
}

/* ================= TECHNICIAN SALARY PAGE ================= */
function SalaryPage({
  t
}) {
  const [pr, setPr] = useState(PR);
  const [flash, setFlash] = useState("");
  const [contestFor, setContestFor] = useState(null);
  const [remark, setRemark] = useState("");
  const flashMsg = m => {
    setFlash(m);
    setTimeout(() => setFlash(""), 3000);
  };
  const reload = async () => {
    await loadPayrollData();
    setPr({
      ...PR
    });
  };
  useEffect(() => {
    (async () => {
      await reload();
    })();
  }, []);
  const me = pr.employees[0] || null;
  const linked = !!pr.myEmployeeId || !!ME.pr_employee_id;
  const periodMap = {};
  pr.periods.forEach(p => {
    periodMap[p.id] = p;
  });
  const slips = pr.items.map(it => ({
    it,
    period: periodMap[it.period_id]
  })).filter(x => x.period).sort((a, b) => b.it.period_id - a.it.period_id);
  const pending = slips.filter(s => s.it.status === "pending").length;
  const approve = async id => {
    if (!window.confirm("Approve this payslip? This confirms the amounts are correct.")) return;
    try {
      await prWrite("pr_item_approve", {
        id
      });
      await reload();
      flashMsg("Payslip approved");
    } catch (e) {
      alert(e.message);
    }
  };
  const contest = async id => {
    if (!remark.trim()) {
      alert("Please describe the discrepancy.");
      return;
    }
    try {
      await prWrite("pr_item_contest", {
        id,
        remark
      });
      setContestFor(null);
      setRemark("");
      await reload();
      flashMsg("Sent to the payroll office");
    } catch (e) {
      alert(e.message);
    }
  };
  const requestPrint = async id => {
    try {
      await prWrite("pr_request_print", {
        id
      });
      await reload();
      flashMsg("Hard-copy request sent");
    } catch (e) {
      alert(e.message);
    }
  };
  if (!linked) {
    return /*#__PURE__*/React.createElement(Card, {
      t: t,
      style: {
        padding: 30,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 13
      }
    }, "Your login isn\u2019t linked to a payroll record yet. Ask the office to enable ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.text
      }
    }, "Include in weekly payroll"), " on your account in Settings."));
  }
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: `1px solid ${t.borderSoft}`,
    fontSize: 13
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.goodSoft || t.accentSoft,
      color: t.good,
      padding: "9px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, flash), pending > 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl flex items-center gap-2",
    style: {
      background: t.warnSoft,
      color: t.warn,
      padding: "10px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Bell, {
    size: 15
  }), "You have ", pending, " new payslip", pending > 1 ? "s" : "", " to review."), slips.length === 0 && /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 30,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, "No payslips yet. They\u2019ll appear here once the payroll office publishes your week.")), slips.map(({
    it,
    period
  }) => {
    const c = prCalc(it);
    const name = me && me.full_name || "";
    return /*#__PURE__*/React.createElement(Card, {
      t: t,
      style: {
        padding: 18
      },
      key: it.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between flex-wrap gap-2"
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      t: t,
      right: /*#__PURE__*/React.createElement(PrStatusChip, {
        t: t,
        status: it.status
      })
    }, period.label), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 12
      }
    }, period.pay_date ? "Pay date " + period.pay_date : "")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 460
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Working days (", prWorkingDays(it) - prNum(it.att_present) > 0 ? "AWOP " + Math.round((prWorkingDays(it) - prNum(it.att_present)) * 10) / 10 : "full week", ")"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, prNum(it.att_present), "/", prWorkingDays(it))), /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Paid days \xD7 rate"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, prPaidDays(it), " \xD7 ", peso(it.per_day))), /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Regular"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, peso(c.regular))), prNum(it.ot_hours) > 0 && /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "OT (", prNum(it.ot_hours), " hrs @ ", peso(prNum(it.per_day) / 8 * PR_OT_MULTIPLIER), "/hr)"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, peso(c.ot))), prSundayRest(it) && prNum(it.sun_days) > 0 && /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Sunday duty (", prNum(it.sun_days), " days)"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, peso(c.sunday))), prNum(it.add_incentive) > 0 && /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Incentives"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, peso(it.add_incentive))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...rowStyle,
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, "Gross"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, peso(c.gross))), PR_DEDS.map(([k, l]) => prNum(it[k]) > 0 ? /*#__PURE__*/React.createElement("div", {
      key: k,
      style: rowStyle
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, "Less: ", l), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.bad
      }
    }, "\u2212", peso(it[k]))) : null), it.ded_notes ? /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.violet,
        fontSize: 11.5,
        padding: "4px 0"
      }
    }, "Installments: ", prCleanNotes(it.ded_notes)) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0 2px",
        fontSize: 16,
        fontWeight: 800
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text
      }
    }, "Net salary"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.good
      }
    }, peso(c.net)))), it.employee_remark && /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.surface2,
        borderRadius: 10,
        padding: "9px 12px",
        marginTop: 10,
        fontSize: 12.5,
        color: t.textMuted
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.bad
      }
    }, "You reported:"), " ", it.employee_remark), it.officer_reply && /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.surface2,
        borderRadius: 10,
        padding: "9px 12px",
        marginTop: 8,
        fontSize: 12.5,
        color: t.textMuted
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: t.good
      }
    }, "Payroll office:"), " ", it.officer_reply), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap",
      style: {
        marginTop: 12
      }
    }, it.status === "pending" && period.status === "published" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => approve(it.id),
      className: "inline-flex items-center gap-1.5 rounded-xl",
      style: {
        background: t.good,
        color: "#04222A",
        border: "none",
        cursor: "pointer",
        fontSize: 12.5,
        fontWeight: 700,
        padding: "8px 16px"
      }
    }, /*#__PURE__*/React.createElement(CheckCircle2, {
      size: 15
    }), "Approve"), contestFor !== it.id && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setContestFor(it.id);
        setRemark("");
      },
      className: "inline-flex items-center gap-1.5 rounded-xl",
      style: {
        background: t.badSoft,
        color: t.bad,
        border: "none",
        cursor: "pointer",
        fontSize: 12.5,
        fontWeight: 700,
        padding: "8px 14px"
      }
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 15
    }), "Report a discrepancy")), it.status === "pending" && period.status !== "published" && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement(Clock, {
      size: 14,
      style: {
        display: "inline",
        verticalAlign: "-2px",
        marginRight: 4
      }
    }), "This week isn\u2019t open for review right now."), it.status === "contested" && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement(Clock, {
      size: 14,
      style: {
        display: "inline",
        verticalAlign: "-2px",
        marginRight: 4
      }
    }), "Waiting for the payroll office to review."), it.status === "approved" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.good,
        fontSize: 12.5,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement(CheckCircle2, {
      size: 14,
      style: {
        display: "inline",
        verticalAlign: "-2px",
        marginRight: 4
      }
    }), "Approved", it.approved_at ? " on " + String(it.approved_at).slice(0, 10) : ""), /*#__PURE__*/React.createElement("span", {
      className: "flex-1"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => downloadPayslipXLS(name, me && me.position, period, it),
      className: "inline-flex items-center gap-1.5 rounded-xl",
      style: {
        background: t.surface2,
        color: t.text,
        border: `1px solid ${t.border}`,
        cursor: "pointer",
        fontSize: 12.5,
        fontWeight: 700,
        padding: "8px 13px"
      }
    }, /*#__PURE__*/React.createElement(IconDownload, {
      size: 15
    }), "Download (Excel)"), it.printed ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 12
      }
    }, "Hard copy printed") : it.print_requested ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.accent,
        fontSize: 12,
        fontWeight: 600
      }
    }, "Hard copy requested") : period.status !== "locked" ? /*#__PURE__*/React.createElement("button", {
      onClick: () => requestPrint(it.id),
      className: "inline-flex items-center gap-1.5 rounded-xl",
      style: {
        background: t.accentSoft,
        color: t.accent,
        border: "none",
        cursor: "pointer",
        fontSize: 12.5,
        fontWeight: 700,
        padding: "8px 13px"
      }
    }, /*#__PURE__*/React.createElement(IconPrint, {
      size: 15
    }), "Request hard copy") : null)), contestFor === it.id && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      value: remark,
      onChange: e => setRemark(e.target.value),
      rows: 3,
      placeholder: "Explain what looks wrong \u2014 e.g. \u201CDays present should be 6, not 5\u201D or \u201COT for Sunday 06/28 is missing.\u201D",
      style: {
        width: "100%",
        background: t.surface2,
        color: t.text,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        padding: "9px 11px",
        fontSize: 13,
        outline: "none",
        resize: "vertical"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2",
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => contest(it.id),
      className: "inline-flex items-center gap-1.5 rounded-xl",
      style: {
        background: t.bad,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 12.5,
        fontWeight: 700,
        padding: "8px 14px"
      }
    }, /*#__PURE__*/React.createElement(Send, {
      size: 15
    }), "Send to payroll office"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setContestFor(null),
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        fontSize: 12.5,
        fontWeight: 600
      }
    }, "Cancel"))));
  }));
}

/* ===== AI Assistant · data exports (Excel .xlsx + printable/PDF) ===== */
function astLoadXLSX() {
  return new Promise((resolve, reject) => {
    if (window.XLSX) return resolve(window.XLSX);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error("xlsx"));
    s.onerror = () => reject(new Error("load-failed"));
    document.head.appendChild(s);
  });
}
async function astExportExcel(rep) {
  const XLSX = await astLoadXLSX();
  const ws = XLSX.utils.aoa_to_sheet([rep.columns, ...rep.rows]);
  ws["!cols"] = rep.columns.map(c => ({
    wch: Math.max(String(c).length + 2, 12)
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  XLSX.writeFile(wb, rep.file + ".xlsx");
}
function astExportPrint(rep) {
  const esc = s => String(s == null ? "" : s).replace(/[&<>]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  })[c]);
  const money = new Set(rep.money || []);
  const cell = (v, i) => money.has(i) && v !== "" && !isNaN(v) ? "\u20B1" + Number(v).toLocaleString() : esc(v);
  const thead = rep.columns.map(c => `<th>${esc(c)}</th>`).join("");
  const tbody = rep.rows.map(r => `<tr>${r.map((v, i) => `<td class="${money.has(i) ? "num" : ""}">${cell(v, i)}</td>`).join("")}</tr>`).join("");
  const w = window.open("", "_blank");
  if (!w) return false;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(rep.title)}</title><style>
    *{font-family:Arial,Helvetica,sans-serif}body{margin:26px;color:#0f172a}
    h1{font-size:18px;margin:0 0 2px}.sub{color:#64748b;font-size:12px;margin:0 0 16px}
    table{border-collapse:collapse;width:100%;font-size:12px}
    th,td{border:1px solid #cbd5e1;padding:6px 9px;text-align:left}
    th{background:#0A111E;color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:.04em}
    tr:nth-child(even) td{background:#f1f5f9}td.num{text-align:right;white-space:nowrap}
    .foot{margin-top:18px;color:#94a3b8;font-size:10px}@media print{body{margin:12px}}
  </style></head><body>
    <h1>TIONGTECH \u2014 ${esc(rep.title)}</h1>
    <p class="sub">Generated ${new Date().toLocaleString()} \u00B7 ${rep.rows.length} record${rep.rows.length === 1 ? "" : "s"}</p>
    <table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
    <p class="foot">TIONGTECH Fiber \u00B7 Generated from admindash</p>
    <script>window.onload=function(){setTimeout(function(){window.print();},250);};<\/script>
  </body></html>`);
  w.document.close();
  return true;
}
function astBuildReport(q) {
  const low = " " + q.toLowerCase() + " ";
  const has = (...ks) => ks.some(k => low.includes(k));
  const fullName = c => `${c.first_name || ""} ${c.last_name || ""}`.trim();
  const reg = clients.filter(c => !isPeso(c));
  const lp = c => {
    const v = lastPayments[c.account_number];
    return v ? String(v).slice(0, 10) : "";
  };
  const cCols = ["Account #", "Name", "Phone", "Area", "MRC", "Due Date", "Last Paid", "Status"];
  const cRow = c => [c.account_number || "", fullName(c), c.phone || "", c.area || "", Number(c.mrc) || 0, clientDueDate(c) ? fmtDate(clientDueDate(c)) : "", lp(c), clientPaid(c) ? "Paid" : "Unpaid"];
  const R = (title, file, list) => ({
    title,
    file,
    columns: cCols,
    money: [4],
    rows: list.map(cRow)
  });
  const unpaid = has("unpaid", "not paid", "not yet paid", "hindi bayad", "hindi pa bayad", "hindi pa nagbayad", "hindi pa nakabayad", "walang bayad", "wala pa bayad", "wala kabayad", "wala pa kabayad", "di pa bayad", "dili pa bayad", "hindi pa nakabayad", "overdue", "delinquent");
  const today = has("today", "karon", "karong adlaw", "ngayon", "ngayong araw", "sa araw na ito");
  const tomorrow = has("tomorrow", "ugma", "bukas");
  if ((has("due today") || today && has("due")) && unpaid) return R("Clients Due Today \u2014 Unpaid", "clients_due_today_unpaid", reg.filter(c => dueDays(c) === 0 && !clientPaid(c)));
  if (has("due today") || today && has("due")) return R("Clients Due Today", "clients_due_today", reg.filter(c => dueDays(c) === 0));
  if (has("due tomorrow") || tomorrow && has("due")) return R("Clients Due Tomorrow", "clients_due_tomorrow", reg.filter(c => dueDays(c) === 1));
  if (has("due") && has("this week", "7 day", "seven day", "next week", "week")) return R("Clients Due This Week", "clients_due_this_week", reg.filter(c => {
    const n = dueDays(c);
    return n != null && n >= 0 && n <= 7;
  }));
  if (has("renewal note", "renewal notes", "renewals with note", "with notes", "with chat", "chat note") || (has("renewal", "renew") || has("due")) && has("note", "chat", "remark", "comment", "message")) {
    const noteText = c => {
      try {
        const a = JSON.parse(c.renewal_note || "[]");
        return Array.isArray(a) ? a.map(x => `${x.text || ""}${x.by ? " (" + x.by + ")" : ""}`).join("  |  ") : String(c.renewal_note || "");
      } catch (e) {
        return String(c.renewal_note || "");
      }
    };
    const list = reg.filter(c => {
      const rn = (c.renewal_note || "").trim();
      return rn && rn !== "[]";
    });
    return {
      title: "Renewals with Notes",
      file: "renewals_with_notes",
      columns: ["Account #", "Name", "Due Date", "Status", "Notes"],
      money: [],
      rows: list.map(c => [c.account_number || "", fullName(c), clientDueDate(c) ? fmtDate(clientDueDate(c)) : "", clientPaid(c) ? "Paid" : "Unpaid", noteText(c)])
    };
  }
  if (unpaid || has("follow up", "follow-up", "receivable", "to collect", "chase", "sundan", "singil", "sunduin", "koleksyunin", "habulin")) return R("Unpaid / Overdue Clients", "unpaid_overdue_clients", reg.filter(c => clientIsActive(c) && !clientPaid(c) && (dueDays(c) == null || dueDays(c) <= 0)));
  if (has("expired", "inactive", "payment reminder", "not active", "wala nag active")) return R("Inactive / Expired Clients", "inactive_clients", reg.filter(c => !clientIsActive(c)));
  if (has("active client", "active subscriber", "aktibong kliyente") || has("active", "aktibo") && has("client", "subscriber", "kliyente")) return R("Active Clients", "active_clients", reg.filter(c => clientIsActive(c)));
  if (has("pesowifi", "peso wifi", "peso-wifi", "vendo")) return R("PESOWiFi Accounts", "pesowifi_accounts", clients.filter(c => isPeso(c)));
  if (has("collection", "payment", "paid", "bayad", "koleksyon") && today) {
    const l = DASH && DASH.collectionsTodayList || [];
    return {
      title: "Collections Today",
      file: "collections_today",
      columns: ["Reference", "Account", "Client", "Source", "Amount", "Paid At"],
      money: [4],
      rows: l.map(p => [p.reference || "", p.account || "", p.client || "", p.source || "", Number(p.amount) || 0, p.paid_at || ""])
    };
  }
  if (has("income", "collection", "revenue", "sales", "kita", "kinita") && has("source", "channel", "gcash", "breakdown", "by source", "tinubdan", "pinagmulan", "gikan")) {
    const l = DASH && DASH.incomeBySource || [];
    return {
      title: "Income by Source (last 60 days)",
      file: "income_by_source",
      columns: ["Source", "Payments", "Amount"],
      money: [2],
      rows: l.map(s => [s.source || "\u2014", Number(s.count) || 0, Number(s.amount) || 0])
    };
  }
  if (has("job order", "job orders", "joborder", "dispatch", "ticket", "trabaho order") || has("technician", "teknisyan", "tekniko") && has("job", "trabaho", "assign", "gitrabaho")) {
    const rows = seedOrders.slice().sort((a, b) => (a.tech || "").localeCompare(b.tech || "") || (b.startDate || "").localeCompare(a.startDate || "")).map(o => [o.id || "", o.tech || NO_TECH, o.client || "", o.type || "", o.status || "", o.startDate || ""]);
    return {
      title: "Job Orders by Technician",
      file: "job_orders_by_technician",
      columns: ["JO #", "Technician", "Client", "Type", "Status", "Date"],
      money: [],
      rows
    };
  }
  if ((has("area", "per area", "by area", "purok", "barangay", "lugar", "per lugar", "kada lugar", "kada purok", "coverage") || has("per-area")) && !has("map")) {
    const map = {};
    reg.forEach(c => {
      const a = (c.area || "\u2014").trim() || "\u2014";
      if (!map[a]) map[a] = {
        n: 0,
        active: 0,
        mrc: 0
      };
      map[a].n++;
      if (clientIsActive(c)) map[a].active++;
      map[a].mrc += Number(c.mrc) || 0;
    });
    const rows = Object.keys(map).sort((x, y) => map[y].n - map[x].n).map(a => [a, map[a].n, map[a].active, map[a].mrc]);
    return {
      title: "Clients by Area",
      file: "clients_by_area",
      columns: ["Area", "Clients", "Active", "MRC Total"],
      money: [3],
      rows
    };
  }
  if (has("expense", "gasto", "gastos", "gastusin", "ginastos")) {
    const l = expenses || [];
    return {
      title: "Expenses",
      file: "expenses",
      columns: ["Date", "Category", "Supplier", "Description", "Invoice", "Amount"],
      money: [5],
      rows: l.map(e => [e.date || "", e.cat || "", e.supplier || "", e.description || "", e.invoice || "", Number(e.amt != null ? e.amt : e.amount) || 0])
    };
  }
  if (has("all client", "client list", "list of client", "listahan", "listahan sa kliyente", "listahan ng kliyente", "tanan", "lahat", "lahat ng kliyente", "tanang kliyente", "masterlist", "master list", "all subscriber", "whole client", "entire client", "complete list", "kompleto")) return R("All Clients", "all_clients", reg);
  return null;
}

/* AI Assistant — answers computed from live data */
const AST_HOWTO = [{
  keys: ["create payroll", "make payroll", "new payroll", "run payroll", "process payroll", "start payroll", "weekly payroll", "generate payroll", "paano payroll", "unsaon payroll", "sweldo", "suweldo", "pasahod", "sahod", "payroll"],
  title: "How to create & run a payroll",
  steps: ["Open Payroll from the sidebar.", "Create or open the current pay period — set its label (e.g. the week) and the pay date.", "The roster loads your active employees; each row shows the gross pay. Enter or confirm each employee's gross.", "Active deductions (loans, coop, uniform, government) apply automatically for this period and each loan advances one term. Net = gross − deductions is computed for you.", "Review each employee's payslip. Each employee can Approve or Contest their own slip; you (owner) can override.", "When everything is correct, Publish the period.", "On publish, the total GROSS is booked as a 'Salary Expense' in Financials, and every deduction is recorded in the Collection Cards (coop, t-shirt, cash advance, etc.). Net is what each employee is paid."],
  note: "Tip: set up an employee's loans first (Loan Management) so the deductions apply on the very first payroll after the start date."
}, {
  keys: ["loan management", "create loan", "add loan", "new loan", "set up loan", "setup loan", "record loan", "coop loan", "loan plan", "paano loan", "unsaon loan", "cash advance", "make a loan", "utang", "hulam", "pahulam", "pautang"],
  title: "How to set up a loan (Loan Management)",
  steps: ["Go to Payroll → Loan Management.", "Click Add / New to create a plan.", "Pick the Employee.", "Choose the Type — Coop, T-Shirt, Cash Advance, or Fines — and the Category (loan, uniform, government, or other). The Type decides which Collection Card it lands in.", "Enter the Total amount and the number of Weeks (terms). The weekly deduction = Total ÷ Weeks.", "Optional: set Interest % per week. Weekly pay then = (Total ÷ Weeks) + interest.", "Set the Payment start date — deductions begin on the first payroll on/after this date.", "Save. The plan now shows its progress, remaining balance, and weekly amount."],
  note: "You can edit or deactivate a plan anytime; changes take effect on the next payroll run."
}, {
  keys: ["apply loan", "apply plan", "apply deduction", "deduct loan", "loan deduction", "how loan deducted", "interest only", "interest-only", "extend loan", "pause loan", "skip loan"],
  title: "How loan deductions apply to payroll",
  steps: ["Deductions apply automatically when you create/open a payroll period — each active plan deducts its weekly amount and advances one term.", "To re-apply after editing plans, open the period and use the Apply action.", "Interest-only: toggle 'Interest-only' on a plan to deduct ONLY the interest for a week and pause the principal — the term extends. Use it when an employee can't cover a full week.", "When a loan reaches its last term, the final week auto-adjusts for rounding so the balance lands exactly at zero and the plan stops.", "If you change deductions on an already-published period, affected payslips reset to pending so the employee re-approves."],
  note: "Coop and other withheld money are never counted as company income — they're tracked separately in Collection Cards."
}, {
  keys: ["approve payslip", "review payslip", "approve payroll", "contest", "payslip", "review and approval", "approve salary", "employee approve"],
  title: "How review & approval works (per employee)",
  steps: ["After you publish a period, each employee sees their own payslip.", "The employee taps Approve if the amounts are correct, or Contest and writes what's wrong.", "Contested slips show the employee's remark to the payroll office for review.", "The owner can approve on an employee's behalf if needed.", "Once approved, an employee can request a printed hard copy.", "If deductions change later, the slip returns to pending for re-approval."]
}, {
  keys: ["collection card", "collection cards", "coop money", "cooperative", "t-shirt", "tshirt", "employee collection"],
  title: "How Collection Cards work",
  steps: ["Open Payroll → Collection Cards.", "Each card groups money withheld from employees by type: Cooperative, T-Shirt, Cash Advance, and Other/Fines.", "Every deduction taken during payroll is added to its matching card automatically.", "Each card shows the running balance plus this-week / month / year totals and a history of who paid what and when.", "This money is a collection the company holds — it is NOT counted as company income anywhere in Financials."]
}, {
  keys: ["add client", "new client", "create client", "register client", "add subscriber", "new subscriber", "clients menu", "subscriber", "kliyente", "magdagdag ug kliyente", "magdagdag ng kliyente"],
  title: "How to add & manage clients",
  steps: ["Open Subscribers → Clients.", "Use Add to create a client; fill account number, name, area, plan/MRC, phone, subscription date, and coordinates if you have them.", "The subscription date's day sets the monthly due date; the bill date is 10 days before due.", "Use the pencil icon on a row to edit; search/filter to find accounts.", "Clients whose area starts with 'PESOWIFI' are treated as PESOWiFi and counted separately."]
}, {
  keys: ["pesowifi", "peso wifi", "vendo", "vending"],
  title: "How PESOWiFi accounts work",
  steps: ["PESOWiFi accounts are any client whose Area starts with 'PESOWIFI'.", "They're managed under Subscribers → PESOWiFi and are excluded from regular renewals, due counts, and active-client totals.", "Manage them there without affecting your postpaid subscriber numbers."]
}, {
  keys: ["renewal", "renew", "follow up payment", "due today", "print renewal", "renewals menu", "chat note", "renewal note"],
  title: "How to work Renewals & follow-ups",
  steps: ["Open Renewals → Overview to see who's due and their paid/unpaid status.", "Filter to Unpaid to get your follow-up list, then Print or Download it.", "Use the Note/chat column to log follow-up conversations on an account — each note is stamped with your name and role.", "When a client pays, their renewal notes clear automatically for the new cycle.", "PESOWiFi is excluded from renewals."],
  note: "You can also ask me: 'Excel of clients due today and not yet paid'."
}, {
  keys: ["job order", "create job order", "new job order", "assign technician", "dispatch", "trabaho order", "teknisyan"],
  title: "How to create & assign a Job Order",
  steps: ["Open Job Order → Overview.", "Add a job order: pick the client, job type, and describe the issue.", "Assign a technician from the dropdown — it lists people whose Position is 'Technician' (set in Settings → Users).", "Leave it as 'No Available Technician' to keep it Pending; assign someone to move it to In Progress.", "Set the solution and mark it Completed when done. SLA badges warn you as jobs approach their time limit.", "Clients can watch progress on the public tracker page (track.php) — pending and in-progress only, no client names."]
}, {
  keys: ["job type", "issue", "solution", "sla", "catalog", "catalogue"],
  title: "How to manage Job Order catalogs (Types, Issues, Solutions, SLA)",
  steps: ["Under Job Order, open Job Types, Issues, Solutions, or SLA Rules.", "Add a new entry with the + / Add button; edit an existing one with the pencil icon.", "These lists feed the dropdowns when you create a job order.", "SLA Rules set the standard resolution hours and when a job starts warning."]
}, {
  keys: ["financial", "income", "expense", "profit", "add expense", "record expense"],
  title: "How to use Financials",
  steps: ["Open Financials for income, expenses, and net over this month / year / all-time.", "Income comes from client payments (Taoki-synced plus any recorded manually); discounts are excluded.", "Add company expenses manually — the payroll 'Salary Expense' posts here automatically on publish.", "Taoki payments appear automatically via the sync and can't be edited/deleted here (they're protected)."]
}, {
  keys: ["settings", "add user", "create user", "permission", "position", "access", "role", "staff account", "user", "tagagamit", "gumagamit"],
  title: "How to manage Users, Positions & Permissions (Settings)",
  steps: ["Open Settings.", "Add a user with a username, password, full name, role, and Position.", "Set a Position of 'Technician' to make someone appear in the Job Order technician dropdown.", "Give full access, or tick exactly which menus a user can View / Add / Edit / Delete.", "Users edit their own username/password from their profile (bottom-left)."]
}, {
  keys: ["map coverage", "map", "coordinates", "pin", "location map"],
  title: "How to use Map Coverage",
  steps: ["Open Map Coverage to see clients and infrastructure plotted from their coordinates.", "Accounts need latitude/longitude saved (decimal or DMS) to appear.", "Use it to see coverage density and plan installs or repairs by area."]
}, {
  keys: ["pon", "olt", "nap", "splitter", "fiber port", "pon management"],
  title: "How to use PON Management",
  steps: ["Open PON Management to view OLTs, NAP devices, and port usage.", "NAP/OLT records sync in from Taoki (add-only — existing coordinates are never overwritten).", "Use it to track which ports are used and where capacity remains."]
}, {
  keys: ["churn", "retention", "cancelled", "disconnect", "snapshot"],
  title: "How to use Churn & Retention",
  steps: ["Open Churn & Retention to track active vs lost clients over time.", "Daily snapshots are captured automatically, building the trend.", "Use it to spot rising disconnections and act on retention early."]
}, {
  keys: ["faith goal", "verse", "goal"],
  title: "How to use Faith Goals",
  steps: ["Open Faith Goals (below Settings).", "Set the active-client goal and the verse/message shown on the Owner Dashboard command center.", "The dashboard progress ring reflects your goal."]
}, {
  keys: ["export", "excel", "pdf", "report", "assistant", "what can you do", "download data"],
  title: "How to export data with me (AI Assistant)",
  steps: ["Just ask for a list and a format, e.g. 'Excel of clients due today and not yet paid' or 'printable PDF of unpaid clients'.", "Say 'excel' for a spreadsheet or 'pdf'/'printable' for a print-ready page you can save as PDF.", "I can export: due today, due today & unpaid, due tomorrow/this week, unpaid/overdue, active, inactive/expired, all clients, PESOWiFi, collections today, income by source, job orders by technician, renewals with notes, clients by area, and expenses."]
}, {
  keys: ["taoki", "sync", "cron", "import payment"],
  title: "How the Taoki sync works",
  steps: ["A file (sync_taoki.php) pulls clients, payments, and NAP data from Taoki into admindash.", "It runs automatically on a schedule via a cron job; it can also be run in the browser with the secret key.", "Only real payments become income; MRC bills and PESOWiFi ledgers are skipped; duplicates are prevented.", "Taoki payments are protected from editing/deletion in Financials."]
}, {
  keys: ["dashboard", "command center", "overview screen"],
  title: "How to read the Owner Dashboard",
  steps: ["The Owner Dashboard summarizes everything: active/registered clients, collections today, income vs expenses, receivables, and upcoming dues.", "Tap 'Collections Today' or 'Clients Renewed Today' to see the detailed list.", "The Employee Collection Funds section shows coop/loan money held and the salary expense for the week/month."]
}];
function astHowTo(q) {
  const low = " " + q.toLowerCase() + " ";
  const asking = /how to|how do|how does|how can|how would|how could|how is|how are .* (created|made|applied|set)|paano|papaano|pano|unsaon|unsa man|giunsa|paunsa|step by step|\bsteps\b|\bguide\b|tutorial|teach me|turuan|tudloi|show me how|walk me through|i-set up|set up|setup|gabay/.test(low);
  if (!asking) return null;
  let best = null,
    score = 0;
  for (const tpc of AST_HOWTO) {
    const s = tpc.keys.filter(k => low.includes(k)).length;
    if (s > score) {
      score = s;
      best = tpc;
    }
  }
  if (!best) return "I can walk you through any menu. Try one of these:\n• How to create payroll\n• How to set up a loan (Loan Management)\n• How to apply a loan / interest-only\n• How to review & approve a payslip\n• How to add a client · How to create a job order\n• How to add a user & permissions (Settings)\n• How to export a report as Excel or PDF";
  return best.title + "\n\n" + best.steps.map((s, i) => `${i + 1}. ${s}`).join("\n") + (best.note ? "\n\n" + best.note : "");
}

/* AI Assistant — answers computed from live data (continued) */
function Assistant({
  t
}) {
  const [msgs, setMsgs] = useState([{
    role: "ai",
    text: "Hi — I'm your TIONGTECH business assistant. Type anything in English, Tagalog, or Bisaya. I can:\n• Answer from your live data (collections, income vs expenses, unpaid follow-ups, renewals, active clients)\n• Export lists as Excel or PDF — e.g. \"Excel of clients due today and not yet paid\"\n• Explain how to use any menu — e.g. \"How to create payroll\" / \"Paano mag-set up ug loan\""
  }]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [msgs]);
  const fmt = n => peso(Math.round(n || 0));
  const reg = clients.filter(c => !isPeso(c));
  const pesoN = clients.length - reg.length;
  const active = reg.filter(c => clientIsActive(c)).length;
  const inactive = reg.length - active;
  const dueToday = reg.filter(c => dueDays(c) === 0).length;
  const dueWeek = reg.filter(c => {
    const n = dueDays(c);
    return n >= 0 && n <= 7;
  }).length;
  const unpaidList = reg.filter(c => clientIsActive(c) && !clientPaid(c) && dueDays(c) <= 0);
  const ar = unpaidList.reduce((a, c) => a + (Number(c.mrc) || 0), 0);
  const collToday = DASH ? DASH.collectionsToday : 0;
  const collN = DASH ? DASH.collectionsTodayCount : 0;
  const inc2 = DASH ? DASH.income2mo : 0;
  const exp2 = DASH ? DASH.expenses2mo : 0;
  const net2 = DASH ? DASH.net2mo : 0;
  const topExp = (expenses || []).slice(0, 5);
  const mLabel = ym => {
    if (!ym) return "";
    const d = new Date(ym + "-01T00:00:00");
    return d.toLocaleString("en-US", {
      month: "short"
    });
  };
  const expM = DASH && DASH.expenseMonths || [];
  const QA = {
    "Income vs expenses (last 2 months)?": `Over the last ~60 days you collected ${fmt(inc2)} in payments and spent ${fmt(exp2)} — a net of ${fmt(net2)}.` + (expM.length ? ` By month: ${expM.map(m => `${mLabel(m.ym)} ${fmt(m.amount)} expenses`).join(", ")}.` : ""),
    "What are my biggest expenses?": topExp.length ? `Largest expense categories (all-time): ${topExp.map(e => `${e.cat} ${fmt(e.amt)}`).join(", ")}.` : "No expense data yet — import your expenses first.",
    "Who do I follow up for payment?": `${unpaidList.length} active clients are due or overdue and unpaid this cycle, totaling ${fmt(ar)} in receivables. Open Renewals → Overview, filter Unpaid, and print the follow-up sheet.`,
    "How many renewals are due?": `${dueToday} client${dueToday === 1 ? "" : "s"} due today and ${dueWeek} within the next 7 days (PESOWiFi excluded).`,
    "How many active clients?": `${active} active (real plan profile) and ${inactive} not active (Expired / Payment Reminder / blank), out of ${reg.length} registered. Plus ${pesoN} PESOWiFi accounts managed separately.`,
    "What should I prioritize today?": `1) Today's dues — ${dueToday} client${dueToday === 1 ? "" : "s"} due today. 2) Chase ${unpaidList.length} unpaid/overdue accounts (${fmt(ar)} receivable). 3) Re-activate ${inactive} expired / payment-reminder clients.` + (collToday > 0 ? ` So far today you've collected ${fmt(collToday)} from ${collN} payment${collN === 1 ? "" : "s"}.` : "")
  };
  const answer = q => {
    if (QA[q]) return QA[q];
    const low = q.toLowerCase();
    const key = Object.keys(QA).find(k => {
      const kw = k.toLowerCase();
      const inc = (...ks) => ks.some(x => low.includes(x));
      return inc("expense", "gasto", "gastos") && kw.includes("expense") || inc("income", "kita", "kinita", "revenue", "sales") && kw.includes("income") || inc("unpaid", "follow", "collect", "wala bayad", "hindi bayad", "wala pa kabayad", "singil", "utang", "koleksyon", "receivable", "overdue") && kw.includes("follow") || inc("renew", "renewal", "due", "takda") && kw.includes("renewal") || inc("active", "aktibo", "aktibong kliyente") && kw.includes("active") || inc("priorit", "unahin", "unahon", "prayoridad", "una") && kw.includes("priorit");
    });
    return key ? QA[key] : "I read your live data — ask in English, Tagalog, or Bisaya. I can answer questions (income vs expenses, who to follow up, renewals due, active clients, today's priorities), export lists as Excel or PDF (e.g. \"Excel of clients due today and not yet paid\", \"listahan sa kliyente nga wala pa kabayad\"), or explain how to use any menu (e.g. \"How to create payroll\", \"Paano mag-set up ug loan\").";
  };
  const send = text => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMsgs(m => [...m, {
      role: "user",
      text: q
    }]);
    setInput("");
    const low = q.toLowerCase();
    const howto = astHowTo(q);
    if (howto) {
      setTimeout(() => setMsgs(m => [...m, {
        role: "ai",
        text: howto
      }]), 260);
      return;
    }
    const wantsFile = /excel|xlsx|spreadsheet|\bcsv\b|\bpdf\b|printable|\bprint\b|document|download|export|generate|give me a (file|report|list|sheet)/.test(low) || low.includes(" file");
    if (wantsFile) {
      const rep = astBuildReport(q);
      if (!rep) {
        setTimeout(() => setMsgs(m => [...m, {
          role: "ai",
          text: "I can export any of these as Excel or PDF — just say which and the format:\n• Clients due today (or due today & unpaid)\n• Clients due tomorrow / due this week\n• Unpaid / overdue clients (follow-ups)\n• Active clients · Inactive/expired clients · All clients\n• PESOWiFi accounts\n• Collections today · Expenses\n\nExample: \"Excel of clients due today and not yet paid\" or \"printable PDF of unpaid clients\"."
        }]), 220);
        return;
      }
      if (!rep.rows.length) {
        setTimeout(() => setMsgs(m => [...m, {
          role: "ai",
          text: `Good news — there are no records for "${rep.title}" right now, so there's nothing to export.`
        }]), 220);
        return;
      }
      const wantsPdf = /\bpdf\b|printable|\bprint\b|document/.test(low) && !/excel|xlsx|spreadsheet/.test(low);
      const n = rep.rows.length;
      if (wantsPdf) {
        const ok = astExportPrint(rep);
        setTimeout(() => setMsgs(m => [...m, {
          role: "ai",
          text: ok ? `Here's your printable ${rep.title} — ${n} record${n === 1 ? "" : "s"}. A print window opened; choose "Save as PDF" or print it directly.` : "I built the report but the print window was blocked. Please allow pop-ups for this site, then ask again."
        }]), 220);
      } else {
        setMsgs(m => [...m, {
          role: "ai",
          text: `Preparing your Excel file for ${rep.title} (${n} record${n === 1 ? "" : "s"})…`
        }]);
        astExportExcel(rep).then(() => {
          setMsgs(m => [...m, {
            role: "ai",
            text: `Done — ${rep.file}.xlsx has been downloaded (${rep.title}, ${n} record${n === 1 ? "" : "s"}).`
          }]);
        }).catch(() => {
          const ok = astExportPrint(rep);
          setMsgs(m => [...m, {
            role: "ai",
            text: ok ? "The Excel library couldn't load (usually a connection issue), so I opened a printable version instead — you can Save as PDF from there." : "I couldn't load the Excel library and the print window was blocked. Check your connection and pop-up settings, then try again."
          }]);
        });
      }
      return;
    }
    setTimeout(() => setMsgs(m => [...m, {
      role: "ai",
      text: answer(q)
    }]), 320);
  };
  return /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 168px)",
      minHeight: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 flex items-center gap-2",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.accentSoft,
      color: t.accent
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 17
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 14
    }
  }, "Business Assistant"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5
    }
  }, "Grounded in your live data"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto px-5 py-4 space-y-3"
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex " + (m.role === "user" ? "justify-end" : "justify-start")
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl",
    style: {
      maxWidth: "78%",
      padding: "10px 14px",
      fontSize: 13.5,
      lineHeight: 1.5,
      whiteSpace: "pre-wrap",
      background: m.role === "user" ? t.accent : t.surface2,
      color: m.role === "user" ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
      border: m.role === "user" ? "none" : `1px solid ${t.border}`,
      borderBottomRightRadius: m.role === "user" ? 4 : 16,
      borderBottomLeftRadius: m.role === "user" ? 16 : 4
    }
  }, m.text))), /*#__PURE__*/React.createElement("div", {
    ref: endRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-2",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 pb-4 pt-3"
  }, /*#__PURE__*/React.createElement("input", {
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => e.key === "Enter" && send(),
    placeholder: "Ask in English, Tagalog, or Bisaya\u2026",
    className: "flex-1 rounded-xl outline-none",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      padding: "11px 14px",
      fontSize: 13.5
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => send(),
    className: "grid place-items-center rounded-xl",
    style: {
      width: 44,
      height: 44,
      background: t.accent,
      color: t.name === "dark" ? "#04222A" : "#fff",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Send, {
    size: 18
  })))));
}
function typeTone(t, type) {
  return {
    "INSTALL": t.good,
    "Client Repair": t.warn,
    "Mainline Repair": t.bad,
    "Follow-up": t.violet,
    "PESOWiFi Repair": t.accent
  }[type] || t.accent;
}
function slaTone(t, sla) {
  return {
    PASSED: t.good,
    FAILED: t.bad,
    WARNING: t.warn,
    OK: t.textMuted
  }[sla] || t.textMuted;
}
function toneVal(t, tone) {
  return {
    accent: t.accent,
    violet: t.violet,
    warn: t.warn,
    good: t.good,
    bad: t.bad
  }[tone] || t.textMuted;
}
function toneSoftVal(t, tone) {
  return {
    accent: t.accentSoft,
    violet: "rgba(167,139,250,0.14)",
    warn: t.warnSoft,
    good: t.goodSoft,
    bad: t.badSoft
  }[tone] || t.borderSoft;
}
function JobOrders({
  t
}) {
  const [orders, setOrders] = useState(seedOrders);
  const [creating, setCreating] = useState(false);
  const blank = {
    client: "",
    type: JO_TYPES[0],
    tech: NO_TECH,
    issue: "",
    startDate: "",
    startTime: ""
  };
  const [draft, setDraft] = useState(blank);
  const [q, setQ] = useState("");
  const [monthF, setMonthF] = useState("");
  const [typeF, setTypeF] = useState("");
  const [techF, setTechF] = useState("");
  const [statusF, setStatusF] = useState(""); // "" = Active, "ALL" = all
  const [slaF, setSlaF] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState({
    key: "startDate",
    dir: "desc"
  });
  const [page, setPage] = useState(0);
  const PAGE = 8;
  const months = Array.from(new Set(orders.map(o => (o.startDate || "").slice(0, 7)).filter(Boolean))).sort().reverse();
  const monthLabel = m => {
    const [y, mo] = m.split("-");
    return new Date(y, mo - 1, 1).toLocaleString("en", {
      month: "long",
      year: "numeric"
    });
  };
  const setCell = (id, key, val) => setOrders(os => os.map(o => {
    if (o.id !== id) return o;
    const n = {
      ...o,
      [key]: val
    };
    if (key === "status") {
      if (val === "Completed") {
        n.finishDate = o.finishDate || new Date().toISOString().slice(0, 10);
        n.resHrs = o.resHrs != null ? o.resHrs : CFG_SLA.standard - 2;
        n.sla = o.sla === "WARNING" ? "FAILED" : n.resHrs > CFG_SLA.standard ? "FAILED" : "PASSED";
      } else {
        n.finishDate = "";
        n.resHrs = null;
        n.sla = o.sla === "FAILED" || o.sla === "PASSED" ? "OK" : o.sla;
      }
    }
    _save("save_job", _jobPayload(n));
    return n;
  }));
  const create = () => {
    if (!draft.client.trim()) return;
    const id = nextJobId();
    const rec = {
      id,
      client: draft.client.trim(),
      type: draft.type,
      tech: draft.tech,
      issue: draft.issue,
      startDate: draft.startDate || new Date().toISOString().slice(0, 10),
      startTime: draft.startTime,
      finishDate: "",
      resHrs: null,
      status: "Pending",
      sla: "OK",
      solution: ""
    };
    _save("create_job", _jobPayload(rec));
    setOrders(os => [rec, ...os]);
    setDraft(blank);
    setCreating(false);
  };
  const removeJob = o => {
    if (!window.confirm("Delete job order " + o.id + "?")) return;
    _save("delete_job", {
      jo_id: o.id
    });
    setOrders(os => os.filter(x => x !== o));
  };
  let rows = orders.filter(o => {
    if (statusF === "" && o.status === "Completed") return false;
    if (statusF && statusF !== "ALL" && o.status !== statusF) return false;
    if (monthF && (o.startDate || "").slice(0, 7) !== monthF) return false;
    if (dateFrom && (o.startDate || "") < dateFrom) return false;
    if (dateTo && (o.startDate || "") > dateTo) return false;
    if (typeF && o.type !== typeF) return false;
    if (techF && o.tech !== techF) return false;
    if (slaF && o.sla !== slaF) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!(o.id.toLowerCase().includes(s) || o.client.toLowerCase().includes(s) || (o.tech || "").toLowerCase().includes(s) || (o.issue || "").toLowerCase().includes(s))) return false;
    }
    return true;
  });
  rows = rows.slice().sort((a, b) => {
    const av = a[sort.key] ?? "",
      bv = b[sort.key] ?? "";
    const c = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
    return sort.dir === "asc" ? c : -c;
  });
  const total = rows.length;
  const pageRows = rows.slice(page * PAGE, page * PAGE + PAGE);
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const clearFilters = () => {
    setQ("");
    setMonthF("");
    setTypeF("");
    setTechF("");
    setStatusF("");
    setSlaF("");
    setDateFrom("");
    setDateTo("");
    setPage(0);
  };
  const downloadJobs = () => {
    const rl = dateFrom || dateTo ? ` (${dateFrom || "start"} → ${dateTo || "today"})` : "";
    const fl = dateFrom || dateTo ? `_${dateFrom || "start"}_to_${dateTo || "today"}` : "";
    const rep = {
      title: "Job Orders" + rl,
      file: "job_orders" + fl,
      columns: ["JO #", "Client", "Type", "Technician", "Issue", "Solution", "Started", "Finished", "Res. hrs", "Status"],
      money: [],
      rows: rows.map(o => [o.id || "", o.client || "", o.type || "", o.tech || "", o.issue || "", o.solution || "", o.startDate || "", o.finishDate || "", o.resHrs != null ? o.resHrs : "", o.status || ""])
    };
    astExportExcel(rep).catch(() => astExportPrint(rep));
  };
  const toggleSort = key => setSort(s => ({
    key,
    dir: s.key === key && s.dir === "asc" ? "desc" : "asc"
  }));
  const scheme = t.name === "dark" ? "dark" : "light";
  const selBase = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: "8px 10px",
    fontSize: 13,
    outline: "none",
    colorScheme: scheme
  };
  const cellSel = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "5px 5px",
    fontSize: 11.5,
    fontWeight: 600,
    outline: "none",
    width: "100%",
    cursor: "pointer",
    colorScheme: scheme
  };
  const canEditJob = can("job_solution");
  const canDelJob = canDel("job_solution");
  const roText = {
    fontSize: 11.5,
    fontWeight: 600,
    color: t.textMuted
  };
  const optStyle = {
    background: t.surface,
    color: t.text
  };
  const btn = primary => ({
    background: primary ? t.accent : t.surface2,
    color: primary ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
    border: primary ? "none" : `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 14px",
    borderRadius: 11
  });
  const statusTint = s => ({
    Pending: t.accent,
    "In Progress": t.violet,
    Completed: t.good
  })[s] || t.textMuted;
  const cols = [{
    k: "id",
    label: "JO # / Client"
  }, {
    k: "type",
    label: "Type"
  }, {
    k: "tech",
    label: "Technician"
  }, {
    k: "issue",
    label: "Issue"
  }, {
    k: "startDate",
    label: "Started"
  }, {
    k: "finishDate",
    label: "Finished"
  }, {
    k: "resHrs",
    label: "Res. hrs"
  }, {
    k: "solution",
    label: "Solution"
  }, {
    k: "status",
    label: "Status"
  }, {
    k: "sla",
    label: "SLA Status"
  }];
  const clientCoord = {};
  (typeof clients !== "undefined" ? clients : []).forEach(c => {
    const n = `${c.first_name || ""} ${c.last_name || ""}`.trim().toLowerCase();
    if (c.coordinates) clientCoord[n] = c.coordinates;
  });
  const mapsUrl = raw => {
    const ll = parseLatLng(raw);
    return ll ? `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}` : null;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, total, " record", total === 1 ? "" : "s"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: downloadJobs,
    className: "inline-flex items-center gap-1.5",
    style: btn(false)
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), canAdd("job_solution") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setCreating(true),
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), "New Job Order"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "8px 12px",
      flex: "1 1 240px",
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 15,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setPage(0);
    },
    placeholder: "Search JO#, customer, technician, or issue\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      fontSize: 12.5,
      color: t.textMuted
    }
  }, /*#__PURE__*/React.createElement("span", null, "Started"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateFrom,
    onChange: e => {
      setDateFrom(e.target.value);
      setPage(0);
    },
    style: {
      ...selBase,
      padding: "7px 9px"
    }
  }), /*#__PURE__*/React.createElement("span", null, "to"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateTo,
    onChange: e => {
      setDateTo(e.target.value);
      setPage(0);
    },
    style: {
      ...selBase,
      padding: "7px 9px"
    }
  })), /*#__PURE__*/React.createElement("select", {
    value: monthF,
    onChange: e => {
      setMonthF(e.target.value);
      setPage(0);
    },
    style: selBase
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All months"), months.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, monthLabel(m)))), /*#__PURE__*/React.createElement("select", {
    value: typeF,
    onChange: e => {
      setTypeF(e.target.value);
      setPage(0);
    },
    style: selBase
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All job types"), JO_TYPES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x))), /*#__PURE__*/React.createElement("select", {
    value: techF,
    onChange: e => {
      setTechF(e.target.value);
      setPage(0);
    },
    style: selBase
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All technicians"), JO_TECHS.map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x))), /*#__PURE__*/React.createElement("select", {
    value: statusF,
    onChange: e => {
      setStatusF(e.target.value);
      setPage(0);
    },
    style: selBase
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Active (Pending + In Progress)"), /*#__PURE__*/React.createElement("option", {
    value: "ALL"
  }, "All statuses"), /*#__PURE__*/React.createElement("option", {
    value: "Pending"
  }, "Pending"), /*#__PURE__*/React.createElement("option", {
    value: "In Progress"
  }, "In Progress"), /*#__PURE__*/React.createElement("option", {
    value: "Completed"
  }, "Completed")), /*#__PURE__*/React.createElement("select", {
    value: slaF,
    onChange: e => {
      setSlaF(e.target.value);
      setPage(0);
    },
    style: selBase
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All SLA outcomes"), ["PASSED", "FAILED", "WARNING", "OK"].map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x))), /*#__PURE__*/React.createElement("button", {
    onClick: clearFilters,
    style: {
      ...btn(false),
      fontWeight: 600
    }
  }, "Clear filters")), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 840
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, cols.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.k,
    onClick: () => toggleSort(c.k),
    style: {
      textAlign: c.k === "resHrs" ? "right" : "left",
      padding: "8px 8px",
      fontWeight: 700,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: sort.key === c.k ? t.accent : t.textFaint,
      borderBottom: `1px solid ${t.border}`,
      cursor: "pointer",
      whiteSpace: "nowrap",
      userSelect: "none"
    }
  }, c.label, sort.key === c.k ? sort.dir === "asc" ? " ↑" : " ↓" : "")), /*#__PURE__*/React.createElement("th", {
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, pageRows.map(o => /*#__PURE__*/React.createElement("tr", {
    key: o.id,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontWeight: 700,
      fontSize: 12,
      fontFamily: "ui-monospace, monospace"
    }
  }, o.id), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 600,
      fontSize: 13
    }
  }, o.client), (() => {
    const raw = clientCoord[(o.client || "").trim().toLowerCase()];
    if (!raw) return null;
    const url = mapsUrl(raw);
    return url ? /*#__PURE__*/React.createElement("a", {
      href: url,
      target: "_blank",
      rel: "noreferrer",
      style: {
        color: t.accent,
        fontSize: 10.5,
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement(MapPin, {
      size: 10
    }), raw) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 10.5,
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement(MapPin, {
      size: 10
    }), raw);
  })()), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 5px",
      minWidth: 98
    }
  }, canEditJob ? /*#__PURE__*/React.createElement("select", {
    value: o.type,
    onChange: e => setCell(o.id, "type", e.target.value),
    style: cellSel
  }, JO_TYPES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: optStyle
  }, x))) : /*#__PURE__*/React.createElement("span", {
    style: roText
  }, o.type || "—")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 5px",
      minWidth: 88
    }
  }, canEditJob ? /*#__PURE__*/React.createElement("select", {
    value: o.tech,
    onChange: e => setCell(o.id, "tech", e.target.value),
    style: cellSel
  }, (o.tech && !JO_TECHS.includes(o.tech) ? [o.tech, ...JO_TECHS] : JO_TECHS).map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: optStyle
  }, x))) : /*#__PURE__*/React.createElement("span", {
    style: roText
  }, o.tech || "—")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 5px",
      minWidth: 108
    }
  }, canEditJob ? /*#__PURE__*/React.createElement("select", {
    value: o.issue,
    onChange: e => setCell(o.id, "issue", e.target.value),
    style: cellSel
  }, !CFG_ISSUES.includes(o.issue) && o.issue && /*#__PURE__*/React.createElement("option", {
    style: optStyle
  }, o.issue), CFG_ISSUES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: optStyle
  }, x))) : /*#__PURE__*/React.createElement("span", {
    style: roText
  }, o.issue || "—")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      color: t.textMuted,
      fontSize: 12.5,
      whiteSpace: "nowrap"
    }
  }, o.startDate || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      color: t.textMuted,
      fontSize: 12.5,
      whiteSpace: "nowrap"
    }
  }, o.finishDate || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      textAlign: "right",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, o.resHrs != null ? o.resHrs : "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 5px",
      minWidth: 116
    }
  }, canEditJob ? /*#__PURE__*/React.createElement("select", {
    value: o.solution,
    onChange: e => setCell(o.id, "solution", e.target.value),
    style: cellSel
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    style: optStyle
  }, "\u2014 Select \u2014"), CFG_SOLUTIONS.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: optStyle
  }, x))) : /*#__PURE__*/React.createElement("span", {
    style: roText
  }, o.solution || "—")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 5px",
      minWidth: 98
    }
  }, canEditJob ? /*#__PURE__*/React.createElement("select", {
    value: o.status,
    onChange: e => setCell(o.id, "status", e.target.value),
    style: {
      ...cellSel,
      color: statusTint(o.status),
      fontWeight: 700,
      background: statusTint(o.status) + "1e",
      border: `1px solid ${statusTint(o.status)}55`
    }
  }, ["Pending", "In Progress", "Completed"].map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: optStyle
  }, x))) : /*#__PURE__*/React.createElement("span", {
    className: "inline-flex rounded-full",
    style: {
      color: statusTint(o.status),
      fontWeight: 700,
      fontSize: 11,
      background: statusTint(o.status) + "1e",
      padding: "3px 9px"
    }
  }, o.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 8px",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1 rounded-full",
    style: {
      background: slaTone(t, o.sla) + "22",
      color: slaTone(t, o.sla),
      fontSize: 10.5,
      fontWeight: 800,
      padding: "3px 9px"
    }
  }, o.sla === "WARNING" && /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 11
  }), o.sla)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 5px",
      textAlign: "right"
    }
  }, canDelJob ? /*#__PURE__*/React.createElement("button", {
    onClick: () => removeJob(o),
    title: "Delete job order",
    className: "grid place-items-center rounded-lg",
    style: {
      width: 26,
      height: 26,
      background: "transparent",
      border: `1px solid ${t.border}`,
      color: t.bad,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 13
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint
    }
  }, "\u2014")))), pageRows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: cols.length + 1,
    style: {
      padding: "28px 14px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No job orders match your filters."))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 10,
      padding: 12
    }
  }, pageRows.map(o => {
    const raw = clientCoord[(o.client || "").trim().toLowerCase()];
    const url = raw ? mapsUrl(raw) : null;
    return /*#__PURE__*/React.createElement("div", {
      key: "m" + o.id,
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontWeight: 700,
        fontSize: 11.5,
        fontFamily: "ui-monospace, monospace"
      }
    }, o.id), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 15
      }
    }, o.client), url && /*#__PURE__*/React.createElement("a", {
      href: url,
      target: "_blank",
      rel: "noreferrer",
      style: {
        color: "#f59e0b",
        fontSize: 11,
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement(MapPin, {
      size: 11
    }), "map")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-flex items-center gap-1 rounded-full",
      style: {
        background: slaTone(t, o.sla) + "22",
        color: slaTone(t, o.sla),
        fontSize: 10.5,
        fontWeight: 800,
        padding: "3px 9px"
      }
    }, o.sla === "WARNING" && /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 11
    }), o.sla), canDelJob && /*#__PURE__*/React.createElement("button", {
      onClick: () => removeJob(o),
      title: "Delete job order",
      className: "grid place-items-center rounded-lg",
      style: {
        width: 28,
        height: 28,
        background: "transparent",
        border: `1px solid ${t.border}`,
        color: t.bad,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(X, {
      size: 14
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginBottom: 3
      }
    }, "Type"), canEditJob ? /*#__PURE__*/React.createElement("select", {
      value: o.type,
      onChange: e => setCell(o.id, "type", e.target.value),
      style: {
        ...cellSel,
        width: "100%"
      }
    }, JO_TYPES.map(x => /*#__PURE__*/React.createElement("option", {
      key: x,
      style: optStyle
    }, x))) : /*#__PURE__*/React.createElement("span", {
      style: roText
    }, o.type || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginBottom: 3
      }
    }, "Technician"), canEditJob ? /*#__PURE__*/React.createElement("select", {
      value: o.tech,
      onChange: e => setCell(o.id, "tech", e.target.value),
      style: {
        ...cellSel,
        width: "100%"
      }
    }, (o.tech && !JO_TECHS.includes(o.tech) ? [o.tech, ...JO_TECHS] : JO_TECHS).map(x => /*#__PURE__*/React.createElement("option", {
      key: x,
      style: optStyle
    }, x))) : /*#__PURE__*/React.createElement("span", {
      style: roText
    }, o.tech || "—")), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginBottom: 3
      }
    }, "Issue"), canEditJob ? /*#__PURE__*/React.createElement("select", {
      value: o.issue,
      onChange: e => setCell(o.id, "issue", e.target.value),
      style: {
        ...cellSel,
        width: "100%"
      }
    }, !CFG_ISSUES.includes(o.issue) && o.issue && /*#__PURE__*/React.createElement("option", {
      style: optStyle
    }, o.issue), CFG_ISSUES.map(x => /*#__PURE__*/React.createElement("option", {
      key: x,
      style: optStyle
    }, x))) : /*#__PURE__*/React.createElement("span", {
      style: roText
    }, o.issue || "—")), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginBottom: 3
      }
    }, "Solution"), canEditJob ? /*#__PURE__*/React.createElement("select", {
      value: o.solution,
      onChange: e => setCell(o.id, "solution", e.target.value),
      style: {
        ...cellSel,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      style: optStyle
    }, "\u2014 Select \u2014"), CFG_SOLUTIONS.map(x => /*#__PURE__*/React.createElement("option", {
      key: x,
      style: optStyle
    }, x))) : /*#__PURE__*/React.createElement("span", {
      style: roText
    }, o.solution || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginBottom: 3
      }
    }, "Status"), canEditJob ? /*#__PURE__*/React.createElement("select", {
      value: o.status,
      onChange: e => setCell(o.id, "status", e.target.value),
      style: {
        ...cellSel,
        width: "100%",
        color: statusTint(o.status),
        fontWeight: 700,
        background: statusTint(o.status) + "1e",
        border: `1px solid ${statusTint(o.status)}55`
      }
    }, ["Pending", "In Progress", "Completed"].map(x => /*#__PURE__*/React.createElement("option", {
      key: x,
      style: optStyle
    }, x))) : /*#__PURE__*/React.createElement("span", {
      className: "inline-flex rounded-full",
      style: {
        color: statusTint(o.status),
        fontWeight: 700,
        fontSize: 11,
        background: statusTint(o.status) + "1e",
        padding: "3px 9px"
      }
    }, o.status)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11,
        marginBottom: 3
      }
    }, "Res. hrs"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted,
        fontSize: 13,
        paddingTop: 6
      }
    }, o.resHrs != null ? o.resHrs : "—"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 10,
        fontSize: 11.5,
        color: t.textFaint
      }
    }, /*#__PURE__*/React.createElement("span", null, "Start: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, o.startDate || "—")), /*#__PURE__*/React.createElement("span", null, "Finish: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textMuted
      }
    }, o.finishDate || "—"))));
  }), pageRows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 14px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No job orders match your filters.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-4 py-3",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, total === 0 ? "0 of 0" : `${page * PAGE + 1}–${Math.min(total, page * PAGE + PAGE)} of ${total}`), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(p => Math.max(0, p - 1)),
    disabled: page === 0,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: page === 0 ? "not-allowed" : "pointer",
      opacity: page === 0 ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 15,
    style: {
      transform: "rotate(180deg)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(p => Math.min(pages - 1, p + 1)),
    disabled: page >= pages - 1,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: page >= pages - 1 ? "not-allowed" : "pointer",
      opacity: page >= pages - 1 ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 15
  }))))), creating && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setCreating(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 620,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, "New Job Order"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCreating(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Client name"), /*#__PURE__*/React.createElement("input", {
    value: draft.client,
    onChange: e => setDraft({
      ...draft,
      client: e.target.value
    }),
    placeholder: "e.g. Jinky Cabahug",
    style: {
      ...selBase,
      width: "100%",
      marginTop: 5
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Job type"), /*#__PURE__*/React.createElement("select", {
    value: draft.type,
    onChange: e => setDraft({
      ...draft,
      type: e.target.value
    }),
    style: {
      ...selBase,
      width: "100%",
      marginTop: 5
    }
  }, JO_TYPES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Assigned technician"), /*#__PURE__*/React.createElement("select", {
    value: draft.tech,
    onChange: e => setDraft({
      ...draft,
      tech: e.target.value
    }),
    style: {
      ...selBase,
      width: "100%",
      marginTop: 5
    }
  }, JO_TECHS.map(x => /*#__PURE__*/React.createElement("option", {
    key: x
  }, x)))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Issue / concern"), /*#__PURE__*/React.createElement("input", {
    value: draft.issue,
    onChange: e => setDraft({
      ...draft,
      issue: e.target.value
    }),
    list: "jo-issues2",
    placeholder: "Select or type an issue",
    style: {
      ...selBase,
      width: "100%",
      marginTop: 5
    }
  }), /*#__PURE__*/React.createElement("datalist", {
    id: "jo-issues2"
  }, CFG_ISSUES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    value: x
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Start date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: draft.startDate,
    onChange: e => setDraft({
      ...draft,
      startDate: e.target.value
    }),
    style: {
      ...selBase,
      width: "100%",
      marginTop: 5
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      color: t.textMuted,
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Start time"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: draft.startTime,
    onChange: e => setDraft({
      ...draft,
      startTime: e.target.value
    }),
    style: {
      ...selBase,
      width: "100%",
      marginTop: 5
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-4"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 11.5
    }
  }, "Created as ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, "Pending"), ". SLA ", CFG_SLA.standard, "h, warns ", CFG_SLA.warningLead, "h before deadline."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCreating(false),
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: create,
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "Create job order"))))));
}

/* ------------------------------------------------------------------ */
/*  JOB ORDER › OVERVIEW  (accomplishment + SLA dashboard)            */
/* ------------------------------------------------------------------ */
function JobOrderOverview({
  t
}) {
  const orders = seedOrders;
  const total = orders.length;
  const completed = orders.filter(o => o.status === "Completed").length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const inProgress = orders.filter(o => o.status === "In Progress").length;
  const evaluated = orders.filter(o => o.sla === "PASSED" || o.sla === "FAILED");
  const slaPassed = evaluated.filter(o => o.sla === "PASSED").length;
  const slaFailed = evaluated.filter(o => o.sla === "FAILED").length;
  const compliance = evaluated.length ? Math.round(slaPassed / evaluated.length * 1000) / 10 : 0;
  const warnings = orders.filter(o => o.sla === "WARNING").length;
  const cards = [{
    lbl: "Total job orders",
    val: total,
    foot: completed + " completed",
    c: t.warn
  }, {
    lbl: "Open jobs",
    val: pending + inProgress,
    foot: pending + " pending · " + inProgress + " in progress",
    c: t.accent
  }, {
    lbl: "SLA passed",
    val: slaPassed,
    foot: evaluated.length + " evaluated",
    c: t.good
  }, {
    lbl: "SLA failed",
    val: slaFailed,
    foot: "breached window",
    c: t.bad
  }, {
    lbl: "Compliance rate",
    val: compliance + "%",
    foot: CFG_SLA.standard + "h standard window",
    c: t.warn
  }, {
    lbl: "Active warnings",
    val: warnings,
    foot: "flagged tickets",
    c: t.bad
  }];
  const techs = JO_TECHS.filter(x => x !== NO_TECH);
  const score = techs.map(name => {
    const jobs = orders.filter(o => o.tech === name && o.type !== "Follow-up");
    const passed = jobs.filter(o => o.sla === "PASSED").length;
    const failed = jobs.filter(o => o.sla === "FAILED").length;
    const comp = jobs.length ? Math.round(passed / jobs.length * 1000) / 10 : 0;
    return {
      name,
      total: jobs.length,
      passed,
      failed,
      comp
    };
  }).sort((a, b) => b.total - a.total);
  const scoreColor = c => c >= 75 ? t.good : c >= 40 ? t.warn : t.bad;
  const fu = orders.filter(o => o.type === "Follow-up");
  const fuPassed = fu.filter(o => o.sla === "PASSED").length;
  const fuFailed = fu.filter(o => o.sla === "FAILED").length;
  const fuComp = fu.length ? Math.round(fuPassed / fu.length * 1000) / 10 : 0;
  const miniLbl = {
    color: t.textFaint,
    fontSize: 10.5,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5"
  }, cards.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.lbl,
    t: t,
    style: {
      padding: "14px 16px",
      borderLeft: `3px solid ${s.c}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: miniLbl
  }, s.lbl), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 30,
      fontWeight: 800,
      lineHeight: 1.1,
      margin: "6px 0 2px"
    }
  }, s.val), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12
    }
  }, s.foot)))), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t,
      icon: ShieldCheck
    }, "SLA compliance")
  }, "Technician Scorecard"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3.5 mt-1"
  }, score.map(s => {
    const c = scoreColor(s.comp);
    return /*#__PURE__*/React.createElement("div", {
      key: s.name,
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 88
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 13
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 10.5
      }
    }, s.total, " jobs \xB7 ", s.passed, "\u2713 ", s.failed, "\u2715")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 rounded-full",
      style: {
        height: 8,
        background: t.borderSoft
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-full",
      style: {
        height: 8,
        width: `${s.comp}%`,
        background: c,
        transition: "width .7s ease"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 46,
        textAlign: "right",
        color: c,
        fontWeight: 800,
        fontSize: 13
      }
    }, s.comp, "%"));
  }))), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t,
    right: /*#__PURE__*/React.createElement(Eyebrow, {
      t: t
    }, "Portfolio-wide")
  }, "Follow-up SLA (", CFG_SLA.followup, "h)"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.borderSoft}`,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: miniLbl
  }, "Total follow-ups"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 28,
      fontWeight: 800,
      marginTop: 6
    }
  }, fu.length)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.borderSoft}`,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: miniLbl
  }, "Compliance"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.good,
      fontSize: 28,
      fontWeight: 800,
      marginTop: 6
    }
  }, fuComp, "%")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.borderSoft}`,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: miniLbl
  }, "Passed (\u2264", CFG_SLA.followup, "h)"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.good,
      fontSize: 28,
      fontWeight: 800,
      marginTop: 6
    }
  }, fuPassed)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      background: t.surface2,
      border: `1px solid ${t.borderSoft}`,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: miniLbl
  }, "Failed (>", CFG_SLA.followup, "h)"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.bad,
      fontSize: 28,
      fontWeight: 800,
      marginTop: 6
    }
  }, fuFailed))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12,
      letterSpacing: "0.04em",
      paddingTop: 4
    }
  }, "TIONGTECH \xB7 We make things Faster, Easier, and Better."));
}

/* ------------------------------------------------------------------ */
/*  SUBSCRIBERS › CLIENTS  (with CSV import)                           */
/* ------------------------------------------------------------------ */
function parseCSV(text) {
  const s = String(text);
  const rows = [];
  let row = [],
    field = "",
    i = 0,
    inQ = false;
  while (i < s.length) {
    const c = s[i];
    if (inQ) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQ = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQ = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  const nonEmpty = rows.filter(r => r.some(x => String(x).trim() !== ""));
  if (!nonEmpty.length) return [];
  const alias = {
    "vlan id": "account_number",
    "vlan": "account_number",
    "vlan number": "account_number",
    "vlan #": "account_number",
    "name": "first_name",
    "phone #": "phone",
    "contact": "phone",
    "contact #": "phone",
    "coordinates ": "coordinates"
  };
  const headers = nonEmpty[0].map(h => {
    const k = h.trim().toLowerCase();
    return alias[k] || k;
  });
  return nonEmpty.slice(1).map(cells => {
    const o = {};
    headers.forEach((h, idx) => o[h] = (cells[idx] == null ? "" : String(cells[idx])).trim());
    return o;
  });
}

/* NAP cascade fields shared by Client + Vendo forms */
function NapCascade({
  t,
  draft,
  set,
  selStyle,
  lbl
}) {
  const pons = draft.olt ? Array.from({
    length: (olts.find(o => o.name === draft.olt) || {}).total_pon_ports || 0
  }, (_, i) => "PON " + (i + 1)) : [];
  const napsForOlt = napDevices.filter(n => n.olt === draft.olt);
  const ports = draft.nap ? Array.from({
    length: (napDevices.find(n => n.name === draft.nap) || {}).total_ports || 0
  }, (_, i) => String(i + 1)) : [];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "OLT Device"), /*#__PURE__*/React.createElement("select", {
    value: draft.olt || "",
    onChange: e => set({
      ...draft,
      olt: e.target.value,
      pon: "",
      nap: "",
      napPort: ""
    }),
    style: selStyle
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select OLT"), olts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.name
  }, o.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "PON Port"), /*#__PURE__*/React.createElement("select", {
    value: draft.pon || "",
    onChange: e => set({
      ...draft,
      pon: e.target.value
    }),
    disabled: !draft.olt,
    style: {
      ...selStyle,
      opacity: draft.olt ? 1 : 0.5
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, draft.olt ? "Select PON" : "Select OLT first"), pons.map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "NAP Device"), /*#__PURE__*/React.createElement("select", {
    value: draft.nap || "",
    onChange: e => set({
      ...draft,
      nap: e.target.value,
      napPort: ""
    }),
    disabled: !draft.olt,
    style: {
      ...selStyle,
      opacity: draft.olt ? 1 : 0.5
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, draft.olt ? "Select NAP" : "Select PON first"), napsForOlt.map(n => /*#__PURE__*/React.createElement("option", {
    key: n.name
  }, n.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "NAP Port"), /*#__PURE__*/React.createElement("select", {
    value: draft.napPort || "",
    onChange: e => set({
      ...draft,
      napPort: e.target.value
    }),
    disabled: !draft.nap,
    style: {
      ...selStyle,
      opacity: draft.nap ? 1 : 0.5
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, draft.nap ? "Select port" : "Select NAP first"), ports.map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p))))));
}
function isPeso(c) {
  return (c.area || "").toUpperCase().trim().startsWith("PESOWIFI");
}
function clientIsActive(c) {
  const p = (c.active_profile || "").trim().toLowerCase();
  return p !== "" && p !== "expired" && p !== "payment reminder";
}
function activeClientCount() {
  return clients.filter(c => !isPeso(c) && clientIsActive(c)).length;
}
function goalCurrent(g) {
  const s = (g.title || "").toLowerCase();
  if (/active\s*client/.test(s)) return activeClientCount();
  if (/net\s*income|income for \d|net\s*profit|profit for/.test(s)) return FIN_YEAR ? Math.round(FIN_YEAR.net) : Number(g.current) || 0;
  return Number(g.current) || 0;
}
function goalTarget(g) {
  if (g.target && Number(g.target) > 0) return Number(g.target);
  const s = g.title || "";
  if (/churn/i.test(s)) return 0;
  let mm = s.match(/(\d+(?:\.\d+)?)\s*[Mm]\b/);
  if (mm) return Math.round(parseFloat(mm[1]) * 1e6);
  mm = s.match(/(\d+(?:\.\d+)?)\s*[Kk]\b/);
  if (mm) return Math.round(parseFloat(mm[1]) * 1e3);
  mm = s.replace(/,/g, "").match(/\b(\d{3,})\b/);
  if (mm) return parseInt(mm[1], 10);
  return 0;
}
function nextJobId() {
  let max = 133210;
  seedOrders.forEach(o => {
    const n = parseInt(o.id, 10);
    if (!isNaN(n) && n >= max) max = n + 1;
  });
  return String(max);
}
function JobOrderCreateModal({
  t,
  clientName,
  onClose,
  onDone
}) {
  const [type, setType] = useState(JO_TYPES[0]);
  const [issue, setIssue] = useState("");
  const [tech, setTech] = useState(NO_TECH);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");
  const sel = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    marginTop: 5,
    colorScheme: t.name === "dark" ? "dark" : "light"
  };
  const opt = {
    background: t.surface,
    color: t.text
  };
  const lbl = {
    color: t.textMuted,
    fontSize: 11.5,
    fontWeight: 600
  };
  const btn = p => ({
    background: p ? t.accent : t.surface2,
    color: p ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
    border: p ? "none" : `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 14px",
    borderRadius: 11
  });
  const create = () => {
    const order = {
      id: nextJobId(),
      client: clientName,
      type,
      tech,
      issue,
      solution: "",
      startDate: date,
      startTime: time,
      finishDate: "",
      resHrs: null,
      status: "Pending",
      sla: "OK"
    };
    _save("create_job", _jobPayload(order));
    seedOrders.unshift(order);
    if (onDone) onDone(order);
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 71,
      width: "100%",
      maxWidth: 520,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, "New Job Order"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginBottom: 10
    }
  }, "For ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, clientName)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Job type"), /*#__PURE__*/React.createElement("select", {
    value: type,
    onChange: e => setType(e.target.value),
    style: sel
  }, JO_TYPES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: opt
  }, x)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Technician"), /*#__PURE__*/React.createElement("select", {
    value: tech,
    onChange: e => setTech(e.target.value),
    style: sel
  }, JO_TECHS.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: opt
  }, x)))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Issue"), /*#__PURE__*/React.createElement("select", {
    value: issue,
    onChange: e => setIssue(e.target.value),
    style: sel
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    style: opt
  }, "\u2014 Select \u2014"), CFG_ISSUES.map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    style: opt
  }, x)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Start date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: date,
    onChange: e => setDate(e.target.value),
    style: sel
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Start time"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: time,
    onChange: e => setTime(e.target.value),
    style: sel
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: create,
    style: btn(true)
  }, "Create job order"))));
}
function _pdate(s) {
  if (!s) return null;
  s = String(s).slice(0, 10);
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}
function _clampDay(y, m, day) {
  const last = new Date(y, m + 1, 0).getDate();
  return new Date(y, m, Math.min(day, last));
}
function clientDueDate(c) {
  // Source of truth = the actual due date synced from Taoki. Only estimate from the
  // subscription day-of-month when Taoki hasn't provided a due date.
  const synced = _pdate(c.due_date);
  if (synced) return synced;
  const sub = _pdate(c.subscription_date);
  if (!sub) return null;
  const day = sub.getDate();
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  let due = _clampDay(t.getFullYear(), t.getMonth(), day);
  const diff = Math.round((due - t) / 86400000);
  if (diff < -20) due = _clampDay(t.getFullYear(), t.getMonth() + 1, day);else if (diff > 20) due = _clampDay(t.getFullYear(), t.getMonth() - 1, day);
  return due;
}
function clientBillDate(c) {
  const due = clientDueDate(c);
  if (!due) return null;
  const b = new Date(due);
  b.setDate(b.getDate() - 10);
  return b;
}
function dueDays(c) {
  const due = clientDueDate(c);
  if (!due) return null;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return Math.round((due - t) / 86400000);
}
function sortRows(rows, accessor, dir) {
  if (!accessor) return rows;
  const arr = rows.slice();
  arr.sort((a, b) => {
    let va = accessor(a),
      vb = accessor(b);
    if (typeof va === "number" && typeof vb === "number") return va - vb;
    va = String(va == null ? "" : va);
    vb = String(vb == null ? "" : vb);
    return va.localeCompare(vb, undefined, {
      numeric: true,
      sensitivity: "base"
    });
  });
  if (dir === "desc") arr.reverse();
  return arr;
}
function useSort(initKey) {
  const [sortKey, setSortKey] = useState(initKey || "");
  const [sortDir, setSortDir] = useState("asc");
  const onSort = k => {
    if (sortKey === k) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  };
  return {
    sortKey,
    sortDir,
    onSort
  };
}
function SortTh({
  t,
  label,
  sortKey,
  sortDir,
  onSort,
  align
}) {
  const active = sortKey === label;
  return /*#__PURE__*/React.createElement("th", {
    onClick: () => onSort(label),
    title: "Click to sort",
    style: {
      textAlign: align || "left",
      padding: "10px 16px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`,
      cursor: "pointer",
      userSelect: "none",
      whiteSpace: "nowrap",
      color: active ? t.text : undefined
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 5,
      fontSize: 8.5,
      opacity: active ? 0.95 : 0.3
    }
  }, active ? sortDir === "asc" ? "▲" : "▼" : "⇅"));
}
function tenureMonthsOf(dateStr) {
  if (!dateStr) return -1;
  const start = new Date(String(dateStr).slice(0, 10));
  if (isNaN(start.getTime())) return -1;
  const now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months--;
  return months < 0 ? -1 : months;
}
function clientNoteInfo(c) {
  const active = typeof clientIsActive === "function" ? clientIsActive(c) : true;
  const lp = typeof lastPayments !== "undefined" && lastPayments ? lastPayments[c.account_number] : null;
  const monthsSince = tenureMonthsOf(lp || c.subscription_date);
  if (!active && monthsSince >= 6) return {
    text: "For Deletion",
    kind: "del"
  };
  const tm = tenureMonthsOf(c.subscription_date);
  if (tm >= 0 && tm <= 3) return {
    text: "VIP",
    kind: "vip",
    note: (c.notes || "").trim()
  };
  return {
    text: (c.notes || "").trim(),
    kind: "note"
  };
}
function fmtDate(d) {
  if (!d) return "—";
  const z = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
}
function tenureOf(dateStr) {
  if (!dateStr) return "—";
  const start = new Date(String(dateStr).slice(0, 10));
  if (isNaN(start.getTime())) return "—";
  const now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months--;
  if (months < 0) return "—";
  if (months < 1) return "New";
  const y = Math.floor(months / 12),
    m = months % 12;
  return (y > 0 ? y + " yr" : "") + (y > 0 && m > 0 ? " " : "") + (m > 0 ? m + " mo" : "");
}
function clientNoRecentPayment(c, months) {
  // true if the client has no payment on record within the last `months` months
  const lp = lastPayments[c.account_number];
  if (!lp) return true;
  const cut = new Date();
  cut.setMonth(cut.getMonth() - months);
  return String(lp).slice(0, 10) < fmtDate(cut);
}
function clientPaid(c) {
  // Renewed / paid is driven by Taoki's balance: owes money (balance > 0) = not paid; balance <= 0 = paid up.
  if (c.balance !== null && c.balance !== undefined && c.balance !== "") return Number(c.balance) <= 0;
  // Fallback when balance isn't synced yet: last payment on/after the bill date.
  const acct = c.account_number;
  if (!acct) return false;
  const lp = lastPayments[acct];
  if (!lp) return false;
  const bill = clientBillDate(c);
  if (!bill) return false;
  return String(lp).slice(0, 10) >= fmtDate(bill);
}
function clientDueInfo(c) {
  const n = dueDays(c);
  if (n === null) return {
    label: "—",
    color: null,
    date: null
  };
  const date = fmtDate(clientDueDate(c));
  if (n < 0) return {
    label: "Past due",
    color: "#ef4444",
    date,
    days: n
  };
  if (n === 0) return {
    label: "Due today",
    color: "#f59e0b",
    date,
    days: n
  };
  return {
    label: "Upcoming",
    color: "#22c55e",
    date,
    days: n
  };
}
function ClientProfile({
  t,
  client,
  onClose,
  pmode
}) {
  const [pays, setPays] = useState(null);
  const fullName = ((client.first_name || "") + " " + (client.last_name || "")).trim();
  useEffect(() => {
    if (pmode) {
      setPays([]);
      return;
    }
    let ok = true;
    if (window.__LIVE__) {
      API("client_payments", {
        account: client.account_number
      }).then(r => {
        if (ok) setPays(r && r.ok && r.payments ? r.payments : []);
      }).catch(() => {
        if (ok) setPays([]);
      });
    } else {
      setPays([]);
    }
    return () => {
      ok = false;
    };
  }, []);
  const jos = seedOrders.filter(j => (j.client || "").toLowerCase() === fullName.toLowerCase());
  const paidTotal = (pays || []).reduce((a, p) => a + (Number(p.amount) || 0), 0);
  const di = clientDueInfo(client);
  const status = client.billing_status || "";
  const statusColor = /active/i.test(status) ? t.good : /expired|disconnect/i.test(status) ? t.bad : t.textMuted;
  const info = [[pmode ? "VLAN #" : "Account #", client.account_number || "—"], ["Area", client.area || "—"], ["Plan / Profile", client.profile || "—"], ["MRC", client.mrc ? peso(client.mrc) : "—"], ["Phone", client.phone || "—"], ["Email", client.email || "—"], ["NAP", client.nap ? `${client.nap}${client.napPort ? " · p" + client.napPort : ""}` : "—"], [pmode ? "Date Installed" : "Subscription Date", client.subscription_date || "—"], ...(pmode ? [] : [["Bill Date", fmtDate(clientBillDate(client))], ["Due Date", fmtDate(clientDueDate(client))], ["PPPoE Username", client.pppoe_username || "—"], ["PPPoE Password", client.pppoe_password || "—"]])];
  const th = {
    textAlign: "left",
    padding: "8px 12px",
    fontWeight: 700,
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: t.textFaint,
    borderBottom: `1px solid ${t.border}`
  };
  const td = {
    padding: "8px 12px",
    fontSize: 12.5,
    color: t.textMuted,
    borderBottom: `1px solid ${t.borderSoft}`
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 81,
      width: "100%",
      maxWidth: 780,
      padding: 0,
      maxHeight: "90vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`,
      position: "sticky",
      top: 0,
      background: t.surface,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 17
    }
  }, fullName || "Client"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12,
      fontFamily: "ui-monospace, monospace"
    }
  }, client.account_number), status && /*#__PURE__*/React.createElement("span", {
    style: {
      color: statusColor,
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase"
    }
  }, "\xB7 ", status), !pmode && di.color && /*#__PURE__*/React.createElement("span", {
    className: "rounded-full",
    style: {
      background: di.color + "22",
      color: di.color,
      fontSize: 10.5,
      fontWeight: 800,
      padding: "2px 8px"
    }
  }, di.label, di.date ? " · " + di.date : ""))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3"
  }, info.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontWeight: 700
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 13,
      marginTop: 2
    }
  }, v))), client.address ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontWeight: 700
    }
  }, "Address"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 13,
      marginTop: 2
    }
  }, client.address)) : null), pmode ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Job Orders",
    value: jos.length,
    icon: ClipboardList,
    tone: "accent"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Paid",
    value: peso(paidTotal),
    icon: Banknote,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Payments",
    value: pays === null ? "…" : pays.length,
    icon: Receipt,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Job Orders",
    value: jos.length,
    icon: ClipboardList,
    tone: "accent"
  })), !pmode && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Payment history"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl mt-2",
    style: {
      border: `1px solid ${t.border}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 240,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "tt-desk",
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 480
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["Date", "Reference", "For", "Amount"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      ...th,
      textAlign: h === "Amount" ? "right" : "left",
      background: t.surface2,
      position: "sticky",
      top: 0
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, pays === null && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 4,
    style: {
      ...td,
      textAlign: "center"
    }
  }, "Loading\u2026")), pays && pays.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 4,
    style: {
      ...td,
      textAlign: "center",
      color: t.textFaint
    }
  }, "No payments recorded.")), pays && pays.map((p, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      whiteSpace: "nowrap"
    }
  }, (p.paid_at || "").slice(0, 10)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      fontFamily: "ui-monospace, monospace",
      fontSize: 11.5
    }
  }, p.reference || "—"), /*#__PURE__*/React.createElement("td", {
    style: td
  }, p.source || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      textAlign: "right",
      color: t.text,
      fontWeight: 600
    }
  }, peso(p.amount)))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column"
    }
  }, pays === null && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, "Loading\u2026"), pays && pays.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, "No payments recorded."), pays && pays.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      padding: "9px 12px",
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 12.5
    }
  }, (p.paid_at || "").slice(0, 10), " \xB7 ", p.source || "—"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      fontFamily: "ui-monospace, monospace"
    }
  }, p.reference || "—")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 13,
      flexShrink: 0
    }
  }, peso(p.amount)))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Job order history"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl mt-2",
    style: {
      border: `1px solid ${t.border}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "tt-desk",
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 480
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["JO #", "Type", "Issue", "Status", "Started"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      ...th,
      background: t.surface2
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, jos.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    style: {
      ...td,
      textAlign: "center",
      color: t.textFaint
    }
  }, "No job orders for this client.")), jos.map((j, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      fontFamily: "ui-monospace, monospace",
      fontSize: 11.5
    }
  }, j.id), /*#__PURE__*/React.createElement("td", {
    style: td
  }, j.type), /*#__PURE__*/React.createElement("td", {
    style: td
  }, j.issue || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      color: t.text
    }
  }, j.status), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      whiteSpace: "nowrap"
    }
  }, j.startDate))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column"
    }
  }, jos.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, "No job orders for this client."), jos.map((j, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "9px 12px",
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.accent,
      fontFamily: "ui-monospace, monospace",
      fontSize: 11.5
    }
  }, j.id), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.text,
      fontSize: 12
    }
  }, j.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12,
      marginTop: 2
    }
  }, j.type, " \xB7 ", j.issue || "—"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, j.startDate)))))))));
}
function IconCalendar(p) {
  const s = p && p.size || 16;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: p && p.style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 10h18"
  }));
}
function IconPencil(p) {
  const s = p && p.size || 16;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: p && p.style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 20h9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
  }));
}
function IconX(p) {
  const s = p && p.size || 16;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: p && p.style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  }));
}
function IconDownload(p) {
  const s = p && p.size || 16;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: p && p.style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "15",
    y2: "3"
  }));
}
function IconPrint(p) {
  const s = p && p.size || 16;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: p && p.style
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "8"
  }));
}
function _xlsCell(v) {
  if (v == null) return "";
  if (typeof v === "number") return String(v);
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function downloadXLS(filename, title, headers, rows) {
  const thead = "<tr>" + headers.map(h => `<th style="background:#1f6f6b;color:#fff;border:1px solid #999;padding:4px 8px;text-align:left">${_xlsCell(h)}</th>`).join("") + "</tr>";
  const body = rows.map(r => "<tr>" + r.map(c => {
    const num = typeof c === "number";
    return `<td style="border:1px solid #ccc;padding:3px 8px;${num ? "mso-number-format:'#,##0.00';text-align:right" : ""}">${_xlsCell(c)}</td>`;
  }).join("") + "</tr>").join("");
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">` + `<head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Report</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>` + `<body><h3>${_xlsCell(title)}</h3><table border="1" style="border-collapse:collapse;font-family:Arial;font-size:12px">${thead}${body}</table></body></html>`;
  const blob = new Blob(["\ufeff", html], {
    type: "application/vnd.ms-excel;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function downloadCSV(filename, headers, rows) {
  const _csvCell = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
  const lines = [headers.map(_csvCell).join(",")].concat(rows.map(r => r.map(_csvCell).join(",")));
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function printDoc(title, headers, rows) {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Please allow pop-ups to print.");
    return;
  }
  const esc = v => (v == null ? "" : String(v)).replace(/[&<>]/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  })[m]);
  const th = headers.map(h => "<th>" + esc(h) + "</th>").join("");
  const tr = rows.map(r => "<tr>" + r.map(c => "<td>" + esc(c) + "</td>").join("") + "</tr>").join("");
  const html = "<html><head><title>" + esc(title) + "</title><style>" + "body{font-family:Arial,Helvetica,sans-serif;padding:26px;color:#111}" + "h1{font-size:19px;margin:0 0 2px}.sub{color:#555;font-size:12px;margin-bottom:16px}" + "table{width:100%;border-collapse:collapse;font-size:12px}" + "th,td{border:1px solid #888;padding:6px 9px;text-align:left}th{background:#eee}" + "tfoot td{font-weight:bold}" + "</style></head><body>" + "<h1>TIONGTECH FIBER &mdash; " + esc(title) + "</h1>" + "<div class='sub'>San Luis, Agusan del Sur &middot; Generated " + esc(new Date().toLocaleString()) + " &middot; " + rows.length + " client(s)</div>" + "<table><thead><tr>" + th + "</tr></thead><tbody>" + tr + "</tbody></table>" + "</body></html>";
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => {
    try {
      w.print();
    } catch (e) {}
  }, 350);
}
function EntriesBar({
  t,
  size,
  setSize,
  total,
  from,
  to,
  page,
  setPage,
  pages,
  right
}) {
  const sel = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "5px 26px 5px 9px",
    fontSize: 12.5,
    outline: "none",
    cursor: "pointer",
    appearance: "auto"
  };
  const nav = dis => ({
    background: t.surface2,
    color: dis ? t.textFaint : t.textMuted,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "5px 10px",
    fontSize: 12,
    fontWeight: 700,
    cursor: dis ? "default" : "pointer"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-2",
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Show"), /*#__PURE__*/React.createElement("select", {
    value: String(size),
    onChange: e => {
      const v = e.target.value;
      setSize(v === "all" ? "all" : Number(v));
      if (setPage) setPage(0);
    },
    style: sel
  }, [10, 25, 50, 100].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n,
    style: {
      background: t.surface,
      color: t.text
    }
  }, n)), /*#__PURE__*/React.createElement("option", {
    value: "all",
    style: {
      background: t.surface,
      color: t.text
    }
  }, "All")), /*#__PURE__*/React.createElement("span", null, "entries"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      marginLeft: 6
    }
  }, total === 0 ? "· no entries" : `· ${from}\u2013${to} of ${total}`)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, right || null, pages > 1 && setPage ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(Math.max(0, page - 1)),
    disabled: page === 0,
    style: nav(page === 0)
  }, "Prev"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 12,
      padding: "0 4px"
    }
  }, page + 1, "/", pages), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(Math.min(pages - 1, page + 1)),
    disabled: page >= pages - 1,
    style: nav(page >= pages - 1)
  }, "Next")) : null));
}
// paginate a list against a size ("all" | number) + page; returns {slice, page, pages, from, to}
function prPaginate(list, size, page) {
  const total = list.length;
  const per = size === "all" ? Math.max(1, total) : size;
  const pages = Math.max(1, Math.ceil(total / per));
  const cur = Math.min(Math.max(0, page), pages - 1);
  const start = size === "all" ? 0 : cur * per;
  const end = size === "all" ? total : Math.min(total, start + per);
  return {
    slice: list.slice(start, end),
    page: cur,
    pages,
    from: total ? start + 1 : 0,
    to: end,
    total
  };
}
function ClientsView({
  t
}) {
  const [rows, setRows] = useState(clients.filter(c => !isPeso(c)));
  const [q, setQ] = useState("");
  const [areaF, setAreaF] = useState("All");
  const [statusF, setStatusF] = useState("All");
  const [showImport, setShowImport] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [csv, setCsv] = useState("");
  const [preview, setPreview] = useState([]);
  const [flash, setFlash] = useState("");
  const blankForm = {
    first_name: "",
    last_name: "",
    account_number: "",
    area: AREAS[0],
    address: "",
    phone: "",
    email: "",
    profile: PLANS[0],
    mrc: "",
    subscription_date: "",
    coordinates: "",
    olt: "",
    pon: "",
    nap: "",
    napPort: "",
    notes: ""
  };
  const [form, setForm] = useState(blankForm);
  const [joFor, setJoFor] = useState(null);
  const [editing, setEditing] = useState(null);
  const fullName = c => `${c.first_name} ${c.last_name}`.trim();
  const filtered = rows.filter(c => {
    if (areaF !== "All" && c.area !== areaF) return false;
    if (statusF !== "All") {
      const prof = (c.active_profile || "").trim().toLowerCase();
      const dd = dueDays(c);
      if (statusF === "pastdue" && !(dd !== null && dd < 0 && !clientPaid(c))) return false;
      if (statusF === "vip" && !(!clientPaid(c) && clientNoRecentPayment(c, 2) && prof !== "expired" && prof !== "payment reminder")) return false;
      if (statusF === "expired" && prof !== "expired") return false;
      if (statusF === "reminder" && prof !== "payment reminder") return false;
      if (statusF === "paid" && !clientPaid(c)) return false;
      if (statusF === "unpaid" && clientPaid(c)) return false;
    }
    const s = q.toLowerCase();
    return fullName(c).toLowerCase().includes(s) || (c.account_number || "").includes(q) || (c.area || "").toLowerCase().includes(s);
  });
  const mrcTotal = rows.reduce((a, c) => a + (Number(c.mrc) || 0), 0);
  const _cardPos = (ME.position || "").toLowerCase();
  const _hideClientCards = ME.role === "technician" || _cardPos === "technician" || _cardPos === "client service officer";
  const downloadClients = () => {
    const rep = {
      title: "Clients",
      file: "clients",
      columns: ["Account #", "Name", "Note", "Coordinates", "Area", "Address", "Phone", "MRC", "Balance", "Subscription Date", "Tenure", "Due Date", "Last Paid", "Status"],
      money: [7, 8],
      rows: filtered.map(c => [c.account_number || "", fullName(c), clientNoteInfo(c).text || "", c.coordinates || "", c.area || "", c.address || "", c.phone || "", Number(c.mrc) || 0, Number(c.balance) || 0, c.subscription_date || "", tenureOf(c.subscription_date), clientDueDate(c) ? fmtDate(clientDueDate(c)) : "", lastPayments[c.account_number] || "", clientPaid(c) ? "Paid" : "Unpaid"])
    };
    astExportExcel(rep).catch(() => astExportPrint(rep));
  };
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const {
    sortKey,
    sortDir,
    onSort
  } = useSort("");
  const _CLIENT_ACC = {
    "Client": c => (fullName(c) || "").toLowerCase(),
    "Note": c => (clientNoteInfo(c).text || "").toLowerCase(),
    "Coordinates": c => (c.coordinates || "").toLowerCase(),
    "Area": c => (c.area || "").toLowerCase(),
    "Plan / Profile": c => (c.profile || "").toLowerCase(),
    "MRC": c => Number(c.mrc) || 0,
    "Balance": c => Number(c.balance) || 0,
    "Subscription Date": c => c.subscription_date || "",
    "Tenure": c => tenureMonthsOf(c.subscription_date),
    "Due Date": c => {
      const d = clientDueDate(c);
      return d ? d.getTime() : 0;
    },
    "NAP": c => (c.nap || "").toLowerCase(),
    "Phone": c => (c.phone || "").toLowerCase()
  };
  const sorted = sortKey ? sortRows(filtered, _CLIENT_ACC[sortKey], sortDir) : filtered;
  const pg = prPaginate(sorted, size, page);
  const onFile = e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setCsv(String(r.result));
      setPreview(parseCSV(r.result));
    };
    r.readAsText(f);
  };
  const loadSample = () => {
    setCsv(SAMPLE_CSV);
    setPreview(parseCSV(SAMPLE_CSV));
  };
  const doImport = () => {
    const mapped = preview.map(row => ({
      first_name: row.first_name || "",
      last_name: row.last_name || "",
      account_number: row.account_number || "",
      area: row.area || "",
      address: row.address || "",
      phone: row.phone || "",
      email: row.email || "",
      profile: row.profile || "",
      mrc: Number(row.mrc || 0) || 0,
      subscription_date: row.subscription_date || "",
      coordinates: row.coordinates || "",
      olt: "",
      nap: "",
      napPort: "",
      notes: ""
    }));
    mapped.forEach(m => _save("create_client", m).then(r => {
      if (r && r.ok && r.id) m.id = r.id;
    }));
    setRows(rs => [...mapped, ...rs]);
    setShowImport(false);
    setCsv("");
    setPreview([]);
    setFlash(mapped.length + " client" + (mapped.length === 1 ? "" : "s") + " imported successfully");
    setTimeout(() => setFlash(""), 3500);
  };
  const saveClient = () => {
    if (!form.first_name.trim()) return;
    if (!window.confirm(editing ? "Save changes to this client?" : "Add this client?")) return;
    const rec = {
      ...form,
      mrc: Number(form.mrc) || 0
    };
    if (editing) {
      rec.id = editing.id;
      _save("update_client", rec);
      setRows(rs => rs.map(x => x === editing ? rec : x));
      setFlash("Client updated");
    } else {
      _save("create_client", rec).then(r => {
        if (r && r.ok && r.id) {
          rec.id = r.id;
          setRows(rs => rs.map(x => x === rec ? {
            ...rec
          } : x));
        }
      });
      setRows(rs => [rec, ...rs]);
      setFlash("Client added");
    }
    setForm(blankForm);
    setShowForm(false);
    setEditing(null);
    setTimeout(() => setFlash(""), 3000);
  };
  // _napChainOpen last: it fills the olt/pon the row cannot carry, so the cascade opens on the
  // saved chain instead of "Select...". Display only — neither field reaches a save.
  const startEdit = c => {
    setForm({
      ...blankForm,
      ...c,
      ..._napChainOpen(c)
    });
    setEditing(c);
    setShowForm(true);
  };
  const startAdd = () => {
    setForm(blankForm);
    setEditing(null);
    setShowForm(true);
  };
  const deleteClient = c => {
    if (!window.confirm("Delete " + fullName(c) + "?")) return;
    if (c.id) _save("delete_client", {
      id: c.id
    });
    setRows(rs => rs.filter(x => x !== c));
    setFlash("Client deleted");
    setTimeout(() => setFlash(""), 3000);
  };
  const [profile, setProfile] = useState(null);
  const btn = primary => ({
    background: primary ? t.accent : t.surface2,
    color: primary ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
    border: primary ? "none" : `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 14px",
    borderRadius: 11
  });
  const selStyle = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    marginTop: 5
  };
  const lbl = {
    color: t.textMuted,
    fontSize: 11.5,
    fontWeight: 600
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.goodSoft,
      color: t.good,
      padding: "10px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16
  }), flash), !_hideClientCards && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Total Clients",
    value: rows.length,
    icon: Users,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Areas",
    value: new Set(rows.map(c => c.area)).size,
    icon: MapPin,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Monthly Recurring",
    value: peso(mrcTotal),
    icon: Banknote,
    tone: "good",
    sub: "sum of MRC"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "ARPU",
    value: peso(Math.round(mrcTotal / (rows.length || 1))),
    icon: Gauge,
    tone: "accent"
  })), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center gap-3 px-4 py-3",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl flex-1",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 15,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search name, account #, area\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("select", {
    value: areaF,
    onChange: e => {
      setAreaF(e.target.value);
      setPage(0);
    },
    style: {
      ...selStyle,
      width: "auto",
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All areas"), AREAS.map(a => /*#__PURE__*/React.createElement("option", {
    key: a
  }, a))), /*#__PURE__*/React.createElement("select", {
    value: statusF,
    onChange: e => {
      setStatusF(e.target.value);
      setPage(0);
    },
    style: {
      ...selStyle,
      width: "auto",
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All statuses"), /*#__PURE__*/React.createElement("option", {
    value: "pastdue"
  }, "Overdue"), /*#__PURE__*/React.createElement("option", {
    value: "vip"
  }, "VIP Clients"), /*#__PURE__*/React.createElement("option", {
    value: "paid"
  }, "Paid"), /*#__PURE__*/React.createElement("option", {
    value: "unpaid"
  }, "Unpaid")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: downloadClients,
    className: "inline-flex items-center gap-1.5",
    style: btn(false)
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), canAdd("edit_clients") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowImport(true),
    className: "inline-flex items-center gap-1.5",
    style: btn(false)
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), "Import"), canAdd("edit_clients") && /*#__PURE__*/React.createElement("button", {
    onClick: startAdd,
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(UserPlus, {
    size: 15
  }), "Add Client"))), /*#__PURE__*/React.createElement(EntriesBar, {
    t: t,
    size: size,
    setSize: setSize,
    total: pg.total,
    from: pg.from,
    to: pg.to,
    page: pg.page,
    setPage: setPage,
    pages: pg.pages
  }), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 860
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["Client", "Note", "Coordinates", "Area", "Plan / Profile", "MRC", "Balance", "Subscription Date", "Tenure", "Due Date", "NAP", "Phone"].map(h => /*#__PURE__*/React.createElement(SortTh, {
    key: h,
    t: t,
    label: h,
    sortKey: sortKey,
    sortDir: sortDir,
    onSort: onSort,
    align: h === "MRC" ? "right" : "left"
  })), /*#__PURE__*/React.createElement("th", {
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, pg.slice.map((c, i) => {
    const di = clientDueInfo(c);
    return /*#__PURE__*/React.createElement("tr", {
      key: (c.account_number || "") + i,
      style: {
        borderBottom: `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 16px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setProfile(c),
      style: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 13
      }
    }, fullName(c) || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontSize: 11.5,
        fontFamily: "ui-monospace, monospace"
      }
    }, c.account_number || "—")), (() => {
      const ll = c.coordinates ? parseLatLng(c.coordinates) : null;
      return ll ? /*#__PURE__*/React.createElement("a", {
        href: `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`,
        target: "_blank",
        rel: "noreferrer",
        title: "Open location in Google Maps",
        style: {
          marginTop: 3,
          color: "#f59e0b",
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          fontSize: 11,
          fontWeight: 600,
          textDecoration: "none"
        }
      }, /*#__PURE__*/React.createElement(MapPin, {
        size: 12
      }), "map") : null;
    })()), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        fontSize: 12.5
      }
    }, (() => {
      const ni = clientNoteInfo(c);
      if (ni.kind === "del") return /*#__PURE__*/React.createElement("span", {
        className: "rounded-full",
        style: {
          background: t.bad + "22",
          color: t.bad,
          fontWeight: 800,
          fontSize: 11,
          padding: "3px 9px"
        }
      }, "For Deletion");
      if (ni.kind === "vip") return /*#__PURE__*/React.createElement("span", {
        className: "inline-flex items-center gap-1.5"
      }, /*#__PURE__*/React.createElement("span", {
        className: "rounded-full",
        style: {
          background: (t.violet || t.accent) + "22",
          color: t.violet || t.accent,
          fontWeight: 800,
          fontSize: 11,
          padding: "3px 9px"
        }
      }, "VIP"), ni.note ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.textMuted,
          fontSize: 12
        }
      }, ni.note) : null);
      return /*#__PURE__*/React.createElement("span", {
        style: {
          color: ni.text ? t.textMuted : t.textFaint
        }
      }, ni.text || "—");
    })()), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 12,
        fontFamily: "ui-monospace, monospace",
        whiteSpace: "nowrap"
      }
    }, c.coordinates || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 13
      }
    }, c.area), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 13
      }
    }, c.profile), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        textAlign: "right",
        fontSize: 13,
        fontWeight: 600,
        color: t.text
      }
    }, c.mrc ? peso(c.mrc) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        textAlign: "right",
        fontSize: 13,
        fontWeight: 700,
        color: (Number(c.balance) || 0) > 0 ? t.bad : t.textMuted
      }
    }, c.balance != null && c.balance !== "" ? peso(c.balance) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 13,
        whiteSpace: "nowrap"
      }
    }, c.subscription_date || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        fontSize: 12.5,
        fontWeight: 600,
        color: t.accent,
        whiteSpace: "nowrap"
      }
    }, tenureOf(c.subscription_date)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        whiteSpace: "nowrap"
      }
    }, di.color ? /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: di.color + "22",
        color: di.color,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px"
      }
    }, di.date) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 13
      }
    }, "\u2014")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 12.5
      }
    }, c.nap ? `${c.nap}${c.napPort ? " · p" + c.napPort : ""}` : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 16px",
        color: t.textMuted,
        fontSize: 13
      }
    }, c.phone || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "11px 10px",
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-3"
    }, can("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => setJoFor(c),
      title: "Create job order",
      style: {
        background: "transparent",
        border: "none",
        color: t.accent,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconCalendar, {
      size: 17
    })), can("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => startEdit(c),
      title: "Edit client",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 17
    })), canDel("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => deleteClient(c),
      title: "Delete client",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 17
    })), !can("edit_clients") && /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 12
      }
    }, "view"))));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 12,
    style: {
      padding: "24px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No clients match your search."))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 10
    }
  }, pg.slice.map((c, i) => {
    const di = clientDueInfo(c);
    const ni = clientNoteInfo(c);
    const ll = c.coordinates ? parseLatLng(c.coordinates) : null;
    return /*#__PURE__*/React.createElement("div", {
      key: (c.account_number || "") + "m" + i,
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setProfile(c),
      style: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 15
      }
    }, fullName(c) || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontSize: 12,
        fontFamily: "ui-monospace, monospace"
      }
    }, c.account_number || "—")), /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-3",
      style: {
        flexShrink: 0
      }
    }, can("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => setJoFor(c),
      title: "Create job order",
      style: {
        background: "transparent",
        border: "none",
        color: t.accent,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconCalendar, {
      size: 19
    })), can("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => startEdit(c),
      title: "Edit client",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 19
    })), canDel("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => deleteClient(c),
      title: "Delete client",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 19
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 8
      }
    }, ni.kind === "del" && /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: t.bad + "22",
        color: t.bad,
        fontWeight: 800,
        fontSize: 11,
        padding: "3px 9px"
      }
    }, "For Deletion"), ni.kind === "vip" && /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: (t.violet || t.accent) + "22",
        color: t.violet || t.accent,
        fontWeight: 800,
        fontSize: 11,
        padding: "3px 9px"
      }
    }, "VIP"), di.color && /*#__PURE__*/React.createElement("span", {
      className: "rounded-full",
      style: {
        background: di.color + "22",
        color: di.color,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px"
      }
    }, "Due ", di.date), ll && /*#__PURE__*/React.createElement("a", {
      href: `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`,
      target: "_blank",
      rel: "noreferrer",
      className: "rounded-full",
      style: {
        background: "#f59e0b22",
        color: "#f59e0b",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement(MapPin, {
      size: 11
    }), "map")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "7px 12px",
        marginTop: 10,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Area"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.area || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Plan"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.profile || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "MRC"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600
      }
    }, c.mrc ? peso(c.mrc) : "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Balance"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: (Number(c.balance) || 0) > 0 ? t.bad : t.textMuted,
        fontWeight: 700
      }
    }, c.balance != null && c.balance !== "" ? peso(c.balance) : "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "NAP"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.nap ? `${c.nap}${c.napPort ? " · p" + c.napPort : ""}` : "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Phone"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.phone || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Subscribed"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.subscription_date || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Tenure"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontWeight: 600
      }
    }, tenureOf(c.subscription_date)))), ni.text && ni.kind !== "del" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        color: t.textMuted,
        fontSize: 12
      }
    }, "\uD83D\uDCDD ", ni.text));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No clients match your search."))), showForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowForm(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 680,
      padding: 20,
      maxHeight: "88vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, editing ? "Edit Client" : "Add Client"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowForm(false);
      setEditing(null);
    },
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "First name"), /*#__PURE__*/React.createElement("input", {
    value: form.first_name,
    onChange: e => setForm({
      ...form,
      first_name: e.target.value
    }),
    placeholder: "e.g. Jinky",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Last name"), /*#__PURE__*/React.createElement("input", {
    value: form.last_name,
    onChange: e => setForm({
      ...form,
      last_name: e.target.value
    }),
    placeholder: "e.g. Cabahug",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Account number"), /*#__PURE__*/React.createElement("input", {
    value: form.account_number,
    onChange: e => setForm({
      ...form,
      account_number: e.target.value
    }),
    placeholder: "e.g. 208111523",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Area"), /*#__PURE__*/React.createElement("input", {
    value: form.area,
    onChange: e => setForm({
      ...form,
      area: e.target.value
    }),
    placeholder: "e.g. SL Balit",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Address"), /*#__PURE__*/React.createElement("input", {
    value: form.address,
    onChange: e => setForm({
      ...form,
      address: e.target.value
    }),
    placeholder: "Street, Barangay, City",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    value: form.phone,
    onChange: e => setForm({
      ...form,
      phone: e.target.value
    }),
    placeholder: "09xx xxx xxxx",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    value: form.email,
    onChange: e => setForm({
      ...form,
      email: e.target.value
    }),
    placeholder: "name@example.com",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Plan / Profile"), /*#__PURE__*/React.createElement("input", {
    value: form.profile,
    onChange: e => setForm({
      ...form,
      profile: e.target.value
    }),
    placeholder: "e.g. 50MBPS-ISP1",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Monthly rate (MRC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.mrc,
    onChange: e => setForm({
      ...form,
      mrc: e.target.value
    }),
    placeholder: "e.g. 1699",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Subscription date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.subscription_date,
    onChange: e => setForm({
      ...form,
      subscription_date: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Coordinates"), /*#__PURE__*/React.createElement("input", {
    value: form.coordinates,
    onChange: e => setForm({
      ...form,
      coordinates: e.target.value
    }),
    placeholder: "lat, long",
    style: selStyle
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 mb-2",
    style: {
      color: t.textMuted,
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }
  }, "NAP Details"), /*#__PURE__*/React.createElement(NapCascade, {
    t: t,
    draft: form,
    set: setForm,
    selStyle: selStyle,
    lbl: lbl
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Notes"), /*#__PURE__*/React.createElement("input", {
    value: form.notes,
    onChange: e => setForm({
      ...form,
      notes: e.target.value
    }),
    placeholder: "Optional notes about this client",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowForm(false);
      setEditing(null);
    },
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: saveClient,
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(UserPlus, {
    size: 15
  }), editing ? "Save changes" : "Add client")))), showImport && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowImport(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 660,
      padding: 20,
      maxHeight: "86vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.accentSoft,
      color: t.accent
    }
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 17
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Import clients")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowImport(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      lineHeight: 1.5,
      marginBottom: 12
    }
  }, "CSV columns: ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: t.accent
    }
  }, "first_name, last_name, account_number, area, address, phone, email, profile, mrc, subscription_date, coordinates"), "."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      ...btn(false),
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), "Choose CSV file", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".csv,text/csv",
    onChange: onFile,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: loadSample,
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: btn(false)
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 15
  }), "Load sample")), /*#__PURE__*/React.createElement("textarea", {
    value: csv,
    onChange: e => {
      setCsv(e.target.value);
      setPreview(parseCSV(e.target.value));
    },
    placeholder: "\u2026or paste CSV rows here",
    rows: 4,
    className: "w-full rounded-xl outline-none",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      padding: "10px 12px",
      fontSize: 12.5,
      fontFamily: "ui-monospace, monospace",
      resize: "vertical"
    }
  }), preview.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 12.5,
      fontWeight: 700,
      marginBottom: 6
    }
  }, preview.length, " rows ready"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      border: `1px solid ${t.border}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 180,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint
    }
  }, Object.keys(preview[0]).map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "7px 10px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surface2
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, preview.slice(0, 8).map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, Object.keys(preview[0]).map(h => /*#__PURE__*/React.createElement("td", {
    key: h,
    style: {
      padding: "7px 10px",
      color: t.textMuted,
      whiteSpace: "nowrap"
    }
  }, r[h]))))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowImport(false),
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: doImport,
    disabled: !preview.length,
    className: "inline-flex items-center gap-1.5",
    style: {
      ...btn(true),
      opacity: preview.length ? 1 : 0.5,
      cursor: preview.length ? "pointer" : "not-allowed"
    }
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), "Import ", preview.length || "", " clients")))), joFor && /*#__PURE__*/React.createElement(JobOrderCreateModal, {
    t: t,
    clientName: fullName(joFor),
    onClose: () => setJoFor(null),
    onDone: () => {
      setFlash("Job order created for " + fullName(joFor));
      setTimeout(() => setFlash(""), 3500);
    }
  }), profile && /*#__PURE__*/React.createElement(ClientProfile, {
    t: t,
    client: profile,
    onClose: () => setProfile(null)
  }));
}

/* ------------------------------------------------------------------ */
/*  SUBSCRIBERS › PESOWIFI                                             */
/* ------------------------------------------------------------------ */
function PesoWifi({
  t
}) {
  const [rows, setRows] = useState(clients.filter(c => isPeso(c)));
  const [q, setQ] = useState("");
  const [areaF, setAreaF] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [flash, setFlash] = useState("");
  const blankForm = {
    first_name: "",
    last_name: "",
    account_number: "",
    area: "PESOWIFI - ",
    address: "",
    phone: "",
    email: "",
    profile: "",
    mrc: "",
    subscription_date: "",
    coordinates: "",
    olt: "",
    pon: "",
    nap: "",
    napPort: "",
    notes: ""
  };
  const [form, setForm] = useState(blankForm);
  const [showImport, setShowImport] = useState(false);
  const [showPurge, setShowPurge] = useState(false);
  const [purgeText, setPurgeText] = useState("");
  const [purging, setPurging] = useState(false);
  const [importing, setImporting] = useState(false);
  const [csv, setCsv] = useState("");
  const [preview, setPreview] = useState([]);
  const [joFor, setJoFor] = useState(null);
  const [editing, setEditing] = useState(null);
  const onFile = e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setCsv(String(r.result));
      setPreview(parseCSV(r.result));
    };
    r.readAsText(f);
  };
  const withPesoArea = a => {
    a = (a || "").trim();
    return a.toUpperCase().startsWith("PESOWIFI") ? a : "PESOWIFI - " + a;
  };
  const doImport = async () => {
    const mapped = preview.map(row => ({
      first_name: row.first_name || "",
      last_name: row.last_name || "",
      account_number: row.account_number || "",
      area: withPesoArea(row.area),
      address: row.address || "",
      phone: row.phone || "",
      email: row.email || "",
      profile: row.profile || "",
      mrc: Number(row.mrc || 0) || 0,
      subscription_date: row.subscription_date || "",
      coordinates: row.coordinates || "",
      olt: "",
      nap: row.nap || "",
      napPort: row.napPort || row.port || "",
      notes: row.notes || ""
    }));
    if (!mapped.length) return;
    setImporting(true);
    try {
      const r = await API("create_clients_bulk", {
        rows: mapped
      });
      if (r && r.ok) {
        setShowImport(false);
        setCsv("");
        setPreview([]);
        setImporting(false);
        setFlash((r.imported || mapped.length) + " PESOWiFi account" + ((r.imported || mapped.length) === 1 ? "" : "s") + " imported");
        setTimeout(() => {
          window.location.reload();
        }, 900);
      } else {
        setImporting(false);
        setFlash(r && r.error || "Import failed.");
        setTimeout(() => setFlash(""), 5000);
      }
    } catch (e) {
      setImporting(false);
      setFlash("Import failed.");
      setTimeout(() => setFlash(""), 5000);
    }
  };
  const fullName = c => `${c.first_name || ""} ${c.last_name || ""}`.trim();
  const areas = Array.from(new Set(rows.map(c => c.area).filter(Boolean))).sort();
  const filtered = rows.filter(c => (areaF === "All" || c.area === areaF) && (fullName(c).toLowerCase().includes(q.toLowerCase()) || (c.account_number || "").includes(q) || (c.area || "").toLowerCase().includes(q.toLowerCase())));
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const pg = prPaginate(filtered, size, page);
  const save = () => {
    if (!form.first_name.trim()) return;
    if (!window.confirm(editing ? "Save changes to this PESOWiFi account?" : "Add this PESOWiFi account?")) return;
    let area = form.area.trim();
    if (!area.toUpperCase().startsWith("PESOWIFI")) area = "PESOWIFI - " + area;
    const rec = {
      ...form,
      area,
      mrc: Number(form.mrc) || 0
    };
    if (editing) {
      rec.id = editing.id;
      _save("update_client", rec);
      setRows(rs => rs.map(x => x === editing ? rec : x));
      setFlash("PESOWiFi account updated");
    } else {
      _save("create_client", rec).then(r => {
        if (r && r.ok && r.id) {
          rec.id = r.id;
          setRows(rs => rs.map(x => x === rec ? {
            ...rec
          } : x));
        }
      });
      setRows(rs => [rec, ...rs]);
      setFlash("PESOWiFi account added");
    }
    setForm(blankForm);
    setShowForm(false);
    setEditing(null);
    setTimeout(() => setFlash(""), 3000);
  };
  const startEdit = c => {
    setForm({
      ...blankForm,
      ...c
    });
    setEditing(c);
    setShowForm(true);
  };
  const startAdd = () => {
    setForm(blankForm);
    setEditing(null);
    setShowForm(true);
  };
  const del = c => {
    if (!window.confirm("Delete " + fullName(c) + "?")) return;
    if (c.id) _save("delete_client", {
      id: c.id
    });
    setRows(rs => rs.filter(x => x !== c));
    setFlash("Account deleted");
    setTimeout(() => setFlash(""), 3000);
  };
  const doPurge = async () => {
    setPurging(true);
    try {
      const r = await API("purge_pesowifi", {
        confirm: "DELETE"
      });
      if (r && r.ok) {
        setShowPurge(false);
        window.location.reload();
      } else {
        setPurging(false);
        setFlash(r && r.error || "Delete failed.");
        setTimeout(() => setFlash(""), 4000);
      }
    } catch (e) {
      setPurging(false);
      setFlash("Delete failed.");
      setTimeout(() => setFlash(""), 4000);
    }
  };
  const [profile, setProfile] = useState(null);
  const btn = primary => ({
    background: primary ? t.accent : t.surface2,
    color: primary ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
    border: primary ? "none" : `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 14px",
    borderRadius: 11
  });
  const selStyle = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    marginTop: 5
  };
  const lbl = {
    color: t.textMuted,
    fontSize: 11.5,
    fontWeight: 600
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.goodSoft,
      color: t.good,
      padding: "10px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16
  }), flash), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "PESOWiFi Accounts",
    value: rows.length,
    icon: Wifi,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Areas",
    value: new Set(rows.map(c => c.area)).size,
    icon: MapPin,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "With NAP",
    value: rows.filter(c => c.nap).length,
    icon: Network,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "With coordinates",
    value: rows.filter(c => c.coordinates).length,
    icon: MapPin,
    tone: "good"
  })), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center gap-3 px-4 py-3",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl flex-1",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 15,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search name, account #, area\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("select", {
    value: areaF,
    onChange: e => setAreaF(e.target.value),
    style: {
      ...selStyle,
      width: "auto",
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All areas"), areas.map(a => /*#__PURE__*/React.createElement("option", {
    key: a
  }, a))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const esc = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
      const head = ["VLAN #", "Name", "Area", "Address", "Phone", "Coordinates", "NAP", "Date Installed"];
      const lines = filtered.map(c => [c.account_number, `${c.first_name || ""} ${c.last_name || ""}`.trim(), c.area, c.address, c.phone, c.coordinates, c.nap, c.subscription_date].map(esc).join(","));
      const csv = [head.join(","), ...lines].join("\n");
      const url = URL.createObjectURL(new Blob([csv], {
        type: "text/csv;charset=utf-8"
      }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `pesowifi_${fmtDate(new Date())}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
    className: "inline-flex items-center gap-1.5",
    style: btn(false)
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 15
  }), "Download"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowImport(true),
    className: "inline-flex items-center gap-1.5",
    style: btn(false)
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), "Import"), ME.role === "owner" && rows.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPurgeText("");
      setShowPurge(true);
    },
    className: "inline-flex items-center gap-1.5",
    style: {
      ...btn(false),
      color: t.bad,
      borderColor: t.bad + "66"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 15
  }), "Delete all"), canAdd("edit_clients") && /*#__PURE__*/React.createElement("button", {
    onClick: startAdd,
    className: "inline-flex items-center gap-1.5",
    style: btn(true)
  }, /*#__PURE__*/React.createElement(UserPlus, {
    size: 15
  }), "Add PESOWiFi")), /*#__PURE__*/React.createElement(EntriesBar, {
    t: t,
    size: size,
    setSize: setSize,
    total: pg.total,
    from: pg.from,
    to: pg.to,
    page: pg.page,
    setPage: setPage,
    pages: pg.pages
  }), /*#__PURE__*/React.createElement("div", {
    className: "tt-desk",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 860
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, ["VLAN #", "Client", "Area", "Address", "NAP", "Date Installed", "Phone"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "10px 16px",
      fontWeight: 700,
      borderBottom: `1px solid ${t.border}`
    }
  }, h)), /*#__PURE__*/React.createElement("th", {
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, pg.slice.map((c, i) => /*#__PURE__*/React.createElement("tr", {
    key: (c.account_number || "") + i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      fontSize: 12,
      fontFamily: "ui-monospace, monospace"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setProfile(c),
    style: {
      background: "transparent",
      border: "none",
      color: t.accent,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: "inherit",
      padding: 0
    }
  }, c.account_number || "—")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      fontWeight: 600,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setProfile(c),
    style: {
      background: "transparent",
      border: "none",
      color: t.text,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13,
      padding: 0,
      textAlign: "left"
    }
  }, fullName(c)), (() => {
    const ll = c.coordinates ? parseLatLng(c.coordinates) : null;
    return ll ? /*#__PURE__*/React.createElement("a", {
      href: `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`,
      target: "_blank",
      rel: "noreferrer",
      title: "Open location in Google Maps",
      style: {
        color: "#f59e0b",
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11,
        fontWeight: 600,
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement(MapPin, {
      size: 12
    }), "map") : null;
  })())), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, c.area), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, c.address || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 12.5
    }
  }, c.nap ? `${c.nap}${c.napPort ? " · p" + c.napPort : ""}` : "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, c.subscription_date || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 16px",
      color: t.textMuted,
      fontSize: 13
    }
  }, c.phone || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 10px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-3"
  }, can("edit_clients") && /*#__PURE__*/React.createElement("button", {
    onClick: () => setJoFor(c),
    title: "Create job order",
    style: {
      background: "transparent",
      border: "none",
      color: t.accent,
      cursor: "pointer",
      padding: 2,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 17
  })), can("edit_clients") && /*#__PURE__*/React.createElement("button", {
    onClick: () => startEdit(c),
    title: "Edit account",
    style: {
      background: "transparent",
      border: "none",
      color: t.textMuted,
      cursor: "pointer",
      padding: 2,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconPencil, {
    size: 17
  })), canDel("edit_clients") && /*#__PURE__*/React.createElement("button", {
    onClick: () => del(c),
    title: "Delete",
    style: {
      background: "transparent",
      border: "none",
      color: t.bad,
      cursor: "pointer",
      padding: 2,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 17
  })), !can("edit_clients") && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "view"))))), filtered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 8,
    style: {
      padding: "24px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No PESOWiFi accounts match your search."))))), /*#__PURE__*/React.createElement("div", {
    className: "tt-mob",
    style: {
      flexDirection: "column",
      gap: 10
    }
  }, pg.slice.map((c, i) => {
    const ll = c.coordinates ? parseLatLng(c.coordinates) : null;
    return /*#__PURE__*/React.createElement("div", {
      key: (c.account_number || "") + "m" + i,
      style: {
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setProfile(c),
      style: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 700,
        fontSize: 15
      }
    }, fullName(c) || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.accent,
        fontSize: 12,
        fontFamily: "ui-monospace, monospace"
      }
    }, "VLAN ", c.account_number || "—")), /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-3",
      style: {
        flexShrink: 0
      }
    }, can("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => setJoFor(c),
      title: "Create job order",
      style: {
        background: "transparent",
        border: "none",
        color: t.accent,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconCalendar, {
      size: 19
    })), can("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => startEdit(c),
      title: "Edit account",
      style: {
        background: "transparent",
        border: "none",
        color: t.textMuted,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 19
    })), canDel("edit_clients") && /*#__PURE__*/React.createElement("button", {
      onClick: () => del(c),
      title: "Delete",
      style: {
        background: "transparent",
        border: "none",
        color: t.bad,
        cursor: "pointer",
        padding: 2,
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(IconX, {
      size: 19
    })))), ll && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`,
      target: "_blank",
      rel: "noreferrer",
      className: "rounded-full",
      style: {
        background: "#f59e0b22",
        color: "#f59e0b",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement(MapPin, {
      size: 11
    }), "map")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "7px 12px",
        marginTop: 10,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Area"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.area || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "NAP"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.nap ? `${c.nap}${c.napPort ? " · p" + c.napPort : ""}` : "—")), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Address"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.address || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Installed"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.subscription_date || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11
      }
    }, "Phone"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textMuted
      }
    }, c.phone || "—"))));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "No PESOWiFi accounts match your search."))), showImport && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowImport(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 680,
      padding: 20,
      maxHeight: "88vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Import PESOWiFi accounts (CSV)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowImport(false),
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      lineHeight: 1.6,
      marginBottom: 12
    }
  }, "Columns supported: ", /*#__PURE__*/React.createElement("b", null, "VLAN #"), " (or account_number), first_name, last_name, area, address, phone, email, profile, mrc, subscription_date, coordinates, nap, napPort. The area gets a ", /*#__PURE__*/React.createElement("b", null, "PESOWIFI -"), " prefix automatically if missing."), /*#__PURE__*/React.createElement("label", {
    className: "inline-flex items-center gap-1.5 rounded-xl",
    style: {
      ...btn(false),
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), "Choose CSV file", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".csv,text/csv",
    onChange: onFile,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement("textarea", {
    value: csv,
    onChange: e => {
      setCsv(e.target.value);
      setPreview(parseCSV(e.target.value));
    },
    placeholder: "\u2026or paste CSV rows here",
    rows: 4,
    className: "w-full rounded-xl outline-none mt-3",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      padding: "10px 12px",
      fontSize: 12.5,
      fontFamily: "ui-monospace, monospace",
      resize: "vertical"
    }
  }), preview.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 12.5,
      fontWeight: 700,
      marginBottom: 6
    }
  }, preview.length, " rows ready"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl",
    style: {
      border: `1px solid ${t.border}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 180,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: t.textFaint
    }
  }, Object.keys(preview[0]).map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "7px 10px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surface2
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, preview.slice(0, 8).map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: `1px solid ${t.borderSoft}`
    }
  }, Object.keys(preview[0]).map(h => /*#__PURE__*/React.createElement("td", {
    key: h,
    style: {
      padding: "7px 10px",
      color: t.textMuted,
      whiteSpace: "nowrap"
    }
  }, r[h]))))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowImport(false),
    disabled: importing,
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: doImport,
    disabled: preview.length === 0 || importing,
    style: {
      ...btn(true),
      opacity: preview.length === 0 || importing ? 0.5 : 1,
      cursor: preview.length === 0 || importing ? "not-allowed" : "pointer"
    }
  }, importing ? "Importing…" : `Import ${preview.length || ""} accounts`)))), showPurge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => !purging && setShowPurge(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      padding: 22,
      width: "min(480px, 92vw)",
      border: `1px solid ${t.bad}66`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.bad,
      fontWeight: 800,
      fontSize: 16
    }
  }, "\u26A0\uFE0F Delete ALL PESOWiFi accounts"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 13,
      lineHeight: 1.65,
      marginTop: 8
    }
  }, "This permanently deletes ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, rows.length), " PESOWiFi account", rows.length === 1 ? "" : "s", " from the database. ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, "This cannot be undone.")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      lineHeight: 1.6,
      marginTop: 8
    }
  }, "Please ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, "Download a backup first"), " if you haven't. Payment/income history is not affected \u2014 only the account records are removed."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.text,
      fontSize: 12.5,
      marginTop: 12,
      marginBottom: 4
    }
  }, "Type ", /*#__PURE__*/React.createElement("b", null, "DELETE"), " to confirm:"), /*#__PURE__*/React.createElement("input", {
    value: purgeText,
    onChange: e => setPurgeText(e.target.value),
    placeholder: "DELETE",
    style: selStyle
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowPurge(false),
    disabled: purging,
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: doPurge,
    disabled: purging || purgeText !== "DELETE",
    style: {
      ...btn(true),
      background: t.bad,
      opacity: purging || purgeText !== "DELETE" ? 0.5 : 1,
      cursor: purging || purgeText !== "DELETE" ? "not-allowed" : "pointer"
    }
  }, purging ? "Deleting…" : "Delete all")))), showForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowForm(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 61,
      width: "100%",
      maxWidth: 680,
      padding: 20,
      maxHeight: "88vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 15
    }
  }, editing ? "Edit PESOWiFi account" : "Add PESOWiFi account"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowForm(false);
      setEditing(null);
    },
    className: "grid place-items-center rounded-lg",
    style: {
      width: 32,
      height: 32,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "First name"), /*#__PURE__*/React.createElement("input", {
    value: form.first_name,
    onChange: e => setForm({
      ...form,
      first_name: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Last name"), /*#__PURE__*/React.createElement("input", {
    value: form.last_name,
    onChange: e => setForm({
      ...form,
      last_name: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "VLAN number"), /*#__PURE__*/React.createElement("input", {
    value: form.account_number,
    onChange: e => setForm({
      ...form,
      account_number: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Area (keep the PESOWIFI - prefix)"), /*#__PURE__*/React.createElement("input", {
    value: form.area,
    onChange: e => setForm({
      ...form,
      area: e.target.value
    }),
    placeholder: "PESOWIFI - BARANGAY",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Address"), /*#__PURE__*/React.createElement("input", {
    value: form.address,
    onChange: e => setForm({
      ...form,
      address: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    value: form.phone,
    onChange: e => setForm({
      ...form,
      phone: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Subscription date"), /*#__PURE__*/React.createElement("input", {
    value: form.subscription_date,
    onChange: e => setForm({
      ...form,
      subscription_date: e.target.value
    }),
    placeholder: "YYYY-MM-DD",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Coordinates"), /*#__PURE__*/React.createElement("input", {
    value: form.coordinates,
    onChange: e => setForm({
      ...form,
      coordinates: e.target.value
    }),
    placeholder: "lat, long",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "NAP"), /*#__PURE__*/React.createElement("input", {
    value: form.nap,
    onChange: e => setForm({
      ...form,
      nap: e.target.value
    }),
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "NAP port"), /*#__PURE__*/React.createElement("input", {
    value: form.napPort,
    onChange: e => setForm({
      ...form,
      napPort: e.target.value
    }),
    style: selStyle
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowForm(false);
      setEditing(null);
    },
    style: btn(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    style: btn(true)
  }, editing ? "Save changes" : "Save account")))), joFor && /*#__PURE__*/React.createElement(JobOrderCreateModal, {
    t: t,
    clientName: fullName(joFor),
    onClose: () => setJoFor(null),
    onDone: () => {
      setFlash("Job order created for " + fullName(joFor));
      setTimeout(() => setFlash(""), 3500);
    }
  }), profile && /*#__PURE__*/React.createElement(ClientProfile, {
    t: t,
    client: profile,
    onClose: () => setProfile(null),
    pmode: true
  }));
}

/* ------------------------------------------------------------------ */
/*  JOB ORDER › MAP COVERAGE  (coverage schematic)                     */
/* ------------------------------------------------------------------ */
function parseLatLng(s) {
  if (!s) return null;
  s = String(s).trim();
  // DMS format, e.g. 8°56'09.3"N 125°36'31.5"E  (three numbers + a N/S/E/W direction, per coordinate)
  const re = /(\d+(?:\.\d+)?)\D+(\d+(?:\.\d+)?)\D+(\d+(?:\.\d+)?)\D*?([NSEW])/gi;
  const hits = [];
  let m;
  while ((m = re.exec(s)) !== null) hits.push(m);
  if (hits.length >= 2) {
    let lat = null,
      lng = null;
    hits.forEach(h => {
      let v = parseFloat(h[1]) + parseFloat(h[2]) / 60 + parseFloat(h[3]) / 3600;
      const dir = h[4].toUpperCase();
      if (dir === "S" || dir === "W") v = -v;
      if (dir === "N" || dir === "S") lat = v;else lng = v;
    });
    if (lat != null && lng != null && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return [lat, lng];
  }
  // decimal format: first two signed decimals ("8.45, 125.78", "8.45 125.78", "8.45°N 125.78°E", …)
  const nums = s.match(/-?\d{1,3}(?:\.\d+)?/g);
  if (!nums || nums.length < 2) return null;
  const lat = parseFloat(nums[0]),
    lng = parseFloat(nums[1]);
  if (isNaN(lat) || isNaN(lng)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return [lat, lng];
}
function TechLocationToggle({
  t
}) {
  const [sharing, setSharing] = useState(() => localStorage.getItem("tt_sharing") === "1");
  const [err, setErr] = useState("");
  const watchRef = useRef(null);
  const lastRef = useRef(null);
  const post = coords => {
    const p = coords ? {
      lat: coords.latitude,
      lng: coords.longitude,
      accuracy: coords.accuracy,
      sharing: 1
    } : {
      sharing: 0
    };
    API("update_location", p).catch(() => {});
  };
  useEffect(() => {
    localStorage.setItem("tt_sharing", sharing ? "1" : "0");
    if (!sharing) {
      if (watchRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchRef.current);
        watchRef.current = null;
      }
      post(null); // tell the server sharing is off
      return;
    }
    if (!navigator.geolocation) {
      setErr("This device can't share location.");
      setSharing(false);
      return;
    }
    setErr("");
    watchRef.current = navigator.geolocation.watchPosition(pos => {
      lastRef.current = pos.coords;
      setErr("");
      post(pos.coords);
    }, e => {
      setErr(e && e.code === 1 ? "Location permission denied — allow it in your browser, then try again." : "Can't get your location right now.");
    }, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 20000
    });
    // heartbeat: resend the last known spot every 25s so the office map stays fresh even if the watcher goes quiet
    const hb = setInterval(() => {
      if (lastRef.current) post(lastRef.current);
    }, 25000);
    return () => {
      clearInterval(hb);
      if (watchRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchRef.current);
        watchRef.current = null;
      }
    };
  }, [sharing]);
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => setSharing(s => !s),
    title: err || (sharing ? "Your location is being shared with the office" : "Share your location with the office"),
    className: "rounded-xl",
    style: {
      height: 40,
      padding: "0 12px",
      gap: 6,
      display: "inline-flex",
      alignItems: "center",
      background: sharing ? "rgba(34,197,94,0.14)" : t.surface2,
      border: `1px solid ${sharing ? t.good : t.border}`,
      color: sharing ? t.good : t.textMuted,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, sharing ? "Sharing location" : "Share location"));
}
function LocationGate({
  t
}) {
  const isFieldStaff = ME.role === "technician" || ["technician", "client service officer"].includes(String(ME.position || "").toLowerCase());
  const [active, setActive] = useState(false);
  const [err, setErr] = useState("");
  const activeRef = useRef(false);
  const watchRef = useRef(null);
  const lastRef = useRef(null);
  const mark = v => {
    activeRef.current = v;
    setActive(v);
  };
  const post = coords => API("update_location", coords ? {
    lat: coords.latitude,
    lng: coords.longitude,
    accuracy: coords.accuracy,
    sharing: 1
  } : {
    sharing: 0
  }).catch(() => {});
  const beginWatch = () => {
    if (watchRef.current != null || !navigator.geolocation) return;
    watchRef.current = navigator.geolocation.watchPosition(pos => {
      lastRef.current = pos.coords;
      setErr("");
      mark(true);
      post(pos.coords);
    }, e => {
      if (e && e.code === 1) {
        mark(false);
        setErr("Location was turned off or blocked. Please allow it again to continue.");
      }
    }, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 20000
    });
  };
  const enable = () => {
    setErr("");
    if (!navigator.geolocation) {
      setErr("This device can't provide a location.");
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      lastRef.current = pos.coords;
      mark(true);
      post(pos.coords);
      beginWatch();
    }, e => {
      setErr(e && e.code === 1 ? "You blocked location. Open your browser's site settings, allow Location for this site, then tap Enable again." : "Couldn't get a location fix. Turn on your phone's GPS/Location, then tap Enable again.");
    }, {
      enableHighAccuracy: true,
      timeout: 20000
    });
  };
  useEffect(() => {
    if (!isFieldStaff) return;
    const hb = setInterval(() => {
      if (activeRef.current && lastRef.current) post(lastRef.current);
    }, 25000); // keep-alive
    let permObj = null;
    // Do NOT auto-enable — the gate stays visible until the person actually taps "Enable".
    // We only watch permission so we can re-block instantly if location is switched off mid-session.
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({
        name: "geolocation"
      }).then(st => {
        permObj = st;
        st.onchange = () => {
          if (st.state !== "granted") {
            mark(false);
            if (watchRef.current != null && navigator.geolocation) {
              navigator.geolocation.clearWatch(watchRef.current);
              watchRef.current = null;
            }
            setErr("Location was turned off. Tap Enable to continue.");
          }
        };
      }).catch(() => {});
    }
    return () => {
      clearInterval(hb);
      if (watchRef.current != null && navigator.geolocation) navigator.geolocation.clearWatch(watchRef.current);
      if (permObj) permObj.onchange = null;
    };
  }, [isFieldStaff]);
  if (!isFieldStaff || active) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(8,12,18,0.98)",
      display: "grid",
      placeItems: "center",
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 400,
      textAlign: "center",
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 18,
      padding: "34px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 64,
      height: 64,
      borderRadius: 999,
      background: "rgba(44,201,228,0.14)",
      margin: "0 auto 16px"
    }
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 30,
    color: t.accent
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: t.text,
      fontSize: 19,
      fontWeight: 800,
      margin: "0 0 8px"
    }
  }, "Turn on location to continue"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: t.textMuted,
      fontSize: 13.5,
      lineHeight: 1.55,
      margin: "0 0 20px"
    }
  }, "Your account must share its location while on duty. Tap the button below and choose ", /*#__PURE__*/React.createElement("b", null, "Allow"), ". Make sure your phone's GPS/Location is switched on."), /*#__PURE__*/React.createElement("button", {
    onClick: enable,
    style: {
      width: "100%",
      padding: 14,
      border: 0,
      borderRadius: 12,
      background: t.accent,
      color: "#fff",
      fontSize: 15,
      fontWeight: 800,
      cursor: "pointer"
    }
  }, "Enable location"), err && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      color: t.bad,
      fontSize: 12.5,
      lineHeight: 1.5
    }
  }, err)));
}
function pinIcon(color, scale = 1) {
  const w = Math.round(14 * scale),
    h = Math.round(19 * scale);
  return window.L.divIcon({
    className: "",
    html: '<svg width="' + w + '" height="' + h + '" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 22 12 22s12-13.6 12-22C24 5.4 18.6 0 12 0z" fill="' + color + '" stroke="#ffffff" stroke-width="1.5"/><circle cx="12" cy="12" r="4.5" fill="#ffffff"/></svg>',
    iconSize: [w, h],
    iconAnchor: [Math.round(w / 2), h],
    popupAnchor: [0, -(h - 1)]
  });
}
function MapCoverage({
  t
}) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const [mapH, setMapH] = useState(null); // measured fill height (px); null until first measure
  const [techs, setTechs] = useState([]); // live technician positions
  const [trails, setTrails] = useState([]); // today's movement trail per technician
  const [filter, setFilter] = useState("all"); // all | nap | sub | peso | tech
  const napLayerRef = useRef(null);
  const subLayerRef = useRef(null);
  const pesoLayerRef = useRef(null);
  const techLayerRef = useRef(null);
  const trailLayerRef = useRef(null);
  const canMonitor = ME.role === "owner" || ME.role === "admin"; // only owner/admin monitor technicians

  const naps = napDevices.map(n => ({
    ...n,
    ll: parseLatLng(n.coordinates)
  })).filter(n => n.ll);
  const subs = clients.map(c => ({
    ...c,
    ll: parseLatLng(c.coordinates),
    peso: isPeso(c)
  })).filter(c => c.ll);
  const napByName = {};
  naps.forEach(n => {
    napByName[n.name] = n;
  });
  const linked = subs.filter(c => c.nap && napByName[c.nap]).length;
  const pesoCount = subs.filter(c => c.peso).length;
  useEffect(() => {
    const L = window.L;
    if (!L || !elRef.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    const map = L.map(elRef.current, {
      scrollWheelZoom: true
    });
    mapRef.current = map;
    napLayerRef.current = L.layerGroup().addTo(map);
    subLayerRef.current = L.layerGroup().addTo(map);
    pesoLayerRef.current = L.layerGroup().addTo(map);
    trailLayerRef.current = L.layerGroup().addTo(map); // technician daily trails (drawn beneath markers)
    techLayerRef.current = L.layerGroup().addTo(map); // holds live technician markers
    const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap"
    });
    const satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      attribution: "Tiles &copy; Esri"
    });
    const labels = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19
    });
    const hybrid = L.layerGroup([satellite, labels]);
    street.addTo(map);
    L.control.layers({
      "Street": street,
      "Satellite": hybrid
    }, {}, {
      position: "topright",
      collapsed: false
    }).addTo(map);
    const all = [];
    // nudge markers that share the same spot so co-located units (e.g. two PESOWiFi on one pole) don't hide each other
    const seen = {};
    const spread = ll => {
      const key = ll[0].toFixed(5) + "," + ll[1].toFixed(5);
      const k = seen[key] || 0;
      seen[key] = k + 1;
      if (!k) return ll;
      const ang = k * 2.399963,
        r = 0.00006 * (Math.floor(k / 8) + 1); // golden-angle spiral, ~6.5m steps
      return [ll[0] + r * Math.cos(ang), ll[1] + r * Math.sin(ang)];
    };
    subs.forEach(c => {
      const n = c.nap && napByName[c.nap];
      if (n) L.polyline([c.ll, n.ll], {
        color: "#d946ef",
        weight: 1,
        opacity: 0.45
      }).addTo(subLayerRef.current);
    });
    subs.forEach(c => {
      const pos = spread(c.ll);
      L.marker(pos, {
        icon: pinIcon(c.peso ? "#ef4444" : "#22c55e")
      }).addTo(c.peso ? pesoLayerRef.current : subLayerRef.current).bindPopup("<b>" + ((c.first_name || "") + " " + (c.last_name || "")).trim() + "</b><br>" + (c.area || "") + "<br>" + (c.profile || "") + (c.nap ? "<br>NAP: " + c.nap + (c.napPort ? " · p" + c.napPort : "") : ""));
      all.push(pos);
    });
    naps.forEach(n => {
      const pos = spread(n.ll);
      L.marker(pos, {
        icon: pinIcon("#2563eb")
      }).addTo(napLayerRef.current).bindPopup("<b>" + n.name + "</b><br>" + (n.olt || "") + " " + (n.pon || "") + "<br>" + (n.description || ""));
      all.push(pos);
    });
    if (all.length) map.fitBounds(all, {
      padding: [30, 30]
    });else map.setView([8.4542, 125.7783], 12);
    setTimeout(() => map.invalidateSize(), 250);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Fit the map to whatever vertical space is left below it — adapts to any screen size,
  // orientation, sidebar, or stat-tile wrapping, and re-fits live when the window resizes.
  useEffect(() => {
    const fit = () => {
      const el = elRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      setMapH(Math.max(360, Math.round(window.innerHeight - top - 20))); // 20px breathing room, 360px floor
    };
    fit();
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    const t1 = setTimeout(fit, 300); // re-fit once the map/layout has settled
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      clearTimeout(t1);
    };
  }, []);

  // whenever the height actually changes, let Leaflet recalculate its tiles for the new size
  useEffect(() => {
    if (mapRef.current) {
      try {
        mapRef.current.invalidateSize();
      } catch (e) {}
    }
  }, [mapH]);

  // Poll live technician positions + today's trails (owner/admin only), refresh every 20s
  useEffect(() => {
    if (!canMonitor) return;
    let alive = true;
    const load = () => {
      API("tech_locations").then(d => {
        if (alive && d && d.ok) setTechs(Array.isArray(d.techs) ? d.techs : []);
      }).catch(() => {});
      API("tech_trails").then(d => {
        if (alive && d && d.ok) setTrails(Array.isArray(d.trails) ? d.trails : []);
      }).catch(() => {});
    };
    load();
    const iv = setInterval(load, 20000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, []);

  // Draw each technician's daily path (A → B → C). Resets automatically since the server only returns today's points.
  useEffect(() => {
    const L = window.L,
      layer = trailLayerRef.current;
    if (!L || !layer) return;
    layer.clearLayers();
    const COLORS = ["#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#3b82f6", "#84cc16"];
    (trails || []).forEach((tr, i) => {
      const pts = (tr.points || []).filter(p => Array.isArray(p) && isFinite(p[0]) && isFinite(p[1]));
      if (!pts.length) return;
      const color = COLORS[i % COLORS.length];
      if (pts.length >= 2) L.polyline(pts, {
        color,
        weight: 3,
        opacity: 0.75
      }).addTo(layer);
      L.circleMarker(pts[0], {
        radius: 5,
        color: "#fff",
        weight: 2,
        fillColor: color,
        fillOpacity: 1
      }).addTo(layer).bindPopup("<b>" + (tr.name || "Technician") + "</b><br>start of day");
    });
  }, [trails]);

  // Draw/update technician markers whenever positions change (visibility is controlled by the filter)
  useEffect(() => {
    const L = window.L,
      layer = techLayerRef.current;
    if (!L || !layer) return;
    layer.clearLayers();
    techs.forEach(tk => {
      const lat = parseFloat(tk.lat),
        lng = parseFloat(tk.lng);
      if (!isFinite(lat) || !isFinite(lng)) return;
      const age = parseInt(tk.age_sec, 10) || 0;
      const ago = age < 60 ? "just now" : age < 3600 ? Math.round(age / 60) + " min ago" : Math.round(age / 3600) + " hr ago";
      L.marker([lat, lng], {
        icon: pinIcon("#f59e0b", 3)
      }).addTo(layer).bindPopup("<b>" + (tk.full_name || tk.username || "Technician") + "</b>" + (tk.position ? "<br>" + tk.position : "") + "<br>📍 updated " + ago + (tk.accuracy ? "<br>±" + Math.round(tk.accuracy) + " m" : ""));
    });
  }, [techs]);

  // Filter: show only the selected pin type, or everything when "all"
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const vis = (layer, on) => {
      if (!layer) return;
      if (on) {
        if (!map.hasLayer(layer)) map.addLayer(layer);
      } else if (map.hasLayer(layer)) map.removeLayer(layer);
    };
    vis(napLayerRef.current, filter === "all" || filter === "nap");
    vis(subLayerRef.current, filter === "all" || filter === "sub");
    vis(pesoLayerRef.current, filter === "all" || filter === "peso");
    vis(techLayerRef.current, filter === "all" || filter === "tech");
    vis(trailLayerRef.current, filter === "all" || filter === "tech");
  }, [filter]);
  const legendDot = c => ({
    width: 11,
    height: 11,
    borderRadius: 11,
    background: c,
    display: "inline-block",
    border: "2px solid #fff"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Subscribers mapped",
    value: subs.length - pesoCount,
    icon: Users,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "PESOWiFi mapped",
    value: pesoCount,
    icon: Wifi,
    tone: "bad"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "NAPs mapped",
    value: naps.length,
    icon: Network,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Links drawn",
    value: linked,
    icon: MapPin,
    tone: "good",
    sub: "subscriber \u2192 NAP"
  })), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-4 py-3",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Coverage map"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 flex-wrap justify-end"
  }, [{
    id: "all",
    label: "All",
    color: null
  }, {
    id: "nap",
    label: "NAP",
    color: "#2563eb"
  }, {
    id: "sub",
    label: "Subscriber",
    color: "#22c55e"
  }, {
    id: "peso",
    label: "PESOWiFi",
    color: "#ef4444"
  }, ...(canMonitor ? [{
    id: "tech",
    label: "Technician" + (techs.length ? " (" + techs.length + ")" : ""),
    color: "#f59e0b"
  }] : [])].map(f => {
    const on = filter === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      onClick: () => setFilter(f.id),
      className: "inline-flex items-center gap-1.5 rounded-lg",
      style: {
        padding: "5px 10px",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 12,
        whiteSpace: "nowrap",
        background: on ? t.accent : t.surface2,
        color: on ? "#fff" : t.textMuted,
        border: `1px solid ${on ? t.accent : t.border}`
      }
    }, f.color && /*#__PURE__*/React.createElement("span", {
      style: legendDot(f.color)
    }), f.label);
  }))), /*#__PURE__*/React.createElement("div", {
    ref: elRef,
    style: {
      height: mapH != null ? mapH : "calc(100vh - 275px)",
      minHeight: 360,
      width: "100%",
      background: t.surface2
    }
  }), !window.L && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      color: t.textFaint,
      fontSize: 13
    }
  }, "Map needs an internet connection to load. When viewing the local preview offline, deploy it to your site to see the map.")));
}

/* ------------------------------------------------------------------ */
/*  JOB ORDER › ADMIN MASTER DATA (config-driven)                     */
/* ------------------------------------------------------------------ */
const toneStatus = (t, v) => ({
  Active: t.good,
  "On leave": t.warn,
  Inactive: t.textMuted,
  Yes: t.good,
  No: t.textMuted
})[v] || t.accent;
const tonePriority = (t, v) => ({
  High: t.bad,
  Med: t.warn,
  Medium: t.warn,
  Low: t.good
})[v] || t.accent;
const toneSeverity = (t, v) => ({
  Critical: t.bad,
  High: t.bad,
  Medium: t.warn,
  Low: t.good
})[v] || t.accent;
const toneAction = (t, v) => ({
  Replace: t.accent,
  Repair: t.warn,
  Reconfigure: t.violet,
  Escalate: t.bad
})[v] || t.accent;
const toneCat = t => t.accent;
function Tag({
  t,
  color,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center rounded-full",
    style: {
      background: (color || t.accent) + "22",
      color: color || t.accent,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 9px"
    }
  }, children);
}

/* ---- shared UI helpers for admin modules ---- */
function adminBtn(t, primary) {
  return {
    background: primary ? t.accent : t.surface2,
    color: primary ? t.name === "dark" ? "#04222A" : "#fff" : t.text,
    border: primary ? "none" : `1px solid ${t.border}`,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    padding: "9px 14px",
    borderRadius: 11
  };
}

/* Simple name-only catalog list: Job Types / Issues / Solutions */
function CatalogList({
  t,
  title,
  seed,
  placeholder,
  countFn,
  countNoun,
  saveKey
}) {
  const [items, setItems] = useState(seed);
  const [val, setVal] = useState("");
  const perm = {
    jobTypes: "jobtypes",
    issues: "issues",
    solutions: "solutions"
  }[saveKey] || "job_solution";
  const persist = xs => {
    if (saveKey) _save("save_catalogs", {
      [saveKey]: xs
    });
  };
  const add = () => {
    const v = val.trim();
    if (!v || items.includes(v)) {
      setVal("");
      return;
    }
    const xs = [...items, v];
    setItems(xs);
    persist(xs);
    setVal("");
  };
  const remove = name => {
    if (!window.confirm(`Delete “${name}”?`)) return;
    const xs = items.filter(x => x !== name);
    setItems(xs);
    persist(xs);
  };
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");
  const rename = name => {
    const nn = editVal.trim();
    if (nn && nn !== name && !items.includes(nn)) {
      const xs = items.map(x => x === name ? nn : x);
      setItems(xs);
      persist(xs);
    }
    setEditing(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: title,
    value: items.length,
    icon: Tags,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "In use",
    value: items.filter(x => countFn(x) > 0).length,
    icon: CheckCircle2,
    tone: "good",
    sub: "on \u22651 job order"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Unused",
    value: items.filter(x => countFn(x) === 0).length,
    icon: Clock,
    tone: "warn"
  })), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-4 pb-3",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, title)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, [...items].sort((a, b) => String(a).localeCompare(String(b))).map((name, i, arr) => {
    const n = countFn(name);
    const isEd = editing === name;
    return /*#__PURE__*/React.createElement("li", {
      key: name + i,
      className: "flex items-center justify-between px-5 gap-3",
      style: {
        padding: "12px 20px",
        borderBottom: i === arr.length - 1 ? "none" : `1px solid ${t.borderSoft}`
      }
    }, isEd ? /*#__PURE__*/React.createElement("input", {
      value: editVal,
      autoFocus: true,
      onChange: e => setEditVal(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") rename(name);
        if (e.key === "Escape") setEditing(null);
      },
      className: "flex-1 rounded-lg outline-none",
      style: {
        background: t.surface2,
        color: t.text,
        border: `1px solid ${t.accent}`,
        padding: "7px 10px",
        fontSize: 13
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600,
        fontSize: 13.5
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5
      }
    }, n, " ", countNoun, n === 1 ? "" : "s")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, isEd ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => rename(name),
      className: "grid place-items-center rounded-lg",
      title: "Save",
      style: {
        width: 30,
        height: 30,
        background: t.goodSoft,
        border: "none",
        color: t.good,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(CheckCircle2, {
      size: 15
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditing(null),
      className: "grid place-items-center rounded-lg",
      title: "Cancel",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: t.textMuted,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(X, {
      size: 14
    }))) : /*#__PURE__*/React.createElement(React.Fragment, null, can(perm) && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setEditing(name);
        setEditVal(name);
      },
      className: "grid place-items-center rounded-lg",
      title: "Edit",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: t.textMuted,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 15
    })), canDel(perm) && /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(name),
      className: "grid place-items-center rounded-lg",
      title: "Remove",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: t.textMuted,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(X, {
      size: 14
    })))));
  }), items.length === 0 && /*#__PURE__*/React.createElement("li", {
    style: {
      padding: "20px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 13
    }
  }, "Nothing here yet")), canAdd(perm) && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-5 py-3",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: val,
    onChange: e => setVal(e.target.value),
    onKeyDown: e => e.key === "Enter" && add(),
    placeholder: placeholder,
    className: "flex-1 rounded-xl outline-none",
    style: {
      background: t.surface2,
      color: t.text,
      border: `1px solid ${t.border}`,
      padding: "9px 12px",
      fontSize: 13
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    className: "inline-flex items-center gap-1.5",
    style: adminBtn(t, true)
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), "Add"))));
}
const countByType = name => seedOrders.filter(o => o.type === name).length;
const countByIssue = name => seedOrders.filter(o => o.issue === name).length;
const countBySolution = name => seedOrders.filter(o => o.solution === name).length;
const countByTech = fn => seedOrders.filter(o => o.tech === fn).length;
function TechniciansView({
  t
}) {
  const [accts, setAccts] = useState(techAccounts);
  const blank = {
    name: "",
    contact: "",
    username: "",
    password: ""
  };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const firstName = full => (full || "").trim().split(/\s+/)[0] || full || "";
  const save = () => {
    if (!form.name.trim() || !form.username.trim()) return;
    if (editing) {
      _save("update_tech_account", {
        ...form
      });
      setAccts(a => a.map(x => x.username === editing ? {
        ...x,
        name: form.name,
        contact: form.contact
      } : x));
    } else {
      _save("create_tech_account", {
        ...form
      });
      setAccts(a => [...a, {
        ...form
      }]);
    }
    setForm(blank);
    setEditing(null);
  };
  const startEdit = a => {
    setForm({
      name: a.name || "",
      contact: a.contact || "",
      username: a.username || "",
      password: ""
    });
    setEditing(a.username);
  };
  const remove = u => {
    if (!window.confirm(`Remove technician login “${u}”? This cannot be undone.`)) return;
    _save("delete_tech_account", {
      username: u
    });
    setAccts(a => a.filter(x => x.username !== u));
    if (editing === u) {
      setForm(blank);
      setEditing(null);
    }
  };
  const selStyle = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    marginTop: 5
  };
  const lbl = {
    color: t.textMuted,
    fontSize: 11.5,
    fontWeight: 600
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-3.5"
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Technicians",
    value: accts.length,
    icon: UserCog,
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "With jobs",
    value: accts.filter(a => countByTech(firstName(a.name)) > 0).length,
    icon: Wrench,
    tone: "good"
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Idle",
    value: accts.filter(a => countByTech(firstName(a.name)) === 0).length,
    icon: Clock,
    tone: "warn"
  })), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-4 pb-3",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    t: t
  }, "Technician accounts")), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, accts.map((a, i) => {
    const jobs = countByTech(firstName(a.name));
    return /*#__PURE__*/React.createElement("li", {
      key: a.username + i,
      className: "flex items-center justify-between",
      style: {
        padding: "12px 20px",
        borderBottom: i === accts.length - 1 ? "none" : `1px solid ${t.borderSoft}`
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.text,
        fontWeight: 600,
        fontSize: 13.5
      }
    }, a.name, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontWeight: 400
      }
    }, "\u2192 shows as \"", firstName(a.name), "\"")), /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textFaint,
        fontSize: 11.5
      }
    }, "@", a.username, " \xB7 ", a.contact || "no contact number", " \xB7 ", jobs, " job order", jobs === 1 ? "" : "s")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 shrink-0"
    }, can("techs") && /*#__PURE__*/React.createElement("button", {
      onClick: () => startEdit(a),
      className: "grid place-items-center rounded-lg",
      title: "Edit",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: t.textMuted,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(IconPencil, {
      size: 15
    })), canDel("techs") && /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(a.username),
      className: "grid place-items-center rounded-lg",
      title: "Remove",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        color: t.textMuted,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(X, {
      size: 14
    }))));
  })), (canAdd("techs") || editing) && /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, editing && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "Editing @", editing), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Full name"), /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    }),
    placeholder: "e.g. Ranel Dela Cruz",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Contact number"), /*#__PURE__*/React.createElement("input", {
    value: form.contact,
    onChange: e => setForm({
      ...form,
      contact: e.target.value
    }),
    placeholder: "09xx xxx xxxx",
    style: selStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    value: form.username,
    disabled: !!editing,
    onChange: e => setForm({
      ...form,
      username: e.target.value
    }),
    placeholder: "e.g. ranel",
    style: {
      ...selStyle,
      opacity: editing ? 0.6 : 1
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, editing ? "New password (blank = keep)" : "Password"), /*#__PURE__*/React.createElement("input", {
    value: form.password,
    onChange: e => setForm({
      ...form,
      password: e.target.value
    }),
    placeholder: editing ? "Leave empty to keep" : "Set a password",
    style: selStyle
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: save,
    className: "flex-1 inline-flex items-center justify-center gap-1.5",
    style: adminBtn(t, true)
  }, /*#__PURE__*/React.createElement(UserPlus, {
    size: 15
  }), editing ? "Save changes" : "Create technician account"), editing && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForm(blank);
      setEditing(null);
    },
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, "Only the first name from \"Full name\" appears in job-order dropdowns and the scorecard. The technician signs in with the username and password set here."))));
}
function JobTypesView({
  t
}) {
  return /*#__PURE__*/React.createElement(CatalogList, {
    t: t,
    title: "Job Types",
    seed: CFG_JOBTYPES,
    placeholder: "New job type",
    countFn: countByType,
    countNoun: "job order",
    saveKey: "jobTypes"
  });
}
function IssuesView({
  t
}) {
  return /*#__PURE__*/React.createElement(CatalogList, {
    t: t,
    title: "Issues",
    seed: CFG_ISSUES,
    placeholder: "New issue / concern label",
    countFn: countByIssue,
    countNoun: "job order",
    saveKey: "issues"
  });
}
function SolutionsView({
  t
}) {
  return /*#__PURE__*/React.createElement(CatalogList, {
    t: t,
    title: "Solutions",
    seed: CFG_SOLUTIONS,
    placeholder: "New solution / resolution label",
    countFn: countBySolution,
    countNoun: "job order",
    saveKey: "solutions"
  });
}
function SlaView({
  t
}) {
  const [sla, setSla] = useState(CFG_SLA);
  const [flash, setFlash] = useState("");
  const num = {
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 14,
    fontWeight: 700,
    outline: "none",
    width: 90
  };
  const set = (k, v) => setSla(s => ({
    ...s,
    [k]: v
  }));
  const card = (title, desc, body) => /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 13.5
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.2,
      lineHeight: 1.5,
      margin: "4px 0 10px"
    }
  }, desc), body);
  const row = (k, suffix, step) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: sla[k],
    min: "0",
    step: step || "1",
    onChange: e => set(k, Number(e.target.value)),
    style: num
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.textMuted,
      fontSize: 12.5
    }
  }, suffix));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, flash && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl",
    style: {
      background: t.goodSoft,
      color: t.good,
      padding: "10px 14px",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16
  }), flash), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4"
  }, card("Standard SLA", "Applies to installs, repairs, and mainline jobs. Resolved within this window = PASSED; beyond it = FAILED.", row("standard", "hours")), card("SLA Warning lead time", "For standard job types (not Follow-up), open orders flag ⚠ WARNING once they're this many hours from breaching the standard SLA deadline.", row("warningLead", "hours before deadline", "0.5")), card("Follow-up SLA", "Applies only to Follow-up job types.", /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, row("followup", "hours to resolve"), row("followupWarnAt", "hours elapsed → ⚠ WARNING"))), card("Preview", "How new orders behave with the current values.", /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      lineHeight: 1.6
    }
  }, "Standard jobs: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, sla.standard, "h"), " to resolve, warns at ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.warn
    }
  }, sla.standard - sla.warningLead, "h"), ".", /*#__PURE__*/React.createElement("br", null), "Follow-ups: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, sla.followup, "h"), " to resolve, warns at ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.warn
    }
  }, sla.followupWarnAt, "h"), " elapsed."))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setFlash("Recalculated all job orders against current SLA rules");
      setTimeout(() => setFlash(""), 3000);
    },
    style: adminBtn(t, false)
  }, "Recalculate all job orders"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      CFG_SLA = {
        ...sla
      };
      _save("save_sla", sla);
      setFlash("SLA rules saved");
      setTimeout(() => setFlash(""), 3000);
    },
    style: adminBtn(t, true)
  }, "Save SLA rules")));
}

/* ------------------------------------------------------------------ */
/*  SHELL                                                              */
/* ------------------------------------------------------------------ */
const NAV = [{
  id: "owner",
  label: "Owner Dashboard",
  icon: LayoutDashboard
}, {
  key: "subscribers",
  label: "Subscribers",
  icon: Users,
  children: [{
    id: "subs",
    label: "Overview"
  }, {
    id: "clients",
    label: "Clients"
  }, {
    id: "pesowifi",
    label: "PESOWiFi"
  }]
}, {
  id: "churn",
  label: "Churn & Retention",
  icon: TrendingDown
}, {
  key: "renewals",
  label: "Renewals",
  icon: CalendarClock,
  navId: "renew",
  children: [{
    id: "renewoverview",
    label: "Overview"
  }, {
    id: "rn_ff",
    label: "For Follow-up"
  }, {
    id: "rn_f1",
    label: "1st Follow-Up"
  }, {
    id: "rn_f2",
    label: "2nd Follow-Up"
  }, {
    id: "rn_promised",
    label: "Promised to Pay"
  }, {
    id: "rn_awaiting",
    label: "Awaiting Payment"
  }, {
    id: "rn_winback",
    label: "Win-Back"
  }, {
    id: "rn_modem",
    label: "Modem Removal / Deletion"
  }, {
    id: "rn_transfer",
    label: "Transferred / Deletion"
  }]
}, {
  key: "joborder",
  label: "Job Order",
  icon: ClipboardList,
  navId: "jobs",
  children: [{
    id: "joboverview",
    label: "Overview"
  }, {
    id: "jobtypes",
    label: "Job Types"
  }, {
    id: "issues",
    label: "Issues"
  }, {
    id: "solutions",
    label: "Solutions"
  }, {
    id: "sla",
    label: "SLA Rules"
  }]
}, {
  id: "coverage",
  label: "Map Coverage",
  icon: MapIcon
}, {
  id: "nap",
  label: "PON Management",
  icon: Network
}, {
  key: "financials",
  label: "Financials",
  icon: Wallet,
  navId: "fin",
  children: [{
    id: "income",
    label: "Income"
  }, {
    id: "expenses",
    label: "Expenses"
  }, {
    id: "reports",
    label: "Reports"
  }]
}, {
  key: "payrollgrp",
  label: "Payroll",
  icon: Wallet,
  navId: "payroll",
  children: [{
    id: "loans",
    label: "Loan Management"
  }, {
    id: "collections",
    label: "Collection Cards"
  }]
}, {
  id: "salary",
  label: "Salary",
  icon: Banknote
}, {
  id: "settings",
  label: "Settings",
  icon: Gauge
}, {
  id: "faithgoals",
  label: "Faith Goals",
  icon: Target
}, {
  id: "ai",
  label: "AI Assistant",
  icon: Sparkles
}];
const TITLES = {
  owner: ["Owner Dashboard", "Everything that matters, on one screen"],
  subs: ["Subscribers", "Client base, growth and health"],
  clients: ["Clients", "Full subscriber directory with import"],
  pesowifi: ["PESOWiFi", "Vendo units across the service area"],
  churn: ["Churn & Retention", "Keep more of what you win"],
  renew: ["Renewals", "Who's due, who's paid, who's at risk"],
  renewoverview: ["Renewals Overview", "Due-by-day board · print & follow up"],
  rn_ff: ["For Follow-up", "Unpaid clients awaiting their first move"],
  rn_f1: ["1st Follow-Up", "First contact — set next follow-up date"],
  rn_f2: ["2nd Follow-Up", "Second contact — keep the pressure on"],
  rn_promised: ["Promised to Pay", "Clients who committed to a payment date"],
  rn_awaiting: ["Awaiting Payment", "Waiting on posted payment"],
  rn_winback: ["Win-Back", "Recover clients who didn't renew"],
  rn_modem: ["Modem Removal / For Deletion", "Recover equipment, then close"],
  rn_transfer: ["Transferred to Other ISP / For Deletion", "Confirm transfer, then close"],
  jobs: ["Job Orders", "Installs, repairs and the pipeline to new clients"],
  joboverview: ["Job Order Overview", "Accomplishments and SLA monitoring"],
  techs: ["Technicians", "Field team, skills and assignment pool"],
  jobtypes: ["Job Types", "Configurable order types, priority, SLA and fees"],
  issues: ["Issues", "Trouble-report catalog for repair orders"],
  solutions: ["Solutions", "Standard fixes linked to each issue"],
  sla: ["SLA Rules", "Response and resolution targets per job type"],
  coverage: ["Map Coverage", "Fiber footprint across the service area"],
  nap: ["PON Management", "OLT, PON and NAP capacity across the network"],
  fin: ["Financial Dashboard", "Cash, revenue, expenses and margin"],
  income: ["Income", "Payments received — search, add, edit"],
  expenses: ["Expenses", "Money spent — search, add, edit"],
  reports: ["Financial Reports", "Statements, analytics and goal tracking"],
  faithgoals: ["Faith Goals", "Set and track your goals"],
  payroll: ["Payroll", "Weekly payroll — prepare, publish and approve"],
  collections: ["Collection Cards", "Employee deduction funds collected via payroll — held, not company income"],
  loans: ["Loan Management", "All technician loans — create, track and manage"],
  salary: ["My Salary", "Your weekly payslips — review, approve or query"],
  settings: ["Settings", "Users, roles and positions"],
  ai: ["AI Assistant", "Ask your business anything"]
};

/* ------------------------------------------------------------------ */
/*  LOGIN GATE                                                         */
/*  NOTE: This is a lightweight client-side gate, not real security.  */
/*  To change the login, edit AUTH_USERS below. For true protection,  */
/*  use server-side auth (api.php) or cPanel Directory Privacy.       */
/* ------------------------------------------------------------------ */
const LOGO_URI = "data:image/png;base64,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";
const MARK_URI = "data:image/png;base64,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";
const AUTH_USERS = [{
  username: "admin",
  password: "tiongtech2026",
  name: "Administrator"
}, {
  username: "superadmin",
  password: "tiongtech2026",
  name: "Super Admin"
}
// add more staff here: { username: "jonathan", password: "changeme", name: "Jonathan Tiong" },
];
function Login({
  t,
  onLogin
}) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const tryFallback = () => {
    // built-in gate, used only if the server login endpoint isn't available
    const ok = AUTH_USERS.find(a => a.username === u.trim().toLowerCase() && a.password === p);
    if (ok) {
      setErr("");
      onLogin(ok);
      return true;
    }
    return false;
  };
  // one login attempt → { ok, user } | { rejected, msg } | { transient }
  const attemptLogin = async () => {
    try {
      const res = await API("login", {
        username: u.trim(),
        password: p
      });
      if (res && res.ok) return {
        ok: true,
        user: res.user || {
          username: u.trim().toLowerCase(),
          name: u.trim()
        }
      };
      const emsg = res && res.error || "";
      if (res && emsg && !/unknown action/i.test(emsg)) return {
        rejected: true,
        msg: emsg
      }; // server explicitly said no (e.g. wrong password)
      return {
        transient: true
      }; // no/unclear response or old API → treat as a transient hiccup
    } catch (e) {
      return {
        transient: true
      }; // network dropped or bad response → transient
    }
  };
  const submit = async () => {
    if (busy) return;
    setErr("");
    setBusy(true);
    let r = await attemptLogin();
    if (r.transient) {
      // first hit stumbled (often a cold server) → quietly try once more
      await new Promise(res => setTimeout(res, 600));
      r = await attemptLogin();
    }
    if (r.ok) {
      setErr("");
      await onLogin(r.user);
      return;
    } // stay on "Signing in…" until the dashboard is ready (Login unmounts on success)
    if (r.rejected) {
      setErr(r.msg || "Incorrect username or password.");
      setBusy(false);
      return;
    } // real rejection → show at once
    if (!tryFallback()) setErr("Couldn't reach the server. Check your connection and try again."); // still transient after retry
    setBusy(false);
  };
  const field = {
    background: "#f4f6f9",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    borderRadius: 11,
    padding: "12px 13px",
    fontSize: 14,
    outline: "none",
    width: "100%",
    colorScheme: "light"
  };
  const lbl = {
    color: "#475569",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 6,
    display: "block"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: 20,
      background: t.name === "dark" ? "radial-gradient(1000px 500px at 80% -10%, #1a2430 0%, transparent 60%), " + t.bg : t.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 20,
      padding: 28,
      boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_URI,
    alt: "TIONGTECH",
    style: {
      width: "74%",
      maxWidth: 240,
      height: "auto",
      display: "block",
      margin: "0 auto 8px"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#64748b",
      fontSize: 13,
      margin: "0 0 22px",
      textAlign: "center"
    }
  }, "Sign in to continue"), err && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      background: "#fee2e2",
      color: "#b91c1c",
      borderRadius: 10,
      padding: "9px 12px",
      fontSize: 12.5,
      fontWeight: 600,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 15
  }), err), /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    value: u,
    onChange: e => setU(e.target.value),
    onKeyDown: e => e.key === "Enter" && submit(),
    placeholder: "admin",
    style: field,
    autoFocus: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: show ? "text" : "password",
    value: p,
    onChange: e => setP(e.target.value),
    onKeyDown: e => e.key === "Enter" && submit(),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    style: {
      ...field,
      paddingRight: 64
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShow(s => !s),
    style: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      color: "#64748b",
      fontSize: 11.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 6
    }
  }, show ? "HIDE" : "SHOW")), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    disabled: busy,
    style: {
      width: "100%",
      marginTop: 20,
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 12,
      padding: "13px",
      fontSize: 14.5,
      fontWeight: 800,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.7 : 1
    }
  }, busy ? "Signing in…" : "Sign in"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#94a3b8",
      fontSize: 11,
      textAlign: "center",
      marginTop: 16,
      lineHeight: 1.5
    }
  }, "TIONGTECH", /*#__PURE__*/React.createElement("br", null), "We make things Faster, Easier, and Better."))));
}
function CollectionCards({
  t
}) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    let ok = true;
    API("collection_cards").then(d => {
      if (ok) {
        if (d && d.ok) setCards(d.cards || []);
        setLoading(false);
      }
    }).catch(() => setLoading(false));
    return () => {
      ok = false;
    };
  }, []);
  const total = cards.reduce((a, c) => a + Number(c.balance || 0), 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 18,
      background: t.accentSoft
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "Total Employee Collection Funds"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 30,
      fontWeight: 800,
      marginTop: 2
    }
  }, peso(total)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5,
      marginTop: 3,
      lineHeight: 1.5
    }
  }, "Money collected through payroll deductions and held on behalf of employees / the cooperative \u2014 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.textMuted
    }
  }, "this is not company income"), " and never counts toward revenue or profit.")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4"
  }, cards.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.kind,
    t: t,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 14
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.accentSoft,
      color: t.accent
    }
  }, /*#__PURE__*/React.createElement(PiggyBank, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 24,
      fontWeight: 800,
      marginTop: 6
    }
  }, peso(c.balance)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11.5
    }
  }, "total collected"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mt-3"
  }, [["This week", c.week], ["This month", c.month], ["This year", c.year]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      background: t.surface2,
      borderRadius: 10,
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 10.5
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 13,
      fontWeight: 700
    }
  }, peso(v))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === c.kind ? null : c.kind),
    style: {
      marginTop: 12,
      background: "transparent",
      border: "none",
      color: t.accent,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0
    }
  }, open === c.kind ? "Hide" : "Show", " collection history (", (c.history || []).length, ")"), open === c.kind && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      maxHeight: 280,
      overflowY: "auto",
      borderTop: `1px solid ${t.borderSoft}`,
      paddingTop: 6
    }
  }, (c.history || []).map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center justify-between",
    style: {
      padding: "7px 0",
      borderBottom: i === c.history.length - 1 ? "none" : `1px solid ${t.borderSoft}`,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, h.employee), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, h.label, " \xB7 ", h.period, " \xB7 ", h.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.good,
      fontSize: 12.5,
      fontWeight: 700,
      whiteSpace: "nowrap"
    }
  }, peso(h.amount)))), (c.history || []).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, "No entries."))))), !loading && cards.length === 0 && /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 30,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 13
    }
  }, "No collections yet. Deductions appear here automatically once a payroll week is published.")));
}
function ProfileModal({
  t,
  username,
  name,
  onClose,
  onSaved
}) {
  const [form, setForm] = useState({
    new_username: username || "",
    current_password: "",
    new_password: ""
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const lbl = {
    display: "block",
    color: t.textFaint,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 700,
    marginBottom: 4
  };
  const inp = {
    width: "100%",
    background: t.surface2,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "9px 11px",
    fontSize: 13,
    outline: "none"
  };
  const save = async () => {
    if (!form.new_username.trim()) {
      setMsg({
        ok: false,
        text: "Username can't be blank."
      });
      return;
    }
    if (!form.current_password) {
      setMsg({
        ok: false,
        text: "Enter your current password to confirm the change."
      });
      return;
    }
    if (!window.confirm("Save changes to your account?")) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await API("update_self", form);
      if (r && r.ok) {
        setMsg({
          ok: true,
          text: "Saved. Use your new details the next time you sign in."
        });
        if (onSaved) onSaved(r.username || form.new_username.trim());
        setForm(f => ({
          ...f,
          current_password: "",
          new_password: ""
        }));
      } else setMsg({
        ok: false,
        text: r && r.error || "Could not save."
      });
    } catch (e) {
      setMsg({
        ok: false,
        text: "Could not save."
      });
    }
    setBusy(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 90,
      display: "grid",
      placeItems: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      position: "relative",
      zIndex: 91,
      width: "100%",
      maxWidth: 420,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-5 py-4",
    style: {
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 16
    }
  }, "My account"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "grid place-items-center rounded-lg",
    style: {
      width: 30,
      height: 30,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 space-y-3"
  }, name && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5
    }
  }, "Signed in as ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: t.text
    }
  }, name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    value: form.new_username,
    onChange: e => set("new_username", e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "New password (blank = keep)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.new_password,
    onChange: e => set("new_password", e.target.value),
    placeholder: "Leave empty to keep current",
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Current password *"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: form.current_password,
    onChange: e => set("current_password", e.target.value),
    placeholder: "Required to confirm",
    style: inp
  })), msg && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 11px",
      borderRadius: 9,
      fontSize: 12.5,
      fontWeight: 600,
      background: msg.ok ? t.goodSoft : t.badSoft || "#3a1620",
      color: msg.ok ? t.good : t.bad
    }
  }, msg.text), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${t.border}`,
      paddingTop: 14,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(PushToggle, {
    t: t
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2 px-5 py-4",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: t.surface2,
      color: t.textMuted,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    onClick: save,
    disabled: busy,
    style: {
      background: t.accent,
      color: "#04222A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 700,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Saving…" : "Save"))));
}
if (typeof document !== "undefined") document.title = "TIONGTECH";

/* ===== Web Push (client) ===== */
const PUSH_VAPID_KEY = "BPNzWojpPKQStiJH9mrWmnqAjjB4qXYalljSMn96iLdIwTrO0JY4FmOsIeQbO1lcg8pOL1PmYXCp14x7yK2VKKw";
function pushSupported() {
  return typeof navigator !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}
function _urlB64ToUint8(base64) {
  const pad = "=".repeat((4 - base64.length % 4) % 4);
  const b64 = (base64 + pad).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}
async function pushEnable() {
  if (!pushSupported()) throw new Error("This browser doesn't support notifications.");
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error(perm === "denied" ? "Notifications are blocked in your browser settings." : "Permission not granted.");
  const reg = await navigator.serviceWorker.register("sw.js");
  await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: _urlB64ToUint8(PUSH_VAPID_KEY)
  });
  const r = await fetch("push.php?action=push_subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subscription: sub
    })
  });
  const d = await r.json().catch(() => ({}));
  if (!d.ok) throw new Error(d.error || "Could not save the subscription.");
  return true;
}
async function pushTest() {
  const call = async () => {
    const r = await fetch("push.php?action=push_test", {
      method: "POST"
    });
    return r.json().catch(() => ({
      ok: false,
      error: "No response."
    }));
  };
  let d = await call();
  // If the browser is subscribed but the server has no record, re-subscribe and retry once.
  if (!d.ok && /no device/i.test(d.error || "")) {
    try {
      await pushEnable();
      d = await call();
    } catch (e) {
      d = {
        ok: false,
        error: e.message || "Could not enable notifications."
      };
    }
  }
  return d;
}
async function pushIsEnabled() {
  try {
    if (!pushSupported() || Notification.permission !== "granted") return false;
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return false;
    return !!(await reg.pushManager.getSubscription());
  } catch (e) {
    return false;
  }
}
async function pushResync() {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return false;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return false;
    await fetch("push.php?action=push_subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subscription: sub
      })
    });
    return true;
  } catch (e) {
    return false;
  }
}
async function pushDisable() {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        try {
          await fetch("push.php?action=push_unsubscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              endpoint: sub.endpoint
            })
          });
        } catch (e) {}
        await sub.unsubscribe();
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}
function PushToggle({
  t
}) {
  const [state, setState] = useState("checking"); // checking|on|off|denied|unsupported
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!pushSupported()) {
        if (alive) setState("unsupported");
        return;
      }
      if (Notification.permission === "denied") {
        if (alive) setState("denied");
        return;
      }
      const on = await pushIsEnabled();
      if (alive) setState(on ? "on" : "off");
      if (on) pushResync(); // heal browser-subscribed-but-server-missing mismatch
    })();
    return () => {
      alive = false;
    };
  }, []);
  const enable = async () => {
    setBusy(true);
    setNote("");
    try {
      await pushEnable();
      setState("on");
      setNote("Notifications enabled on this device.");
    } catch (e) {
      setNote(e.message || "Could not enable.");
    }
    setBusy(false);
  };
  const disable = async () => {
    setBusy(true);
    setNote("");
    await pushDisable();
    setState("off");
    setNote("Notifications turned off on this device.");
    setBusy(false);
  };
  const test = async () => {
    setBusy(true);
    setNote("");
    const d = await pushTest();
    setNote(d.ok ? "Test sent — check your notification tray." : d.error || "Test failed.");
    setBusy(false);
  };
  const on = state === "on";
  const pillOn = {
    background: t.accent,
    color: t.name === "dark" ? "#04222A" : "#fff"
  };
  const pillOff = {
    background: t.surface2,
    color: t.textMuted,
    border: `1px solid ${t.border}`
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: "13px 15px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 700,
      fontSize: 13.5
    }
  }, "\uD83D\uDD14 Push notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12
    }
  }, state === "unsupported" ? "This browser doesn't support notifications." : state === "denied" ? "Blocked in your browser settings — allow notifications for this site, then reload." : state === "checking" ? "Checking…" : on ? "On for this device — you'll get alerts even when the app is closed." : "Off — turn on to get alerts on this device."), note && /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.good,
      fontSize: 11.5,
      marginTop: 4
    }
  }, note)), (state === "on" || state === "off") && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: on ? disable : enable,
    disabled: busy,
    style: {
      ...(on ? pillOff : pillOn),
      border: on ? `1px solid ${t.border}` : "none",
      borderRadius: 20,
      padding: "8px 16px",
      fontWeight: 800,
      fontSize: 12.5,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "…" : on ? "Turn off" : "Turn on"), on && /*#__PURE__*/React.createElement("button", {
    onClick: test,
    disabled: busy,
    style: {
      background: "transparent",
      color: t.accent,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 700
    }
  }, "Send test"))));
}
function PushBanner({
  t
}) {
  const [state, setState] = useState("checking"); // checking|off|denied|hidden
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (localStorage.getItem("tt_push_banner_off") === "1") {
          if (alive) setState("hidden");
          return;
        }
      } catch (e) {}
      if (!pushSupported()) {
        if (alive) setState("hidden");
        return;
      }
      if (Notification.permission === "denied") {
        if (alive) setState("denied");
        return;
      }
      const on = await pushIsEnabled();
      if (on) {
        pushResync();
        if (alive) setState("hidden");
        return;
      } // already enabled → never show the banner
      if (alive) setState("off");
    })();
    return () => {
      alive = false;
    };
  }, []);
  if (state === "checking" || state === "hidden") return null;
  const dismiss = () => {
    try {
      localStorage.setItem("tt_push_banner_off", "1");
    } catch (e) {}
    setState("hidden");
  };
  const enable = async () => {
    setBusy(true);
    setNote("");
    try {
      await pushEnable();
      try {
        localStorage.setItem("tt_push_banner_off", "1");
      } catch (e) {}
      setState("hidden");
    } catch (e) {
      setNote(e.message || "Could not enable notifications.");
      setBusy(false);
    }
  };
  const wrap = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 13,
    flexWrap: "wrap"
  };
  const denied = state === "denied";
  return /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 15
    }
  }, "Turn on push notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textMuted,
      fontSize: 12.5,
      marginTop: 1
    }
  }, denied ? "Notifications are blocked — enable them for this site in your browser settings, then reload." : note || "Get alerts on this device even when the app is closed.")), !denied && /*#__PURE__*/React.createElement("button", {
    onClick: enable,
    disabled: busy,
    style: {
      background: t.accent,
      color: t.name === "dark" ? "#04222A" : "#fff",
      border: "none",
      borderRadius: 11,
      padding: "10px 18px",
      fontWeight: 800,
      fontSize: 13.5,
      cursor: busy ? "default" : "pointer",
      opacity: busy ? 0.7 : 1
    }
  }, busy ? "…" : "Enable"), /*#__PURE__*/React.createElement("button", {
    onClick: dismiss,
    style: {
      background: "transparent",
      color: t.textFaint,
      border: "none",
      cursor: "pointer",
      fontSize: 12.5
    }
  }, "Not now"));
}
function App() {
  const [authed, setAuthed] = useState(() => !!(ME && ME.uid)); // stay signed in across refreshes when the server session is valid
  const [account, setAccount] = useState(null);
  const [mode, setMode] = useState("dark");
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("tt_view") || "owner";
    } catch (e) {
      return "owner";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("tt_view", view);
    } catch (e) {}
  }, [view]);
  const [navOpen, setNavOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const [gsearch, setGsearch] = useState("");
  const [gProfile, setGProfile] = useState(null);
  const [prNotif, setPrNotif] = useState(0);
  const [dataVersion, setDataVersion] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const t = THEMES[mode];

  // pull fresh data from the server and force the current view to re-read it
  const refresh = () => {
    loadLiveData().then(() => setDataVersion(v => v + 1)).catch(() => {});
  };
  const bootedRef = useRef(false);
  useEffect(() => {
    window.__APP_REFRESH = refresh;
  }); // let saves/deletes trigger a refresh
  useEffect(() => {
    if (!authed) return;
    if (!bootedRef.current) {
      bootedRef.current = true;
      return;
    }
    refresh();
  }, [view, authed]); // re-fetch when switching menus / after login (skip the initial boot load)

  // keep the Payroll/Salary nav badge fresh (published payslips to review, or contests / print requests to handle)
  useEffect(() => {
    if (authed) loadPayrollData().then(() => setPrNotif(PR.notif && PR.notif.total || 0));
  }, [authed, view, dataVersion]);
  // keep the active view legal for the current role — MUST run before the early return so the hook order never changes between renders
  useEffect(() => {
    const order = ["owner", "income", "expenses", "reports", "payroll", "jobs", "settings"];
    if (!canView(view)) setView(order.find(v => canView(v)) || "owner");
  }, [view, ME.role]);
  if (!authed) return /*#__PURE__*/React.createElement(Login, {
    t: t,
    onLogin: async acct => {
      try {
        await loadLiveData();
      } catch (e) {}
      setAccount(acct);
      setAuthed(true);
    }
  });
  const go = id => {
    setView(id);
    setNavOpen(false);
  };
  if (typeof window !== "undefined") window.__ttNav = go;
  const toggleGroup = k => setOpenGroups(g => ({
    ...g,
    [k]: !g[k]
  }));
  const meUsername = account && account.username || "";
  const meName = ME && ME.name || account && (account.name || account.username) || "User";
  const meInit = (meName.match(/\b\w/g) || ["U"]).slice(0, 2).join("").toUpperCase();
  const meRoleLabel = ME && ME.position ? ME.position : ME.role === "owner" || account && account.role === "owner" ? "Owner" : "Staff";
  const _nreg = clients.filter(c => !isPeso(c));
  const _nDueToday = _nreg.filter(c => dueDays(c) === 0 && !clientPaid(c)).length;
  const _nOverdue = _nreg.filter(c => {
    const d = dueDays(c);
    return d != null && d < 0 && !clientPaid(c);
  }).length;
  const _canRenew = canView("renew") || canView("renewoverview");
  const _renewGo = canView("renew") ? "renew" : "renewoverview";
  const NOTIFS = [];
  if (prNotif > 0 && canView("payroll")) NOTIFS.push({
    icon: Wallet,
    text: `${prNotif} payroll item${prNotif > 1 ? "s" : ""} to review`,
    color: t.bad,
    go: "payroll"
  });
  if (_nDueToday > 0 && _canRenew) NOTIFS.push({
    icon: IconCalendar,
    text: `${_nDueToday} client${_nDueToday > 1 ? "s" : ""} due today`,
    color: t.warn,
    go: _renewGo
  });
  if (_nOverdue > 0 && _canRenew) NOTIFS.push({
    icon: AlertTriangle,
    text: `${_nOverdue} client${_nOverdue > 1 ? "s" : ""} overdue — follow up`,
    color: t.bad,
    go: _renewGo
  });
  if (_canRenew) {
    const _tmr = new Date();
    _tmr.setDate(_tmr.getDate() + 1);
    const _ts = _tmr.toISOString().slice(0, 10);
    const _rnT = (clients || []).filter(c => {
      const st = renewalStageOf(c);
      return (st === "followup1" || st === "followup2") && (renewalInfoOf(c).next_date || "") === _ts;
    });
    if (_rnT.length > 0) NOTIFS.push({
      icon: Bell,
      text: `${_rnT.length} client${_rnT.length > 1 ? "s" : ""} need follow-up tomorrow`,
      color: t.warn,
      go: "rn_f1"
    });
  }
  const Sidebar = ({
    mobile
  }) => /*#__PURE__*/React.createElement("aside", {
    className: mobile ? "flex md:hidden" : "hidden md:flex",
    style: {
      flexDirection: "column",
      width: 240,
      flexShrink: 0,
      height: "100%",
      background: t.surface,
      borderRight: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 px-5",
    style: {
      height: 64,
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-xl",
    style: {
      width: 34,
      height: 34,
      background: "#fff",
      boxShadow: t.accentGlow,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK_URI,
    alt: "TIONGTECH",
    style: {
      width: 27,
      height: 27,
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontWeight: 800,
      fontSize: 15,
      letterSpacing: "-0.02em",
      lineHeight: 1
    }
  }, "TIONGTECH"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 px-3 py-3 overflow-y-auto"
  }, NAV.map(n => {
    if (n.children) {
      const kids = n.children.filter(c => canView(c.id));
      if (!canView(n.navId) && kids.length === 0) return null;
      const isOpen = openGroups[n.key];
      const childActive = kids.some(c => c.id === view) || n.navId && view === n.navId;
      return /*#__PURE__*/React.createElement("div", {
        key: n.key,
        className: "mb-1"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          if (n.navId) {
            go(n.navId);
            setOpenGroups(g => ({
              ...g,
              [n.key]: true
            }));
          } else {
            toggleGroup(n.key);
          }
        },
        className: "w-full flex items-center gap-3 rounded-xl",
        style: {
          padding: "10px 12px",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          background: n.navId && view === n.navId ? t.accentSoft : "transparent",
          color: childActive ? t.text : t.textMuted,
          fontWeight: childActive ? 700 : 600,
          fontSize: 13.5
        }
      }, /*#__PURE__*/React.createElement(n.icon, {
        size: 17,
        color: childActive ? t.accent : "currentColor"
      }), /*#__PURE__*/React.createElement("span", {
        className: "flex-1"
      }, n.label), n.navId === "payroll" && prNotif > 0 && (ME.role === "owner" || ME.role === "payroll") && /*#__PURE__*/React.createElement("span", {
        className: "grid place-items-center rounded-full",
        style: {
          minWidth: 18,
          height: 18,
          padding: "0 5px",
          background: t.bad,
          color: "#fff",
          fontSize: 10.5,
          fontWeight: 800,
          marginRight: 4
        }
      }, prNotif), /*#__PURE__*/React.createElement("span", {
        onClick: e => {
          e.stopPropagation();
          toggleGroup(n.key);
        },
        style: {
          display: "inline-flex",
          padding: 2,
          cursor: "pointer",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: t.name === "dark" ? "#ffffff" : t.text,
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: {
          transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
          transition: "transform .2s"
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6 9l6 6 6-6"
      })))), isOpen && /*#__PURE__*/React.createElement("div", {
        className: "mt-1 mb-1",
        style: {
          marginLeft: 15,
          paddingLeft: 13,
          borderLeft: `1px solid ${t.border}`
        }
      }, kids.map(c => {
        const active = view === c.id;
        return /*#__PURE__*/React.createElement("button", {
          key: c.id,
          onClick: () => go(c.id),
          className: "w-full flex items-center rounded-lg mb-0.5",
          style: {
            padding: "8px 11px",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            background: active ? t.accentSoft : "transparent",
            color: active ? t.accent : t.textMuted,
            fontWeight: active ? 700 : 500,
            fontSize: 13
          }
        }, c.label);
      })));
    }
    if (!canView(n.id)) return null;
    if (n.id === "salary" && (!ME.pr_employee_id || ME.role === "owner" || ME.role === "payroll")) return null; // self-review Salary tab is for employees, not the payroll office
    const active = view === n.id;
    const showBadge = prNotif > 0 && (n.id === "payroll" && (ME.role === "owner" || ME.role === "payroll") || n.id === "salary" && !!ME.pr_employee_id);
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => go(n.id),
      className: "w-full flex items-center gap-3 rounded-xl mb-1",
      style: {
        padding: "10px 12px",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        background: active ? t.accentSoft : "transparent",
        color: active ? t.accent : t.textMuted,
        fontWeight: active ? 700 : 600,
        fontSize: 13.5,
        position: "relative"
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: 8,
        bottom: 8,
        width: 3,
        borderRadius: 3,
        background: t.accent
      }
    }), /*#__PURE__*/React.createElement(n.icon, {
      size: 17
    }), /*#__PURE__*/React.createElement("span", {
      className: "flex-1"
    }, n.label), showBadge && /*#__PURE__*/React.createElement("span", {
      className: "grid place-items-center rounded-full",
      style: {
        minWidth: 18,
        height: 18,
        padding: "0 5px",
        background: t.bad,
        color: "#fff",
        fontSize: 10.5,
        fontWeight: 800
      }
    }, prNotif));
  })), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3",
    style: {
      borderTop: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowProfile(true),
    className: "w-full flex items-center gap-2.5 rounded-xl",
    title: "My account",
    style: {
      padding: "8px 10px",
      background: t.surface2,
      border: "none",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid place-items-center rounded-full",
    style: {
      width: 32,
      height: 32,
      background: t.accent,
      color: t.name === "dark" ? "#04222A" : "#fff",
      fontWeight: 800,
      fontSize: 13,
      flexShrink: 0
    }
  }, meInit), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.text,
      fontSize: 12.5,
      fontWeight: 700,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, meName), /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.textFaint,
      fontSize: 11
    }
  }, meRoleLabel, " \xB7 edit account")))));
  const views = {
    owner: OwnerDashboard,
    subs: Subscribers,
    clients: ClientsView,
    pesowifi: PesoWifi,
    churn: Churn,
    renew: Renewals,
    renewoverview: RenewalsOverview,
    rn_ff: RnFF,
    rn_f1: RnF1,
    rn_f2: RnF2,
    rn_promised: RnPromised,
    rn_awaiting: RnAwaiting,
    rn_winback: RnWinback,
    rn_modem: RnModem,
    rn_transfer: RnTransfer,
    jobs: JobOrders,
    joboverview: JobOrderOverview,
    techs: TechniciansView,
    jobtypes: JobTypesView,
    issues: IssuesView,
    solutions: SolutionsView,
    sla: SlaView,
    coverage: MapCoverage,
    nap: PonNap,
    fin: Financials,
    income: IncomePage,
    expenses: ExpensesPage,
    reports: Reports,
    faithgoals: FaithGoals,
    payroll: PayrollPage,
    loans: LoanManagement,
    collections: CollectionCards,
    salary: SalaryPage,
    settings: SettingsPage,
    ai: Assistant
  };
  // if the current view isn't allowed for this role, fall back to their first allowed view
  const _firstAllowed = () => {
    const order = ["owner", "income", "expenses", "reports", "payroll", "jobs", "settings"];
    return order.find(v => canView(v)) || "owner";
  };
  const ViewComp = canView(view) ? views[view] : views[_firstAllowed()];
  const [title, subtitle] = TITLES[canView(view) ? view : _firstAllowed()];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      background: t.canvas,
      backgroundImage: t.canvasGrad,
      color: t.text,
      fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    mobile: false
  }), navOpen && /*#__PURE__*/React.createElement("div", {
    className: "md:hidden",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 40,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setNavOpen(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.5)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 41,
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    mobile: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(LocationGate, {
    t: t
  }), /*#__PURE__*/React.createElement("header", {
    className: "flex items-center justify-between px-4 md:px-6",
    style: {
      height: 64,
      borderBottom: `1px solid ${t.border}`,
      background: t.surface,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 min-w-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNavOpen(true),
    className: "md:hidden grid place-items-center rounded-lg",
    style: {
      width: 38,
      height: 38,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.text,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Menu, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      color: t.text,
      fontSize: 17,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "hidden sm:block",
    style: {
      color: t.textFaint,
      fontSize: 12
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-2 rounded-xl relative",
    style: {
      background: t.surface2,
      border: `1px solid ${t.border}`,
      padding: "8px 12px",
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 15,
    color: t.textFaint
  }), /*#__PURE__*/React.createElement("input", {
    value: gsearch,
    onChange: e => setGsearch(e.target.value),
    placeholder: "Search clients, account #\u2026",
    className: "bg-transparent outline-none",
    style: {
      color: t.text,
      fontSize: 13,
      width: "100%"
    }
  }), gsearch && /*#__PURE__*/React.createElement("button", {
    onClick: () => setGsearch(""),
    style: {
      background: "transparent",
      border: "none",
      color: t.textFaint,
      cursor: "pointer",
      display: "inline-flex",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 13
  })), gsearch.trim() && (() => {
    const s = gsearch.trim().toLowerCase();
    const hits = clients.filter(c => ((c.first_name || "") + " " + (c.last_name || "")).toLowerCase().includes(s) || (c.account_number || "").toLowerCase().includes(s)).slice(0, 8);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "calc(100% + 6px)",
        left: 0,
        right: 0,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        overflow: "hidden",
        zIndex: 50
      }
    }, hits.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 14px",
        color: t.textFaint,
        fontSize: 13
      }
    }, "No results found."), hits.map((c, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        setGProfile(c);
        setGsearch("");
      },
      className: "w-full flex items-center justify-between",
      style: {
        background: "transparent",
        border: "none",
        borderBottom: i < hits.length - 1 ? `1px solid ${t.borderSoft}` : "none",
        cursor: "pointer",
        textAlign: "left",
        padding: "9px 13px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontSize: 13,
        fontWeight: 600
      }
    }, ((c.first_name || "") + " " + (c.last_name || "")).trim()), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.textFaint,
        fontSize: 11.5,
        fontFamily: "ui-monospace, monospace"
      }
    }, c.account_number))));
  })()), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowNotif(s => !s),
    className: "grid place-items-center rounded-xl relative",
    style: {
      width: 40,
      height: 40,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Bell, {
    size: 17
  }), NOTIFS.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: 7,
      background: t.bad
    }
  })), showNotif && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowNotif(false),
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 48,
      width: 300,
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      boxShadow: "0 16px 50px rgba(0,0,0,0.4)",
      zIndex: 61,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: `1px solid ${t.border}`,
      color: t.text,
      fontWeight: 800,
      fontSize: 14
    }
  }, "Notifications"), NOTIFS.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 16px",
      textAlign: "center",
      color: t.textFaint,
      fontSize: 12.5
    }
  }, "You're all caught up \uD83C\uDF89") : NOTIFS.map((n, i) => {
    const Ico = n.icon;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        setShowNotif(false);
        go(n.go);
      },
      className: "w-full flex items-center gap-3",
      style: {
        padding: "11px 16px",
        background: "transparent",
        border: "none",
        borderBottom: i === NOTIFS.length - 1 ? "none" : `1px solid ${t.borderSoft}`,
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "grid place-items-center rounded-lg shrink-0",
      style: {
        width: 30,
        height: 30,
        background: t.surface2,
        color: n.color
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 15
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.text,
        fontSize: 12.5,
        fontWeight: 600,
        lineHeight: 1.35
      }
    }, n.text));
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMode(mode === "dark" ? "light" : "dark"),
    className: "grid place-items-center rounded-xl",
    style: {
      width: 40,
      height: 40,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.warn,
      cursor: "pointer"
    }
  }, mode === "dark" ? /*#__PURE__*/React.createElement(Sun, {
    size: 17
  }) : /*#__PURE__*/React.createElement(Moon, {
    size: 17,
    color: t.accent
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      try {
        API("logout");
      } catch (e) {}
      setAuthed(false);
      setAccount(null);
      setView("owner");
    },
    title: "Sign out",
    className: "grid place-items-center rounded-xl",
    style: {
      width: 40,
      height: 40,
      background: t.surface2,
      border: `1px solid ${t.border}`,
      color: t.textMuted,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(ArrowRight, {
    size: 17
  })))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-y-auto px-4 md:px-6 py-5"
  }, /*#__PURE__*/React.createElement("div", {
    key: view + ":" + dataVersion,
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(PushBanner, {
    t: t
  }), /*#__PURE__*/React.createElement(ViewComp, {
    t: t
  })))), gProfile && /*#__PURE__*/React.createElement(ClientProfile, {
    t: t,
    client: gProfile,
    onClose: () => setGProfile(null),
    pmode: isPeso(gProfile)
  }), showProfile && /*#__PURE__*/React.createElement(ProfileModal, {
    t: t,
    username: meUsername,
    name: meName,
    onClose: () => setShowProfile(false),
    onSaved: newU => {
      setAccount(a => ({
        ...(a || {}),
        username: newU
      }));
    }
  }));
}
Promise.resolve(typeof loadLiveData === 'function' ? loadLiveData() : false).catch(function () {}).finally(function () {
  var _boot = document.getElementById('boot');
  if (_boot) _boot.remove();
  createRoot(document.getElementById("root")).render( /*#__PURE__*/React.createElement(App, null));
});