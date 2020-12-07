FileDocumentViewer [![Support](https://img.shields.io/badge/Mendix%20Support%3A-Platform-green.svg)](https://docs.mendix.com/community/app-store/app-store-content-support)
==================

This widget allows to embed and view any System.FileDocument object inside a form. In the modeler, using microflows or the file downloader, documents can be opened as download or inside a new window. With this widget however, files can be opened inside dataviews.

Please take note that this will only work for Documents that can normally be viewed in the browser. We support viewing PDF either natively (Chrome, Firefox) or through PDF.js. Files like Word or Excel are usually not viewable in the browser. If you try this with the FileDocumentViewer, the browser will not view the document, but download it.

## Contributing
For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Configuration
Add the widget to a dataview. The context object should inherit from the System.FileDocument entity.

## Features
The widget tries to display a document inside a form, however it might fail to do this (in which case a download popup is opened) since the browser settings determine whether it is allowed or not to open a document inside a form. For example IE might succeed in opening a .doc file inside a form and fail in opening a .png image inside a form, while exactly the opposite might be true for FireFox.

## Properties

* `Title` - String attribute of which the contents will be set in the header.
* `Show header` - Determines whether or not a header will be rendered.

## PDFJS support

In the Modeler there is the option `Use PDF js`. This will take over the rendering of the PDF, because native rendering is not supported on Android. That is why we include [PDF.js](https://mozilla.github.io/pdf.js/), created by Mozilla (PDF.js is actually a part of Firefox). Make sure the documents you are trying to view are PDF files, otherwise the widget will fail to show the document. Use this option if you are having trouble viewing the documents on mobile devices for example.

## Raising problems/issues
-   We encourage everyone to open a Support ticket on [Mendix Support](https://support.mendix.com) in case of problems with widgets or scaffolding tools (Pluggable Widgets Generator or Pluggable Widgets Tools)
