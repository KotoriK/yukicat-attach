import imageModal from './imageModal'
import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
import { initPV } from 'pageview'
import { deployRenderer, deploySelector } from 'facepack-solid'
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