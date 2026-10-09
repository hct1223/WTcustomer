import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, ShieldCheck, PenTool } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const DigitalSignPage: React.FC = () => {
  const {
    createOrderFromCurrentForm,
    updateFormData,
    setCurrentOrderId,
    navigateTo,
    showToast,
  } = useApp();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const previewOrderNo = 'WT2026170015';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    showToast('签名已清空，请重新书写');
  };

  const handleSubmit = () => {
    if (!hasSignature) {
      showToast('请在手写签名区域完成签署后再提交');
      return;
    }

    const canvas = canvasRef.current;
    const signatureData = canvas ? canvas.toDataURL() : '';
    updateFormData({ signatureDataUrl: signatureData });

    // Officially instantiate order in system
    const newOrder = createOrderFromCurrentForm();
    setCurrentOrderId(newOrder.id);

    // Navigates to success page matching Fig 20
    navigateTo('order_success', { orderId: newOrder.id });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="电子签名确认" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Intro matching Fig 19 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2">
          <div className="text-xs font-semibold text-slate-700 text-center leading-relaxed">
            您正在提交委托单 <span className="font-mono font-bold text-blue-600">{previewOrderNo}</span>
            <br />
            请进行电子签名确认：
          </div>

          {/* Interactive Canvas Board matching Fig 19 */}
          <div className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-white overflow-hidden shadow-inner h-52 touch-none">
            {!hasSignature && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none select-none text-xs gap-1.5">
                <PenTool className="w-5 h-5 text-slate-300" />
                <span className="font-medium">(签名区域) 请在此处手写签名</span>
              </div>
            )}
            <canvas
              ref={canvasRef}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
              className="w-full h-full cursor-crosshair"
            />
          </div>

          {/* Action Buttons matching Fig 19 */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重签</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>确认提交</span>
            </button>
          </div>

          {/* Legal statement matching Fig 19 */}
          <div className="text-center pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <span>💡 签名后具有法律效力，请认真确认</span>
          </div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
