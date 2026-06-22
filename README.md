# 🧪 Node.js Backend Integration Testing

A backend REST API project built with **Node.js**, **Express**, and **SQLite** — designed from the ground up with **testability** as a first-class concern. Features a complete integration test suite written with **Jest** and **Supertest**, a dedicated test database, environment-based configuration, and ESLint for code quality enforcement.

_A complete backend testing setup with Jest & Supertest | Jest ve Supertest ile eksiksiz backend test altyapısı_

---

## 🇬🇧 English

### 📖 Overview

Most backend tutorials focus on building the API itself, leaving testing as an afterthought. This project flips that — the API is intentionally simple so that full attention can be given to **setting up a professional testing environment** and writing **meaningful integration tests**.

The goal was to simulate the kind of testing infrastructure you'd find in a real-world Node.js codebase: a separate test database that gets seeded fresh before every test, environment variables controlling which database is used, and tests that actually make HTTP requests and assert on real responses.

### 🎯 What Was Built

#### REST API

A `users` resource with the following endpoints:

| Method | Endpoint     | Description                   | Status    |
| ------ | ------------ | ----------------------------- | --------- |
| GET    | `/users`     | Returns all users as an array | 200       |
| GET    | `/users/:id` | Returns a single user by ID   | 200 / 404 |
| POST   | `/users`     | Creates a new user            | 201 / 400 |

#### Integration Test Suite (`users.test.js`)

Each endpoint is covered by multiple test cases:

| Test                                   | What It Checks                                   |
| -------------------------------------- | ------------------------------------------------ |
| `[1]` GET /users → 200                 | Server is reachable and returns success          |
| `[2]` GET /users → Array               | Response body is an array (not object, not null) |
| `[3]` GET /users/:id (valid) → 200     | Known ID returns the correct resource            |
| `[4]` GET /users/:id (invalid) → 404   | Unknown ID returns not found                     |
| `[5]` POST /users (valid body) → 201   | Valid payload creates a user                     |
| `[6]` POST /users (no body) → 400      | Missing body is rejected                         |
| `[7]` POST /users (wrong fields) → 400 | Wrong field names are rejected                   |

### 🏗️ Architecture & Key Decisions

#### Separate Test Database

The project maintains two SQLite databases: `project.sqlite3` for development and `test.sqlite3` exclusively for tests. Knex reads `process.env.NODE_ENV` at runtime to decide which database to connect to — so tests never touch real data.

#### `beforeEach` — Test Isolation

Before every single test, the `users` table is truncated and re-seeded with a known set of records. This guarantees that every test runs against a predictable, clean state — regardless of what the previous test did. This eliminates an entire class of intermittent "flaky" test failures.

```javascript
beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert([
    { username: "ahmet", email: "ahmet@gmail.com" },
    { username: "ayse", email: "ayse@gmail.com" },
  ]);
});
```

#### `cross-env` — Cross-Platform Environment Variables

Setting `NODE_ENV=test` in npm scripts works on Mac/Linux but not on Windows. `cross-env` solves this by providing a platform-agnostic way to set environment variables in npm scripts — making the project reliably runnable on any OS.

```json
"test": "cross-env NODE_ENV=test jest --watchAll --runInBand --forceExit"
```

#### `--runInBand` — Sequential Test Execution

By default, Jest runs test files in parallel across multiple workers. With a shared SQLite database, parallel writes cause race conditions and unpredictable failures. `--runInBand` forces tests to run sequentially, one at a time.

#### ESLint — Code Quality

ESLint is configured for Node.js and Jest globals, catching unused variables, potential bugs, and enforcing consistent code style across the project.

#### `knexfile.js` — Shared Config with Spread

A `commonConfig` object holds all shared Knex settings (client, migrations directory, seeds directory, pool/pragma config). Individual environment configs spread from it and only override `connection.filename` — eliminating duplication and making environment-specific overrides explicit.

```javascript
const commonConfig = { client: 'sqlite3', useNullAsDefault: true, ... }

module.exports = {
  development: { ...commonConfig, connection: { filename: './data/project.sqlite3' } },
  test:        { ...commonConfig, connection: { filename: './data/test.sqlite3' } },
}
```

### 🛠️ Tech Stack

| Technology | Role                                 |
| ---------- | ------------------------------------ |
| Node.js    | Runtime                              |
| Express.js | HTTP server & routing                |
| SQLite3    | Relational database                  |
| Knex.js    | Query builder, migrations & seeds    |
| Jest       | Test runner & assertion library      |
| Supertest  | HTTP assertion library for Express   |
| cross-env  | Cross-platform environment variables |
| ESLint     | Static code analysis                 |
| dotenv     | Environment variable loading         |
| Nodemon    | Development auto-reload              |

### ⚙️ Setup & Installation

**Prerequisites:** Node.js v18+

