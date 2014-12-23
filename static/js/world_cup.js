var teams = [
    {"id":"gre","title":"Greece","code":"GRE","group":"c",'ranking':12,'color1':'#FFFFFF','color2':'#5499DD','color3':'#FFFFFF'},
    {"id":"rus","title":"Russia","code":"RUS","group":"h",'ranking':19,'color1':'#4365B1','color2':'#B13823','color3':'#FFFFFF'},
    {"id":"ned","title":"Netherlands","code":"NED","group":"b",'ranking':15,'color1':'#DE6200','color2':'#FFFFFF','color3':'#FFFFFF'},
    {"id":"ger","title":"Germany","code":"GER","group":"g",'ranking':2,'color1':'#B13925','color2':'#F3CD00','color3':'#FFFFFF'},
    {"id":"por","title":"Portugal","code":"POR","group":"g",'ranking':4,'color1':'#5F9A4A','color2':'#B13925','color3':'#FFFFFF'},
    {"id":"esp","title":"Spain","code":"ESP","group":"b",'ranking':1,'color1':'#F4ED1B','color2':'#BF1F1E','color3':'#FFFFFF'},
    {"id":"ita","title":"Italy","code":"ITA","group":"d",'ranking':9,'color1':'#B13925','color2':'#5F9A4A','color3':'#FFFFFF'},
    {"id":"cro","title":"Croatia","code":"CRO","group":"a",'ranking':18,'color1':'#CE1D1C','color2':'#2E3C8E','color3':'#FFFFFF'},
    {"id":"fra","title":"France","code":"FRA","group":"e",'ranking':17,'color1':'#FFFFFF','color2':'#B13925','color3':'#FFFFFF'},
    {"id":"eng","title":"England","code":"ENG","group":"d",'ranking':10,'color1':'#FFFFFF','color2':'#C21217','color3':'#FFFFFF'},
    {"id":"sui","title":"Switzerland","code":"SUI","group":"e",'ranking':6,'color1':'#FFFFFF','color2':'#B13925','color3':'#FFFFFF'},
    {"id":"bel","title":"Belgium","code":"BEL","group":"h",'ranking':11,'color1':'#F3CD00','color2':'#B13925','color3':'#FFFFFF'},
    {"id":"bih","title":"Bosnia-Herzegovina","code":"BIH","group":"f",'ranking':21,'color1':'#FFFFFF','color2':'#2D2C75','color3':'#FFFFFF'},
    {"id":"alg","title":"Algeria","code":"ALG","group":"h",'ranking':22,'color1':'#B13925','color2':'#5F9A4A','color3':'#FFFFFF'},
    {"id":"civ","title":"Ivory Coast","code":"CIV","group":"c",'ranking':23,'color1':'#5F9A4A','color2':'#D8661A','color3':'#FFFFFF'},
    {"id":"gha","title":"Ghana","code":"GHA","group":"g",'ranking':37,'color1':'#F3CC00','color2':'#5E9911','color3':'#B23500'},
    {"id":"cmr","title":"Cameroon","code":"CMR","group":"a",'ranking':56,'color1':'#F3CC00','color2':'#5E9911','color3':'#B23500'},
    {"id":"nga","title":"Nigeria","code":"NGA","group":"f",'ranking':44,'color1':'#FFFFFF','color2':'#4D8947','color3':'#FFFFFF'},
    {"id":"mex","title":"Mexico","code":"MEX","group":"a",'ranking':20,'color1':'#539549','color2':'#CE1D1C','color3':'#FFFFFF'},
    {"id":"usa","title":"USA","code":"USA","group":"g",'ranking':13,'color1':'#CE1D1C','color2':'#2F3391','color3':'#FFFFFF'},
    {"id":"hon","title":"Honduras","code":"HON","group":"e",'ranking':33,'color1':'#FFFFFF','color2':'#4365B1','color3':'#FFFFFF'},
    {"id":"crc","title":"Costa Rica","code":"CRC","group":"d",'ranking':28,'color1':'#4034df'/*'#3E3C96'*/,'color2':'#E91E1C','color3':'#FFFFFF'},
    {"id":"arg","title":"Argentina","code":"ARG","group":"f",'ranking':5,'color1':'#FFFFFF','color2':'#2386C3','color3':'#FFFFFF'},
    {"id":"bra","title":"Brazil","code":"BRA","group":"a",'ranking':3,'color1':'#FFC400','color2':'#2D8A31','color3':'#162C7F'},
    {"id":"chi","title":"Chile","code":"CHI","group":"b",'ranking':14,'color1':'#4034df'/*'#162C7F'*/,'color2':'#BF281E','color3':'#FFFFFF'},
    {"id":"uru","title":"Uruguay","code":"URU","group":"d",'ranking':7,'color1':'#8FBBE7','color2':'#FFFFFF','color3':'#FFFFFF'},
    {"id":"col","title":"Colombia","code":"COL","group":"c",'ranking':8,'color1':'#FFC400','color2':'#BF281E','color3':'#162C7F'},
    {"id":"ecu","title":"Ecuador","code":"ECU","group":"e",'ranking':26,'color1':'#FFC400','color2':'#BF281E','color3':'#162C7F'},
    {"id":"aus","title":"Australia","code":"AUS","group":"b",'ranking':62,'color1':'#4034df'/*'#162C7F'*/,'color2':'#C12326','color3':'#FFFFFF'},
    {"id":"jpn","title":"Japan","code":"JPN","group":"c",'ranking':46,'color1':'#FFFFFF','color2':'#D3111C','color3':'#FFFFFF'},
    {"id":"kor","title":"South Korea","code":"KOR","group":"h",'ranking':57,'color1':'#BF281E','color2':'#162C7F','color3':'#FFFFFF'},
    {"id":"irn","title":"Iran","code":"IRN","group":"f",'ranking':43,'color1':'#2D8A31','color2':'#BF281E','color3':'#FFFFFF'}]
    ;

