import useSWR from 'swr'
import React from 'react'
import { hydrate } from 'react-dom'
const API_PREFIX = 'https://yukicat-ga-hit.vercel.app/api/ga/?page='
const reg = /[0-9]{1,}/
function PageView({ path: path_raw, raw }: { path: string, raw: string }) {
    const path = path_raw + (path_raw.endsWith('/') ? '' : '/')
    const { data, error } = useSWR(API_PREFIX + path, {
        fetcher: (path) => fetch(path).then(r => r.json()), revalidateOnFocus: false, revalidateOnReconnect: false
    })
    const _raw = raw.replace(/<\/?span>/g,'')
    return <span data-raw={raw}>{error ? _raw.replace(reg, '-') : (data ? _raw.replace(reg, data[0].hit) : _raw)}</span>
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