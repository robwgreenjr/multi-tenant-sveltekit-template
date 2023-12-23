#!/bin/sh

service nginx restart

curl -s "https://get.sdkman.io" | bash
source /root/.sdkman/bin/sdkman-init.sh \
    && sdk install java 21.0.1-amzn \
    && sdk use java 21.0.1-amzn \
    && sdk install maven \
    && cd /opt/multi-tenant-spring-template \
    && mvn spring-boot:run &

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.nvm/nvm.sh \
        && nvm install --lts \
        && nvm use --lts \
        && cd /opt/internal-app \
        && npm run dev &

tail -f /dev/null