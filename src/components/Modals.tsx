import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Building2,
  FileText,
  Star,
  Send,
  Download,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200">
      <div className="bg-slate-900/90 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5 animate-bounce">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

export const QuickConsultModal: React.FC = () => {
  const {
    showQuickConsultModal,
    setShowQuickConsultModal,
    showToast,
    navigateTo,
  } = useApp();
  const [phone, setPhone] = useState('13800138888');
  const [content, setContent] = useState('');

  if (!showQuickConsultModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowQuickConsultModal(false);
    showToast('咨询已提交，业务专员将在30分钟内致电！');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-in fade-in zoom-in duration-150">
        <div className="bg-blue-600 px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            <h3 className="font-semibold text-sm">快速咨询 · 赛宝实验室</h3>
          </div>
          <button
            onClick={() => setShowQuickConsultModal(false)}
            className="text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <p className="text-xs text-slate-500">
            有任何委托疑问、项目标准或排期需求，可快速留言，专属销售经理将一对一服务。
          </p>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">您的联系电话</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="请输入手机号"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">咨询需求</label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="例如：需要做高温72小时测试，是否有排期？大概费用多少？"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowQuickConsultModal(false);
                navigateTo('new_consultation');
              }}
              className="flex-1 text-xs py-2 border border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
            >
              填写详细咨询单
            </button>
            <button
              type="submit"
              className="flex-1 text-xs py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
            >
              立即提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const FeedbackModal: React.FC = () => {
  const { showFeedbackModal, setShowFeedbackModal, showToast } = useApp();
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['委托书填写顺畅']);
  const [comment, setComment] = useState('');

  if (!showFeedbackModal) return null;

  const availableTags = [
    '委托书填写',
    '经理匹配',
    '名称校验',
    '进度与催办',
    '报告交付',
    '开票财务',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    setShowFeedbackModal(false);
    showToast('感谢您对云上赛宝试运行版本的宝贵建议！');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-in fade-in zoom-in duration-150">
        <div className="bg-purple-600 px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-white" />
            <h3 className="font-semibold text-sm">试运行反馈 · 客户实测体验</h3>
          </div>
          <button
            onClick={() => setShowFeedbackModal(false)}
            className="text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-xs text-slate-600 text-center">
            为持续优化赛宝委托下单链路，诚邀您评价体验（对应文档图 20 反馈模块）：
          </p>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">体验环节标记</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                      isSelected
                        ? 'bg-purple-50 border-purple-400 text-purple-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="请输入您的其他具体意见或操作痛点..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="flex-1 text-xs py-2 border border-slate-200 text-slate-600 rounded-lg font-medium"
            >
              稍后再评
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 text-xs py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-sm"
            >
              提交反馈
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportPreviewModal: React.FC = () => {
  const {
    showReportPreviewModal,
    setShowReportPreviewModal,
    previewReportOrder,
    showToast,
  } = useApp();

  if (!showReportPreviewModal || !previewReportOrder) return null;

  const handleDownload = () => {
    showToast(`正在导出 ${previewReportOrder.id} 官方电子防伪报告 PDF...`);
    setTimeout(() => {
      showToast('报告下载已就绪');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="font-semibold text-xs leading-none">中国赛宝实验室 · 检测报告</h3>
              <p className="text-[10px] text-slate-300 mt-0.5">单号: {previewReportOrder.id}</p>
            </div>
          </div>
          <button
            onClick={() => setShowReportPreviewModal(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Simulation */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 text-slate-800 text-xs space-y-4">
          <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-lg relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] rotate-[-25deg]">
              <span className="text-4xl font-extrabold tracking-widest text-slate-900 uppercase">
                CEPREI OFFICIAL REPORT
              </span>
            </div>

            {/* Document Header */}
            <div className="text-center border-b pb-3 border-slate-200 mb-3">
              <div className="flex justify-center mb-1">
                <Award className="w-8 h-8 text-blue-700" />
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-wider">工 业 和 信 息 化 部 电 子 第 五 研 究 所</h2>
              <h3 className="text-xs font-semibold text-blue-800">中 国 赛 宝 实 验 室 · 检 验 检 测 报 告</h3>
              <p className="text-[10px] text-slate-400 mt-1">报告编号: CEPREI-TR-2026-904128</p>
            </div>

            {/* Meta Table */}
            <table className="w-full text-[11px] border-collapse mb-4">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 text-slate-500 w-24">委托单位:</td>
                  <td className="py-1.5 font-medium">{previewReportOrder.clientCompany}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 text-slate-500">样品名称:</td>
                  <td className="py-1.5 font-medium">{previewReportOrder.sampleSummary}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 text-slate-500">检测标准:</td>
                  <td className="py-1.5 font-medium">GB/T 2423.2-2008 / GJB 548B</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 text-slate-500">检验结论:</td>
                  <td className="py-1.5 font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 符合检验规范要求 (合格)
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Red Stamp Seal simulation */}
            <div className="flex justify-end pt-4">
              <div className="relative border-2 border-red-600 text-red-600 rounded-full w-24 h-24 flex flex-col items-center justify-center p-1 text-center rotate-[-12deg] opacity-85 shadow-xs select-none">
                <span className="text-[8px] font-bold">★ 工信部电子第五研究所 ★</span>
                <span className="text-[10px] font-extrabold my-0.5">检验检测专用章</span>
                <span className="text-[7px]">2026-06-20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>已通过国家级防伪电子验真</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            下载电子报告 (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
