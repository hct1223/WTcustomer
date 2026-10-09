import React from 'react';
import { ArrowLeft, MoreHorizontal, Circle, Wifi, BatteryMedium, Signal } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WeChatMiniHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightActionText?: string;
  onRightAction?: () => void;
  showCapsule?: boolean;
}

export const WeChatMiniHeader: React.FC<WeChatMiniHeaderProps> = ({
  title = '云上赛宝',
  showBack = false,
  onBack,
  rightActionText,
  onRightAction,
  showCapsule = true,
}) => {
  const { goBack } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-100 select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Phone Status Bar */}
      <div className="bg-[#1e40af] text-white px-4 pt-1.5 pb-1 flex items-center justify-between text-[11px] font-medium tracking-tight">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-white/90">
          <span>云上赛宝 · 试运行反馈版</span>
        </div>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <BatteryMedium className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* WeChat Mini Program Navigation Bar */}
      <div className="relative h-11 px-3 flex items-center justify-between bg-white">
        {/* Left: Back button or placeholder */}
        <div className="flex items-center min-w-[72px]">
          {showBack ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-slate-700 hover:text-slate-900 active:opacity-60 transition-opacity py-1 pr-2"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              <span className="text-sm font-medium">{title !== '云上赛宝' ? title : ''}</span>
            </button>
          ) : (
            <div className="text-base font-bold text-slate-900 tracking-tight">
              {title}
            </div>
          )}
        </div>

        {/* Center: Title (when not attached to back arrow) */}
        {showBack && (
          <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-800 truncate max-w-[150px]">
            {title}
          </div>
        )}

        {/* Right: Custom Action (e.g. 保存草稿) + WeChat Capsule */}
        <div className="flex items-center gap-2">
          {rightActionText && (
            <button
              onClick={onRightAction}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 active:opacity-70 px-1 py-0.5"
            >
              [{rightActionText}]
            </button>
          )}

          {showCapsule && (
            <div className="flex items-center border border-slate-200 rounded-full px-2 py-1 bg-slate-50/80 gap-1.5 shadow-xs">
              <button
                title="小程序选项"
                className="text-slate-700 hover:text-slate-900 active:opacity-60"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
              <span className="h-2.5 w-[1px] bg-slate-300" />
              <button
                title="关闭/缩小"
                className="text-slate-700 hover:text-slate-900 active:opacity-60"
              >
                <Circle className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
