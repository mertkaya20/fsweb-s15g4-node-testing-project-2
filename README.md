# Server Test Modül Projesi

## Talimatlar

### MVP

Bu projede, seçtiğiniz bir kaynak üzerinde bazı CRUD işlemleri gerçekleştirmek için, uçnoktalar içeren, Node ve Express kullanarak bir RESTful API oluşturacaksınız.
2 yada 3 uç nokta yeterlidir. Veriler bir SQLlite veritabanında tutulmalıdır.

## Gereklilikler

- Supertest'i kullanarak en az on test yazın.

## Yapılacaklar

Projenizi bir araya getirmenize yardımcı olacak görevlerin bir kontrol listesi aşağıdadır:

- Bir `.gitignore` dosyası oluşturun.
- Express, knex, sqlite3'ü bağımlılık olarak kurun.
- Alternatif olarak, dependency olarak Express, knex, @vscode/sqlite3 kurun.
- devDependency olarak jest, eslint, nodemon, supertest, cross-env yükleyin.
- `npx <libname> --init` kullanarak jest ve eslint'i yapılandırın.
- "development" ve "testing" yapılandırmalarıyla birlikte bir `knexfile.js` oluşturun.
- `process.env.NODE_ENV` değerini kullanarak doğru yapılandırmayı seçen bir `db-config.js` dosyası oluşturun.
- Migration ve seed dosyalarını oluşturun.
- `package.json` dosyanıza `start`, `server`, `rollback`, `migrate` ve `seed` komutlarını ekleyin.
- Bir "test" scripti oluşturmak için `package.json` dosyanıza cross-env kullanarak test `NODE_ENV` i yazın.
- Birkaç veritabanı erişim işlevi ve birkaç uç nokta ile basit ve hızlı bir uygulama oluşturun.
- Postman, HTTPie veya benzerini kullanarak uç noktalarınızı manuel olarak test edin.
- Supertest ile uç noktalarınızı test edin.

## NextGen Testleri Çalıştırma

- Proje dizinindeki `user.json` dosyasını bulun ve `user_id` alanını NextGen proje ekranında görünen kendi `user_id` değeriniz ile güncelleyin.
- Projeyi tamamladıktan sonra sonucu NextGen'e göndermek için `npm run sendresults` komutunu kullanın.
- Komut çalıştıktan sonra NextGen sayfasını refresh ederek skorunuzu kontrol edebilirsiniz.
