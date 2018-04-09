#!/usr/bin/python3

import json
import db


def application(env, start_response):
    sqlstr = "select * from wave_user where login = 'zhkf'"
    cursor = db.sqlquery(sqlstr)
    result = cursor.fetchall()
    jsonstr = json.dumps(result)
    start_response('200 OK', [('Content-Type', 'text/plain')])
    return bytes(jsonstr, 'utf8')
    # return HttpResponse('helloworld')