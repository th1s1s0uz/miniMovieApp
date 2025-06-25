node versiyonum: v20.12.2
java versiyonum: java 17.0.11 2024-04-16 LTS

Projeyi indirip npm install ile node-modules doyalarını indirdikten sonra npm run ios veya npm run android demeniz yeterli olacaktır diye düşünüyorum

Bu projenin yapımında Cursor ve Gpt'yi aktif olarak kullanıldım.
Yapay zekaya projenin tamamını vermektense mimariye ben karar veriyorum. Ana iskeleti Cursor'a ve ufak detayları Gpt'ye yaptırıyorum.
Yazılan kodları okuyup gerekli düzenlemeleri yapıyorum. Yada ona başlangıç için temiz kodlar veriyorum ve zaman kaybı olan bölümleri ona yaptırıyorum.

Bütün parçaları (özellikle tekrar eden kodları) component olarak tasarladım.

Read.me dosyasında Cursor'a aşağıdaki gibi kuralları tanıyorum ve bunun dışına çıkmamasını söylüyorum.

## ✅ General Rules

- The project must be built in a **clean, professional** manner.
- Code must be **readable**, **scalable**, and **maintainable**.

---

## ❌ Platform-Specific Folders

- **Never** modify the `android/` or `ios/` folders.
  - Native code is strictly off-limits.
  - Only React Native APIs and cross-platform libraries should be used.

---

## 🧱 Component Structure

- All UI should be created using **reusable components**.
- Components must be organized under the `components/` directory.
- Avoid code duplication by separating reusable logic into components.

Ai kullanımının en önemli noktası nasıl düşündüğünü anlamak. Onunla Zaman geçirdikçe prompt yazma yeteneğiniz gelişiyor.
Konuşmanın akışını bozmadığınız ve gereksiz karmaşa çıkmadığı sürece bir çok işi yaptırabiliyorsunuz. Bu yüzden yaptığı hatayı söylemektense eski mesajı düzenlemek ve daha iyi açıklamak her zaman daha verimli olur.
Promp kalitesi için noktalama işaretleri ve betimleme yeteneğiniz çok önemli. Mimariye siz karar verdiğiniz ve her zaman tek bir sohbette kalmayı başarmak önemli.
Örnek bir prompt:

"Merhaba, senden bir useApi adında hook istiyorum. Projemdeli bütün istekleri bu hook ile atacağım. Bu sayede error ve success mesajlarını tek bir yerden yöneteceğim. Hata durumunda CustomPopUp komponentimi buradan aktif edeceğim. Hata kodu 401 dönerse kullanıcının tokenini sileceğiz."

Yapacağımız işin mantığını ona anlatıyorum ve sürekli projenin geneli hakkında da bilgi veriyorum. Bu sayede her zaman onu güncel tutmuş oluyorum ve Cursor'da ana iskeleti kurmam kısa sürüyor.

Kütüphane tercihleri:
-Lottie ve Animated ile uı'ı zenginleştirdim.
-Proje büyük bir proje değil bana kalsa zustand kullanırdım ancak siz redux istediniz ve bu yüzden redux kullandım. Ayrıca ilk defa Redux saga kullandım.
-BottomSheet sektörde standart haline geldiği için oyuncuların detayını onunla gösterdim.
-Favorilere eklenen filmlerin bilgilerini async storage ile saklıyorum.

İncelediğiniz için teşekkür ederim.

Ekstra bir bilgi: Ai istediğiniz şeyi yapmaya çok yaklaşırsa ama başaramazsa ona 100 dolar bahşiş vereceğinizi söyleyin.
