/**部署样板 */
import FaceDisplay from 'face-pack/src/FaceDisplay/FaceDisplay'
import { FacePackage } from 'face-pack/src/FacePackage'

export default (facePackages: FacePackage[]) => {
    const display = new FaceDisplay(facePackages)
    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit)').forEach((v) => {
        if (v.childElementCount > 0) {
            Array.from(v.childNodes).forEach(display.render)
        } else {
            display.render(v)
        }
    })
}