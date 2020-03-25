
import CID from 'cids'

type PinType = "recursive" | "direct" | "indirect"

interface PinAddOptions {
    /**
     * Recursively pin the object linked.
     * @default true
     */
    recursive?: boolean;

    /**
     * Throw an error if the request does not complete within the specified milliseconds timeout.  
     * If `timeout` is a string, the value is parsed as a human readable duration.  
     * There is no timeout by default.
     */
    timeout?: string | number;
}

interface PinLsOptions {
    /**
     * filter by this type of pin
     */
    type?: PinType;
}

interface PinLsResultObject {
    /**
     * CID of the pinned node
     */
    cid: CID;

    /**
     * the pin type
     */
    type: PinType;
}

interface PinRmOptions {
    /**
     * Recursively unpin the object linked.
     * @default true
     */
    recursive?: boolean;
}

export interface PinAPI {
    /**
     * Adds an IPFS object to the pinset and also stores it to the IPFS repo.  
     * pinset is the set of hashes currently pinned (not gc'able).
     * @param hash an IPFS multihash
     * @param options 
     * @returns An array of objects that represent the files that were pinned
     */
    add(hash: string, options?: PinAddOptions): Promise<{ cid: CID }[]>

    /**
     * List all the objects pinned to local storage or under a specific hash.
     * @param cid a CID instance or CID as a string or an array of CIDs.
     * @param options 
     */
    ls(cid?: CID | string | (CID | string)[], options?: PinLsOptions): AsyncIterable<PinLsResultObject>

    /**
     * Remove a hash from the pinset
     * @param hash an IPFS multihash
     * @param options 
     * @returns An array of unpinned objects
     */
    rm(hash: string, options?: PinRmOptions): Promise<{ cid: CID }[]>
}
