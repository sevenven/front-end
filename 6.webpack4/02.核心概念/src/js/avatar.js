import avatar from '../img/avatar.jpeg'
// 只能模块引入
import style from '../scss/avatar.scss'

function createAvatar(){
  var img = new Image()
  img.src = avatar
  img.classList.add(style.avator)

  var root = document.getElementById('root')
  root.append(img)
}

export default createAvatar
