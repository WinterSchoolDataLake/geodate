# Общая документация проекта Задача для реализации варианта поступления потоковых данных в Data Lake и первый анализ ((Kafka или БД) + spark streamig + geomesa + NoSQL)

## **Цели:**

1 вариант: Реализовать решение задачи вычитывания данных о событиях с геопозицией, позволяющее доставать из БД данные по произвольному geo-полигону в заданный промежуток времени.

Результат проекта - иметь возможность доставать из БД данные по произвольному геополигону в заданный промежуток времени.

2 вариант: Целью решения задачи является осуществление быстрого анализа пространственно-временного положения абонентов.

## Общее описание проекта:

1.  На первом компьютере на Python 3.6+ генерируем случайную базу данных пользователей, в которую для каждого пользователя входят их ID, долгота и широта их местоположения (геопозиция) и время последней активности -далее стандартный набор данных пользователя. На этом этапе возможна генерация нескольких стандартных наборов для одного и того же пользователя.
2. Используем Apache Kafka для обмена сообщениями между первым компьютером и вторым. 
3. На втором компьютере в Spark реализуем механизм считывания данных из Kafka. 
4. В Spark Streaming формируется датафрейм из стандартных наборов пользователей во временном окне в 10 минут.
5. С помощью Spark Streaming полученные события дедублицируем.
6. Данное о geo-позиции пользователей обрабатываются с помощью geomesa + spark streaming и сохраняются в NoSQL базу данных по GeoHash индексу. В качестве NoSQL БД можно использовать Apache Cassandra.
7. В результате получим возможность доставать из NoSQL БД данные по произвольному geo-полигону. А точнее, какие пользователи присутствовали в этом полигоне с 12:00 по 16:00.

## Видение**:**

## Назначение работы:

Созданная система предназначена для определения числа абонентов, находящихся в заданном геополигоне на карте на заданном временном промежутке на основе сгенерированых данных.

## Требования к системе:

### Требования к программному обеспечению компьютеров:

Python 3.6+, Java, Scala, Apache Kafka, Cassandra, Apache Spark, Geomesa, Docker.

### Требования к составу разрабатываемой системы

Схема системы.

1) Spark ...???

2) ?!

### Требования, предъявляемые к системе

Spark должен выдавать сформированный датафрейм из пространственно-временных данных абонентов с заданной частотой (10 минут) в систему управления базами данных Cassandra.

В итоге решения задачи необходимо визуализировать сгенерированную и обработанную абонентов с координатами на карте выбранного геополигона. На карте будут отображены и выделены точки, соответствующие координатам абонента, а в отдельном терминале:

1) id абонента
2) номер телефона

3) время последней активности абонента

4) широту в это время

5) долготу

Данные должны обновляться с периодичностью в 10 минут: пользователь может запрашивать число абонентов в выбранном геополигоне за любой промежуток времени не ранее, чем за 10 минут до настоящего времени.

## Ход работы... это надо?:

Разработчики, установив библиотеки Mimesis и Kafka_Python 1.4.7, на языке программирования Python 3.6 реализовали Producer, генерирующий пространственно-временые данные абонентов, и отправляющий их в Consumer, в нашем случае распределенную систему Apache Kafka.

## Макет системы:

![Макет.png](https://raw.githubusercontent.com/WinterSchoolDataLake/geodate/master/docs/%D0%94%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%20%D0%B1%D0%B5%D0%B7%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(1).png)

## **Правила и ограничения**:

---

## Дополнительная информация:

[Стейкхолдеры](https://github.com/WinterSchoolDataLake/geodate/blob/master/docs/stakeholder.md "Это макет")

[Словарь терминов](https://github.com/WinterSchoolDataLake/geodate/blob/master/docs/dictionary.md)

[Доступы к стендам и внешним системам](https://github.com/WinterSchoolDataLake/geodate/blob/master/docs/stand_access.md)

[Версии проекта](https://github.com/WinterSchoolDataLake/geodate/blob/master/docs/versions.md)
