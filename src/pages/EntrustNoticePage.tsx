import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const EntrustNoticePage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [agreed, setAgreed] = useState(true);

  const handleStart = () => {
    if (!agreed) {
      showToast('请先阅读并勾选同意委托须知');
      return;
    }
    navigateTo('entrust_step1');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="委托须知" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Notice Card matching Fig 12 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-4">
          {/* Section 1 */}
          <div>
            <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1">
              <span>▼ 1. 保密承诺</span>
            </div>
            <p className="text-[11px] text-red-600 bg-red-50/60 p-2.5 rounded-xl border border-red-100 leading-relaxed">
              本合同项下提交的样品、资料及相关信息不得包含国家秘密、工作秘密等涉密敏感内容，委托方须保证不提交、上传任何涉密敏感内容。
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1">
              <span>▼ 2. 样品要求</span>
            </div>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
              请确保样品包装完好，标识清晰，附带必要的试验操作指引与防静电/防潮防护要求，因样品自身缺陷导致的测试异常由委托方核对。
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1">
              <span>▼ 3. 检测周期</span>
            </div>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
              常规检测周期为5-15个工作日，周期自样品签收且委托技术资料确认齐全之日起开始计算。如遇加急需求，需提前向对接销售确认工位排期。
            </p>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>我已阅读并同意以上须知</span>
            </label>
          </div>

          {/* Start Button matching Fig 12 */}
          <div className="pt-2">
            <button
              onClick={handleStart}
              className={`w-full py-3 rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all text-white ${
                agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              开始填写委托书
            </button>
          </div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
