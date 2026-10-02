import svgSprite from '@/shared/accets/svg-sprite.svg'
import type { CSSProperties } from 'react'

type IconsProps = {
  iconId: string
  width?: string
  height?: string
  viewbox?: string
  fill?: string
  style?: CSSProperties
}

export const Icon = (props: IconsProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.fill}
      style={{ fill: 'currentColor' }}
      width={props.width || '32'}
      height={props.height || '32'}
      viewBox={props.viewbox || '0 -960 960 960'}>
      <use xlinkHref={`${svgSprite}#${props.iconId}`} />
    </svg>
  )
}
