
import CID from 'cids'

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array
export type Bytes = Buffer | ArrayBuffer | TypedArray
export type Bloby = Blob | File

export type FileContent = Bytes | Bloby | string | Iterable<number> | Iterable<Bytes> | AsyncIterable<Bytes>

export type UnixTime = Date | { secs: number, nsecs?: number } | number[]
export type MTime = { secs: number, nsecs: number }

export type IPFSPath = string | CID | Buffer
