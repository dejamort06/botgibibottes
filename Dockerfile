FROM node:18-slim

# Chromium ve bağımlılıkları
RUN apt-get update && apt-get install -y \
    chromium \
    libglib2.0-0 \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Ortam değişkeni: chromium yolu
ENV CHROME_PATH=/usr/bin/chromium

# Uygulama dizini
WORKDIR /app

# Tüm dosyaları kopyala
COPY . .

# Node modülleri yükle
RUN npm install

# Uygulamayı başlat
CMD ["npm", "start"]
