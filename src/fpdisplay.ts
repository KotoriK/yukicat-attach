/**部署样板 */
import FaceDisplay from 'face-pack/src/display/FaceDisplay'
import { FacePackage } from 'face-pack/src/FacePackage'

export default (facePackages: FacePackage[]) => {
    const { render } = new FaceDisplay(facePackages)
    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit),.commentwrap .body > p')
        .forEach(render)
}