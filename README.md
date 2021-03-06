<h1 style="font:blue">Генератор УИД для Бюро Кредитных историй</h1>

Мы столкнулись с тем, что с 01.01.2022 (с переносом на 01.07.2022) теперь по всем заявкам нужно будет делать УИД, как это делается по договорам. Причем есть условие, что если по заявке будет успешная сделка, УИД заявки станет УИД договора. Все это потребует доработки всех фронтов и выстраивание новых архитектурных связей. Одним из вариантов решения может быть данный микросервис.

Микросервис генерирует УИД в соответствии с требованиями Положения 758-П Приложения 2. Может использоваться как единая точка для присвоения УИД обращениям и сделкам, значительно облегчает задачу присвоения УИД обращения УИДу договора.

Сейчас УИД БКИ нужен только для передачи в БКИ и передаче данных при переуступке. Сервис можно встроить как во фронты, так и в бэк, где удобнее.

<h2>Функции:</h2>

<p>Генерация УИД в соответствии с 758-П</p>
<p>Отдельный EndPoint для массовых запросов</p>
<p>Сохранение УИД в БД в связки с номером заявки или номером кредита</p>
<p>Проверка корректности УИД</p>
<p>При запросе по тому же номеру заявки или кредита возвращает ранее сгенерированный УИД</p>
<p>При необходимости УИДы могут быть выгружены из БД</p>
<p>Асинхронная обработка запросов</p>

<h2>Требования:</h2>
<p>- NodeJS</p>
<p>-- Express</p>
<p>-- pg</p>
<p>-- uuid</p>
<p>-- chalk</p>
<p>-- date-format</p>
<p>-- Jest (dev-dep)</p>
<p>- PostgreSQL</p>

<h2>Установка:</h2>
<p>1. Клонировать репу. npm i</p>
<p>2. Создать в Postgres Базу Данных. Настроить conf\pg.json.</p>
<p>3. npm run init </p>
