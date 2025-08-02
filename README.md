# MIS APP – Sosyal Forum Uygulaması

**MIS APP**, Yönetim Bilişim Sistemleri (MIS) topluluğu için geliştirilmiş, modern ve etkileşimli bir **sosyal forum platformudur**.  
Kullanıcılar **üye olabilir**, **profil oluşturabilir**, **gönderi paylaşabilir** ve **birbirini takip edebilir**.  

Uygulama **Next.js** tabanlıdır ve **Clerk** ile kimlik doğrulama, **Prisma** ile veritabanı yönetimi sağlar.  
UI tarafında **Tailwind CSS**, **Radix UI** ve **Lucide** ikonları ile modern ve özelleştirilebilir bir tasarım sunar.  

## Uygulama Ekran Görüntüsü

![MIS APP Ekran Görüntüsü](./src/assets/APP.png)



---

## 🚀 Özellikler

- **Kullanıcı Yönetimi**  
  - Clerk entegrasyonu ile kayıt & giriş işlemleri  
  - Profil bilgisi düzenleme (bio, website, lokasyon vb.)  
  - Takip / Takipçi sistemi  

- **Gönderi Yönetimi**  
  - Kullanıcı gönderileri ve beğeniler  
  - Post beğenme ve listeleme  
  - Profilde paylaşılan gönderileri görme  

- **Modern UI & Tema Desteği**  
  - **Radix UI** bileşenleri (Dialog, Tabs, Avatar vb.)  
  - **Tailwind CSS** ile özelleştirilebilir tema  
  - **Dark / Light Mode** (next-themes ile tema geçişi)  

- **Diğer Özellikler**  
  - **UploadThing** entegrasyonu ile dosya yükleme  
  - **date-fns** ile tarih formatlama  
  - **Lucide-react** ikonlarıyla minimalist simgeler  
  - **react-hot-toast** ile bildirim desteği  

---

## 🛠️ Kullanılan Teknolojiler

- [Next.js 14](https://nextjs.org/) – Full-stack React framework  
- [Clerk](https://clerk.com/) – Kimlik doğrulama ve kullanıcı yönetimi  
- [Prisma](https://www.prisma.io/) – ORM & veritabanı yönetimi  
- [Tailwind CSS](https://tailwindcss.com/) – Modern CSS framework  
- [Radix UI](https://www.radix-ui.com/) – Erişilebilir & headless UI bileşenleri  
- [UploadThing](https://uploadthing.com/) – Dosya yükleme altyapısı  
- [Lucide-react](https://lucide.dev/) – İkon seti  
- [next-themes](https://github.com/pacocoursey/next-themes) – Tema yönetimi  
- [date-fns](https://date-fns.org/) – Tarih işlemleri  
- [react-hot-toast](https://react-hot-toast.com/) – Bildirim sistemi  

---

erDiagram

    USER {
        string id PK
        string email
        string username
        string clerkId
        string name
        string bio
        string image
        string location
        string website
        datetime createdAt
        datetime updatedAt
    }

    POST {
        string id PK
        string authorId FK
        string content
        string image
        datetime createdAt
        datetime updatedAt
    }

    COMMENT {
        string id PK
        string content
        string authorId FK
        string postId FK
        datetime createdAt
    }

    LIKE {
        string id PK
        string postId FK
        string userId FK
        datetime createdAt
    }

    FOLLOWS {
        string followerId FK
        string followingId FK
        datetime createdAt
    }

    NOTIFICATION {
        string id PK
        string userId FK
        string creatorId FK
        string type
        boolean read
        string postId FK
        string commentId FK
        datetime createdAt
    }

    USER ||--o{ POST : "writes"
    USER ||--o{ COMMENT : "writes"
    USER ||--o{ LIKE : "likes"
    USER ||--o{ FOLLOWS : "follows"
    USER ||--o{ NOTIFICATION : "receives"

    POST ||--o{ COMMENT : "has"
    POST ||--o{ LIKE : "has"
    POST ||--o{ NOTIFICATION : "triggers"

    COMMENT ||--o{ NOTIFICATION : "triggers"

    FOLLOWS {
        string followerId PK
        string followingId PK
    }
    

## DB Diyagramı

![MIS APP Ekran Görüntüsü](./src/assets/db.png)


## 🔧 Çevresel Değişkenler
- .env.local dosyasına eklemeniz gereken değişkenler:
- DATABASE_URL=postgresql://user:password@localhost:5432/misapp
- EXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
- CLERK_SECRET_KEY=...
- UPLOADTHING_SECRET=...



# 🔌 API & Servis Katmanı

Uygulamamızda backend mantığı **Next.js Server Actions** kullanılarak servisler halinde ayrıştırılmıştır.  
Bu servisler **Prisma ORM** ile veritabanına erişir ve **Clerk** kimlik doğrulamasını kullanır.

## Servisler ve Fonksiyonlar

### Bildirim Servisi (`notification.action.ts`)
- **`getNotifications()`** → Giriş yapan kullanıcının bildirimlerini getirir.  
- **`markNotificationsAsRead(notificationIds: string[])`** → Belirtilen bildirimleri okundu olarak işaretler.  

### Post Servisi (`post.action.ts`)
- **`createPost(content: string, image: string)`** → Yeni gönderi oluşturur.  
- **`getPosts()`** → Tüm gönderileri (yorum, beğeni bilgileriyle) getirir.  
- **`toggleLike(postId: string)`** → Gönderiyi beğenir veya beğenmekten vazgeçer.  
- **`createComment(postId: string, content: string)`** → Gönderiye yorum ekler.  
- **`deletePost(postId: string)`** → Kullanıcının kendi gönderisini siler.  

### Profil & Kullanıcı Servisi (`profile.action.ts`)
- **`getProfileByUsername(username: string)`** → Kullanıcı profili getirir.  
- **`getUserPosts(userId: string)`** → Kullanıcının gönderilerini getirir.  
- **`getUserLikedPosts(userId: string)`** → Kullanıcının beğendiği gönderileri getirir.  
- **`updateProfile(formData: FormData)`** → Profil bilgilerini günceller.  
- **`isFollowing(userId: string)`** → Giriş yapan kullanıcının, belirtilen kullanıcıyı takip edip etmediğini kontrol eder.  

### Kullanıcı Yönetim Servisi (`user.action.ts`)
- **`syncUser()`** → Clerk hesabını veritabanı ile senkronize eder.  
- **`getUserByClerkId(clerkId: string)`** → Clerk ID’ye göre kullanıcı getirir.  
- **`getDbUserId()`** → Giriş yapan kullanıcının veritabanı ID’sini döner.  
- **`getRandomUsers()`** → Takip edilmeyen rastgele kullanıcıları getirir.  
- **`toggleFollow(targetUserId: string)`** → Kullanıcıyı takip etme / takibi bırakma işlemi yapar.  



## 📦 Kurulum

Projeyi yerel ortamınıza almak için:

```bash
# Repoyu klonlayın
git clone https://github.com/kullaniciadi/mis-app.git
cd mis-app

# Bağımlılıkları yükleyin
npm install

# Çevresel değişkenleri ayarlayın
cp .env.example .env.local
# .env.local dosyasında Clerk, veritabanı ve UploadThing ayarlarını yapın

# Prisma ile veritabanını migrate edin
npx prisma migrate dev

# Geliştirme sunucusunu başlatın
npm run dev


