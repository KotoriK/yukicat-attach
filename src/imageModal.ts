import { renderLightbox } from "simple-img-lightbox"
import { createSignal } from "solid-js"
export default () => {
    const entryContent = document.querySelector('div.entry-content')
    if (entryContent) {
        const imgs: NodeListOf<HTMLElement> = entryContent.querySelectorAll('img:not(.avatar)')
        if (imgs.length > 0) {
            const node = document.body.appendChild(document.createElement('div'))
            const [img, setImg] = createSignal<HTMLImageElement | undefined>(undefined, { equals: false })
            entryContent.addEventListener('click', (e) => {
                const { target } = e
                if (target instanceof HTMLImageElement) {
                    if (target.classList.contains('avatar')) {
                        return
                    }
                    setImg(target)
                }
            })
            renderLightbox(img, node)
            /*         import("simple-img-modal/src/deploy.new").then(({ attachListeners, showModal, setContainer }) => {
                        attachListeners(imgs)
                        setContainer(node)
                    }) */
        }
    }
}
