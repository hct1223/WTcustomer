import React, { useState } from 'react';
import { Search, Thermometer, ThermometerSnowflake, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { TEST_PROJECTS, BUSINESS_CATEGORIES } from '../data/mockData';
import { TestProject } from '../types';

export const CategoryListPage: React.FC = () => {
  const { routeParams, setSelectedProject, navigateTo } = useApp();
  const categoryId = routeParams.categoryId || 'env';
  const categoryObj = BUSINESS_CATEGORIES.find((c) => c.id === categoryId) || BUSINESS_CATEGORIES[0];
  const [localSearch, setLocalSearch] = useState('');

  // Category-specific projects
  const categoryProjects = TEST_PROJECTS.filter((p) => {
    const matchesCat = p.category === categoryId || categoryId === 'more';
    if (!localSearch.trim()) return matchesCat;
    return (
      matchesCat &&
      (p.name.includes(localSearch.trim()) || p.standard.includes(localSearch.trim()))
    );
  });

  const handleSelect = (proj: TestProject) => {
    setSelectedProject(proj);
    navigateTo('project_detail', { projectId: proj.id });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title={categoryObj.name} showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-20">
        {/* Category internal search matching Fig 7 text: 应该也有搜索框，搜索范围只在这个分类下面 */}
        <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden px-3 py-2.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder={`在【${categoryObj.name}】中快速搜索...`}
            className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
          />
        </div>

        {/* Project List matching Fig 7 */}
        <div className="space-y-3 pt-1">
          {categoryProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleSelect(proj)}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                <Thermometer className="w-4 h-4 text-red-500" />
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

          {categoryProjects.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
              <p>该分类下暂无对应搜索项目</p>
            </div>
          )}
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
