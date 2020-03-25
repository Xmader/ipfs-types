
import CID from 'cids'

interface DagPutOptions {
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

interface DagGetOptions {
    /**
     * if set to true, it will avoid resolving through different objects.
     */
    localResolve?: boolean;
}

interface DagGetResultObject {
    /**
     * the value or node that was fetched during the get operation.
     */
    value: object;

    /**
     * The remainder of the Path that the node was unable to resolve or what was left in a localResolve scenario.
     */
    remainderPath: string;
}

interface DagTreeOptions {
    /**
     * if set to true, it will follow the links and continuously run tree on them, returning all the paths in the graph.
     */
    recursive?: boolean;
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
     * @param cid a CID instance, or a CID in its String format, or a CID in its String format concatenated with the path to be resolved
     * @param path the path to be resolved.
     * @param options 
     */
    get(cid: CID | string, path?: string, options?: DagGetOptions): Promise<DagGetResultObject>

    /**
     * Enumerate all the entries in a graph
     * @param cid a CID instance, or a CID in its String format, or a CID in its String format concatenated with the path to be resolved
     * @param path the path to be resolved.
     * @param options 
     * @returns An array with the paths passed
     */
    tree(cid: CID | string, path?: string, options?: DagTreeOptions): Promise<Array<string>>
}
