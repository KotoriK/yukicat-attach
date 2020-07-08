import { _attachListeners, showModal } from "simple-img-modal/src/deploy"
_attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
showModal()