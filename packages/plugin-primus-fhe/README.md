# @elizaos/plugin-primus-fhe

This is a demo version of a plugin designed to ensure the security of agent activities, supporting operations such as FHE encryption,evalutation, powered by Primus.

## Overview

In the Eliza framework, an agent consists of three core components: the brain (responsible for accessing the LLM), actions (tasks performed by the agent), and perception (gathering external information from providers). To ensure the security of agent activities and protect personal privacy, secure computations can be performed using fully homomorphic encryption. This plugin implements fully homomorphic encryption for such computations.

The current plugin includes:

- Logic for data encryption and execution of fully homomorphic encryption (FHE) computations.
- An example demonstrating how to encrypt an image and perform blurring operations.

## Requirements
- Install FHE capability provider
  Compile and install fhe-transpiler-demo by following the steps in the README at https://github.com/primus-labs/fhe-transpiler-demo.
  fhe-transpiler-demo is the FHE capability provider.

## Installation

```bash
pnpm add @elizaos/plugin-primus-fhe
```

## Configuration
Copy example environment file.

```sh
cp .env.example .env
```

Edit `.env` and add your values:

```json
# AI Model API Keys
OPENAI_API_KEY=sk-...
OPENAI_API_URL=https:...
...
XAI_MODEL=gpt-4o-mini
```

## Run

- Start the server

```bash
pnpm start --characters="characters/fhe.character.json"
```

- Start the client

```bash
pnpm start:client
```

- Example of interacting with the agent
user$: "Can you assist me with handling sensitive data?"
agent$: "......"

user$: "Please encrypt any image using FHE."
agent$ "Could you please provide the path where you have installed the FHE capability provider?"

user$: "The FHE capability provider is installed at ~work/fhe-transpiler-demo/."
agent$ "Congratulations, the FHE provider installation path you provided is valid. Nextyou can tell me: Please encrypt any image using FHE."

user$: "Please encrypt any image using FHE."
agent$: "..."

user$: "Please perform image blurring FHE computation using the above image data."
agent$: "..."

user$: "Please decrypt the result and display the decrypted image."
agent$: "..."
