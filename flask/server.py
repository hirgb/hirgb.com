#!/usr/bin/python3
# coding:utf-8

from flask import Flask, request, make_response
from stockfilter import *
from bs4 import BeautifulSoup, element
import json, db, random, urllib3

app = Flask(__name__)


@app.route('/ajax', methods=['POST'])
def ajax():
    action = request.values['action']
    respObj = {'success': False, 'message': '', 'data': ''}

    if action == 'getstockname':
        query = "select code, name from wave_stocklist where code = '%s'" % request.values['stockcode']
        cursor = db.sqlquery(query)
        stock = cursor.fetchone()
        respObj['data'] = '{"code":"%s", "name":"%s"}' % (stock[0], stock[1])
        respObj['success'] = True
    elif action == 'getindexdata':
        query = "select data from wave_cache where name='index_data'"
        cursor = db.sqlquery(query)
        data = cursor.fetchone()[0]
        respObj['success'] = True
        respObj['data'] = data
    elif action == 'getstockdata':
        try:
            query = "select code, name from wave_stocklist where code = '%s'" % request.values['stockcode']
            cursor = db.sqlquery(query)
            result = cursor.fetchone()
            code = result[0]
            name = result[1]
            del result
            query = "select date,open,close,lowest,highest,ma5,ma10,ma20,ma30,ma60,dif,dea,bar from %s order by id desc limit %d" % (
                request.values['stockcode'], int(request.values['yearcount']) * 250)
            cursor = db.sqlquery(query)
            result1 = cursor.fetchall()
            date = [i[0] for i in result1]
            value = [[i[1], i[2], i[3], i[4]] for i in result1]
            ma5 = [i[5] for i in result1]
            ma10 = [i[6] for i in result1]
            ma20 = [i[7] for i in result1]
            ma30 = [i[8] for i in result1]
            ma60 = [i[9] for i in result1]
            dif = [i[10] for i in result1]
            dea = [i[11] for i in result1]
            bar = [i[12] for i in result1]
            del result1
            date.reverse()
            value.reverse()
            ma5.reverse()
            ma10.reverse()
            ma20.reverse()
            ma30.reverse()
            ma60.reverse()
            dif.reverse()
            dea.reverse()
            bar.reverse()
            stockdata = {"code": code, "name": name, "update": date[-1], "yearcount": request.values['yearcount'],
                         "date": date, "value": value, "ma5": ma5, "ma10": ma10, "ma20": ma20, "ma30": ma30,
                         "ma60": ma60, "dif": dif, "dea": dea, "bar": bar}
            respObj['data'] = json.dumps(stockdata)
            respObj['success'] = True
        except:
            respObj['success'] = False
            respObj['message'] = 'server error'
    elif action == 'getsingletrade':
        if db.md5(request.cookies['loginname'] + 'zhangkefei') == request.cookies['token']:
            query = "select trade from wave_user where login = '%s'" % request.cookies['loginname']
            cursor = db.sqlquery(query)
            trade = json.loads(cursor.fetchone()[0])
            trade = trade.get(request.values['stockcode'], [])
            dataFinal = []
            for i in trade:
                color = ('#cc3300' if i[2] == 'buy' else '#009926')
                dataFinal.append({"name": i[2], "coord": [i[0], i[3]], "itemStyle": {"normal": {"color": color}}})
            respObj['data'] = json.dumps(dataFinal, ensure_ascii=False)
            respObj['success'] = True
    elif action == 'addtrade':
        code = request.values['code']
        date = request.values['date']
        price = request.values['price']
        volume = request.values['volume']
        tradetype = request.values['type']
        user = request.cookies['loginname']
        if user and code and date and price and volume and tradetype:
            query = "select trade from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            trade = json.loads(cursor.fetchone()[0])
            if code in trade:
                trade[code].append([date, volume, tradetype, price])
            else:
                trade[code] = [[date, volume, tradetype, price]]
            query = "update wave_user set trade = '%s' where login = '%s'" % (
                json.dumps(trade, ensure_ascii=False), user)
            db.sqlquery(query)
            respObj['success'] = True
        else:
            respObj['success'] = False
    elif action == 'gettrade':
        query = "select trade from wave_user where login = '%s'" % request.cookies['loginname']
        cursor = db.sqlquery(query)
        trade = json.loads(cursor.fetchone()[0])
        sortedlist = sorted(trade, key=lambda x: trade[x][-1][0], reverse=True)
        stockliststr = '\'' + '\',\''.join(sortedlist) + '\''
        query = "select code, name from wave_stocklist where code in (%s)" % stockliststr
        cursor = db.sqlquery(query)
        result = cursor.fetchall()
        codenamedic = {i[0]: i[1] for i in result}
        tradeData = []
        for i in sortedlist:
            tradeData.append({'code': i, 'name': codenamedic[i], 'value': trade[i]})
        respObj['data'] = json.dumps(tradeData, ensure_ascii=False)
        respObj['success'] = True
    elif action == 'deletetrade':
        try:
            datalist = json.loads(request.values['data'])
            query = "select trade from wave_user where login = '%s'" % request.cookies['loginname']
            cursor = db.sqlquery(query)
            trade = json.loads(cursor.fetchone()[0])
            for i in trade[datalist[1]]:
                if datalist[2] == i[0] and datalist[3] == i[2] and datalist[4] == i[3] and datalist[5] == i[1]:
                    trade[datalist[1]].remove(i)
                    query = "update wave_user set trade = '%s' where login = '%s'" % (
                        json.dumps(trade, ensure_ascii=False), request.cookies['loginname'])
                    db.sqlquery(query)
                    respObj['success'] = True
        except:
            respObj['success'] = False
    elif action == 'getfavorite':
        query = "select favorite from wave_user where login = '%s'" % request.cookies['loginname']
        cursor = db.sqlquery(query)
        favoriteStr = cursor.fetchone()[0]
        favoriteStock = json.loads(favoriteStr)
        stockData = {}
        for e in favoriteStock:
            for i in e['stock']:
                query = "select date, close from %s order by date desc limit 60" % i[0]
                cursor = db.sqlquery(query)
                result = cursor.fetchall()
                date = [i[0] for i in result]
                value = [i[1] for i in result]
                date.reverse()
                value.reverse()
                stockData[i[0]] = {"date": date, "value": value}
        dataFinal = {"favorite": favoriteStock, "stockdata": stockData}
        respObj['data'] = json.dumps(dataFinal, ensure_ascii=False)
        respObj['success'] = True
    elif action == 'renamegroup':
        query = "select favorite from wave_user where login = '%s'" % request.cookies['loginname']
        cursor = db.sqlquery(query)
        favoriteStr = cursor.fetchone()[0]
        favoriteStock = json.loads(favoriteStr)
        for i in range(len(favoriteStock)):
            if favoriteStock[i]['name'] == request.values['oldname']:
                favoriteStock[i] = {"name": request.values['newname'], "stock": favoriteStock[i]['stock']}
                break
        query = "update wave_user set favorite = '%s' where login = '%s'" % (
            json.dumps(favoriteStock, ensure_ascii=False), request.cookies['loginname'])
        db.sqlquery(query)
        respObj['success'] = True
    elif action == 'creategroup':
        try:
            name = request.values['newgroupname']
            user = request.cookies['loginname']
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            favorite.append({"name": name, "stock": []})
            query = "update wave_user set favorite = '%s' where login = '%s'" % (
                json.dumps(favorite, ensure_ascii=False), user)
            db.sqlquery(query)
            respObj['success'] = True
        except:
            respObj['success'] = False
    elif action == 'deletegroup':
        try:
            user = request.cookies['loginname']
            groupname = request.values['groupname']
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            for i in favorite:
                if i['name'] == groupname:
                    favorite.remove(i)
                    break
            query = "update wave_user set favorite = '%s' where login = '%s'" % (
                json.dumps(favorite, ensure_ascii=False), user)
            db.sqlquery(query)
            respObj['success'] = True
        except:
            respObj['success'] = False
    elif action == 'deletefavoritestock':
        try:
            user = request.cookies['loginname']
            infolist = request.values['stock'].split('-')
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            for e in favorite:
                if e['name'] == infolist[0]:
                    for i in e['stock']:
                        if i[0] == infolist[1]:
                            e['stock'].remove(i)
                            break
                    break
            query = "update wave_user set favorite = '%s' where login = '%s'" % (
            json.dumps(favorite, ensure_ascii=False), user)
            db.sqlquery(query)
            respObj['success'] = True
        except:
            respObj['success'] = False
    elif action == 'addfavoritestock':
        try:
            user = request.cookies['loginname']
            stockcode = request.values['stockcode']
            stockname = request.values['stockname']
            group = request.values['group']
            query = "select favorite from wave_user where login = '%s'" % user
            cursor = db.sqlquery(query)
            favorite = json.loads(cursor.fetchone()[0])
            for e in favorite:
                if e['name'] == group:
                    e['stock'].append([stockcode, stockname])
                    break
            query = "update wave_user set favorite = '%s' where login = '%s'" % (
            json.dumps(favorite, ensure_ascii=False), user)
            db.sqlquery(query)
            respObj['success'] = True
        except:
            respObj['success'] = False
    elif action == 'getpublicstrategy':
        try:
            query = "select id, title, subtitle, introduce from wave_strategy where userid is null order by sequence"
            cursor = db.sqlquery(query)
            result = cursor.fetchall()
            strategy = [[i[0], i[1], i[2], i[3]] for i in result]
            respObj['data'] = json.dumps(strategy, ensure_ascii=False)
            respObj['success'] = True
        except:
            respObj['success'] = False
    elif action == 'search':
        data = {'count':0,'stocks':[]}
        strategyid = int(request.values['strategyid'])
        searchPage = int(request.values['searchPage'])
        stocklist = getStockList(strategyid)
        data['count'] = len(stocklist)
        stocklistPage = stocklist[(12*searchPage-12):(12*searchPage)]
        while len(stocklistPage):
            data['stocks'].append(getStockData(stocklistPage[-1]))
            stocklistPage.pop()
        respObj['success'] = True
        respObj['data'] = json.dumps(data, ensure_ascii=False)
    elif action == 'login':
        loginname = request.values['loginname']
        password = request.values['password']
        rawstr = loginname + 'zhangkefei'
        token = db.md5(rawstr)
        query = "select count(*) from wave_user where login = '%s' and password = '%s'" % (loginname, db.md5(password))
        cursor = db.sqlquery(query)
        if cursor.fetchone()[0] > 0:
            respObj['success'] = True
            respObj['data'] = '{"loginname":"%s", "token":"%s"}' % (loginname, token)
        else:
            respObj['success'] = False
    elif action == 'register':
        loginname = request.values['loginname']
        username = request.values['username']
        password = request.values['password']
        query = "select * from wave_user where login = '%s'" % str(loginname)
        cursor = db.sqlquery(query)
        if str(type(cursor.fetchone())) == "<class 'NoneType'>":
            query = "insert ignore into wave_user (login, name, password, favorite) values ('%s', '%s', '%s', '[{\"name\":\"默认分组\", \"stock\":[]}]')" % (
                str(loginname), username, db.md5(password))
            db.sqlquery(query)
            respObj['success'] = True
        else:
            respObj['success'] = False
    elif action == 'lotto_produce_username':
        a = list('abcdefghigklmnopqrstuvwxyz')
        ready = False
        while not ready:
            username = ''.join(random.sample(a, 6))
            query = "select count(name) from lotto_user where name = '%s'" % username
            cursor = db.sqlquery(query)
            if cursor.fetchone()[0] == 0:
                ready = True
        respObj['success'] = True
        respObj['data'] = json.dumps(username)
    elif action == 'lotto_registe':
        username = request.values['username']
        password = request.values['password']
        phone = request.values['phone']

        query = "insert into lotto_user (name, password, phone) values ('%s', '%s', '%s')" % (username, db.md5(password), phone)
        db.sqlquery(query)
        respObj['success'] = True
    elif action == 'lotto_login':
        username = request.values['username']
        password = request.values['password']

        query = "select count(*) from lotto_user where name = '%s' and password = '%s'" % (username, db.md5(password))
        cursor = db.sqlquery(query)
        if cursor.fetchone()[0] > 0:
            respObj['success'] = True
        else:
            respObj['success'] = False
    elif action == 'lotto_query_award_number':
        issue = request.values['issue']
        query = "select number from lotto_award_number where issue = '%s'" % str(issue)
        cursor = db.sqlquery(query)
        result = cursor.fetchone()
        if str(type(result)) == "<class 'NoneType'>":
            respObj['success'] = False
        else:
            respObj['success'] = True
            respObj['data'] = result[0]
    elif action == 'lotto_verify_username':
        username = request.values['username']
        query = "select count(name) from lotto_user where name = '%s'" % username
        cursor = db.sqlquery(query)
        if cursor.fetchone()[0] > 0:
            respObj['success'] = False
        else:
            respObj['success'] = True

    jsonstr = json.dumps(respObj)
    resp = make_response(jsonstr)
    resp.headers['Content-Type'] = 'text/plain; charset=utf-8'
    return resp


