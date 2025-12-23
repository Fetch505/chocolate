import { motion } from 'framer-motion';
import { Type, Plus } from 'lucide-react';
import Canvas from '../../pages/canvas';
import { forwardRef } from 'react';

interface Step2Props {
    shape: string;
    color: string;
    filling: string;
    text: string;
    setText: (text: string) => void;
    canvasRef: any;
    onAddText: () => void;
}

const Step2AddText = forwardRef<HTMLDivElement, Step2Props>(
    ({ shape, color, filling, text, setText, canvasRef, onAddText }, ref) => {
        return (
            <motion.div
                ref={ref}
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
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                            <Type className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl font-bold mb-3 gradient-text">Add Your Text</h2>
                    <p className="text-amber-700 text-lg">Click on the text to edit, drag to move, use handles to transform</p>
                </div>

                {/* Canvas Container */}
                <div className="w-full mb-6">
                    <div className="w-full h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 relative">
                        <Canvas ref={canvasRef} shape={shape} color={color} filling={filling} />
                    </div>
                </div>

                {/* Text Controls */}
                <div className="w-full max-w-2xl">
                    <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter your text..."
                                className="flex-1 px-6 py-4 bg-white border-2 border-amber-300 rounded-xl text-amber-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all"
                            />
                            <motion.button
                                onClick={onAddText}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Plus className="w-5 h-5" />
                                Add Text
                            </motion.button>
                        </div>
                        <p className="text-xs text-amber-600 mt-3 text-center">
                            💡 Tip: Click on text to select it, then drag to move or use the colored handles to rotate, resize, or
                            duplicate
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }
);

Step2AddText.displayName = 'Step2AddText';
export default Step2AddText;
