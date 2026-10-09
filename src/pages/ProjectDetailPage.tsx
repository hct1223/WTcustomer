import React from 'react';
import { Thermometer, FileText, CheckCircle, Clock, Tag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { TEST_PROJECTS } from '../data/mockData';

export const ProjectDetailPage: React.FC = () => {
  const { selectedProject, navigateTo } = useApp();
  const project = selectedProject || TEST_PROJECTS[0];

  const handleStartEntrust = () => {
    // Flows according to Page 5: 选择项目后进入销售经理匹配环节
    navigateTo('manager_match');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="项目详情" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Project Header Card matching Fig 8 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Thermometer className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">{project.name}</h2>
          </div>

          <div className="space-y-4 text-xs">
            {/* Standards */}
            <div>
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <span>检测标准</span>
              </div>
              <div className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono text-[11px]">
                {project.standard} {project.standardName}
              </div>
            </div>

            {/* Scope */}
            <div>
              <div className="font-bold text-slate-900 mb-1">适用范围</div>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {project.scope}
              </p>
            </div>

            {/* Turnaround Period */}
            <div>
              <div className="font-bold text-slate-900 mb-1">检测周期</div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1 text-[11px]">
                <div className="text-slate-700">常规: {project.periodNormal}</div>
                <div className="text-amber-700 font-medium">加急: {project.periodUrgent}</div>
              </div>
            </div>

            {/* Reference Price */}
            <div>
              <div className="font-bold text-slate-900 mb-1">参考价格</div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="text-base font-bold text-amber-600">
                  {project.priceRange}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>💡 最终价格以实际检测条件为准</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA matching Fig 8 */}
          <div className="mt-6">
            <button
              onClick={handleStartEntrust}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/15 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <span>📝 下达委托</span>
            </button>
          </div>
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
