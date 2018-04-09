#!/usr/bin/python3

import json, db, datetime

def save(strategyid, datastr):
    str1 = "insert into `wave_strategy_filter` (`strategyid`,`stocks`) values (%d,'%s') on duplicate key update `stocks`='%s'" % (strategyid, datastr, datastr)
    db.sqlquery(str1)

def isNegetive(numlist):
    for i in numlist:
        if i < 0:
            continue
        else:
            return False
    else:
        return True

def getStockList(query = "select code from wave_stocklist where calculated = 1 and issuspend = 0 and code not in ('sh000001', 'sz399001', 'sz399005', 'sz399006')"):
    cursor = db.sqlquery(query)
    result = cursor.fetchall()
    stocklist = [i[0] for i in result]
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

print('%s start to filter strategy stocks.' % str(datetime.datetime.now()))
for strategyid in range(2, 20):
    finaldata = []
    finaldatastr = ''
    #fan tan xian feng
    if strategyid == 11:
        stocklist = getStockList()
        while len(stocklist):
            query = "select bar from %s order by date desc limit 10" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            barlist = [float(i[0]) for i in result]
            if isNegetive(barlist) and barlist[0] > -0.2:
                finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #chuang xin gao
    elif strategyid == 12:
        while len(stocklist):
            query = "select close from %s order by date desc limit 60" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            closelist = [float(i[0]) for i in result]
            if max(closelist) == closelist[0]:
                finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #lian xu shang zhang
    elif strategyid == 13:
        stocklist = getStockList("select code from wave_stocklist where riseday > 5 and issuspend = 0 and code not in ('sh000001', 'sz399001', 'sz399005', 'sz399006') order by riseday desc")
        while len(stocklist):
            finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #chuang xin di
    elif strategyid == 14:
        while len(stocklist):
            query = "select close from %s order by date desc limit 60" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            closelist = [float(i[0]) for i in result]
            if min(closelist) == closelist[0]:
                finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #LianXuXiaDie
    elif strategyid == 15:
        stocklist = getStockList("select code from wave_stocklist where fallday > 5 and issuspend = 0 and code not in ('sh000001', 'sz399001', 'sz399005', 'sz399006') order by fallday desc")
        while len(stocklist):
            finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #HongSanBing
    elif strategyid == 3:
        stocklist = getStockList("select code from wave_stocklist where calculated = 1 and riseday = 3 and issuspend = 0 and code not in ('sh000001', 'sz399001', 'sz399005', 'sz399006')")
        while len(stocklist):
            query = "select bar from %s order by date desc limit 10" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            barlist = [float(i[0]) for i in result]
            if isNegetive(barlist):
                finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #JianSanBing
    elif strategyid == 2:
        stocklist = getStockList("select code from wave_stocklist where calculated = 1 and riseday > 3 and issuspend = 0 and code not in ('sh000001', 'sz399001', 'sz399005', 'sz399006')")
        while len(stocklist):
            query = "select close, highest from %s order by date desc limit 2" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            datalist = [[float(i[0]), float(i[1])] for i in result]
            if datalist[0][0] > datalist[1][1]:
                finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    #ShuGuangChuXian
    elif strategyid == 4:
        stocklist = getStockList("select code from wave_stocklist where calculated = 1 and riseday = 2 and issuspend = 0 and code not in ('sh000001', 'sz399001', 'sz399005', 'sz399006')")
        while len(stocklist):
            query = "select bar from %s order by date desc limit 10" % stocklist[-1]
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            barlist = [float(i[0]) for i in result]
            if isNegetive(barlist):
                finaldata.append(stocklist[-1])
            stocklist.pop()
        finaldatastr = json.dumps(finaldata)
    else:
        pass
    save(strategyid, finaldatastr)
else:
    print('%s end.' % str(datetime.datetime.now()))
    print('-' * 30)
