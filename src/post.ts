import display from './display'
import fs from './fpselector'
import fd from './fpdisplay'
import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
import { initPV } from './pageview'
function load() {
    initPV()
    display()
    importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json')
        .then(fp => { fd(fp); fs(fp); })
}
document.addEventListener('pjax:complete', load)
if (document.readyState === 'complete') {
    load()
} else
    document.addEventListener('DOMContentLoaded', load)