import { exec, spawn } from 'child_process';
import { FheOperate } from './FheOperate';
import { fheProviderInstPath } from "./primusfhe";
import { elizaLogger } from "@elizaos/core";

/********************************************************************************************
 * The PrimusFheOperate class will utilize the comprehensive FHE functionality provided by the Primus open-source Aegis framework.
 * Currently, it employs the demo features from fhe-transpiler-demo as a basic demonstration.
 * The GitHub repository for fhe-transpiler-demo is: https://github.com/primus-labs/fhe-transpiler-demo.
 *********************************************************************************************/
export class PrimusFheOperate extends FheOperate {
    async encrypt(data_file: string): Promise<boolean> {
        elizaLogger.info("encrypt context:", data_file);

        const scriptEncrypt = fheProviderInstPath + "user-server-test/encrypt.sh";
        try {
            const result = await this.execScript(scriptEncrypt);
            return result;
        } catch (error) {
            elizaLogger.error("Encryption failed:", error);
            return false;
        }
    }

    async evaluate(data_file: string, ...others: string[]): Promise<boolean> {
        elizaLogger.info("evaluate context:", data_file);

        const scriptEval = fheProviderInstPath + "user-server-test/eval.sh";
        try {
            const result = await this.execScript(scriptEval);
            return result;
        } catch (error) {
            elizaLogger.error("Evaluation failed:", error);
            return false;
        }
    }

    async decrypt(data_file: string): Promise<boolean> {
        elizaLogger.info("decrypt context:", data_file);

        const scriptDecrypt = fheProviderInstPath + "user-server-test/decrypt.sh";
        try {
            const result = await this.execScript(scriptDecrypt);
            return result;
        } catch (error) {
            elizaLogger.error("Decryption failed:", error);
            return false;
        }
    }

    async compile(func_str: string): Promise<boolean> {
        elizaLogger.info("compile context:", func_str);

        const scriptCompile = fheProviderInstPath + "user-server-test/compile.sh";
        //const command = `gnome-terminal -- bash -c "bash ${scriptCompile}; exec bash"`;
        try {
            const result = await this.execScript(scriptCompile);
            return result;
        } catch (error) {
            elizaLogger.error("Compile failed:", error);
            return false;
        }
    }

    execScript(script_file: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            exec(script_file, (error, stdout, stderr) => {
                if (error) {
                    elizaLogger.error(`error: ${error.message}`);
                    resolve(false);
                    return;
                }

                if (stderr) {
                    elizaLogger.error(`error: ${stderr}`);
                    resolve(false);
                    return;
                }

                elizaLogger.log(`run script successfully.`);
                elizaLogger.log(`run detail infos:, ${stdout}`);
                resolve(true);
            });
        });
    }
}