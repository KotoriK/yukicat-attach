import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
import FaceDisplay from 'face-pack/src/FaceDisplay/FaceDisplay'
import { _attachListeners, showModal, setImageModal, setContainer } from "simple-img-modal/src/deploy"
import { ImageModalWithEXIF } from 'simple-img-modal/src/ImageModalWithEXIF'

(async () => {
    const display = new FaceDisplay(await importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json'))
    const node = document.createElement('div')
document.body.appendChild(node)
setImageModal(ImageModalWithEXIF)
setContainer(node)
_attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
showModal()
    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit)').forEach((v) => {
        display.render(v)
    })
})()