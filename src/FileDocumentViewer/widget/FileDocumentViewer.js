dojo.provide("FileDocumentViewer.widget.FileDocumentViewer");

mendix.dom.insertCss(mx.moduleUrl("FileDocumentViewer", "widget/styles/FileDocumentViewer.css"));

mendix.widget.declare("FileDocumentViewer.widget.FileDocumentViewer", {
	addons: [
		dijit._Templated,
		dijit._Contained,
		mendix.addon._Contextable
	],
	
	inputargs: {
		title					: "",  
		width          : 0,	
		height         : 0,
		txtenlarge 		: "",
		txtpopout			: "",
		showheader : true
	},
	templatePath  : mx.moduleUrl("FileDocumentViewer.widget", "templates/FileDocumentViewer.html"),
	
	domNode		: null,
	iframe    : null,
	titleNode : null,
	eventEnlarge : null,
	eventPopout  : null,
	filedoc : null,
	windowObj : null,
	
	postCreate : function() {
		logger.debug(this.id + ".postCreate");
		
		if (!this.showheader)
				dojo.style(this.toolbarNode, 'display', 'none');
		
		this.windowObj = this.iframe.contentWindow;

		dojo.html.set(this.titleNode, this.title);
		dojo.html.set(this.enlargeNode, this.txtenlarge);
		dojo.html.set(this.popoutNode, this.txtpopout);
		this.connect(this.enlargeNode, "onclick", dojo.hitch(this, this.eventEnlarge));
		this.connect(this.popoutNode, "onclick", dojo.hitch(this, this.eventPopout));

		dojo.style(this.domNode, {
				'width': this.width == 0 ? 'auto' : this.width + 'px'
		});
		dojo.style(this.iframe, {
				'height': this.height == 0 ? 'auto' : this.height + 'px',
				'width' : '100%',
				'overflow': 'auto'
		});
		
		this.actRendered();
	},
	
		//received the context
	applyContext : function(context, callback){
		logger.debug(this.id + ".applyContext"); 
		if (context) 
			mx.processor.getObject(context.getActiveGUID(), dojo.hitch(this, this.setContextObject));
		else {
			logger.warn(this.id + ".applyContext received empty context");
		        this.windowObj.location.replace(mx.moduleUrl("FileDocumentViewer.widget", "styles/blank.html"));
		}
		callback && callback();
	},
	
	setContextObject : function(filedoc) {
		this.filedoc = filedoc;
		this.loadIFrame();
	},
	
	
	getFileUrl : function() {
		if (this.filedoc == null || this.filedoc.getAttribute("FileID") == null)
			return mx.moduleUrl("FileDocumentViewer.widget", "styles/error.html");
		else
			return "file?target=window&fileID=" + this.filedoc.getAttribute('FileID');
	},
	
	loadIFrame : function() {
			this.iframe.contentWindow.location.replace(this.getFileUrl());
	},
	
	eventEnlarge : function() {
		dojo.style(this.iframe, {
			height: dojo.style(this.iframe, 'height') * 1.5
		});
	},
	
	eventPopout : function() {
		window.open(this.getFileUrl());
	},
	
	uninitialize : function() {
		running = false;
	}
});
