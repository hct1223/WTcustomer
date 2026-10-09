import React, { useState } from 'react';
import { Plus, Edit2, Copy, Trash2, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { SampleItem } from '../types';

export const EntrustStep2: React.FC = () => {
  const {
    formData,
    updateFormData,
    navigateTo,
    setEditingSample,
    showToast,
  } = useApp();

  const [feedbackVote, setFeedbackVote] = useState<'up' | 'down' | null>(null);

  const handleEdit = (sample: SampleItem) => {
    setEditingSample(sample);
    navigateTo('entrust_step2_detail');
  };

  const handleAdd = () => {
    const newSample: SampleItem = {
      id: `sample_${Date.now()}`,
      name: '',
      businessType: 'DPA业务',
      model: '',
      quantity: 1,
      unit: '件',
      producer: formData.clientCompany || 'XX科技有限公司',
      batchNo: 'BATCH-001',
      produceDate: '2024-06-01',
      testProject: '环境与可靠性试验',
      tags: ['目检外观', '电性测试'],
      dynamicFields: {},
    };
    setEditingSample(newSample);
    navigateTo('entrust_step2_detail');
  };

  const handleCopy = (sample: SampleItem) => {
    const copied: SampleItem = {
      ...sample,
      id: `sample_${Date.now()}`,
      name: `${sample.name} (副本)`,
    };
    updateFormData({
      samples: [...formData.samples, copied],
    });
    showToast(`已复制样品【${sample.name}】`);
  };

  const handleDelete = (id: string) => {
    if (formData.samples.length <= 1) {
      showToast('至少需要保留一个测试样品');
      return;
    }
    updateFormData({
      samples: formData.samples.filter((s) => s.id !== id),
    });
    showToast('已删除样品');
  };

  const handleNext = () => {
    if (formData.samples.length === 0) {
      showToast('请至少添加一个送检样品');
      return;
    }
    navigateTo('entrust_step3');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader
        title="步骤 2/4 - 样品信息"
        showBack={true}
        rightActionText="保存草稿"
        onRightAction={() => showToast('草稿已自动保存至本地缓存')}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Step Indicator Header matching Fig 14 */}
        <div className="text-center pt-1">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-6 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">步骤 2/4 - 样品信息</h2>
        </div>

        {/* Samples List matching Fig 14 */}
        <div className="space-y-3">
          {formData.samples.map((sample) => (
            <div
              key={sample.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex justify-between gap-3 relative"
            >
              {/* Left Sample Info */}
              <div className="flex-1 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{sample.name || '未命名样品'}</span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium border border-blue-200">
                    {sample.businessType}
                  </span>
                </div>

                <div className="text-slate-500 text-[11px]">
                  型号规格: <span className="text-slate-700 font-medium">{sample.model || '未填写'}</span>
                </div>

                <div className="text-slate-500 text-[11px]">
                  数量: <span className="text-slate-700 font-medium">{sample.quantity} {sample.unit}</span>
                </div>

                <div className="text-slate-500 text-[11px]">
                  生产单位: <span className="text-slate-700">{sample.producer || '未填写'}</span>
                </div>

                {/* Tags */}
                {sample.tags && sample.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {sample.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Action Buttons matching Fig 14 */}
              <div className="flex flex-col gap-1.5 shrink-0 justify-center">
                <button
                  type="button"
                  onClick={() => handleEdit(sample)}
                  className="text-xs px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded-lg font-medium border border-blue-200 transition-colors"
                >
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(sample)}
                  className="text-xs px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-lg font-medium border border-slate-200 transition-colors"
                >
                  复制
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(sample.id)}
                  className="text-xs px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg font-medium border border-red-200 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          ))}

          {/* Add Sample Button matching Fig 14 */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-3 bg-white hover:bg-slate-50 text-blue-600 border border-dashed border-blue-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ 添加样品</span>
          </button>
        </div>

        {/* Next Step CTA matching Fig 14 */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
          >
            下一页 → (样品处理要求)
          </button>
        </div>

        {/* Survey feedback matching Fig 14: 这一步 (样品信息) 填得顺吗？ 👍 / 👎 */}
        <div className="bg-white rounded-xl p-2.5 text-center text-xs text-slate-500 border border-slate-100 flex items-center justify-center gap-3">
          <span>这一步 (样品信息) 填得顺吗？</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFeedbackVote('up');
                showToast('感谢点赞！我们会继续优化填报体验');
              }}
              className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                feedbackVote === 'up' ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-600'
              }`}
            >
              <ThumbsUp className="w-4 h-4 inline mr-1" /> 顺畅
            </button>
            <button
              onClick={() => {
                setFeedbackVote('down');
                showToast('已记录反馈，稍后可通过右侧浮窗提交详细意见');
              }}
              className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                feedbackVote === 'down' ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-600'
              }`}
            >
              <ThumbsDown className="w-4 h-4 inline mr-1" /> 有待改进
            </button>
          </div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
