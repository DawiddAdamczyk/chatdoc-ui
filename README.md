# Chatdoc UI

## About

Chatdoc UI is an open source project for offline interaction with internal documents.

This project is based on [chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) by [Mckay Wrigley](https://github.com/mckaywrigley) and [chatbot-ollama](https://github.com/ivanfioravanti/chatbot-ollama) by [Ivan Fioravanti](https://github.com/ivanfioravanti)


## Docker

Build locally:

```shell
docker build -t chatdoc-ui .
docker run -p 3000:3000 chatdoc-ui
```


## Running Locally

### 1. Clone Repo

```bash
git clone https://github.com/DawiddAdamczyk/chatdoc-ui.git
```

### 2. Install Dependencies

```bash
npm i
```

### 3. Run chatdoc server

See

```bash
https://github.com/PiotrDespot/chatdoc/
```

### 4. Run App

```bash
npm run dev
```

### 5. Use It

You should be able to start chatting.

## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                  | Description                                                                                                                               |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| DEFAULT_MODEL                     | `mistral:latest`                | The default model to use on new conversations                                                                                             |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts) | The default system prompt to use on new conversations                                                                                     |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                              | The default temperature to use on new conversations                                                                                       |


