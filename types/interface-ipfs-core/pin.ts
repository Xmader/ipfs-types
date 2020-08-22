
import CID from 'cids'
import { CancellableOptions } from "./common"

type PinType = "recursive" | "direct" | "indirect"

export interface PinAddOptions extends CancellableOptions {
    /**
     * Recursively pin the object linked.
     * @default true
     */
    recursive?: boolean;
}

export interface PinLsOptions extends CancellableOptions {
    /**
     * filter by this type of pin
     */
    type?: PinType;
}

export interface PinLsResultObject {
    /**
     * CID of the pinned node
     */
    cid: CID;

    /**
     * the pin type
     */
    type: PinType;
}

export interface PinRmOptions extends CancellableOptions {
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
