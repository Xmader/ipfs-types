
/// <reference lib="dom" />

import CID from 'cids'
import BufferList from 'bl'
import { Bytes, Bloby, FileContent, UnixTime, MTime, IPFSPath, CancellableOptions } from "./common"

export interface FileObject {
    /** The path you want to the file to be accessible at from the root CID _after_ it has been added */
    path?: string;
    /** The contents of the file (see below for definition) */
    content?: FileContent;
    /** File mode to store the entry with (see https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation) */
    mode?: number | string;
    /** The modification time of the entry (see below for definition) */
    mtime?: UnixTime;
}

export interface IPFSAddOptions extends CancellableOptions {
    /** 
     * chunking algorithm used to build ipfs DAGs. Available formats:
     * - size-{size}
     * - rabin
     * - rabin-{avg}
     * - rabin-{min}-{avg}-{max}
     * @default "size-262144"
     */
    chunker?: string | "size-262144";

    /**
     * the CID version to use when storing the data (storage keys are based on the CID, including its version).
     * @default 0
     */
    cidVersion?: number;

    /**
     * allows to create directories with an unlimited number of entries currently size of unixfs directories is limited by the maximum block size. Note that this is an experimental feature.
     */
    enableShardingExperiment?: boolean;

    /**
     * multihash hashing algorithm to use.
     * @default "sha2-256"
     */
    hashAlg?: string | "sha2-256";

    /**
     * doesn't actually add the file to IPFS, but rather calculates its hash.
     * @default false
     */
    onlyHash?: boolean;

    /**
     * pin this object when adding.
     * @default true
     */
    pin?: boolean;

    /**
     * a function that will be called with the byte length of chunks as a file is added to ipfs.
     */
    progress?: Function;

    /**
     * if true, DAG leaves will contain raw file data and not be wrapped in a protobuf.
     * @default false
     */
    rawLeaves?: boolean;

    /**
     * specifies the maximum size of unsharded directory that can be generated.
     * @type integer
     * @default 1000
     */
    shardSplitThreshold?: number;

    /**
     * if true will use the trickle DAG format for DAG generation.
     * @default false
     */
    trickle?: boolean;

    /**
     * adds a wrapping node around the content.
     * @default false
     */
    wrapWithDirectory?: boolean;
}

export interface IPFSAddResultObject {
    path: string;
    cid: CID;
    mode: number;
    mtime: MTime;
    size: number;
}

export interface IPFSCatOptions extends CancellableOptions {
    offset?: number;
    length?: number;
}

export interface IPFSGetResultObject {
    path: string;
    content: AsyncIterable<BufferList>;
    mode: number;
    mtime: MTime;
}

export interface IPFSLsResultObject {
    depth: number;
    name: string;
    path: string;
    size: number;
    cid: CID;
    type: string;
    mode: number;
    mtime: MTime;
}

export interface RegularFilesAPI {

    /**
     * Import files and data into IPFS.
     */
    add(
        data: Bytes | Bloby | string | FileObject
            | Iterable<number> | Iterable<Bytes> | Iterable<Bloby> | Iterable<string> | Iterable<FileObject>
            | AsyncIterable<Bytes> | AsyncIterable<Bloby> | AsyncIterable<string> | AsyncIterable<FileObject>,
        options?: IPFSAddOptions
    ): AsyncIterable<IPFSAddResultObject>;

    /**
     * Returns a file addressed by a valid IPFS Path.
     */
    cat(
        ipfsPath: IPFSPath,
        options?: IPFSCatOptions
    ): AsyncIterable<Buffer>

    /**
     * Fetch a file or an entire directory tree from IPFS that is addressed by a valid IPFS Path.
     */
    get(ipfsPath: IPFSPath, options?: CancellableOptions): AsyncIterable<IPFSGetResultObject>

    /**
     * Lists a directory from IPFS that is addressed by a valid IPFS Path.
     */
    ls(ipfsPath: IPFSPath, options?: CancellableOptions): AsyncIterable<IPFSLsResultObject>
}

/**
 * @todo
 */
export interface MutableFilesAPI {
    [x: string]: any;
}
