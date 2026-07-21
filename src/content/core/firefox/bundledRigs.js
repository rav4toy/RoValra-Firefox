import rigR15Base64 from '../../../../assets/RigR15.rbxm';
import rigR6Base64 from '../../../../assets/RigR6.rbxm';

function decodeBundledRig(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
}

const bundledRigs = {
    R15: decodeBundledRig(rigR15Base64),
    R6: decodeBundledRig(rigR6Base64),
};

/**
 * Return a fresh extension-owned buffer for the bundled avatar rig.
 *
 * Firefox wraps values returned by a page-associated `fetch()` in an Xray
 * compartment, even when the URL points at this extension. RoAvatar's binary
 * parser legitimately inspects typed-array constructors, which Firefox denies
 * on those wrapped values. Esbuild's binary loader creates these bytes inside
 * the extension compartment and avoids that boundary entirely. The explicit
 * decoder also avoids relying on a browser's `Uint8Array.fromBase64` support.
 */
export function getBundledRigBuffer(rigType) {
    const rigBytes = bundledRigs[rigType];
    if (!rigBytes) {
        throw new TypeError(`Unsupported bundled avatar rig: ${rigType}`);
    }

    return rigBytes.buffer.slice(
        rigBytes.byteOffset,
        rigBytes.byteOffset + rigBytes.byteLength,
    );
}
