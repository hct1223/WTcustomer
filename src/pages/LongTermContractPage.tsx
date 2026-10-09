import React from 'react';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { FRAMEWORK_CONTRACT_PROJECTS, TEST_PROJECTS } from '../data/mockData';

export const LongTermContractPage: React.FC = () => {
  const {
    setSelectedProject,
    updateFormData,
    navigateTo,
    showToast,
  } = useApp();

  const handleFastOrder = (fwItem: typeof FRAMEWORK_CONTRACT_PROJECTS[0]) => {
    // According to Page 31 text:
    // 点击首页的“长协客户快速下单”，跳过销售经理匹配和委托须知环节，直接进入委托书填写。
    const matchingProj = TEST_PROJECTS.find((p) => p.name.includes(fwItem.name.replace('框架项目: ', ''))) || TEST_PROJECTS[0];
    setSelectedProject(matchingProj);

    // Update form with framework specs
    updateFormData({
      paymentMode: '长期框架协议月结',
    });

    showToast(`已识别长协客户身份，直通委托书填写！`);
    navigateTo('entrust_step1');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="长协客户快速下单" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Banner matching Fig 29 */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-2.5 text-xs text-amber-900 font-bold">
          <span className="text-base">🎯</span>
          <span>您是长期协议客户，享受快速下单</span>
        </div>

        {/* Section matching Fig 29 */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-800 px-1">
            框架项目列表
          </div>

          {FRAMEWORK_CONTRACT_PROJECTS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between gap-3 hover:border-blue-200 transition-colors"
            >
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-blue-600 font-bold">◇</span>
                  <span>{item.name}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  协议价: <span className="text-amber-600 font-bold font-mono">{item.contractPrice}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  有效期至: {item.validUntil}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleFastOrder(item)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 shrink-0 active:scale-95 transition-transform"
              >
                [快速下单]
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-100/70 rounded-xl text-[11px] text-slate-500 leading-relaxed">
          💡 注：长协快速通道免去销售经理核验与须知勾选，直接分派实验室工程组加急处理。
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
