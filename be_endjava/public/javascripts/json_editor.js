(function($){

    $.fn.index = function(){

        return $(this).each(function(){

            //请求文件列表
            $.get('/get_file_list', function(data) {
                for(var i=0; fileName=data[i]; i++){
                    $(".file_list").prepend(createNodeLi(fileName));
                }
            });

            //点击文件名向后台请求文件内容。并且填充到编辑器内
            $(".file_list").on("click", ".file_link", function(){
                var fileName = $(this).data("name"),
                    $this = $(this);
                $.get('/get_file', {"fileName": fileName}, function(fileContent) {
                    $(".editing_file_name").text(fileName);
                    $("#jsonInp").text(fileContent).val(fileContent);
                    $(".show_hide").trigger('click');
                    $(".editing").removeClass('editing');
                    $this.addClass('editing');
                    $("#bt_save").css("visibility", "visible");
                });
            });

            //保存文件
            $("#bt_save").click(function(event) {
                $("#bt_etj").trigger('click');
                var content = $("#jsonInp").val(),
                    fileName = $(".editing").data("name");
                $.post('/save_file', {"fileName": fileName, "content": content}, function(data) {
                    if(data.success){
                        $("#jsonInp").text(content).val(content);
                        showTips($(".opera_tips"), "保存成功！");
                    }else{
                        showTips($(".opera_tips"), "出错啦！");
                    }
                });
            });

            //显示或者隐藏侧边栏
            $(".show_hide").click(function(){
                if($(this).hasClass('hided')){
                    $(".sider_content").animate({"left": "0px"}, "fast");
                    $(".show_hide").removeClass('hided');
                }else{
                    $(".show_hide").addClass('hided');
                    $(".sider_content").animate({"left": "-400px"}, "fast");
                }
                $("#bt_jte").trigger('click');
            });

            //新建文件
            $(".new_file").click(function(){
                var $inputFileName = $(".input_fileName"),
                    fileName = $.trim($inputFileName.val());
                
                if(fileName == ""){
                    $inputFileName.val("");
                    $inputFileName.css('background', '#f5cfcf').animate({
                        opacity: 0.3
                    }, 300, function() {
                        $inputFileName.css('background','none').css('opacity', '1');
                    });
                }else{
                    $.get('/create_json', {"fileName": fileName}, function(data) {
                        if(data.success){
                            $(".file_list").prepend(createNodeLi(data.fileName));
                            showTips($(".tips"), "创建成功");
                        }else{
                            if(data.exist){
                                showTips($(".tips"), "文件已经存在");
                            }else{
                                showTips($(".tips"), "创建失败");
                            }
                        }
                    });
                }
                
            });
            
            //设置侧边栏的高度自适应
            $(".file_list_wrap").height($(window).height()-174);
            //设置文件列表的高度，174=124+(padding-top)+(padding-botttom)
            $(window).resize(function(event) {
                $(".file_list_wrap").height($(window).height()-174);
            });


            //----------------------------
            //定义一个动画
            function showTips($node, tipWords){
                $node.text(tipWords).animate({
                        opacity: 1,
                    }, 400, function() {
                        setTimeout(function(){
                            $node.animate({
                                opacity: 0
                            },400);
                        }, 300);
                });
            }
            //生成一个文件名标签
            function createNodeLi(fileName){
                var $li = $("<li></li>"),
                    $a = $("<a class='file_link' href='javascript:;'></a>");
                $a.attr("data-name", fileName).text(fileName);
                $li.append($a);
                return $li;
            }


        });

    };

})(jQuery);
