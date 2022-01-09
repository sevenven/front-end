function Content() {
	var root = document.getElementById('root');
	var content = document.createElement('div');
	content.innerText = 'content';
	root.append(content);
}

module.exports = Content;