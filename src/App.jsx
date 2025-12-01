import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Lightbulb,
  Settings,
  Banknote,
  RefreshCcw,
  CheckCircle2,
  BarChart3,
  Calendar,
  Globe,
  ArrowRight,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight,
  ChevronDown,
  Lock,
  Sparkles,
  MessageSquareQuote
} from 'lucide-react';

// --- Constants & Defaults ---

// ==========================================
// 🎨 CUSTOMIZE YOUR LOGO HERE
// Paste your image URL inside the quotes. 
// Example: "/logo.png" (if in public folder) or "https://mysite.com/logo.png"
// Leave as null to use the default Calculator icon.
const USER_CUSTOM_ICON_URL = "/logo.png";
// ==========================================

const LOAN_TYPES = {
  personal: { name: 'Personal Loan', defaultRate: 11.5, icon: '👤' },
  home: { name: 'Home Loan', defaultRate: 8.5, icon: '🏠' },
  car: { name: 'Car Loan', defaultRate: 9.2, icon: '🚗' },
  education: { name: 'Education Loan', defaultRate: 10.0, icon: '🎓' },
  gold: { name: 'Gold Loan', defaultRate: 10.5, icon: '🏆' },
  other: { name: 'Other', defaultRate: 12.0, icon: '📦' },
};

const INVESTMENT_TYPES = {
  savings: { name: 'Savings Account', return: 3.5 },
  fd: { name: 'Fixed Deposit (Safe)', return: 7.0 },
  bonds: { name: 'Govt Bonds', return: 7.5 },
  mutual_funds: { name: 'Index Funds (Moderate)', return: 11.0 },
  stocks: { name: 'Stocks (Aggressive)', return: 13.5 },
  gold: { name: 'Gold (Historical)', return: 10.0 },
};

const CURRENCIES = {
  USD: { code: 'USD', locale: 'en-US', symbol: '$', name: 'USD ($)' },
  INR: { code: 'INR', locale: 'en-IN', symbol: '₹', name: 'INR (₹)' },
  EUR: { code: 'EUR', locale: 'de-DE', symbol: '€', name: 'EUR (€)' },
  GBP: { code: 'GBP', locale: 'en-GB', symbol: '£', name: 'GBP (£)' },
  JPY: { code: 'JPY', locale: 'ja-JP', symbol: '¥', name: 'JPY (¥)' },
};

// 2025 Forecast Data
const INFLATION_DEFAULTS = {
  USD: 2.9,
  INR: 4.5,
  EUR: 2.3,
  GBP: 3.6,
  JPY: 3.0
};

// --- Helper Functions ---
const calculateEMI = (principal, rate, years) => {
  if (rate === 0) return principal / (years * 12);
  const r = rate / 12 / 100;
  const n = years * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

const calculateCompoundInterest = (principal, rate, years) => {
  return principal * Math.pow(1 + rate / 100, years);
};

const adjustForInflation = (amount, inflationRate, years) => {
  return amount / Math.pow(1 + inflationRate / 100, years);
};

// --- Shared UI Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden ${className}`}>
    {children}
  </div>
);

const ResultRow = ({ label, value, subtext, highlight = false, isGood = null }) => (
  <div className={`flex justify-between items-center p-3 rounded-lg ${highlight ? 'bg-slate-50 dark:bg-slate-800' : ''}`}>
    <div>
      <div className="font-medium text-slate-700 dark:text-slate-200">{label}</div>
      {subtext && <div className="text-xs text-slate-500 dark:text-slate-400">{subtext}</div>}
    </div>
    <div className={`text-right font-bold ${isGood === true ? 'text-green-600 dark:text-green-400' :
      isGood === false ? 'text-red-600 dark:text-red-400' :
        'text-slate-800 dark:text-slate-100'
      }`}>
      {value}
    </div>
  </div>
);

