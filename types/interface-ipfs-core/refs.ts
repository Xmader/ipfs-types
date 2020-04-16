
import { IPFSPath } from './common'

export interface RefsOptions {
    /**
     * recursively list references of child nodes
     * @default false
     */
    recursive?: boolean;

    /**
     * omit duplicate references from output
     * @default false
     */
    unique?: boolean;

    /**
     * output edges with given format.
     * @default "<dst>"
     */
    format?: "<src>" | "<dst>" | "<linkname>"

    /**
     * output references in edge format: "<src> -> <dst>"
     */
    edges?: boolean;

    /**
     * only for recursive refs, limits fetch and listing to the given depth
     * @default 1
     */
    maxDepth?: number;

    /**
     * Throw an error if the request does not complete within the specified milliseconds timeout. If timeout is a string, the value is parsed as a human readable duration. There is no timeout by default.
     */
    timeout: number | string;
}

export interface RefsResultObject {
    ref: string;
    err: Error | null;
}

export interface RefsAPI {
    /**
     * Get links (references) from an object.
     */
    (ipfsPath: IPFSPath, options?: RefsOptions): AsyncIterable<RefsResultObject>

    /**
     * Output all local references (CIDs of all blocks in the blockstore)
     */
    local(): AsyncIterable<RefsResultObject>
}
