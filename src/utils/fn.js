export function randomExtend (minNum, maxNum) {
    if (arguments.length === 1) {
      return parseInt(Math.random() * minNum + 1, 10)
    } else {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }
  }
  
  export const debounce = (fn, wait, immediate = false) => {
    let timer = null;
    
    return function (...args) {
        const context = this;
        
        const later = () => {
            timer = null;
            if (!immediate) fn.apply(context, args);
        };
        
        const shouldCallNow = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(later, wait);
        
        if (shouldCallNow) {
            fn.apply(context, args);
        }
    };
};
  
  
  export function observerDomResize (dom, callback) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  
    const observer = new MutationObserver(callback)
  
    observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
  
    return observer
  }
  
  export function getPointDistance (pointOne, pointTwo) {
    const minusX = Math.abs(pointOne[0] - pointTwo[0])
  
    const minusY = Math.abs(pointOne[1] - pointTwo[1])
  
    return Math.sqrt(minusX * minusX + minusY * minusY)
  }
  
  export function uuid (hasHyphen) {
    return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
          const r = Math.random() * 16 | 0
          const v = c == 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
    })
  }