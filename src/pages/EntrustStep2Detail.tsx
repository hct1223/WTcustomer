import React, { useState } from 'react';
import { Layers, ArrowLeft, Save, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { SampleItem } from '../types';

const BUSINESS_TYPE_OPTIONS = [
  'DPA业务',
  '分析业务',
  '民口 GCH',
  '质量与可靠性技术服务',
  '环境可靠性试验',
  '元器件筛选',
  '软件评测',
  '电磁兼容(EMC)',
  '理化材料分析',
  '仪器计量校准',
  '包装运输测试',
];

export const EntrustStep2Detail: React.FC = () => {
  const {
    editingSample,
    formData,
    updateFormData,
    goBack,
    showToast,
  } = useApp();

  const [sample, setSample] = useState<SampleItem>(
    editingSample || {
      id: `sample_${Date.now()}`,
      name: '',
      businessType: 'DPA业务',
      model: '',
      quantity: 1,
      unit: '件',
      producer: formData.clientCompany || 'XX科技有限公司',
      batchNo: 'BATCH-2024',
      produceDate: '2024-05-20',
      testProject: '高温试验',
      tags: ['外部目检', 'X射线检查'],
      dynamicFields: {},
    }
  );

  const dynamicFields = sample.dynamicFields || {};

  const handleUpdateField = (key: string, val: any) => {
    setSample((prev) => ({
      ...prev,
      dynamicFields: {
        ...(prev.dynamicFields || {}),
        [key]: val,
      },
    }));
  };

  const handleSave = () => {
    if (!sample.name.trim() || !sample.model.trim() || !sample.producer.trim()) {
      showToast('请完整填写样品基础必填信息');
      return;
    }

    const existingIndex = formData.samples.findIndex((s) => s.id === sample.id);
    let updatedSamples: SampleItem[];
    if (existingIndex >= 0) {
      updatedSamples = [...formData.samples];
      updatedSamples[existingIndex] = sample;
    } else {
      updatedSamples = [...formData.samples, sample];
    }

    updateFormData({ samples: updatedSamples });
    showToast('样品信息已保存');
    goBack();
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader
        title="样品具体信息填写页"
        showBack={true}
        rightActionText="保存"
        onRightAction={handleSave}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Progress header */}
        <div className="text-center pt-1">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-3 h-1.5 rounded-full bg-blue-600" />
            <span className="w-6 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">样品具体信息填写页</h2>
        </div>

        {/* Basic Sample Info matching Fig 15 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
          <div className="text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
            基础样品信息
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              生产单位/生产厂家 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sample.producer}
              onChange={(e) => setSample({ ...sample, producer: e.target.value })}
              placeholder="请填写生产单位/生产厂家"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              样品/产品名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sample.name}
              onChange={(e) => setSample({ ...sample, name: e.target.value })}
              placeholder="如：手机PCB板"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              型号规格 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sample.model}
              onChange={(e) => setSample({ ...sample, model: e.target.value })}
              placeholder="如：PCB-2024-A"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                数量 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={sample.quantity}
                onChange={(e) => setSample({ ...sample, quantity: parseInt(e.target.value) || 1 })}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                单位
              </label>
              <input
                type="text"
                value={sample.unit}
                onChange={(e) => setSample({ ...sample, unit: e.target.value })}
                placeholder="件/组/个"
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                生产批号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={sample.batchNo || ''}
                onChange={(e) => setSample({ ...sample, batchNo: e.target.value })}
                placeholder="如：BAT-20240501"
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                生产日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={sample.produceDate || ''}
                onChange={(e) => setSample({ ...sample, produceDate: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              试验项目 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sample.testProject}
              onChange={(e) => setSample({ ...sample, testProject: e.target.value })}
              placeholder="试验项目名称"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* 11 Business Types Dynamic Fields Engine matching Page 13-14 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-blue-100 space-y-3.5">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>试验项目专属动态字段</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                支持 11 种业务类型的动态字段联动切换
              </div>
            </div>

            <select
              value={sample.businessType}
              onChange={(e) => setSample({ ...sample, businessType: e.target.value })}
              className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 focus:outline-none"
            >
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* DPA Business: 10 Dedicated Fields matching Page 14 */}
          {sample.businessType === 'DPA业务' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-[11px] text-blue-600 bg-blue-50/60 p-2 rounded-lg font-medium">
                DPA破坏性物理分析专属字段（包含母体数、质量等级、抽样说明等10个关键参数）:
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">1. 母体数</label>
                  <input
                    type="text"
                    value={dynamicFields.dpaParentCount || '30件母体批次'}
                    onChange={(e) => handleUpdateField('dpaParentCount', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">2. 质量等级</label>
                  <select
                    value={dynamicFields.qualityGrade || '国军标普军级'}
                    onChange={(e) => handleUpdateField('qualityGrade', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="国军标普军级">国军标普军级</option>
                    <option value="宇航级 (Class S)">宇航级 (Class S)</option>
                    <option value="车规级 (AEC-Q)">车规级 (AEC-Q)</option>
                    <option value="工业工业品级">工业工业品级</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">3. 抽样说明</label>
                <input
                  type="text"
                  value={dynamicFields.sampleNote || '按批次随机抽取4件，留样1件'}
                  onChange={(e) => handleUpdateField('sampleNote', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">4. 器件类别</label>
                  <input
                    type="text"
                    value={dynamicFields.deviceType || '高频多层板/集成电路'}
                    onChange={(e) => handleUpdateField('deviceType', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">5. 封装形式</label>
                  <input
                    type="text"
                    value={dynamicFields.packageForm || 'FR-4阻燃封装 / QFP'}
                    onChange={(e) => handleUpdateField('packageForm', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">6. 执行规范</label>
                  <input
                    type="text"
                    value={dynamicFields.standardRule || 'GJB 4087-2000'}
                    onChange={(e) => handleUpdateField('standardRule', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">7. 破坏性试验确认</label>
                  <select
                    value={dynamicFields.destructiveConfirm || '是 (允许破坏性解剖)'}
                    onChange={(e) => handleUpdateField('destructiveConfirm', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="是 (允许破坏性解剖)">是 (允许破坏性解剖)</option>
                    <option value="否 (需保留复验功能)">否 (需保留复验功能)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">8. 解封方法</label>
                <input
                  type="text"
                  value={dynamicFields.decapsulationMethod || '化学硝酸发烟法 / 机械激光研磨'}
                  onChange={(e) => handleUpdateField('decapsulationMethod', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">9. 内部目检要求</label>
                  <input
                    type="text"
                    value={dynamicFields.internalVisual || '100倍立体金相检查焊点空洞'}
                    onChange={(e) => handleUpdateField('internalVisual', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">10. 键合拉力测试</label>
                  <input
                    type="text"
                    value={dynamicFields.bondingPull || '≥5.0gf拉力要求'}
                    onChange={(e) => handleUpdateField('bondingPull', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Analysis Business: 2 Dedicated Fields matching Page 14 */}
          {sample.businessType === '分析业务' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-[11px] text-blue-600 bg-blue-50/60 p-2 rounded-lg font-medium">
                分析业务专属字段（包含破坏性/非破坏性/失效分析模式及关注机理）：
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  1. 分析模式选择 (破坏性/非破坏性/失效分析)
                </label>
                <select
                  value={dynamicFields.analysisMode || '非破坏性+失效对比分析'}
                  onChange={(e) => handleUpdateField('analysisMode', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="破坏性分析 (解剖研磨切片)">破坏性分析 (解剖研磨切片)</option>
                  <option value="非破坏性分析 (CT断层/红外热成像)">非破坏性分析 (CT断层/红外热成像)</option>
                  <option value="失效机制溯源对比分析">失效机制溯源对比分析</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  2. 重点关注失效机理与位置
                </label>
                <textarea
                  rows={2}
                  value={dynamicFields.focusMechanism || '输出短路保护失效点分析、引脚封装氧化定位'}
                  onChange={(e) => handleUpdateField('focusMechanism', e.target.value)}
                  placeholder="如：重载或高温工况下纹波毛刺超标、焊点剥离原因定位"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* MinKou GCH: 2 Dedicated Fields matching Page 14 */}
          {sample.businessType === '民口 GCH' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-[11px] text-blue-600 bg-blue-50/60 p-2 rounded-lg font-medium">
                民口 GCH 专属字段（包含6种委托类型与试验等级）：
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  1. 委托类型 (6 种类型)
                </label>
                <select
                  value={dynamicFields.entrustCategory || '型式检验抽样委托'}
                  onChange={(e) => handleUpdateField('entrustCategory', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="型式检验抽样委托">1. 型式检验抽样委托</option>
                  <option value="研发摸底验证试验">2. 研发摸底验证试验</option>
                  <option value="出厂批次合格复测">3. 出厂批次合格复测</option>
                  <option value="认证合格比对评测">4. 认证合格比对评测</option>
                  <option value="质量仲裁法庭出证">5. 质量仲裁法庭出证</option>
                  <option value="其它专项规程试验">6. 其它专项规程试验</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  2. 试验等级/工况要求
                </label>
                <input
                  type="text"
                  value={dynamicFields.conditionGrade || '严苛交变湿热 -40℃~+85℃ 100循环'}
                  onChange={(e) => handleUpdateField('conditionGrade', e.target.value)}
                  placeholder="如：-40℃~+85℃, 循环数或等级代号"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Quality & Reliability: 1 Dedicated Field matching Page 14 */}
          {sample.businessType === '质量与可靠性技术服务' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-[11px] text-blue-600 bg-blue-50/60 p-2 rounded-lg font-medium">
                质量与可靠性技术服务（包含7种服务类型）：
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  1. 服务类型选择 (7 种类型)
                </label>
                <select
                  value={dynamicFields.serviceType || '电子元器件高可靠性筛选与极限应力试验'}
                  onChange={(e) => handleUpdateField('serviceType', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="1. 产品MTBF可靠性预计与寿命评估">1. 产品MTBF可靠性预计与寿命评估</option>
                  <option value="2. 高加速寿命试验 (HALT/HASS)">2. 高加速寿命试验 (HALT/HASS)</option>
                  <option value="3. 电子元器件高可靠性筛选与极限应力试验">3. 电子元器件高可靠性筛选与极限应力试验</option>
                  <option value="4. 潜在故障模式及后果分析 (FMEA)">4. 潜在故障模式及后果分析 (FMEA)</option>
                  <option value="5. 制造工艺可靠性提升辅导与诊断">5. 制造工艺可靠性提升辅导与诊断</option>
                  <option value="6. 元器件选用目录梳理与替代验证">6. 元器件选用目录梳理与替代验证</option>
                  <option value="7. 航天/军工专用环境适应性验证">7. 航天/军工专用环境适应性验证</option>
                </select>
              </div>
            </div>
          )}

          {/* Other business types fallback */}
          {!['DPA业务', '分析业务', '民口 GCH', '质量与可靠性技术服务'].includes(sample.businessType) && (
            <div className="space-y-3 animate-in fade-in text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  专项试验条件与规程要求
                </label>
                <textarea
                  rows={2}
                  value={dynamicFields.customSpec || '遵循国家/行业相应规程，记录初始及最终电性能参数'}
                  onChange={(e) => handleUpdateField('customSpec', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>保存样品信息并返回</span>
          </button>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
