
import CID from "cids"
import BigNumber from "bignumber.js"
import { CancellableOptions } from "./common"

export interface RepoGCOptions extends CancellableOptions {
    /**
     * writes a minimal output
     */
    quiet?: boolean;

    /**
     * stream errors.
     */
    "stream-errors": boolean;
}

export interface RepoGCResultObject {
    /**
     * is an Error if it was not possible to GC a particular block
     */
    err?: Error;

    /**
     * the CID of the block that was Garbage Collected.
     */
    cid?: CID;
}

export interface RepoStatOptions extends CancellableOptions {
    /**
     * output repoSize in MiB.
     */
    human?: boolean;
}

export interface RepoStatResultObject {
    numObjects: BigNumber;
    /**
     * in bytes if the `human` option is false
     */
    repoSize: BigNumber;
    repoPath: string;
    version: string;
    storageMax: BigNumber;
}

export interface RepoStatAPI {
    /**
     * Get stats for the currently used repo.  
     * `stats.repo` and `repo.stat` can be used interchangeably.
     * @returns An object containing the repo's info
     */
    (options?: RepoStatOptions): Promise<RepoStatResultObject>
}

export interface RepoAPI {
    /**
     * Perform a garbage collection sweep on the repo.
     * @returns An async iterable that yields objects describing nodes that were garbage collected
     */
    gc(options?: RepoGCOptions): AsyncIterable<RepoGCResultObject>

    readonly stat: RepoStatAPI;

    /**
     * Show the repo version.
     */
    version(options?: CancellableOptions): Promise<string>
}
