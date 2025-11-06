/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // 基于 51Talk-KSA 视觉规范的颜色系统
      colors: {
        primary: {
          DEFAULT: '#26B7FF',
          blue: '#26B7FF',
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
        },
        accent: {
          DEFAULT: '#FDE700',
          yellow: '#FDE700',
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fde68a',
          '500': '#eab308',
          '600': '#ca8a04',
          '700': '#a16207',
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
      // 基于 51Talk-KSA 视觉规范的字体系统
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'poppins-rtl': ['Poppins', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      // 字重层级
      fontWeight: {
        'regular': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 800,
      },
      // 字号层级
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'lg': ['20px', { lineHeight: '1.5' }],
        'xl': ['24px', { lineHeight: '1.5' }],
        '2xl': ['32px', { lineHeight: '1.5' }],
        '3xl': ['41px', { lineHeight: '1.25' }],
        '4xl': ['48px', { lineHeight: '1.25' }],
      },
      // 间距系统 - 8px基准
      spacing: {
        '18': '72px',
        '88': '352px',
        '96': '384px',
        '104': '416px',
        '112': '448px',
        '120': '480px',
        '128': '512px',
      },
      // 容器最大宽度
      maxWidth: {
        '8xl': '1140px',
        '9xl': '1280px',
      },
      // 组件特定样式
      borderRadius: {
        'pill': '50px',
        'card': '20px',
        'card-lg': '24px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'button-primary': '0 8px 25px rgba(254, 231, 0, 0.3)',
        'button-secondary': '0 8px 25px rgba(38, 183, 255, 0.3)',
      },
      // 过渡效果
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      // 悬停变换
      transform: {
        'hover': 'translateY(-2px)',
        'hover-sm': 'translateY(-1px)',
        'hover-lg': 'translateY(-4px)',
      }
    },
  },
  plugins: [
    // 可以添加自定义插件
  ],
}

module.exports = config