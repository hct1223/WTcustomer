import React, { useState } from 'react';
import { Plus, MessageSquare, Edit2, Trash2, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { InvoiceInfo } from '../types';

export const InvoiceLibraryPage: React.FC = () => {
  const {
    invoices,
    deleteInvoice,
    setDefaultInvoice,
    navigateTo,
    showToast,
  } = useApp();

  const handleFetchFromWeChat = () => {
    showToast('正在从微信发票助手安全同步抬头...');
    setTimeout(() => {
      showToast('已同步最新增值税发票信息');
    }, 600);
  };

  const handleUse = (inv: InvoiceInfo) => {
    setDefaultInvoice(inv.id);
    showToast(`已选择使用【${inv.title}】`);
  };

  const handleEdit = (inv: InvoiceInfo) => {
    navigateTo('invoice_edit', { invoiceId: inv.id });
  };

  const handleDelete = (id: string) => {
    deleteInvoice(id);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="常用开票库" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Top 2 Action Buttons matching Fig 23 */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={handleFetchFromWeChat}
            className="py-2.5 px-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>从微信发票助手获取</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('invoice_edit')}
            className="py-2.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>新增开票信息</span>
          </button>
        </div>

        {/* List Title matching Fig 23 */}
        <div className="text-[11px] text-slate-400 px-1 font-medium">
          已保存的开票信息 ({invoices.length}条)
        </div>

        {/* Invoice Cards List matching Fig 23 */}
        <div className="space-y-3">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2.5"
            >
              {/* Header: Title + Default badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{inv.title}</span>
                {inv.isDefault && (
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    默认
                  </span>
                )}
              </div>

              {/* Tax & Email matching Fig 23 */}
              <div className="text-[11px] text-slate-500 space-y-0.5 font-mono">
                <div>税号: {inv.taxNumber}</div>
                <div>邮箱: {inv.email}</div>
                {inv.bankName && <div className="font-sans text-[10px] text-slate-400">开户行: {inv.bankName}</div>}
              </div>

              {/* Bottom Actions matching Fig 23 */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs">
                <button
                  type="button"
                  onClick={() => handleUse(inv)}
                  className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>使用</span>
                </button>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(inv)}
                    className="flex items-center gap-1 text-slate-500 hover:text-slate-800"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>编辑</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(inv.id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>删除</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
