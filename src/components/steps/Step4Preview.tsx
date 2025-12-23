import { motion } from 'framer-motion';
import { Download, RotateCcw, CheckCircle } from 'lucide-react';
import Canvas from '../../pages/canvas';

interface Step4Props {
    shape: string;
    color: string;
    filling: string;
    canvasRef: any;
    onExport: () => void;
    onReset: () => void;
}

export default function Step4Preview({ shape, color, filling, canvasRef, onExport, onReset }: Step4Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-6xl mx-auto px-6 py-4 pb-24"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-block mb-4"
                >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                </motion.div>
                <h2 className="text-4xl font-bold mb-3 gradient-text">Your Chocolate is Ready!</h2>
                <p className="text-amber-700 text-lg">Preview your design and export it when you're happy</p>
            </div>

            {/* Canvas Preview */}
            <div className="w-full mb-8">
                <div className="w-full h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 relative">
                    <Canvas ref={canvasRef} shape={shape} color={color} filling={filling} />
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Final Preview
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-2xl">
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 shadow-lg border-2 border-amber-200">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Export Button */}
                        <motion.button
                            onClick={onExport}
                            className="px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Download className="w-6 h-6" />
                            Export as PNG
                        </motion.button>

                        {/* Start Over Button */}
                        <motion.button
                            onClick={onReset}
                            className="px-8 py-5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:from-gray-300 hover:to-gray-400 shadow-lg hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <RotateCcw className="w-6 h-6" />
                            Start Over
                        </motion.button>
                    </div>

                    <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                        <p className="text-sm text-amber-800 text-center">
                            <strong>💡 Pro Tip:</strong> You can still go back to previous steps to make changes before exporting!
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
