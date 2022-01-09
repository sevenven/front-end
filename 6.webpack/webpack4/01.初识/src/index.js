// ES Moudule模块引入方式
// import Header from './header.js';
// import Sidebar from './sidebar.js';
// import Content from './content.js';

// commonjs模块引入方式
var Header = require('./header.js');
var Sidebar = require('./sidebar.js');
var Content = require('./content.js');

new Header();
new Sidebar();
new Content();