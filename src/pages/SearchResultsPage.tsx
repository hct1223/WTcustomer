import React, { useState } from 'react';
import { Search, Thermometer, Zap, ThermometerSnowflake, RefreshCw, Cpu, FlaskConical } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { TEST_PROJECTS } from '../data/mockData';
import { TestProject } from '../types';

export const SearchResultsPage: React.FC = () => {
  const { routeParams, setSelectedProject, navigateTo } = useApp();
  const [keyword, setKeyword] = useState<string>(routeParams.query || '');

  const filteredProjects = TEST_PROJECTS.filter((p) => {
    if (!keyword.trim()) return true;
    const term = keyword.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.standard.toLowerCase().includes(term) ||
      p.standardName.toLowerCase().includes(term) ||
      p.scope.toLowerCase().includes(term)
    );
  });

  const getIcon = (projId: string) => {
    if (projId.includes('temp')) return <Thermometer className="w-4 h-4 text-red-500" />;
    if (projId.includes('elec')) return <Zap className="w-4 h-4 text-amber-500" />;
    if (projId.includes('dpa')) return <Cpu className="w-4 h-4 text-indigo-500" />;
    if (projId.includes('chem')) return <FlaskConical className="w-4 h-4 text-emerald-500" />;
    return <RefreshCw className="w-4 h-4 text-blue-500" />;
  };

  const handleSelect = (proj: TestProject) => {
    setSelectedProject(proj);
    navigateTo('project_detail', { projectId: proj.id });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="搜索结果" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-20">
        {/* Search input bar matching Fig 6 */}
        <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden px-3 py-2.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索检测项目、标准名称..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="text-[10px] text-slate-400 hover:text-slate-600 px-1"
            >
              清空
            </button>
          )}
        </div>

        {/* Results count hint */}
        <div className="flex justify-between items-center text-[11px] text-slate-400 px-1">
          <span>找到 {filteredProjects.length} 个相关试验项目</span>
          <span>工信部电子五所官方检测资质</span>
        </div>

        {/* Project Cards matching Fig 6 */}
        <div className="space-y-3">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleSelect(proj)}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                {getIcon(proj.id)}
                <span>{proj.name}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                标准: <span className="text-slate-700">{proj.standard}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <div>
                  参考价: <span className="text-amber-600 font-bold">{proj.priceRange}</span>
                </div>
                <button
                  type="button"
                  className="text-xs text-blue-600 font-medium hover:text-blue-700"
                >
                  查看详情 →
                </button>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
              <p>暂无完全匹配的检测项目</p>
              <p className="text-[11px] mt-1 text-slate-400">
                支持直接在首页点击「快速咨询」由专员人工检索并定制方案
              </p>
            </div>
          )}
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
