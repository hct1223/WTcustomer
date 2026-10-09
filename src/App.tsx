import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PageRoute } from './types';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { CategoryListPage } from './pages/CategoryListPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ManagerMatchPage } from './pages/ManagerMatchPage';
import { NewConsultationPage } from './pages/NewConsultationPage';
import { ConsultationSuccessPage } from './pages/ConsultationSuccessPage';
import { EntrustNoticePage } from './pages/EntrustNoticePage';
import { EntrustStep1 } from './pages/EntrustStep1';
import { EntrustStep2 } from './pages/EntrustStep2';
import { EntrustStep2Detail } from './pages/EntrustStep2Detail';
import { EntrustStep3 } from './pages/EntrustStep3';
import { EntrustStep4 } from './pages/EntrustStep4';
import { OrderCheckPage } from './pages/OrderCheckPage';
import { DigitalSignPage } from './pages/DigitalSignPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderListPage } from './pages/OrderListPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { ModifyApplyPage } from './pages/ModifyApplyPage';
import { ModifyProgressPage } from './pages/ModifyProgressPage';
import { LongTermContractPage } from './pages/LongTermContractPage';
import { InvoiceLibraryPage } from './pages/InvoiceLibraryPage';
import { InvoiceEditPage } from './pages/InvoiceEditPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import {
  Toast,
  QuickConsultModal,
  FeedbackModal,
  ReportPreviewModal
} from './components/Modals';
import { Smartphone, Monitor, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

const RouteRenderer: React.FC = () => {
  const { currentRoute } = useApp();

  switch (currentRoute) {
    case 'home':
      return <HomePage />;
    case 'search_results':
      return <SearchResultsPage />;
    case 'category_list':
      return <CategoryListPage />;
    case 'project_detail':
      return <ProjectDetailPage />;
    case 'manager_match':
      return <ManagerMatchPage />;
    case 'new_consultation':
      return <NewConsultationPage />;
    case 'consultation_success':
      return <ConsultationSuccessPage />;
    case 'entrust_notice':
      return <EntrustNoticePage />;
    case 'entrust_step1':
      return <EntrustStep1 />;
    case 'entrust_step2':
      return <EntrustStep2 />;
    case 'entrust_step2_detail':
      return <EntrustStep2Detail />;
    case 'entrust_step3':
      return <EntrustStep3 />;
    case 'entrust_step4':
      return <EntrustStep4 />;
    case 'order_check':
      return <OrderCheckPage />;
    case 'digital_sign':
      return <DigitalSignPage />;
    case 'order_success':
      return <OrderSuccessPage />;
    case 'order_list':
      return <OrderListPage />;
    case 'order_detail':
      return <OrderDetailPage />;
    case 'modify_apply':
      return <ModifyApplyPage />;
    case 'modify_progress':
      return <ModifyProgressPage />;
    case 'long_term':
      return <LongTermContractPage />;
    case 'invoice_library':
      return <InvoiceLibraryPage />;
    case 'invoice_edit':
      return <InvoiceEditPage />;
    case 'messages':
      return <MessagesPage />;
    case 'profile':
      return <ProfilePage />;
    default:
      return <HomePage />;
  }
};

const QUICK_NAV_ITEMS: { route: PageRoute; label: string; fig: string }[] = [
  { route: 'home', label: '小程序首页', fig: '图 4, 5' },
  { route: 'search_results', label: '搜索结果', fig: '图 6' },
  { route: 'category_list', label: '业务分类', fig: '图 7' },
  { route: 'project_detail', label: '项目详情', fig: '图 8' },
  { route: 'manager_match', label: '匹配销售经理', fig: '图 9' },
  { route: 'new_consultation', label: '新咨询登记', fig: '图 10' },
  { route: 'entrust_notice', label: '委托须知', fig: '图 12' },
  { route: 'entrust_step1', label: '步骤1 委托方信息', fig: '图 13' },
  { route: 'entrust_step2', label: '步骤2 样品列表', fig: '图 14' },
  { route: 'entrust_step2_detail', label: '步骤2 11类动态字段', fig: '图 15' },
  { route: 'entrust_step3', label: '步骤3 样品处理', fig: '图 16' },
  { route: 'entrust_step4', label: '步骤4 报告与商务', fig: '图 17' },
  { route: 'order_check', label: '信息核对与防呆', fig: '图 18' },
  { route: 'digital_sign', label: '电子签名确认', fig: '图 19' },
  { route: 'order_success', label: '提交成功与实测', fig: '图 20' },
  { route: 'order_list', label: '订单列表与筛选', fig: '图 21' },
  { route: 'order_detail', label: '订单详情(10节点)', fig: '图 22, 25' },
  { route: 'modify_apply', label: '报告修改申请', fig: '图 26' },
  { route: 'modify_progress', label: '双轨修改进度', fig: '图 27' },
  { route: 'long_term', label: '长协快速下单', fig: '图 29' },
  { route: 'invoice_library', label: '常用开票库', fig: '图 23' },
  { route: 'invoice_edit', label: '新增开票信息', fig: '图 24' },
  { route: 'messages', label: '消息通知中心', fig: '图 33' },
  { route: 'profile', label: '个人中心', fig: '规范' },
];

const MainLayout: React.FC = () => {
  const { isDeviceFrame, setIsDeviceFrame, navigateTo, currentRoute } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row items-center justify-center p-0 lg:p-6 overflow-x-hidden font-sans">
      {/* Desktop Quick-Access Sidebar (Hidden on mobile) */}
      <aside aria-label="全流程快速直达" className="hidden xl:flex flex-col w-72 h-[840px] bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 mr-6 border border-slate-700/80 shadow-2xl text-slate-200 shrink-0">
        <div className="pb-3 border-b border-slate-700">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>文档全流程直达索引</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            严格依照《客户手机端全流程》1~33页及图4~29设计
          </p>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-1 text-xs">
          {QUICK_NAV_ITEMS.map((item) => {
            const active = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                  active
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className={`text-[10px] ml-1 shrink-0 ${active ? 'text-blue-100' : 'text-slate-400'}`}>
                  {item.fig}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-700 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>中国赛宝实验室 · 工业和信息化部电子第五研究所</span>
          </div>
          <div>云上赛宝 · 试运行反馈版</div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Top Control Bar for Simulator */}
        <div className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-300 mb-1 lg:flex">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-bold">微信小程序端运行环境</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDeviceFrame(!isDeviceFrame)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors text-[11px]"
              title="切换真机外观"
            >
              {isDeviceFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span>{isDeviceFrame ? '平铺视口' : '手机外观'}</span>
            </button>
          </div>
        </div>

        {/* Device Frame or Full Screen */}
        <div
          className={`w-full transition-all duration-300 ${
            isDeviceFrame
              ? 'relative max-w-[395px] h-[830px] rounded-[44px] bg-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-slate-700/60'
              : 'w-full max-w-md h-screen lg:h-[840px] lg:rounded-3xl shadow-2xl bg-white'
          }`}
        >
          {/* Mobile Screen Area */}
          <div
            className={`w-full h-full bg-slate-50 flex flex-col overflow-hidden relative ${
              isDeviceFrame ? 'rounded-[32px]' : 'rounded-none lg:rounded-2xl'
            }`}
          >
            <RouteRenderer />
          </div>
        </div>
      </div>

      {/* Global Modals & Toast */}
      <Toast />
      <QuickConsultModal />
      <FeedbackModal />
      <ReportPreviewModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
