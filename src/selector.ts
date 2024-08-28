import { setStyleSetting, defaultStyle, type FacePackage } from "facepack-solid"
import { deploySelector } from "facepack-solid/SakurairoDeployer"

export default (fp: FacePackage[]) => {
    setStyleSetting(defaultStyle)
    deploySelector(fp)
}