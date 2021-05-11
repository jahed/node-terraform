FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-14

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get -y install --no-install-recommends \
  vim \
  tig

RUN su node -c "npm install -g yarn@1"
