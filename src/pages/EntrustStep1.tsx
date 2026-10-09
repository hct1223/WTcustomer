import React, { useState } from 'react';
import { Search, FileText, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

export const EntrustStep1: React.FC = () => {
  const { formData, updateFormData, navigateTo, showToast } = useApp();

  const [showCommonDrawer, setShowCommonDrawer] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Common contacts preset for user isolation demonstration
  const commonEntities = [
    {
      company: 'XX科技有限公司',
      address: '广东省广州市天河区五山路赛宝科技园C座401',
      contact: '张三',
      phone: '138****8888',
      email: 'zhangsan@xx-company.com',
      zip: '510610',
    },
    {
      company: 'XX科技有限公司广州分公司',
      address: '广州市天河区科韵路信息港B栋12层',
      contact: '李四',
      phone: '139****7788',
      email: 'lisi@xx-company.com',
      zip: '510665',
    },
  ];

  const handleTianyanchaVerify = () => {
    if (!formData.clientCompany) {
      showToast('请先输入单位名称');
      return;
    }
    if (formData.tianyanchaRemain <= 0) {
      showToast('今日天眼查免费核验次数已用完');
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      updateFormData({
        isTianyanchaVerified: true,
        tianyanchaRemain: Math.max(0, formData.tianyanchaRemain - 1),
      });
      showToast('天眼查工商官方核验通过：统一社会信用代码已匹配！');
    }, 600);
  };

  const handleSelectCommon = (item: typeof commonEntities[0]) => {
    updateFormData({
      clientCompany: item.company,
      clientAddress: item.address,
      clientContact: item.contact,
      clientPhone: item.phone,
      clientEmail: item.email,
      clientZip: item.zip,
      isTianyanchaVerified: true,
    });
    setShowCommonDrawer(false);
    showToast('已一键填入常用委托方信息');
  };

  const handleNext = () => {
    if (!formData.clientCompany || !formData.clientAddress || !formData.clientContact || !formData.clientPhone || !formData.clientEmail) {
      showToast('请完整填写必填的委托方信息');
      return;
    }
    navigateTo('entrust_step2');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader
        title="步骤 1/4 - 委托方信息"
        showBack={true}
        rightActionText="保存草稿"
        onRightAction={() => showToast('草稿已自动保存至本地缓存')}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Step Indicator Header matching Fig 13 */}
        <div className="text-center pt-1">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="w-6 h-1.5 rounded-full bg-blue-600" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
            <span className="w-3 h-1.5 rounded-full bg-slate-200" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">步骤 1/4 - 委托方信息</h2>
        </div>

        {/* Common info banner matching Fig 13 */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">常用信息</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                💡 点击可选择已保存的常用委托方信息
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCommonDrawer(true)}
            className="text-xs text-blue-600 font-semibold hover:text-blue-700 shrink-0 ml-2"
          >
            [查看全部]
          </button>
        </div>

        {/* Step 1 Form Fields matching Fig 13 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              委托单位名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientCompany}
              onChange={(e) => updateFormData({ clientCompany: e.target.value, isTianyanchaVerified: false })}
              placeholder="如：XX科技有限公司"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />

            {/* Tianyancha verification button matching Fig 13 */}
            <div className="flex items-center justify-between mt-2 pt-0.5">
              <button
                type="button"
                onClick={handleTianyanchaVerify}
                disabled={verifying}
                className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium rounded-lg flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{verifying ? '正在校验...' : '天眼查核对官方名称'}</span>
              </button>
              <div className="text-[11px] text-slate-400">
                剩余 <span className="text-blue-600 font-bold">{formData.tianyanchaRemain}</span> 次
              </div>
            </div>

            {formData.isTianyanchaVerified && (
              <div className="mt-1.5 text-[11px] text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>已通过官方工商信息核验</span>
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              委托单位地址 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientAddress}
              onChange={(e) => updateFormData({ clientAddress: e.target.value })}
              placeholder="如：广东省广州市天河区"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              委托方联系人 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientContact}
              onChange={(e) => updateFormData({ clientContact: e.target.value })}
              placeholder="如：张三"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              联系电话/手机 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => updateFormData({ clientPhone: e.target.value })}
              placeholder="如：138****8888"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Fax */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              传真 <span className="text-slate-400 font-normal">(选填)</span>
            </label>
            <input
              type="text"
              value={formData.clientFax}
              onChange={(e) => updateFormData({ clientFax: e.target.value })}
              placeholder="选填"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              电子邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => updateFormData({ clientEmail: e.target.value })}
              placeholder="用于接收试验进度及电子报告"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Zip code */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              邮编 <span className="text-slate-400 font-normal">(选填)</span>
            </label>
            <input
              type="text"
              value={formData.clientZip}
              onChange={(e) => updateFormData({ clientZip: e.target.value })}
              placeholder="如：510610"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Next Button */}
          <div className="pt-3">
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <span>下一页 → (样品信息)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Common Entities Drawer */}
      {showCommonDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-4 space-y-3 animate-in slide-in-from-bottom duration-200 max-h-[80vh] overflow-y-auto">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">常用委托方信息库</span>
              <button
                onClick={() => setShowCommonDrawer(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                关闭
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              权限隔离：常用信息按当前用户隔离，仅自己可见与修改。
            </p>

            <div className="space-y-2.5">
              {commonEntities.map((ent, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectCommon(ent)}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/80 cursor-pointer text-xs space-y-1 transition-colors"
                >
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{ent.company}</span>
                    <span className="text-[11px] text-blue-600 font-semibold">[调用]</span>
                  </div>
                  <div className="text-slate-600">{ent.address}</div>
                  <div className="text-slate-500 text-[11px]">
                    联系人: {ent.contact} ({ent.phone}) · {ent.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <WeChatTabBar />
    </div>
  );
};
