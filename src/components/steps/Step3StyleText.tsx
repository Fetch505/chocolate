import { motion } from 'framer-motion';
import { Palette, AlertCircle } from 'lucide-react';

interface Step3Props {
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
    selectedItem: string | null;
    onApplyChanges: () => void;
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

export default function Step3StyleText({
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
    selectedItem,
    onApplyChanges,
}: Step3Props) {
    if (!selectedItem) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full flex flex-col items-center justify-center px-6 py-8"
            >
                <div className="max-w-md text-center">
                    <AlertCircle className="w-24 h-24 text-amber-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-amber-900 mb-3">No Text Selected</h3>
                    <p className="text-amber-700 text-lg mb-6">
                        Please go back to Step 2 and click on a text element to select it before styling.
                    </p>
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                        <p className="text-sm text-amber-800">
                            💡 <strong>Tip:</strong> Click on any text on your chocolate to select it, then come back here to style
                            it!
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto px-6 py-8"
        >
            {/* Header */}
            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-block mb-4"
                >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                        <Palette className="w-10 h-10 text-white" />
                    </div>
                </motion.div>
                <h2 className="text-4xl font-bold mb-3 gradient-text">Style Your Text</h2>
                <p className="text-amber-700 text-lg">Customize the appearance of your selected text</p>
            </div>

            {/* Styling Options */}
            <div className="space-y-6">
                {/* Text Content */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                    <label className="block text-sm font-bold text-amber-900 mb-3 uppercase tracking-wide">Text Content</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl text-amber-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all"
                    />
                </div>

                {/* Font Family */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                    <label className="block text-sm font-bold text-amber-900 mb-4 uppercase tracking-wide">Font Family</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {fonts.map((font) => (
                            <motion.button
                                key={font.value}
                                onClick={() => setFontFamily(font.value)}
                                className={`p-4 rounded-xl border-2 transition-all ${fontFamily === font.value
                                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg scale-105'
                                        : 'border-amber-200 bg-white hover:border-purple-300 hover:shadow-md'
                                    }`}
                                whileHover={{ scale: fontFamily === font.value ? 1.05 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-2xl mb-1" style={{ fontFamily: font.value }}>
                                    {font.preview}
                                </div>
                                <div className="text-xs font-semibold text-amber-900">{font.label}</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Font Size & Weight */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                        <label className="block text-sm font-bold text-amber-900 mb-3 uppercase tracking-wide">
                            Font Size: {fontSize}px
                        </label>
                        <input
                            type="range"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            min="12"
                            max="120"
                            className="w-full h-3 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-amber-600 mt-2">
                            <span>Small</span>
                            <span>Large</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                        <label className="block text-sm font-bold text-amber-900 mb-3 uppercase tracking-wide">Font Weight</label>
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                onClick={() => setFontWeight('400')}
                                className={`py-3 px-4 rounded-xl font-medium transition-all ${fontWeight === '400'
                                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                Normal
                            </motion.button>
                            <motion.button
                                onClick={() => setFontWeight('700')}
                                className={`py-3 px-4 rounded-xl font-bold transition-all ${fontWeight === '700'
                                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                Bold
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Font Color */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                    <label className="block text-sm font-bold text-amber-900 mb-3 uppercase tracking-wide">Text Color</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                            className="w-20 h-20 border-4 border-amber-300 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                        />
                        <div className="flex-1">
                            <div className="text-2xl font-bold mb-1" style={{ color: fontColor }}>
                                Preview Text
                            </div>
                            <div className="text-sm text-amber-600 font-mono">{fontColor}</div>
                        </div>
                    </div>
                </div>

                {/* Text Effects */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                    <label className="block text-sm font-bold text-amber-900 mb-4 uppercase tracking-wide">Text Effects</label>
                    <select
                        value={effectMode}
                        onChange={(e) => setEffectMode(e.target.value)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl text-amber-900 font-semibold text-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23d97706' d='M8 12L2 6h12z'/%3E%3C/svg%3E")`,
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
                            className="mt-4"
                        >
                            <label className="block text-sm font-semibold text-amber-800 mb-2">
                                Effect Strength: {effectStrength}
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

                {/* Apply Button */}
                <motion.button
                    onClick={onApplyChanges}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-2xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Apply Changes to Selected Text
                </motion.button>
            </div>
        </motion.div>
    );
}
