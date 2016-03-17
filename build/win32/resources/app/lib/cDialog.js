/**
* Easy JS Dialog system
*
* @class cDialog
* @version 0.0.1
* @license MIT
*
* @author Christian Marienfeld post@chrisand.de
*
* ### Examples:
*
*	var myDialog = new cDialog();
*
*	var myDialog = new cDialog({
*	 type: 'input',
*	 confirm: {
*	 	 text: 'Ok !',
*	 	 handler: function (data, e) {
*	 		 console.log('ok! done', data);
* 	 }
* 	},
* 	abort: {
* 		text: 'Abort !',
* 		handler: function (e) {
*	 	  	console.log('Abort! done');
*	  	}
*	  }
* });
*
*	myDialog.show();
*
*	myDialog.hide();
*
*	myDialog.destroy();
*
*
* @return {Object} cDialog Object
*
* @api public
*/



function cDialog(param) {

	this._page = document.body;

	this._opt = {
		type: 'input',
		autoOpen: false,
		destroy: false
	};

	if (param) {
		for (var i in param) {
			if(param.hasOwnProperty(i)){
				this._opt[i] = param[i];
			}
		}
	}

	// INIT
	if (this._opt.container) {
		this._page = document.getElementById(this._opt.container);
	}

	if (!this._page) {
		throw new Error("missing main container #"+this._opt.container);
		this._page = document.body;
	}


	// APPEND

	this._wrap = document.createElement('div');
	this._wrap.id = 'cDialog-'+(Math.floor(Math.random()*11)+2)*(Math.floor(Math.random()*11)+2);
	this._wrap.className = 'cDialog'
	this._wrap.style.display = 'none';

	this._node = {};

	var that = this;

	if (this._opt.type == 'input') {

		if (this._opt.info) {
			this._node.info = document.createElement('div');
			this._node.info.className = 'cDialog-info';
			this._node.info.innerHTML = this._opt.info;
			this._wrap.appendChild(this._node.info);
		}


		this._node.field = document.createElement('input');
		this._node.field.type = 'text';
		this._node.field.className = 'cDialog-input';
		this._wrap.appendChild(this._node.field);

		if (this._opt.confirm && this._opt.confirm.text && this._opt.confirm.handler) {

			this._node.confirm = document.createElement('button');
			this._node.confirm.innerHTML = this._opt.confirm.text;
			this._node.confirm.className = 'cDialog-confirm';
			this._node.confirm.onclick = function (e) {
				that._opt.confirm.handler(that._node.field.value, e);
				if (that._opt.destroy == true) {
					that.destroy();
				} else {
					that.hide();
				}
			};
			this._wrap.appendChild(this._node.confirm);

		}

		if (this._opt.abort && this._opt.abort.text && this._opt.abort.handler) {

			this._node.abort = document.createElement('button');
			this._node.abort.innerHTML = this._opt.abort.text;
			this._node.abort.className = 'cDialog-abort';
			this._node.abort.onclick = function (e) {
				that._opt.abort.handler(e);
				if (that._opt.destroy == true) {
					that.destroy();
				} else {
					that.hide();
				}
			};
			this._wrap.appendChild(this._node.abort);
		}

	}

	this._page.appendChild(this._wrap);


	if (this._opt.autoOpen) {
		this.show();
	}

	return this;
}



cDialog.prototype.show = function () {

	this._wrap.style.display = 'block';

	return this;

};



cDialog.prototype.hide = function () {

	this._wrap.style.display = 'none';

	return this;

};


cDialog.prototype.destroy = function () {

	document.body.removeChild(this._wrap);


	return this;

};