function getMatches(group, matches, roundNum) {
    var group = group;
    var matches = matches;
    var roundNum = roundNum;
    roundDict = {'1':16,'2':32,'3':48,'4':56,'5':60,'6':62,'7':64};
//    console.log('in getMatches()');
//    console.log(JSON.stringify(group));
    for(getMatchKey in group) {
//        console.log('finding ' + getMatchKey + ' matches');
        for(i=0; i < roundDict[roundNum]; i++) {
            if(getMatchKey in matches[i]) {
                var theMatch = {};
                for(matchKey in matches[i]) {
                    if(getMatchKey === matchKey) {
                        theMatch['goalsFor'] = matches[i][getMatchKey];
                    }
                    else {
                        theMatch['goalsAgainst'] = matches[i][matchKey];
                        theMatch['opponent'] = matchKey;
                    };
                };
            group[getMatchKey]['matches'].push(theMatch);
            };
        };
    };
    return group
};

function pointCounter(match) {
    if(match['goalsFor'] > match['goalsAgainst']) {
        return 3;
    }
    else if(match['goalsFor'] === match['goalsAgainst']) {
        return 1;
    }
    else {
        return 0;
    }
};

function pointTotal(team) {
    var points = 0;
    for (i=0; i < team['matches'].length; i++) {
        points += pointCounter(team['matches'][i]);
    };
    return points;
};

function goalsScored(team) {
    var goalsFor = 0;
    for (i=0; i < team['matches'].length; i++) {
        goalsFor += team['matches'][i]['goalsFor'];
    };
    return goalsFor;
};

function goalDifference(team) {
    var goalsFor = goalsScored(team);
    var goalsAgainst = 0;
    for (i=0; i < team['matches'].length; i++) {
        goalsAgainst += team['matches'][i]['goalsAgainst'];
    };
    return goalsFor - goalsAgainst;
};

