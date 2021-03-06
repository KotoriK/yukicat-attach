import useSWR from 'swr'
import React, { CSSProperties, forwardRef, useEffect, useState } from 'react'
import { createPortal, hydrate } from 'react-dom'
import { usePopper } from 'react-popper'
import { createUseStyles } from 'react-jss'
const API_PREFIX = 'https://yukicat-ga-hit.vercel.app/api/ga/?page='
const regNumber = /[0-9]{1,}/
interface PVDate {
    page?: string,
    hit: string,
    avgTOP?: string

}
const { body: bodyRef } = document
const usePVStyles = createUseStyles(() => {
    return {
        clickable: {
            cursor: "pointer"
        }
    }
})
const usePannelStyle = createUseStyles(() => {
    return {
        popper: {
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
        },
        "opacity-trans": {
            transition: "opacity 500ms ease-in-out",
        },
    }
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
        const styles = usePannelStyle()
        return <div className={styles.popper + ' ' + styles['opacity-trans']} data-show={show} ref={ref} style={style}>
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
    const { styles, update } = usePopper(refEle, popperEle, { placement: 'top', modifiers: [{ name: 'eventListeners', options: { resize: showPannel, scroll: showPannel } }] })
    /* const setShowPannel = useCallback((value:boolean)=>{
        if(value){
            state.
        }
        _setShowPannel(value)
    },[_setShowPannel]) */
    const pvStyles = usePVStyles()
    useEffect(() => {
        const listener = () => {
            update()
        }
        document.addEventListener('resize', listener, { passive: true })
        return () => {
            document.removeEventListener('resize', listener)
        }
    })
    useEffect(() => () => clearTimeout(ticker), [])        //cleaner
    return <>
        <span onClick={() => {
            setShowPannel(!showPannel)
            if (ticker) clearTimeout(ticker)
            setTicker(window.setTimeout(() => {
                setShowPannel(showPannel)
                setTicker(undefined)
            }, 5000))
        }} ref={setRefEle} data-raw={raw} className={pvStyles.clickable}>{error ? _rawHit.replace(regNumber, '-') : (data ? _rawHit.replace(regNumber, data[0].hit) : _rawHit)}</span>
        {createPortal(<DetailPannel ref={setPopper} data={(data && data[0]) || { hit: _rawHit }} style={styles.popper} show={showPannel} />
            , bodyRef)}
    </>
}

export const initPV = () => {
    const colle = document.getElementsByClassName('meta-page-view')
    for (let i = 0; i < colle.length; i++) {
        const e = colle[i],
            path = e.attributes.getNamedItem('data-path')?.value,
            raw = e.innerHTML
        hydrate(<PageView path={path} raw={raw} />, e)
    }
}