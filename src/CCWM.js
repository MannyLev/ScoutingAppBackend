export async function CCWM() {
    const OPR = await OPR();
    const DPR = await DPR();
    return Math.add(OPR, -DPR)
}