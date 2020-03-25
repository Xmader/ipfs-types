
export interface BitswapStatAPI {
    /**
     * @todo
     */
    (...args: any[]): any
}

/**
 * @todo
 */
export interface BitswapAPI {
    [x: string]: any;

    readonly stat: BitswapStatAPI;
}

