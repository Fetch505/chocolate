import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    canProceed?: boolean;
}

export default function NavigationButtons({
    currentStep,
    totalSteps,
    onPrevious,
    onNext,
    canProceed = true,
}: NavigationButtonsProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="sticky bottom-0 bg-gradient-to-t from-amber-100 via-amber-50 to-transparent pt-8 pb-6">
            <div className="flex items-center justify-between gap-4 w-full max-w-md mx-auto px-4">
                {/* Previous Button */}
                <motion.button
                    onClick={onPrevious}
                    disabled={isFirstStep}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${isFirstStep
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-amber-900 border-2 border-amber-200 hover:border-amber-400 hover:shadow-md active:scale-95'
                        }`}
                    whileHover={!isFirstStep ? { scale: 1.02 } : {}}
                    whileTap={!isFirstStep ? { scale: 0.98 } : {}}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </motion.button>

                {/* Next/Finish Button */}
                <motion.button
                    onClick={onNext}
                    disabled={!canProceed}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${!canProceed
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl active:scale-95'
                        }`}
                    whileHover={canProceed ? { scale: 1.05 } : {}}
                    whileTap={canProceed ? { scale: 0.95 } : {}}
                >
                    {isLastStep ? 'Finish' : 'Next'}
                    {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </motion.button>
            </div>
        </div>
    );
}