function sortFinal(group, matches) {
    var group = group;
    var matches = matches;
    for(sortFinalKey in group) {
        if(group[sortFinalKey]['matches'].length === 7) {
            if(sortFinalKey in matches[62]) {
                if(pointCounter(group[sortFinalKey]['matches'][6])===3) {
                    group[sortFinalKey]['ranks'][6] = 3;
                    group[sortFinalKey]['place'] = 3;
                }
                else {
                    group[sortFinalKey]['ranks'][6] = 4;
                    group[sortFinalKey]['place'] = 4;
                };
            };
            if(sortFinalKey in matches[63]) {
                if(pointCounter(group[sortFinalKey]['matches'][6])===3) {
                    group[sortFinalKey]['ranks'][6] = 1;
                    group[sortFinalKey]['place'] = 1;
                }
                else {
                    group[sortFinalKey]['ranks'][6] = 2;
                    group[sortFinalKey]['place'] = 2;
                };
            };
        };
    };
    return group;
};

function groupSorter(group) {
    var group = group;
    var orderedList = [];
    for(sorterKey in group) {
        orderedList.push(group[sorterKey]);
//        console.log(group[sorterKey].id);
    };
    orderedList = orderedList.sort(function (a,b) {
//        console.log('in points');
        if (a.matches.length === 0 && b.matches.length === 0) {
            if(a.ranking > b.ranking) {
                return -1;
            }
            else {
                return 1;
            };
        };
        if (a.matches.length != b.matches.length) {
            if (a.matches.length > b.matches.length) {
                return -1;
            }
            if (a.matches.length < b.matches.length) {
                return 1;
            }
            else {
                return 0;
            };
        };
        if (a.points != b.points) {
            if (a.points > b.points) {
                return -1;
            }
            if (a.points < b.points) {
                return 1;
            }
            else {
                return 0;
            };
        };
        if (a.goalDiff != b.goalDiff) {
//            console.log('in goalDiff');
            if (a.goalDiff > b.goalDiff) {
                return -1;
            }
            if (a.goalDiff < b.goalDiff) {
                return 1;
            }
            else {
                return 0;
            };
        };
        if (a.goals != b.goals) {
//            console.log('in goals scored');
            if (a.goals > b.goals) {
                return -1;
            }
            if (a.goals < b.goals) {
                return 1;
            }
            else {
                return 0;
            };
        };
        for(i=0;i<a['matches'].length;i++) {
//            console.log('in head to head');
            if(b.id in a['matches']) {
                if(a.goalsFor > a.goalsAgainst) {
                    return -1;
                }
                if(a.goalsFor < a.goalsAgainst) {
                    return 1;
                }
            };
        };
//        console.log('coin flipped');
        return Math.floor(Math.random() * (1 - 0 + 1))
    });
    for(i=0;i<orderedList.length;i++) {
//        console.log(orderedList[i].id);
        group[orderedList[i].id]['place'] = i + 1;
        group[orderedList[i].id]['ranks'].push(i + 1);
    };
    return group;
};

function roundFourMatches(group, matches, groupLetter) {
    var group = group;
    var matches = matches;
    var matchupDict = {'a':[49,51],'b':[51,49],'c':[50,52],'d':[52,50],
                       'e':[53,55],'f':[55,53],'g':[54,56],'h':[56,54]
    }
    var roundFourDict = {};
    for(roundFourKey in group) {
        if(group[roundFourKey]['place'] === 1) {
            matches[matchupDict[groupLetter][0]-1][roundFourKey] = 0; 
        }
        if(group[roundFourKey]['place'] === 2) {
            matches[matchupDict[groupLetter][1]-1][roundFourKey] = 0;
        }
    };
    return matches;
};

