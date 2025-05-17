FROM node:18

# Chromium kurulumu
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean

# venom-bot'ın chromium'u bu yoldan çalıştırabilmesi için gerekli env
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Uygulama dizini
WORKDIR /app

# Tüm dosyaları konteynıra kopyala
COPY . .

# Node.js bağımlılıklarını yükle
RUN npm install

# Bot'u başlat
CMD ["npm", "start"]
