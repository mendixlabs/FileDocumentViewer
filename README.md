FileDocumentViewer
==================

This widget allows to embed and view any System.FileDocument object inside a form. In the modeler, using microflows or the file downloader, documents can be opened as download or inside a new window. With this widget however, files can be opened inside dataviews.

## Limitations

* **Due to limitations of the browsers on Android, viewing PDFs on your Android device will not work (in the browser). You should link to the PDF so people can open it with an external viewer instead**

## Contributing
For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Configuration
Add the widget to a dataview. The context object should inherit from the System.FileDocument entity.

## Features
The widget tries to display a document inside a form, however it might fail to do this (in which case a download popup is opened) since the browser settings determine whether it is allowed or not to open a document inside a form. For example IE might succeed in opening a .doc file inside a form and fail in opening a .png image inside a form, while exactly the opposite might be true for FireFox.

## Properties

* `Title` - String attribute of which the contents will be set in the header.
* `Show header` - Determines whether or not a header will be rendered.
