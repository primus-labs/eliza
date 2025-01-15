import { Plugin, elizaLogger } from "@elizaos/core";

import fheAction from "./actions/primusfhe";
elizaLogger.success(`=========== load runfheAction ================`);

export const primusfhePlugin: Plugin = {
    name: "prime-fhe",
    description: "Execute the FHE plugin for secure data processing",
    actions: [fheAction],
    evaluators: [],
    providers: [],
};

export default primusfhePlugin;