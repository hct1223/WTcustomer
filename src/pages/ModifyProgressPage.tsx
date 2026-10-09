import React from 'react';
import { Clock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const ModifyProgressPage: React.FC = () => {
  const { currentOrderId, orders } = useApp();
  const orderId = currentOrderId || 'WT2026170015';
  const order = orders.find((o) => o.id === orderId) || orders[0];
  const modifyApp = order.modifyApp;

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="修改申请进度" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* 1. Application Info matching Fig 27 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="font-bold text-slate-900 pb-1.5 border-b border-slate-100">
            申请信息
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
            <span className="text-slate-400">申请方式</span>
            <span className="text-blue-700 font-medium">
              {modifyApp?.track === 'B'
                ? '客服在LIMS发起变更 (委托已下到检测中心)'
                : '🔵 您发起的修改 (委托尚未下到检测中心)'}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">更改原因分类</span>
            <span className="font-medium text-slate-800">{modifyApp?.reasonCategory || '技术'}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">申请时间</span>
            <span className="font-mono text-slate-700">{modifyApp?.applyTime || '07-22 10:05'}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">当前状态</span>
            <span className="font-bold text-amber-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {modifyApp?.statusText || '销售+客服确认中'}
            </span>
          </div>
        </div>

        {/* 2. Process Timeline (Track A / Track B) matching Fig 27 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5 text-xs">
          <div className="font-bold text-slate-900 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>
              修改流程 ({modifyApp?.track === 'B' ? 'B轨: 客服发起' : '您发起: A轨'})
            </span>
            <span className="text-[10px] text-slate-400">
              审批结果实时回传同步
            </span>
          </div>

          {/* Timeline Nodes matching Fig 27 */}
          <div className="space-y-4 pl-2 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-200">
            {modifyApp?.steps.map((st, idx) => {
              const isCompleted = st.status === 'completed';
              const isActive = st.status === 'active';

              return (
                <div key={idx} className="relative pl-7 space-y-1">
                  {/* Dot */}
                  <div
                    className={`absolute left-2 top-0.5 w-3.5 h-3.5 -translate-x-1/2 rounded-full flex items-center justify-center border-2 bg-white ${
                      isCompleted
                        ? 'border-blue-600 bg-blue-600'
                        : isActive
                        ? 'border-blue-600 ring-4 ring-blue-100'
                        : 'border-slate-300'
                    }`}
                  >
                    {isCompleted && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  {/* Title & Status */}
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${isActive ? 'text-blue-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                      {idx + 1}. {st.title} {isActive && '(进行中)'}
                    </span>
                    {st.time && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {st.time} 已提交
                      </span>
                    )}
                  </div>

                  {/* Reply card matching Fig 27 */}
                  {st.remark && (
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] leading-relaxed text-slate-600 space-y-1 mt-1">
                      {st.operator && (
                        <div className="font-semibold text-slate-700">
                          答复反馈人: {st.operator}
                        </div>
                      )}
                      <div>{st.remark}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
