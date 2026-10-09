export type TabType = 'home' | 'orders' | 'messages' | 'profile';

export type PageRoute = 
  | 'home'
  | 'search_results'
  | 'category_list'
  | 'project_detail'
  | 'manager_match'
  | 'new_consultation'
  | 'consultation_success'
  | 'entrust_notice'
  | 'entrust_step1'
  | 'entrust_step2'
  | 'entrust_step2_detail'
  | 'entrust_step3'
  | 'entrust_step4'
  | 'order_check'
  | 'digital_sign'
  | 'order_success'
  | 'order_list'
  | 'order_detail'
  | 'modify_apply'
  | 'modify_progress'
  | 'long_term'
  | 'invoice_library'
  | 'invoice_edit'
  | 'messages'
  | 'profile';

export interface TestProject {
  id: string;
  name: string;
  category: string;
  standard: string;
  standardName: string;
  priceRange: string;
  basePrice: number;
  periodNormal: string;
  periodUrgent: string;
  scope: string;
  icon: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  count: number;
}

export interface SalesManager {
  id: string;
  name: string;
  phone: string;
  region: string;
  avatar?: string;
  isReassigned?: boolean;
  oldManagerName?: string;
  oldManagerPhone?: string;
}

export interface SampleItem {
  id: string;
  name: string;
  businessType: string; // e.g. 'DPA业务' | '分析业务' | '民口 GCH' | '质量与可靠性' etc.
  model: string;
  quantity: number;
  unit: string;
  producer: string;
  batchNo?: string;
  produceDate?: string;
  testProject: string;
  tags: string[];
  // Dynamic fields
  dynamicFields?: Record<string, any>;
}

export interface InvoiceInfo {
  id: string;
  title: string;
  taxNumber: string;
  email: string;
  bankName?: string;
  bankAccount?: string;
  addressPhone?: string;
  isDefault: boolean;
  type: 'enterprise' | 'personal';
}

export interface ExpressTrace {
  id: string;
  carrier: string;
  trackingNo: string;
  direction: 'client_to_lab' | 'lab_to_client';
  type: 'initial' | 'supplementary'; // 是否为补寄
  status: 'pending' | 'shipping' | 'signed';
  createdAt: string;
  traces: { time: string; desc: string }[];
}

export interface SealApplication {
  id: string;
  sealType: '公章' | '所章' | '原章' | '业务专用章';
  reason: string;
  status: '待销售审批' | '待客服确认' | '盖章中' | '已完成';
  history: { title: string; time: string; desc: string; done: boolean }[];
}

export interface OrderModifyApplication {
  id: string;
  orderId: string;
  track: 'A' | 'B'; // A轨 (未下到中心: 客户提出) / B轨 (已下到中心: 客服发起)
  reasonCategory: '技术' | '编辑' | '商务' | '其他';
  description: string;
  applyTime: string;
  statusText: string;
  currentStep: number;
  steps: {
    title: string;
    status: 'completed' | 'active' | 'pending';
    time?: string;
    operator?: string;
    remark?: string;
  }[];
}

export type OrderStatus =
  | '待销售确认'
  | '客服审核中'
  | '技术组复核'
  | '已下单'
  | '已分配工程师'
  | '检测中'
  | '报告编制'
  | '报告审核'
  | '报告出具'
  | '商务闭环'
  | '内部补下委托'
  | '已取消'
  | '已撤销';

export interface Order {
  id: string; // e.g. WT2026170015
  type: 'online' | 'internal_supplement'; // 普通线上委托 / 内部补下委托
  status: OrderStatus;
  statusStep: number; // 1 to 10
  title: string;
  sampleSummary: string;
  sampleCount: number;
  submitTime: string;
  estimatedFinishTime?: string;
  clientCompany: string;
  clientContact: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  manager: SalesManager;
  samples: SampleItem[];
  // Step 3
  receiveMode: '邮寄' | '自送' | '抽样(收费)';
  processMode: '自取' | '代邮' | '实验方保存一个月' | '其它';
  returnAddress?: string;
  safetyInfo: string[];
  expressNumbers: string[];
  expressTraces: ExpressTrace[];
  // Step 4
  reportVersion: {
    chinese: boolean;
    english: boolean;
    englishApplicant?: string;
    englishAddress?: string;
    noReportDataOnly: boolean;
  };
  reportRequirement: '无特殊要求' | '按样品分开出' | '按检测项目分开出';
  deliveryMode: '电子报告' | '纸质邮寄' | '纸质自取';
  reportEmail: string;
  reportUsage: string;
  paymentMode: string;
  payCompany: string;
  // Signature
  signatureDataUrl?: string;
  signTime?: string;
  // Notice & Flags
  alertNotice?: string;
  isTakenNumber: boolean; // 是否已取号/下到中心 (若是则不可直接修改或取消)
  canDownloadReport: boolean;
  modifyApp?: OrderModifyApplication;
  sealApp?: SealApplication;
  feedbackRating?: number;
  feedbackTags?: string[];
  invoiceId?: string;
  contractArchived?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'modify' | 'system' | 'express';
  orderId?: string;
}
