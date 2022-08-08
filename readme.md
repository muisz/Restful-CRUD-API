## Restful CRUD API

berikut steps untuk menjalankan apinya:

1. clone project
2. membuat .env dengan menyalin env.sample dan mengisinya sesuai kebutuhan
3. install dependencies
```
npm install
```
atau
```
yarn install
```
4. migrasi database
```
npx knex migrate:latest
```
> untuk migrasi dengan environment staging atau production jalankan npx knex migrate:latest --env <staging/production>

> jika migrasi gagal pada mysql maka cobalah dengan mengaktifkan mysql_native_password

5. menjalankan server
```
npm start
```
atau 
```
yarn start
```

api berjalan di http://localhost:8000