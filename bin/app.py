#!/usr/bin/env python
# -*- coding: utf-8 -*-
import web
import os
import httplib
import urllib
import urllib2
import subprocess
import json
import sys

web.config.debug = False

urls = (
    '/', 'index',
    '/controls', 'controls',
    '/play', 'play',
    '/stop', 'stop',
    '/pause', 'pause',
    '/search', 'search',
    '/seek30', 'seek30',
    '/back30', 'back30',
    '/voldown', 'voldown',
    '/seek600', 'seek600',
    '/back600', 'back600',
    '/volup', 'volup',
    '/togglesubs', 'togglesubs',
    '/zingcup', 'zingcup',
    '/proxy', 'proxy'
    )

curPath = os.getcwd()
data = []
with open('%s/config.txt' % curPath, 'rb') as f:
    data = json.load(f)
print json.dumps(data)
for thing in data:
    print thing + ': ' + data[thing]
f.close()

class index:
    def GET(self):
        exclude = ['.url', '.sfv', '.nfo', '.idx', '.sub', '.jpg', '.nzb',                    '.srt', '.srr', '.srs', '.zip', 'rar', 'sample', '.txt']
        path = "/mnt/external"
        input = web.input(wordList=None)
        if not input['wordList'] is None:
            wordList = input['wordList'].split()
        else:
            wordList = None
        greeting = ""
        for root, dirs, files in os.walk(path, topdown=True):
            for file in files:
                show = True
                if wordList is None:
                    show = True
                else:
                    for word in wordList:
                        if not word.lower() in ((os.path.join(root)) +                                                     (file.decode('utf-8')).lower()):
                            show = False
                if any(ext in (file.decode('utf-8')).lower() for ext in exclude):
                    show = False
                if show:
                    wholePath = "%s/" % (os.path.join(root)) + file
                    wholePath = wholePath.replace(" ", "+")
                    wholePath = wholePath.replace("'", "\'")
                    greeting = greeting + "<p>" +                                                         "<a href=/play?name=%s>%s</a>" %                                           (wholePath, wholePath) + "</p>"
        return render.index(greeting = greeting)

class play:
    def GET(self):
        input = web.input()
        i = input.name.replace("+", " ")
        subprocess.Popen("killall omxplayer.bin", stdout=subprocess.PIPE,                           shell=True)
        subprocess.Popen("clear", stdout=subprocess.PIPE, shell=True)
        subprocess.Popen("omxplayer \"%s\" < ~/rebigulator/PythonApp/player" % i,                             shell=True)
        subprocess.Popen("echo -n . > ~/rebigulator/PythonApp/player", shell=True)
        return render.play(i = i)

class controls:
    def GET(self):
        return render.controls()

class stop:
    def GET(self):
        subprocess.Popen('echo -n q > ~/rebigulator/PythonApp/player', shell=True)
        return urllib2.urlopen('http://%s:%s/' % (data['xIP'], data['port'])).read()

class pause:
    def GET(self):
        subprocess.Popen('echo -n p > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls()

class seek30:
    def GET(self):
        subprocess.Popen('echo -n "\x1b\x5b\x43" > ~/rebigulator/PythonApp/player',                           shell=True)
        return render.controls()
class back30:
    def GET(self):
        subprocess.Popen('echo -n "\x1b\x5b\x44" > ~/rebigulator/PythonApp/player',                           shell=True)
        return render.controls()
class seek600:
    def GET(self):
        subprocess.Popen('echo -n "\x1b\x5b\x41" > ~/rebigulator/PythonApp/player',                           shell=True)
        return render.controls()
class back600:
    def GET(self):
        subprocess.Popen('echo -n "\x1b\x5b\x42" > ~/rebigulator/PythonApp/player',                           shell=True)
        return render.controls()

class volup:
    def GET(self):
        subprocess.Popen('echo -n + > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls()

class voldown:
    def GET(self):
        subprocess.Popen('echo -n - > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls()

class togglesubs:
    def GET(self):
        subprocess.Popen('echo -n s > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls()

class search:
#    def GET(self):
#        return render.searchform()
    def POST(self):
        form = web.input(keyword = 'None')
        print form.keyword
        #data = {}
        #data['wordList'] = form.keyword
        #url_values = urllib.urlencode(data)
        #print url_values
        #return index(url_values)
        wordList = form.keyword.replace(" ", "+")
        return urllib2.urlopen('http://%s:%s/?wordList=' % (data['xIP'], data['port'])) + wordList).read()

class proxy:
    def GET(self):
#        return urllib2.urlopen('http://www.fifa.com/worldcup/matches');
        return urllib2.urlopen('http://www.livescore.com/worldcup/fixtures/');
class zingcup:
    def GET(self):
#        return urllib2.urlopen('http://www.livescore.com/worldcup/fixtures/');
#        return urllib2.urlopen('http://www.fifa.com/worldcup/matches/');
        return render.zingcup()

if __name__ == "__main__":
    app = web.application(urls, data, globals())
    render = web.template.render('templates/', base='layout')
    app.run()
