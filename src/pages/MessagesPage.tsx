import React from 'react';
import { Bell, CheckCheck, ChevronRight, FileText, Truck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeChatMiniHeader } from '../components/WeChatMiniHeader';
import { WeChatTabBar } from '../components/WeChatTabBar';
import { AppNotification } from '../types';

export const MessagesPage: React.FC = () => {
  const {
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    navigateTo,
    setCurrentOrderId,
  } = useApp();

  const handleNotificationClick = (n: AppNotification) => {
    markNotificationRead(n.id);
    if (n.orderId) {
      setCurrentOrderId(n.orderId);
      navigateTo('order_detail', { orderId: n.orderId });
    }
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'modify':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'express':
        return <Truck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header matching Fig 33 */}
      <WeChatMiniHeader
        title="消息通知"
        showBack={false}
        rightActionText="全部已读"
        onRightAction={markAllNotificationsRead}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24">
        <div className="text-[11px] text-slate-400 px-1 font-medium flex items-center justify-between">
          <span>系统消息与业务动态</span>
          <span>支持全部已读操作</span>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative shadow-xs ${
                notif.isRead
                  ? 'bg-white border-slate-100 text-slate-600'
                  : 'bg-white border-blue-200 text-slate-900 ring-1 ring-blue-100'
              }`}
            >
              {!notif.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500" />
              )}

              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                  {getIcon(notif.type)}
                </div>
                <div className="font-bold text-xs pr-4">{notif.title}</div>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-600 mt-1">
                {notif.content}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-50">
                <span>{notif.time}</span>
                {notif.orderId && (
                  <span className="text-blue-600 font-medium flex items-center gap-0.5">
                    查看委托 {notif.orderId} <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
              <p>暂无消息通知</p>
            </div>
          )}
        </div>
      </div>

      <WeChatTabBar />
    </div>
  );
};
