import { QuoteFormData, QuoteResult, PriceConfig } from './types';

// 地区价格系数（基于2024年市场行情）
const regionMultipliers: { [key: string]: number } = {
  // 一线城市
  '北京': 1.5,
  '上海': 1.5,
  '广州': 1.3,
  '深圳': 1.4,
  // 新一线城市
  '杭州': 1.2,
  '成都': 1.1,
  '武汉': 1.1,
  '西安': 1.0,
  '南京': 1.1,
  '苏州': 1.1,
  '天津': 1.1,
  '重庆': 1.0,
  '长沙': 1.0,
  '青岛': 1.0,
  '宁波': 1.0,
  '无锡': 1.0,
  '佛山': 1.0,
  '东莞': 1.0,
  '郑州': 1.0,
  '昆明': 0.9,
  '大连': 1.0,
  '福州': 1.0,
  '厦门': 1.1,
  '哈尔滨': 0.9,
  '济南': 1.0,
  '温州': 1.0,
  '长春': 0.9,
  '石家庄': 0.9,
  '南宁': 0.9,
  '常州': 1.0,
  '南昌': 0.9,
  '贵阳': 0.9,
  '太原': 0.9,
  '烟台': 0.9,
  '嘉兴': 1.0,
  '惠州': 1.0,
  '珠海': 1.1,
  '中山': 1.0,
  '保定': 0.9,
  '台州': 1.0,
  '金华': 1.0,
  '徐州': 0.9,
  '泉州': 1.0,
  '临沂': 0.9,
  '洛阳': 0.9,
  '镇江': 1.0,
  '廊坊': 0.9,
  '泰州': 0.9,
  '湖州': 1.0,
  '盐城': 0.9,
  '济宁': 0.9,
  '江门': 1.0,
  '淮安': 0.9,
  '宿迁': 0.8,
  '湛江': 0.9,
  '茂名': 0.8,
  '肇庆': 0.9,
  '清远': 0.9,
  '韶关': 0.8,
  '梅州': 0.8,
  '汕尾': 0.8,
  '河源': 0.8,
  '阳江': 0.8,
  '潮州': 0.8,
  '揭阳': 0.8,
  '云浮': 0.8,
  // 其他省份主要城市
  '沈阳': 0.9,
  '呼和浩特': 0.9,
  '银川': 0.8,
  '西宁': 0.8,
  '乌鲁木齐': 0.8,
  '拉萨': 0.8,
  '海口': 1.0,
  '三亚': 1.1,
  '香港': 2.0,
  '澳门': 1.8,
  '台北': 1.5,
  '高雄': 1.3,
  '台中': 1.2,
  '台南': 1.1,
};

// 价格配置（基于2024年市场行情）
const priceConfig: PriceConfig = {
  videoType: {
    '宣传片': 15000,
    '广告片': 25000,
    '微电影': 35000,
    '短剧': 80000,
    '二维动画': 45000,
    '三维动画': 80000,
  },
  shootingDays: {
    1: 1,
    2: 1.8,
    3: 2.5,
    4: 3.2,
    5: 3.8,
    6: 4.3,
    7: 4.8,
    8: 5.2,
    9: 5.6,
    10: 6.0,
  },
  duration: {
    '<1分钟': 0.8,
    '1-3分钟': 1,
    '3-5分钟': 1.3,
    '5-10分钟': 1.6,
    '>10分钟': 2,
  },
  creativeLevel: {
    '自备文案': 0,
    '专业级': 8000,
    '广告级': 20000,
  },
  teamLevel: {
    '专业级团队': 1,
    '广告级团队': 1.8,
    '电影级团队': 3.0,
  },
  equipmentLevel: {
    '专业级2k': 1,
    '广告级4k': 1.5,
    '电影级6k': 2.5,
  },
  scene: {
    '自有场地': 0,
    '租赁': 5000,
    '搭景': 15000,
  },
  actors: {
    '自备演员': 0,
    '普通演员': 3000,
    '专业演员': 8000,
    '外籍演员': 20000,
  },
  audioLevel: {
    '专业配音+无版权': 3000,
    '高级配音+授权音乐': 8000,
    '音效配音+原创音乐': 20000,
  },
  editingLevel: {
    '基础剪辑+特效': 5000,
    '专业剪辑+AE特效': 12000,
    '高级剪辑+三维特效': 30000,
  },
};

