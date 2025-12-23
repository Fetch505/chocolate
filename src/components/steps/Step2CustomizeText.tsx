import { motion } from 'framer-motion';
import { Type, Move } from 'lucide-react';
import Canvas from '../../pages/canvas';
import { forwardRef, useEffect } from 'react';

interface Step2Props {
    shape: string;
    color: string;
    filling: string;
    text: string;
    setText: (text: string) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
    fontFamily: string;
    setFontFamily: (family: string) => void;
    fontColor: string;
    setFontColor: (color: string) => void;
    fontWeight: string;
    setFontWeight: (weight: string) => void;
    effectMode: string;
    setEffectMode: (mode: string) => void;
    effectStrength: number;
    setEffectStrength: (strength: number) => void;
    canvasRef: any;
    selectedItem: string | null;
    onAddText: () => void;
    onSelectionChange?: (item: any | null) => void;
}

const fonts = [
    { value: 'Tajawal, sans-serif', label: 'Tajawal', preview: 'تجول' },
    { value: 'Cairo, sans-serif', label: 'Cairo', preview: 'القاهرة' },
    { value: 'Amiri, serif', label: 'Amiri', preview: 'أميري' },
    { value: 'Noto Kufi Arabic, sans-serif', label: 'Noto Kufi', preview: 'نوتو' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat', preview: 'Aa' },
    { value: 'Poppins, sans-serif', label: 'Poppins', preview: 'Aa' },
    { value: 'Roboto, sans-serif', label: 'Roboto', preview: 'Aa' },
    { value: 'Playfair Display, serif', label: 'Playfair', preview: 'Aa' },
];

const Step2CustomizeText = forwardRef<HTMLDivElement, Step2Props>(
    (
        {
            shape,
            color,
            filling,
            text,
            setText,
            fontSize,
            setFontSize,
            fontFamily,
            setFontFamily,
            fontColor,
            setFontColor,
            fontWeight,
            setFontWeight,
            effectMode,
            setEffectMode,
            effectStrength,
            setEffectStrength,
            canvasRef,
            onAddText,
            onSelectionChange,
        },
        ref
    ) => {
        // Initialize with default text if canvas is ready
        useEffect(() => {
            const timer = setTimeout(() => {
                if (canvasRef.current) {
                    canvasRef.current.addTextItem({
                        text: 'عيد مبارك',
                        size: 48,
                        family: 'Cairo, sans-serif',
                        color: '#000000',
                        bold: false,
                        effect: 'none',
                        strength: 100,
                    });
                }
            }, 500);
            return () => clearTimeout(timer);
        }, []);

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-7xl mx-auto px-6 py-4 pb-24"
            >
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Canvas (Sticky) */}
                    <div className="lg:sticky lg:top-24">
                        <div className="text-center lg:text-left mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-block mb-4"
                            >
                                <div className="w-20 h-20 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                                    <Type className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>
                            <h2 className="text-4xl font-bold mb-3 gradient-text">Customize Your Text</h2>
                            <p className="text-amber-700 text-lg">Add text and style it to perfection</p>
                        </div>

                        {/* Canvas */}
                        <div className="w-full h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200 relative mb-4">
                            <Canvas ref={canvasRef} shape={shape} color={color} filling={filling} onSelectionChange={onSelectionChange} />
                        </div>

                        {/* Movement Instructions */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                            <div className="flex items-start gap-3">
                                <Move className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-blue-900 mb-1">How to Move & Transform Text</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• <strong>Move:</strong> Click and drag the text</li>
                                        <li>• <strong>Rotate:</strong> Use the blue handle</li>
                                        <li>• <strong>Resize:</strong> Use the green handle</li>
                                        <li>• <strong>Delete:</strong> Use the red X button</li>
                                        <li>• <strong>Duplicate:</strong> Use the purple button</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Text Controls */}
                    <div className="space-y-6">
                        {/* Add Text Section */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                            <h3 className="text-lg font-bold text-amber-900 mb-4">Add New Text</h3>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Enter your text..."
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl text-amber-900 font-semibold focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all"
                                />
                                <motion.button
                                    onClick={onAddText}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    + Add
                                </motion.button>
                            </div>
                        </div>

                        {/* Style Section - Always visible */}
                        <div className="space-y-6">
                            {/* Font Family */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                                <h3 className="text-lg font-bold text-purple-900 mb-4">Font Family</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {fonts.map((font) => (
                                        <motion.button
                                            key={font.value}
                                            onClick={() => setFontFamily(font.value)}
                                            className={`p-3 rounded-lg border-2 transition-all ${fontFamily === font.value
                                                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-md'
                                                : 'border-purple-200 bg-white hover:border-purple-300'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="text-xl mb-1" style={{ fontFamily: font.value }}>
                                                {font.preview}
                                            </div>
                                            <div className="text-xs font-semibold text-purple-900">{font.label}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Font Size & Weight */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-200">
                                    <label className="block text-sm font-bold text-purple-900 mb-3">
                                        Size: {fontSize}px
                                    </label>
                                    <input
                                        type="range"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(Number(e.target.value))}
                                        min="12"
                                        max="120"
                                        className="w-full h-3 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                    />
                                </div>

                                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-200">
                                    <label className="block text-sm font-bold text-purple-900 mb-3">Weight</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <motion.button
                                            onClick={() => setFontWeight('400')}
                                            className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${fontWeight === '400'
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                                                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                                                }`}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Normal
                                        </motion.button>
                                        <motion.button
                                            onClick={() => setFontWeight('700')}
                                            className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${fontWeight === '700'
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                                                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                                                }`}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Bold
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Font Color */}
                            <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-200">
                                <label className="block text-sm font-bold text-purple-900 mb-3">Text Color</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="color"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        className="w-16 h-16 border-4 border-purple-300 rounded-xl cursor-pointer shadow-md"
                                    />
                                    <div className="flex-1">
                                        <div className="text-2xl font-bold mb-1" style={{ color: fontColor }}>
                                            Preview
                                        </div>
                                        <div className="text-sm text-purple-600 font-mono">{fontColor}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Effects */}
                            <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-200">
                                <label className="block text-sm font-bold text-purple-900 mb-3">Effects</label>
                                <select
                                    value={effectMode}
                                    onChange={(e) => setEffectMode(e.target.value)}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg text-purple-900 font-semibold cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all appearance-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%237c3aed' d='M8 12L2 6h12z'/%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 1rem center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <option value="none">None</option>
                                    <option value="curve">Curve</option>
                                    <option value="wave">Wave</option>
                                    <option value="flag">Flag</option>
                                </select>

                                {effectMode !== 'none' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3"
                                    >
                                        <label className="block text-sm font-semibold text-purple-800 mb-2">
                                            Strength: {effectStrength}
                                        </label>
                                        <input
                                            type="range"
                                            value={effectStrength}
                                            onChange={(e) => setEffectStrength(Number(e.target.value))}
                                            min="10"
                                            max="220"
                                            className="w-full h-3 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                    </motion.div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
);

Step2CustomizeText.displayName = 'Step2CustomizeText';
export default Step2CustomizeText;
