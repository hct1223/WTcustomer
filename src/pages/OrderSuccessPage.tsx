import React, { useState } from 'react';
import { Check, Star, ArrowRight, RefreshCw, ClipboardList } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

const FEEDBACK_TAGS = [
  '委托书填写',
  '经理匹配',
  '名称校验',
  '进度与催办',
  '报告交付',
  '开票财务',
];

export const OrderSuccessPage: React.FC = () => {
  const {
    currentOrderId,
    resetFormData,
    navigateTo,
    submitFeedback,
    showToast,
  } = useApp();

  const orderId = currentOrderId || 'WT2026170015';
  const [stars, setStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['委托书填写', '经理匹配']);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFeedbackSubmit = () => {
    submitFeedback(orderId, stars, selectedTags);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="云上赛宝" showBack={false} />

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 pb-24 text-center">
        {/* Success Icon & Info matching Fig 20 */}
        <div className="w-14 h-14 bg-emerald-500 rounded-lg flex items-center justify-center text-white mx-auto shadow-xs mb-2">
          <Check className="w-9 h-9 stroke-[3]" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">提交成功！</h2>
          <div className="text-xs text-slate-500 font-mono mt-1">
            委托单号: <span className="font-bold text-slate-800">{orderId}</span>
          </div>
          <div className="text-xs text-blue-600 font-semibold mt-0.5">
            状态: 待销售确认
          </div>
        </div>

        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          您的委托已成功提交，对接销售将在1个工作日内确认。
        </p>

        {/* Action Buttons matching Fig 20 */}
        <div className="max-w-xs mx-auto space-y-2 pt-2">
          <button
            onClick={() => navigateTo('order_detail', { orderId })}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
          >
            查看我的订单
          </button>
          <button
            onClick={() => {
              resetFormData();
              navigateTo('home');
            }}
            className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold active:scale-[0.98] transition-all"
          >
            继续下达委托
          </button>
        </div>

        {/* Customer Feedback Card matching Fig 20 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 max-w-xs mx-auto text-left mt-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 justify-center">
            <span>📝 客户实测 · 本下单体验如何？</span>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setStars(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {FEEDBACK_TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                    active
                      ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="pt-1 text-center">
            <button
              onClick={handleFeedbackSubmit}
              className="text-xs text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-4"
            >
              提交实测评价
            </button>
          </div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
