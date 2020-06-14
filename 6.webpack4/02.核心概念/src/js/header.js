function Header() {
	var root = document.getElementById('root');
	var header = document.createElement('div');
	header.innerText = 'header';
	root.append(header);
}

module.exports = Header;