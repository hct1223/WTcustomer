import React, { useState } from 'react';
import { Plus, Trash2, Clock, AlertTriangle, Shield, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

const SAFETY_OPTIONS = [
  '安全无需特殊处理',
  '贵重样品',
  '易燃易爆',
  '有毒有害',
  '有腐蚀性',
  '易挥发',
];

export const EntrustStep3: React.FC = () => {
  const { formData, updateFormData, navigateTo, showToast } = useApp();
  const [newTrackingNo, setNewTrackingNo] = useState('');

  const handleToggleSafety = (item: string) => {
    let current = [...formData.safetyInfo];
    if (item === '安全无需特殊处理') {
      current = ['安全无需特殊处理'];
    } else {
      current = current.filter((x) => x !== '安全无需特殊处理');
      if (current.includes(item)) {
        current = current.filter((x) => x !== item);
        if (current.length === 0) current = ['安全无需特殊处理'];
      } else {
        current.push(item);
      }
    }
    updateFormData({ safetyInfo: current });
  };

  const handleAddTrackingNo = () => {
    if (!newTrackingNo.trim()) return;
    updateFormData({
      expressNumbers: [...formData.expressNumbers, newTrackingNo.trim()],
    });
    setNewTrackingNo('');
    showToast('快递单号已添加');
  };

  const handleRemoveTrackingNo = (idx: number) => {
    updateFormData({
      expressNumbers: formData.expressNumbers.filter((_, i) => i !== idx),
    });
  };

  const handleNext = () => {
    if (formData.processMode === '代邮' && !formData.returnAddress) {
      showToast('样品处理方式选择代邮，请填写回寄地址');
      return;
    }
    navigateTo('entrust_step4');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader
        title="步骤 3/4 - 样品处理要求"
        showBack={true}
        rightActionText="保存草稿"
        onRightAction={() => showToast('草稿已自动保存至本地缓存')}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Step Indicator Header matching Fig 16 */}
        <div className="text-center pt-1">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-6 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">步骤 3/4 - 样品处理要求</h2>
        </div>

        {/* 1. Receive Mode matching Fig 16 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900">接收方式</div>
          <div className="grid grid-cols-3 gap-2">
            {(['邮寄', '自送', '抽样(收费)'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => updateFormData({ receiveMode: mode })}
                className={`py-2 px-1 text-xs rounded-xl font-medium border text-center transition-all ${
                  formData.receiveMode === mode
                    ? 'border-blue-500 bg-blue-50/70 text-blue-700 shadow-2xs font-semibold'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                ○ {mode}
              </button>
            ))}
          </div>

          {/* Warm prompt matching Fig 16 */}
          <div className="p-2.5 bg-red-50/70 border border-red-200/60 rounded-xl text-[11px] text-red-700 leading-tight flex items-start gap-1.5">
            <Clock className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>
              温馨提示：检测周期自样品签收且委托资料齐全无误之日起开始计算。
            </span>
          </div>

          {/* Express numbers if mailing matching Fig 16 */}
          {formData.receiveMode === '邮寄' && (
            <div className="pt-1 space-y-2">
              <label className="block text-xs font-semibold text-slate-800">
                样品快递单号 <span className="text-[10px] text-slate-400 font-normal">(支持填写多个快递单号)</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTrackingNo}
                  onChange={(e) => setNewTrackingNo(e.target.value)}
                  placeholder="如：SF1492048192039"
                  className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTrackingNo}
                  className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shrink-0"
                >
                  添加单号
                </button>
              </div>

              {formData.expressNumbers.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {formData.expressNumbers.map((no, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg text-xs"
                    >
                      <span className="font-mono text-slate-700">{no}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTrackingNo(idx)}
                        className="text-red-500 hover:text-red-700 text-[11px]"
                      >
                        移除
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-slate-400">
                💡 请填写您寄样的快递单号，方便我们跟踪样品物流并在收件后第一时间启动核对
              </p>
            </div>
          )}
        </div>

        {/* 2. Process Mode matching Fig 16 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900">处理方式</div>
          <div className="grid grid-cols-2 gap-2">
            {(['自取', '代邮', '实验方保存一个月', '其它'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => updateFormData({ processMode: mode })}
                className={`py-2 px-2 text-xs rounded-xl font-medium border text-center transition-all ${
                  formData.processMode === mode
                    ? 'border-blue-500 bg-blue-50/70 text-blue-700 shadow-2xs font-semibold'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                ○ {mode}
              </button>
            ))}
          </div>

          {/* Return Address if 代邮 */}
          {formData.processMode === '代邮' && (
            <div className="pt-2 space-y-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-800">
                代邮回寄地址及联系人 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.returnAddress}
                onChange={(e) => updateFormData({ returnAddress: e.target.value })}
                placeholder="收件详细地址、收件人及电话"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {/* 3. Safety Info matching Fig 16 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>安全信息</span>
            <span className="text-[10px] font-normal text-slate-400">可多选</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SAFETY_OPTIONS.map((item) => {
              const isSelected = formData.safetyInfo.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleToggleSafety(item)}
                  className={`py-2 px-2 text-xs rounded-xl font-medium border text-center transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? '● ' : '○ '} {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Package protection requirement */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2">
          <label className="block text-xs font-semibold text-slate-800">
            包装防护与特殊贮存要求
          </label>
          <input
            type="text"
            value={formData.packageRequirement}
            onChange={(e) => updateFormData({ packageRequirement: e.target.value })}
            placeholder="如：防潮、防静电屏蔽袋独立封装、保持常温"
            className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Next Step Button */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
          >
            下一页 → (报告输出与商务要求)
          </button>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
