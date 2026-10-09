import React, { useState } from 'react';
import {
  FileText,
  Package,
  FileCheck,
  Award,
  AlertTriangle,
  Truck,
  Plus,
  Send,
  Download,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Receipt,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { ORDER_TIMELINE_STEPS } from '../data/mockData';
import { Order } from '../types';

export const OrderDetailPage: React.FC = () => {
  const {
    currentOrderId,
    orders,
    navigateTo,
    cancelOrder,
    addExpressNumber,
    submitSealApplication,
    setShowReportPreviewModal,
    setPreviewReportOrder,
    invoices,
    showToast,
  } = useApp();

  const orderId = currentOrderId || 'WT2026170015';
  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Modals inside detail
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('测试计划调整，暂不下单');
  const [showAddExpressModal, setShowAddExpressModal] = useState(false);
  const [isSupplementaryExpress, setIsSupplementaryExpress] = useState(false);
  const [expressCarrier, setExpressCarrier] = useState('顺丰速运');
  const [expressInput, setExpressInput] = useState('');
  const [showSealModal, setShowSealModal] = useState(false);
  const [sealType, setSealType] = useState<'所章' | '原章' | '业务专用章' | '公章'>('所章');
  const [sealReason, setSealReason] = useState('军工科研项目中期验收需加盖原所章');
  const [expandTimeline, setExpandTimeline] = useState(false);
  const [expandExpressDetail, setExpandExpressDetail] = useState(false);

  // Status check for Report Download (Node 9 or 10)
  const canDownload = order.statusStep >= 9 || order.canDownloadReport;

  const handleModifyClick = () => {
    // Check rule from Page 28:
    // 当委托已取号、已分配到中心时，客户无法自行提交变更申请，置灰并点击友好提示
    if (order.isTakenNumber) {
      showToast('当前委托已进入系统取号流程了，委托变更请联系客服或者销售处理。');
      return;
    }
    navigateTo('modify_apply', { orderId: order.id });
  };

  const handleCancelConfirm = () => {
    const success = cancelOrder(order.id, cancelReason);
    setShowCancelModal(false);
    if (success) {
      showToast('已取消委托，销售将跟进说明');
    }
  };

  const handleAddExpressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expressInput.trim()) {
      showToast('请输入快递单号');
      return;
    }
    addExpressNumber(order.id, expressCarrier, expressInput.trim(), isSupplementaryExpress);
    setShowAddExpressModal(false);
    setExpressInput('');
  };

  const handleSealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSealApplication(order.id, sealType, sealReason);
    setShowSealModal(false);
  };

  const currentInvoice = invoices.find((i) => i.id === order.invoiceId) || invoices[0];

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header with [提交修改申请] button matching Fig 22 */}
      <WeChatMiniHeader
        title="订单详情"
        showBack={true}
        rightActionText={order.status !== '已取消' ? '提交修改申请' : undefined}
        onRightAction={handleModifyClick}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-28">
        {/* 1. Basic Info Section matching Fig 22 & Fig 25 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="font-bold text-slate-900 pb-1.5 border-b border-slate-100 flex items-center justify-between">
            <span>基本信息</span>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">委托编号</span>
            <span className="font-mono font-bold text-slate-800">{order.id}</span>
          </div>

          {order.type === 'internal_supplement' && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">委托类型</span>
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                内部补下委托 (已有合同)
              </span>
            </div>
          )}

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">委托单位</span>
            <span className="font-medium text-slate-800">{order.clientCompany}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">下单时间</span>
            <span className="text-slate-700">{order.submitTime}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">检测项目</span>
            <span className="font-medium text-slate-800">{order.samples[0]?.testProject || '高温试验'}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">样品数量</span>
            <span className="font-medium text-slate-800">{order.sampleCount}件</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">对接经理</span>
            <span className="font-medium text-slate-800">
              {order.manager.name} ({order.manager.phone})
            </span>
          </div>

          {/* Internal Supplement Notification Banner matching Fig 25 */}
          {order.type === 'internal_supplement' && (
            <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 leading-relaxed">
              <div className="font-bold mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>消息通知:</span>
              </div>
              您的对接经理已为您代填写委托书并正在完成销售个人核对，核对通过后推送客服下单。下单前无需您填写委托书、勾选须知或电子签名；下单后流程与普通委托一致，进度在本页同步展示。
            </div>
          )}
        </div>

        {/* 2. Order Actions Buttons Block matching Fig 22 */}
        {order.status !== '已取消' && (
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2.5">
            <div className="text-xs font-bold text-slate-900">委托操作</div>

            <div className="grid grid-cols-2 gap-2">
              {/* 补寄样品 matching Fig 22 & Page 23 */}
              <button
                type="button"
                onClick={() => {
                  setIsSupplementaryExpress(true);
                  setShowAddExpressModal(true);
                }}
                className="py-2.5 px-2 bg-blue-50/70 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-medium border border-blue-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Package className="w-4 h-4 text-blue-600" />
                <span>补寄样品</span>
              </button>

              {/* 查看盖章进度 matching Fig 22 */}
              <button
                type="button"
                onClick={() => {
                  if (order.sealApp) {
                    showToast(`当前盖章状态: ${order.sealApp.status}`);
                  } else {
                    showToast('暂无进行中的其他章盖章，如需盖章请点击下方申请');
                  }
                }}
                className="py-2.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileCheck className="w-4 h-4 text-slate-600" />
                <span>查看盖章进度</span>
              </button>
            </div>

            {/* 发起盖章申请 (委托书/报告需盖其他章) matching Fig 22 & Page 26 */}
            <button
              type="button"
              onClick={() => setShowSealModal(true)}
              className="w-full py-2.5 px-3 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-medium border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <Award className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>发起盖章申请 (委托书/报告需盖其他章)</span>
            </button>

            {/* 取消委托 matching Fig 22 & Page 27, 30 */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  if (order.isTakenNumber) {
                    showToast('当前委托已进入系统取号流程，不可取消，请走变更申请');
                  } else {
                    setShowCancelModal(true);
                  }
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>取消委托</span>
              </button>
              <div className="text-[10px] text-slate-400 mt-0.5">
                💡 取消委托仅在客服取号前可操作，取号后需走变更流程
              </div>
            </div>
          </div>
        )}

        {/* 3. Modification Progress Card (If modification exists) matching Fig 27 */}
        {order.modifyApp && (
          <div
            onClick={() => navigateTo('modify_progress', { orderId: order.id })}
            className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 cursor-pointer hover:bg-amber-100/80 transition-colors shadow-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>修改申请进度 ({order.modifyApp.track}轨)</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-300">
                {order.modifyApp.statusText}
              </span>
            </div>
            <p className="text-[11px] text-amber-800 leading-snug line-clamp-1">
              {order.modifyApp.description}
            </p>
            <div className="text-[10px] text-blue-600 font-semibold flex justify-end pt-1">
              查看双轨审批详情 →
            </div>
          </div>
        )}

        {/* 4. Express Numbers & Logistics Section matching Fig 22 & Page 23 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div className="font-bold text-slate-900">样品快递单号</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                已添加 {order.expressNumbers.length} 个快递，
                {order.expressTraces.filter((t) => t.status === 'signed').length} 已签收
              </div>
            </div>
            <button
              onClick={() => {
                setIsSupplementaryExpress(false);
                setShowAddExpressModal(true);
              }}
              className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-0.5"
            >
              <Plus className="w-3.5 h-3.5" /> 补充快递单号
            </button>
          </div>

          {/* Express items list */}
          <div className="space-y-2">
            {order.expressNumbers.map((no, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    顺丰速运 · {no}
                  </span>
                  <span className="text-blue-600 font-sans font-medium text-[10px]">
                    客户寄出 (运输中)
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">
                  轨迹同步：快件已到达五山营业点，正在派送中
                </div>
              </div>
            ))}

            {order.expressNumbers.length === 0 && (
              <div className="text-center py-2 text-slate-400 text-[11px]">
                暂未登记快递单号，暂存之后任何环境均可补充
              </div>
            )}
          </div>
        </div>

        {/* 5. 10-Step Timeline matching Page 21 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div className="font-bold text-slate-900">委托进度时间线</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                完整10个节点 · 客户销售双端实时同步
              </div>
            </div>
            <button
              onClick={() => setExpandTimeline(!expandTimeline)}
              className="text-[11px] text-blue-600 flex items-center gap-0.5"
            >
              <span>{expandTimeline ? '收起' : '展开全部10步'}</span>
              {expandTimeline ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
            {(expandTimeline ? ORDER_TIMELINE_STEPS : ORDER_TIMELINE_STEPS.slice(0, 4)).map((item) => {
              const isPast = item.step < order.statusStep;
              const isCurrent = item.step === order.statusStep;
              return (
                <div key={item.step} className="relative">
                  <div
                    className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center ${
                      isPast
                        ? 'border-blue-600 bg-blue-600'
                        : isCurrent
                        ? 'border-blue-600 ring-4 ring-blue-100'
                        : 'border-slate-300'
                    }`}
                  >
                    {isPast && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <div className="text-xs">
                    <div className={`font-semibold ${isCurrent ? 'text-blue-600' : isPast ? 'text-slate-800' : 'text-slate-400'}`}>
                      {item.step}. {item.name}
                      {isCurrent && <span className="ml-1.5 text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">进行中</span>}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Report Download Section matching Page 26 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2.5 text-xs">
          <div className="font-bold text-slate-900 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>检测报告交付</span>
            <span className="text-[10px] text-slate-400">
              {canDownload ? '报告已出具' : '待报告审核出具后可下载'}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            根据委托单当前节点判断：仅在「9. 报告出具」及之后节点开放下载。报告包含国家级资质印章及数字验真码。
          </p>

          <button
            type="button"
            disabled={!canDownload}
            onClick={() => {
              if (canDownload) {
                setPreviewReportOrder(order);
                setShowReportPreviewModal(true);
              } else {
                showToast('报告尚未完成三级审核出具，暂不可下载');
              }
            }}
            className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
              canDownload
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/15 active:scale-[0.98]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{canDownload ? '📥 查看并下载官方检测报告 (PDF)' : '报告出具中 (暂不可下载)'}</span>
          </button>
        </div>

        {/* 7. Financial & Invoicing Info matching Page 23-25 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="font-bold text-slate-900 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>财务与开票信息</span>
            <button
              onClick={() => navigateTo('invoice_library')}
              className="text-xs text-blue-600 font-medium hover:text-blue-700"
            >
              [维护发票库]
            </button>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">开票状态</span>
            <span className="font-medium text-slate-700">未开票 (待商务结算)</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">结算款项</span>
            <span className="font-medium text-amber-600 font-mono">未到账 / 协议月结</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">开票抬头</span>
            <span className="font-medium text-slate-800">{currentInvoice.title}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">纳税人识别号</span>
            <span className="font-mono text-slate-700">{currentInvoice.taxNumber}</span>
          </div>
        </div>
      </div>

      {/* Modal: Cancel Order with Double Confirm & Anti-fool matching Page 27, 30 */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-4 space-y-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-sm">取消委托确认 (防呆提示)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              确定要取消委托单 <span className="font-mono font-bold text-slate-900">{order.id}</span> 吗？
              取消后将自动发送消息提醒销售经理【{order.manager.name}】进入待办说明闭环。
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                取消原因说明
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 text-xs text-slate-600 bg-slate-100 rounded-lg"
              >
                暂不取消
              </button>
              <button
                type="button"
                onClick={handleCancelConfirm}
                className="flex-1 py-2 text-xs text-white bg-red-600 hover:bg-red-700 rounded-lg font-bold"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Express / Supplementary Express matching Page 23 */}
      {showAddExpressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-4 space-y-3 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                {isSupplementaryExpress ? '补寄样品快递登记' : '补充样品快递单号'}
              </h3>
              <button
                onClick={() => setShowAddExpressModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddExpressSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">物流承运商</label>
                <select
                  value={expressCarrier}
                  onChange={(e) => setExpressCarrier(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="顺丰速运">顺丰速运</option>
                  <option value="中国邮政EMS">中国邮政EMS</option>
                  <option value="京东快递">京东快递</option>
                  <option value="中通快递">中通快递</option>
                  <option value="专人自送送达">专人自送送达</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">快递单号</label>
                <input
                  type="text"
                  value={expressInput}
                  onChange={(e) => setExpressInput(e.target.value)}
                  placeholder="如：SF1492048192039"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpressModal(false)}
                  className="flex-1 py-2 text-slate-600 bg-slate-100 rounded-lg"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-white bg-blue-600 rounded-lg font-bold"
                >
                  确认提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Other Seal Application matching Page 26 */}
      {showSealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-4 space-y-3 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">加盖其他章申请</h3>
              <button
                onClick={() => setShowSealModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              审批流程：客户发起 → 销售审批 (蓝信工作台) → 客服确认并审批 (所综合平台) → 加盖完成电子回传。
            </p>
            <form onSubmit={handleSealSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">申请加盖章类型</label>
                <select
                  value={sealType}
                  onChange={(e) => setSealType(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="所章">工信部电子五所原所章</option>
                  <option value="原章">赛宝实验室原章</option>
                  <option value="业务专用章">检验检测业务专用章</option>
                  <option value="公章">法人行政公章</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">加盖原因及说明</label>
                <textarea
                  rows={2}
                  value={sealReason}
                  onChange={(e) => setSealReason(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSealModal(false)}
                  className="flex-1 py-2 text-slate-600 bg-slate-100 rounded-lg"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-white bg-indigo-600 rounded-lg font-bold"
                >
                  提交盖章申请
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <WeChatTabBar />
    </div>
  );
};
