import { _attachListeners, showModal, setImageModal, setContainer } from "simple-img-modal/src/deploy"

export default () => {
    const imgs:NodeListOf<HTMLElement> = document.querySelectorAll('div.entry-content img:not(.avatar)')
    if (imgs.length > 0) {
        const node = document.body.appendChild(document.createElement('div'))
        _attachListeners(imgs)
        import('simple-img-modal/src/ImageModalWithEXIF').then(({ ImageModalWithEXIF }) => {
            setImageModal(ImageModalWithEXIF)
            setContainer(node)
            showModal()
        })

    }
}