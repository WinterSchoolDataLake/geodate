# Общая документация

# Проект:

Задача реализации варианта поступления потоковых данных в Data Lake и первый анализ ((Apache Kafka или БД) + Apache Spark Streaming + GeoMesa + Apache Cassandra)

## **Цели:**

1. Использование стека технологий — Apache Kafka +Apache Spark Streaming + GeoMesa +  Apache Cassandra — для осуществления анализа пространственно-временного положения абонентов в заданном геополигоне. 
2. Определение пикового (максимального) значения нагрузки системы, то есть максимального количества N данных в единицу времени, которое система способна корректно обработать. Изучить варианты поведения системы/Apache Kafka при превышении предельной нагрузки. 

## Назначение:

Созданная система предназначена для определения числа абонентов, находящихся в заданном геополигоне на карте на заданном временном промежутке на основе сгенерированых данных.

## План проекта:

1. Первый разработчик на Python 3.6+ генерирует случайный поток данных пользователей, в который для каждого пользователя входят их ID, долгота и широта их местоположения (геопозиция) и время последней активности - далее стандартный набор данных пользователя. На этом этапе возможна генерация нескольких стандартных наборов для одного и того же пользователя, которые могут быть как одинаковыми, так и нет.
2. Команда использует Apache Kafka для обмена сообщениями между первым контейнером и вторым. 
3. Во втором контейнере на Apache Spark реализуется механизм считывания данных из Apache Kafka.
4. В Spark Streaming формируется датафрейм из стандартных наборов пользователей во временном окне в 10 минут.
5. Данные о геопозиции пользователей обрабатываются с помощью geomesa + Apache Spark Streaming, отправляются на 3 компьютер, где сохраняются в NoSQL базу данных по GeoHash индексу. В качестве NoSQL БД используется Apache Cassandra.
6. В результате становится возможным получать из NoSQL БД данные по произвольному геополигону.

## Требования к системе:

### Требования к техническому оборудованию:

В проекте задействован ноутбук, данная архитектура позволяет использовать сервер в качестве связующего элемента и пользовательских ПК на выходе.

### Требования к программному обеспечению компьютера:

Python 3.6+, Java, Scala, Apache Kafka, Apache ZooKeeper, Apache Cassandra, Apache Spark, GeoMesa, Docker.

### Требования, предъявляемые к системе:

  **

Spark должен выдавать сформированный датафрейм из пространственно-временных данных абонентов с заданной частотой (10 минут) в систему управления базами данных Cassandra.

## Макет системы:

![Макет.png](https://raw.githubusercontent.com/WinterSchoolDataLake/geodate/master/docs/___(10).png)

## Правила и ограничения:

---

## Дополнительная информация:

[Стейкхолдеры](https://github.com/WinterSchoolDataLake/geodate/blob/master/docs/Untitled.md)

[Словарь терминов](https://github.com/WinterSchoolDataLake/geodate/blob/master/docs/dictionary.md)
