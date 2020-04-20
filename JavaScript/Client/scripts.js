var CSSEditor, HTMLEditor;
document.addEventListener('DOMContentLoaded', function(){
    ace.require('ace/ext/language_tools');
    var iFrame = document.getElementById('live-view');

    Array.from(document.getElementsByClassName('editor-panel')).forEach(function(editorPanel){
        var editorTimeout;
        draggable(editorPanel.querySelector('.editor-titlebar'));
        editorPanel.addEventListener('mousedown', selectEditor);
        var editorArea = editorPanel.querySelector('pre');
        var editor = CreateEditor(editorArea.id);
        if(editorArea.id.replace('-Editor', '') == 'css')
            CSSEditor = editor;
        else if(editorArea.id.replace('-Editor', '') == 'html')
            HTMLEditor = editor;
        editor.getSession().on('change', function(){
            var editable = iFrame.contentDocument.getElementById(`editable-${editorArea.id.replace('-Editor', '')}`);
            editable.innerHTML = editor.getValue();
            if(editorTimeout) clearTimeout(editorTimeout);
            editorTimeout = setTimeout(function(){
                //  Create / Update Functionality
                if(!projectIsCreated){
                    CreateProject();
                } else {
                    //  Update
                    postRequest(`/Update/${editorArea.id.replace('-Editor', '')}`, {
                        value: editor.getValue()
                    }, function(data){});
                }
            }, 2500);
        });
    });

    //  Title Updating
    var txtTitle = document.getElementById('txtTitle');
    if(txtTitle){
        txtTitle.onblur = function(){
            if(txtTitle.value.trim() !== ''){
                postRequest('/Update/Title', {
                    value: txtTitle.value
                }, function(data){
                    if(data.success == 1)
                        document.querySelector('title').innerText = `${txtTitle.value} | Live-Design`;
                });
            }
        }
    }
});

function CreateProject(){
    postRequest('/Create', {
        title: 'Untitled Project (Created)',
        css: CSSEditor.getValue(),
        html: HTMLEditor.getValue()
    }, function(data){
        projectIsCreated = data.success == 1;
    });
}

function selectEditor(){
    document.querySelector('.selected-panel').classList.remove('selected-panel');
    this.classList.add('selected-panel');
};


function CreateEditor(type){
    var editor = ace.edit(type);
    editor.setTheme('ace/theme/Dark');
    editor.session.setMode(`ace/mode/${type.replace('-Editor', '')}`);
    editor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true
    });
    return editor;
}

function draggable(element) {
	var isMouseDown = false;

    var StartingX = parseInt(element.parentNode.offsetLeft);
    var StartingY = parseInt(element.parentNode.offsetTop);

    // initial mouse X and Y for `mousedown`
    var mouseX;
    var mouseY;

    // element X and Y before and after move
    var elementX = 0;
    var elementY = 0;

	// mouse button down over the element
    element.addEventListener('mousedown', onMouseDown);

	/**
     * Listens to `mousedown` event.
     *
     * @param {Object} event - The event.
     */
	function onMouseDown(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseDown = true;
    }

	// mouse button released
    window.addEventListener('mouseup', onMouseUp);

	/**
     * Listens to `mouseup` event.
     *
     * @param {Object} event - The event.
     */
	function onMouseUp(event) {
        isMouseDown = false;
        elementX = parseInt(element.style.left) || 0;
        elementY = parseInt(element.style.top) || 0;
        StartingX = parseInt(element.parentNode.offsetLeft);
        StartingY = parseInt(element.parentNode.offsetTop);
    }

	// need to attach to the entire document
    // in order to take full width and height
    // this ensures the element keeps up with the mouse
    document.addEventListener('mousemove', onMouseMove);

	/**
     * Listens to `mousemove` event.
     *
     * @param {Object} event - The event.
     */
	function onMouseMove(event) {
        if (!isMouseDown) return;
        var diffX = event.clientX - mouseX;
        var diffY = event.clientY - mouseY;
        element.parentNode.style.left = `${StartingX + diffX}px`;
        element.parentNode.style.top = `${StartingY + diffY}px`;
    }
}

//  Post Request
function postRequest(endpoint, data, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(JSON.parse(xmlHttp.responseText));
      else if(xmlHttp.readyState == 4 && xmlHttp.status === 404)
        callback(false);
    }
    xmlHttp.open("POST", `/API/${endpoint}`, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(data));
}