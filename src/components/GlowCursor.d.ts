import React from 'react'

export interface GlowCursorProps {
  color?: string
  secondaryColor?: string
  intensity?: number
  trailWidth?: number
  linger?: number
  glow?: number
  hotspot?: number
  followSpeed?: number
  grain?: number
  clickBurst?: boolean
  quality?: 'low' | 'medium' | 'high'
  theme?: 'dark' | 'light'
  blendMode?: string
  maxDevicePixelRatio?: number
  enabled?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}

declare const GlowCursor: React.FC<GlowCursorProps>
export default GlowCursor
