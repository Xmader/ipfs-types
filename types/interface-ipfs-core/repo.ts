
import CID from "cids"
import BigNumber from "bignumber.js"

interface RepoGCOptions {
    /**
     * writes a minimal output
     */
    quiet?: boolean;

    /**
     * stream errors.
     */
    "stream-errors": boolean;
}

interface RepoGCResultObject {
    /**
     * is an Error if it was not possible to GC a particular block
     */
    err?: Error;

    /**
     * the CID of the block that was Garbage Collected.
     */
    cid?: CID;
}

interface RepoStatOptions {
    /**
     * output repoSize in MiB.
     */
    human?: boolean;
}

interface RepoStatResultObject {
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
    version(): Promise<string>
}
