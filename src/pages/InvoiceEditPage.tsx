import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { InvoiceInfo } from '../types';

export const InvoiceEditPage: React.FC = () => {
  const {
    routeParams,
    invoices,
    addInvoice,
    updateInvoice,
    goBack,
    showToast,
  } = useApp();

  const invoiceId = routeParams.invoiceId;
  const existingInvoice = invoices.find((i) => i.id === invoiceId);

  const [title, setTitle] = useState(existingInvoice?.title || '');
  const [taxNumber, setTaxNumber] = useState(existingInvoice?.taxNumber || '');
  const [email, setEmail] = useState(existingInvoice?.email || '');
  const [bankName, setBankName] = useState(existingInvoice?.bankName || '');
  const [bankAccount, setBankAccount] = useState(existingInvoice?.bankAccount || '');
  const [addressPhone, setAddressPhone] = useState(existingInvoice?.addressPhone || '');
  const [isDefault, setIsDefault] = useState(existingInvoice?.isDefault || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !taxNumber.trim() || !email.trim()) {
      showToast('请完整填写必填的开票抬头、税号及接收邮箱');
      return;
    }

    if (existingInvoice) {
      updateInvoice({
        ...existingInvoice,
        title: title.trim(),
        taxNumber: taxNumber.trim(),
        email: email.trim(),
        bankName: bankName.trim(),
        bankAccount: bankAccount.trim(),
        addressPhone: addressPhone.trim(),
        isDefault,
      });
    } else {
      addInvoice({
        title: title.trim(),
        taxNumber: taxNumber.trim(),
        email: email.trim(),
        bankName: bankName.trim(),
        bankAccount: bankAccount.trim(),
        addressPhone: addressPhone.trim(),
        isDefault,
        type: 'enterprise',
      });
    }

    goBack();
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader
        title={existingInvoice ? '编辑开票信息' : '新增开票信息'}
        showBack={true}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Form matching Fig 24 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5 text-xs">
          {/* Title */}
          <div>
            <label className="block text-slate-800 font-semibold mb-1">
              开票抬头 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入开票抬头"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-xs"
              required
            />
          </div>

          {/* Tax Number */}
          <div>
            <label className="block text-slate-800 font-semibold mb-1">
              税号 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              placeholder="请输入纳税人识别号"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-xs font-mono"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-800 font-semibold mb-1">
              开票邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入接收电子发票的邮箱"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-xs"
              required
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block text-slate-800 font-semibold mb-1">
              开户行 <span className="text-slate-400 font-normal">(选填)</span>
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="请输入开户行 (选填)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-slate-800 font-semibold mb-1">
              账号 <span className="text-slate-400 font-normal">(选填)</span>
            </label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              placeholder="请输入银行账号 (选填)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-xs font-mono"
            />
          </div>

          {/* Address & Phone */}
          <div>
            <label className="block text-slate-800 font-semibold mb-1">
              地址电话 <span className="text-slate-400 font-normal">(选填)</span>
            </label>
            <input
              type="text"
              value={addressPhone}
              onChange={(e) => setAddressPhone(e.target.value)}
              placeholder="请输入地址、电话 (选填)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          {/* Checkbox Default matching Fig 24 */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-medium">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300"
              />
              <span>设为默认开票信息</span>
            </label>
          </div>

          {/* Save Button matching Fig 24 */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>保存开票信息</span>
            </button>
          </div>
        </form>
      </div>

      <WeChatTabBar />
    </div>
  );
};
