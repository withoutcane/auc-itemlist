$(function(){
	var itemlistbutton = '<li><a id="itemliston">アイテムリスト追加</a></li>';
	$('li.page-menu-visit').append(itemlistbutton);
	$('#itemliston').click(function() {
		 main();
	});
});

var skill = [
	{name:"レア",type:"R"},
	{name:"剣術",type:"近接"},
	{name:"槍術",type:"近接"},
	{name:"斧術",type:"近接"},
	{name:"槌術",type:"近接"},
	{name:"格闘術",type:"近接"},
	{name:"弓術",type:"射撃"},
	{name:"射出術",type:"射撃"},
	{name:"砲撃術",type:"射撃"},
	{name:"投擲術",type:"射撃"},
	{name:"接射術",type:"射撃"},
	{name:"黒魔法",type:"魔術"},
	{name:"白魔法",type:"魔術"},
	{name:"対象識別",type:"魔術"},
	{name:"隠行",type:"隠密"},
	{name:"踏破",type:"隠密"},
	{name:"疾走",type:"隠密"},
	{name:"包囲",type:"隠密"},
	{name:"離脱",type:"隠密"},
	{name:"必中",type:"攻撃"},
	{name:"急所狙い",type:"攻撃"},
	{name:"奥義",type:"攻撃"},
	{name:"物理奥義",type:"攻撃"},
	{name:"魔法奥義",type:"攻撃"},
	{name:"連撃",type:"攻撃"},
	{name:"二刀",type:"攻撃"},
	{name:"威力増加",type:"攻撃"},
	{name:"武器破壊",type:"攻撃"},
	{name:"防具破壊",type:"攻撃"},
	{name:"残心",type:"攻撃"},
	{name:"命中増加",type:"攻撃"},
	{name:"回避増加",type:"防御"},
	{name:"連係攻撃",type:"防御"},
	{name:"盾術",type:"防御"},
	{name:"察知",type:"防御"},
	{name:"鉄壁",type:"防御"},
	{name:"見切り",type:"防御"},
	{name:"反撃",type:"防御"},
	{name:"先制",type:"防御"},
	{name:"物理回避",type:"防御"},
	{name:"魔法回避",type:"防御"},
	{name:"物理防御増加",type:"防御"},
	{name:"魔法防御増加",type:"防御"},
	{name:"直接体術",type:"防御"},
	{name:"間接体術",type:"防御"},
	{name:"範囲体術",type:"防御"},
	{name:"撥ね除け",type:"防御"},
	{name:"指揮",type:"其他"},
	{name:"威圧",type:"其他"},
	{name:"足止め",type:"其他"},
	{name:"道具活用",type:"其他"},
	{name:"護衛",type:"其他"},
	{name:"範囲護衛",type:"其他"},
	{name:"携行",type:"其他"},
	{name:"武装熟練",type:"其他"},
	{name:"攻防一体",type:"其他"},
	{name:"耐久保護",type:"其他"},
	{name:"鼓舞",type:"其他"},
	{name:"指示",type:"コマ"},
	{name:"予測",type:"コマ"},
	{name:"蘇生",type:"コマ"},
	{name:"強打",type:"コマ"},
	{name:"薙ぎ払い",type:"コマ"},
	{name:"長距離射撃",type:"コマ"},
	{name:"貫通攻撃",type:"コマ"},
	{name:"精密攻撃",type:"コマ"},
	{name:"MP同時攻撃",type:"コマ"},
	{name:"捕捉攻撃",type:"コマ"},
	{name:"自爆",type:"コマ"},
	{name:"手加減",type:"コマ"},
	{name:"威力強化",type:"C"},
	{name:"命中強化",type:"C"},
	{name:"耐久強化",type:"C"},
	{name:"威力修正強化",type:"C"},
	{name:"命中修正強化",type:"C"},
	{name:"盾回避強化",type:"C"},
	{name:"対物理強化",type:"C"},
	{name:"対魔法強化",type:"C"},
	{name:"粗悪品",type:"C"},
	{name:"―",type:"要素なし"}
];

