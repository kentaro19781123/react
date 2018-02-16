//コンポーネントを利用する
var MyComponent = React.createClass({
	displayName: 'my component',
	render: function() {
		return (
			<p>Reactのサンプルです。</p>
		);
	}
});

ReactDOM.render(
	<MyComponent/>,
	document.getElementById('msg')
);


//propsによる値の受け渡し
var MyComponent2 = React.createClass({
	displayName: 'my component2',
	render: function() {
		return (
		<p>{this.props.content}</p>
		);
	}
});

ReactDOM.render(
	<MyComponent2 content="これがcontentの値です。" />,
	document.getElementById('msg2')
);

//styleの設定
var MyComponent3 = React.createClass({
	displayName: 'my component3',
	render: function() {
		return (
		<p style={{color:this.props.styleColor,
			background:this.props.styleBg,
			padding:this.props.stylePd}}>
				{this.props.content}
			</p>
		);
	}
});

ReactDOM.render(
	<MyComponent3 styleColor="white" styleBg="red"
		stylePd="10px" content="これがコンテンツです。">
		this is MyItem Component.
	</MyComponent3>,
	document.getElementById('msg3')
);


//複数コンポーネントを組み合わせる
var MyTitle = React.createClass({
	displayName: 'my title',

	render: function() {
		return (
			<p>{this.props.title}</p>
		);
	}
});

var MyItem = React.createClass({
	displayName: 'my item',

	render: function() {
		return (
			<p>{this.props.content}</p>
		);
	}
});

