function ajax({
  url = 'GET',
  method,
  postData
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error('http status: ' + xhr.status))
        }
      }
    }
    // const postData = {
    //   userName: 'zhangsan',
    //   password: 'xxx'
    // }
    xhr.send(postData ? JSON.stringify(postData) : undefined);
  })
}