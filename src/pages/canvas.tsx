import type React from "react"

import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from "react"

interface TextItem {
  id: string
  text: string
  size: number
  family: string
  color: string
  bold: boolean
  effect: string
  strength: number
  x: number
  y: number
  rotate: number
  scale: number
}

interface HandlePosition {
  delete: { x: number; y: number }
  rotate: { x: number; y: number }
  resize: { x: number; y: number }
  duplicate: { x: number; y: number }
}

const Canvas = forwardRef<any, { shape: string; color: string; filling: string; onSelectionChange?: (item: TextItem | null) => void }>(
  ({ shape, color, onSelectionChange }, ref) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const [items, setItems] = useState<TextItem[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [idCounter, setIdCounter] = useState(0)
    const [handles, setHandles] = useState<HandlePosition | null>(null)
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [rotating, setRotating] = useState(false)
    const [resizing, setResizing] = useState(false)
    const [rotateStart, setRotateStart] = useState({ x: 0, y: 0, angle: 0 })
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, scale: 0 })

    const SVG_NS = "http://www.w3.org/2000/svg"
    const CANVAS_WIDTH = 1200
    const CANVAS_HEIGHT = 800

    const getShapePath = () => {
      // Adjusted coordinates for 1200x800 canvas center (center is 600, 400)
      // Original HTML used 900x600 with center 450, 300. Offset = 150, 100.
      const offX = 150
      const offY = 100

      switch (shape) {
        case "dragees":
          return `M${280 + offX} ${300 + offY} C${280 + offX} ${240 + offY} ${360 + offX} ${180 + offY} ${450 + offX} ${180 + offY} C${540 + offX} ${180 + offY} ${620 + offX} ${240 + offY} ${620 + offX} ${300 + offY} C${620 + offX} ${360 + offY} ${540 + offX} ${420 + offY} ${450 + offX} ${420 + offY} C${360 + offX} ${420 + offY} ${280 + offX} ${360 + offY} ${280 + offX} ${300 + offY} Z`
        case "cup":
          return `M${330 + offX} ${180 + offY} C${400 + offX} ${160 + offY} ${500 + offX} ${160 + offY} ${570 + offX} ${180 + offY} L${580 + offX} ${370 + offY} C${570 + offX} ${420 + offY} ${520 + offX} ${460 + offY} ${450 + offX} ${460 + offY} C${380 + offX} ${460 + offY} ${330 + offX} ${420 + offY} ${320 + offX} ${370 + offY} Z`
        case "coin":
          return `M${450 + offX} ${170 + offY} A140 140 0 1 1 ${449.9 + offX} ${170 + offY} Z`
        case "lotus":
          return `M${320 + offX} ${280 + offY} C${320 + offX} ${220 + offY} ${370 + offX} ${180 + offY} ${450 + offX} ${180 + offY} C${530 + offX} ${180 + offY} ${580 + offX} ${220 + offY} ${580 + offX} ${280 + offY} C${580 + offX} ${340 + offY} ${530 + offX} ${380 + offY} ${450 + offX} ${380 + offY} C${370 + offX} ${380 + offY} ${320 + offX} ${340 + offY} ${320 + offX} ${280 + offY} Z`
        default:
          return ""
      }
    }

    const updateHandles = (item: TextItem) => {
      if (!svgRef.current) return

      const svg = svgRef.current
      const rect = svg.getBoundingClientRect()

      // Find text element in SVG
      const textEl = svg.querySelector(`[data-id="${item.id}"] text`)
      if (!textEl) return

      const bbox = (textEl as SVGTextElement).getBBox()

      // Transform to world coordinates
      const g = svg.querySelector(`[data-id="${item.id}"]`) as SVGGElement
      if (!g) return

      const ctm = g.getCTM()
      if (!ctm) return

      const getScreenPos = (x: number, y: number) => {
        const pt = svg.createSVGPoint()
        pt.x = x
        pt.y = y
        const world = pt.matrixTransform(ctm)
        const screenCTM = svg.getScreenCTM()
        if (!screenCTM) return { x: 0, y: 0 }
        const screen = world.matrixTransform(screenCTM)
        return { x: screen.x - rect.left, y: screen.y - rect.top }
      }

      const tl = getScreenPos(bbox.x, bbox.y)
      const tr = getScreenPos(bbox.x + bbox.width, bbox.y)
      const bl = getScreenPos(bbox.x, bbox.y + bbox.height)
      const br = getScreenPos(bbox.x + bbox.width, bbox.y + bbox.height)

      setHandles({
        delete: tl,
        rotate: tr,
        resize: br,
        duplicate: bl,
      })
    }

    // Render SVG
    useEffect(() => {
      if (!svgRef.current) return

      const svg = svgRef.current
      svg.innerHTML = ""

      // Background
      const rect = document.createElementNS(SVG_NS, "rect")
      rect.setAttribute("width", String(CANVAS_WIDTH))
      rect.setAttribute("height", String(CANVAS_HEIGHT))
      rect.setAttribute("fill", "#fffaf8")
      svg.appendChild(rect)

      // Shape
      const shapePath = document.createElementNS(SVG_NS, "path")
      shapePath.setAttribute("d", getShapePath())
      shapePath.setAttribute("fill", color)
      shapePath.setAttribute("stroke", "#00000010")
      shapePath.setAttribute("stroke-width", "2")
      svg.appendChild(shapePath)

      // Text items
      items.forEach((item) => {
        const g = document.createElementNS(SVG_NS, "g")
        g.setAttribute("data-id", item.id)
        g.setAttribute("transform", `translate(${item.x},${item.y}) rotate(${item.rotate}) scale(${item.scale})`)
        g.style.cursor = "move"

        // Create or reuse path for text effect
        const defs = document.createElementNS(SVG_NS, "defs")
        const path = document.createElementNS(SVG_NS, "path")
        const pathId = `${item.id}-path`
        path.setAttribute("id", pathId)

        const S = Math.max(6, item.strength || 100)
        const W = 520
        const half = W / 2
        let d = `M ${-half} 0 H ${half}`

        if (item.effect === "curve") {
          const r = S
          d = `M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`
        } else if (item.effect === "wave") {
          d = `M ${-half} 0`
          const step = 60
          for (let x = -half; x < half; x += step) {
            const cx = x + step / 2
            const amp = Math.sin((x + half) / 80) * (S / 3)
            const nx = Math.min(half, x + step)
            d += ` Q ${cx} ${amp} ${nx} 0`
          }
        } else if (item.effect === "flag") {
          d = `M ${-half} 0`
          const step = 120
          for (let x = -half; x < half; x += step) {
            const cx = x + step / 2
            const amp = Math.sin((x + half) / 120) * (S / 2.2)
            const nx = Math.min(half, x + step)
            d += ` Q ${cx} ${amp} ${nx} 0`
          }
        }
        path.setAttribute("d", d)
        defs.appendChild(path)
        g.appendChild(defs)

        const text = document.createElementNS(SVG_NS, "text")
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("dominant-baseline", "middle")
        text.setAttribute("font-size", String(item.size))
        text.setAttribute("font-family", item.family)
        text.setAttribute("fill", item.color)
        text.setAttribute("font-weight", item.bold ? "700" : "400")
        text.setAttribute("user-select", "none")
        text.style.pointerEvents = "none"

        // Use textPath if effect is active
        if (item.effect !== "none") {
          const textPath = document.createElementNS(SVG_NS, "textPath")
          textPath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${pathId}`)
          textPath.setAttribute("startOffset", "50%")
          textPath.setAttribute("text-anchor", "middle")
          textPath.textContent = item.text
          text.appendChild(textPath)
        } else {
          text.textContent = item.text
        }

        g.appendChild(text)
        svg.appendChild(g)

        g.addEventListener("pointerdown", (e) => {
          e.stopPropagation()
          setDraggingId(item.id)
          setDragStart({ x: e.clientX, y: e.clientY })
          setSelectedId(item.id)
          if (onSelectionChange) {
            onSelectionChange(item)
          }
          setTimeout(() => updateHandles(item), 0)
        })
      })

      if (selectedId) {
        const item = items.find((i) => i.id === selectedId)
        if (item) {
          setTimeout(() => updateHandles(item), 0)
        }
      }
    }, [items, shape, color, selectedId, onSelectionChange])

    const addTextItem = (opts: any) => {
      const newItem: TextItem = {
        id: `item-${idCounter}`,
        text: opts.text || "",
        size: opts.size || 48,
        family: opts.family || "Cairo, sans-serif",
        color: opts.color || "#000",
        bold: opts.bold || false,
        effect: opts.effect || "none",
        strength: opts.strength || 100,
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        rotate: 0,
        scale: 1,
      }
      setItems([...items, newItem])
      setIdCounter(idCounter + 1)
      setSelectedId(newItem.id)
      if (onSelectionChange) {
        onSelectionChange(newItem)
      }
    }

    const updateSelectedItem = (opts: any) => {
      setItems(
        items.map((item) =>
          item.id === selectedId
            ? {
              ...item,
              text: opts.text !== undefined ? opts.text : item.text,
              size: opts.size !== undefined ? opts.size : item.size,
              family: opts.family !== undefined ? opts.family : item.family,
              color: opts.color !== undefined ? opts.color : item.color,
              bold: opts.bold !== undefined ? opts.bold : item.bold,
              effect: opts.effect !== undefined ? opts.effect : item.effect,
              strength: opts.strength !== undefined ? opts.strength : item.strength,
            }
            : item,
        ),
      )
      const item = items.find((i) => i.id === selectedId)
      if (item) {
        setTimeout(() => updateHandles(item), 0)
      }
    }

    const deleteItem = (id: string) => {
      setItems(items.filter((item) => item.id !== id))
      if (selectedId === id) {
        setSelectedId(null)
        setHandles(null)
      }
    }

    const duplicateItem = (id: string) => {
      const item = items.find((i) => i.id === id)
      if (item) {
        const newItem = { ...item, id: `item-${idCounter}`, x: item.x + 30, y: item.y + 30 }
        setItems([...items, newItem])
        setIdCounter(idCounter + 1)
        setSelectedId(newItem.id)
        if (onSelectionChange) {
          onSelectionChange(newItem)
        }
        setTimeout(() => updateHandles(newItem), 0)
      }
    }

    const handleMouseMove = (e: React.PointerEvent<SVGSVGElement>) => {
      if (draggingId) {
        const item = items.find((i) => i.id === draggingId)
        if (!item) return

        const dx = e.clientX - dragStart.x
        const dy = e.clientY - dragStart.y

        const svg = svgRef.current
        if (!svg) return

        const pt0 = svg.createSVGPoint()
        pt0.x = 0
        pt0.y = 0
        const screenCTM = svg.getScreenCTM()
        const origin = screenCTM ? pt0.matrixTransform(screenCTM.inverse()) : pt0

        const pt1 = svg.createSVGPoint()
        pt1.x = dx
        pt1.y = dy
        const moved = screenCTM ? pt1.matrixTransform(screenCTM.inverse()) : pt1

        const newX = item.x + (moved?.x || 0) - (origin?.x || 0)
        const newY = item.y + (moved?.y || 0) - (origin?.y || 0)

        setItems(items.map((i) => (i.id === draggingId ? { ...i, x: newX, y: newY } : i)))
        setDragStart({ x: e.clientX, y: e.clientY })
      }

      if (rotating && selectedId) {
        const item = items.find((i) => i.id === selectedId)
        if (!item) return

        const svg = svgRef.current
        if (!svg) return

        const rect = svg.getBoundingClientRect()
        const centerX = item.x
        const centerY = item.y

        const screenCenterX = rect.left + (centerX / CANVAS_WIDTH) * rect.width
        const screenCenterY = rect.top + (centerY / CANVAS_HEIGHT) * rect.height

        const a1 = Math.atan2(rotateStart.y - screenCenterY, rotateStart.x - screenCenterX)
        const a2 = Math.atan2(e.clientY - screenCenterY, e.clientX - screenCenterX)
        const deg = ((a2 - a1) * 180) / Math.PI + rotateStart.angle

        setItems(items.map((i) => (i.id === selectedId ? { ...i, rotate: deg } : i)))
      }

      if (resizing && selectedId) {
        const item = items.find((i) => i.id === selectedId)
        if (!item) return

        const dx = e.clientX - resizeStart.x
        const scale = Math.max(0.5, resizeStart.scale + dx * 0.01)

        setItems(items.map((i) => (i.id === selectedId ? { ...i, scale } : i)))
      }
    }

    const handleMouseUp = () => {
      setDraggingId(null)
      setRotating(false)
      setResizing(false)
    }

    const reset = () => {
      setItems([])
      setSelectedId(null)
      setHandles(null)
    }

    const exportPNG = () => {
      if (!svgRef.current) return

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = CANVAS_WIDTH
      canvas.height = CANVAS_HEIGHT

      const svg = svgRef.current
      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = "chocolate-design.png"
        link.click()
      }
      img.onerror = () => {
        alert("Export failed - please try again")
      }
      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }

    useImperativeHandle(ref, () => ({
      addTextItem,
      updateSelectedItem,
      deleteItem,
      reset,
      exportPNG,
    }))

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-white">
        <div className="relative w-full flex-1 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
            className="w-full h-full max-w-4xl shadow-2xl rounded-xl border-4 border-amber-200 cursor-crosshair"
            xmlns="http://www.w3.org/2000/svg"
            onPointerDown={(e) => {
              if (e.target === svgRef.current) {
                setSelectedId(null)
                setHandles(null)
                if (onSelectionChange) {
                  onSelectionChange(null)
                }
              }
            }}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
            onPointerLeave={handleMouseUp}
          />

          {handles && selectedId && (
            <>
              {/* Delete handle */}
              <div
                className="absolute w-8 h-8 bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-lg transition z-50"
                style={{
                  left: `${handles.delete.x}px`,
                  top: `${handles.delete.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  deleteItem(selectedId)
                }}
                title="Delete"
              >
                ✕
              </div>

              {/* Rotate handle */}
              <div
                className="absolute w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center text-white text-lg font-bold cursor-grab active:cursor-grabbing shadow-lg transition z-50"
                style={{
                  left: `${handles.rotate.x}px`,
                  top: `${handles.rotate.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  const item = items.find((i) => i.id === selectedId)
                  if (item) {
                    setRotating(true)
                    setRotateStart({ x: e.clientX, y: e.clientY, angle: item.rotate })
                  }
                }}
                title="Rotate"
              >
                ⤾
              </div>

              {/* Resize handle */}
              <div
                className="absolute w-8 h-8 bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center text-white text-lg font-bold cursor-grab active:cursor-grabbing shadow-lg transition z-50"
                style={{
                  left: `${handles.resize.x}px`,
                  top: `${handles.resize.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  const item = items.find((i) => i.id === selectedId)
                  if (item) {
                    setResizing(true)
                    setResizeStart({ x: e.clientX, y: e.clientY, scale: item.scale })
                  }
                }}
                title="Resize"
              >
                ◢
              </div>

              {/* Duplicate handle */}
              <div
                className="absolute w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-md flex items-center justify-center text-white text-lg font-bold cursor-pointer shadow-lg transition z-50"
                style={{
                  left: `${handles.duplicate.x}px`,
                  top: `${handles.duplicate.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  duplicateItem(selectedId)
                }}
                title="Duplicate"
              >
                ⧉
              </div>
            </>
          )}

          <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-lg text-xs font-semibold text-amber-900 pointer-events-none">
            Live Preview
          </div>
        </div>
      </div>
    )
  })

Canvas.displayName = "Canvas"
export default Canvas