
import Multiaddr from "multiaddr"
import { CancellableOptions } from "./common"

export interface IdResultObject {
    /**
     * the Peer ID
     */
    id: string;

    /**
     * the public key of the peer as a base64 encoded string
     */
    publicKey: string;

    /**
     * A list of multiaddrs this node is listening on
     */
    addresses: Multiaddr[];

    /**
     * The agent version
     */
    agentVersion?: string;

    /**
     * The supported protocol version
     */
    protocolVersion?: string
}

export interface DNSOptions extends CancellableOptions {
    /**
     * resolve until result is not a domain name
     * @default true
     */
    recursive?: boolean;
}

export interface PingOptions extends CancellableOptions {
    /**
     * the number of ping messages to send
     * @type integer
     * @default 10
     */
    count?: number;
}

export interface PingResponse {
    success: boolean;
    time: number;
    text: "" | string;
}

export interface ResolveOptions extends CancellableOptions {
    /**
     * Resolve until the result is an IPFS name
     * @default false
     */
    recursive?: boolean;

    /**
     * Multibase codec name the CID in the resolved path will be encoded with
     */
    cidBase?: string | "base58btc";
}

export interface MiscellaneousAPI {
    /**
     * Returns the identity of the Peer
     */
    id(options?: CancellableOptions): Promise<IdResultObject>;

    /**
     * Returns the implementation version
     * @returns An object with the version of the implementation, the commit and the Repo. `js-ipfs` instances will also return the version of `interface-ipfs-core` and `ipfs-http-client` supported by this node
     */
    version(options?: CancellableOptions): Promise<any>;

    /**
     * Resolve DNS links
     * @example 
     * ipfs.dns("ipfs.io")
     * @returns A string representing the IPFS path for that domain
     */
    dns(domain: string, options?: DNSOptions): Promise<string>

    /**
     * Stops the IPFS node and in case of talking with an IPFS Daemon, it stops the process.
     * @returns If action is successfully completed. Otherwise an error will be thrown
     */
    stop(options?: CancellableOptions): Promise<void>

    /**
     * Send echo request packets to IPFS hosts
     *  
     * Note that not all ping response objects are "pongs".  
     * A "pong" message can be identified by a truthy success property and an empty text property.  
     * Other ping responses are failures or status updates.
     * 
     * @param peerId ID of the peer to be pinged.
     * @param options 
     * @returns An async iterable that yields ping response objects
     */
    ping(peerId: string, options?: PingOptions): AsyncIterable<PingResponse>

    /**
     * Resolve the value of names to IPFS
     * 
     * There are a number of mutable name protocols that can link among themselves and into IPNS.  
     * For example IPNS references can (currently) point at an IPFS object, and DNS links can point at other DNS links, IPNS entries, or IPFS objects.  
     * This command accepts any of these identifiers and resolves them to the referenced item.
     * 
     * @param name The name to resolve
     * @param options 
     * @returns A string representing the resolved name
     */
    resolve(name: string, options?: ResolveOptions): Promise<string>
}
