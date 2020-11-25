/**部署样板 */
import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
import FaceDisplay from 'face-pack/src/FaceDisplay/FaceDisplay'
import { FacePackage } from 'face-pack/src/FacePackage'

export default (facePackages: FacePackage[]) => {
    const display = new FaceDisplay(facePackages)
    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit)').forEach((v) => {
        if (v.childElementCount > 0) {
            v.childNodes.forEach(c => display.render(c as HTMLElement))
        } else {
            display.render(v)
        }
    })
}