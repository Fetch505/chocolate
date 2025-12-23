import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressIndicator from './ProgressIndicator';
import NavigationButtons from './NavigationButtons';
import Step1ChooseChocolate from './steps/Step1ChooseChocolate';
import Step2CustomizeText from './steps/Step2CustomizeText';
import Step4Preview from './steps/Step4Preview';

export default function StepWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const canvasRef = useRef<any>(null);

    // Chocolate customization state
    const [shape, setShape] = useState('dragees');
    const [color, setColor] = useState('#8b4513');
    const [filling, setFilling] = useState('none');

    // Text customization state
    const [text, setText] = useState('عيد مبارك');
    const [fontSize, setFontSize] = useState(48);
    const [fontFamily, setFontFamily] = useState('Cairo, sans-serif');
    const [fontColor, setFontColor] = useState('#000000');
    const [fontWeight, setFontWeight] = useState('400');
    const [effectMode, setEffectMode] = useState('none');
    const [effectStrength, setEffectStrength] = useState(100);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const stepLabels = ['Choose', 'Customize', 'Export'];

    // No longer initializing here due to AnimatePresence timing issues
    // Moved to Step2CustomizeText component

    const handleSelectionChange = (item: any | null) => {
        setSelectedItem(item ? item.id : null);
        if (item) {
            setText(item.text);
            setFontSize(item.size);
            setFontFamily(item.family);
            setFontColor(item.color);
            setFontWeight(item.bold ? '700' : '400');
            setEffectMode(item.effect);
            setEffectStrength(item.strength);
        }
    };

    const handleAddText = () => {
        if (canvasRef.current) {
            canvasRef.current.addTextItem({
                text,
                size: fontSize,
                family: fontFamily,
                color: fontColor,
                bold: fontWeight === '700',
                effect: effectMode,
                strength: effectStrength,
            });
        }
    };

    // Sync changes to canvas in real-time
    useEffect(() => {
        if (canvasRef.current && selectedItem) {
            canvasRef.current.updateSelectedItem({
                text,
                size: fontSize,
                family: fontFamily,
                color: fontColor,
                bold: fontWeight === '700',
                effect: effectMode,
                strength: effectStrength,
            });
        }
    }, [text, fontSize, fontFamily, fontColor, fontWeight, effectMode, effectStrength, selectedItem]);


    const handleExport = () => {
        if (canvasRef.current) {
            canvasRef.current.exportPNG();
        }
    };

    const handleReset = () => {
        setCurrentStep(1);
        setShape('dragees');
        setColor('#8b4513');
        setFilling('none');
        setText('عيد مبارك');
        setFontSize(48);
        setFontFamily('Cairo, sans-serif');
        setFontColor('#000000');
        setFontWeight('400');
        setEffectMode('none');
        setEffectStrength(100);
        setSelectedItem(null);
        if (canvasRef.current) {
            canvasRef.current.reset();
        }
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-6 px-8 shadow-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">
                            🍫
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Choco Studio</h1>
                            <p className="text-amber-100 text-sm">Premium Chocolate Designer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator currentStep={currentStep} totalSteps={3} stepLabels={stepLabels} />

            {/* Step Content */}
            <div className="w-full py-8">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <Step1ChooseChocolate
                            key="step1"
                            shape={shape}
                            setShape={setShape}
                            color={color}
                            setColor={setColor}
                            filling={filling}
                            setFilling={setFilling}
                            canvasRef={canvasRef}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2CustomizeText
                            key="step2"
                            shape={shape}
                            color={color}
                            filling={filling}
                            text={text}
                            setText={setText}
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                            fontFamily={fontFamily}
                            setFontFamily={setFontFamily}
                            fontColor={fontColor}
                            setFontColor={setFontColor}
                            fontWeight={fontWeight}
                            setFontWeight={setFontWeight}
                            effectMode={effectMode}
                            setEffectMode={setEffectMode}
                            effectStrength={effectStrength}
                            setEffectStrength={setEffectStrength}
                            canvasRef={canvasRef}
                            selectedItem={selectedItem}
                            onAddText={handleAddText}
                            onSelectionChange={handleSelectionChange}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step4Preview
                            key="step3"
                            shape={shape}
                            color={color}
                            filling={filling}
                            canvasRef={canvasRef}
                            onExport={handleExport}
                            onReset={handleReset}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <NavigationButtons
                currentStep={currentStep}
                totalSteps={3}
                onPrevious={handlePrevious}
                onNext={handleNext}
                canProceed={true}
            />
        </div>
    );
}
