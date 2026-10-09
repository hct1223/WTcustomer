import React, { useRef } from 'react';
import { ArrowDown, AlertTriangle, Edit3, ShieldAlert, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const OrderCheckPage: React.FC = () => {
  const { formData, navigateTo } = useApp();
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const mainSample = formData.samples[0] || {
    name: '送检样品',
    model: '待定',
    quantity: 1,
    unit: '件',
    businessType: '常规检测',
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 relative">
      <WeChatMiniHeader title="信息核对" showBack={true} />

      {/* Floating anti-confusion button matching Page 18: 快速往下滑到底部的按钮 */}
      <button
        onClick={scrollToBottom}
        className="fixed bottom-20 right-4 z-40 bg-blue-600/90 hover:bg-blue-600 text-white shadow-lg text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-all backdrop-blur-xs"
      >
        <ArrowDown className="w-3.5 h-3.5" />
        <span>直达底部签名</span>
      </button>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-28">
        {/* Verification banner matching Fig 18 */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-1.5 leading-relaxed">
          <span className="text-xs">💡</span>
          <span>
            请仔细核对以下信息，确认无误后点击底部“确认并签字”提交委托
          </span>
        </div>

        {/* Confidentiality Warning matching Fig 18 */}
        <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3 text-[11px] text-red-700 leading-relaxed">
          <div className="font-bold flex items-center gap-1 text-red-800 mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>保密承诺</span>
          </div>
          本合同项下提交的样品、资料及相关信息不得包含国家秘密、工作秘密等涉密敏感内容，委托方须保证不提交、上传任何涉密敏感内容。
        </div>

        {/* 1. Client Info Section matching Fig 18 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 font-bold text-slate-900">
            <span>委托方信息</span>
            <button
              onClick={() => navigateTo('entrust_step1')}
              className="text-blue-600 text-[11px] font-semibold hover:text-blue-700"
            >
              [点击修改 →]
            </button>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">委托单位</span>
            <span className="font-medium text-slate-800">{formData.clientCompany}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">联系人</span>
            <span className="font-medium text-slate-800">{formData.clientContact} / {formData.clientPhone}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">电子邮箱</span>
            <span className="font-mono text-slate-700">{formData.clientEmail}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">单位地址</span>
            <span className="text-slate-700 max-w-[200px] text-right truncate">{formData.clientAddress}</span>
          </div>
        </div>

        {/* 2. Sample & Test Project Section matching Fig 18 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 font-bold text-slate-900">
            <span>样品与检测项目</span>
            <button
              onClick={() => navigateTo('entrust_step2')}
              className="text-blue-600 text-[11px] font-semibold hover:text-blue-700"
            >
              [点击修改 →]
            </button>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">样品/产品名称</span>
            <span className="font-medium text-slate-800">{mainSample.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">型号规格</span>
            <span className="font-medium text-slate-800">{mainSample.model}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">样品总数量</span>
            <span className="font-medium text-slate-800">
              {formData.samples.reduce((acc, s) => acc + (s.quantity || 1), 0)} 件 ({formData.samples.length} 种规格)
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">试验项目类型</span>
            <span className="font-semibold text-blue-600">{mainSample.businessType}</span>
          </div>
        </div>

        {/* 3. Sample Handling Section matching Fig 18 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 font-bold text-slate-900">
            <span>样品处理要求</span>
            <button
              onClick={() => navigateTo('entrust_step3')}
              className="text-blue-600 text-[11px] font-semibold hover:text-blue-700"
            >
              [点击修改 →]
            </button>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">接收方式</span>
            <span className="font-medium text-slate-800">{formData.receiveMode}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">处理方式</span>
            <span className="font-medium text-slate-800">{formData.processMode}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">快递单号</span>
            <span className="font-mono text-slate-700">
              {formData.expressNumbers.length > 0 ? formData.expressNumbers.join(', ') : '暂未填单号'}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">安全防护等级</span>
            <span className="text-slate-700">{formData.safetyInfo.join(', ')}</span>
          </div>
        </div>

        {/* 4. Report Output Section matching Fig 18 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 font-bold text-slate-900">
            <span>报告输出与商务要求</span>
            <button
              onClick={() => navigateTo('entrust_step4')}
              className="text-blue-600 text-[11px] font-semibold hover:text-blue-700"
            >
              [点击修改 →]
            </button>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">报告输出版本</span>
            <span className="font-medium text-slate-800">
              {formData.reportVersion.chinese ? '中文版 ' : ''}
              {formData.reportVersion.english ? '+ 英文版 ' : ''}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">交付方式</span>
            <span className="font-medium text-slate-800">{formData.deliveryMode}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">报告接收邮箱</span>
            <span className="font-mono text-slate-700">{formData.reportEmail}</span>
          </div>
        </div>

        {/* Anchor and Action Button leading to signature page */}
        <div ref={bottomRef} className="pt-4 space-y-2">
          <button
            onClick={() => navigateTo('digital_sign')}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/15 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <span>核对无误，前往手写电子签名 →</span>
          </button>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
