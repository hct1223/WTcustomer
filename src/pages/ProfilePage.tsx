import React from 'react';
import {
  User,
  Building2,
  Receipt,
  FileText,
  Phone,
  Sparkles,
  Zap,
  ChevronRight,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const ProfilePage: React.FC = () => {
  const {
    currentManager,
    navigateTo,
    setShowFeedbackModal,
    setShowQuickConsultModal,
    invoices,
  } = useApp();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="个人中心" showBack={false} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
            张
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>张三</span>
              <span className="text-[10px] font-normal text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                已实名核验
              </span>
            </div>
            <div className="text-slate-500 mt-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>XX科技有限公司</span>
            </div>
          </div>
        </div>

        {/* Dedicated Sales Manager Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-blue-100 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 font-bold text-slate-900">
            <span>我的专属业务经理</span>
            <button
              onClick={() => navigateTo('manager_match')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
            >
              [切换/重配经理]
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-800 text-xs">
                {currentManager.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {currentManager.region}
              </div>
            </div>

            <a
              href={`tel:${currentManager.phone}`}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-medium flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentManager.phone}</span>
            </a>
          </div>
        </div>

        {/* Feature Entrances List */}
        <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-100 divide-y divide-slate-100 text-xs">
          {/* Invoice Library */}
          <div
            onClick={() => navigateTo('invoice_library')}
            className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Receipt className="w-4 h-4 text-blue-600" />
              <div>
                <div className="font-bold text-slate-900">常用开票库</div>
                <div className="text-[10px] text-slate-400">已维护 {invoices.length} 条企业/个人发票信息</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Long-term fast order */}
          <div
            onClick={() => navigateTo('long_term')}
            className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <div>
                <div className="font-bold text-slate-900">长协客户快速通道</div>
                <div className="text-[10px] text-slate-400">专享协议价、免销售审核直达排期</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Feedback */}
          <div
            onClick={() => setShowFeedbackModal(true)}
            className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <div>
                <div className="font-bold text-slate-900">试运行反馈意见征集</div>
                <div className="text-[10px] text-slate-400">评价下单顺畅度、功能建议</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Customer Service */}
          <div
            onClick={() => setShowQuickConsultModal(true)}
            className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Headphones className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="font-bold text-slate-900">赛宝实验室客服专线</div>
                <div className="text-[10px] text-slate-400">400-888-CEPREI / 快速工单</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Suggestion Banner matching Fig 1 */}
        <div
          onClick={() => setShowFeedbackModal(true)}
          className="cursor-pointer bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-4 text-white shadow-xs text-center space-y-1"
        >
          <div className="text-[10px] text-rose-100 font-medium tracking-wider uppercase">
            【客户满意度建设】您的反馈，是我们持续改进的动力
          </div>
          <div className="text-base font-bold tracking-wide">
            意见征集专栏
          </div>
        </div>

        {/* System Version */}
        <div className="text-center text-[10px] text-slate-400 pt-2 space-y-0.5">
          <div>工业和信息化部电子第五研究所 (中国赛宝实验室)</div>
          <div>云上赛宝 · 试运行反馈版 v1.0.4</div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
