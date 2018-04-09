#!/usr/bin/python3
import db, json

def isNegetive(numlist):
    for i in numlist:
        if i < 0:
            continue
        else:
            return False
    else:
        return True
def getStockList(id):
    query = "select stocks from wave_strategy_filter where strategyid=%d" % int(id)
    cursor = db.sqlquery(query)
    result = cursor.fetchone()
    stocklist = json.loads(result[0])
    return stocklist

def getStockData(stockcode):
    query = "select code, name from wave_stocklist where code = '%s'" % stockcode
    cursor = db.sqlquery(query)
    result = cursor.fetchone()
    code, name = result[0], result[1]
    query = "select date, close from %s order by date desc limit 60" % code
    cursor = db.sqlquery(query)
    tempdata = cursor.fetchall()
    date = [i[0] for i in tempdata]
    value = [i[1] for i in tempdata]
    date.reverse()
    value.reverse()
    return {"code":code, "name":name, "date":date, "value":value}
