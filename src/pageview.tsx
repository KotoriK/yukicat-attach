import useSWR from 'swr'
import React from 'react'
import ReactDOM from 'react-dom'
const API_PREFIX = 'https://yukicat-ga-hit.vercel.app/api/ga/?page='
function PageView({ path: path_raw, append ,raw}: { path: string, append: string,raw:string }) {
    const path = path_raw + (path_raw.endsWith('/') ? '' : '/')
    const { data, error } = useSWR(API_PREFIX + path, {
        fetcher: (path) => fetch(path).then( r =>  r.json())
    })
    return <span data-raw={raw}>{error ? '-' + append : (data ? (data[0].hit + (append ?? '次浏览')) : '')}</span>
}
(() => {
    const colle = document.getElementsByClassName('meta-page-view')
    for (let i = 0; i < colle.length; i++) {
        const e = colle[i]
        const { attributes: attr } = e
        const path = attr.getNamedItem('data-path')?.value
        const append = attr.getNamedItem('data-append')?.value
        const raw = e.innerHTML.match(/[0-9]{1,}/)
        ReactDOM.hydrate(<PageView path={path} append={append} raw={raw?raw[0]:undefined}></PageView>, e)
    }
})()