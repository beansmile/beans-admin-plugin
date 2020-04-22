window.CKEDITOR_BASEPATH = location.origin + process.env.BASE_URL + 'ckeditor/';
export default function (config) {
  config.height = 300; // Define changes to default configuration here. For example:
  // config.language = 'fr'

  config.language = 'zh-CN'; // config.uiColor = '#AADC6E'

  /* Filebrowser routes */
  // The location of an external file browser, that should be launched when 'Browse Server' button is pressed.
  // config.filebrowserBrowseUrl = '/ckeditor/attachment_files'

  config.filebrowserBrowseUrl = ''; // The location of an external file browser, that should be launched when 'Browse Server' button is pressed in the Flash dialog.
  // config.filebrowserFlashBrowseUrl = '/ckeditor/attachment_files'

  config.filebrowserFlashBrowseUrl = ''; // The location of a script that handles file uploads in the Flash dialog.
  // config.filebrowserFlashUploadUrl = '/ckeditor/attachment_files'

  config.filebrowserFlashUploadUrl = ''; // The location of an external file browser, that should be launched when 'Browse Server' button is pressed in the Link tab of Image dialog.
  // config.filebrowserImageBrowseLinkUrl = '/ckeditor/pictures'

  config.filebrowserImageBrowseLinkUrl = ''; // The location of an external file browser, that should be launched when 'Browse Server' button is pressed in the Image dialog.
  // config.filebrowserImageBrowseUrl = '/ckeditor/pictures'

  config.filebrowserImageBrowseUrl = ''; // The location of a script that handles file uploads in the Image dialog.

  config.filebrowserImageUploadUrl = '/ckeditor/qiniu_upload'; // The location of a script that handles file uploads.
  // config.filebrowserUploadUrl = '/ckeditor/attachment_files'

  config.filebrowserUploadUrl = '/ckeditor/qiniu_upload';
  config.allowedContent = true;
  config.extraPlugins = 'html5video,widget,widgetselection,clipboard,lineutils,lineheight'; // Toolbar groups configuration.

  config.toolbar = [{
    name: 'document',
    groups: ['mode', 'document', 'doctools'],
    items: ['Source']
  }, {
    name: 'clipboard',
    groups: ['clipboard', 'undo'],
    items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
  }, // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
  // { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
  {
    name: 'links',
    items: ['Link', 'Unlink', 'Anchor']
  }, // { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar' ] },
  {
    name: 'insert',
    items: ['Image', 'Html5video', 'Table', 'HorizontalRule', 'SpecialChar']
  }, {
    name: 'paragraph',
    groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
  }, '/', {
    name: 'styles',
    items: ['Styles', 'Format', 'Font', 'FontSize', 'lineheight']
  }, {
    name: 'colors',
    items: ['TextColor', 'BGColor']
  }, {
    name: 'basicstyles',
    groups: ['basicstyles', 'cleanup'],
    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
  }];
  config.toolbar_mini = [{
    name: 'paragraph',
    groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
  }, {
    name: 'styles',
    items: ['Font', 'FontSize']
  }, {
    name: 'colors',
    items: ['TextColor', 'BGColor']
  }, {
    name: 'basicstyles',
    groups: ['basicstyles', 'cleanup'],
    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
  }, {
    name: 'insert',
    items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar']
  }];
}