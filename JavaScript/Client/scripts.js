document.addEventListener('DOMContentLoaded', function(){
    ace.require('ace/ext/language_tools');
    var iFrame = document.getElementById('live-view');
    
    // var css = CreateEditor('css');
    // var html = CreateEditor('html');

    Array.from(document.getElementsByClassName('editor-panel')).forEach(function(editorPanel){
        //  Top most when clicked.
        draggable(editorPanel.querySelector('.editor-titlebar'));
        editorPanel.addEventListener('mousedown', selectEditor);
        var editorArea = editorPanel.querySelector('pre');
        var editor = CreateEditor(editorArea.id);
        editor.getSession().on('change', function(){
            console.log(editor.getValue());
            console.log(iFrame.contentDocument);

            var editable = iFrame.contentDocument.getElementById(`editable-${editorArea.id.replace('-Editor', '')}`);
            editable.innerHTML = editor.getValue();
        });
    });
});

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