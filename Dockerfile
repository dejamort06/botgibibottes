FROM zenika/alpine-chrome:with-node

# Çalışma dizini
WORKDIR /app

# Dosyaları kopyala
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Venom'un Chromium'u kullanabilmesi için env
ENV CHROME_BIN=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Botu başlat
CMD ["node", "index.js"]