function knockoutMatches(group, matches, round) {
    var group = group;
    var matches = matches;
    var round = round;
    var roundDict = {'4':[48,55],'5':[56,59],'6':[60,61],'7':[62,63]};
    var matchMap = {'48':56,'49':56,'50':58,'51':58,'52':57,'53':57,
                    '54':59,'55':59,'56':60,'57':60,'58':61,'59':61};
                    
    for(knockoutKey in group) {
//        console.log(knockoutKey + '-' + group[knockoutKey]['place']);
//        console.log('round generated: ' + round);
//        console.log('round searched: ' + (round-1));
        if(group[knockoutKey]['matches'].length === round-1) {
            if(group[knockoutKey]['matches'].length !== 6) {
                for(i=roundDict[(round-1).toString()][0];
                    i<=roundDict[(round-1).toString()][1];i++) {
                    if(knockoutKey in matches[i]) {
                        if(pointCounter(group[knockoutKey]['matches'][round-2]
                            ) > 0) {
                            for(mapKey in matchMap) {
//                                console.log('parsing match: ' + knockoutKey);
                                if(parseInt(mapKey) === i) {
                                    matches[matchMap[mapKey]][knockoutKey] = 0;
                                };
                            };
                        };
                    };
                };
            }
            else {
                if(pointCounter(group[knockoutKey]['matches'][5]) === 3) {
                    matches[63][knockoutKey] = 0;
                }
                else {
                    matches[62][knockoutKey] = 0;
                };
            };
        };
    };
    return matches;
};

function refreshData(group, matches, round) {
    var group = group;
    var matches = matches;
    var round = round;
//    console.log('refreshdata group: ' + JSON.stringify(group));
    for(groupKey in group) {
        group[groupKey]['matches'] = [];
    };
    group = getMatches(group, matches, round);
    for(groupKey in group) {
        group[groupKey]['points'] = pointTotal(group[groupKey]);
        group[groupKey]['goals'] = goalsScored(group[groupKey]); 
        group[groupKey]['goalDiff'] = goalDifference(group[groupKey]);
    };
    return group;
};

function writeGroup(group) {
    for(writeKey in group) {
        for(i=0; i < group[writeKey]['matches'].length; i++) {
            document.writeln(writeKey+' v ' +group[writeKey]['matches'][i]['opponent']+' - ');
            document.writeln('scored: ' +group[writeKey]['matches'][i]['goalsFor']);
            document.writeln('allowed: '+group[writeKey]['matches'][i]['goalsAgainst'] + '<br>');
            };
        document.writeln(writeKey+' total points: ' + group[writeKey]['points'] + '<br>' + writeKey + ' finished in position: ' + group[writeKey]['place'] + "<br><br>");
    };
};

function createMatches(matches) {
    var match;
    var tempMatches = [];
    var matchStr;
    var addMatch = false;
    for(i=0;i<teams.length;i++) {
        for(j=0;j<teams.length;j++) {
            if(teams[i]['group'] === teams[j]['group']) {
                if(teams[i]['id'] !== teams[j]['id']) {
                    if(matches.length === 0) {
                        addMatch = true;
                                            }
                    else {
                        addMatch = true;
                        for(k=0;k<matches.length;k++) {
                            if(teams[j]['id'] in matches[k] && 
                               teams[i]['id'] in matches[k]) {
                                addMatch = false;
                            };
                        };
                    };
                    if(addMatch === true) {
                        matchStr = '{\"' +teams[i]['id'] + '\":0,\"' +
                            teams[j]['id'] + '\":0}';
                        matches.push(JSON.parse(matchStr));
//                        console.log('added:'+teams[i]['id']+','+
//                                            teams[j]['id']);
                        addMatch = false;
                    };
                };
            };
        };
    };
    return matches;
};

function getGroup(groupLetter) {
    var group = {};
    var groupLetter = groupLetter;
    for(j=0;j<teams.length;j++) {
        if(groupLetter === teams[j].group) {
            group[teams[j].id] = {matches:[],points:0,place:null,ranks:[],
                                  goals:0,goalDiff:0,id:teams[j].id,
                                  ranking:teams[j].ranking};
//            console.log('getGroup ' + groupLetter + ':' + teams[j].id);
        };
    };
    return group;
};

function getFifaOrder(group) {
    var group = group;
    var orderedList = [];
    for(y=0;y<group.length;y++) {
        orderedList.push(group[y]);
    };
    orderedList = orderedList.sort(function(a,b) {
        if(a.ranking > b.ranking) {
            return 1;
        }
        else {
            return -1;
        };
    });
    return orderedList;
};

