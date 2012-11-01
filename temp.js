$(function(){
	var form = '<li><a id="itemliston">アイテムリスト追加</a></li>';
	$('li.page-menu-visit').append(form);
	$('#itemliston').click(function() {
		 main();
	});
});

function getTypeText( tempText ){
	var tempGetText = '';
	if(      tempText == '/web/img/icon_youso_rare.gif'     ){ tempGetText = '[R]'; }
	else if( tempText == '/web/img/icon_youso_uncommon.gif' ){ tempGetText = '[UC]'; }
	else if( tempText == '/web/img/icon_youso_common.gif'   ){ tempGetText = '[C]'; }
	else{ tempGetText = '－'; }
	return tempGetText;
}

function main (){
	var tempHtml = '';
	var tempTsv  = '';
	var tempRightHtml = '';
	var tempRightHtmlEnd = '<hr />';

	var skType =  new Array(
		 "R"
		,"近接"
		,"近接"
		,"近接"
		,"近接"
		,"近接"
		,"射撃"
		,"射撃"
		,"射撃"
		,"射撃"
		,"射撃"
		,"魔術"
		,"魔術"
		,"魔術"
		,"隠密"
		,"隠密"
		,"隠密"
		,"隠密"
		,"隠密"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"攻撃"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"防御"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"其他"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"コマ"
		,"C"
		,"C"
		,"C"
		,"C"
		,"C"
		,"C"
		,"C"
		,"C"
		,"要素なし"
	);
	var skID = {
	 "剣術":1
	,"槍術":2
	,"斧術":3
	,"槌術":4
	,"格闘術":5
	,"弓術":6
	,"射出術":7
	,"砲撃術":8
	,"投擲術":9
	,"接射術":10
	,"黒魔法":11
	,"白魔法":12
	,"対象識別":13
	,"隠行":14
	,"踏破":15
	,"疾走":16
	,"包囲":17
	,"離脱":18
	,"必中":19
	,"急所狙い":20
	,"物理奥義":21
	,"魔法奥義":21
	,"連撃":22
	,"二刀":23
	,"威力増加":24
	,"武器破壊":25
	,"防具破壊":26
	,"残心":27
	,"命中増加":28
	,"回避増加":29
	,"盾術":30
	,"察知":31
	,"鉄壁":32
	,"見切り":33
	,"反撃":34
	,"先制":35
	,"物理回避":36
	,"魔法回避":37
	,"物理防御増加":38
	,"魔法防御増加":39
	,"直接体術":40
	,"間接体術":41
	,"範囲体術":42
	,"撥ね除け":43
	,"指揮":44
	,"威圧":45
	,"足止め":46
	,"道具活用":47
	,"護衛":48
	,"携行":49
	,"武装熟練":50
	,"攻防一体":51
	,"耐久保護":52
	,"鼓舞":53
	,"指示":54
	,"予測":55
	,"蘇生":56
	,"強打":57
	,"薙ぎ払い":58
	,"長距離射撃":59
	,"貫通攻撃":60
	,"精密攻撃":61
	,"MP同時攻撃":62
	,"捕捉攻撃":63
	,"威力強化":64
	,"命中強化":65
	,"耐久強化":66
	,"威力修正強化":67
	,"命中修正強化":68
	,"盾回避強化":69
	,"対物理強化":70
	,"対魔法強化":71
	,"粗悪品":72
	,"―":99
	};

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

				var tempISubSP1  = tempISubSP[1].split("個数");
				var tempISubSP2  = tempISubSP[2].split("装備キャラ");

				setData[setCnt] = new Array(
					 tempName
					,tempIMain[1]
					,tempISubSP1[0]
					,tempISubSP2[0]
					,tempISubSP[3]
					,tempNameUrl
					,tempNameIco
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
				var tempIMain    = tempElement.eq(0).text();
				var tempISub1    = tempElement.eq(1).text().replace(/品 Lv./, "");
				var tempISub2    = tempElement.eq(2).text().replace(/品 Lv./, "");
				var tempTypeMain = tempElement.eq(0).find('img').attr('src');
				var tempTypeSub1 = tempElement.eq(1).find('img').attr('src');
				var tempTypeSub2 = tempElement.eq(2).find('img').attr('src');

				if( tempIMain.match(/MP特攻/) ){
					var tempTitle = tempElement.eq(0).attr('title');
					if( tempTitle.match(/攻撃魔法/) ){ tempIMain += '魔'; }
					else if( tempTitle.match(/物理攻撃/) ){ tempIMain += '物'; }
				} else if( tempIMain.match(/奥義/) ){
					var tempTitle = tempElement.eq(0).attr('title');
					if( tempTitle.match(/攻撃魔法/) ){ tempIMain = tempIMain.replace(/奥義/, "魔法奥義"); }
					else if( tempTitle.match(/物理攻撃/) ){ tempIMain = tempIMain.replace(/奥義/, "物理奥義"); }
				}

				var tempIMainSP = "";


				if( tempIMain.match(/： /) ){
					tempIMainSP = tempIMain.split("： ");
				} else {
					tempIMainSP = tempIMain.split("：");
				}

				var xx   = tempIMainSP[1].split(" Lv.");

				var tempSkId = 0;
				if( skID[xx[0]] ){
					tempSkId = skID[xx[0]];
				}

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
				);

			} else if( tempUrl.match(/item_stock_put/) || tempUrl.match(/sell_list/) ){
				var tempTd = $(this).find('td.item-name-td1');
				var tempNameUrl  = tempTd.find('a').attr('href');
				var tempNameIco  = tempTd.find('img').attr('src');
				var tempName     = tempTd.find('a').eq(0).text();

				var tempBtn1 = tempTd.find('.btn-item-name').attr('onclick');
				var tempBtn2 = tempTd.find('.btn-item-name2').children('a').attr('href');

				var tempElement  = $(this).find('td.item-name-td-element').children('div');
				var tempIMain    = tempElement.eq(0).text();
				var tempISub1    = tempElement.eq(1).text();
				var tempISub2    = tempElement.eq(2).text();
				var tempTypeMain = tempElement.eq(0).find('img').attr('src');
				var tempTypeSub1 = tempElement.eq(1).find('img').attr('src');
				var tempTypeSub2 = tempElement.eq(2).find('img').attr('src');

				if( tempIMain.match(/MP特攻/) ){
					var tempTitle = tempElement.eq(0).attr('title');
					if( tempTitle.match(/攻撃魔法/) ){ tempIMain += '魔'; }
					else if( tempTitle.match(/物理攻撃/) ){ tempIMain += '物'; }
				} else if( tempIMain.match(/奥義/) ){
					var tempTitle = tempElement.eq(0).attr('title');
					if( tempTitle.match(/攻撃魔法/) ){ tempIMain = tempIMain.replace(/奥義/, "魔法奥義"); }
					else if( tempTitle.match(/物理攻撃/) ){ tempIMain = tempIMain.replace(/奥義/, "物理奥義"); }
				}

				var tempIMainSP = "";


				if( tempIMain.match(/： /) ){
					tempIMainSP = tempIMain.split("： ");
				} else {
					tempIMainSP = tempIMain.split("：");
				}

				var xx   = tempIMainSP[1].split(" Lv.");

				var tempSkId = 0;
				if( skID[xx[0]] ){
					tempSkId = skID[xx[0]];
				}

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
				var tempTypeMain = tempElement.eq(0).find('img').attr('src');
				var tempTypeSub1 = tempElement.eq(1).find('img').attr('src');
				var tempTypeSub2 = tempElement.eq(2).find('img').attr('src');

				if( tempIMain.match(/MP特攻/) ){
					var tempTitle = tempElement.eq(0).attr('title');
					if( tempTitle.match(/攻撃魔法/) ){ tempIMain += '魔'; }
					else if( tempTitle.match(/物理攻撃/) ){ tempIMain += '物'; }
				} else if( tempIMain.match(/奥義/) ){
					var tempTitle = tempElement.eq(0).attr('title');
					if( tempTitle.match(/攻撃魔法/) ){ tempIMain = tempIMain.replace(/奥義/, "魔法奥義"); }
					else if( tempTitle.match(/物理攻撃/) ){ tempIMain = tempIMain.replace(/奥義/, "物理奥義"); }
				}

				var tempIMainSP = "";


				if( tempIMain.match(/： /) ){
					tempIMainSP = tempIMain.split("： ");
				} else {
					tempIMainSP = tempIMain.split("：");
				}

				var xx   = tempIMainSP[1].split(" Lv.");

				var tempSkId = 0;
				if( skID[xx[0]] ){
					tempSkId = skID[xx[0]];
				}

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
				} else if( skType[v[9]] != '' ){
					tempRightHtml += "[" + skType[v[9]] + "]" + v[1] + "<br />";
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