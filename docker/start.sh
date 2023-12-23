#!/bin/sh

service nginx restart

source /root/.sdkman/bin/sdkman-init.sh \
    && sdk install java 21.0.1-amzn \
    && sdk use java 21.0.1-amzn \
    && sdk install maven \
    && cd /opt/multi-tenant-spring-template \
    && mvn install \
    && java -jar target/spring-template-0.0.1-SNAPSHOT.jar &

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.nvm/nvm.sh \
        && nvm install --lts \
        && nvm use --lts \
        && cd /opt/internal-app \
        && npm i \
        && npm run dev &

#source ~/.nvm/nvm.sh \
#        && nvm install --lts \
#        && nvm use --lts \
#        && cd /opt/tenant-app \
#        && npm i \
#        && npm run dev &

tail -f /dev/null