
import { _attachListeners, showModal, setImageModal, setContainer } from "simple-img-modal/src/deploy"
import { ImageModalWithEXIF } from 'simple-img-modal/src/ImageModalWithEXIF'

export default  () => {
    const node = document.body.appendChild(document.createElement('div'))
    setImageModal(ImageModalWithEXIF)
    setContainer(node)
    _attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
    showModal()
}