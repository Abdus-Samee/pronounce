$(document).ready(function(){
    $('#word').click(function(){
        $('.cont').empty();
        var word = $('input.handle').val();

        let s;
        let pronounciation;
        let speech;
        let definition;
        let arr;
        let phonetics;


        let url1 = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=7f55e767-1fcb-4d2b-8690-cf3b1f3e9df0';
        let url2 = 'https://api.dictionaryapi.dev/api/v1/entries/en/' + word;

        $.ajaxSetup({
          "error":function() { 
            var notif = {
              type: 'basic',
              iconUrl: 'main-icon48.png',
              title: 'Word not found',
              message: 'The provided word cannot be found. Please try again or enter a legit word...'
            };
            chrome.notifications.create('errorNotif', notif);
          }
        });

        $.when(
          $.getJSON(url1, function(res) {
            let dir;
            if(word[0] >= '0' && word[0] <= '9') dir = "https://media.merriam-webster.com/audio/prons/en/us/mp3/number/";
            else dir = "https://media.merriam-webster.com/audio/prons/en/us/mp3/" + word[0] + "/";
            s = dir + res[0].hwi.prs[0].sound.audio + ".mp3";
            speech = res[0].fl;
            pronounciation = res[0].hwi.prs[0].mw;
          }),
          
          $.getJSON(url2, function(res){
              console.log(res);
              if(res[0].meaning.noun){
                definition = res[0].meaning.noun[0].definition;
                if(res[0].meaning.noun[0].synonyms) arr = res[0].meaning.noun[0].synonyms;
              }
  
              else if(res[0].meaning.verb){
                definition = res[0].meaning.verb[0].definition;
                if(res[0].meaning.verb[0].synonyms) arr = res[0].meaning.verb[0].synonyms;
              }
  
              else if(res[0].meaning.adjective){
                definition = res[0].meaning.adjective[0].definition;
                if(res[0].meaning.adjective[0].synonyms) arr = res[0].meaning.adjective[0].synonyms;
              }
  
              else if(res[0].meaning.pronoun){
                definition = res[0].meaning.pronoun[0].definition;
                if(res[0].meaning.pronoun[0].synonyms) arr = res[0].meaning.pronoun[0].synonyms;
              }
  
              else if(res[0].meaning.adverb){
                definition = res[0].meaning.adverb[0].definition;
                if(res[0].meaning.adverb[0].synonyms) arr = res[0].meaning.adverb[0].synonyms;
              }
  
              if(res[0].phonetics) phonetics = res[0].phonetics[0].text;
          })
        ).then(function(){
          $('.cont').append('<p><b>WORD:</b> ' + word + '</p>');
          $('.cont').append('<p><b>SPEECH:</b> ' + speech + '</p>');
          $('.cont').append('<p><b>DEFINITION:</b> ' + definition + '</p>');
          if(phonetics) $('.cont').append('<p><b>PHONETICS:</b> ' + phonetics + '</p>');
          if(arr.length){
            $('.cont').append('<p><b>SYNONYMS: </b></p>');
            for(var i = 0; i < arr.length; i++) $('.cont').append('<p>' + arr[i] + '</p>');
          }
          $('.cont').append('<p><b>PRONOUNCIATION:</b> ' + pronounciation + '</p>');
          $('.cont').append('<p><b>AUDIO: </b></p>');
          $('.cont').append('<audio controls><source type="audio/mpeg" src=' + s + '></audio>');
        });
    });
});



        