var preMatches = [{"bra":0,"cro":0},{"cmr":0,"mex":0},{"ned":0,"esp":0},
               {"chi":0,"aus":0},{"gre":0,"col":0},{"crc":0,"uru":0},
               {"ita":0,"eng":0},{"civ":0,"jpn":0},{"sui":0,"ecu":0},
               {"fra":0,"hon":0},{"bih":0,"arg":0},{"ger":0,"por":0},
               {"nga":0,"irn":0},{"usa":0,"gha":0},{"bel":0,"alg":0},
               {"rus":0,"kor":0},{"bra":0,"mex":0},{"ned":0,"aus":0},
               {"esp":0,"chi":0},{"cro":0,"cmr":0},{"civ":0,"col":0},
               {"eng":0,"uru":0},{"gre":0,"jpn":0},{"ita":0,"crc":0},
               {"fra":0,"sui":0},{"hon":0,"ecu":0},{"arg":0,"irn":0},
               {"ger":0,"gha":0},{"bih":0,"nga":0},{"rus":0,"bel":0},
               {"alg":0,"kor":0},{"usa":0,"por":0},{"ned":0,"chi":0},
               {"esp":0,"aus":0},{"cmr":0,"bra":0},{"mex":0,"cro":0},
               {"ita":0,"uru":0},{"eng":0,"crc":0},{"col":0,"jpn":0},
               {"gre":0,"civ":0},{"nga":0,"arg":0},{"bih":0,"irn":0},
               {"sui":0,"hon":0},{"fra":0,"ecu":0},{"gha":0,"por":0},
               {"usa":0,"ger":0},{"bel":0,"kor":0},{"rus":0,"alg":0}
               ];

function matchSimulator(matches, startMatchNumber, endMatchNumber) {
    var matchScore = [];
    for(i=startMatchNumber-1;i<endMatchNumber;i++) {
        for(matchKey in matches[i]) {
            matches[i][matchKey] = Math.floor(Math.random() * (6-0+1));
            if(startMatchNumber > 48) {
                matchScore.push(matches[i][matchKey]);
            }
        };
        if(matchScore.length > 0 && matchScore[0] === matchScore[1]) {
            return matchSimulator(matches, i + 1, endMatchNumber);
        };
        matchScore = [];
    };
    return matches;
};

function groupChart(group, theChart) {
    for(groupKey in group) {
        for(i=0;i<theChart['series'].length;i++) {
            if(theChart['series'][i]['text'] === groupKey) {
                for(z=0;z<teams.length;z++) {
                    if(groupKey === teams[z]['id']) {
                        theChart['series'][i]['text'] = teams[z]['title'] +
                            ' (' + teams[z]['ranking'] + ')';
                        theChart['series'][i]['background-color'] = teams[z]['color1'];
                        theChart['series'][i]['border-color'] = teams[z]['color2'];
                        theChart['series'][i]['font-color'] = teams[z]['color3'];
                        theChart['series'][i]['border-width'] = 3;
                    };
                };
                for(j=0;j<7;j++) {
                    theChart['series'][i]['ranks'].push(group[groupKey]['ranks'][j]);
                    theChart['series'][i]['data-matches'].push(
                        'Points: ' + group[groupKey]['points'] + ', ' +
                        'Goal Difference: ' + group[groupKey]['goalDiff'] + ', ' +
                        'Goals Scored: ' + group[groupKey]['goals']
                        )
                };
                theChart['series'][i]['tooltip']= {
                    'text':'%data-matches'
                    };
                console.log(JSON.stringify(theChart['series'][i]));

            };
        };
    };
    return theChart;
};

