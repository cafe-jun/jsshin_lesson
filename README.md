## 의존설 설치

```bash
$ npm install
```

## API 서버 기동

```bash
# development
$ npm run start:start

```

## DB 테이블

```sql
CREATE TABLE `lesson` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lessonType` int DEFAULT NULL,
  `frequenciesType` int DEFAULT NULL,
  `durationsType` int DEFAULT NULL,
  `createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lessonStartTime` timestamp NULL DEFAULT NULL,
  `coachId` int DEFAULT NULL,
  `lessonEndTime` timestamp NULL DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `userPhone` varchar(100) DEFAULT NULL,
  `lessonId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson_leesonTime_idx` (`lessonStartTime`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

## env 설정

```bash
<변수>
DB_HOST=<DATEBASE_HOST>
DB_USERNAME=<DATEBASE_USER>
DB_PASSWORD=<DATEBASE_PASSWORD>
DB_DATABASE=<DATEBASE_NAME>
```
