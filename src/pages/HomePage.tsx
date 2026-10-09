import React, { useState } from 'react';
import {
  Search,
  Zap,
  Thermometer,
  FlaskConical,
  Wrench,
  Box,
  Plus,
  ThermometerSnowflake,
  RefreshCw,
  Cpu,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { BUSINESS_CATEGORIES, TEST_PROJECTS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    setSelectedCategory,
    setSelectedProject,
    orders,
    unreadCount,
    setShowFeedbackModal,
  } = useApp();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigateTo('search_results', { query: searchInput.trim() });
    } else {
      navigateTo('search_results', { query: '' });
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Thermometer':
        return <Thermometer className="w-6 h-6 text-red-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-emerald-500" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-indigo-500" />;
      case 'Box':
        return <Box className="w-6 h-6 text-orange-500" />;
      default:
        return <Plus className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="云上赛宝" showBack={false} />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-20">
        {/* Search Bar matching Fig 5 */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden px-3 py-2.5">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="搜索检测项目、标准名称..."
              className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchInput && (
              <button
                type="submit"
                className="text-[11px] font-semibold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md shrink-0"
              >
                搜索
              </button>
            )}
          </div>
        </form>

        {/* Long-term Customer Fast Order Banner (Matches Fig 5 & 28) */}
        <div
          onClick={() => navigateTo('long_term')}
          className="cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-4 text-white shadow-sm hover:opacity-95 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <Zap className="w-4 h-4 fill-white" />
            <span>长协客户快速下单</span>
          </div>
          <p className="text-[11px] text-amber-50 mt-1">
            长协客户专享，免销售确认，直达客服下单
          </p>
        </div>

        {/* Category Grid Browsing (Matches Fig 5) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100">
          <div className="text-xs font-bold text-slate-900 mb-3 flex items-center justify-between">
            <span>分类浏览</span>
            <span className="text-[10px] font-normal text-slate-400">后台可动态配置</span>
          </div>

          <div className="grid grid-cols-3 gap-y-4 gap-x-2">
            {BUSINESS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigateTo('category_list', { categoryId: cat.id, categoryName: cat.name });
                }}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-slate-50 active:scale-95 transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 group-hover:bg-white border border-slate-100 shadow-xs mb-1.5 transition-colors">
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-medium text-slate-700 leading-tight">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Guide hint bar matching Fig 5 */}
          <div className="mt-4 p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-center gap-2 text-[11px] text-amber-800">
            <span className="text-xs">💡</span>
            <span className="leading-tight">
              点击分类、搜索框或底部导航体验页面跳转
            </span>
          </div>
        </div>

        {/* Hot / Recommended Detection Items */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-900">热门委托试验</span>
            <button
              onClick={() => navigateTo('search_results')}
              className="text-[11px] text-blue-600 flex items-center gap-0.5"
            >
              查看全部 <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {TEST_PROJECTS.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj);
                  navigateTo('project_detail', { projectId: proj.id });
                }}
                className="p-3 bg-slate-50/70 hover:bg-slate-100/70 rounded-xl cursor-pointer border border-slate-100 flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{proj.name}</span>
                    <span className="text-[10px] font-normal text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                      {proj.standard.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    参考价: <span className="font-semibold text-amber-600">{proj.priceRange}</span> · {proj.periodNormal}
                  </div>
                </div>
                <span className="text-xs text-blue-600 font-medium shrink-0">
                  详情 →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Order Status Snippet if orders exist */}
        {orders.length > 0 && (
          <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-blue-900">最新委托 {orders[0].id}</span>
                <span className="text-blue-700 ml-1.5">[{orders[0].status}]</span>
              </div>
            </div>
            <button
              onClick={() => {
                navigateTo('order_detail', { orderId: orders[0].id });
              }}
              className="text-[11px] font-medium text-blue-700 bg-white px-2 py-1 rounded-md border border-blue-200 shrink-0"
            >
              查看进度
            </button>
          </div>
        )}
      </div>

      <WeChatTabBar />
    </div>
  );
};
