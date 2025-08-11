import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { QuoteFormData, QuoteResult, PDFStyle } from './types';

// PDF样式配置 - 三色搭配
export const pdfStyles: { [key: string]: PDFStyle } = {
  'business': {
    name: 'business',
    title: '商务简约',
    primaryColor: '#1f2937',
    secondaryColor: '#2563eb',
    backgroundColor: '#f8fafc',
    fontFamily: 'Microsoft YaHei, SimSun, Arial, sans-serif',
    headerStyle: 'border-bottom: 2px solid #1f2937;',
    footerStyle: 'border-top: 1px solid #e5e7eb;',
  },
  'tech': {
    name: 'tech',
    title: '科技蓝',
    primaryColor: '#2563eb',
    secondaryColor: '#06b6d4',
    backgroundColor: '#f0f9ff',
    fontFamily: 'Microsoft YaHei, SimSun, Arial, sans-serif',
    headerStyle: 'border-bottom: 2px solid #2563eb;',
    footerStyle: 'border-top: 1px solid #dbeafe;',
  },
  'premium': {
    name: 'premium',
    title: '高端黑金',
    primaryColor: '#000000',
    secondaryColor: '#d4af37',
    backgroundColor: '#f9f6f2',
    fontFamily: 'Microsoft YaHei, SimSun, Arial, sans-serif',
    headerStyle: 'border-bottom: 2px solid #d4af37;',
    footerStyle: 'border-top: 1px solid #f3f4f6;',
  },
  'modern': {
    name: 'modern',
    title: '现代简约',
    primaryColor: '#dc2626',
    secondaryColor: '#f59e42',
    backgroundColor: '#fff7ed',
    fontFamily: 'Microsoft YaHei, SimSun, Arial, sans-serif',
    headerStyle: 'border-bottom: 2px solid #dc2626;',
    footerStyle: 'border-top: 1px solid #fee2e2;',
  },
};

