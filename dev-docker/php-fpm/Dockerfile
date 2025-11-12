FROM webdevops/php-nginx-dev:8.4

# Set timezone
RUN echo date.timezone = "Europe/Budapest" >> /opt/docker/etc/php/php.ini

# Install dependencies
RUN apt-get update && apt-get install -y curl bash ca-certificates

# Install nvm (Node Version Manager)
ENV NVM_DIR /root/.nvm
RUN curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Load nvm and install Node.js 23.9 with npm 11
RUN . "$NVM_DIR/nvm.sh" && \
    nvm install 23.9.0 && \
    nvm use 23.9.0 && \
    nvm alias default 23.9.0

# Add Node.js and npm to PATH
ENV PATH "$NVM_DIR/versions/node/v23.9.0/bin:$PATH"

# Verify installation
RUN node -v
RUN npm -v

WORKDIR "/app"
COPY . /app

RUN chown -R application:application /app
