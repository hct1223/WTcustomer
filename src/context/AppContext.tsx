import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageRoute,
  TabType,
  TestProject,
  SalesManager,
  Order,
  SampleItem,
  InvoiceInfo,
  AppNotification,
  OrderModifyApplication,
  SealApplication,
} from '../types';
import {
  TEST_PROJECTS,
  MOCK_MANAGERS,
  INITIAL_INVOICES,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

export interface EntrustFormData {
  // Step 1
  clientCompany: string;
  clientAddress: string;
  clientContact: string;
  clientPhone: string;
  clientFax: string;
  clientEmail: string;
  clientZip: string;
  isTianyanchaVerified: boolean;
  tianyanchaRemain: number;
  // Step 2
  samples: SampleItem[];
  // Step 3
  receiveMode: '邮寄' | '自送' | '抽样(收费)';
  processMode: '自取' | '代邮' | '实验方保存一个月' | '其它';
  returnAddress: string;
  returnContact: string;
  returnPhone: string;
  safetyInfo: string[];
  expressNumbers: string[];
  packageRequirement: string;
  // Step 4
  reportVersion: {
    chinese: boolean;
    english: boolean;
    englishApplicant: string;
    englishAddress: string;
    noReportDataOnly: boolean;
  };
  reportRequirement: '无特殊要求' | '按样品分开出' | '按检测项目分开出';
  deliveryMode: '电子报告' | '纸质邮寄' | '纸质自取';
  reportEmail: string;
  reportUsage: string;
  paymentMode: string;
  payCompany: string;
  // Step 5 - Sign
  signatureDataUrl?: string;
}

const DEFAULT_FORM_DATA: EntrustFormData = {
  clientCompany: 'XX科技有限公司',
  clientAddress: '广东省广州市天河区五山路赛宝科技园C座401',
  clientContact: '张三',
  clientPhone: '138****8888',
  clientFax: '',
  clientEmail: 'zhangsan@xx-company.com',
  clientZip: '510610',
  isTianyanchaVerified: true,
  tianyanchaRemain: 5,
  samples: [
    {
      id: 'sample_default_1',
      name: '手机PCB板',
      businessType: 'DPA业务',
      model: 'PCB-2024-A',
      quantity: 3,
      unit: '件',
      producer: 'XX电子科技有限公司',
      batchNo: 'BAT-20240501',
      produceDate: '2024-05-15',
      testProject: '高温试验 / DPA',
      tags: ['外部目检', 'X射线检查', '密封', '键合强度'],
      dynamicFields: {
        dpaParentCount: '30件母体批次',
        qualityGrade: '国军标普军级',
        sampleNote: '按批次随机抽取4件，留样1件',
        deviceType: '高频多层板',
        packageForm: 'FR-4阻燃封装',
        standardRule: 'GJB 4087-2000',
        destructiveConfirm: '是 (允许破坏性解剖)',
        decapsulationMethod: '化学硝酸发烟法',
        internalVisual: '100倍立体金相检查焊点空洞',
        bondingPull: '≥5.0gf拉力要求',
      },
    },
    {
      id: 'sample_default_2',
      name: '电源管理芯片',
      businessType: '分析业务',
      model: 'PMIC-2023',
      quantity: 5,
      unit: '件',
      producer: 'YY半导体股份有限公司',
      batchNo: 'PM-9901',
      produceDate: '2024-06-01',
      testProject: '电性测试 (稳态)',
      tags: ['成分分析', '结构检查'],
      dynamicFields: {
        analysisMode: '破坏性/失效分析',
        focusMechanism: '输出短路保护失效点分析',
      },
    },
  ],
  receiveMode: '邮寄',
  processMode: '代邮',
  returnAddress: '广东省广州市天河区科韵路88号研发中心 张三 138****8888',
  returnContact: '张三',
  returnPhone: '138****8888',
  safetyInfo: ['安全无需特殊处理'],
  expressNumbers: ['SF1492048192039'],
  packageRequirement: '防静电屏蔽袋独立封装，严防跌落碰撞',
  reportVersion: {
    chinese: true,
    english: false,
    englishApplicant: '',
    englishAddress: '',
    noReportDataOnly: false,
  },
  reportRequirement: '无特殊要求',
  deliveryMode: '电子报告',
  reportEmail: 'zhangsan@xx-company.com',
  reportUsage: '研发评价与工艺改进',
  paymentMode: '协议月结',
  payCompany: 'XX科技有限公司',
};

interface AppContextType {
  currentRoute: PageRoute;
  routeParams: Record<string, any>;
  activeTab: TabType;
  historyStack: { route: PageRoute; params: Record<string, any> }[];
  navigateTo: (route: PageRoute, params?: Record<string, any>) => void;
  goBack: () => void;
  switchTab: (tab: TabType) => void;

  // Ordering & Data
  selectedProject: TestProject | null;
  setSelectedProject: (proj: TestProject | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  currentManager: SalesManager;
  setCurrentManager: (mgr: SalesManager) => void;
  orders: Order[];
  currentOrderId: string | null;
  setCurrentOrderId: (id: string | null) => void;
  formData: EntrustFormData;
  updateFormData: (data: Partial<EntrustFormData>) => void;
  resetFormData: () => void;
  editingSample: SampleItem | null;
  setEditingSample: (sample: SampleItem | null) => void;

  // Invoices & Common
  invoices: InvoiceInfo[];
  addInvoice: (inv: Omit<InvoiceInfo, 'id'>) => void;
  updateInvoice: (inv: InvoiceInfo) => void;
  deleteInvoice: (id: string) => void;
  setDefaultInvoice: (id: string) => void;

  // Notifications
  notifications: AppNotification[];
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  unreadCount: number;

  // Order Actions
  cancelOrder: (orderId: string, reason: string) => boolean;
  submitModifyApplication: (orderId: string, reasonCategory: '技术' | '编辑' | '商务' | '其他', desc: string) => void;
  submitSealApplication: (orderId: string, sealType: '公章' | '所章' | '原章' | '业务专用章', reason: string) => void;
  addExpressNumber: (orderId: string, carrier: string, trackingNo: string, isSupplementary?: boolean) => void;
  submitFeedback: (orderId: string, rating: number, tags: string[]) => void;
  createOrderFromCurrentForm: () => Order;

  // UI state
  isDeviceFrame: boolean;
  setIsDeviceFrame: (val: boolean) => void;
  showQuickConsultModal: boolean;
  setShowQuickConsultModal: (val: boolean) => void;
  showFeedbackModal: boolean;
  setShowFeedbackModal: (val: boolean) => void;
  showReportPreviewModal: boolean;
  setShowReportPreviewModal: (val: boolean) => void;
  previewReportOrder: Order | null;
  setPreviewReportOrder: (order: Order | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [historyStack, setHistoryStack] = useState<{ route: PageRoute; params: Record<string, any> }[]>([]);

  const [selectedProject, setSelectedProject] = useState<TestProject | null>(TEST_PROJECTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('env');
  const [currentManager, setCurrentManager] = useState<SalesManager>(MOCK_MANAGERS[0]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>('WT2026170015');
  const [formData, setFormData] = useState<EntrustFormData>(DEFAULT_FORM_DATA);
  const [editingSample, setEditingSample] = useState<SampleItem | null>(null);

  const [invoices, setInvoices] = useState<InvoiceInfo[]>(INITIAL_INVOICES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals & Frame
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(true);
  const [showQuickConsultModal, setShowQuickConsultModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showReportPreviewModal, setShowReportPreviewModal] = useState<boolean>(false);
  const [previewReportOrder, setPreviewReportOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const navigateTo = (route: PageRoute, params: Record<string, any> = {}) => {
    setHistoryStack((prev) => [...prev, { route: currentRoute, params: routeParams }]);
    setCurrentRoute(route);
    setRouteParams(params);

    // Sync tabbar selection if navigating to primary tab roots
    if (route === 'home') setActiveTab('home');
    if (route === 'order_list') setActiveTab('orders');
    if (route === 'messages') setActiveTab('messages');
    if (route === 'profile') setActiveTab('profile');
  };

  const goBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack((s) => s.slice(0, -1));
      setCurrentRoute(prev.route);
      setRouteParams(prev.params);

      if (prev.route === 'home') setActiveTab('home');
      if (prev.route === 'order_list') setActiveTab('orders');
      if (prev.route === 'messages') setActiveTab('messages');
      if (prev.route === 'profile') setActiveTab('profile');
    } else {
      setCurrentRoute('home');
      setActiveTab('home');
    }
  };

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentRoute('home');
    } else if (tab === 'orders') {
      setCurrentRoute('order_list');
    } else if (tab === 'messages') {
      setCurrentRoute('messages');
    } else if (tab === 'profile') {
      setCurrentRoute('profile');
    }
  };

  const updateFormData = (data: Partial<EntrustFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(DEFAULT_FORM_DATA);
  };

  const addInvoice = (inv: Omit<InvoiceInfo, 'id'>) => {
    const newId = `inv_${Date.now()}`;
    const newInv: InvoiceInfo = { ...inv, id: newId };
    if (newInv.isDefault) {
      setInvoices((prev) => prev.map((item) => ({ ...item, isDefault: false })).concat(newInv));
    } else {
      setInvoices((prev) => [...prev, newInv]);
    }
    showToast('开票信息已保存');
  };

  const updateInvoice = (inv: InvoiceInfo) => {
    setInvoices((prev) =>
      prev.map((item) => {
        if (item.id === inv.id) return inv;
        if (inv.isDefault) return { ...item, isDefault: false };
        return item;
      })
    );
    showToast('开票信息更新成功');
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((item) => item.id !== id));
    showToast('已删除开票信息');
  };

  const setDefaultInvoice = (id: string) => {
    setInvoices((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
    showToast('已设为默认开票信息');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('所有消息已标记为已读');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const cancelOrder = (orderId: string, reason: string): boolean => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return false;

    // Rule from document: 取号前可取消，取号后不可取消只能走委托变更
    if (target.isTakenNumber) {
      showToast('当前委托已进入系统取号流程，不可取消，请走变更申请');
      return false;
    }

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: '已取消',
            alertNotice: `⚠️ 客户已取消委托 (原因: ${reason})，已转为销售待办闭环`,
          };
        }
        return o;
      })
    );

    // Push notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: '委托单已成功取消',
      content: `委托单 ${orderId} 已成功申请取消，通知已派发至销售经理【${target.manager.name}】进行待办说明归档。`,
      time: '刚刚',
      isRead: false,
      type: 'order',
      orderId: orderId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('委托已成功取消');
    return true;
  };

  const submitModifyApplication = (
    orderId: string,
    reasonCategory: '技术' | '编辑' | '商务' | '其他',
    desc: string
  ) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const newModifyApp: OrderModifyApplication = {
      id: `MOD_${Date.now()}`,
      orderId,
      track: target.isTakenNumber ? 'B' : 'A',
      reasonCategory,
      description: desc,
      applyTime: new Date().toLocaleString('zh-CN', { hour12: false }),
      statusText: target.isTakenNumber ? '客服发起/待确认' : '销售+客服确认中',
      currentStep: 2,
      steps: target.isTakenNumber
        ? [
            {
              title: '客服在 LIMS 发起变更',
              status: 'completed',
              time: '刚刚',
              remark: '客服工号 KS082 已录入变更单',
            },
            {
              title: '销售确认变更',
              status: 'active',
              operator: target.manager.name,
              remark: '销售经理正在核对工装排期及费用',
            },
            {
              title: '客户签字确认',
              status: 'pending',
              remark: '待销售确认后推送客户电子签名',
            },
            {
              title: '技术组审批',
              status: 'pending',
              remark: '技术主管审批测试变更工装',
            },
            {
              title: '委托变更生效',
              status: 'pending',
              remark: '新标准参数生效',
            },
          ]
        : [
            {
              title: '您提交修改申请',
              status: 'completed',
              time: '刚刚',
              remark: '您的修改申请已提交，等待销售与客服共同确认',
            },
            {
              title: '销售+客服确认',
              status: 'active',
              operator: `${target.manager.name} & 客服专员`,
              remark: `销售 (${target.manager.name}) 与客服正在核对您的变更内容，确认后将由客服发起变更。`,
            },
            {
              title: '技术组审核',
              status: 'pending',
              remark: '技术主管复核测试工装及试验箱负荷',
            },
            {
              title: '客服修改 LIMS 信息',
              status: 'pending',
              remark: '更新任务单与试验规程',
            },
          ],
    };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            alertNotice: target.isTakenNumber
              ? '● 修改申请: 待您签字确认'
              : '● 您的修改申请: 销售与客服确认中',
            modifyApp: newModifyApp,
          };
        }
        return o;
      })
    );

    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: '修改申请已提交',
      content: `委托单 ${orderId} 的修改申请已成功提交，相关销售及客服人员正在协同受理中。`,
      time: '刚刚',
      isRead: false,
      type: 'modify',
      orderId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('修改申请已成功提交');
  };

  const submitSealApplication = (
    orderId: string,
    sealType: '公章' | '所章' | '原章' | '业务专用章',
    reason: string
  ) => {
    const newSeal: SealApplication = {
      id: `SEAL_${Date.now()}`,
      sealType,
      reason,
      status: '待销售审批',
      history: [
        {
          title: '客户发起盖章申请',
          time: '刚刚',
          desc: `申请加盖【${sealType}】，原因：${reason}`,
          done: true,
        },
        {
          title: '销售审批 (蓝信工作台)',
          time: '处理中',
          desc: '销售经理正在核对合同条款及盖章类型',
          done: false,
        },
        {
          title: '客服确认并审批 (所综合平台)',
          time: '等待中',
          desc: '综合保障部印章管理专员审核',
          done: false,
        },
        {
          title: '加盖印章完成并归档',
          time: '等待中',
          desc: '三方可在线下载加盖电子章文件',
          done: false,
        },
      ],
    };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            sealApp: newSeal,
          };
        }
        return o;
      })
    );

    showToast(`加盖【${sealType}】申请已发起`);
  };

  const addExpressNumber = (
    orderId: string,
    carrier: string,
    trackingNo: string,
    isSupplementary: boolean = false
  ) => {
    const newTraceItem = {
      id: `tr_${Date.now()}`,
      carrier,
      trackingNo,
      direction: 'client_to_lab' as const,
      type: isSupplementary ? ('supplementary' as const) : ('initial' as const),
      status: 'shipping' as const,
      createdAt: new Date().toLocaleString('zh-CN'),
      traces: [
        { time: '刚刚', desc: `【已下单】${carrier} 已揽收样品，正在运往中国赛宝实验室` },
      ],
    };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            expressNumbers: [...o.expressNumbers, trackingNo],
            expressTraces: [newTraceItem, ...o.expressTraces],
          };
        }
        return o;
      })
    );

    showToast(isSupplementary ? '补寄样品快递单号已提交' : '快递单号补充成功');
  };

  const submitFeedback = (orderId: string, rating: number, tags: string[]) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            feedbackRating: rating,
            feedbackTags: tags,
          };
        }
        return o;
      })
    );
    showToast('感谢您的实测反馈！');
  };

  const createOrderFromCurrentForm = (): Order => {
    const newId = `WT20261700${Math.floor(10 + Math.random() * 90)}`;
    const mainSample = formData.samples[0] || {
      id: 's_new',
      name: '送检样品',
      businessType: '常规试验',
      model: 'STD-01',
      quantity: 1,
      unit: '件',
      producer: formData.clientCompany,
      testProject: selectedProject?.name || '综合测试',
      tags: [],
    };

    const newOrder: Order = {
      id: newId,
      type: 'online',
      status: '待销售确认',
      statusStep: 1,
      title: `${selectedProject?.name || '试验项目'} · ${mainSample.name} ×${mainSample.quantity}`,
      sampleSummary: `${mainSample.name} ×${mainSample.quantity}`,
      sampleCount: formData.samples.reduce((acc, curr) => acc + (curr.quantity || 1), 0),
      submitTime: new Date().toLocaleString('zh-CN', { hour12: false }),
      estimatedFinishTime: '7~10个工作日后',
      clientCompany: formData.clientCompany,
      clientContact: formData.clientContact,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      clientAddress: formData.clientAddress,
      manager: currentManager,
      samples: formData.samples,
      receiveMode: formData.receiveMode,
      processMode: formData.processMode,
      returnAddress: formData.returnAddress,
      safetyInfo: formData.safetyInfo,
      expressNumbers: formData.expressNumbers,
      expressTraces: formData.expressNumbers.map((no) => ({
        id: `tr_${Date.now()}`,
        carrier: '顺丰速运',
        trackingNo: no,
        direction: 'client_to_lab',
        type: 'initial',
        status: 'shipping',
        createdAt: '刚刚',
        traces: [{ time: '刚刚', desc: '【广州市】顺丰速运 已收取快件，运输中' }],
      })),
      reportVersion: formData.reportVersion,
      reportRequirement: formData.reportRequirement,
      deliveryMode: formData.deliveryMode,
      reportEmail: formData.reportEmail,
      reportUsage: formData.reportUsage,
      paymentMode: formData.paymentMode,
      payCompany: formData.payCompany,
      signatureDataUrl: formData.signatureDataUrl,
      signTime: new Date().toLocaleString('zh-CN'),
      isTakenNumber: false,
      canDownloadReport: false,
      invoiceId: invoices[0]?.id,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Push notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: '委托单已提交成功',
      content: `委托单 ${newId} 已正式提交！专属销售【${currentManager.name}】将在1个工作日内核对确认。`,
      time: '刚刚',
      isRead: false,
      type: 'order',
      orderId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        activeTab,
        historyStack,
        navigateTo,
        goBack,
        switchTab,
        selectedProject,
        setSelectedProject,
        selectedCategory,
        setSelectedCategory,
        currentManager,
        setCurrentManager,
        orders,
        currentOrderId,
        setCurrentOrderId,
        formData,
        updateFormData,
        resetFormData,
        editingSample,
        setEditingSample,
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        setDefaultInvoice,
        notifications,
        markAllNotificationsRead,
        markNotificationRead,
        unreadCount,
        cancelOrder,
        submitModifyApplication,
        submitSealApplication,
        addExpressNumber,
        submitFeedback,
        createOrderFromCurrentForm,
        isDeviceFrame,
        setIsDeviceFrame,
        showQuickConsultModal,
        setShowQuickConsultModal,
        showFeedbackModal,
        setShowFeedbackModal,
        showReportPreviewModal,
        setShowReportPreviewModal,
        previewReportOrder,
        setPreviewReportOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