// --- 1. LANDING PAGE COMPONENT ---
const LandingPage = ({ onStart }) => (
  <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
    {/* Hero Section */}
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/50 via-slate-50 to-slate-50 dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-6 border border-indigo-200 dark:border-indigo-800">
              <Zap className="w-3 h-3" /> AI-Powered Financial Engine 2.0
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Stop Guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                Start Calculating.
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Should you buy cash or take credit? Our AI analyzes inflation, opportunity costs, and market rates to give you the mathematically perfect answer in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onStart}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Launch Calculator <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Visual Concept */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {/* Mock UI Header */}
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
              </div>
              {/* Mock Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <div className="text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-1">Loan Cost</div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">$28,400</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-green-600 dark:text-green-400 text-sm font-bold mb-1">Investment Gain</div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">$35,200</div>
                </div>
              </div>
              {/* Mock Graph */}
              <div className="h-32 flex items-end gap-2 px-2">
                <div className="w-1/4 h-[40%] bg-slate-200 dark:bg-slate-700 rounded-t-md"></div>
                <div className="w-1/4 h-[60%] bg-slate-300 dark:bg-slate-600 rounded-t-md"></div>
                <div className="w-1/4 h-[80%] bg-indigo-400 rounded-t-md"></div>
                <div className="w-1/4 h-[100%] bg-indigo-600 rounded-t-md shadow-lg shadow-indigo-500/30"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Value Props */}
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why use Finalyze AI?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Traditional calculators only show EMI. We show you the whole financial picture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BrainCircuit className="w-8 h-8 text-indigo-500" />,
              title: "Opportunity Cost Logic",
              desc: "We calculate what your cash could earn if invested, comparing it directly against loan interest rates."
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-green-500" />,
              title: "Inflation Adjustment",
              desc: "Toggle real-world purchasing power logic to see what your money is actually worth in the future."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
              title: "Privacy First",
              desc: "All calculations happen locally in your browser. No financial data is ever sent to our servers."
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors">
              <div className="mb-4 bg-white dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features List */}
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Globe />, text: "Global Currency Support" },
            { icon: <LayoutDashboard />, text: "Detailed Analytics Dashboard" },
            { icon: <Lightbulb />, text: "Smart Prepayment Roadmap" },
            { icon: <Zap />, text: "Instant Comparison Engine" }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="text-indigo-600 dark:text-indigo-400">{feat.icon}</div>
              <span className="font-medium text-slate-700 dark:text-slate-200">{feat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// --- 2. PRIVACY POLICY COMPONENT ---
const PrivacyPolicy = () => (
  <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20">
    <div className="max-w-3xl mx-auto px-6">
      <Card className="p-8 md:p-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-green-500" /> Privacy Policy
        </h1>

        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
          <p>
            Last Updated: November 29, 2025
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">1. Data Processing</h3>
          <p>
            Finalyze AI operates as a <strong>client-side application</strong>. This means all calculations regarding your loans, investments, and inflation adjustments occur directly within your web browser. We do not transmit your financial inputs (loan amounts, interest rates, etc.) to any external server.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">2. Local Storage</h3>
          <p>
            We may use your browser's Local Storage to save your preferences (such as Dark Mode settings or selected Currency) to improve your experience upon returning to the site. This data remains on your device and is not accessible by us.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">3. Third-Party Services</h3>
          <p>
            The application may fetch generic market data (such as average inflation rates or currency symbols) from public APIs. No personally identifiable information is attached to these requests.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">4. Contact</h3>
          <p>
            If you have questions about this policy, please contact m.nath190702@gmail.com.
          </p>
        </div>
      </Card>
    </div>
  </div>
);

// --- 3. FINANCE TOOL COMPONENT (The Calculator) ---
const FinanceTool = () => {
  const [activeTab, setActiveTab] = useState('compare');
  const [currency, setCurrency] = useState('USD');
  const [showCalculations, setShowCalculations] = useState(false);

  const [loanType, setLoanType] = useState('personal');
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(LOAN_TYPES.personal.defaultRate);

  const [tenureValue, setTenureValue] = useState(5);
  const [tenureMode, setTenureMode] = useState('years');

  const [hasCash, setHasCash] = useState(true);
  const [investmentReturn, setInvestmentReturn] = useState(8.0);
  const [investmentType, setInvestmentType] = useState('mutual_funds');
  const [inflation, setInflation] = useState(INFLATION_DEFAULTS.USD);
  const [useInflation, setUseInflation] = useState(false);
  const [extraPayment, setExtraPayment] = useState(0);

  // AI State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    setRate(LOAN_TYPES[loanType].defaultRate);
  }, [loanType]);

  useEffect(() => {
    if (investmentType !== 'custom') {
      setInvestmentReturn(INVESTMENT_TYPES[investmentType].return);
    }
  }, [investmentType]);

  // Update inflation default when currency changes
  useEffect(() => {
    if (INFLATION_DEFAULTS[currency]) {
      setInflation(INFLATION_DEFAULTS[currency]);
    }
  }, [currency]);

  // Clear AI analysis when inputs change significantly
  useEffect(() => {
    setAiAnalysis(null);
  }, [amount, rate, tenureValue, investmentReturn, hasCash]);

  const formatCurrency = (val) => {
    const curr = CURRENCIES[currency];
    return new Intl.NumberFormat(curr.locale, {
      style: 'currency',
      currency: curr.code,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculations = useMemo(() => {
    const effectiveYears = tenureMode === 'years' ? tenureValue : tenureValue / 12;
    if (effectiveYears <= 0) return { emi: 0, totalLoanCost: 0, roadmap: { saved: 0, newTenure: 0 } };

    const emi = calculateEMI(amount, rate, effectiveYears);
    const totalLoanCost = emi * effectiveYears * 12;
    const totalInterestPaid = totalLoanCost - amount;
    const futureValueIfInvested = calculateCompoundInterest(amount, investmentReturn, effectiveYears);
    const investmentGain = futureValueIfInvested - amount;

    const realTotalInterest = useInflation ? adjustForInflation(totalInterestPaid, inflation, effectiveYears) : totalInterestPaid;
    const realInvestmentGain = useInflation ? adjustForInflation(investmentGain, inflation, effectiveYears) : investmentGain;

    const calculatePrepaymentSavings = () => {
      if (extraPayment <= 0) return { newTenure: effectiveYears, saved: 0 };
      let balance = amount;
      let months = 0;
      let totalPaidNew = 0;
      const r = rate / 12 / 100;
      const totalMonthly = emi + extraPayment;
      const maxMonths = 360 * 2;

      while (balance > 1 && months < maxMonths) {
        const interest = balance * r;
        const principalPart = totalMonthly - interest;
        balance -= principalPart;
        totalPaidNew += totalMonthly;
        months++;
        if (balance < 0) totalPaidNew += balance;
      }
      return { newTenure: months / 12, saved: totalLoanCost - totalPaidNew };
    };

    return {
      emi,
      totalLoanCost,
      totalInterestPaid,
      investmentGain,
      realInvestmentGain,
      realTotalInterest,
      effectiveYears,
      roadmap: calculatePrepaymentSavings()
    };
  }, [amount, rate, tenureValue, tenureMode, investmentReturn, hasCash, inflation, useInflation, extraPayment]);

  const getVerdict = () => {
    if (!hasCash) return { winner: 'credit', title: 'Loan Required', desc: "Focus on minimizing interest via prepayments since cash isn't available.", color: 'blue' };

    // UPDATED LOGIC: Compare actual money values, not just rates.
    // Because loans are on reducing balance and investments are on full principal, 
    // you can often profit even if Loan Rate > Investment Rate.
    const netBenefit = calculations.investmentGain - calculations.totalInterestPaid;

    if (netBenefit > 0) {
      return {
        winner: 'credit',
        title: 'Take the Credit (Arbitrage)',
        desc: `Smart Move! Even with a ${rate}% loan rate, your investment returns on the full principal outweigh the reducing loan interest. You profit ${formatCurrency(netBenefit)} by keeping your cash invested.`,
        color: 'green'
      };
    } else if (netBenefit > - (amount * 0.05)) { // Tolerance zone for "Close Call" (loss < 5% of principal)
      return {
        winner: 'neutral',
        title: 'Close Call',
        desc: "The math favors cash slightly, but the cost of the loan is very low. Keeping your cash (Liquidity) might be worth this small cost.",
        color: 'yellow'
      };
    } else {
      return {
        winner: 'cash',
        title: 'Pay with Cash',
        desc: `The loan is too expensive compared to your returns. You would lose ${formatCurrency(Math.abs(netBenefit))} by taking the loan. Paying upfront is better.`,
        color: 'purple'
      };
    }
  };

  const verdict = getVerdict();

  const handleAIAnalysis = async () => {
    setIsAiLoading(true);
    const apiKey = ""; // Runtime injection

    const prompt = `
      Act as a wise, friendly financial expert.
      Analyze this user's decision:
      - Purchase: ${loanType}
      - Cost: ${amount} ${currency}
      - Has Cash on hand? ${hasCash ? 'Yes' : 'No'}
      - Loan Rate: ${rate}% for ${tenureValue} ${tenureMode}
      - Alternative Investment Return: ${investmentReturn}% (if they keep cash)
      - Inflation: ${inflation}%

      Math Verdict: ${verdict.desc}

      Task: Provide a 3-sentence "Expert Insight" for the user. 
      1. Explain *why* the math verdict makes sense in plain English.
      2. Mention the "Opportunity Cost" or "Arbitrage" if applicable.
      3. Give one cautionary tip about risk or inflation.
      Use emojis. Keep it encouraging but realistic.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiAnalysis(text || "Could not generate analysis. Please try again.");
    } catch (e) {
      console.error(e);
      setAiAnalysis("Unable to connect to AI Advisor. Check your connection.");
    }
    setIsAiLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Configuration
            </h2>

            <div className="space-y-5">
              {/* Currency Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Currency</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none text-slate-700 dark:text-white cursor-pointer"
                  >
                    {Object.values(CURRENCIES).map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Loan Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Purchase Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(LOAN_TYPES).map(([key, type]) => (
                    <button
                      key={key}
                      onClick={() => setLoanType(key)}
                      className={`p-3 rounded-lg border text-sm flex flex-col items-center gap-1 transition-all ${loanType === key
                        ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <span className="text-[10px] font-medium">{type.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-sans">
                    {CURRENCIES[currency].symbol}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-700 dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Cash Toggle */}
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 pl-2">Do you have cash?</span>
                <div className="flex bg-white dark:bg-slate-700 rounded-md p-1 shadow-sm">
                  <button onClick={() => setHasCash(true)} className={`px-4 py-1 rounded text-xs font-bold transition-all ${hasCash ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400'}`}>YES</button>
                  <button onClick={() => setHasCash(false)} className={`px-4 py-1 rounded text-xs font-bold transition-all ${!hasCash ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400'}`}>NO</button>
                </div>
              </div>

              {/* Rate & Tenure */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Loan Rate (%)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    <span>Tenure</span>
                    <button onClick={() => setTenureMode(m => m === 'years' ? 'months' : 'years')} className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />{tenureMode === 'years' ? 'Years' : 'Months'}
                    </button>
                  </label>
                  <input
                    type="number"
                    value={tenureValue}
                    onChange={(e) => setTenureValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Investment */}
              {hasCash && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in">
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">If invested instead:</label>
                  <select
                    value={investmentType}
                    onChange={(e) => setInvestmentType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg mb-2 text-sm text-slate-700 dark:text-white"
                  >
                    {Object.entries(INVESTMENT_TYPES).map(([key, item]) => (
                      <option key={key} value={key}>{item.name} (~{item.return}%)</option>
                    ))}
                    <option value="custom">Custom Rate</option>
                  </select>
                  {investmentType === 'custom' && (
                    <div className="flex items-center gap-2">
                      <input type="number" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                      <span className="text-slate-500">%</span>
                    </div>
                  )}
                </div>
              )}

              {/* Inflation */}
              <div className="pt-2">
                <button onClick={() => setUseInflation(!useInflation)} className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300">
                  {useInflation ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-indigo-600 dark:border-indigo-400" />}
                  Adjust for Inflation (Real Value)
                </button>
                {useInflation && (
                  <div className="mt-2 flex items-center gap-2 animate-in fade-in">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Rate ({currency}):</span>
                    <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                    <span className="text-xs text-slate-500">%</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-0 bg-transparent shadow-none dark:bg-transparent">
            <div className={`p-6 rounded-t-xl border-l-8 shadow-lg ${verdict.winner === 'credit' ? 'border-green-500 bg-green-50/90 dark:bg-green-900/30' :
              verdict.winner === 'cash' ? 'border-purple-500 bg-purple-50/90 dark:bg-purple-900/30' :
                'border-yellow-500 bg-yellow-50/90 dark:bg-yellow-900/30'
              }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{verdict.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{verdict.desc}</p>
                </div>
                <div className={`p-3 rounded-full ${verdict.winner === 'credit' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                  verdict.winner === 'cash' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                    'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                  }`}>
                  {verdict.winner === 'credit' ? <TrendingUp className="w-8 h-8" /> :
                    verdict.winner === 'cash' ? <Banknote className="w-8 h-8" /> : <RefreshCcw className="w-8 h-8" />}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-b-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="flex border-b border-slate-100 dark:border-slate-800">
                <button onClick={() => setActiveTab('compare')} className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'compare' ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Analysis</button>
                <button onClick={() => setActiveTab('roadmap')} className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'roadmap' ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Roadmap</button>
              </div>

              <div className="p-6">
                {activeTab === 'compare' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                        <div className="text-xs font-semibold text-slate-400 uppercase">Monthly EMI</div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-white">{formatCurrency(calculations.emi)}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total: {formatCurrency(calculations.totalLoanCost)}</div>
                      </div>
                      {hasCash && (
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                          <div className="text-xs font-semibold text-slate-400 uppercase">Potential Gain</div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">+{formatCurrency(calculations.investmentGain)}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">From Investments</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        Analysis {useInflation && <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">Inflation Adjusted</span>}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <ResultRow label="Interest to Bank" value={`-${formatCurrency(calculations.realTotalInterest)}`} isGood={false} />
                        {hasCash && (
                          <>
                            <ResultRow label="Investment Returns" value={`+${formatCurrency(calculations.realInvestmentGain)}`} isGood={true} />
                            <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>
                            <ResultRow
                              label="Net Benefit"
                              value={`${calculations.investmentGain > calculations.totalInterestPaid ? '+' : ''}${formatCurrency(Math.abs(calculations.realInvestmentGain - calculations.realTotalInterest))}`}
                              isGood={calculations.investmentGain > calculations.totalInterestPaid}
                              highlight={true}
                            />
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => setShowCalculations(!showCalculations)}
                        className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-4 hover:underline"
                      >
                        {showCalculations ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        View Calculation Details
                      </button>
                      {showCalculations && (
                        <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400 space-y-4 border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                          <div>
                            <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">Loan Interest (Reducing Balance)</div>
                            <div>P = {formatCurrency(amount)}, R = {rate}%, N = {Math.round(calculations.effectiveYears * 12)}m</div>
                            <div>EMI = [P x R x (1+R)^N] / [(1+R)^N-1] = {formatCurrency(calculations.emi)}</div>
                            <div>Total Paid = {formatCurrency(calculations.emi)} x {Math.round(calculations.effectiveYears * 12)} = {formatCurrency(calculations.totalLoanCost)}</div>
                            <div>Interest = Total - P = {formatCurrency(calculations.totalInterestPaid)}</div>
                            {useInflation && (
                              <div className="text-orange-600 dark:text-orange-400 mt-1">
                                *Inflation Adj: {formatCurrency(calculations.totalInterestPaid)} / (1 + {inflation}%)^{calculations.effectiveYears.toFixed(1)}y = {formatCurrency(calculations.realTotalInterest)}
                              </div>
                            )}
                          </div>
                          {hasCash && (
                            <div>
                              <div className="font-bold text-green-700 dark:text-green-300 mb-1">Investment Returns (Compound)</div>
                              <div>P = {formatCurrency(amount)}, R = {investmentReturn}%, T = {calculations.effectiveYears.toFixed(1)}y</div>
                              <div>Future Value = P x (1 + R/100)^T</div>
                              <div>FV = {formatCurrency(amount)} x (1.0{Math.floor(investmentReturn)})^{calculations.effectiveYears.toFixed(1)} = {formatCurrency(amount + calculations.investmentGain)}</div>
                              <div>Gain = FV - P = {formatCurrency(calculations.investmentGain)}</div>
                              {useInflation && (
                                <div className="text-orange-600 dark:text-orange-400 mt-1">
                                  *Inflation Adj: {formatCurrency(calculations.investmentGain)} / (1 + {inflation}%)^{calculations.effectiveYears.toFixed(1)}y = {formatCurrency(calculations.realInvestmentGain)}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* NEW: Gemini AI Integration Section */}
                    <div className="mt-6 border-t border-slate-100 dark:border-slate-700 pt-6">
                      {!aiAnalysis ? (
                        <button
                          onClick={handleAIAnalysis}
                          disabled={isAiLoading}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                          {isAiLoading ? (
                            <>Analyzing...</>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              Get AI Expert Insight ✨
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800 animate-in fade-in slide-in-from-bottom-2">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-indigo-900 dark:text-indigo-200 font-bold flex items-center gap-2">
                              <MessageSquareQuote className="w-5 h-5" /> Gemini Expert View
                            </h4>
                            <button onClick={() => setAiAnalysis(null)} className="text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 underline">Close</button>
                          </div>
                          <p className="text-slate-700 dark:text-indigo-100 text-sm leading-relaxed whitespace-pre-line">
                            {aiAnalysis}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <h3 className="text-indigo-900 dark:text-indigo-200 font-bold mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Reduce Interest</h3>
                      <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-4">Add extra payments to save huge amounts on interest.</p>

                      <label className="flex justify-between text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-2">
                        <span>Extra Monthly: {formatCurrency(extraPayment)}</span>
                      </label>
                      <input type="range" min="0" max={calculations.emi} step="50" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} className="w-full h-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Interest Saved</div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(calculations.roadmap.saved)}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Time Saved</div>
                          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{(calculations.effectiveYears - calculations.roadmap.newTenure).toFixed(1)} Years</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="bg-slate-800 dark:bg-slate-900 text-slate-300 p-4 rounded-xl text-xs leading-relaxed border border-slate-700 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold uppercase tracking-wider"><Calculator className="w-3 h-3" /> AI Logic</div>
            {useInflation ? "Values adjusted for Purchasing Power Parity (Real Value). " : "Values are Nominal. "}
            Currency set to {currency} with local default inflation data ({INFLATION_DEFAULTS[currency]}%).
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN APP SHELL ---
export default function App() {
  const [view, setView] = useState('landing'); // landing, app, privacy
  const [theme, setTheme] = useState('light');

  // NEW: Dynamic Favicon & Title Effect
  useEffect(() => {
    // 1. Update Title
    document.title = "Finalyze AI";

    // 2. Update Favicon
    if (USER_CUSTOM_ICON_URL) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.type = 'image/png';
      link.href = USER_CUSTOM_ICON_URL;
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            {USER_CUSTOM_ICON_URL ? (
              <img src={USER_CUSTOM_ICON_URL} alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-indigo-50 dark:bg-slate-800" />
            ) : (
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <Calculator className="w-5 h-5" />
              </div>
            )}
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Finalyze <span className="text-indigo-600 dark:text-indigo-400">AI</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <button onClick={() => setView('landing')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</button>
              <button onClick={() => setView('app')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Calculator</button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {view !== 'app' && (
              <button
                onClick={() => setView('app')}
                className="hidden md:block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-all"
              >
                Try for Free
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-64px)]">
        {view === 'landing' && <LandingPage onStart={() => setView('app')} />}
        {view === 'app' && <FinanceTool />}
        {view === 'privacy' && <PrivacyPolicy />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 Finalyze AI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <button onClick={() => setView('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</button>
              <button className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</button>
              <button className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}