<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0041)http://www.w3cfuns.com/tools.php?mod=json -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>JSON Editor</title>
	<link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="/stylesheets/style_13_common.css">
	<link rel="stylesheet" type="text/css" href="/stylesheets/style_13_tools_json.css">
	<link rel="stylesheet" id="css_widthauto" type="text/css" href="/stylesheets/style_13_widthauto.css">
	<link rel="stylesheet/less" type="text/css" href="/stylesheets/json_editor.less" />
	<script src="/javascripts/jquery-1.10.2.min.js" type="text/javascript"></script>
	<script src="/javascripts/common.js" type="text/javascript"></script>
	<script src="/javascripts/w3cfunsJsonFormat.js" type="text/javascript"></script>
	<script src="/javascripts/less-1.3.0.min.js"></script>
	<script src="/javascripts/bootstrap.min.js"></script>
	<script src="/javascripts/json_editor.js"></script> 
</head>
<body id="nv_tools" class="pg_json  widthauto" onkeydown="if(event.keyCode==27) return false;">
	<!- 左侧 ->
    <div class="sider_content">
    	<i class="show_hide hided"></i>
    	<div class="opera clearfix">
    		<input type="text" name="fileName" class="input input_fileName" placeholder="输入文件名"/>
    		<a href="javascript:;" class="btn new_file">新建JSON</a>
    		<p class="tips"></p>
    	</div>
    	<div class="file_list_wrap">
    		<ul class="file_list"></ul>
    	</div>
    </div>	
    <!- 编辑器 ->
	<div id="append_parent"></div>
	<div id="ajaxwaitid"></div>
	<div class="content">
		<div class="status_info">
			<span class="editing_file_name"></span>
			<span class="opera_tips"></span>
		</div>
		<div id="jsonCode" class="textbox" style="width: 691px;">
			<div><textarea id="jsonInp">{}</textarea></div>
		</div>
		<div id="jsonBt" class="btnbar cl" style="left: 724px;">
			<a id="bt_jte" class="btns" href="javascript:void(0);" hidefocus="true">视图化&#187;</a>
			<a id="bt_etj" class="btns" href="javascript:void(0);" hidefocus="true">&#171;代码化</a>
		</div>
            <div id="w3cfunsJson" style="width: 691px;">
				<div class="w3cfunsJson">
					<div class="menu">
						<button class="expand-all" title="展开"></button>
						<button title="收缩" class="collapse-all"></button><span>&nbsp;</span>
						<button class="undo" title="撤销/后退(Ctrl+Z)"></button>
						<button class="redo" title="恢复(Ctrl+Shift+Z)" disabled=""></button>
						<table class="search">
							<tbody>
								<tr>
									<td>
										<div class="results"></div>
									</td>
									<td>
									<div class="frame" title="搜索键(Key)和值(Value)">
										<table>
											<tbody>
												<tr>
													<td>
														<button class="refresh"></button>
													</td>
													<td>
														<input>
													</td>
													<td>
														<button title="下一个(Enter)" class="next"></button>
													</td>
													<td>
														<button title="上一个(Shift+Enter)" class="previous"></button>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="outer">
					<div class="content">
						<table class="content">
							<colgroup>
								<col width="24px">
								<col width="24px">
								<col>
							</colgroup>
							<!- 系统在tbody内添加结构化的json ->
							<tbody></tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
        <div id="jsonCodeBt" class="btnbar cl" style="left: 373.5px;">
        	<a id="bt_save" class="btns hilite" href="javascript:void(0);" hidefocus="true">保存</a>
			<a id="btcopy" class="btns" href="javascript:void(0);" hidefocus="true">复制</a>
			<a id="bt_format" class="btns kr" href="javascript:void(0);" hidefocus="true">格式化</a>
			<a id="bt_compression" class="btns kl" href="javascript:void(0);" hidefocus="true">压缩</a>
        </div>
    </div>
    <script type="text/javascript">
    	jQuery("body").index();
    </script>
</body>
</html>