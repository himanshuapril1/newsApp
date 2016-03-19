<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

$uri = $_REQUEST['uri'];

function getNews($url){
	$file_contents = file_get_contents($url);

	$file_contents = str_replace(array('\s','\r','\t'), '', $file_contents);
	$fileContents = trim(str_replace('"', "'", $fileContents));
	$json ='['; 
	$json .= json_encode(simplexml_load_string($file_contents));
	$json .=']'; 
	$json = json_decode($json,true);
	$items = $json[0]['channel']['item'];
$j = 0;
$output = "[";
foreach ($items as $news) {
	$output .= "{";
	foreach ($news as $k => $v) {
		$v = str_replace('"', "'", $v);
		$v = str_replace("<br clear='all'/>", "", $v);
		$v = str_replace("<br/>", "", $v);
		$output .= '"'."$k".'":"'. $v.'"';
		if($i < (count($news)-1)){
			$output .= ',';
		}
		++$i;
	}
	$i = 0;
	$output .= '}';
	if($j < (count($items)-1)){
		$output .= ',';
	}
	++$j;
}
	$output .= ']';
	print_r($output);
	}
//	getNews('http://dynamic.feedsportal.com/pf/555218/http://toi.timesofindia.indiatimes.com/rssfeedstopstories.cms');
//	getNews('http://timesofindia.indiatimes.com/rssfeeds/-2128838597.cms');
	getNews($uri);
	?>