//var matches;
//var match = {};
//matches = createMatches(matches);
var count = 0;
/*for(i=0;i<matches.length;i++) {
    count += 1;
    console.log('Match # ' +count+ JSON.stringify(matches[i]));
};
*/
var theChart = {
      'type': 'rankflow',
      'scale-x': {
        'labels': ['Group Match 1','Group Match 2','Group Match 3',
                   'Round of 16', 'Quarterfinal', 'Semifinal','Final'],
        'values': ['Group Match 1','Group Match 2','Group Match 3',
                   'Round of 16', 'Quarterfinal', 'Semifinal','Final']
      },
      'series': [],
      'options': {
        'color-type': 'palette',
        'palette': [],
        'style': {
            'item-flow': {'color': 'black'},
            'item-overall': {'color': 'black'},
            'label-overall':{'text':'Relative FIFA World Ranking\n(Actual FIFA Rank)'}}
        },
      'plotarea':{
//        'background-image':'./maracana.png',
        'background-position': '0 0',
        'background-color-1':'#FFC400',
        'background-color-2':'#2D8A31',
        'background-fit':'xy',
        'offset-y':-200,
        'height':1400,
        'offset-x':-100,
        'width':1700
      },
      'images': [
/*
        {
          'src': './us.png',
          'x': '100px',
          'y': '360px'
        }
*/
      ]
};

/*
for(i=0;i<7;i++) {
    theChart['scale-x']['labels'].push('Match ' + (i+1));
    theChart['scale-x']['values'].push('Match ' + (i+1));
};
*/
var chartDict = {};
var group;
var groupDict = {'a':null,'b':null,'c':null,'d':null,
                 'e':null,'f':null,'g':null,'h':null};
var bigGroupDict = {};
/*
for(i=0;i<48;i++) {
    for(key in matches[i]) {
        matches[key] = 0;
    };
};
*/
var fifaList = getFifaOrder(teams);
for(i=0;i<fifaList.length;i++) {
    theChart['series'].push({
                            'text':fifaList[i].id,
                            'ranks':[],
                            'data-matches':[],
                            'tooltip':{},
                            'rank':i+1
    });
    theChart['options']['palette'].push(fifaList[i]['color1']);
/*
                            'border-color':teams[z]['color2'],
                            'border-width':3});
*/

};
var divList = [];
var pathArray = window.location.href.split( '/' );
var protocol = pathArray[0];
var host = pathArray[2];
var hostUrl = 'http://' + host;
$.ajax({
//    url: "http://livescore.com/worldcup/fixtures",
    async: false,
    url: hostUrl + '/proxy',
    type: "GET",
    dataType: "html",
    success: function(html) {
        matches = $(html).find('tr').map(function() {
            var $el = $(this);
//              console.log($el);
            var twoTeams = $el.find('a').text();
            twoTeams = twoTeams.replace(' *','');
            var score = $.trim($el.find('.sc').text());
            var thisMatch = {};
            var addMatch = true;
            console.log(twoTeams);
            for(i=0;i<teams.length;i++) {
//                  console.log(twoTeams.split(' vs ')[0]);
                if(twoTeams.split(' vs ')[0] === teams[i].title) {
                    thisMatch[teams[i].id] = score.split(' - ')[0];
                };
                if(twoTeams.split(' vs ')[1] === teams[i].title) {
                    thisMatch[teams[i].id] = score.split(' - ')[1];
                };
            };
//              console.log(JSON.stringify(thisMatch));
            var count = 0;
            for(key in thisMatch) { count += 1 };
            if(count === 0) { addMatch = false };
            for(key in thisMatch) {
//                  console.log(thisMatch[key]);
                if(thisMatch[key].indexOf('?') < 0) {
                    thisMatch[key] = parseInt(thisMatch[key]);
                }
                else {
                    addMatch = false;
                };
            };
            if(addMatch) {
                return thisMatch;
//                  console.log('match added');
            }
            else {
//                  console.log('match not added');

            };
        }).get();
//    var count = 0;
//      for(key in matches) {
//          count +=1;
//      };
//    console.log(count);
    }
});
//console.log(JSON.stringify(matches));

for(i=0;i<matches.length;i++) {
    if('bra' in matches[i]) {
        if('cro' in matches[i]) {
            var firstMatch = i;
        };
    };
};

for(i=0; i<firstMatch; i++) {
    var popped = matches.shift();
    matches.push(popped);
};

for(i=matches.length;i<48;i++) {
    matches.push(preMatches[i]);
};

for(i=matches.length;i<64;i++) {
    matches.push({});
};

for(key in groupDict) {
    groupDict[key] = getGroup(key);
    for(bigGroupKey in groupDict[key]) {
        bigGroupDict[bigGroupKey] = groupDict[key][bigGroupKey];
    };
};

