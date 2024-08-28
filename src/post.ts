/* import { initPV } from 'pageview'
 */
import type { FacePackage } from 'facepack-solid'
import { createFaceRenderer, } from 'facepack-solid/renderer'
import { importExternalFacePacks } from 'facepack-solid/importer'
import "simple-img-lightbox/dist/style.css"

function deployRenderer(facePackages: FacePackage[]) {
    const render = createFaceRenderer({
        facePackages: facePackages
    })
    // 选择文章和评论里所有的p
    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit),#comments .commentwrap .body p')
        .forEach(render)
}
function load() {
    /*     initPV()
     */
    importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json')
        .then(fp => {
            deployRenderer(fp);
            import(
                /* webpackPreload: true */
                './selector')
                .then(({ default: deploySelector }) => deploySelector(fp))
        })
    import(
        /* webpackPreload: true */
        'simple-img-lightbox').then(({ deployOnWordpress }) => deployOnWordpress())
}
document.addEventListener('pjax:complete', load)
if (document.readyState === 'complete') {
    load()
} else { document.addEventListener('DOMContentLoaded', load) }
