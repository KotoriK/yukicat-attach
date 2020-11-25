/**部署样板 */
import { FacePackage } from 'face-pack/src/FacePackage'
import FaceSelectorDeployer from 'face-pack/src/FaceSelector/FaceSelectorDeployer'
const handleSelect = (() => {
    let cache
    return () => {
        if (cache) { return cache }
        else {
            const wpdiscuz = document.querySelector('div.ql-editor > p:nth-last-child(1)')
            let legacy_blocksy
            const result = wpdiscuz ? (pack, face) => wpdiscuz.innerHTML += `:${pack.id}.${face.id}:` : (legacy_blocksy = (document.getElementById('comment') as HTMLTextAreaElement), (pack, face) =>
                legacy_blocksy.value += `:${pack.id}.${face.id}:`)
            cache = result
            return result
        }
    }
})()
export default  (facePackages:FacePackage[]) => {
    const tooltip = document.documentElement.appendChild(document.createElement('div'))
    tooltip.style.zIndex = '999'
    new FaceSelectorDeployer({
        popcorn: document.getElementById('show-fs'),
        tooltip,
        facePackages,
        onFaceSelected: handleSelect(),
        popperOptions: { placement: 'top' }, peakPopperOptions: {
            placement: "right", modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 20],
                    },
                },
            ],
        }
    }).render().hide()
}