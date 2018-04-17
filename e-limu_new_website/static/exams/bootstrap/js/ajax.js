
$(function(){
$('#search').keyup(function(){
$.ajax({
type: "POST",
url: "/goodlyf/search/",
data: {
'search_text': $('#search').val(),
'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val()
},
success: searchSuccess,
dataType: 'html'

});

});

});

function searchSuccess(data, textStatus, jqXRH)
{
$('#search-results').html(data);
}