var subelement = [
	{name:"反射",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	},
	{name:"威力減少",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	},
	{name:"追加ダメージ",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	},
	{name:"HP特攻",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	},
	{name:"MP特攻",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	},
	{name:"報復",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	},
	{name:"損害制限",
	 subname:{
		"MP30":"(小)",
		"MP60":"(中)",
		"MP100":"(大)"
		}
	},
	{name:"奥義",
	 subname:{
		"魔法":"(魔)",
		"物理":"(物)"
		}
	}
];
	

function getTypeText( tempText ){
	var tempGetText = '';
	if(      tempText == '/web/img/icon_youso_rare.gif'     ){ tempGetText = '[R]'; }
	else if( tempText == '/web/img/icon_youso_uncommon.gif' ){ tempGetText = '[UC]'; }
	else if( tempText == '/web/img/icon_youso_common.gif'   ){ tempGetText = '[C]'; }
	else{ tempGetText = '－'; }
	return tempGetText;
}

function getSkillId (target) {
	for (var i = 0; i < skill.length; i++) {
		 if (skill[i].name == target) return i;
	}
	return 0;
}

function addSubElement (target,targettitle) {
	for (var i = 0; i < subelement.length; i++) {
		var regName = new RegExp(subelement[i].name);
		 if (target.match(regName)) {
			for (var j in subelement[i].subname) {
				var regSubName = new RegExp(j);
				if (targettitle.match(regSubName)) return target + subelement[i].subname[j];
			}
		 }
	}
	return target;
}

