/**部署样板 */
import { FacePackage } from 'face-pack/src/FacePackage'
import FaceSelectorDeployer from 'face-pack/src/selector/deployer/FaceSelectorDeployer'

export default (facePackages: FacePackage[]) => {
    const comment = document.querySelector('#comment')
    const handleSelect = (pack, face) => (comment as HTMLTextAreaElement).value += `:${pack.id}.${face.id}:`
    const deployer = new FaceSelectorDeployer({
        facePackages,
        onFaceSelected: handleSelect,
        peakPopperOptions: {
            placement: "right", modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 20],
                    },
                },
            ],
        }, self: document.querySelector('.emotion-box'),className:' '

    }).render().switchHide()
    document.getElementById('emotion-toggle').addEventListener('click',()=>{
        deployer.switchHide()
    })
}
