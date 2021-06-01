import { attachListeners, showModal, setImageModal, setContainer } from "simple-img-modal/src/deploy"
import { ImageModalWithEXIF } from 'simple-img-modal/src/ImageModalWithEXIF'
const node = document.createElement('div')
document.body.appendChild(node)
setImageModal(ImageModalWithEXIF)
setContainer(node)
attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
showModal()