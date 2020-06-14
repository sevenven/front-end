(function(w){
	w.drag = function(dragNode, callBack){
		dragNode.onmousedown = function(event){
						
			// IE8将页面的鼠标事件都捕获到dragNode上 别的元素不会再触发事件
			dragNode.setCapture && dragNode.setCapture();
			
			event = event || window.event;
			// 鼠标相对于元素最左边和最上边的偏移量
			var ol = event.clientX - dragNode.offsetLeft;
			
			document.onmousemove = function(event){
				event = event || window.event;
				// 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
				// 获取鼠标的坐标
				var left = event.clientX - ol;
				// 范围控制
				if(left<0){
					left=0;	
				}else if(left>( dragNode.parentNode.clientWidth -dragNode.offsetWidth )){
					left = dragNode.parentNode.clientWidth - dragNode.offsetWidth;
				}
				// 修改dragNode的位置
				dragNode.style.left = left+"px";
				// 回调
				if(callBack&&callBack["move"]&& typeof callBack["move"] === "function"){
					callBack["move"].call(dragNode);
				}
			}
			
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				// 当鼠标松开时，取消对事件的捕获
				dragNode.releaseCapture && dragNode.releaseCapture();
			}
			
			// 取消浏览器默认行为
			return false;
		}
	}
})(window)
