'use client'

import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        relative p-2 rounded-lg transition-all duration-300 ease-in-out
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        border border-gray-200 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
      "
      aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
      title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      <div className="relative w-5 h-5">
        {/* 太阳图标 - 浅色模式 */}
        <Sun 
          className={`
            absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300
            ${theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
            }
          `}
        />
        
        {/* 月亮图标 - 深色模式 */}
        <Moon 
          className={`
            absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
            }
          `}
        />
      </div>
    </button>
  )
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 防止服务端渲染不匹配
  if (!mounted) {
    return (
      <div className="
        relative p-2 rounded-lg transition-all duration-300 ease-in-out
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        border border-gray-200 dark:border-gray-600
        w-9 h-9
      ">
        <div className="relative w-5 h-5">
          <Sun className="absolute inset-0 w-5 h-5 text-yellow-500" />
        </div>
      </div>
    )
  }

  return <ThemeToggleButton />
}