```bash
# 1. Clone
git clone https://github.com/mertkaya20/fsweb-s15g4-node-testing-project-2.git
cd fsweb-s15g4-node-testing-project-2

# 2. Install dependencies
npm install

# 3. Create .env
cp .env.example .env

# 4. Run migrations (both environments)
npx knex migrate:latest --env=development
npx knex migrate:latest --env=test

# 5. Seed development database
npx knex seed:run --env=development

# 6. Start the server
npm run server
```

### 🧪 Running Tests

```bash
npm run test
```

Jest will:

1. Set `NODE_ENV=test` → Knex connects to `test.sqlite3`
2. Find all `*.test.js` files
3. Before each test: truncate and re-seed the test database
4. Run all tests sequentially (`--runInBand`)
5. Force-exit after completion (`--forceExit`)

### 📁 Project Structure

```
.
├── api/
│   ├── users/
│   │   ├── users-model.js      # Database access functions
│   │   ├── users-router.js     # Express route handlers
│   │   └── users.test.js       # Integration tests
│   └── server.js               # Express app config
├── data/
│   ├── migrations/             # Knex schema migrations
│   ├── seeds/                  # Seed data
│   └── db-config.js            # Environment-aware Knex instance
├── .env                        # Local environment variables (not committed)
├── .env.example                # Environment variable template
├── eslint.config.mjs           # ESLint configuration
├── jest.config.js              # Jest configuration
├── knexfile.js                 # Knex environment configurations
├── index.js                    # Server entry point
└── package.json
```

### 📦 Available Scripts

| Script             | Command                        | Description              |
| ------------------ | ------------------------------ | ------------------------ |
| `npm start`        | `node index.js`                | Start in production mode |
| `npm run server`   | `nodemon index.js`             | Start with auto-reload   |
| `npm run migrate`  | `knex migrate:latest`          | Run pending migrations   |
| `npm run rollback` | `knex migrate:rollback`        | Roll back last migration |
| `npm run seed`     | `knex seed:run`                | Seed the database        |
| `npm run test`     | `cross-env NODE_ENV=test jest` | Run integration tests    |

---

## 🇹🇷 Türkçe

### 📖 Genel Bakış

Çoğu backend eğitimi API'yi oluşturmaya odaklanır, testleri ise sonradan düşünür. Bu proje tam tersini yapıyor — API kasıtlı olarak sade tutulmuş, böylece tüm dikkat **profesyonel bir test ortamı kurmaya** ve **anlamlı entegrasyon testleri yazmaya** verilebilmiş.

Amaç, gerçek dünya Node.js projelerinde karşılaşacağın test altyapısını simüle etmekti: her testten önce sıfırdan seed'lenen ayrı bir test veritabanı, hangi veritabanının kullanılacağını kontrol eden environment değişkenleri ve gerçek HTTP istekleri gönderip gerçek cevaplar üzerinde assertion yapan testler.

### 🎯 Neler Geliştirildi

#### REST API

`users` kaynağı için aşağıdaki endpoint'ler:

| Method | Endpoint     | Açıklama                               | Durum     |
| ------ | ------------ | -------------------------------------- | --------- |
| GET    | `/users`     | Tüm kullanıcıları dizi olarak döndürür | 200       |
| GET    | `/users/:id` | ID'ye göre tek kullanıcı döndürür      | 200 / 404 |
| POST   | `/users`     | Yeni kullanıcı oluşturur               | 201 / 400 |

#### Entegrasyon Test Paketi (`users.test.js`)

Her endpoint birden fazla test senaryosuyla kapsanmıştır:

| Test                                     | Ne Kontrol Ediyor                             |
| ---------------------------------------- | --------------------------------------------- |
| `[1]` GET /users → 200                   | Sunucu erişilebilir ve başarı döndürüyor      |
| `[2]` GET /users → Dizi                  | Response body bir dizi (obje veya null değil) |
| `[3]` GET /users/:id (geçerli) → 200     | Bilinen ID doğru kaynağı döndürüyor           |
| `[4]` GET /users/:id (geçersiz) → 404    | Bilinmeyen ID "bulunamadı" döndürüyor         |
| `[5]` POST /users (geçerli body) → 201   | Geçerli veri kullanıcı oluşturuyor            |
| `[6]` POST /users (body yok) → 400       | Eksik body reddediliyor                       |
| `[7]` POST /users (yanlış alanlar) → 400 | Yanlış alan isimleri reddediliyor             |

### 🏗️ Mimari ve Önemli Kararlar

#### Ayrı Test Veritabanı

Proje iki SQLite veritabanı tutuyor: geliştirme için `project.sqlite3`, testler için yalnızca `test.sqlite3`. Knex, çalışma zamanında `process.env.NODE_ENV`'i okuyarak hangi veritabanına bağlanacağına karar veriyor — bu sayede testler gerçek veriye hiç dokunmuyor.

#### `beforeEach` — Test İzolasyonu

