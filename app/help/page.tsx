'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, CheckCircle, MessageCircle, Home, ArrowUp, MapPin, Video, Calendar, Settings, FileText, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';


export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 监听滚动事件，显示/隐藏回到顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      question: '如何使用报价系统？',
      answer: '1. 在项目配置中选择您的视频制作需求，包括地区、视频类型、拍摄天数等。\n2. 完成所有配置后，点击"立即报价"按钮。\n3. 系统将自动计算报价，并在右侧显示结果。\n4. 您可以点击"生成PDF"按钮，下载正式的报价单。'
    },
    {
      question: '报价结果包括哪些内容？',
      answer: '报价结果包括基础费用、创意费用、拍摄费用、后期制作费用、税费等详细明细，以及最终的总价。'
    },
    {
      question: '如何修改我的项目配置？',
      answer: '您可以随时在左侧的项目配置表单中修改任何选项，修改后再次点击"立即报价"按钮即可更新报价结果。'
    },
    {
      question: '报价单的有效期是多久？',
      answer: '生成的报价单有效期为30天，过期后可能需要重新计算报价。'
    },
    {
      question: '如何联系客服获取更多帮助？',
      answer: '您可以通过页面顶部的"联系我们"按钮，或直接拨打客服电话17391773533获取帮助。'
    }
  ];

  // 使用指南步骤及对应的图标
  const guideSteps = [
    { text: '选择您所在的地区和需要制作的视频类型。', icon: <MapPin className="h-5 w-5" /> },
    { text: '设置拍摄天数、影片时长等基本参数。', icon: <Calendar className="h-5 w-5" /> },
    { text: '选择创意策划、摄制团队、拍摄设备等制作规格。', icon: <Settings className="h-5 w-5" /> },
    { text: '填写公司信息，方便生成正式报价单。', icon: <FileText className="h-5 w-5" /> },
    { text: '点击"立即报价"按钮，查看详细报价结果。', icon: <DollarSign className="h-5 w-5" /> },
    { text: '满意后，点击"生成PDF"按钮，下载正式报价单。', icon: <CheckCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 flex flex-col font-sans transition-colors duration-300">
      {/* 返回主页按钮 */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center border border-blue-100 dark:border-gray-600">
          <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-10 transform -translate-y-1/2"></div>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-gray-900 dark:text-white mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
            使用帮助
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto relative z-10 leading-relaxed">
            以下是使用视频制作报价系统的常见问题和解答，帮助您快速上手我们的服务
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full relative z-10"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 使用指南卡片 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-10 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center text-blue-700 dark:text-blue-400">
              <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              使用指南
            </h2>
            <ol className="space-y-6">
              {guideSteps.map((step, index) => (
                <li key={index} className="flex items-start group">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* 常见问题卡片 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center text-blue-700 dark:text-blue-400">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              常见问题
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <button
                    className="flex justify-between items-center w-full text-left py-2 focus:outline-none group"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform duration-300" />
                    )}
                  </button>
                  <div
                    className={`mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-line overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 - 使用共用组件 */}
      <Footer />


      {/* 回到顶部按钮 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 hover:scale-110 transition-all duration-300 z-20"
          aria-label="回到顶部"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}