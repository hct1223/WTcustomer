import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  UserCheck,
  Phone,
  MapPin,
  HelpCircle,
  CheckCircle,
  RefreshCcw,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { MOCK_MANAGERS } from '../data/mockData';
import { SalesManager } from '../types';

export const ManagerMatchPage: React.FC = () => {
  const {
    currentManager,
    setCurrentManager,
    navigateTo,
    showToast,
  } = useApp();

  const [companyName, setCompanyName] = useState('XX科技有限公司');
  const [hasSearched, setHasSearched] = useState(true);
  const [matchedManager, setMatchedManager] = useState<SalesManager | null>(currentManager);
  const [isSearching, setIsSearching] = useState(false);
  const [queryCount, setQueryCount] = useState(1);
  const [showReassignNotice, setShowReassignNotice] = useState(false);

  const handleMatch = () => {
    if (!companyName.trim()) {
      showToast('请输入企业标准名称');
      return;
    }

    if (queryCount >= 10) {
      showToast('查询频繁，已触发反爬虫安全限制，请稍候重试');
      return;
    }

    setQueryCount((c) => c + 1);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);

      const name = companyName.trim();
      if (name.includes('飞腾') || name.includes('华为')) {
        // Example with manager reassignment notice
        setMatchedManager(MOCK_MANAGERS[1]);
        setShowReassignNotice(true);
        showToast('匹配成功 (LIMS接口返回)');
      } else if (name.includes('XX科技')) {
        setMatchedManager(MOCK_MANAGERS[0]);
        setShowReassignNotice(false);
        showToast('已匹配到您企业默认对接经理');
      } else if (name.includes('未知') || name.includes('新企业') || name.includes('测试新客户')) {
        setMatchedManager(null);
        setShowReassignNotice(false);
        showToast('未查询到绑定经理，请发起咨询');
      } else {
        setMatchedManager(MOCK_MANAGERS[2]);
        setShowReassignNotice(false);
        showToast('匹配成功');
      }
    }, 450);
  };

  const handleConfirmManager = () => {
    if (matchedManager) {
      setCurrentManager(matchedManager);
      // Proceed to Next Step: 委托须知 (Fig 12)
      navigateTo('entrust_notice');
    }
  };

  const handleContactRegional = () => {
    showToast('已向区域经理发送蓝信转派工单，区域经理将尽快调整！');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="确认对接经理" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Top Warning Box matching Fig 9 */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>目前暂无对接经理</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-800/90">
            匹配规则：老客户且线上/线下下过单 — 系统自动带出经理；
            老客户新账号未下过单 — 请输入单位标准名称匹配经理。
          </p>
        </div>

        {/* Enterprise Input Box matching Fig 9 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              企业标准名称 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="如：飞腾 或 XX科技有限公司"
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-0.5">
              <span>通过企业全称去 LIMS 接口安全调取</span>
              <span>反爬频次: {queryCount}/10</span>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => { setCompanyName('XX科技有限公司'); }}
              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200"
            >
              老客户: XX科技有限公司
            </button>
            <button
              type="button"
              onClick={() => { setCompanyName('天津飞腾信息技术有限公司'); }}
              className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md hover:bg-amber-100"
            >
              换人企业: 飞腾
            </button>
            <button
              type="button"
              onClick={() => { setCompanyName('未知新企业科技公司'); }}
              className="text-[10px] px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100"
            >
              新客户: 未知新企业
            </button>
          </div>

          {/* Match Button matching Fig 9 */}
          <button
            onClick={handleMatch}
            disabled={isSearching}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isSearching ? '正在调用LIMS接口...' : '匹配经理'}</span>
          </button>

          {/* Fallback option matching Fig 9 */}
          <div className="text-center pt-1">
            <button
              onClick={() => navigateTo('new_consultation')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>无匹配，发起咨询</span>
            </button>
          </div>
        </div>

        {/* Matched Manager Info Card */}
        {hasSearched && matchedManager && (
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-blue-100 space-y-3 animate-in fade-in">
            {/* Reassigned Notice (from Page 6 text: 客户对接经理发生变更一个月内，提示原销售已替换) */}
            {showReassignNotice && matchedManager.isReassigned && (
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-800 leading-tight">
                <span className="font-bold">⚠️ 人员调整提醒：</span>
                原销售【{matchedManager.oldManagerName}】已替换对接人为【{matchedManager.name}】。系统已默认指向新销售，如需紧急沟通仍可致电原销售: {matchedManager.oldManagerPhone}。
              </div>
            )}

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  {matchedManager.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{matchedManager.name}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                      赛宝专属业务经理
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{matchedManager.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>服务区域：{matchedManager.region}</span>
            </div>

            {/* Actions */}
            <div className="pt-1 space-y-2">
              <button
                onClick={handleConfirmManager}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>确认对接经理，下一步</span>
              </button>

              <button
                onClick={handleContactRegional}
                className="w-full py-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-[11px] font-medium transition-colors"
              >
                对该经理不满意？联系区域经理在蓝信转派
              </button>
            </div>
          </div>
        )}

        {/* If searched and no manager found */}
        {hasSearched && !matchedManager && (
          <div className="bg-white rounded-2xl p-5 text-center space-y-3 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-slate-800">该单位尚未在系统建档</div>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              请进入新咨询信息登记页填写信息，区域经理将在1个工作日内为您人工指派专属业务经理。
            </p>
            <button
              onClick={() => navigateTo('new_consultation')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-xs"
            >
              立即填写新咨询信息
            </button>
          </div>
        )}
      </div>

      <WeChatTabBar />
    </div>
  );
};
