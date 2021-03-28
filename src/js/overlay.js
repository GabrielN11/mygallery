$(document).ready(function () {
    function on(img) {
        const overlay = $('#overlay').css('display', 'block')
        const imgoverlay = $('[imgoverlay]').attr('src', $(img.target).attr('src'))
        overlay.empty()
        overlay.append(imgoverlay)
    }

    function off() {
        $('#overlay').css('display', 'none')
    }

    $('[overlay]').each((i,e) =>{
        $(e).on("click", e => on(e))
    })
    $('#overlay').on('click', () => off())
})