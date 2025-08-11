'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QuoteFormData, QuoteResult } from '../lib/types';
import { calculateQuote } from '../lib/pricing';
import { generateHTMLQuote, pdfStyles } from '../lib/pdfGenerator';
import { Download, Calculator, Building2, Palette, Receipt, Phone, HelpCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    region: '北京',
    videoType: '宣传片',
    shootingDays: 1,
    duration: '1-3分钟',
    creativeLevel: '自备文案',
    teamLevel: '专业级团队',
    equipmentLevel: '专业级2k',
    scene: '自有场地',
    actors: '自备演员',
    audioLevel: '专业配音+无版权',
    editingLevel: '基础剪辑+特效',
    // 公司信息
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    companyAddress: '',
    // PDF样式
    pdfStyle: 'business',
    // 税费设置
    taxRate: 6,
  });

  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const handleInputChange = (field: keyof QuoteFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculateQuote = () => {
    const result = calculateQuote(formData);
    setQuoteResult(result);
    setShowQuote(true);
  };

  const handleGeneratePDF = async () => {
    if (quoteResult) {
      await generateHTMLQuote(formData, quoteResult);
    }
  };

  // 所有中国地区
  const regions = [
    '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '苏州',
    '天津', '重庆', '长沙', '青岛', '宁波', '无锡', '佛山', '东莞', '郑州', '昆明',
    '大连', '福州', '厦门', '哈尔滨', '济南', '温州', '长春', '石家庄', '南宁', '常州',
    '南昌', '贵阳', '太原', '烟台', '嘉兴', '惠州', '珠海', '中山', '保定', '台州',
    '金华', '徐州', '泉州', '临沂', '洛阳', '镇江', '廊坊', '泰州', '湖州', '盐城',
    '济宁', '江门', '淮安', '宿迁', '湛江', '茂名', '肇庆', '清远', '韶关', '梅州',
    '汕尾', '河源', '阳江', '潮州', '揭阳', '云浮', '沈阳', '呼和浩特', '银川', '西宁',
    '乌鲁木齐', '拉萨', '海口', '三亚', '香港', '澳门', '台北', '高雄', '台中', '台南'
  ];
  
  const videoTypes = ['宣传片', '广告片', '微电影', '短剧', '二维动画', '三维动画'];
  const shootingDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const durations = ['<1分钟', '1-3分钟', '3-5分钟', '5-10分钟', '>10分钟'];
  const creativeLevels = ['自备文案', '专业级', '广告级'];
  const teamLevels = ['专业级团队', '广告级团队', '电影级团队'];
  const equipmentLevels = ['专业级2k', '广告级4k', '电影级6k'];
  const scenes = ['自有场地', '租赁', '搭景'];
  const actors = ['自备演员', '普通演员', '专业演员', '外籍演员'];
  const audioLevels = ['专业配音+无版权', '高级配音+授权音乐', '音效配音+原创音乐'];
  const editingLevels = ['基础剪辑+特效', '专业剪辑+AE特效', '高级剪辑+三维特效'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-12 w-32 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
            Video quote
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/help" className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-md shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <HelpCircle className="h-5 w-5 mr-2" />
              <span>使用帮助</span>
            </Link>
            <Link href="/contact" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              <span>联系我们</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-full max-w-lg flex justify-center mb-4">
            <div className="absolute inset-0 rounded-lg blur-md opacity-70"></div>
            <div className="relative z-10 px-8 py-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-center">视频制作报价单系统</h1>
            </div>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light text-center mt-2">专业的视频制作报价单生成系统，为您提供透明、精准的视频制作成本评估</p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 表单部分 */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">项目配置</h2>
            
            <div className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">基本信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">地区选择</label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">视频类型</label>
                    <select
                      value={formData.videoType}
                      onChange={(e) => handleInputChange('videoType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {videoTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 拍摄配置 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">拍摄配置</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">拍摄天数</label>
                    <select
                      value={formData.shootingDays}
                      onChange={(e) => handleInputChange('shootingDays', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {shootingDays.map(days => (
                        <option key={days} value={days}>{days}天</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">影片时长</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {durations.map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 制作规格 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">制作规格</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">创意策划</label>
                    <select
                      value={formData.creativeLevel}
                      onChange={(e) => handleInputChange('creativeLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {creativeLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">摄制团队</label>
                    <select
                      value={formData.teamLevel}
                      onChange={(e) => handleInputChange('teamLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {teamLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">拍摄设备</label>
                    <select
                      value={formData.equipmentLevel}
                      onChange={(e) => handleInputChange('equipmentLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {equipmentLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">场景</label>
                    <select
                      value={formData.scene}
                      onChange={(e) => handleInputChange('scene', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {scenes.map(scene => (
                        <option key={scene} value={scene}>{scene}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 人员配置 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">人员配置</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">演员</label>
                  <select
                    value={formData.actors}
                    onChange={(e) => handleInputChange('actors', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                  >
                    {actors.map(actor => (
                      <option key={actor} value={actor}>{actor}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 后期制作 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">后期制作</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">配音/配乐</label>
                    <select
                      value={formData.audioLevel}
                      onChange={(e) => handleInputChange('audioLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {audioLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">剪辑/特效</label>
                    <select
                      value={formData.editingLevel}
                      onChange={(e) => handleInputChange('editingLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    >
                      {editingLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 税费设置 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  税费设置
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">增值税率 (%)</label>
                  <input
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                    min="0"
                    max="20"
                    step="0.1"
                    placeholder="请输入增值税率"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">默认6%增值税，可根据实际情况调整</p>
                </div>
              </div>

              {/* 公司信息 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  公司信息
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">公司名称</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="请输入公司名称"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">联系电话</label>
                    <input
                      type="text"
                      value={formData.companyPhone}
                      onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                      placeholder="请输入联系电话"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">电子邮箱</label>
                    <input
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                      placeholder="请输入电子邮箱"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">公司地址</label>
                    <input
                      type="text"
                      value={formData.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      placeholder="请输入公司地址"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* PDF样式选择 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  PDF样式
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(pdfStyles).map(([key, style]) => (
                    <div
                      key={key}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.pdfStyle === key
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                      }`}
                      onClick={() => handleInputChange('pdfStyle', key)}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{style.title}</div>
                      <div className="flex space-x-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: style.primaryColor }}
                        ></div>
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: style.secondaryColor }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 立即报价按钮 */}
              <div className="pt-4">
                <button
                  onClick={handleCalculateQuote}
                  className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>立即报价</span>
                </button>
              </div>
            </div>
          </div>

          {/* 报价结果部分 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">报价结果</h2>
            
            {showQuote && quoteResult ? (
              <div className="space-y-6">
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      ¥{quoteResult.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">小计</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">价格明细</h3>
                  <div className="space-y-3">
                    {Object.entries(quoteResult.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">{key}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">¥{value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">税费信息</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">增值税（{formData.taxRate}%）</span>
                      <span className="font-semibold text-gray-900 dark:text-white">¥{(quoteResult.totalPrice * formData.taxRate / 100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-gray-50 dark:bg-gray-700 px-3 rounded">
                      <span className="text-gray-900 dark:text-white font-semibold">总计</span>
                      <span className="font-bold text-lg text-primary-600 dark:text-primary-400">¥{(quoteResult.totalPrice * (1 + formData.taxRate / 100)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">项目详情</h3>
                  <div className="space-y-2">
                    {quoteResult.details.map((detail: string, index: number) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleGeneratePDF}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>下载PDF报价单</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📋</div>
                <p className="text-gray-500 dark:text-gray-400">请配置项目参数后点击"立即报价"</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-6 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} 视频制作报价系统. 保留所有权利.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">专业提供视频制作成本评估服务</p>
        </div>
      </footer>
    </div>
  );
};

export default QuoteForm;