var MyComponent4 = React.createClass({
	displayName: 'my component4',
	render: function() {
		return (
		<div>
			<MyTitle title={this.props.title} />
			<MyItem content={this.props.content} />
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent4 title="MyTitle Component" content="this is MyItem Component." />,
	document.getElementById('msg4')
);


//イベントの利用
var MyComponent5 = React.createClass({
	displayName: 'my component5',

	handleOnClick: function(event) {
		alert('クリック！');
	},

	render: function() {
		return (
		<div>
			<p>{this.props.msg}</p>
			<input type="button" value="click" onClick={this.handleOnClick} />
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent5 msg="ボタンをクリックしてください。" />,
	document.getElementById('msg5')
);


//stateプロパティ
var MyComponent6 = React.createClass({
	displayName: 'my component6',

	getInitialState: function () {
		return { msg: '名前を記入：' };
	},

	handleOnChange: function(event) {
		this.inputValue = event.target.value;
	},
	handleOnClick: function(event) {
		this.setState({
			msg: 'こんにちは、' + this.inputValue + 'さん。'
		});
	},

	render: function() {
		return (
		<div>
			<p>{this.state.msg}</p>
			<input type="text" onChange={this.handleOnChange} />
			<input type="button" value="click" onClick={this.handleOnClick} />
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent6 />,
	document.getElementById('msg6')
);


//チェックボックスとラジオボタン
var MyComponent7 = React.createClass({
	displayName: 'my component7',
	checkValue: false,
	radioValue: '(未選択)',

	getInitialState: function () {
		return { msg: '' };
	},

	handleOnChangeCb: function(event) {
		this.checkValue = event.target.checked;
	},
	handleOnChangeRb: function(event) {
		this.radioValue = event.target.value;
	},

	handleOnClick: function(event) {
		this.setState({
			msg: '選択状態：' + this.checkValue + ', ' + this.radioValue
		});
	},

	render: function() {
		return (
		<div>
			<p>{this.state.msg}</p>
			<div><input type="checkbox" onChange={this.handleOnChangeCb} id="ck1" />
				<label htmlFor="ck1">Check Box</label></div>
			<div><input type="radio" onChange={this.handleOnChangeRb} value="A" id="r1" name="radio" />
				<label htmlFor="r1">radio A</label></div>
			<div><input type="radio" onChange={this.handleOnChangeRb} value="B" id="r2" name="radio" />
				<label htmlFor="r2">radio B</label></div>
			<div><input type="button" value="click" onClick={this.handleOnClick} /></div>
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent7 />,
	document.getElementById('msg7')
);


//selectの利用
var MyComponent8 = React.createClass({
	displayName: 'my component8',
	sel1Value: 'Windows',
	sel2Value:[],

	getInitialState: function () {
		return { msg: '' };
	},

	handleOnChangeSel1: function(event) {
		this.sel1Value = event.target.value;
	},
	handleOnChangeSel2: function(event) {
		var options = event.target.options;
		var values = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				values.push(options[i].value);
			}
		}
		this.sel2Value = values;
	},

	handleOnClick: function(event) {
		this.setState({
			msg: '状態： ' + this.sel1Value + ' [' + this.sel2Value + ']'
		});
	},

	render: function() {
		return (
		<div>
			<p>{this.state.msg}</p>
			<div><select onChange={this.handleOnChangeSel1}>
				<option>Windows</option>
				<option>macOS</option>
				<option>Linux</option>
			</select></div>
			<div><select multiple size="3" onChange={this.handleOnChangeSel2}>
				<option>Android</option>
				<option>iOS</option>
				<option>WindowsPhone</option>
			</select></div>
			<div><input type="button" value="click" onClick={this.handleOnClick} /></div>
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent8 />,
	document.getElementById('msg8')
);

//動的リスト生成
var MyComponent9 = React.createClass({
	getInitialState: function() {
		return {
			data: ['first item.']
		};
	},

	handleOnChange: function(event) {
		this.inputValue = event.target.value;
	},

	handleAddItem: function() {
		var arr= this.state.data.concat(this.inputValue);
		this.setState({data: arr});
	},

	render: function() {
		var items = this.state.data.map(function(item, i) {
			return (
				<option key={'key_' + i}>{i + ':' + item}</option>
			);
		}.bind(this));
		return (
		<div>
			<select size="5">{items}</select>
			<div>
			<input type="text" onChange={this.handleOnChange} />
			<input type="button" value="Click" onClick={this.handleAddItem} />
			</div>
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent9 />,
	document.getElementById('msg9')
);


//olによるダイナミックリスト
var MyComponent10 = React.createClass({
	getInitialState: function() {
		return {
			data: ['first item.']
		};
	},

	handleOnChange: function(event) {
		this.inputValue = event.target.value;
	},

	handleAddItem: function() {
		var newData = this.state.data.concat(this.inputValue);
		this.setState({data: newData});
	},

	handleRemoveItem: function(i) {
		var arr = this.state.data;
		arr.splice(i, 1);
		this.setState({data: arr});
	},

	render: function() {
		var items = this.state.data.map(function(item, i) {
			return (
				<li key={'key_' + i} onClick={this.handleRemoveItem.bind(this, i)}>
				{item}
				</li>
			);
		}.bind(this));
		return (
		<div>
			<ol>{items}</ol>
			<div>
			<input type="text" onChange={this.handleOnChange} />
			<input type="button" value="Click" onClick={this.handleAddItem} />
			</div>
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent10 />,
	document.getElementById('msg10')
);


//Virtual DOMにアクセスする
var MyComponent11 = React.createClass({
	displayName: 'my component11',

	getInitialState: function () {
		return { msg: '名前を記入：' };
	},

	handleOnClick: function(event) {
		var in_str = ReactDOM.findDOMNode(this.refs.input1).value;
		this.setState({
			msg: 'こんにちは、' + in_str + 'さん。'
		});
	},

	render: function() {
		return (
		<div>
			<p>{this.state.msg}</p>
			<input type="text" ref="input1" />
			<input type="button" value="click" onClick={this.handleOnClick} />
		</div>
		);
	}
});

ReactDOM.render(
	<MyComponent11 />,
	document.getElementById('msg11')
);
