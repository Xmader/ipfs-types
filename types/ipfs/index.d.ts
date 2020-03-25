// Type definitions for ipfs 0.41
// Project: https://js.ipfs.io
// Definitions by: Xmader <https://github.com/Xmader>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import Repo from "ipfs-repo"
import PeerId from "peer-id"

import IPFSCoreAPIs from "interface-ipfs-core"

export as namespace ipfs

declare class IPFS {
    /**
     * Creates and returns a ready to use instance of an IPFS node.  
     * Use the options argument to specify advanced configuration.
     */
    static create(options?: CreateOptions): Promise<IPFS>;
}

declare interface IPFS extends IPFSCoreAPIs {

    /**
     * Start listening for connections with other IPFS nodes on the network.  
     * In most cases, you do not need to call this method — `IPFS.create()` will automatically do it for you.
     */
    start(): Promise<void>;

    /**
     * Close and stop listening for connections with other IPFS nodes, then release access to the node’s repo.
     */
    stop(): Promise<void>;

    libp2p: any;

}

export default IPFS

export interface CreateOptions {
    /**
     * The file path at which to store the IPFS node’s data.  
     * Alternatively, you can set up a customized storage system by providing an `ipfs.Repo` instance.
     * @default '~/.jsipfs' in Node.js, 'ipfs' in browsers
     */
    repo?: string | Repo;

    /**
     * js-ipfs comes bundled with a tool that automatically migrates your IPFS repository when a new version is available.
     * 
     * For apps that build on top of js-ipfs and run in the browser environment, be aware that disabling automatic migrations leaves the user with no way to run the migrations because there is no CLI in the browser. In such a case, you should provide a way to trigger migrations manually.
     * 
     * @default true
     */
    repoAutoMigrate?: boolean;

    /**
     * Perform repo initialization steps when creating the IPFS node.
     * 
     * Note that initializing a repo is different from creating an instance of ipfs.Repo. The IPFS constructor sets many special properties when initializing a repo, so you should usually not try and call repoInstance.init() yourself.
     * 
     * @default true
     */
    init?: boolean | InitializationOptions;

    /**
     * If false, do not automatically start the IPFS node.
     * Instead, you’ll need to manually call `node.start()` yourself.
     * @default true
     */
    start?: boolean;

    /**
     * A passphrase to encrypt/decrypt your keys.
     * @default null
     */
    pass?: string | null;

    /**
     * Prevents all logging output from the IPFS node.
     * @default false
     */
    silent?: boolean;

    /**
     * Configure circuit relay  
     * (see the [circuit relay tutorial](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs/examples/circuit-relaying) to learn more).
     */
    relay?: RelayOptions;

    /**
     * Run ipfs node offline.  
     * The node does not connect to the rest of the network but provides a local API.
     * @default false
     */
    offline?: boolean;

    /**
     * Configure remote preload nodes. The remote will preload content added on this node, and also attempt to preload objects requested by this node.
     */
    preload?: PreloadOptions;

    /**
     * Enable and configure experimental features.
     */
    EXPERIMENTAL?: {
        /**
         * Enable pub-sub on IPNS. 
         * @default false
         */
        ipnsPubsub?: boolean;

        /**
         * Enable directory sharding.  
         * Directories that have many child objects will be represented by multiple DAG nodes instead of just one.  
         * It can improve lookup performance when a directory has several thousand files or more. 
         * @default false
         */
        sharding?: boolean;
    };

    /**
     * Modify the default IPFS node config.  
     * This object will be merged with the default config; it will not replace it.  
     * The default config is documented in [the js-ipfs config file docs](https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs/docs/config.md).
     */
    config?: object;

    /**
     * Modify the default IPLD config.  
     * This object will be merged with the default config; it will not replace it.  
     * Check IPLD [docs](https://github.com/ipld/js-ipld#ipld-constructor) for more information on the available options.
     */
    ipld?: object;

    /**
     * The libp2p option allows you to build your libp2p node by configuration, or via a bundle function.  
     * If you are looking to just modify the below options, using the object format is the quickest way to get the default features of libp2p.  
     * If you need to create a more customized libp2p node, such as with custom transports or peer/content routers that need some of the ipfs data on startup, a custom bundle is a great way to achieve this.
     */
    libp2p?: any;

    /**
     * Configure the libp2p connection manager.
     */
    connectionManager?: object;
}

export interface InitializationOptions {
    /**
     * Whether to remove built-in assets, like the instructional tour and empty mutable file system, from the repo. 
     * @default false
     */
    emptyRepo?: boolean;

    /**
     * Number of bits to use in the generated key pair.
     * @default 2048
     */
    bits?: number;

    /**
     * A pre-generated private key to use.  
     * Can be either a base64 string or a PeerId instance.  
     * NOTE: This overrides bits.  
     * 
     * @example 
     * // Generating a Peer ID:
     * const PeerId = require('peer-id')
     * // Generates a new Peer ID, complete with public/private keypair
     * // See https://github.com/libp2p/js-peer-id
     * const peerId = await PeerId.create({ bits: 2048 })
     */
    privateKey?: string | PeerId;

    /**
     * A passphrase to encrypt keys.  
     * You should generally use the top-level pass option instead of the init.pass option (this one will take its value from the top-level option if not set).
     */
    pass?: string;

    /**
     * Apply profile settings to config.
     */
    profiles?: ReadonlyArray<any>;

    /**
     * Set to false to disallow initialization if the repo does not already exist.
     * @default true
     */
    allowNew?: boolean;
}

export interface RelayOptions {
    /**
     * Enable circuit relay dialer and listener.
     * @default true
     */
    enabled: boolean;

    hop: {
        /**
         * Make this node a relay (other nodes can connect *through* it). 
         * @default false
         */
        enabled: boolean;

        /**
         * Make this an *active* relay node.  
         * Active relay nodes will attempt to dial a destination peer even if that peer is not yet connected to the relay.
         * @default false
         */
        active: boolean;
    };
}

export interface PreloadOptions {
    /**
     * Enable content preloading
     * @default true
     */
    enabled: boolean;

    /**
     * Multiaddr API addresses of nodes that should preload content.  
     * NOTE: nodes specified here should also be added to your node's bootstrap address list at config.Boostrap.
     */
    addresses: ReadonlyArray<string>;
}
