from kafka import KafkaProducer
from mimesis import Address
from mimesis import Person 
import random
import time

time.sleep(2)

producer = KafkaProducer(bootstrap_servers = 'kafka:9092')
country = ['cs', 'da', 'de', 'de-at', 'de-ch', 'el', 'en', 'en-au', 'en-ca', 'en-gb',
		'es', 'es-mx', 'et', 'fa', 'fi', 'fr', 'hu', 'is', 'it', 'ja', 'kk', 'ko',
		'nl', 'nl-be', 'no', 'pl', 'pt', 'pt-br', 'ru', 'sv', 'tr', 'uk', 'zh']

def random_time():
	hour = random.randint(0, 23)
	minute = random.randint(0, 59)
	if hour < 10:
		if minute < 10:
			time = '0' + str(hour) + ':' + '0' + str(minute)
		else:
			time = '0' + str(hour) + ':' + str(minute)
	else:
		if minute < 10:
			time = str(hour) + ':' + '0' + str(minute)
		else:
			time = str(hour) + ':' + str(minute)
	return time	 

while True:
	con = random.randint(0, len(country) - 1)
	location = Address(country[con])
	id_person = Person(country[con])
	geo = location.coordinates()
	key = 0
	key_bytes = bytes(str(key), encoding = 'utf-8')
	msg = ((((str(id_person.telephone()).replace(' ', '')).replace('+', '')).replace('(', '')).replace(')', '')).replace('-', '') + '	' + str(geo['latitude']) + '	' + str(geo['longitude']) + '	' + random_time()
	msg_bytes = bytes(msg, encoding = 'utf-8')
	producer.send('test', key = key_bytes, value = msg_bytes)
	producer.flush()
	geo.clear()
	time.sleep(0.25)