export function calculateQuote(formData: QuoteFormData): QuoteResult {
  const basePrice = priceConfig.videoType[formData.videoType] || 15000;
  const regionMultiplier = regionMultipliers[formData.region] || 1.0;
  
  let totalPrice = basePrice * regionMultiplier;
  const breakdown: { [key: string]: number } = {};
  const details: string[] = [];

  // 基础价格（含地区调整）
  breakdown['基础价格'] = totalPrice;
  details.push(`${formData.videoType}基础价格(${formData.region}): ¥${totalPrice.toLocaleString()}`);

  // 拍摄天数
  const daysMultiplier = priceConfig.shootingDays[formData.shootingDays] || 1;
  const daysPrice = totalPrice * (daysMultiplier - 1);
  if (daysPrice > 0) {
    breakdown['拍摄天数'] = daysPrice;
    details.push(`${formData.shootingDays}天拍摄费用: ¥${daysPrice.toLocaleString()}`);
  }

  // 时长调整
  const durationMultiplier = priceConfig.duration[formData.duration] || 1;
  const durationPrice = totalPrice * (durationMultiplier - 1);
  if (durationPrice > 0) {
    breakdown['时长调整'] = durationPrice;
    details.push(`${formData.duration}时长调整: ¥${durationPrice.toLocaleString()}`);
  }

  // 创意策划
  const creativePrice = priceConfig.creativeLevel[formData.creativeLevel] || 0;
  if (creativePrice > 0) {
    breakdown['创意策划'] = creativePrice;
    details.push(`${formData.creativeLevel}创意策划: ¥${creativePrice.toLocaleString()}`);
  }

  // 摄制团队
  const teamMultiplier = priceConfig.teamLevel[formData.teamLevel] || 1;
  const teamPrice = totalPrice * (teamMultiplier - 1);
  if (teamPrice > 0) {
    breakdown['摄制团队'] = teamPrice;
    details.push(`${formData.teamLevel}团队费用: ¥${teamPrice.toLocaleString()}`);
  }

  // 拍摄设备
  const equipmentMultiplier = priceConfig.equipmentLevel[formData.equipmentLevel] || 1;
  const equipmentPrice = totalPrice * (equipmentMultiplier - 1);
  if (equipmentPrice > 0) {
    breakdown['拍摄设备'] = equipmentPrice;
    details.push(`${formData.equipmentLevel}设备费用: ¥${equipmentPrice.toLocaleString()}`);
  }

  // 场景
  const scenePrice = priceConfig.scene[formData.scene] || 0;
  if (scenePrice > 0) {
    breakdown['场景费用'] = scenePrice;
    details.push(`${formData.scene}场景费用: ¥${scenePrice.toLocaleString()}`);
  }

  // 演员
  const actorsPrice = priceConfig.actors[formData.actors] || 0;
  if (actorsPrice > 0) {
    breakdown['演员费用'] = actorsPrice;
    details.push(`${formData.actors}演员费用: ¥${actorsPrice.toLocaleString()}`);
  }

  // 配音配乐
  const audioPrice = priceConfig.audioLevel[formData.audioLevel] || 0;
  if (audioPrice > 0) {
    breakdown['配音配乐'] = audioPrice;
    details.push(`${formData.audioLevel}配音配乐: ¥${audioPrice.toLocaleString()}`);
  }

  // 剪辑特效
  const editingPrice = priceConfig.editingLevel[formData.editingLevel] || 0;
  if (editingPrice > 0) {
    breakdown['剪辑特效'] = editingPrice;
    details.push(`${formData.editingLevel}剪辑特效: ¥${editingPrice.toLocaleString()}`);
  }

  // 计算总价
  totalPrice = Object.values(breakdown).reduce((sum, price) => sum + price, 0);

  return {
    totalPrice,
    breakdown,
    details,
  };
} 