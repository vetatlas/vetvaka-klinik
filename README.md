# VetVaka — Klinik çalışma alanı taslağı

Veteriner hekimlere yönelik arayüz prototipi. Kapsam: sığır, koyun, keçi, kedi, köpek ve at. Belirti formu yalnızca seçilen bilgileri ekranda özetler; tanı hesabı yapmaz. Protokol arşivinde doğrulanmış klinik kayıt yoktur.

## Çalıştırma

- Kaynak kod: `pnpm install` ardından `pnpm dev`
- Üretim derlemesi: `pnpm build`
- Tek dosya: `VetVaka.html` dosyasını güncel bir tarayıcıda açın.

## Klinik güvenlik ve gizlilik

Bu depo bir demo/taslak içerir; gerçek klinik karar, tanı veya tedavi amacıyla kullanılamaz. Hastalıklara özgü doğrulanmış tanı/tedavi içeriği, ilaç veya doz önerisi yoktur. Gerçek içerikler eklenmeden önce güvenilir kaynaklarla doğrulanmalı, veteriner hekimlerce incelenmeli ve sürüm/tarih bilgileriyle yönetilmelidir.

Form girdileri bu prototipte oturumlar arasında kaydedilmez veya bir uygulama sunucusuna gönderilmez. Şablonun etkileşim kaydı yapan, kullanılmayan debug collector dosyası bu açık kaynak dışa aktarımına dahil edilmemiştir.