@app.route('/wordroot', methods=['GET'])
def wordroot():
    action = request.values['action']
    respObj = {'success': False, 'message': '', 'data': ''}
    if action == 'mryj':
        query = "select data from wordroot_mryj order by id desc limit 1"
        cursor = db.sqlquery(query)
        data = cursor.fetchone()[0]
        respObj['success'] = True
        respObj['data'] = data
    elif action == 'cnn':
        query = "select id, title, image from wordroot_cnn order by id desc limit 5"
        cursor = db.sqlquery(query)
        result = cursor.fetchall()
        data = [[i[0], i[1], i[2]] for i in result]
        respObj['success'] = True
        respObj['data'] = data
    elif action == 'get-article':
        id = request.values['id']
        query = "select title, image, content from wordroot_cnn where id = %s" % id
        cursor = db.sqlquery(query)
        result = cursor.fetchone()
        data = {"title": result[0], "image": result[1], "content": result[2]}
        respObj['success'] = True
        respObj['data'] = data
    elif action == 'dict':
        w = request.values['w']
        url = 'http://dict-co.iciba.com/api/dictionary.php?type=json&key=1AAE3EEB9F6B6551EDD3D67E75991D22&w='+w
        http = urllib3.PoolManager()
        r = http.request('GET', url)
        obj = json.loads(r.data.decode())

        r = http.request('GET', 'http://www.youdict.com/ciyuan/s/' + w)
        soup = BeautifulSoup(r.data.decode(), 'lxml')
        article = soup.select('#article p')[0]
        if article.get_text().find('：') > -1:
            obj['root'] = article.get_text()
        else:
            obj['root'] = ''
        # r = http.request('GET', 'http://www.youdict.com/root/search?wd=architecture')
        # soup = BeautifulSoup(r.data.decode(), 'lxml')
        # article = soup.select('#article')[0]
        # for child in article.children:
        #     if isinstance(child, element.Tag):
        #         print(child.get_text())

        respObj['success'] = True
        respObj['data'] = json.dumps(obj, ensure_ascii=False)

    jsonstr = json.dumps(respObj)
    resp = make_response(jsonstr)
    resp.headers['Content-Type'] = 'text/plain; charset=utf-8'
    return resp

if __name__ == '__main__':
    app.run()