Her testten önce `users` tablosu temizleniyor ve bilinen bir kayıt setiyle yeniden dolduruluyor. Bu, her testin öngörülebilir, temiz bir state ile çalışmasını garanti ediyor — önceki testin ne yaptığından bağımsız olarak. Bu yaklaşım "flaky" (kararsız) test hatalarının tamamını ortadan kaldırıyor.

#### `cross-env` — Platformlar Arası Environment Değişkenleri

npm scriptlerinde `NODE_ENV=test` ayarlamak Mac/Linux'ta çalışır ama Windows'ta çalışmaz. `cross-env` bunu çözerek npm scriptlerinde environment değişkeni ayarlamak için platform bağımsız bir yol sunuyor.

#### `--runInBand` — Sıralı Test Çalıştırma

Jest varsayılan olarak test dosyalarını birden fazla worker üzerinde paralel çalıştırır. Paylaşılan bir SQLite veritabanıyla paralel yazma işlemleri race condition'lara ve öngörülemeyen hatalara yol açar. `--runInBand` testleri sırayla, birer birer çalıştırmaya zorlar.

#### ESLint — Kod Kalitesi

ESLint, Node.js ve Jest global değişkenleri için yapılandırılmış; kullanılmayan değişkenleri, potansiyel hataları ve tutarsız kod stilini yakalıyor.

#### `knexfile.js` — Spread ile Ortak Config

Bir `commonConfig` objesi tüm ortak Knex ayarlarını tutuyor. Ortama özel config'ler bu objeyi spread ederek sadece `connection.filename`'i override ediyor — tekrarı ortadan kaldırıyor ve ortama özel değişiklikleri açık hale getiriyor.

### 🛠️ Teknoloji Yığını

| Teknoloji  | Rolü                                           |
| ---------- | ---------------------------------------------- |
| Node.js    | Çalışma zamanı                                 |
| Express.js | HTTP sunucu ve routing                         |
| SQLite3    | İlişkisel veritabanı                           |
| Knex.js    | Sorgu oluşturucu, migration ve seed            |
| Jest       | Test çalıştırıcı ve assertion kütüphanesi      |
| Supertest  | Express için HTTP assertion kütüphanesi        |
| cross-env  | Platformlar arası environment değişkenleri     |
| ESLint     | Statik kod analizi                             |
| dotenv     | Environment değişkeni yükleme                  |
| Nodemon    | Geliştirme sırasında otomatik yeniden başlatma |

### ⚙️ Kurulum

**Gereksinimler:** Node.js v18+

```bash
# 1. Klonla
git clone https://github.com/mertkaya20/fsweb-s15g4-node-testing-project-2.git
cd fsweb-s15g4-node-testing-project-2

# 2. Bağımlılıkları yükle
npm install

# 3. .env dosyası oluştur
cp .env.example .env

# 4. Migration'ları çalıştır (her iki ortam için)
npx knex migrate:latest --env=development
npx knex migrate:latest --env=test

# 5. Development veritabanını seed'le
npx knex seed:run --env=development

# 6. Sunucuyu başlat
npm run server
```

### 🧪 Testleri Çalıştırma

```bash
npm run test
```

### 📁 Proje Yapısı

```
.
├── api/
│   ├── users/
│   │   ├── users-model.js      # Veritabanı erişim fonksiyonları
│   │   ├── users-router.js     # Express route handler'ları
│   │   └── users.test.js       # Entegrasyon testleri
│   └── server.js               # Express app konfigürasyonu
├── data/
│   ├── migrations/             # Knex schema migration'ları
│   ├── seeds/                  # Seed verileri
│   └── db-config.js            # Ortama duyarlı Knex instance
├── .env                        # Yerel environment değişkenleri (commit'lenmez)
├── .env.example                # Environment değişken şablonu
├── eslint.config.mjs           # ESLint konfigürasyonu
├── jest.config.js              # Jest konfigürasyonu
├── knexfile.js                 # Knex ortam konfigürasyonları
├── index.js                    # Sunucu giriş noktası
└── package.json
```

### 📦 Mevcut Scriptler

| Script             | Komut                          | Açıklama                            |
| ------------------ | ------------------------------ | ----------------------------------- |
| `npm start`        | `node index.js`                | Production modunda başlat           |
| `npm run server`   | `nodemon index.js`             | Otomatik yeniden başlatmayla başlat |
| `npm run migrate`  | `knex migrate:latest`          | Bekleyen migration'ları çalıştır    |
| `npm run rollback` | `knex migrate:rollback`        | Son migration'ı geri al             |
| `npm run seed`     | `knex seed:run`                | Veritabanını seed'le                |
| `npm run test`     | `cross-env NODE_ENV=test jest` | Entegrasyon testlerini çalıştır     |

---

## 📬 Contact / İletişim

**Mert Kaya**

[![GitHub](https://img.shields.io/badge/GitHub-mertkaya20-181717?style=flat&logo=github)](https://github.com/mertkaya20)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-merttkaya20-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/merttkaya20/)

---

_Built as part of a Full Stack Bootcamp — Workintech_
