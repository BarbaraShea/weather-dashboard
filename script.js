$(".btn").on('click', function(event) {

    event.preventDefault();

    console.log($("#textInput").val());

    document.location.replace('./search-results.html?q=' + $("#textInput").val());

})

