$('#enquireModal').on('show.bs.modal', function (event) {
    console.log($('#enquireModal'));
    $("input[name='Hosting']").prop("checked", true);
    $("input[name='Domain']").prop("checked", true);
    var button = $(event.relatedTarget) // Button that triggered the modal
    var package = button.data('package') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(package? 'Enquiry for ' + package + ' Package' : 'Enquiry');
    if(package) { modal.find('.modal-body select').val(package); }

});

sr.reveal('.hideme', { origin: 'bottom', distance: '20px', duration: 2000 });
sr.reveal('.hideme-footer', { origin: 'bottom', duration: 1000 },100);
sr.reveal('.main-content', { origin: 'bottom', distance: '20px', duration: 2000 });