for(key in groupDict) {
    groupDict[key] = getGroup(key);
/*    for(bigGroupKey in groupDict[key]) {
        bigGroupDict[bigGroupKey] = groupDict[key][bigGroupKey];
        theChart['series'].push({
                                'text':bigGroupKey,
                                'rank':[]
                               });
    };*/
//    matches = matchSimulator(matches, 1, 16);
    groupDict[key] = refreshData(groupDict[key], matches, '1');
    groupDict[key] = groupSorter(groupDict[key]);
//    matches = matchSimulator(matches, 17, 32);
    groupDict[key] = refreshData(groupDict[key], matches, '2');
    groupDict[key] = groupSorter(groupDict[key]);
//    matches = matchSimulator(matches, 33, 48);
    groupDict[key] = refreshData(groupDict[key], matches, '3');
    groupDict[key] = groupSorter(groupDict[key]);
/*
    console.log(JSON.stringify(groupDict[key]));
    document.writeln('Group ' + key + '<br>');
///    writeGroup(groupDict[key]);
    chartDict[key] = groupChart(groupDict[key], theChart);
*/
//    matches = roundFourMatches(groupDict[key], matches, key);
};

for(i=0;i<matches.length;i++) {
    console.log('Match #' + (i+1) + ' ' + JSON.stringify(matches[i]));
};

//matches = matchSimulator(matches, 49, 56);
bigGroupDict = refreshData(bigGroupDict, matches, '1');
bigGroupDict = groupSorter(bigGroupDict);
bigGroupDict = refreshData(bigGroupDict, matches, '2');
bigGroupDict = groupSorter(bigGroupDict);
bigGroupDict = refreshData(bigGroupDict, matches, '3');
bigGroupDict = groupSorter(bigGroupDict);
bigGroupDict = refreshData(bigGroupDict, matches, '4');
bigGroupDict = groupSorter(bigGroupDict);
//if(Date.now() > Date.UTC(2014,7,2)) {
//if(Date.now() < Date.UTC(2014,6,28)) {
//    matches = knockoutMatches(bigGroupDict, matches, 5);
//};
//matches = matchSimulator(matches, 57, 60);
bigGroupDict = refreshData(bigGroupDict, matches, '5');
bigGroupDict = groupSorter(bigGroupDict);
//if(Date.now() > Date.UTC(2014,7,6)) {
//if(Date.now() < Date.UTC(2014,7,3)) {
//    matches = knockoutMatches(bigGroupDict, matches, 6);
//};
//matches = matchSimulator(matches, 61, 62);
bigGroupDict = refreshData(bigGroupDict, matches, '6');
bigGroupDict = groupSorter(bigGroupDict);
//if(Date.now() > Date.UTC(2014,7,10)) {
//if(Date.now() < Date.UTC(2014,7,11)) {
//    matches = knockoutMatches(bigGroupDict, matches, 7);
//};
//matches = matchSimulator(matches, 63, 64);
bigGroupDict = refreshData(bigGroupDict, matches, '7');
bigGroupDict = groupSorter(bigGroupDict);
//if(Date.now() > Date.UTC(2014,7,10)) {
//if(Date.now() < Date.UTC(2014,7,11)) {
//    bigGroupDict = sortFinal(bigGroupDict, matches);
//};
theChart = groupChart(bigGroupDict, theChart);
//console.log(JSON.stringify(theChart));
/*
for(key in bigGroupDict){
    document.writeln(key +' finished in place '+ bigGroupDict[key]['place']+'<br>');
};
for(i=0;i<matches.length;i++) {
    document.writeln('Match '+(i+1)+': '+JSON.stringify(matches[i])+'<br>');
};

document.writeln(JSON.stringify(theChart));
*/

window.onload=function() {
//  for(key in chartDict) {
    zingchart.MODULESDIR = "static/js/modules/";

    zingchart.render({
      id: 'theChart',
      height: 1000,
      width: 1500,
      data:theChart
//      data: chartDict[key]
    })
//};
};

console.log('bullshit');
