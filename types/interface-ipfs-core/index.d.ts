
import { RegularFilesAPI, MutableFilesAPI } from "./files"
import { RefsAPI } from "./refs"
import { DagAPI } from "./dag"
import { PinAPI } from "./pin"
import { ObjectAPI } from "./object"
import { BlockAPI } from "./block"
import { BitswapAPI } from "./bitswap"
import { NameAPI } from "./name"
import { KeyAPI } from "./key"
import { BootstrapAPI } from "./bootstrap"
import { DistributedHashTableAPI } from "./dht"
import { PubSubAPI } from "./pubsub"
import { SwarmAPI } from "./swarm"
import { MiscellaneousAPI } from "./miscellaneous"
import { RepoAPI } from "./repo"
import { StatsAPI } from "./stats"
import { ConfigAPI } from "./config"

export interface IPFSCoreAPIs extends RegularFilesAPI, MiscellaneousAPI {
    files: MutableFilesAPI;
    refs: RefsAPI;
    dag: DagAPI;
    pin: PinAPI;
    object: ObjectAPI;
    block: BlockAPI;
    bitswap: BitswapAPI;
    name: NameAPI;
    key: KeyAPI;
    bootstrap: BootstrapAPI;
    dht: DistributedHashTableAPI;
    pubsub: PubSubAPI;
    swarm: SwarmAPI;
    repo: RepoAPI;
    stats: StatsAPI;
    config: ConfigAPI;
}

export default IPFSCoreAPIs
