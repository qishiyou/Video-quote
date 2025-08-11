export interface QuoteFormData {
  region: string;
  videoType: string;
  shootingDays: number;
  duration: string;
  creativeLevel: string;
  teamLevel: string;
  equipmentLevel: string;
  scene: string;
  actors: string;
  audioLevel: string;
  editingLevel: string;
  // 公司信息
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  // PDF样式
  pdfStyle: string;
  // 税费设置
  taxRate: number;
}

export interface PriceConfig {
  [key: string]: {
    [key: string]: number;
  };
}

export interface QuoteResult {
  totalPrice: number;
  breakdown: {
    [key: string]: number;
  };
  details: string[];
}

export interface PDFStyle {
  name: string;
  title: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  headerStyle: string;
  footerStyle: string;
} 