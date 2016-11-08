let isChildOf = (target, parent) => {
  if (target.parentNode === parent) {
    return true
  } else if (target.parentNode != null) {
    return isChildOf(target.parentNode, parent)
  } else {
    return false
  }
}

let parentHasClass = (element, classname) => {
  if (element.className && element.className.split(' ').indexOf(classname) >= 0) {
    return true
  } else if (element.parentNode != null) {
    return parentHasClass(element.parentNode, classname)
  } else {
    return false
  }
}

export {
  isChildOf,
  parentHasClass
}
