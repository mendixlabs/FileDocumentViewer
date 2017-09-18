require( [
    "require",
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/text!FileDocumentViewer/widget/templates/FileDocumentViewer.html"
], function (require, declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domClass, domAttr, domConstruct, domStyle, lang, text, widgetTemplate) {
    "use strict";

    return declare("FileDocumentViewer.widget.FileDocumentViewer", [ _WidgetBase, _TemplatedMixin ], {

        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        mfToExecute: "",
        messageString: "",
        backgroundColor: "",
        usePDFjs: false,

        // Internal variables.
        _handle: null,
        _contextObj: null,
        _objProperty: null,
        iframeNode:null,

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            if (!this.showheader) {
                domStyle.set(this.toolbarNode, "display", "none");
                domClass.add(this.groupboxBody, "no-header");
            }

            domStyle.set(this.domNode, {
                "width": this.width === 0 ? "auto" : this.width + "px"
            });

            this._setupEvents();
        },

        _iframeNodeCreate: function () {
            logger.debug(this.id + "._iframeNodeCreate");
            this.iframeNode = domConstruct.create("iframe", null, this.groupboxBody);
            domAttr.set(this.iframeNode, "id", "iframeNode");
            domAttr.set(this.iframeNode, "class", "documentiframe");

            domStyle.set(this.iframeNode, {
                "height": this.height === 0 ? "auto" : this.height + "px",
                "width" : "100%",
                "border-width": 0
            });
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            if (obj) {
                this._contextObj = obj;
                this._resetSubscriptions();
                this._updateRendering(callback);
            } else {
                this._executeCallback(callback, "update");
            }
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            domConstruct.destroy(this.iframeNode);
            this.iframeNode = null;
            this._iframeNodeCreate();

            if (this._contextObj && this._contextObj.get("HasContents"))  {
                if (this.usePDFjs/* && this._contextObj.get("Name").indexOf(".pdf") !== -1*/) {
                    var pdfJSViewer = require.toUrl("FileDocumentViewer/lib/pdfjs/web/viewer.html").split("?")[0],
                        encoded = pdfJSViewer + "?file=" + encodeURIComponent(mx.appUrl + this._getFileUrl());

                    domAttr.set(this.iframeNode, "src", encoded);
                } else {
                    domAttr.set(this.iframeNode, "src", this._getFileUrl());
                }

                domAttr.set(this.headerTextNode, "innerHTML",this._contextObj.get(this.headertitle));
            } else {
                domAttr.set(this.iframeNode, "src", require.toUrl("FileDocumentViewer/widget/ui/blank.html"));
                domAttr.set(this.headerTextNode, "innerHTML","...");
            }

            this._executeCallback(callback, "_updateRendering");
        },

        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");
            if (this._handle) {
                this.unsubscribe(this._handle);
                this._handle = null;
            }

            if (this._contextObj) {
                this._handle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function () {
                        this._updateRendering();
                    })
                });
            }
        },

        _setupEvents : function () {
            logger.debug(this.id + "._setupEvents");
            this.connect(this.enlargeNode, "onclick", this._eventEnlarge);
            this.connect(this.popoutNode, "onclick",  this._eventPopout);
        },

        _getFileUrl : function () {
            logger.debug(this.id + "._getFileUrl");
            if (this._contextObj === null || this._contextObj.get("Name") === null) {
                return require.toUrl("FileDocumentViewer/widget/ui/error.html");
            } else {
                return "file?target=window&guid=" + this._contextObj.getGuid() + "&csrfToken=" + mx.session.getConfig('csrftoken') + "&time=" + Date.now();
            }
        },

        _eventEnlarge : function () {
            logger.debug(this.id + "._eventEnlarge");
            domStyle.set(this.iframeNode, {
                height: (domStyle.get(this.iframeNode, "height") * 1.5) +"px"
            });
        },

        _eventPopout : function () {
            logger.debug(this.id + "._eventPopout");
            window.open(this._getFileUrl());
        },

        uninitialize: function () {
            if (this._handle) {
                this.unsubscribe(this._handle);
                this._handle = null;
            }
            logger.debug(this.id + ".uninitialize");
        },

        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});
