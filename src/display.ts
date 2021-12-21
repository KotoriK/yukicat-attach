export default () => {
    const imgs: NodeListOf<HTMLElement> = document.querySelectorAll('div.entry-content img:not(.avatar)')
    if (imgs.length > 0) {
        const node = document.body.appendChild(document.createElement('div'))
        import("simple-img-modal/src/deploy.new").then(({ attachListeners, showModal, setContainer }) => {
            attachListeners(imgs)
            setContainer(node)
        })
    }
}