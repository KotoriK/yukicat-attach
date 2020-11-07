import useSWR from 'swr'
import React, { CSSProperties, forwardRef, useCallback, useState } from 'react'
import { hydrate } from 'react-dom'
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
function toTime(time: string | number) {
    const _time = typeof time == 'string' ? parseFloat(time) : time//second
    const minute = _time / 60
    const second = (minute | 0 * 60)
    const ms = second - (second | 0)
    return `${minute > 0 && `${minute}分`}${second > 0 && `${ms > 0 ? second.toFixed(2) : second}秒`}`
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
                    {`总浏览时间:${toTime(parseFloat(avgTOP) * parseInt(hit))}`}
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
    const { styles } = usePopper(refEle, popperEle, { placement: 'top', })
    const handleClick = useCallback(() => { setShowPannel(!showPannel) }, [showPannel, setShowPannel])
    return <>
        <span onClick={handleClick} ref={setRefEle} data-raw={raw} className="clickable-sign">{error ? _rawHit.replace(regNumber, '-') : (data ? _rawHit.replace(regNumber, data[0].hit) : _rawHit)}</span>
        <DetailPannel ref={setPopper} data={data || { hit: _rawHit }} style={styles.popper} show={showPannel} />
    </>
}

(() => {
    const colle = document.getElementsByClassName('meta-page-view')
    for (let i = 0; i < colle.length; i++) {
        const e = colle[i],
            { attributes: attr } = e,
            path = attr.getNamedItem('data-path')?.value,
            raw = e.innerHTML
        hydrate(<PageView path={path} raw={raw}></PageView>, e)
    }
})()