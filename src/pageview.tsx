import useSWR from 'swr'
import { CSSProperties, forwardRef, useEffect, useState } from 'react'
import { createPortal, hydrate } from 'react-dom'
import { usePopper } from 'react-popper'
import { css } from '@emotion/css'
const API_PREFIX = 'https://yukicat-ga-hit.vercel.app/api/ga/?page='
const regNumber = /[0-9]{1,}/
interface PVDate {
    page?: string,
    hit: string,
    avgTOP?: string

}
const { body: bodyRef } = document
const styleClickable = css({
    cursor: "pointer"
})
const popper = css({
    opacity: 0,
    visibility: "hidden",
    background: "#33333380",
    color: "white",
    padding: "4px 8px",
    fontSize: "13px",
    borderRadius: "4px",
    maxHeight: "20vh",
    overflow: "auto",
    '&[data-show="true"]': {
        opacity: 1,
        visibility: "visible",
        backdropFilter: "blur(3px)",
    }, zIndex: 999
})
const opacity_trans = css({
    transition: "opacity 500ms ease-in-out",
})
const toTime = (time: string | number, secFix: number = 2) => {
    const _hour = (typeof time == 'string' ? parseFloat(time) : time) / 3600//second
    const hour = _hour | 0
    const _min = (_hour - hour) * 60
    const min = _min | 0
    const second = (_min - min) * 60
    const ms = second - (second | 0)
    return `${hour > 0 ? `${hour}小时` : ''}${min > 0 ? `${min}分` : ''}${second > 0 ? `${ms > 0 ? second.toFixed(secFix) : second}秒` : ''}`
}
const DetailPannel = forwardRef<HTMLDivElement, { data: PVDate, style: CSSProperties, show: boolean }>(
    ({ data: { hit, avgTOP }, style, show }, ref) => {
        return <div className={popper + ' ' + opacity_trans} data-show={show} ref={ref} style={style}>
            <li>
                {`浏览量:${hit}`}
            </li>
            {avgTOP ? <>
                <li>
                    {`平均浏览时间:${toTime(avgTOP)}`}
                </li>
                <li>
                    {`总浏览时间:${toTime(parseFloat(avgTOP) * parseInt(hit), 0)}`}
                </li></> : null}
        </div>
    }
)
const swrOption = {
    fetcher: (path) => fetch(path).then(r => r.json()), revalidateOnFocus: false, revalidateOnReconnect: false
}
export function PageView({ path: path_raw, raw }: { path: string, raw: string }) {
    const path = path_raw + (path_raw.endsWith('/') ? '' : '/')
    const { data, error } = useSWR<PVDate>(API_PREFIX + path, swrOption)
    const _rawHit = raw.replace(/<\/?span>/g, '')
    const [refEle, setRefEle] = useState<HTMLSpanElement>()
    const [popperEle, setPopper] = useState<HTMLDivElement>()
    const [showPannel, setShowPannel] = useState(false)
    const [ticker, setTicker] = useState<number>()
    const { styles } = usePopper(refEle, popperEle, { placement: 'top', modifiers: [{ name: 'eventListeners', options: { resize: true, scroll: showPannel } }] })
    /* const setShowPannel = useCallback((value:boolean)=>{
        if(value){
            state.
        }
        _setShowPannel(value)
    },[_setShowPannel]) */
    useEffect(() => () => clearTimeout(ticker), [])        //cleaner
    return <>
        <span onClick={() => {
            setShowPannel(!showPannel)
            if (ticker) clearTimeout(ticker)
            setTicker(window.setTimeout(() => {
                setShowPannel(showPannel)
                setTicker(undefined)
            }, 5000))
        }} ref={setRefEle} data-raw={raw} className={styleClickable}>
            {error ? _rawHit.replace(regNumber, '-') : (data ? _rawHit.replace(regNumber, data[0].hit) : _rawHit)}
        </span>
        {createPortal(<DetailPannel ref={setPopper} data={(data && data[0]) || { hit: _rawHit }} style={styles.popper} show={showPannel} />
            , bodyRef)}
    </>
}

export const initPV = () => {
    const colle = document.getElementsByClassName('meta-page-view')
    for (let i = 0; i < colle.length; i++) {
        const e = colle[i] as HTMLElement,
            path = e.attributes.getNamedItem('data-path')?.value,
            raw = e.innerText
        hydrate(<PageView path={path} raw={raw} />, e)
    }
}