/**部署样板 */
import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
import FaceSelectorDeployer from 'face-pack/src/FaceSelector/FaceSelectorDeployer'
(async () => {
    const tooltip = document.documentElement.appendChild(document.createElement('div'))
    tooltip.style.zIndex = '999'
    const commentArea = (() => {
        let cache
        return () => {
            if (cache) return cache;
            else {
                const result = (document.getElementById('comment') as HTMLTextAreaElement) ?? document.querySelector('div.ql-editor > p:nth-last-child(1)')
                cache = result
                return result
            }
        }
    })()
    new FaceSelectorDeployer({
        popcorn: document.getElementById('show-fs'),
        tooltip,
        facePackages: await importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json'),
        onFaceSelected:
            (pack, face) =>
                commentArea().value += `:${pack.id}.${face.id}:`
        ,
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
})()