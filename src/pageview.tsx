import useSWR from 'swr'
import React, { CSSProperties, forwardRef,  useEffect, useState } from 'react'
import { createPortal, hydrate } from 'react-dom'
import { usePopper } from 'react-popper'
import 'simple-img-modal/src/FloatButton.css'
import 'simple-img-modal/src/SignedCollapse.css'
const API_PREFIX = 'https://yukicat-ga-hit.vercel.app/api/ga/?page='
const regNumber = /[0-9]{1,}/
interface PVDate {
    page?: string,
    hit: string,
    avgTOP?: string

}
const { body: bodyRef } = document
function toTime(time: string | number,secFix:number = 2) {
    const _hour = (typeof time == 'string' ? parseFloat(time) : time) / 3600//second
    const hour = _hour | 0
    const _min = (_hour - hour) * 60
    const min = _min | 0
    const second = (_min - min) * 60
    const ms = second - (second | 0)
    return `${hour > 0 ? `${hour}小时` : ''}${min > 0 ? `${min}分` : ''}${second > 0 ? `${ms > 0 ? second.toFixed(secFix) : second}秒` : ''}`
}
const DetailPannel = forwardRef<HTMLDivElement, { data: PVDate, style: CSSProperties, show: boolean }>(
    ({ data: { hit, avgTOP }, style, show }, ref) =>
        <div className="popper opacity-trans" data-show={show} ref={ref} style={style}>
            <li>
                {`浏览量:${hit}`}
            </li>
            {avgTOP ? <>
                <li>
                    {`平均浏览时间:${toTime(avgTOP)}`}
                </li>
                <li>
                    {`总浏览时间:${toTime(parseFloat(avgTOP) * parseInt(hit),0)}`}
                </li></> : null}
        </div>
)
const swrOption = {
    fetcher: (path) => fetch(path).then(r => r.json()), revalidateOnFocus: false, revalidateOnReconnect: false
}
function PageView({ path: path_raw, raw }: { path: string, raw: string }) {
    const path = path_raw + (path_raw.endsWith('/') ? '' : '/')
    const { data, error } = useSWR<PVDate>(API_PREFIX + path, swrOption)
    const _rawHit = raw.replace(/<\/?span>/g, '')
    const [refEle, setRefEle] = useState<HTMLSpanElement>()
    const [popperEle, setPopper] = useState<HTMLDivElement>()
    const [showPannel, setShowPannel] = useState(false)
    const [ticker, setTicker] = useState<number>()
    const { styles } = usePopper(refEle, popperEle, { placement: 'top',modifiers:[{name:'eventListeners',options:{resize:showPannel,scroll:showPannel}}]})
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
        }} ref={setRefEle} data-raw={raw} className="clickable-sign">{error ? _rawHit.replace(regNumber, '-') : (data ? _rawHit.replace(regNumber, data[0].hit) : _rawHit)}</span>
        {createPortal(<DetailPannel ref={setPopper} data={(data && data[0]) || { hit: _rawHit }} style={styles.popper} show={showPannel} />
            , bodyRef)}
    </>
}

(() => {
    const colle = document.getElementsByClassName('meta-page-view')
    for (let i = 0; i < colle.length; i++) {
        const e = colle[i],
            { attributes: attr } = e,
            path = attr.getNamedItem('data-path')?.value,
            raw = e.innerHTML
        hydrate(<PageView path={path} raw={raw} />, e)
    }
    console.log('loaded')
})()