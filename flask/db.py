#!/usr/bin/python3
# coding:utf-8

import pymysql, hashlib


def sqlquery(query):
    con = pymysql.connect('localhost', 'root', '123456', 'wavelab', charset = 'utf8')
    try:
        cursor = con.cursor()
        cursor.execute(query)
        con.commit()
        con.close()
        return cursor
    except:
        con.rollback()
        con.close()


def md5(rawstr):
    obj = hashlib.md5()
    obj.update(rawstr.encode('utf-8'))
    return obj.hexdigest()

