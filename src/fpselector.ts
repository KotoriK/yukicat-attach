/**部署样板 */
import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
import FaceSelectorDeployer from 'face-pack/src/FaceSelector/FaceSelectorDeployer'
(async () => {
    const commentArea = (document.getElementById('comment') as HTMLTextAreaElement) ?? document.querySelector('div.ql-editor > p:nth-last-child(1)')
    new FaceSelectorDeployer({
        popcorn: document.getElementById('show-fs'),
        facePackages: await importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json'),
        onFaceSelected:
            (pack, face) => {
                commentArea.value += `:${pack.id}.${face.id}:`
            },
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