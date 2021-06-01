
import {initPV} from './pageview'
document.addEventListener('pjax:complete', () => {
    initPV()
})
initPV()