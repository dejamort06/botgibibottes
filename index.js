const venom = require('venom-bot');
const path = require('path');

venom
  .create({
    session: path.resolve(__dirname, 'whatsapp-session'), // session klasör yolu mutlak verildi
    multidevice: true, // opsiyonel, multidevice kullanmak istersen
  })
  .then((client) => start(client))
  .catch((err) => {
    console.error('Bot başlatılırken hata oluştu:', err);
  });

function start(client) {
  client.onMessage(async (message) => {
    const text = message.body.toLowerCase();

    const complaints = [
      "şikayet edicem", "savcılığa gidicem", "karakola gidiyorum",
      "iade istiyorum", "paramı geri verin", "paramı istiyorum",
      "tüketici mahkemesine gidicem", "dolandırdınız"
    ];

    const forbiddenWords = [
      "orospu cocukları", "şerefsizler"
    ];

    if (text.match(/tr\d{20,}/i)) {
      await client.sendText(message.from, "⚠️ WhatsApp üzerinden IBAN bilgisi alınmamaktadır.");
      return;
    }

    if (forbiddenWords.some(word => text.includes(word))) {
      await client.sendText(message.from, "❌ Lütfen uygun bir dil kullanın.");
      return;
    }

    if (complaints.some(word => text.includes(word))) {
      await client.sendText(message.from, "Tüketici mahkemesine başvurarak daha hızlı sonuç alabilirsiniz. Şikayet formu için: https://docs.google.com/forms/d/e/1FAIpQLSfhpcjI_XjuUB10hPjaamWTsvFTD3BfxvaOStqVDHTqgxEsow/viewform");
      return;
    }

    if (text.includes("kurulum")) {
      await client.sendText(message.from, "Kurulum için 5506987031 numarasına WhatsApp üzerinden ulaşmanız gerekmektedir. Ekipler en kısa sürede sizinle iletişime geçecektir.");
      return;
    }

    if (text.includes("modemim gelmedi") || text.includes("kaç gün oldu hala gelmedi")) {
      await client.sendText(message.from, "📦 Kargo süresi maksimum 48 saattir. Bazen sistemsel gecikmeler olabilir. Kurulum hattı 5506987031 üzerinden kargo durumunuzu da sorgulatabilirsiniz.");
      return;
    }

    await client.sendText(message.from, "Merhaba! Size nasıl yardımcı olabilirim?");
  });
}
