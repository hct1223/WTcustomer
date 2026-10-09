import React from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const ConsultationSuccessPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="云上赛宝" showBack={false} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center pb-24">
        {/* Large Green Check Box matching Fig 11 */}
        <div className="w-14 h-14 bg-emerald-500 rounded-lg flex items-center justify-center text-white mb-5 shadow-xs">
          <Check className="w-9 h-9 stroke-[3]" />
        </div>

        <h2 className="text-base font-bold text-slate-900 mb-2">
          已提交，等待分配经理
        </h2>

        <p className="text-xs text-slate-500 max-w-xs mb-3 leading-relaxed">
          您的信息已提交，销售经理将于1个工作日内联系您。
        </p>

        <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-2 text-[11px] text-amber-800 mb-8 flex items-center gap-1.5">
          <span>💡</span>
          <span>分配完成后，您将收到消息通知</span>
        </div>

        {/* Action Button matching Fig 11 */}
        <button
          onClick={() => navigateTo('home')}
          className="w-full max-w-xs py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold shadow-xs transition-all"
        >
          返回首页
        </button>
      </div>

      <WeChatTabBar />
    </div>
  );
};
