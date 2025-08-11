'use client';
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin, Home, Github, X } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [showWechatQR, setShowWechatQR] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 flex flex-col justify-between transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回主页按钮 */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center border border-blue-100 dark:border-gray-600">
            <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center pt-8">联系我们</h1>

        {/* 联系信息 - 直排布局 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">联系方式</h2>

          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col items-center text-center flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">电话</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm break-all">+86 173 9171 ****</p>
            </div>

            <div className="flex flex-col items-center text-center flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">邮箱</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm break-all">blacklaw@foxmail.com</p>
            </div>

            <div className="flex flex-col items-center text-center flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">地址</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm break-all">甘肃省庆阳市西峰区</p>
            </div>
          </div>

          {/* 社交链接 */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">关注我们</h3>
            <div className="flex justify-center space-x-8">
              {/* 微信 */}
              <button 
                onClick={() => setShowWechatQR(true)}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="微信"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.991-5.748-6.364a9.111 9.111 0 0 0-3.615-.272zm11.26 5.551c-3.148 0-5.688 2.143-5.688 4.787 0 1.642 1.034 3.117 2.64 4.089.067.04.118.109.118.184 0 .033-.01.065-.027.093l-.29 1.12a.244.244 0 0 0-.007.056c0 .12.098.218.218.218a.25.25 0 0 0 .125-.034l1.423-.827a.657.657 0 0 1 .544-.074c.685.195 1.408.295 2.144.295 3.148 0 5.688-2.143 5.688-4.787-.001-2.644-2.541-4.787-5.69-4.787z"/>
                </svg>
              </button>
              
              {/* GitHub */}
              <a 
                href="https://github.com/qishiyou/Video-quote" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="GitHub"
              >
                <Github className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 微信二维码弹窗 */}
      {showWechatQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 relative transition-colors duration-300">
            <button
              onClick={() => setShowWechatQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              aria-label="关闭"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">微信联系我们</h3>
              
              {/* 微信二维码 */}
              <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/images/wechat-qr.png" 
                  alt="微信二维码" 
                  className="w-full h-full object-contain rounded-lg shadow-sm"
                />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300">扫描二维码添加微信好友</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">微信号：blacklaw2024</p>
            </div>
          </div>
        </div>
      )}

      {/* 页脚 - 使用共用组件 */}
      <Footer />
    </div>
  );
}