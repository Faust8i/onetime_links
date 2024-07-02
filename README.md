# Задание.

## Реализовать сервис одноразовых ссылок.
Необходимо реализовать сервис, который будет состоять из 2х эндпойнтов:       
       
1. Создать одноразовую ссылку       
Принимает строку, запоминает её и возвращает ссылку, по которой можно получить строку.
Одноразовая ссылка должна быть уникальна, т.е. в один момент времени, в сервисе не может быть 2х одинаковых активных одноразовых ссылок.       
       
2. Получение значения по одноразовой ссылке, сгенерированной в 1-м эндпойнте.       
При получении значения по одноразовой ссылке необходимо проверять, активна ли она. 
Если ссылка уже использована, то следует вернуть сообщение об ошибке.       

После выполнения, код должен быть выложен в публичный репозитория GitHub, Gitlab, BitBucket.       
Можно использовать любой способ хранения данных.

# Реализация.

## Стэк:
- Node.js
- NestJS

## Реализовано сверх задания:
- обработка ошибок
- кэширование и время действия ссылок
- описание API (swagger)
- ассинхронность

## Что можно записать в бэклог:
- перевести кэширование из In-memory например на Redis
- конфиг файл
- тесты
- логгер

# Запуск.

```
npm install
npm start
```

# Проверка работоспособности.

* Коллекция запросов для Postman прилагается в файле _OnetimeLinks.postmancollection.json_
* Swagger открывается по _"<адресу сервиса>/api"_
