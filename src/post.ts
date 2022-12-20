import imageModal from './imageModal'
import { initPV } from 'pageview'
import { createFaceRenderer, defaultStyle, deploySelector, FacePackage, importExternalFacePacks, setStyleSetting } from 'facepack-solid'
function load() {
    initPV()
    imageModal()
    importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json')
        .then(fp => { deployRenderer(fp); deploySelector(fp); })
}
document.addEventListener('pjax:complete', load)
if (document.readyState === 'complete') {
    load()
} else { document.addEventListener('DOMContentLoaded', load) }
function deployRenderer(facePackages: FacePackage[]) {
    const render = createFaceRenderer({
        facePackages: facePackages
    })
    setStyleSetting(defaultStyle)
    // 选择文章和评论里所有的p
    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit),#comments .commentwrap .body p').forEach(render)
}