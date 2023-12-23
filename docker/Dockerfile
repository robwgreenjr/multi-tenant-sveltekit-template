FROM ubuntu:22.04

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
ARG DEBIAN_FRONTEND=noninteractive

# OS
RUN apt-get update
RUN apt-get install -y build-essential curl unzip zip wget \
     software-properties-common

# Dev Tools
RUN apt-get install -y vim git net-tools inotify-tools iputils-ping

# Nginx
RUN apt-get install -y nginx
COPY docker/nginx/default /etc/nginx/sites-available/default

COPY . /opt/
WORKDIR /opt/

RUN git clone https://github.com/robwgreenjr/multi-tenant-spring-template.git
COPY docker/backend/.env.example /opt/multi-tenant-spring-template/.env

# Node.js
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
RUN source ~/.nvm/nvm.sh \
        && nvm install --lts \
        && nvm use --lts

# Java
RUN curl -s "https://get.sdkman.io" | bash
RUN source /root/.sdkman/bin/sdkman-init.sh \
    && sdk install java 21.0.1-amzn \
    && sdk use java 21.0.1-amzn \
    && sdk install maven \
    && cd /opt/multi-tenant-spring-template \
    && mvn compile

ENV JAVA_HOME=/root/.sdkman/candidates/java/21.0.1-amzn

CMD ["sh", "./docker/start.sh"]