import { useNavigate } from 'react-router-dom'
import s from './NotFound.module.css'

export const NotFound = () => {
    const navigate = useNavigate()
    return (
        <section id="PageNotFound" className={s.wrapper}>
            <h2 className={s.error}>404 Error</h2>
            <p className={s.text}>Sorry, page not found</p>
            <button className={s.btn} onClick={() => navigate(-1)}>Go Back</button>
        </section>
    )
}