function main (){
	var tempHtml = '';
	var tempTsv  = '';
	var tempRightHtml = '';
	var tempRightHtmlEnd = '<hr />';


	$('#tempItemWrap').remove();
	var tempPage = $('span.pager-num').eq(0).text();

	var tempForm = $('#item-search-form');
	var tempFormText = '';

	var tempUrl  = tempForm.attr('action');

	console.log( '[' + tempUrl + ']' );
	if( tempUrl.match(/t=4/) ){
		return false;
	} else if( tempUrl == '' ){
		return false;
	} else {

		var tempPageSplit1 = tempPage.split("/");
		var tempPageSplit2 = tempPageSplit1[1].split("(");
		tempPageSplit2[0] = Number(tempPageSplit2[0]);

		var tempItemHtml = '<div id="tempItemWrap" style=""></div><hr style="clear:both;" />';
		tempTsv   = '<div id="tempTabWrap" style=""></div>';

		$('body').prepend(tempTsv);
		$('body').prepend(tempItemHtml);

		var tempDataText = '';
	//	tempForm.find('input').each(function(){
	//		var tempType = $(this).attr('type');
	//		if( tempType == 'checkbox' || tempType == 'text' ){ tempDataText += '&' + $(this).attr('name') + '=' + $(this).val(); }
	//	});
		tempForm.find("input[type='text']").each(function(){
			var tempType = $(this).attr('type');
			tempDataText += '&' + $(this).attr('name') + '=' + $(this).val();
		});

		tempForm.find('input:checked').each(function(){
			var tempType = $(this).attr('type');
			tempDataText += '&' + $(this).attr('name') + '=' + $(this).val();
		});


		tempForm.find('select option:selected').each(function(){
			var tempName = $(this).parents('select').attr('name');
			tempDataText += '&' + tempName + '=' + $(this).val();
		});

		tempDataText = tempDataText + '&page=';

		$('.item-tab-list').children().remove();
		$('#item-search-form').html();

		var setData = new Array();
		var setCnt  = 0;
		var oHtml = '';
		var tempSetHtml = $('<div />');

	for (i = 0; i < tempPageSplit2[0]; i = i +1){
		var setPageNum = i + 1;
		var tempHtml = $.ajax({
			type: "POST",
			url : tempUrl,
			data: tempDataText + setPageNum,
			async: false
		}).responseText;

		var tempSet = $('<div />');

		tempSet.append(tempHtml);
		tempSet.find('div.item-name:has(td)').each(function(){

			if( tempUrl == '/web/items/stock?t=4' ){
				var tempTd = $(this).find('td.item-name-td1');
				var tempNameUrl  = tempTd.find('a').attr('href');
				var tempNameIco  = tempTd.find('img').attr('src');
				var tempName     = tempTd.text();
				var tempElement  = $(this).find('td.item-name-status2').children('div');
				var tempIMain    = tempElement.eq(0).text().split("：");
				var tempISub     = tempElement.eq(1).text();
				var tempISubSP   = tempISub.split("：");
				var tempIEffect = tempElement.eq(3).find('a').text();

				var tempISubSP1  = tempISubSP[1].split("個数");
				var tempISubSP2  = tempISubSP[2].split("装備キャラ");

				tempIMain = addSubElement(tempIMain,tempElement.eq(0)[0].title);
				tempISub1 = addSubElement(tempISub1,tempElement.eq(1)[0].title);
				tempISub2 = addSubElement(tempISub2,tempElement.eq(2)[0].title);
				
				if (tempIEffect != "") tempName= tempName + "【" + tempIEffect + "】";


				setData[setCnt] = new Array(
					 tempName
					,tempIMain[1]
					,tempISubSP1[0]
					,tempISubSP2[0]
					,tempISubSP[3]
					,tempNameUrl
					,tempNameIco
					,tempIEffect
				);

			} else if( tempUrl.match(/auction_list/) || tempUrl.match(/bazar_list/) ){
				var tempTd = $(this).find('td.item-name-td1');
				var tempNameUrl  = tempTd.find('a').attr('href');
				var tempNameIco  = tempTd.find('img').attr('src');
				var tempName     = tempTd.find('a').eq(0).text();

				var tempTd2 = $(this).find('table.item-bottom-table');
				var tempData1 = tempTd2.find('.item-bottom-table-n').html().replace(/入札件数：/, "");
				var tempData2 = tempTd2.find('.item-bottom-table-t').html().replace(/残り時間：/, "");
				var tempData3 = tempTd2.find('.item-bottom-table-g').html().replace(/現在価格：/, "");

				var tempElement  = $(this).find('td.item-name-td-element').children('div');
				var tempElementTitle = tempElement.eq(0)[0].title;
				var tempIMain    = tempElement.eq(0).text();
				var tempISub1    = tempElement.eq(1).text().replace(/品 Lv./, "");
				var tempISub2    = tempElement.eq(2).text().replace(/品 Lv./, "");
				var tempIEffect = tempElement.eq(3).find('a').text();
				var tempTypeMain = tempElement.eq(0).find('img').attr('src');
				var tempTypeSub1 = tempElement.eq(1).find('img').attr('src');
				var tempTypeSub2 = tempElement.eq(2).find('img').attr('src');

				tempIMain = addSubElement(tempIMain,tempElement.eq(0)[0].title);
				tempISub1 = addSubElement(tempISub1,tempElement.eq(1)[0].title);
				tempISub2 = addSubElement(tempISub2,tempElement.eq(2)[0].title);

				if (tempIEffect != "") tempName= tempName + "【" + tempIEffect + "】";

				var tempIMainSP = "";



				if( tempIMain.match(/： /) ){
					tempIMainSP = tempIMain.split("： ");
				} else {
					tempIMainSP = tempIMain.split("：");
				}

				var xx   = tempIMainSP[1].split(" Lv.");

				var tempSkId = getSkillId(xx[0]);
				//if( skID[xx[0]] ){
				//	tempSkId = skID[xx[0]];
				//}

				var tempISub1SP = tempISub1.split("：");
				var tempISub2SP = tempISub2.split("：");

				setData[setCnt] = new Array(
					 tempName
					,tempIMainSP[1]
					,tempISub1SP[1]
					,tempISub2SP[1]
					,tempNameUrl
					,tempNameIco
					,tempTypeMain
					,tempTypeSub1
					,tempTypeSub2
					,tempSkId
					,tempData1
					,tempData2
					,tempData3
					,tempIEffect
				);

			} else if( tempUrl.match(/item_stock_put/) || tempUrl.match(/sell_list/) ){
				var tempTd = $(this).find('td.item-name-td1');
				var tempNameUrl  = tempTd.find('a').attr('href');
				var tempNameIco  = tempTd.find('img').attr('src');
				var tempName     = tempTd.find('a').eq(0).text();

				var tempBtn1 = tempTd.find('.btn-item-name').attr('onclick');
				var tempBtn2 = tempTd.find('.btn-item-name2').children('a').attr('href');

				var tempElement  = $(this).find('td.item-name-td-element').children('div');
				var tempElementTitle = tempElement.eq(0)[0].title;
				var tempIMain    = tempElement.eq(0).text();
				var tempISub1    = tempElement.eq(1).text();
				var tempISub2    = tempElement.eq(2).text();
				var tempIEffect = tempElement.eq(3).find('a').text();
				var tempTypeMain = tempElement.eq(0).find('img').attr('src');
				var tempTypeSub1 = tempElement.eq(1).find('img').attr('src');
				var tempTypeSub2 = tempElement.eq(2).find('img').attr('src');

				tempIMain = addSubElement(tempIMain,tempElement.eq(0)[0].title);
				tempISub1 = addSubElement(tempISub1,tempElement.eq(1)[0].title);
				tempISub2 = addSubElement(tempISub2,tempElement.eq(2)[0].title);

				var tempIMainSP = "";

				if (tempIEffect != "") tempName= tempName + "【" + tempIEffect + "】";


				if( tempIMain.match(/： /) ){
					tempIMainSP = tempIMain.split("： ");
				} else {
					tempIMainSP = tempIMain.split("：");
				}

				var xx   = tempIMainSP[1].split(" Lv.");

				var tempSkId = getSkillId(xx[0]);
				//if( skID[xx[0]] ){
				//	tempSkId = skID[xx[0]];
				//}

				var tempISub1SP = tempISub1.split("：");
				var tempISub2SP = tempISub2.split("：");

				setData[setCnt] = new Array(
					 tempName
					,tempIMainSP[1]
					,tempISub1SP[1]
					,tempISub2SP[1]
					,tempNameUrl
					,tempNameIco
					,tempTypeMain
					,tempTypeSub1
					,tempTypeSub2
					,tempSkId
					,tempBtn1
					,tempBtn2
					,tempIEffect
				);
			} else {
				var tempTd = $(this).find('td.item-name-td1');
				var tempNameUrl  = tempTd.find('a').attr('href');
				var tempNameIco  = tempTd.find('img').attr('src');
				var tempName     = tempTd.text();

				var tempElement  = $(this).find('td.item-name-td-element').children('div');
				var tempIMain    = tempElement.eq(0).text();
				var tempISub1    = tempElement.eq(1).text();
				var tempISub2    = tempElement.eq(2).text();
				var tempIEffect = tempElement.eq(3).find('a').text();
				var tempTypeMain = tempElement.eq(0).find('img').attr('src');
				var tempTypeSub1 = tempElement.eq(1).find('img').attr('src');
				var tempTypeSub2 = tempElement.eq(2).find('img').attr('src');

				tempIMain = addSubElement(tempIMain,tempElement.eq(0)[0].title);
				tempISub1 = addSubElement(tempISub1,tempElement.eq(1)[0].title);
				tempISub2 = addSubElement(tempISub2,tempElement.eq(2)[0].title);

				var tempIMainSP = "";

				if (tempIEffect != "") tempName= tempName + "【" + tempIEffect + "】";


				if( tempIMain.match(/： /) ){
					tempIMainSP = tempIMain.split("： ");
				} else {
					tempIMainSP = tempIMain.split("：");
				}

				var xx   = tempIMainSP[1].split(" Lv.");

				var tempSkId = getSkillId(xx[0]);
				//if( skID[xx[0]] ){
				//	tempSkId = skID[xx[0]];
				//}

				var tempISub1SP = tempISub1.split("：");
				var tempISub2SP = tempISub2.split("：");

				setData[setCnt] = new Array(
					 tempName
					,tempIMainSP[1]
					,tempISub1SP[1]
					,tempISub2SP[1]
					,tempNameUrl
					,tempNameIco
					,tempTypeMain
					,tempTypeSub1
					,tempTypeSub2
					,tempSkId
					,setPageNum
					,tempIEffect
				);
			}
			setCnt++;
		});
	}

		if( tempUrl == '/web/items/stock?t=4' ){
			setData.sort(function(a, b) {
				return (a[0] > b[0]) ? 1 : -1;
			});
		} else {
			setData.sort(function(a, b) {
				return (a[9] > b[9]) ? 1 : -1;
			});
		}

		$.each(setData, function(i,v){
			if( tempUrl == '/web/items/stock?t=4' ){
				oHtml += '<tr>';
				oHtml += '<td class="ts1" rowspan="2"><img src="' + v[6] + '" /><a href="' + v[5] + '">' + v[0] + '</td>';
				oHtml += '<td class="ts2" colspan="3">' + v[1] + '</td>';
				oHtml += '</tr>';
				oHtml += '<tr>';
				oHtml += '<td class="ts3">' + v[2] + '</td>';
				oHtml += '<td class="ts4">' + v[3] + '</td>';
				if( v[4] ){ oHtml += '<td class="ts5">' + v[4] + '</td>'; }
				else { oHtml += '<td class="ts5">－</td>'; }
				oHtml += '</tr>';
			} else if( tempUrl.match(/auction_list/) || tempUrl.match(/bazar_list/) ){
				var tempText = v[0];
				tempText = tempText.replace(/\t/g, "");
				tempText = tempText.replace(/\n/g, "");
				tempTextRe = tempText.substring(0,2);

				tempTime = v[11];
				tempTime = tempTime.replace(/時間([0-9])分/g, function(all, $1) { return '時間0' + ($1) + '分'; });

				oHtml += '<tr>';
				oHtml += '<td class="n1"><a href="' + v[4] + '" title="' + tempText + '"><img src="' + v[5] + '" />' + tempTextRe + '</a></td>';
				oHtml += '<td class="n2">';
				if( v[6] ){ oHtml += '<img src="' + v[6] + '" /> '; }
				oHtml += v[1] + '</td>';
				oHtml += '<td class="n3">';
				if( v[7] ){ oHtml += '<img src="' + v[7] + '" /> '; }
				oHtml += v[2] + '</td>';
				oHtml += '<td class="n4">';
				if( v[8] ){ oHtml += '<img src="' + v[8] + '" /> '; }
				oHtml += v[3] + '</td>';
				oHtml += '<td class="n5">' + v[12] + '</td>';
				oHtml += '<td class="n6">' + tempTime + '</td>';
				oHtml += '</tr>';

			} else if( tempUrl.match(/item_stock_put/) || tempUrl.match(/sell_list/) ){
				oHtml += '<tr>';

				if(        tempUrl.match(/item_stock_put/) ){
					oHtml += '<td class="g1"><a href="" onClick="' + v[10] + '">入庫</a>&nbsp;<a href="' + v[11] + '">詳細</a></td>';
				} else if( tempUrl.match(/sell_list/) ){
					oHtml += '<td class="g1"><a href="" onClick="' + v[10] + '">売却</a>&nbsp;<a href="' + v[11] + '">詳細</a></td>';
				}
				oHtml += '<td class="g2"><img src="' + v[5] + '" /><a href="' + v[4] + '">' + v[0] + '</a></td>';
				oHtml += '<td class="g3">';
				if( v[6] ){ oHtml += '<img src="' + v[6] + '" /> '; }
				oHtml += v[1] + '</td>';
				oHtml += '<td class="g4">';
				if( v[7] ){ oHtml += '<img src="' + v[7] + '" /> '; }
				oHtml += v[2] + '</td>';
				oHtml += '<td class="g5">';
				if( v[8] ){ oHtml += '<img src="' + v[8] + '" /> '; }
				oHtml += v[3] + '</td>';
				oHtml += '</tr>';

			} else {
				oHtml += '<tr>';
				oHtml += '<td class="t1"><img src="' + v[5] + '" /><a href="' + v[4] + '">' + v[0] + '</td>';
				oHtml += '<td class="t2">' + v[10] + '</td>';
				oHtml += '<td class="t3">';
				if( v[6] ){ oHtml += '<img src="' + v[6] + '" /> '; }
				oHtml += v[1] + '</td>';
				oHtml += '<td class="t4">';
				if( v[7] ){ oHtml += '<img src="' + v[7] + '" /> '; }
				oHtml += v[2] + '</td>';
				oHtml += '<td class="t5">';
				if( v[8] ){ oHtml += '<img src="' + v[8] + '" /> '; }
				oHtml += v[3] + '</td>';
				oHtml += '</tr>';

				if( !v[1].match(/―/) && !v[2].match(/粗悪品/) && !v[2].match(/―/) && !v[3].match(/粗悪品/) && !v[3].match(/―/) ){
					tempRightHtmlEnd += "[合成品]<br />　" + v[1] ;
					if( !v[2].match(/粗悪品/) && !v[2].match(/―/) ){ tempRightHtmlEnd += "<br />　" + v[2] + ""; }
					if( !v[3].match(/―/) ){ tempRightHtmlEnd += "<br />　" + v[3]; }
					tempRightHtmlEnd += "<br />";
				} else if( !v[1].match(/―/) && !v[2].match(/粗悪品/) && !v[2].match(/―/) && v[3].match(/―/) ){
					tempRightHtmlEnd += "[合成品]<br />　" + v[1] + "<br />　" + v[2] + "<br />";
				} else if( v[1].match(/―/) ){
				} else if( skill[v[9]].type != '' ){
					tempRightHtml += "[" + skill[v[9]].type + "]" + v[1] + "<br />";
				} else {
					tempRightHtmlEnd += v[1] + "<br />";
				}


			}
		});

		if( tempUrl == '/web/items/stock?t=4' ){
			$('.item-tab-list').append('<table id="stockTable"><tr><th rowspan="2">name</th><th colspan="3">説明</th></tr><tr><th>耐久</th><th>個数</th><th>装備キャラ</th></tr>'+oHtml+'</table>');
		} else if( tempUrl.match(/auction_list/) || tempUrl.match(/bazar_list/) ){
			$('.item-tab-list').append('<table id="stockTable"><tr><th>name</th><th colspan="3">要素</th><th colspan="2">出品情報</th></tr>'+oHtml+'</table>');
	//		$('#tempItemWrap').append( tempRightHtml + tempRightHtmlEnd + '<br /><br />　');
		} else if( tempUrl.match(/item_stock_put/) || tempUrl.match(/sell_list/) ){
			$('.item-tab-list').append('<table id="stockTable"><tr><th>操作</th><th>name</th><th>主要素</th><th>副要素1</th><th>副要素2</th></tr>'+oHtml+'</table>');
	//		$('#tempItemWrap').append( tempRightHtml + tempRightHtmlEnd + '<br /><br />　');
		} else if( tempUrl.match(/select_list/) ){
			$('.item-tab-list').append('<table id="stockTable"><tr><th>name</th><th>主要素</th><th>副要素1</th><th>副要素2</th></tr>'+oHtml+'</table>');
		} else {
			$('.item-tab-list').append('<table id="stockTable"><tr><th colspan="2">name</th><th>主要素</th><th>副要素1</th><th>副要素2</th></tr>'+oHtml+'</table>');
			$('#tempItemWrap').append( tempRightHtml + tempRightHtmlEnd + '<br /><br />　');
		}

	}
	return true;
}