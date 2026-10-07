import { memo } from 'react'
import s from './LinerProgress.module.css'

type Props = {
    height?: number
}

export const LinerProgress = memo(({ height = 4 }: Props) => {
    return (
        <div className={s.root} style={{ height }}>
            <div className={`${s.bar} ${s.indeterminate1}`} />
            <div className={`${s.bar} ${s.indeterminate2}`} />
        </div>
    )
})