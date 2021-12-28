<h1>Генератор УИД для Бюро Кредитных историй</h1>

Микросервис генерирует УИД в соответствии с требованиями Положения 758-П Приложения 2. Может использоваться как единая точка для присвоения УИД обращениям и сделкам, значительно облегчает задачу присвоения УИД обращения УИДу договора.

<h2>Функции:<h2>
- Генерация УИД в соответствии с 758-П
- Сохранение УИД в БД в связки с номером заявки или номером кредита
- При запросе по тому же номеру заявки или кредита возвращает ранее сгенерированный УИД
- Асинхронная обработка запросов

<h2>Требования:</h2>
- NodeJS
- PostgreSQL

<h2>Установка:</h2>
1. Клонировать репу.
2. Создать в Postgres Базу Данных. Настроить conf\pg.json.
3. npm run init
