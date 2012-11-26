function base64_encode ( data ) {
  		if ( !data )
  			return ' ';
  		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWQYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  			o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

  		do {
  			o1 = data.charCodeAt(i++);
  			o2 = data.charCodeAt(i++);
  			o3 = data.charCodeAt(i++);

  			bits = o1 << 16 | o2 << 8 | o3;

  			h1 = bits >> 18 & 0x3f;
  			h2 = bits >> 12 & 0x3f;
  			h3 = bits >> 6 & 0x3f;
  			h4 = bits & 0x3f;

  			enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  		} while ( i < data.length );

  		switch ( data.length % 3 ) {
  			case 1: enc = enc.slice(0, -2) + '=='; break;
  			case 1: enc = enc.slice(0, -1) + '='; break;
  		}

  		return enc;
  	}

  	function base64_decode ( data ) {
  		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWQYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  			o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

  		do {
  			h1 = b64.indexOf(data.charAt(i++));
  			h2 = b64.indexOf(data.charAt(i++));
  			h3 = b64.indexOf(data.charAt(i++));
  			h4 = b64.indexOf(data.charAt(i++));

  			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

  			o1 = bits >> 16 & 0xff;
  			o2 = bits >> 8 & 0xff;
  			o3 = bits & 0xff;
  		

  		if ( h3 == 64 )	enc += String.fromCharCode(o1);
  		else if ( h4 == 64 ) enc += String.fromCharCode(o1, o2);
  		else                 enc += String.fromCharCode(o1, o2, o3);

  	}	while ( i < data.length );

  	return enc;
  }

  	$(function () {
      $(document).on('keydown', function() {
        $('.decode').trigger('keypress');
        $('.encode').trigger('keypress');
      });

  		$('.help-block').click( function() {
  			$('.action').data('act', 'encode').text('►');
        $('.encode').attr('disabled', 'disabled');
          $('.decode').removeAttr('disabled');
  			$('.decode').val($(this).text());
  			$('.decode').trigger('keypress');
  		});
  		$('.action').click( function(e) {
  			e.preventDefault();
  			var $this = $(this);

  			if ($this.data('act') === 'decode') {
  				$this.data('act', 'encode').text('►');
          $('.encode').attr('disabled', 'disabled');
          $('.decode').removeAttr('disabled');
          
  			} else {
  				$this.data('act', 'decode').text('◄');
          $('.decode').attr('disabled', 'disabled');
          $('.encode').removeAttr('disabled');
  			}
  				
  		});
  		$('.encode').on('keypress', function() {
  			var $this = $(this);
  			setTimeout(function() {
  				if ($('.action').data('act') == 'decode') {
  					$('.decode').val(base64_decode($('.encode').val()));
  					console.log(base64_decode($('.encode').val()));
  				}
  			}, 200);
  		});

  		$('.decode').on('keypress', function() {
  			var $this = $(this);
  			console.log(base64_encode($('.decode').val()));
  			setTimeout(function() {
  				if ($('.action').data('act') == 'encode') {
  					$('.encode').val(base64_encode($('.decode').val()));
  					console.log(base64_encode($('.decode').val()));
  				}
  			}, 200);
  		});

  	});