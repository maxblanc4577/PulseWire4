import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, ShieldCheck, Lock, ArrowRight, CreditCard, Sparkles } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>('investigative');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate receipt completion
    }, 1000);
  };

  const getImpactDescription = (amt: number) => {
    if (amt < 30) {
      return "Enables satellite radar imagery verification for 50 square kilometers of threatened watershed.";
    } else if (amt < 75) {
      return "Funds 3 days of independent laboratory testing for agricultural aquifer chemical contamination.";
    } else if (amt < 150) {
      return "Subsidizes open-source sensor kit and solar telemetry node for an indigenous forest guardian team.";
    } else {
      return "Sponsors a full week of investigative on-the-ground field reporting in remote conflict-adjacent zones.";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white text-neutral-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-neutral-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono-data uppercase font-bold tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Independent Development Fund</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Invest in Uncensored Global Field Truth
          </h2>
          <p className="text-xs text-neutral-300 mt-1">
            Pulsewire accepts zero government propaganda funding and zero commercial ad sponsorship. 100% reader-backed and trust-chartered.
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              Thank You for Empowering Field Truth
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Your contribution of <strong className="text-neutral-900">${amount} ({frequency})</strong> has been allocated to the {selectedCause === 'investigative' ? 'Investigative Field Desk' : 'Climate Defense Sensor Fund'}. A tax-exempt confirmation and receipt have been dispatched.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Return to Pulsewire
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Frequency Toggle */}
            <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  frequency === 'monthly'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Monthly Sustainer (Most Impact)
              </button>
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  frequency === 'once'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                One-Time Contribution
              </button>
            </div>

            {/* Amount Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono-data">
                Select Contribution Amount (USD)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 100, 250].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleAmountClick(val)}
                    className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                      amount === val && !customAmount
                        ? 'border-cyan-600 bg-cyan-50/70 text-cyan-900 ring-2 ring-cyan-500/20 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="pt-1">
                <input
                  type="number"
                  placeholder="Or enter custom amount in USD..."
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Dynamic Tangible Impact Box */}
            <div className="p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-200/80 text-xs text-neutral-800 flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-950">Immediate Field Tangible Effect: </span>
                <span>{getImpactDescription(amount)}</span>
              </div>
            </div>

            {/* Target Designation Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono-data">
                Designate Impact Priority
              </label>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="investigative">Global Frontline Investigative Bureau Fund</option>
                <option value="climate">Climate Defense & Satellite Telemetry Radar</option>
                <option value="energy">Clean Energy Microgrid & Geothermal Expansion</option>
                <option value="marine">Indigenous Rainforest & Ocean Sanctuaries Defense</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow"
              >
                <CreditCard className="w-4 h-4" />
                <span>Authorize ${amount} {frequency === 'monthly' ? '/ Month' : 'Contribution'}</span>
              </button>
            </div>

            {/* Security Assurance */}
            <div className="flex items-center justify-center space-x-4 text-[11px] text-neutral-500 pt-1">
              <span className="flex items-center">
                <Lock className="w-3 h-3 mr-1 text-emerald-600" />
                256-bit TLS Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-cyan-600" />
                501(c)(3) Equivalent Tax Deductible
              </span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
