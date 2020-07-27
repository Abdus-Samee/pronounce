$(document).ready(function(){
    $('#word').click(function(){
        $('.cont').empty();
        var word = $('input.handle').val();
        
        let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=7f55e767-1fcb-4d2b-8690-cf3b1f3e9df0';

      $.getJSON(url, function(res) {
        let dir;
        if(word[0] >= '0' && word[0] <= '9') dir = "https://media.merriam-webster.com/audio/prons/en/us/mp3/number/";
        else dir = "https://media.merriam-webster.com/audio/prons/en/us/mp3/" + word[0] + "/";
        let source = dir + res[0].hwi.prs[0].sound.audio + ".mp3";
        $('.cont').append('<p><b>WORD:</b> ' + word + '</p>');
        $('.cont').append('<p><b>SPEECH:</b> ' + res[0].fl + '</p>');
        $('.cont').append('<p><b>PRONOUNCIATION:</b> ' + res[0].hwi.prs[0].mw + '</p>');
        $('.cont').append('<p><b>AUDIO:</b></p>');
        $('.cont').append('<audio controls type="audio/mpeg" src=' + source + '></audio>');
      });
    });
});



    //   let url = 'https://api.dictionaryapi.dev/api/v1/entries/en/' + word;
        
    //     $.getJSON(url, function(res){
    //         if(res[0].meaning.noun){
    //             let definition = res[0].meaning.noun[0].definition;
    //             let example = res[0].meaning.noun[0].example;
    //             let arr = res[0].meaning.noun[0].synonyms;
    //             $('.cont').append('<p>DEFINITION: ' + definition + '</p>');
    //             $('.cont').append('<p>EXAMPLE: ' + example + '</p>');
    //             $('.cont').append('<p>SYNONYMS: ' + '</p>');
    //             for(let i = 0; i < arr.length; i++){
    //                 $('.cont').append('<p>' + arr[i] + '</p>');
    //             }
    //         }else if(res[0].meaning.adjective){
    //             let definition = res[0].meaning.adjective[0].definition;
    //             let example = res[0].meaning.adjective[0].example;
    //             let arr = res[0].meaning.adjective[0].synonyms;
    //             $('.cont').append('<p><b>DEFINITION:</b> ' + definition + '</p>');
    //             $('.cont').append('<p><b>EXAMPLE:</b> ' + example + '</p>');
    //             $('<p>', {
    //                 class: 'strong'
    //             }).text('SYNONYMS:').appendTo('.cont');
    //             for(let i = 0; i < arr.length; i++){
    //                 $('.cont').append('<p>' + arr[i] + '</p>');
    //             }
    //         }
    //     });