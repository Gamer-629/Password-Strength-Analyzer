import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

const getStrengthLabel = (score) => {
  switch (score) {
    case 0: return '💀 Very Weak';
    case 1: return '😬 Weak';
    case 2: return '😐 Fair';
    case 3: return '💪 Strong';
    case 4: return '🛡️ Very Strong';
    default: return '';
  }
};

function App() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const result = zxcvbn(password);

  const strength = getStrengthLabel(result.score);
  const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-950 px-4 text-white font-sans">
      <div className="w-full max-w-md bg-white bg-opacity-5 rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-sm border border-white/10">
        <h1 className="text-3xl font-extrabold text-center text-white">🔐 Password Strength Analyzer</h1>
        <p className="text-sm text-gray-300 text-center">Check how secure your password is, instantly!</p>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-300">🔑 Enter Password:</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-indigo-400 outline-none placeholder:text-gray-400"
              placeholder="Type a strong password..."
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs text-indigo-300 hover:text-white transition"
            >
              {show ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>
        </div>

        {password && (
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-white text-lg">Strength: <span className="text-indigo-400">{strength}</span></p>
            </div>
            <div>
              <p className="text-white">🕒 Estimated Time to Crack: <span className="font-medium text-green-300">{crackTime}</span></p>
            </div>

            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.score === 0 ? 'bg-red-500 w-1/5' :
                  result.score === 1 ? 'bg-orange-400 w-2/5' :
                  result.score === 2 ? 'bg-yellow-300 w-3/5' :
                  result.score === 3 ? 'bg-green-400 w-4/5' :
                  'bg-emerald-500 w-full'
                }`}
              />
            </div>
          </div>
        )}

        <div className="pt-4 text-xs text-center text-gray-400 border-t border-white/10">
          🚀 Built with React + zxcvbn | <span className="text-indigo-300">Make your password unstoppable</span>
        </div>
      </div>
    </div>
  );
}

export default App;
