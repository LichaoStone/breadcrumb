/* 面包屑功能
 * 
 * 实现思路：
 *        1.1 items=[]用于存放面包屑的title（document.title）和url(window.location.href)；
 *            页面跳转的时候数组+1，返回上级菜单数组-1；
 *            点击菜单为左侧菜单树菜单的时候，清空items,然后增加点击页面的数据，不再累加；
 *      2.拼装url并显示面包屑菜单
 *      
 *
 * 版本：1.0
 * 时间：2017/01/18 
 * 作者：栗超
 *     
 */
$(document).ready(function(){		
	initBreadCrumb();//加载面包屑
});

/**
 * 初始化面包屑
 */
function initBreadCrumb() {
	var backPreUrl=document.location.href;//跳转路径,代参
	var backPreUrl2=window.location.href;//跳转路径，不带参
	var titleName=document.title;//标题
	
	//判断是否已经存在，存在返回true，不存在返回false
	var flag=false;
	for(var i=0;i<parent.items.length;i++){
		var data=eval(parent.items[i]);
		if(data.url==backPreUrl2||data.title==titleName){
			flag=true;
		}
	}
	
	if(!flag){				
		parent.items.push({title:titleName,url:backPreUrl});
	}
	
	setBreadCrumb(parent.items);
}


/**
 * 设置面包屑展示html
 * 
 * args
 * @param title  标题
 * @param url    跳转路径
 */
function setBreadCrumb(args) {
	var mainHeader="";
	
	for(var i=0;i<args.length;i++){
		if(args.length==(i+1)){
			var data=eval(args[i]);
			mainHeader=mainHeader+data.title;
		}else{
			var data=eval(args[i]);
			mainHeader=mainHeader+"<a href='javascript:;'  onclick=\"backPrePage('"+data.url+"')\"><span class='page-breadcrumb'>"+data.title+"</span></a> >";
		}
	}
	
	if (mainHeader != "") {
		//展示面包屑
		$("#breadcrumb").html(mainHeader);
		$("#container-breadcrumb-text").show();
	}
}

/**
 * 返回上级页面
 * @param url 跳转url
 * @param formId 表单ID
 */
function backPrePage(backPreUrl){
	
	//点击链接的索引位置
	var clickIndex=-1;
	for(var i=0;i<parent.items.length;i++){
		clickIndex=clickIndex+1;
		var data=eval(parent.items[i]);
		if(data.url==backPreUrl){
			break;
		}
	}
	
	//删除索引后所有数据
	var cicleNum=parent.items.length-clickIndex-1;
	for(var i=0;i<cicleNum;i++){
		parent.items.pop();
	}
	
	windowHref(backPreUrl);
}