import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Canvas from '../../pages/canvas';

interface Step1Props {
    shape: string;
    setShape: (shape: string) => void;
    color: string;
    setColor: (color: string) => void;
    filling: string;
    setFilling: (filling: string) => void;
    canvasRef: any;
    onSelectionChange?: (item: any | null) => void;
}

const shapes = [
    { value: 'dragees', label: 'Dragees', emoji: '🥜', description: 'Classic almond shape' },
    { value: 'cup', label: 'Cup', emoji: '🧁', description: 'Perfect for fillings' },
    { value: 'coin', label: 'Coin', emoji: '🪙', description: 'Round and elegant' },
    { value: 'lotus', label: 'Lotus', emoji: '🌸', description: 'Decorative flower' },
];

const colors = [
    { value: '#8b4513', label: 'Milk Chocolate', gradient: 'from-amber-700 to-amber-800' },
    { value: '#5c4033', label: 'Dark Chocolate', gradient: 'from-amber-900 to-stone-900' },
    { value: '#c27a6b', label: 'Caramel', gradient: 'from-orange-400 to-amber-600' },
    { value: '#f5e8d6', label: 'White Chocolate', gradient: 'from-amber-50 to-amber-100' },
    { value: '#ff6ea1', label: 'Pink', gradient: 'from-pink-400 to-pink-600' },
    { value: '#3b82f6', label: 'Blue', gradient: 'from-blue-400 to-blue-600' },
    { value: '#16a34a', label: 'Green', gradient: 'from-green-400 to-green-600' },
    { value: '#ff7f00', label: 'Orange', gradient: 'from-orange-400 to-orange-600' },
];

const fillings = [
    { value: 'none', label: 'None' },
    { value: 'chocolate_cream', label: 'Chocolate Cream' },
    { value: 'caramel', label: 'Caramel' },
    { value: 'hazelnut', label: 'Hazelnut' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'pistachio', label: 'Pistachio' },
    { value: 'white_cream', label: 'White Cream' },
    { value: 'lotus_cream', label: 'Lotus Cream' },
];

export default function Step1ChooseChocolate({ shape, setShape, color, setColor, filling, setFilling, canvasRef, onSelectionChange }: Step1Props) {
    const showFillingOptions = shape === 'cup' || shape === 'coin';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-7xl mx-auto px-6 py-4 pb-24"
        >
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Side - Controls */}
                <div>
                    {/* Header */}
                    <div className="text-center lg:text-left mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-block mb-4"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>
                        <h2 className="text-4xl font-bold mb-3 gradient-text">Choose Your Chocolate</h2>
                        <p className="text-amber-700 text-lg">Select shape, color, and filling</p>
                    </div>

                    {/* Shape Selection */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                1
                            </span>
                            Select Shape
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {shapes.map((s) => (
                                <motion.button
                                    key={s.value}
                                    onClick={() => setShape(s.value)}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${shape === s.value
                                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg scale-105'
                                        : 'border-amber-200 bg-white hover:border-amber-400 hover:shadow-md'
                                        }`}
                                    whileHover={{ scale: shape === s.value ? 1.05 : 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {shape === s.value && (
                                        <motion.div
                                            layoutId="shape-selected"
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <span className="text-white text-sm">✓</span>
                                        </motion.div>
                                    )}
                                    <div className="text-4xl mb-2">{s.emoji}</div>
                                    <div className="font-bold text-amber-900 text-sm">{s.label}</div>
                                    <div className="text-xs text-amber-600">{s.description}</div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                2
                            </span>
                            Choose Color
                        </h3>
                        <div className="grid grid-cols-4 gap-3">
                            {colors.map((c) => (
                                <motion.button
                                    key={c.value}
                                    onClick={() => setColor(c.value)}
                                    className={`relative p-3 rounded-xl border-2 transition-all duration-300 overflow-hidden ${color === c.value
                                        ? 'border-amber-500 shadow-lg scale-105'
                                        : 'border-amber-200 hover:border-amber-400 hover:shadow-md'
                                        }`}
                                    whileHover={{ scale: color === c.value ? 1.05 : 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    title={c.label}
                                >
                                    {color === c.value && (
                                        <motion.div
                                            layoutId="color-selected"
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg z-10"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <span className="text-white text-xs">✓</span>
                                        </motion.div>
                                    )}
                                    <div className={`h-12 rounded-lg bg-gradient-to-br ${c.gradient} shadow-md`} />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Filling Selection (Conditional) */}
                    {showFillingOptions && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6"
                        >
                            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                    3
                                </span>
                                Add Filling (Optional)
                            </h3>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                                <select
                                    value={filling}
                                    onChange={(e) => setFilling(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border-2 border-amber-300 rounded-lg text-amber-900 font-semibold cursor-pointer hover:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all appearance-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23d97706' d='M8 12L2 6h12z'/%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 1rem center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    {fillings.map((f) => (
                                        <option key={f.value} value={f.value}>
                                            {f.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Side - Live Preview */}
                <div>
                    <div className="sticky top-24">
                        <h3 className="text-lg font-bold text-amber-900 mb-4 text-center">Live Preview</h3>
                        <div className="w-full h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200">
                            <Canvas ref={canvasRef} shape={shape} color={color} filling={filling} onSelectionChange={onSelectionChange} />
                        </div>
                        <p className="text-sm text-amber-600 text-center mt-3">
                            👆 This is how your chocolate will look
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
