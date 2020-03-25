
interface NamePublishOptions {
    /**
     * Resolve given path before publishing.
     * @default true
     */
    resolve?: boolean;

    /**
     * Time duration of the record. 
     * @default "24h"
     */
    lifetime?: string;

    /**
     * Time duration this record should be cached
     */
    ttl?: string;

    /**
     * Name of the key to be used. 
     * @default "self"
     */
    key?: string;

    /**
     * When offline, save the IPNS record to the the local datastore without broadcasting to the network instead of simply failing.
     */
    allowOffline?: boolean;
}

/**
 * An object that contains the IPNS hash and the IPFS hash
 */
interface NamePublishResultObject {
    /**
     * @example "/ipns/QmHash.."
     */
    name: string;
    /**
     * @example "/ipfs/QmHash.."
     */
    value: string;
}

interface NameResolveOptions {
    /**
     * Resolve until the result is not an IPNS name
     * @default false
     */
    recursive?: boolean;

    /**
     * Do not use cached entries
     * @default false
     */
    nocache?: boolean;
}

export interface NamePubsubAPI {
    /**
     * Cancel a name subscription.
     * @param arg the name of the subscription to cancel.
     */
    cancel(arg: string): Promise<{ canceled: boolean; }>

    /**
     * Query the state of IPNS pubsub.
     */
    state(): Promise<{ enabled: boolean; }>

    /**
     * Show current name subscriptions.
     * @returns An array of subscriptions (ipns names)
     * @example ["/ipns/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm"]
     */
    subs(): Promise<string[]>
}

export interface NameAPI {
    /**
     * Publish an IPNS name with a given value.
     * @param value a base58 encoded IPFS multihash
     * @param options 
     */
    publish(value: string, options?: NamePublishOptions): Promise<NamePublishResultObject>

    readonly pubsub: NamePubsubAPI;

    /**
     * Resolve an IPNS name.
     * @param value a IPNS address, such as: `/ipns/ipfs.io` , `/ipns/QmHash..`
     * @returns An async iterable that yields strings that are increasingly more accurate resolved paths.
     */
    resolve(value: string, options?: NameResolveOptions): AsyncIterable<string>
}