export async function generateHTMLQuote(formData: QuoteFormData, quoteResult: QuoteResult): Promise<void> {
  const style = pdfStyles[formData.pdfStyle] || pdfStyles['business'];
  const subtotal = quoteResult.totalPrice;
  const taxRate = formData.taxRate / 100;
  const taxAmount = subtotal * taxRate;
  const totalWithTax = subtotal + taxAmount;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>视频制作报价单</title>
      <style>
        body {
          font-family: ${style.fontFamily};
          margin: 0;
          padding: 20px;
          background: ${style.backgroundColor};
          color: ${style.primaryColor};
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          min-height: 100vh;
        }
        .header {
          text-align: center;
          ${style.headerStyle}
          padding-bottom: 25px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 28px;
          color: ${style.primaryColor};
          margin: 0;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .subtitle {
          font-size: 14px;
          color: ${style.secondaryColor};
          margin: 0;
        }
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: ${style.primaryColor};
          margin-bottom: 15px;
          border-left: 4px solid ${style.primaryColor};
          padding-left: 16px;
          background: ${style.backgroundColor === '#ffffff' ? '#f8fafc' : style.backgroundColor};
          border-radius: 0 12px 12px 0;
          line-height: 1.6;
          display: flex;
          align-items: center;
          height: 44px;
          width: 100%;
          text-align: left;
          box-sizing: border-box;
        }
        .info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .info-table th,
        .info-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .info-table th {
          font-weight: 600;
          color: ${style.primaryColor};
          width: 30%;
          background-color: ${style.backgroundColor};
        }
        .info-table td {
          font-weight: bold;
          color: ${style.secondaryColor};
        }
        .info-table tr:last-child td {
          border-bottom: none;
        }
        .price-breakdown {
          background: ${style.backgroundColor};
          padding: 25px;
          border-radius: 12px;
          margin: 30px 0;
          border: 2px solid #e5e7eb;
        }
        .price-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .price-item:last-child {
          border-bottom: none;
        }
        .price-label {
          font-weight: 600;
          color: ${style.primaryColor};
          font-size: 14px;
        }
        .price-value {
          font-weight: 700;
          color: ${style.primaryColor};
          font-size: 14px;
        }
        .total-section {
          background: ${style.secondaryColor}11;
          padding: 25px;
          border-radius: 12px;
          margin: 30px 0;
          border: 2px solid ${style.primaryColor};
        }
        .subtotal-row, .tax-row, .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }
        .total-row {
          font-size: 22px;
          font-weight: bold;
          color: ${style.primaryColor};
          border-top: 2px solid ${style.primaryColor};
          margin-top: 10px;
        }
        .company-info {
          margin-top: 40px;
          padding-top: 30px;
          ${style.footerStyle}
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .company-title {
          font-size: 18px;
          font-weight: bold;
          color: ${style.primaryColor};
          margin-bottom: 15px;
          background: ${style.backgroundColor};
          padding: 12px 15px;
          border-radius: 6px;
          border-left: 4px solid ${style.secondaryColor};
        }
        .company-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }
        .company-info-left {
          flex: 1;
        }
        .qrcode-container {
          width: 120px;
          height: 120px;
          padding: 10px;
          background-color: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .qrcode-image {
          width: 100%;
          height: 100%;
        }
        .company-item {
          display: flex;
          align-items: center;
          padding: 0;
        }
        .company-label {
          font-weight: 600;
          color: ${style.primaryColor};
          min-width: 90px;
          font-size: 14px;
          text-align: right;
        }
        .company-value {
          color: ${style.secondaryColor};
          font-weight: bold;
          font-size: 15px;
          margin-left: 8px;
          text-align: left;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          ${style.footerStyle}
          font-size: 12px;
          color: ${style.secondaryColor};
          page-break-inside: avoid;
          break-inside: avoid;
          text-align: center;
        }
        .footer p {
          margin: 5px 0;
        }
        @media print {
          body { margin: 0; }
          .container { box-shadow: none; }
          .section { page-break-inside: avoid; }
          .company-info { page-break-inside: avoid; }
          .footer { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">视频制作报价单</h1>
          <p class="subtitle">专业视频制作服务</p>
        </div>
        
        <div class="section">
          <h2 class="section-title">项目基本信息</h2>
          <table class="info-table">
            <tr>
              <th>地区：</th>
              <td>${formData.region}</td>
            </tr>
            <tr>
              <th>视频类型：</th>
              <td>${formData.videoType}</td>
            </tr>
            <tr>
              <th>拍摄天数：</th>
              <td>${formData.shootingDays}天</td>
            </tr>
            <tr>
              <th>影片时长：</th>
              <td>${formData.duration}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <h2 class="section-title">制作规格</h2>
          <table class="info-table">
            <tr>
              <th>创意策划：</th>
              <td>${formData.creativeLevel}</td>
            </tr>
            <tr>
              <th>摄制团队：</th>
              <td>${formData.teamLevel}</td>
            </tr>
            <tr>
              <th>拍摄设备：</th>
              <td>${formData.equipmentLevel}</td>
            </tr>
            <tr>
              <th>场景：</th>
              <td>${formData.scene}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <h2 class="section-title">人员配置</h2>
          <table class="info-table">
            <tr>
              <th>演员：</th>
              <td>${formData.actors}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <h2 class="section-title">后期制作</h2>
          <table class="info-table">
            <tr>
              <th>配音/配乐：</th>
              <td>${formData.audioLevel}</td>
            </tr>
            <tr>
              <th>剪辑/特效：</th>
              <td>${formData.editingLevel}</td>
            </tr>
          </table>
        </div>
        
        <!-- 单个强制分页占位符确保价格明细显示在第二页 -->
        <div style="page-break-before: always; break-before: page; height: 50px; clear: both;"></div>

        <!-- 第二页顶部占位符 - 放在价格明细背景框外部 -->
        <!-- 调整高度使价格明细和容器整体向下移动且不溢出到第三页 -->
        <div style="height: 150px;"></div>
        <div style="height: 150px;"></div>

        <div class="price-breakdown" style="page-break-inside: avoid;">
          <h2 class="section-title">价格明细</h2>
          ${Object.entries(quoteResult.breakdown).map(([key, value]) => `
            <div class="price-item">
              <span class="price-label">${key}：</span>
              <span class="price-value">¥${value.toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="total-section">
          <div class="subtotal-row">
            <span class="price-label">小计：</span>
            <span class="price-value">¥${subtotal.toLocaleString()}</span>
          </div>
          <div class="tax-row">
            <span class="price-label">增值税（${formData.taxRate}%）：</span>
            <span class="price-value">¥${taxAmount.toLocaleString()}</span>
          </div>
          <div class="total-row">
            <span class="price-label">总计：</span>
            <span class="price-value">¥${totalWithTax.toLocaleString()}</span>
          </div>
        </div>
        
        <div class="company-info">
          <h3 class="company-title">制作方信息</h3>
          <div class="company-details">
            <div class="company-info-left">
              <div class="company-item">
                <span class="company-label">公司名称：</span>
                <span class="company-value">${formData.companyName || '请填写公司名称'}</span>
              </div>
              <div class="company-item">
                <span class="company-label">联系电话：</span>
                <span class="company-value">${formData.companyPhone || '请填写联系电话'}</span>
              </div>
              <div class="company-item">
                <span class="company-label">电子邮箱：</span>
                <span class="company-value">${formData.companyEmail || '请填写电子邮箱'}</span>
              </div>
              <div class="company-item">
                <span class="company-label">公司地址：</span>
                <span class="company-value">${formData.companyAddress || '请填写公司地址'}</span>
              </div>
            </div>
            <div class="qrcode-container">
              <canvas class="qrcode-image" id="qrcodeCanvas"></canvas>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>本报价单有效期为30天</p>
          <p>生成时间：${new Date().toLocaleString('zh-CN')}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // 创建临时元素来渲染HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '800px';
  document.body.appendChild(tempDiv);

  try {
    // 生成二维码
    const canvas = tempDiv.querySelector('#qrcodeCanvas') as HTMLCanvasElement;
    if (canvas) {
      // 生成vCard格式的二维码内容，可直接保存到手机通讯录
      const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${formData.companyName || '未知'}
TEL;TYPE=WORK,VOICE:${formData.companyPhone || '未知'}
EMAIL:${formData.companyEmail || '未知'}
ADR;TYPE=WORK:;;${formData.companyAddress || '未知'}
ORG:${formData.companyName || '未知'}
END:VCARD`;
      const qrCodeContent = vCardContent;
      await QRCode.toCanvas(canvas, qrCodeContent, {
          width: 100,
          margin: 5,
          errorCorrectionLevel: 'M', // 中等错误修正级别，降低密集度
          color: {
            dark: style.primaryColor,
            light: '#ffffff'
          }
        });
    }
    // 使用html2canvas将HTML转换为图片
    // 计算实际需要的高度以确保所有内容都被捕获
    const tempDivHeight = tempDiv.offsetHeight;
    const html2canvasResult = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDivHeight + 200, // 增加200px作为安全边距
      scrollX: 0,
      scrollY: 0,
      logging: false,
    });

    // 将html2canvasResult转换为PDF
    const imgData = html2canvasResult.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (html2canvasResult.height * imgWidth) / html2canvasResult.width;
    
    // 找到价格明细元素
    const priceBreakdownElement = tempDiv.querySelector('.price-breakdown');
    let priceBreakdownTop = 0;
    
    if (priceBreakdownElement) {
      // 计算价格明细在HTML中的位置
      priceBreakdownTop = priceBreakdownElement.getBoundingClientRect().top - tempDiv.getBoundingClientRect().top;
    }
    
    // 计算价格明细在PDF中的位置
    const pdfPriceBreakdownTop = (priceBreakdownTop * imgWidth) / tempDiv.offsetWidth;
    
    // 确保价格明细在第二页显示
    // 计算第一页应该显示的最大高度（不包含价格明细）
    const firstPageMaxHeight = Math.min(pageHeight, pdfPriceBreakdownTop - 20); // 留出20mm边距
    
    // 添加第一页（不包含价格明细）
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // 添加第二页，从价格明细开始显示
    pdf.addPage();
    const position = -pdfPriceBreakdownTop;
    // 计算第二页应该显示的最大高度，避免溢出到第三页
    const secondPageMaxHeight = pageHeight; // 第二页完整高度
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    
    // 处理剩余页面（如果有足够内容需要显示）
    const remainingHeight = imgHeight - (pdfPriceBreakdownTop + pageHeight);
    // 只有当剩余高度超过10mm（约3%的页面高度）时，才添加新页面
    if (remainingHeight > 10) {
      pdf.addPage();
      const nextPosition = -(pdfPriceBreakdownTop + pageHeight);
      pdf.addImage(imgData, 'PNG', 0, nextPosition, imgWidth, imgHeight);
    }
    
    pdf.save('视频制作报价单.pdf');
  } finally {
    // 清理临时元素
    document.body.removeChild(tempDiv);
  }
}

export async function generatePDFFromElement(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  
  let position = 0;
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save('视频制作报价单.pdf');
}