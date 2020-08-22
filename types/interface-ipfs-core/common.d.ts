
import CID from 'cids'

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array
export type Bytes = Buffer | ArrayBuffer | TypedArray
export type Bloby = Blob | File

export type FileContent = Bytes | Bloby | string | Iterable<number> | Iterable<Bytes> | AsyncIterable<Bytes>

export type UnixTime = Date | { secs: number, nsecs?: number } | number[]
export type MTime = { secs: number, nsecs: number }

export type IPFSPath = string | CID | Buffer

/**
 * cancellable api calls
 * @since [0.44.0](https://github.com/ipfs/js-ipfs/releases/tag/ipfs%400.44.0)
 */
export interface CancellableOptions {
    /**
     * A timeout in ms
     */
    timeout?: number;

    /**
     * Can be used to cancel any long running requests started as a result of this call
     */
    signal?: AbortSignal;
}
