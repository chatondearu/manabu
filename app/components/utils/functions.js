let isChildOf = (target, parent) => {
  if (target.parentNode === parent) {
    return true
  } else if (target.parentNode != null) {
    return isChildOf(target.parentNode, parent)
  } else {
    return false
  }
}

export {
  isChildOf
}
