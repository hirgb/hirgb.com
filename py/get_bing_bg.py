#!/usr/bin/python3
# coding:utf-8


from mytool import *
import json, urllib3, chardet, pymysql


# try:
url = 'http://cn.bing.com/HPImageArchive.aspx?format=js&n=1'
http = urllib3.PoolManager()
r = http.request('GET', url)
data = r.data.decode(chardet.detect(r.data)['encoding'])
obj = json.loads(data)['images'][0]
imgurl = 'https://cn.bing.com' + obj['url']
copyright = obj['copyright']

query = "insert into hirgb_bingbg (url, copyright) values (%s, %s)"
con = pymysql.connect('localhost', 'root', '!QAZ2wsx', 'wavelab', charset='utf8')
cursor = con.cursor()
cursor.execute(query, (imgurl, copyright))
con.commit()
con.close()
log('get', 'bing_img is added.')

# except:
#     log('error', 'bing_img getting error.')
