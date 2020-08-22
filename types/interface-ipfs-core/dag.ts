
import CID from 'cids'
import { CancellableOptions } from "./common"

export interface DagPutOptions extends CancellableOptions {
    /**
     * The IPLD format multicodec
     * @default "dag-cbor"
     */
    format?: string | "dag-cbor" | "dag-pb" | "raw";

    /**
     * The hash algorithm to be used over the serialized DAG node
     */
    hashAlg?: string | "sha2-256";

    /**
     * The CID of the node passed.  
     * Note: You should pass the CID or the format + hashAlg pair but not both.
     */
    cid?: CID;

    /**
     * Pin this node when adding
     * @default false
     */
    pin?: boolean;
}

export interface DagGetOptions extends CancellableOptions {
    /**
     * An optional path within the DAG to resolve
     */
    path?: string;

    /**
     * if set to true, it will avoid resolving through different objects.
     */
    localResolve?: boolean;
}

export interface DagGetResultObject {
    /**
     * the value or node that was fetched during the get operation.
     */
    value: object;

    /**
     * The remainder of the Path that the node was unable to resolve or what was left in a localResolve scenario.
     */
    remainderPath: string;
}

export interface DagTreeOptions extends CancellableOptions {
    /**
     * An optional path within the DAG to resolve
     */
    path?: string;

    /**
     * if set to true, it will follow the links and continuously run tree on them, returning all the paths in the graph.
     */
    recursive?: boolean;
}

export interface DagResolveOptions extends CancellableOptions {
    /**
     * If `ipfsPath` is a CID, you may pass a path here
     */
    path?: string;
}

/**
 * The dag API comes to replace the object API, it supports the creation and manipulation of dag-pb object, as well as other IPLD formats (i.e dag-cbor, ethereum-block, git, etc)
 */
export interface DagAPI {
    /**
     * Store an IPLD format node
     * @param dagNode a DAG node that follows one of the supported IPLD formats.
     * @param options 
     */
    put(dagNode: object, options?: DagPutOptions): Promise<CID>

    /**
     * Retrieve an IPLD format node
     * @param cid A DAG node that follows one of the supported IPLD formats
     * @param options 
     */
    get(cid: CID, options?: DagGetOptions): Promise<DagGetResultObject>

    /**
     * Enumerate all the entries in a graph
     * @param cid A DAG node that follows one of the supported IPLD formats
     * @param options 
     * @returns An array with the paths passed
     */
    tree(cid: CID, options?: DagTreeOptions): Promise<Array<string>>

    /**
     * Returns the CID and remaining path of the node at the end of the passed IPFS path
     * @param ipfsPath  An IPFS path, e.g. `/ipfs/bafy/dir/file.txt` or a CID instance
     * @param options 
     * @returns  The last CID encountered during the traversal and the path to the end of the IPFS path inside the node referenced by the CID
     */
    resolve(ipfsPath: string | CID, options?: DagResolveOptions): Promise<{ cid: CID, remainderPath: string }>
}
