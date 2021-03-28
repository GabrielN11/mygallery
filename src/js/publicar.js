$('.submitBtn').attr('disabled', 'disabled')
$('.conteudo').css({"display":"block","flex-direction":""})
$("#enviar-imagem").on('change', function () {
    const imgPath = $(this)[0].value
    const extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase()
    const image_holder = $("#imgprev")
    image_holder.empty()

    if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
        if (typeof (FileReader) != "undefined") {

            const reader = new FileReader()
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result
                }).appendTo(image_holder)
            }
            const prevText = $('<label>').text('Prévia').addClass('prevtext')
            image_holder.append(prevText)
            $('.submitBtn').removeAttr('disabled')
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0])

        } else {
            const label = $('<label style="color: red;">')
            const mensagem = "Preview indisponível: seu browser não suporta FileReader."
            label.html(mensagem)
            image_holder.append(label)
            image_holder.show()
        }
    } else {
        const label = $('<p>')
        label.addClass('prevwarning')
        const mensagem = "Adicione apenas árquivos .jpg, .jpeg, .png ou .gif!"
        label.html(mensagem)
        image_holder.append(label)
        image_holder.show()
    }
})

$('.submitBtn').on('click', e =>{
    e.preventDefault()
    const formElem = $('.formulario')
    const form = new FormData(document.querySelector('.formulario'))
    const xhr = new XMLHttpRequest()
    if(xhr.upload){
        const loading = $('<i>').addClass('fa fa-spinner fa-spin fa-3x fa-fw')
        loading.css('color', 'deepskyblue')
        $(e.target).hide()
        formElem.append(loading)
        const thumbsup = $('<i>').addClass('fa fa-3x fa-thumbs-up')
        thumbsup.css('color', 'deepskyblue')
        xhr.addEventListener('load', e =>{
            $('.fa-spin').hide()
            formElem.append(thumbsup)
            $.getScript('js/feed.js')
        })
        xhr.open('post', 'publicar', true)
        xhr.send(form)
    }
})