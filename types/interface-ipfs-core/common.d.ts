
import CID from 'cids'

interface UnixTimeObj {
    /**
     * the number of seconds since (positive) or before (negative) the Unix Epoch began
     */
    secs: number;

    /**
     * the number of nanoseconds since the last full second.
     */
    nsecs?: number;
}

/**
 * As an array of numbers, it must have two elements, as per the output of [`process.hrtime()`](https://nodejs.org/dist/latest/docs/api/process.html#process_process_hrtime_time).
 */
type UnixTimeArr = [number, number]

export type UnixTime = Date | UnixTimeObj | UnixTimeArr
export type MTime = Required<UnixTimeObj>

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
