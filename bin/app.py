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
import time

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
    '/controlsAudio', 'controlsAudio',
    '/stopAudio', 'stopAudio',
    '/pauseAudio', 'pauseAudio',
    '/seek30Audio', 'seek30Audio',
    '/back30Audio', 'back30Audio',
    '/voldownAudio', 'voldownAudio',
    '/seek600Audio', 'seek600Audio',
    '/back600Audio', 'back600Audio',
    '/volupAudio', 'volupAudio',
    '/nextAudio', 'nextAudio',
    '/lastAudio', 'lastAudio',
    '/togglesubs', 'togglesubs',
    '/addplaylist', 'addplaylist',
    '/playplaylist', 'playplaylist',
    '/clearplaylist', 'clearplaylist',
    '/zingcup', 'zingcup',
    '/proxy', 'proxy'
    )

curPath = os.getcwd()
data = ''
with open('%s/config.txt' % curPath, 'rb') as f:
    data += f.read()
data = json.loads(data.replace('\n', ''))
print data
print json.dumps(data)
print 'port: ' + data['port']
for thing in data:
    print thing + ': ' + data[thing]
f.close()

class index:
    def GET(self):
        exclude = ['.url', '.sfv', '.nfo', '.idx', '.sub', '.jpg', '.nzb', '.srt', '.srr', '.srs', '.zip', 'rar', 'sample', '.txt']
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
                        if not word.lower() in ((os.path.join(root)) + (file.decode('utf-8')).lower()):
                            show = False
                if any(ext in (file.decode('utf-8')).lower() for ext in exclude):
                    show = False
                if show:
                    wholePath = "%s/" % (os.path.join(root)) + file
                    print wholePath
                    wholePath = wholePath.replace(" ", "+")
                    wholePostPath = wholePath.replace("'", "\'")
                    #greeting = greeting + "<p>" + "<a href=/play?name=%s>%s</a>" % (wholePath, wholePath) + "</p>"
                    greeting += "<div id='row' class='media' style='inline-block'><div style='float:left; vertical-align:bottom'>" + file + "</div><form action='http://192.168.1.51:8001/play' style='float:left; margin:10px' method='post'><input type='hidden' name='media' value=" + wholePostPath + "><input type='submit' value='Play'></form><form action='http://192.168.1.51:8001/addplaylist' style='float:left; margin:10px' method='post'><input type='hidden' name='media' value=" + wholePostPath + "><input type='submit' value='Add To Playlist'></form></div>"
        return render.index(greeting = greeting)

class addplaylist:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        i = i.replace("+", "\ ")
        i = i.replace("\'", "\\'")       
        print 'add ' + i + 'to playlist here'
        with open('%s/playlist.m3u' % curPath, 'ab') as f:
            f.write('%s\n' % i)
        f.close()
        return urllib2.urlopen('http://192.168.1.51:8001/').read()

class playplaylist:
    def GET(self):
        url = 'http://192.168.1.51:8001/play'
        values = {'media' : '%s/playlist.m3u' % curPath }
        data = urllib.urlencode(values)
        req = urllib2.Request(url, data)
        return urllib2.urlopen(req)

class clearplaylist:
    def GET(self):
        with open('%s/playlist.m3u' % curPath, 'wb') as f:
            f.write('')
        f.close()
        return urllib2.urlopen('http://192.168.1.51:8001/').read()

class play:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        i = i.replace("+", " ")
        i = i.replace("\'", "\'")
        #print 'playing: ' + i
        if ('.mp3' in i) or ('.flac' in i) or ('.m3u' in i):
            subprocess.Popen("killall vlc.bin", shell=True)
            subprocess.Popen("vlc %s -I http --http-port 9000" % i, shell=True)
            time.sleep(5)
            with open('%s/playlist.m3u' % curPath, 'wb') as f:
                f.write('')
            f.close()
            time.sleep(2)
            return render.controlsAudio(i = i)
        else:
            subprocess.Popen("killall omxplayer.bin", stdout=subprocess.PIPE, shell=True)
            subprocess.Popen("clear", stdout=subprocess.PIPE, shell=True)
            subprocess.Popen("omxplayer -o hdmi \"%s\" < ~/rebigulator/PythonApp/player" % i, shell=True)
            subprocess.Popen("echo -n . > ~/rebigulator/PythonApp/player", shell=True)
            return render.controls(i = i)

class controls:
    def GET(self):
        return render.controls(i = 'Unknown Media')

class stop:
    def GET(self):
        subprocess.Popen('echo -n q > ~/rebigulator/PythonApp/player', shell=True)
        return urllib2.urlopen('http://192.168.1.51:8001/').read()

class pause:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n p > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)

class seek30:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "\x1b\x5b\x43" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)
class back30:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "\x1b\x5b\x44" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)
class seek600:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "\x1b\x5b\x41" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)
class back600:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "\x1b\x5b\x42" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)

class volup:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n + > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)

class voldown:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n - > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)

class togglesubs:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n s > ~/rebigulator/PythonApp/player', shell=True)
        return render.controls(i = i)

class controlsAudio:
    def GET(self):
        return render.controlsAudio(i = i)

class stopAudio:
    def GET(self):
        subprocess.Popen('echo -n "q" > ~/rebigulator/PythonApp/player', shell=True)
        return urllib2.urlopen('http://192.168.1.51:8001/').read()

class pauseAudio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "p" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class seek30Audio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "\x1b\x5b\x43" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class back30Audio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "\x1b\x5b\x44" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class seek600Audio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "seek 600" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class back600Audio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "seek -600" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class volupAudio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        print 'formdata: ' + i
        subprocess.Popen('echo -n "+" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class voldownAudio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "-" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class nextAudio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "k" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

class lastAudio:
    def POST(self):
        form = web.input(media = 'None')
        i = form.media
        subprocess.Popen('echo -n "j" > ~/rebigulator/PythonApp/player', shell=True)
        return render.controlsAudio(i = i)

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
        print json.dumps(data)
        wordList = form.keyword.replace(" ", "+")
        return urllib2.urlopen('http://192.168.1.51:8001/?wordList=' + wordList).read()

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
    app = web.application(urls, globals())
    render = web.template.render('templates/', base='layout')
    app.run()
