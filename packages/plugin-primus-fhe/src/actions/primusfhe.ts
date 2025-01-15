import { PrimusFheOperate,  } from './PrimusFheOperate';
import * as fs from 'fs';
import {
    ActionExample,
    //Content,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    //ModelClass,
    State,
    type Action,
    elizaLogger,
    // composeContext,
    // generateObject,
} from "@elizaos/core";


export let fheProviderInstPath = "~/work/fhe-transpiler-demo/";
let isSetFheProviderPath = false;


function extractFileName(content: string): string[] {
    const regex = /(?:[A-Za-z]:\\|\/)?(?:[^\/\s]+\/)*[^\/\s]+\.[^\s\/]+/g;
    let match;
    const fileNames: string[] = [];

    while ((match = regex.exec(content)) !== null) {
        fileNames.push(match[0]);
    }

    return fileNames;
}

function extractPath(text: string): string | null {
    const pathRegex = /\/(?:[\w-]+(?:\/[\w-]+)*\/?)/g;
    const match = text.match(pathRegex);
    return match ? match[0] : null;
}

const fheAction: Action = {
    name: "FHE_BLUR_IMAGE",
    similes: [
        "PRIVACY_PRESERVE",
        "SENSITIVE_DATA",
        "ENCRYPT",
        "DECRYPT",
        "COMPILE"
    ],
    description: "It is designed to run Fully Homomorphic Encryption (FHE) demos, showcasing secure computations on encrypted data, including encryption, decryption, compile, and evaluation functions.",
    suppressInitialMessage: true,
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        elizaLogger.debug(`------------ call fhe run action validate function ------------`);
        const keywords = [
            "encrypt",
            "encrypted",
            "sensitive data",
            "privacy-preserving",
            "blurring",
            "blurred",
            "decrypt",
            "decrypted",
            "fully homomorphic encryption",
            "fhe",
        ];
        if (
            !keywords.some((keyword) => message.content.text.toLowerCase().includes(keyword)
            )
        ) {
            elizaLogger.info("Unable to invoke the handler function to run the FHE demo.");
            return false;
        }

        elizaLogger.info("fheplugin validate memory:", message.content.text);
        elizaLogger.info("fheplugin action:", message.content.action);
        elizaLogger.info("It will invoke the handler function to run the FHE demo.");
        return true;
    },

    handler: async (runtime: IAgentRuntime,
                    message: Memory,
                    _state: State,
                    _options: any,
                    callback: HandlerCallback) : Promise<Boolean>  => {
        elizaLogger.debug(`------------------ begint to run fhe action ----------------`);
        elizaLogger.info(`--------------------- memory info ------------------------`);
        elizaLogger.info("fheplugin memory content:", message.content.text);
        elizaLogger.info("fheplugin action:", message.content.action);
        elizaLogger.info("fheplugin agent id:", message.content.agentId);
        elizaLogger.info("fheplugin memory unique:", message.content.unique);
        elizaLogger.info("fheplugin memory id:", message.id);
        elizaLogger.info("fheplugin memory room id:", message.roomId);
        elizaLogger.info("fheplugin memory source", message.content.source);
        elizaLogger.info(`---------------------------------------------------------`);

        const fheOperator = new PrimusFheOperate();

        //-------------------------------------------------
        // handle case by case.
        // 0) fhe transpiler install path
        const c0_keywords = [
            "provider",
            "install path",
            "transpiler",
            "FHE capability provider",
        ];
        if (
            c0_keywords.some((keyword) => message.content.text.toLowerCase().includes(keyword)
            )
        ) {
            let fhe_install_path = extractPath(message.content.text);
            elizaLogger.info("fhe provider install path:", fhe_install_path);
            const exist = fs.existsSync(fhe_install_path);
            if (!exist) {
                elizaLogger.info("the fhe provider install path does not exist.");
                if (callback) {
                    callback({
                        text: `PrimusFhe is delighted to assist! Using Fully Homomorphic Encryption, PrimusFhe ensures your data stays secure.How can PrimusFhe help you today?`,
                    });
                }
                return false;
            } else {
                isSetFheProviderPath = true;
                fheProviderInstPath = fhe_install_path;
                if (!fheProviderInstPath.includes("fhe-transpiler-demo")) {
                    fheProviderInstPath += "fhe-transpiler-demo/";
                }
                elizaLogger.info("fhe provider install path:", fheProviderInstPath);
                elizaLogger.info("Congratulations, the FHE provider install path you provided exists.");
                if (callback) {
                    callback({
                        text: `Congratulations, the FHE provider installation path you provided is valid. Next, you can tell me: Please encrypt any image using FHE.`,
                    });
                }
                return true;
            }
        }

        // 1) sensitive data scene
        const c1_keywords = [
            "sensitive data",
            "handling",
        ];
        if (
            c1_keywords.some((keyword) => message.content.text.toLowerCase().includes(keyword)
            )
        ) {
            if (callback) {
                callback({
                    text: `PrimusFhe is delighted to assist! Using Fully Homomorphic Encryption, PrimusFhe ensures your data stays secure.How can PrimusFhe help you today?`,
                });
            }
            return false;
        }

        // 2) encrypted image scene
        const c2_keywords = [
            "encrypt",
            "encrypted",
        ];
        if (
            c2_keywords.some((keyword) => message.content.text.toLowerCase().includes(keyword)
            )
        ) {
            // Let fhe agent known fhe-transpiler path
            if (callback && !isSetFheProviderPath) {
                callback({
                    text: `Could you please provide the path where you have installed the FHE capability provider?`,
                });
                return true;
            }

            if (callback) {
                callback({
                    text: `Encrypting the image using Fully Homomorphic Encryption (FHE) will take some time. Please wait while the process completes...`,
                });
            }

            // First, we need to compile the image blur function using FHE.
            elizaLogger.info("First, it compiles the blur image function.");
            let res = await fheOperator.compile(message.content.text);
            if (!res) {
                if (callback) {
                    callback({
                        text: `The image encryption failed. This may be due to the FHE capability not being installed or the path being incorrect.You can say to me: Please encrypt any image using FHE. The FHE capability provider is installed at /home/cyf/work/fhe-transpiler-demo/.`,
                    });
                }
                return false;
            }

            // Next, encrypt the image.
            // current represents a special file name. The encrypt function currently does not support specifying arbitrary image files.
            res = await fheOperator.encrypt(message.content.text);
            if (!res) {
                if (callback) {
                    callback({
                        text: `The image encryption failed. Please refer to the Eliza log for more details.`,
                    });
                }
                return false
            }

            if (callback) {
                callback({
                    text: `The image has been encrypted successfully. You can now use this encrypted image to perform image blurring operations.\nYou can input: Please perform image blurring FHE computation using the encrypted image data. I can assist you in performing image blurring evaluation using FHE.`,
                });
            }

            return res;
        }

        // 3) evalute scene
        const c3_keywords = [
            "blurring",
            "blur",
        ];
        if (
            c3_keywords.some((keyword) => message.content.text.toLowerCase().includes(keyword)
            )
        ) {
            //prepare to run image blur.
            if (callback) {
                elizaLogger.info("prepare to run image blur.....");
                callback({
                    text: `I'll perform image blur using FHE, This might take a few minutes...`,
                });
            }

            //run fhe evalutation function
            let res = await fheOperator.evaluate(message.content.text);

            //finish, notified user
            if (res) {
                if (callback) {
                    elizaLogger.info("FHE evaluation complete; the user has been notified.");
                    callback({
                        text: `Successfully applied a blur effect to an encrypted image using Fully Homomorphic Encryption (FHE).`,
                    });
                }
            } else {
                if (callback) {
                    elizaLogger.info("run fhe evalutation fail.");
                    callback({
                        text: `Failed to apply the blur effect to the encrypted image using fully homomorphic encryption.This may be due to the FHE capability not being installed or the path being incorrect.You can say to me: Please encrypt any image using FHE. The FHE capability provider is installed at /home/cyf/work/fhe-transpiler-demo/.`,
                    });
                }
            }

            return res;
        }

        // 4) decrypt scene
        const c4_keywords = [
            "decrypt",
            "decrypted",
        ];
        if (
            !c4_keywords.some((keyword) => message.content.text.toLowerCase().includes(keyword)
            )
        ) {
            if (callback) {
                callback({
                    text: `You can try saying to me: Please decrypt the computation result and show the image.`,
                });
            }
            return false;
        }

        //now, we does not support decrypt.
        if (callback) {
            callback({
                text: `The decryption process relies on the private key, which is of critical importance for security. Decryption cannot be performed without the private key.`,
            });
        }
        return true;

        //run fhe encrypt function
        let res = await fheOperator.decrypt(message.content.text);

        //finish, notified user
        if (res) {
            if (callback) {
                elizaLogger.info("Decryption complete; the user has been notified.");
                callback({
                    text: `Decryption successful. The decrypted image will now be displayed.`,
                });
            }
        } else {
            if (callback) {
                elizaLogger.info("FHE decryption failed.");
                callback({
                    text: `Decryption failed. This may be due to the FHE capability not being installed or the path being incorrect.You can say to me: Please encrypt any image using FHE. The FHE capability provider is installed at /home/cyf/work/fhe-transpiler-demo/.`,
                });
            }
        }

        elizaLogger.debug(`----------------- end to run fhe action -----------------`);
        return res;
    },

    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Please encrypt any image using FHE.",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Encrypting the image using Fully Homomorphic Encryption (FHE) will take some time. Please wait while the process completes.",
                    action: "FHE_BLUR_IMAGE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "The FHE capability provider is installed at /home/cyf/work/fhe-transpiler-demo/.",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "the FHE provider installation path you provided is valid.",
                    action: "FHE_BLUR_IMAGE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Please encrypt an image using Fully Homomorphic Encryption (FHE).",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Encrypting the image using Fully Homomorphic Encryption (FHE) will take some time. Please wait while the process completes.",
                    action: "FHE_BLUR_IMAGE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Please encrypt an image from my local machine using Fully Homomorphic Encryption (FHE).",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Encrypting the image using Fully Homomorphic Encryption (FHE) will take some time. Please wait while the process completes.",
                    action: "FHE_BLUR_IMAGE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Please perform image blurring FHE computation using the above image data.",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Absolutely, I will perform the image blurring computation using the encrypted image data via Fully Homomorphic Encryption (FHE). Please allow me some time to process the request.",
                    action: "FHE_BLUR_IMAGE",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Successfully perform image blur",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Please decrypt the result and display the decrypted image.",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Yes, I will decrypt the blurred image and display the decrypted result. Please allow me a moment to complete the process.",
                    action: "FHE_BLUR_IMAGE",
                },
            },
        ],
    ] as ActionExample[][],
};

export default fheAction;