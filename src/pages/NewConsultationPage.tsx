import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';

const PROVINCES = [
  '广东省', '北京市', '上海市', '江苏省', '浙江省', '山东省',
  '湖北省', '湖南省', '四川省', '陕西省', '安徽省', '福建省',
  '河南省', '河北省', '辽宁省', '重慶市', '天津市', '江西省'
];

export const NewConsultationPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [province, setProvince] = useState('广东省');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !name.trim() || !phone.trim() || !content.trim()) {
      showToast('请完整填写标 * 的各项信息');
      return;
    }

    // Navigates to consultation success page (Fig 11)
    navigateTo('consultation_success');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <WeChatMiniHeader title="新咨询信息登记" showBack={true} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Intro text matching Fig 10 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100">
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            您好！检测到您可能是新客户，请填写以下信息，我们会为您分配专属对接经理。
          </p>
        </div>

        {/* Form matching Fig 10 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              单位名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="请填写单位官方规范全称，不规范将影响报告正常出具"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Province */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              单位所在省份 <span className="text-red-500">*</span>
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 text-slate-800"
            >
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Contact Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              您的姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入您的姓名"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              联系电话 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入您的联系电话"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Consultation Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              咨询内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请描述您的检测需求、报价疑问等咨询内容"
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit button matching Fig 10 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
            >
              提交申请，等待分配经理
            </button>
          </div>
        </form>
      </div>

      <WeChatTabBar />
    </div>
  );
};
