export default function ControlPanel({
  shape,
  setShape,
  color,
  setColor,
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
  handleSize,
  setHandleSize,
  filling,
  setFilling,
  shapes,
  colors,
  fonts,
  fillings,
  onAddText,
  onApplyChanges,
  onClear,
  onExport,
  onReset,
  showFillingPanel,
}: any) {
  return (
    <div className="w-full lg:w-96 flex flex-col gap-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-lg">🍫</div>
          <div>
            <h1 className="text-2xl font-bold">Choco Studio</h1>
            <p className="text-amber-100 text-sm">Premium Design Editor</p>
          </div>
        </div>
      </div>

      {/* Shape Selection */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-amber-100/50 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2 uppercase tracking-wide">Base Shape</label>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-amber-900 font-medium hover:bg-amber-100/50 transition cursor-pointer appearance-none bg-no-repeat pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7355' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.75rem center",
            }}
          >
            {shapes.map((s: any) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2 uppercase tracking-wide">Color</label>
          <div className="grid grid-cols-4 gap-2.5">
            {colors.map((c: any) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-full h-12 rounded-lg transition-all transform hover:scale-105 border-2 ${
                  color === c.value ? "border-amber-900 shadow-lg scale-105" : "border-transparent"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Text Editor */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-amber-100/50 space-y-4">
        <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wide">Text Editor</h2>

        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Enter text..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-amber-900 mb-2">Size</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="6"
              max="220"
              className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-900 mb-2">Weight</label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-amber-900 font-medium appearance-none bg-no-repeat pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7355' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 0.75rem center",
              }}
            >
              <option value="400">Normal</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2">Font</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-amber-900 font-medium appearance-none bg-no-repeat pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7355' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.75rem center",
            }}
          >
            {fonts.map((f: any) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2">Text Color</label>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-full h-10 border border-amber-200 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2">Text Effect</label>
          <select
            value={effectMode}
            onChange={(e) => setEffectMode(e.target.value)}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-amber-900 font-medium appearance-none bg-no-repeat pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7355' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.75rem center",
            }}
          >
            <option value="none">None</option>
            <option value="curve">Curve</option>
            <option value="wave">Wave</option>
            <option value="flag">Flag</option>
          </select>
        </div>

        {effectMode !== "none" && (
          <div>
            <label className="block text-xs font-semibold text-amber-900 mb-2">
              Effect Strength ({effectStrength})
            </label>
            <input
              type="range"
              value={effectStrength}
              onChange={(e) => setEffectStrength(Number(e.target.value))}
              min="10"
              max="220"
              className="w-full h-2 bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg appearance-none cursor-pointer accent-amber-700"
            />
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={onAddText}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold text-sm hover:from-amber-700 hover:to-amber-800 transition shadow-md hover:shadow-lg"
          >
            Add
          </button>
          <button
            onClick={onApplyChanges}
            className="px-4 py-2.5 bg-amber-100 text-amber-900 rounded-lg font-semibold text-sm hover:bg-amber-200 transition"
          >
            Apply
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2.5 bg-red-100 text-red-700 rounded-lg font-semibold text-sm hover:bg-red-200 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Filling Panel */}
      {showFillingPanel && (
        <div className="bg-white rounded-xl shadow-md p-5 border border-amber-100/50 space-y-3">
          <label className="block text-xs font-semibold text-amber-900 uppercase tracking-wide">Filling</label>
          <select
            value={filling}
            onChange={(e) => setFilling(e.target.value)}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg text-amber-900 font-medium appearance-none bg-no-repeat pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7355' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.75rem center",
            }}
          >
            {fillings.map((f: any) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-amber-700/70 pt-2">Available for Cup & Coin shapes</p>
        </div>
      )}

      {/* Additional Options */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-amber-100/50 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-amber-900 mb-2">Handle Size</label>
          <input
            type="range"
            value={handleSize}
            onChange={(e) => setHandleSize(Number(e.target.value))}
            min="14"
            max="64"
            className="w-full h-2 bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg appearance-none cursor-pointer accent-amber-700"
          />
          <p className="text-xs text-amber-700/70 mt-2">Adjust handle visibility</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExport}
            className="px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition shadow-md"
          >
            Export PNG
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  )
}
