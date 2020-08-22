
import BigNumber from "bignumber.js"
import { BitswapStatAPI } from "./bitswap"
import { RepoStatAPI } from "./repo"
import { CancellableOptions } from "./common"

export interface BandwidthStatOptions extends CancellableOptions {
    /**
     * specifies a peer to print bandwidth for
     */
    peer?: any;

    /**
     * specifies a protocol to print bandwidth for
     */
    proto?: any;

    /**
     * yield bandwidth info at an interval
     */
    poll?: boolean;

    /**
     * the time interval to wait between updating output, if poll is true
     */
    interval?: number;
}

/**
 * all numbers are in bytes
 */
export interface BandwidthStat {
    totalIn: BigNumber;
    totalOut: BigNumber;
    rateIn: BigNumber;
    rateOut: BigNumber;
}

export interface StatsAPI {
    /**
     * Show diagnostic information on the bitswap agent.  
     * Note: `stats.bitswap` and `bitswap.stat` can be used interchangeably. See bitswap.stat for more details.
     */
    readonly bitswap: BitswapStatAPI;

    /**
     * Get stats for the currently used repo.  
     * Note: `stats.repo` and `repo.stat` can be used interchangeably. See repo.stat for more details.
     */
    readonly repo: RepoStatAPI;

    /**
     * Get IPFS bandwidth information.
     * @returns An async iterable that yields IPFS bandwidth information
     */
    bw(options?: BandwidthStatOptions): AsyncIterable<BandwidthStat>
}
