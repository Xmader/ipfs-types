

export interface KeyGenOptions {
    /**
     * the key type  
     * Note: js-ipfs will not support 'ed25519' until libp2p/js-libp2p-crypto#145 is resolved
     */
    type?: "rsa" | "ed25519";

    /**
     * the key size in bits
     */
    size?: number;
}

/**
 * An object that describes the key;
 */
export interface KeyInfo {
    /**
     * the name of the key  
     * (the local name for the key)
     */
    name: string;

    /**
     * the hash of the key  
     * (public key's multihash)
     * @example "QmYWqAFvLWb2G5A69JGXui2JJXzaHXiUEmQkQgor6kNNcJ"
     */
    id: string;
}

export interface KeyRenameResult {
    /**
     * the hash of the key
     */
    id: string;

    /**
     * the old name of the key
     */
    was: string;

    /**
     * the new name for key
     */
    now: string;

    overwrite: boolean;
}

export interface KeyAPI {
    /**
     * Generate a new key
     * @param name the local name for the key
     * @param options 
     * @returns An object that describes the key; `name` and `id`
     */
    gen(name: string, options?: KeyGenOptions): Promise<KeyInfo>

    /**
     * List all the keys
     * @returns An array representing all the keys
     */
    list(): Promise<KeyInfo[]>

    /**
     * Remove a key
     * @param name the local name for the key
     * @returns An object that describes the removed key
     */
    rm(name: string): Promise<KeyInfo>

    /**
     * Rename a key
     * @param oldName the local name for the key
     * @param newName a new name for key
     * @returns An object that describes the renamed key
     */
    rename(oldName: string, newName: string): Promise<KeyRenameResult>

    /**
     * Export a key in a PEM encoded password protected PKCS #8
     * @param name the local name for the key
     * @param password the password to protect the key
     * @returns The string representation of the key (PEM encoded)
     */
    export(name: string, password: string): Promise<string>

    /**
     * Import a PEM encoded password protected PKCS #8 key
     * @param name a local name for the key
     * @param pem the PEM encoded key
     * @param password the password that protects the PEM key
     */
    import(name: string, pem: string, password: string): Promise<KeyInfo>
}

