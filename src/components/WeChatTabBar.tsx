import React from 'react';
import { Home, ClipboardList, MessageSquare, User, MessageCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const WeChatTabBar: React.FC = () => {
  const {
    activeTab,
    switchTab,
    unreadCount,
    setShowQuickConsultModal,
    setShowFeedbackModal,
  } = useApp();

  const tabs: { key: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'home', label: '首页', icon: Home },
    { key: 'orders', label: '订单', icon: ClipboardList },
    { key: 'messages', label: '消息', icon: MessageSquare },
    { key: 'profile', label: '我的', icon: User },
  ];

  return (
    <div className="relative pointer-events-auto">
      {/* Floating Center Action: 快速咨询 */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => setShowQuickConsultModal(true)}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
          title="快速咨询业务"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[8px] font-medium scale-90 leading-none mt-0.5">快速咨询</span>
        </button>
      </div>

      {/* Floating Right Action: 试运行反馈 */}
      <div className="absolute -top-7 right-4 z-30">
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-full bg-purple-600/90 text-white shadow-md hover:bg-purple-700 active:scale-95 transition-all text-center"
          title="试运行反馈"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[7.5px] font-semibold scale-90 leading-tight">试运行<br/>反馈</span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav aria-label="底部导航" className="grid grid-cols-4 items-center h-14 bg-white border-t border-slate-200 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] select-none">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          // Offset styling around center button
          const isCenterAdjacent = idx === 1 || idx === 2;

          return (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key)}
              className={`flex flex-col items-center justify-center h-full active:scale-95 transition-transform relative ${
                isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
              } ${isCenterAdjacent ? 'px-1' : ''}`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {tab.key === 'messages' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-semibold text-blue-600' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
