import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'var(--gradient-gold)',
            }}
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center relative z-10">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg'
                    : isCurrent
                    ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-xl animate-pulse-glow'
                    : 'bg-white text-amber-300 border-2 border-amber-200'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  isCurrent ? 'text-amber-900 font-semibold' : 'text-amber-600'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
