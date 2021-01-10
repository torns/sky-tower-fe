export function eventStop (e) { // 事件阻止
  if (e && e.stopPropagation) { // 阻止事件冒泡
      e.stopPropagation();
  } else { // IE方式取消事件冒泡
      window.event.cancelBubble = true;
  }
  if (e && e.preventDefault) { // 阻止默认行为
      e.preventDefault();
  } else { // IE阻止函数器默认动作
      window.event.returnValue = false;
  }
}