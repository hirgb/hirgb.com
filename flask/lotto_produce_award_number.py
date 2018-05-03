# coding:utf-8

import db, datetime
from random import randint

award_str = str(randint(0, 9)) + str(randint(0, 9)) + str(randint(0, 9)) + str(randint(0, 9))
issue = str(datetime.datetime.now())[:10].replace('-', '')

a = 1
if datetime.datetime.now().minute > 40:
    a = 2

issue += str(datetime.datetime.now().hour * 2 + a).zfill(2)

print(issue)
exit()
query = "insert ignore into award_number (issue, number) values ('%s', '%s')" % (issue, award_str)
db.sqlquery(query)