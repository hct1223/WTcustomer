import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const ModifyApplyPage: React.FC = () => {
  const {
    currentOrderId,
    orders,
    submitModifyApplication,
    navigateTo,
    showToast,
  } = useApp();

  const orderId = currentOrderId || 'WT2026170015';
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [reasonCategory, setReasonCategory] = useState<'技术' | '编辑' | '商务' | '其他'>('技术');
  const [description, setDescription] = useState(
    '原委托要求保温时间由48小时变更为72小时，增加100℃高温满载电气监测项。'
  );
  const currentTime = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showToast('请详细说明报告或委托需要修改的内容');
      return;
    }

    submitModifyApplication(order.id, reasonCategory, description.trim());
    navigateTo('modify_progress', { orderId: order.id });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="报告修改申请" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Form matching Fig 26 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Basic Info (System auto-filled) matching Fig 26 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2.5 text-xs">
            <div className="font-bold text-slate-900 pb-1.5 border-b border-slate-100">
              基本信息 <span className="text-[10px] text-slate-400 font-normal">(系统自动带出)</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">委托编号</span>
              <span className="font-mono font-bold text-slate-800">{order.id}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">申请单位</span>
              <span className="font-medium text-slate-800">{order.clientCompany}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">联系人</span>
              <span className="font-medium text-slate-800">{order.clientContact}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400">联系人电话</span>
              <span className="font-mono text-slate-700">{order.clientPhone}</span>
            </div>
          </div>

          {/* 2. Application Content matching Fig 26 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5 text-xs">
            <div className="font-bold text-slate-900 pb-1 border-b border-slate-100">
              申请内容
            </div>

            {/* Category Select matching Fig 26 */}
            <div>
              <label className="block text-slate-800 font-semibold mb-1">
                更改原因分类 <span className="text-red-500">*</span>
              </label>
              <select
                value={reasonCategory}
                onChange={(e) => setReasonCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="技术">技术 (测试条件/试验时间/标准规范等)</option>
                <option value="编辑">编辑 (样品名称/规格型号/文字拼写错误)</option>
                <option value="商务">商务 (委托单位更名/开票信息/报告份数)</option>
                <option value="其他">其他</option>
              </select>
            </div>

            {/* Description textarea matching Fig 26 */}
            <div>
              <label className="block text-slate-800 font-semibold mb-1">
                详细说明报告需要修改内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请详细说明报告需要修改的具体内容、章节或数据"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500 leading-relaxed"
                required
              />
            </div>

            {/* Application Time matching Fig 26 */}
            <div>
              <label className="block text-slate-800 font-semibold mb-1">
                申请时间 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentTime}
                readOnly
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-mono"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
              >
                提交修改申请
              </button>
            </div>
          </div>
        </form>
      </div>

      <WeChatTabBar />
    </div>
  );
};
