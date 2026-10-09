import React from 'react';
import { Mail, FileText, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const EntrustStep4: React.FC = () => {
  const { formData, updateFormData, navigateTo, showToast } = useApp();

  const handleNext = () => {
    if (!formData.reportEmail) {
      showToast('请输入报告接收邮箱');
      return;
    }
    navigateTo('order_check');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader
        title="步骤 4/4 - 报告输出与商务要求"
        showBack={true}
        rightActionText="保存草稿"
        onRightAction={() => showToast('草稿已自动保存至本地缓存')}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Step Indicator Header matching Fig 17 */}
        <div className="text-center pt-1">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-6 h-1.5 rounded-full bg-blue-600" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">步骤 4/4 - 报告输出与商务要求</h2>
        </div>

        {/* 1. Report Version matching Fig 17 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900">输出版本</div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800">
              <input
                type="checkbox"
                checked={formData.reportVersion.chinese}
                onChange={(e) =>
                  updateFormData({
                    reportVersion: {
                      ...formData.reportVersion,
                      chinese: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-blue-600 border-slate-300"
              />
              <span className="font-medium">中文</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800">
              <input
                type="checkbox"
                checked={formData.reportVersion.english}
                onChange={(e) =>
                  updateFormData({
                    reportVersion: {
                      ...formData.reportVersion,
                      english: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-blue-600 border-slate-300"
              />
              <span className="font-medium">英文 (加收费)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800">
              <input
                type="checkbox"
                checked={formData.reportVersion.noReportDataOnly}
                onChange={(e) =>
                  updateFormData({
                    reportVersion: {
                      ...formData.reportVersion,
                      noReportDataOnly: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-blue-600 border-slate-300"
              />
              <span className="font-medium">不出报告 (仅提供试验原始数据)</span>
            </label>
          </div>

          {/* If English report is checked, extra applicant fields matching Page 16 */}
          {formData.reportVersion.english && (
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2 animate-in fade-in">
              <div className="text-[11px] font-semibold text-blue-900">
                出具英文报告所需信息：
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  英文委托单位名称 Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.reportVersion.englishApplicant}
                  onChange={(e) =>
                    updateFormData({
                      reportVersion: {
                        ...formData.reportVersion,
                        englishApplicant: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. XX Technology Co., Ltd."
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  委托地址信息 Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.reportVersion.englishAddress}
                  onChange={(e) =>
                    updateFormData({
                      reportVersion: {
                        ...formData.reportVersion,
                        englishAddress: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. Tianhe District, Guangzhou, China"
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* 2. Output Requirement matching Fig 17 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900">输出要求</div>

          <div className="space-y-2">
            {[
              { val: '无特殊要求', label: '无特殊要求 (默认)' },
              { val: '按样品分开出', label: '按样品分开出 (加收费)' },
              { val: '按检测项目分开出', label: '按检测项目分开出 (加收费)' },
            ].map((item) => (
              <label
                key={item.val}
                className="flex items-center gap-2 cursor-pointer text-xs text-slate-800"
              >
                <input
                  type="radio"
                  name="reportRequirement"
                  checked={formData.reportRequirement === item.val}
                  onChange={() => updateFormData({ reportRequirement: item.val as any })}
                  className="w-4 h-4 text-blue-600 border-slate-300"
                />
                <span className="font-medium">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. Delivery Mode matching Fig 17 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900">交付方式</div>

          <div className="space-y-2">
            {[
              { val: '电子报告', label: '电子报告 (默认)' },
              { val: '纸质邮寄', label: '纸质邮寄' },
              { val: '纸质自取', label: '纸质自取' },
            ].map((item) => (
              <label
                key={item.val}
                className="flex items-center gap-2 cursor-pointer text-xs text-slate-800"
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  checked={formData.deliveryMode === item.val}
                  onChange={() => updateFormData({ deliveryMode: item.val as any })}
                  className="w-4 h-4 text-blue-600 border-slate-300"
                />
                <span className="font-medium">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Report Email matching Fig 17 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2">
          <label className="block text-xs font-bold text-slate-900">
            报告接收邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.reportEmail}
            onChange={(e) => updateFormData({ reportEmail: e.target.value })}
            placeholder="zhangsan@xx-company.com"
            className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
          />
          <div className="text-[10px] text-slate-400">
            💡 电子报告将发送到此邮箱，默认使用委托信息中的电子邮箱，可修改
          </div>
        </div>

        {/* 5. Business & Payment Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div className="text-xs font-bold text-slate-900">商务与付款要求</div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                报告用途
              </label>
              <select
                value={formData.reportUsage}
                onChange={(e) => updateFormData({ reportUsage: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="研发评价与工艺改进">研发评价与工艺改进</option>
                <option value="质量仲裁法庭出证">质量仲裁法庭出证</option>
                <option value="产品出厂验收交付">产品出厂验收交付</option>
                <option value="海关商检与出口贸易">海关商检与出口贸易</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                付款方式
              </label>
              <select
                value={formData.paymentMode}
                onChange={(e) => updateFormData({ paymentMode: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="协议月结">协议月结</option>
                <option value="预付款现结">预付款现结</option>
                <option value="银行转账对公转汇">银行转账对公转汇</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              交费单位抬头
            </label>
            <input
              type="text"
              value={formData.payCompany}
              onChange={(e) => updateFormData({ payCompany: e.target.value })}
              placeholder="默认同委托单位"
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
          >
            核对全部填报信息 → (步骤核对)
          </button>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
