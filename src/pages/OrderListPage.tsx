import React, { useState } from 'react';
import { Filter, Search, ChevronRight, X, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { Order, OrderStatus } from '../types';

export const OrderListPage: React.FC = () => {
  const { orders, navigateTo } = useApp();
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('全部');
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== '全部') {
      if (filterStatus === '待确认' && order.status !== '待销售确认') return false;
      if (filterStatus === '检测中' && order.status !== '检测中') return false;
      if (filterStatus === '报告出具' && order.status !== '报告出具') return false;
      if (filterStatus === '内部补下' && order.type !== 'internal_supplement') return false;
      if (filterStatus === '已取消' && order.status !== '已取消') return false;
    }

    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      return (
        order.id.toLowerCase().includes(kw) ||
        order.title.toLowerCase().includes(kw) ||
        order.sampleSummary.toLowerCase().includes(kw) ||
        order.clientCompany.toLowerCase().includes(kw)
      );
    }

    return true;
  });

  const getStatusBadge = (order: Order) => {
    if (order.type === 'internal_supplement') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          内部补下委托
        </span>
      );
    }
    if (order.status === '待销售确认') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          待确认
        </span>
      );
    }
    if (order.status === '检测中') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          检测中
        </span>
      );
    }
    if (order.status === '报告出具') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          报告出具
        </span>
      );
    }
    if (order.status === '已取消') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          已取消
        </span>
      );
    }
    return (
      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
        {order.status}
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Top Header with [筛选 ▽] matching Fig 21 */}
      <WeChatMiniHeader
        title="订单"
        showBack={false}
        rightActionText="筛选 ▽"
        onRightAction={() => setShowFilterDrawer(true)}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24">
        {/* Quick Search inside Order List */}
        <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden px-3 py-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索委托单号、试验或样品名称..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
          />
        </div>

        {/* Order Cards List matching Fig 21 */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigateTo('order_detail', { orderId: order.id })}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2.5 cursor-pointer hover:border-blue-200 active:scale-[0.99] transition-all"
            >
              {/* Header: Order ID + Status */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900 tracking-tight">
                  {order.id}
                </span>
                {getStatusBadge(order)}
              </div>

              {/* Title & Item summary */}
              <div className="text-xs font-bold text-slate-800">
                {order.title}
              </div>

              {/* Internal supplement description banner matching Fig 21 */}
              {order.type === 'internal_supplement' && (
                <div className="p-2 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 space-y-0.5">
                  <div className="flex items-center gap-1 font-medium">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>您的对接经理已代为填写委托书，销售核对确认后推送下单</span>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <div>提交: {order.submitTime}</div>
                {order.estimatedFinishTime && (
                  <div>预计: {order.estimatedFinishTime} 完成</div>
                )}
                {order.type === 'internal_supplement' && (
                  <div className="text-amber-700/80 font-medium pt-0.5">
                    由销售个人补下 · 无需您填写委托书
                  </div>
                )}
              </div>

              {/* Yellow Alert/Modify strip matching Fig 21 */}
              {order.alertNotice && (
                <div className="p-2 bg-amber-50/90 border border-amber-200 rounded-xl text-[11px] text-amber-800 font-medium">
                  {order.alertNotice}
                </div>
              )}

              {/* Footer link matching Fig 21 */}
              <div className="pt-1 flex items-center justify-end text-[11px] text-blue-600 font-medium">
                <span>点击卡片查看详情 →</span>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
              <p>暂无符合筛选条件的委托单</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Drawer for Filtering matching Fig 20 text: 点击筛选logo，进行右侧弹窗 */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-72 h-full p-4 flex flex-col justify-between shadow-xl animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">委托单筛选</span>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  订单状态
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['全部', '待确认', '检测中', '报告出具', '内部补下', '已取消'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`text-xs py-2 px-2 rounded-xl border text-center transition-all ${
                        filterStatus === st
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword Search in drawer */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  模糊搜索
                </label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="单号/样品名称/企业"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setFilterStatus('全部');
                  setSearchKeyword('');
                }}
                className="flex-1 py-2.5 text-xs text-slate-600 bg-slate-100 rounded-xl font-medium"
              >
                重置
              </button>
              <button
                type="button"
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 text-xs text-white bg-blue-600 rounded-xl font-bold hover:bg-blue-700 shadow-xs"
              >
                确认筛选
              </button>
            </div>
          </div>
        </div>
      )}

      <WeChatTabBar />
    </div>
  );
};
