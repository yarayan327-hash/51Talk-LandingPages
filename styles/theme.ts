/**
 * 51Talk-KSA 视觉主题配置
 * 基于 /Users/jin/landing page-Academy/README.md 视觉规范
 */

export const theme = {
  // 颜色系统
  colors: {
    primary: {
      blue: '#26B7FF',
      'blue-50': '#f0f9ff',
      'blue-100': '#e0f2fe',
      'blue-200': '#bae6fd',
      'blue-500': '#0ea5e9',
      'blue-600': '#0284c7',
      'blue-700': '#0369a1',
    },
    accent: {
      yellow: '#FDE700',
      'yellow-50': '#fffbeb',
      'yellow-100': '#fef3c7',
      'yellow-200': '#fde68a',
      'yellow-500': '#eab308',
      'yellow-600': '#ca8a04',
      'yellow-700': '#a16207',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F6F6F6',
    },
    // 功能性颜色
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // 中性颜色
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },

  // 字体系统
  typography: {
    fontFamily: {
      primary: ['Poppins', 'system-ui', 'sans-serif'],
      rtl: ['Poppins', 'Tajawal', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      regular: 400,
      semibold: 600,
      bold: 800,
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '41px',
      '4xl': '48px',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },

  // 间距系统 - 8px基准
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },

  // 组件样式
  components: {
    button: {
      primary: {
        backgroundColor: theme.colors.accent.yellow,
        color: theme.colors.text.primary,
        borderRadius: '50px',
        padding: '12px 32px',
        fontWeight: theme.typography.fontWeight.semibold,
        fontSize: theme.typography.fontSize.base,
        minHeight: '48px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      secondary: {
        backgroundColor: theme.colors.primary.blue,
        color: '#FFFFFF',
        borderRadius: '50px',
        padding: '12px 32px',
        fontWeight: theme.typography.fontWeight.semibold,
        fontSize: theme.typography.fontSize.base,
        minHeight: '48px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    card: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      transition: 'all 0.3s ease',
    },
    container: {
      maxWidth: '1140px',
      margin: '0 auto',
      padding: '0 20px',
    },
  },

  // 响应式断点
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1024px',
  },

  // 动画和过渡
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },

  // 阴影
  shadows: {
    sm: '0 4px 6px rgba(0, 0, 0, 0.07)',
    md: '0 8px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 12px 24px rgba(0, 0, 0, 0.15)',
    hover: '0 8px 25px rgba(38, 183, 255, 0.3)',
  },
};

// 导出CSS变量映射
export const cssVariables = {
  '--primary-blue': theme.colors.primary.blue,
  '--accent-yellow': theme.colors.accent.yellow,
  '--text-primary': theme.colors.text.primary,
  '--text-secondary': theme.colors.text.secondary,
  '--bg-primary': theme.colors.background.primary,
  '--bg-secondary': theme.colors.background.secondary,
};

// 语言配置
export const languages = {
  zh: {
    name: '中文',
    code: 'zh-CN',
    direction: 'ltr',
  },
  en: {
    name: 'English',
    code: 'en',
    direction: 'ltr',
  },
  ar: {
    name: 'العربية',
    code: 'ar',
    direction: 'rtl',
  },
};

// 默认导出
export default theme;